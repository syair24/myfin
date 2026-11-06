import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "dompetku_session";

export async function POST(request: Request) {
  try {
    // 1. Baca request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Format data tidak valid." },
        { status: 400 },
      );
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Data login tidak valid." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const { username, password, rememberMe } = payload;

    // 2. Validasi input
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi." },
        { status: 400 },
      );
    }

    const normalizedUsername = username.trim().toLowerCase();

    if (
      normalizedUsername.length < 3 ||
      normalizedUsername.length > 30 ||
      !/^[a-z0-9_]+$/.test(normalizedUsername)
    ) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }

    // 3. Periksa secret autentikasi
    const authSecret = process.env.AUTH_SECRET;

    if (!authSecret || Buffer.byteLength(authSecret, "utf8") < 32) {
      console.error("AUTH_SECRET belum dikonfigurasi.");

      return NextResponse.json(
        { message: "Konfigurasi autentikasi belum siap." },
        { status: 500 },
      );
    }

    // 4. Cari akun berdasarkan username
    const user = await prisma.user.findUnique({
      where: {
        username: normalizedUsername,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }

    // 5. Cocokkan password dengan bcrypt hash
    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }

    // 6. Buat token sesi
    const remember = rememberMe === true;

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .setIssuedAt()
      .setIssuer("dompetku")
      .setAudience("dompetku-app")
      .setExpirationTime(remember ? "30d" : "8h")
      .sign(new TextEncoder().encode(authSecret));

    // 7. Simpan token ke HttpOnly Cookie
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(remember ? { maxAge: 30 * 24 * 60 * 60 } : {}),
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
