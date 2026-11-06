"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  Eye,
  EyeOff,
  ArrowRight,
  Coins,
  ReceiptText,
  Sparkles,
  LockKeyhole,
  UserRound,
  ChartNoAxesCombined,
  CircleDollarSign,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Username atau password salah.");
        return;
      }

      // Login berhasil, arahkan ke dashboard.
      // Cookie sesi dibuat oleh API login.
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-[#f5faf7] px-4 py-4 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 grid w-full max-w-250 grid-cols-1 overflow-hidden rounded-2xl border border-white bg-white shadow-[0_15px_50px_rgba(15,23,42,0.07)] lg:h-[min(680px,calc(100dvh-32px))] lg:grid-cols-2">
        {/* LEFT */}
        <section className="relative flex flex-col justify-center overflow-hidden px-8 py-8 sm:px-12 lg:px-12 lg:py-10">
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-50" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-emerald-100/70" />

          <div className="relative z-10">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 shadow-md shadow-green-600/20">
                <Wallet size={23} className="text-white" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Dompet<span className="text-emerald-600">ku.</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mt-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                <Sparkles size={13} />
                Kelola keuangan lebih mudah
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Semua Keuangan,
                <br />
                <span className="text-emerald-600">Satu Kendali.</span>
              </h1>

              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                Pantau pemasukan, atur pengeluaran, dan capai tujuan finansialmu
                dengan lebih terencana bersama Dompetku.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative mx-auto mt-7 flex h-48 w-full max-w-75 items-center justify-center">
              <div className="absolute h-40 w-40 rounded-full bg-linear-to-br from-emerald-50 to-green-100" />

              {/* Wallet */}
              <div className="relative z-10 flex h-32 w-40 -rotate-6 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-400 to-green-600 shadow-xl shadow-emerald-500/20">
                <Wallet size={75} strokeWidth={1.3} className="text-white" />
              </div>

              {/* Coins */}
              <div className="absolute left-5 top-5 z-20 flex h-11 w-11 rotate-12 items-center justify-center rounded-full border-4 border-yellow-300 bg-yellow-400 shadow-md">
                <Coins size={21} className="text-yellow-800" />
              </div>

              <div className="absolute right-5 top-10 z-20 flex h-11 w-11 -rotate-12 items-center justify-center rounded-full border-4 border-yellow-300 bg-yellow-400 shadow-md">
                <Coins size={21} className="text-yellow-800" />
              </div>

              <div className="absolute bottom-2 left-9 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
                <ReceiptText size={22} className="text-emerald-500" />
              </div>

              <div className="absolute bottom-3 right-9 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md">
                <Sparkles size={19} className="text-emerald-500" />
              </div>
            </div>

            {/* Features */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-emerald-50/70 p-3">
                <ChartNoAxesCombined size={19} className="text-emerald-600" />
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Analisis
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-3">
                <CircleDollarSign size={19} className="text-emerald-600" />
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Transaksi
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-3">
                <TrendingUp size={19} className="text-emerald-600" />
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Target
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-5 text-[11px] text-gray-400">
            © 2026 Dompetku. Kelola uang, raih tujuan.
          </p>
        </section>

        {/* Divider */}
        <div className="absolute bottom-10 left-1/2 top-10 hidden w-px bg-gray-100 lg:block" />

        {/* RIGHT */}
        <section className="flex flex-col justify-center px-7 py-8 sm:px-12 lg:px-12 lg:py-7">
          <div className="mx-auto w-full max-w-97.5">
            {/* Mobile Heading */}
            <div className="mb-6 lg:hidden">
              <h2 className="text-2xl font-bold text-gray-900">
                Selamat Datang!
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Masuk ke akunmu untuk melanjutkan.
              </p>
            </div>

            {/* Desktop Heading */}
            <div className="mb-8 hidden lg:block">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <LockKeyhole size={23} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Selamat Datang!
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Masuk ke akunmu untuk melanjutkan.
              </p>
            </div>

            {/* Login Form */}
            <form
              className="space-y-5"
              onSubmit={handleLogin}
              autoComplete="off"
            >
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Masukkan username"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Lupa password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Sembunyikan password" : "Lihat password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded accent-emerald-600"
                />

                <span className="text-xs text-gray-500">Ingat saya</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Masuk ke Akun"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="whitespace-nowrap text-xs text-gray-400">
                PENGGUNA BARU?
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Link
              href="/register"
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/50 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-50"
            >
              Buat Akun Baru
              <ArrowRight size={16} />
            </Link>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
              <ShieldCheck size={14} />

              <span className="text-[11px]">
                Login aman dan terlindungi bersama Dompetku
              </span>
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-[11px] text-gray-400">
              © 2026 Dompetku. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
