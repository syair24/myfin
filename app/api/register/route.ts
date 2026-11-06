import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Memeriksa error duplikat dari Prisma
function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function POST(request: Request) {
  try {
    // 1. Membaca request body
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
        { message: "Data registrasi tidak valid." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const { name, username, email, password } = payload;

    // 2. Validasi tipe input
    if (
      typeof name !== "string" ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Nama lengkap, username, email, dan password wajib diisi.",
        },
        { status: 400 },
      );
    }

    // 3. Normalisasi input
    const normalizedName = name.trim();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // 4. Validasi nama lengkap
    if (normalizedName.length < 2 || normalizedName.length > 100) {
      return NextResponse.json(
        {
          message: "Nama lengkap harus terdiri dari 2 sampai 100 karakter.",
        },
        { status: 400 },
      );
    }

    // 5. Validasi username
    if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
      return NextResponse.json(
        {
          message: "Username harus terdiri dari 3 sampai 30 karakter.",
        },
        { status: 400 },
      );
    }

    // Username hanya boleh menggunakan huruf, angka, dan underscore
    const usernameRegex = /^[a-z0-9_]+$/;

    if (!usernameRegex.test(normalizedUsername)) {
      return NextResponse.json(
        {
          message:
            "Username hanya boleh berisi huruf, angka, dan underscore (_).",
        },
        { status: 400 },
      );
    }

    // 6. Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (normalizedEmail.length > 254 || !emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Format email tidak valid." },
        { status: 400 },
      );
    }

    // 7. Validasi password
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter." },
        { status: 400 },
      );
    }

    // Bcrypt memiliki batas input 72 byte
    if (Buffer.byteLength(password, "utf8") > 72) {
      return NextResponse.json(
        { message: "Password terlalu panjang. Maksimal 72 byte." },
        { status: 400 },
      );
    }

    // 8. Periksa email dan username secara bersamaan
    const [existingEmail, existingUsername] = await Promise.all([
      prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
        select: {
          id: true,
        },
      }),

      prisma.user.findUnique({
        where: {
          username: normalizedUsername,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email sudah terdaftar. Gunakan email lain." },
        { status: 409 },
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username sudah digunakan. Pilih username lain." },
        { status: 409 },
      );
    }

    // 9. Hash password menggunakan bcrypt
    const passwordHash = await bcrypt.hash(password, 12);

    // 10. Simpan user ke database
    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    // 11. Respons berhasil
    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil. Silakan login.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    // Menangani duplikasi akibat dua request bersamaan
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        {
          message: "Email atau username sudah digunakan.",
        },
        { status: 409 },
      );
    }

    console.error("Register API Error:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 },
    );
  }
}
