"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Wallet,
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Silakan masukkan alamat email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 404) {
        setError(
          "API lupa password belum tersedia. Silakan lanjutkan pembuatan sistem reset password.",
        );
        return;
      }

      if (!response.ok) {
        setError(
          data?.message ||
            "Permintaan reset password gagal. Silakan coba lagi.",
        );
        return;
      }

      setSuccess(
        data?.message ||
          "Jika email terdaftar, instruksi reset password akan dikirim ke email tersebut.",
      );

      setEmail("");
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#f5faf7] px-4 py-8 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white bg-white p-7 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 shadow-md shadow-green-600/20">
              <Wallet size={23} className="text-white" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Dompet<span className="text-emerald-600">ku.</span>
            </span>
          </Link>
        </div>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <LockKeyhole size={30} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
            <ShieldCheck size={13} />
            Keamanan Akun Dompetku
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Lupa Password?
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
            Jangan khawatir! Masukkan email yang terdaftar dan kami akan
            membantu mengatur ulang password akunmu.
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center"
          >
            <CheckCircle2 size={35} className="mx-auto text-emerald-600" />

            <p className="mt-3 text-sm font-semibold text-emerald-800">
              Permintaan berhasil
            </p>

            <p className="mt-2 text-sm leading-6 text-emerald-700">{success}</p>

            <Link
              href="/login"
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Kembali ke Login
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Forgot Password Form */}
            <form onSubmit={handleForgotPassword} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Alamat Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Gunakan email yang kamu daftarkan di Dompetku.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Memproses..."
                ) : (
                  <>
                    Kirim Link Reset Password
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* Back to Login */}
        {!success && (
          <Link
            href="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={16} />
            Kembali ke Login
          </Link>
        )}

        {/* Security */}
        <div className="mt-7 flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck size={14} />
          <span className="text-[11px]">
            Keamanan akunmu adalah prioritas kami.
          </span>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-gray-400">
          © 2026 Dompetku. All rights reserved.
        </p>
      </div>
    </main>
  );
}
