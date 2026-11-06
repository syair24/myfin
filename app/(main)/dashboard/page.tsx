import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowDownLeft,
  ArrowRight,
  CalendarDays,
  ShoppingBag,
  House,
  Car,
  Coffee,
} from "lucide-react";

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

// Data contoh. Nantinya bisa diganti dengan data dari database/API.
const statistics = [
  {
    title: "Total Saldo",
    amount: 15250000,
    description: "Saldo keuangan saat ini",
    icon: Wallet,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Pemasukan",
    amount: 8500000,
    description: "Pemasukan bulan ini",
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Pengeluaran",
    amount: 4250000,
    description: "Pengeluaran bulan ini",
    icon: TrendingDown,
    color: "bg-red-50 text-red-500",
  },
  {
    title: "Total Tabungan",
    amount: 3250000,
    description: "Tabungan bulan ini",
    icon: PiggyBank,
    color: "bg-purple-50 text-purple-600",
  },
];

const monthlyData = [
  { month: "Jun", income: 65, expense: 38 },
  { month: "Jul", income: 78, expense: 48 },
  { month: "Agu", income: 70, expense: 43 },
  { month: "Sep", income: 90, expense: 55 },
  { month: "Okt", income: 75, expense: 45 },
  { month: "Nov", income: 95, expense: 60 },
];

const categories = [
  {
    name: "Makanan & Minuman",
    amount: 1250000,
    percentage: 70,
    icon: Coffee,
    color: "bg-emerald-500",
  },
  {
    name: "Belanja",
    amount: 950000,
    percentage: 55,
    icon: ShoppingBag,
    color: "bg-blue-500",
  },
  {
    name: "Tempat Tinggal",
    amount: 1200000,
    percentage: 80,
    icon: House,
    color: "bg-purple-500",
  },
  {
    name: "Transportasi",
    amount: 500000,
    percentage: 35,
    icon: Car,
    color: "bg-orange-500",
  },
];

const transactions = [
  {
    name: "Gaji Bulanan",
    category: "Pekerjaan",
    date: "05 Nov 2026",
    amount: 7500000,
    type: "income",
    icon: ArrowDownLeft,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Belanja Bulanan",
    category: "Belanja",
    date: "04 Nov 2026",
    amount: 850000,
    type: "expense",
    icon: ShoppingBag,
    color: "bg-orange-50 text-orange-500",
  },
  {
    name: "Makan Siang",
    category: "Makanan",
    date: "03 Nov 2026",
    amount: 75000,
    type: "expense",
    icon: Coffee,
    color: "bg-blue-50 text-blue-500",
  },
  {
    name: "Freelance",
    category: "Pekerjaan",
    date: "02 Nov 2026",
    amount: 1000000,
    type: "income",
    icon: ArrowDownLeft,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Transportasi",
    category: "Transportasi",
    date: "01 Nov 2026",
    amount: 125000,
    type: "expense",
    icon: Car,
    color: "bg-purple-50 text-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Selamat datang! Berikut ringkasan keuangan kamu.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
            <CalendarDays size={17} className="text-emerald-600" />
            November 2026
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <div className={`rounded-xl p-2.5 ${item.color}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                  {formatRupiah(item.amount)}
                </h2>

                <p className="mt-2 text-xs text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Chart and Categories */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Monthly Chart */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-gray-900">Arus Kas</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Perbandingan pemasukan dan pengeluaran
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-500">Pemasukan</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="text-gray-500">Pengeluaran</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-gray-100 pb-2">
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1.5">
                    <div
                      className="w-full max-w-8 rounded-t-md bg-emerald-500 transition-all hover:bg-emerald-600"
                      style={{ height: `${item.income}%` }}
                      title={`Pemasukan ${item.month}`}
                    />

                    <div
                      className="w-full max-w-8 rounded-t-md bg-red-400 transition-all hover:bg-red-500"
                      style={{ height: `${item.expense}%` }}
                      title={`Pengeluaran ${item.month}`}
                    />
                  </div>

                  <span className="text-xs text-gray-400">{item.month}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Category Budget */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Anggaran Kategori
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Pengeluaran berdasarkan kategori
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <div key={category.name}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon size={17} className="shrink-0 text-gray-400" />
                        <span className="truncate text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs text-gray-500">
                        {category.percentage}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>

                    <p className="mt-1.5 text-xs text-gray-400">
                      {formatRupiah(category.amount)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Recent Transactions */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
            <div>
              <h2 className="font-semibold text-gray-900">Transaksi Terbaru</h2>
              <p className="mt-1 text-sm text-gray-500">
                Riwayat transaksi keuangan kamu
              </p>
            </div>

            <Link
              href="/transaksi"
              className="flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
            >
              Lihat Semua
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.map((transaction, index) => {
              const Icon = transaction.icon;
              const isIncome = transaction.type === "income";

              return (
                <div
                  key={`${transaction.name}-${index}`}
                  className="flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`rounded-xl p-2.5 ${transaction.color}`}>
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {transaction.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {transaction.category} · {transaction.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`shrink-0 text-sm font-semibold ${
                      isIncome ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(transaction.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Note */}
        <p className="pb-2 text-center text-xs text-gray-400">
          MyFin · Kelola keuangan dengan lebih mudah
        </p>
      </div>
    </div>
  );
}
