"use client";

import Image from "next/image";
import Link from "next/link";
import { getLenis } from "@/lib/lenis";
import {
  ArrowRight,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ChartNoAxesCombined,
  ShieldCheck,
  Sparkles,
  CircleDollarSign,
  CreditCard,
  Target,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Pantau Saldo",
    description:
      "Lihat total saldo dan kondisi keuangan kamu dalam satu dashboard yang mudah dipahami.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analisis Keuangan",
    description:
      "Pantau pemasukan dan pengeluaran melalui visualisasi data yang informatif.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: PiggyBank,
    title: "Kelola Tabungan",
    description:
      "Buat perencanaan keuangan dan pantau perkembangan tabungan kamu.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "Data Terorganisir",
    description:
      "Simpan dan kelola seluruh catatan keuangan dengan lebih rapi dan terstruktur.",
    color: "bg-orange-100 text-orange-600",
  },
];

const transactions = [
  {
    name: "Gaji Bulanan",
    category: "Pemasukan",
    date: "05 Nov 2026",
    amount: "+Rp7.500.000",
    income: true,
    icon: TrendingUp,
  },
  {
    name: "Belanja Bulanan",
    category: "Belanja",
    date: "04 Nov 2026",
    amount: "-Rp850.000",
    income: false,
    icon: CreditCard,
  },
  {
    name: "Makan Siang",
    category: "Makanan",
    date: "03 Nov 2026",
    amount: "-Rp75.000",
    income: false,
    icon: CircleDollarSign,
  },
];

const monthlyData = [
  { month: "Jun", income: 55, expense: 30 },
  { month: "Jul", income: 72, expense: 42 },
  { month: "Agu", income: 62, expense: 38 },
  { month: "Sep", income: 85, expense: 50 },
  { month: "Okt", income: 70, expense: 40 },
  { month: "Nov", income: 95, expense: 58 },
];

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

function smoothScrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -80,
      duration: 1.2,
    });
  } else {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-white text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <Image
                src="/assets/icon-navbar.png"
                alt="MyFin"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              My<span className="text-emerald-500">Fin.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            <button
              onClick={() => smoothScrollTo("beranda")}
              className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
            >
              Beranda
            </button>
            <button
              onClick={() => smoothScrollTo("fitur")}
              className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
            >
              Fitur
            </button>
            <button
              onClick={() => smoothScrollTo("tentang")}
              className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
            >
              Tentang
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Mulai Sekarang
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="beranda"
        className="relative scroll-mt-20 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-white"
      >
        <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:pb-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
              <Sparkles size={15} className="text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700">
                Cara lebih mudah mengelola keuangan
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-gray-950 sm:text-5xl lg:text-[60px]">
              Kelola Keuangan,
              <span className="block text-emerald-500">Wujudkan Impian.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-500 sm:text-lg">
              Catat pemasukan, pantau pengeluaran, dan rencanakan tabungan
              dengan lebih mudah. Semua kondisi keuanganmu dalam satu tempat
              bersama MyFin.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-600"
              >
                Mulai Kelola Keuangan
                <ArrowRight size={18} />
              </Link>

              <button
                onClick={() => smoothScrollTo("fitur")}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:text-emerald-600"
              >
                Pelajari Fitur
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check size={17} className="text-emerald-500" />
                Mudah digunakan
              </div>
              <div className="flex items-center gap-2">
                <Check size={17} className="text-emerald-500" />
                Data terorganisir
              </div>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[35px] bg-emerald-200/30 blur-2xl" />

            <div className="relative rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-200/70 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Dashboard Keuangan
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    Ringkasan Keuangan
                  </h3>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <Wallet size={22} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg shadow-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-50">Total Saldo</span>
                  <Wallet size={19} className="text-emerald-100" />
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  {formatRupiah(15250000)}
                </h2>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-50">
                  <TrendingUp size={15} />
                  <span>Keuangan kamu terpantau dengan baik</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="rounded-lg bg-emerald-50 p-2">
                      <TrendingUp size={17} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      Pemasukan
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-bold text-gray-900">
                    Rp8,5 jt
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">Bulan ini</p>
                </div>

                <div className="rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-red-500">
                    <div className="rounded-lg bg-red-50 p-2">
                      <TrendingDown size={17} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      Pengeluaran
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-bold text-gray-900">
                    Rp4,25 jt
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">Bulan ini</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Arus Kas
                    </h4>
                    <p className="mt-1 text-xs text-gray-400">
                      Pemasukan dan pengeluaran
                    </p>
                  </div>
                  <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
                    6 Bulan
                  </span>
                </div>

                <div className="mt-5 flex h-32 items-end justify-between gap-3">
                  {monthlyData.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="flex h-full w-full items-end justify-center gap-1">
                        <div
                          className="w-2.5 rounded-t-md bg-emerald-500 sm:w-4"
                          style={{ height: `${item.income}%` }}
                        />
                        <div
                          className="w-2.5 rounded-t-md bg-red-300 sm:w-4"
                          style={{ height: `${item.expense}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-gray-500">Pemasukan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-300" />
                    <span className="text-[11px] text-gray-500">
                      Pengeluaran
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  Transaksi Terbaru
                </span>
                <span className="text-xs font-medium text-emerald-600">
                  Lihat Semua
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {transactions.slice(0, 2).map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl p-2 ${
                            item.income
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          <Icon size={17} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[10px] text-gray-400">
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          item.income ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {item.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute -left-8 top-24 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:flex">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Pemasukan</p>
                <p className="text-sm font-bold text-gray-900">+Rp8,5 jt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
              <Sparkles size={14} />
              Fitur MyFin
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Semua Kebutuhan Keuangan
              <span className="block text-emerald-500">Dalam Satu Tempat</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Kelola keuangan sehari-hari dengan fitur yang dirancang agar
              aktivitas finansial menjadi lebih sederhana dan terarah.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div
                    className={`inline-flex rounded-2xl p-3.5 ${feature.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                    Pelajari
                    <ArrowRight size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="scroll-mt-20 bg-gray-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-100/70 blur-2xl" />

            <div className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Target Keuangan</p>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    Tabungan Impian
                  </h3>
                </div>
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <Target size={23} />
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total terkumpul</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      Rp7.500.000
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                    75%
                  </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                </div>

                <div className="mt-3 flex justify-between text-xs text-gray-400">
                  <span>Rp0</span>
                  <span>Target Rp10.000.000</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Sisa target</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    Rp2.500.000
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="mt-2 flex items-center gap-1.5 text-lg font-bold text-emerald-600">
                    <Check size={17} />
                    Berjalan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
              <Sparkles size={14} />
              Tentang MyFin
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Keuangan Lebih Teratur,
              <span className="block text-emerald-500">
                Hidup Lebih Terarah.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-500">
              MyFin hadir untuk membantu kamu memahami kondisi keuangan dengan
              lebih baik. Melalui pencatatan yang sederhana dan ringkasan yang
              jelas, kamu bisa mengambil keputusan finansial dengan lebih
              percaya diri.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Catat pemasukan dan pengeluaran dengan mudah",
                "Pantau perkembangan kondisi keuangan",
                "Buat perencanaan tabungan dan target finansial",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-600">
                    <Check size={15} />
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-600"
            >
              Mulai Sekarang
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-emerald-600 px-7 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-50 border-white/10" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full border-60 border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Sparkles size={27} />
            </div>

            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Siap Mengelola Keuangan dengan Lebih Baik?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-emerald-50">
              Mulai langkah kecil untuk masa depan finansial yang lebih
              terencana bersama MyFin.
            </p>

            <Link
              href="/register"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-emerald-700 shadow-xl transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              Buat Akun Sekarang
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden ">
                  <Image
                    src="/assets/icon-navbar.png"
                    alt="MyFin"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  My<span className="text-emerald-500">Fin.</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
                Teman untuk mengelola pemasukan, pengeluaran, dan perencanaan
                keuangan agar masa depan lebih terarah.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Navigasi</h4>
              <div className="mt-5 space-y-3">
                <button
                  onClick={() => smoothScrollTo("beranda")}
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Beranda
                </button>
                <button
                  onClick={() => smoothScrollTo("fitur")}
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Fitur
                </button>
                <button
                  onClick={() => smoothScrollTo("tentang")}
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Tentang
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Akun</h4>
              <div className="mt-5 space-y-3">
                <Link
                  href="/login"
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Daftar
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-sm text-gray-500 transition hover:text-emerald-600"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gray-100 pt-7 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-400">
              © 2026 MyFin. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Kelola keuangan dengan lebih mudah.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
