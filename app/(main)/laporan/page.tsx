"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  Utensils,
  Car,
  ShoppingBag,
  House,
  HeartPulse,
  Gamepad2,
  CalendarDays,
  Download,
  Receipt,
} from "lucide-react";

type Period = "Minggu ini" | "Bulan ini" | "Tahun ini";

type Transaction = {
  id: number;
  name: string;
  category: string;
  type: "Pemasukan" | "Pengeluaran";
  amount: number;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Gaji Bulanan",
    category: "Gaji",
    type: "Pemasukan",
    amount: 3700000,
    date: "2026-11-05",
  },
  {
    id: 2,
    name: "Belanja Shopee",
    category: "Belanja",
    type: "Pengeluaran",
    amount: 454000,
    date: "2026-11-05",
  },
  {
    id: 3,
    name: "Makan Siang",
    category: "Makanan",
    type: "Pengeluaran",
    amount: 35000,
    date: "2026-11-04",
  },
  {
    id: 4,
    name: "Transportasi",
    category: "Transportasi",
    type: "Pengeluaran",
    amount: 50000,
    date: "2026-11-04",
  },
  {
    id: 5,
    name: "Project Freelance",
    category: "Freelance",
    type: "Pemasukan",
    amount: 850000,
    date: "2026-11-03",
  },
  {
    id: 6,
    name: "Tagihan Listrik",
    category: "Tempat Tinggal",
    type: "Pengeluaran",
    amount: 250000,
    date: "2026-11-03",
  },
  {
    id: 7,
    name: "Belanja Bulanan",
    category: "Makanan",
    type: "Pengeluaran",
    amount: 320000,
    date: "2026-11-02",
  },
  {
    id: 8,
    name: "Bonus",
    category: "Bonus",
    type: "Pemasukan",
    amount: 500000,
    date: "2026-11-01",
  },
];

const categoryData = [
  { name: "Makanan", amount: 850000, color: "bg-orange-500", icon: Utensils },
  {
    name: "Belanja",
    amount: 650000,
    color: "bg-violet-500",
    icon: ShoppingBag,
  },
  { name: "Tempat Tinggal", amount: 500000, color: "bg-blue-500", icon: House },
  { name: "Transportasi", amount: 350000, color: "bg-emerald-500", icon: Car },
  { name: "Kesehatan", amount: 200000, color: "bg-pink-500", icon: HeartPulse },
  { name: "Hiburan", amount: 150000, color: "bg-yellow-500", icon: Gamepad2 },
];

const weeklyData = [
  { day: "Sen", income: 0, expense: 320000 },
  { day: "Sel", income: 850000, expense: 250000 },
  { day: "Rab", income: 0, expense: 85000 },
  { day: "Kam", income: 3700000, expense: 489000 },
  { day: "Jum", income: 0, expense: 0 },
  { day: "Sab", income: 0, expense: 0 },
  { day: "Min", income: 500000, expense: 0 },
];

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function LaporanPage() {
  const [period, setPeriod] = useState<Period>("Bulan ini");
  const [transactionFilter, setTransactionFilter] = useState("Semua");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const month = transaction.date.slice(5, 7);
      const year = transaction.date.slice(0, 4);
      const day = Number(transaction.date.slice(8, 10));

      let matchesPeriod = true;

      if (period === "Minggu ini") {
        matchesPeriod = day >= 2 && day <= 8;
      } else if (period === "Bulan ini") {
        matchesPeriod = month === "11" && year === "2026";
      } else if (period === "Tahun ini") {
        matchesPeriod = year === "2026";
      }

      const matchesType =
        transactionFilter === "Semua" || transaction.type === transactionFilter;

      return matchesPeriod && matchesType;
    });
  }, [period, transactionFilter]);

  const income = filteredTransactions
    .filter((item) => item.type === "Pemasukan")
    .reduce((total, item) => total + item.amount, 0);

  const expense = filteredTransactions
    .filter((item) => item.type === "Pengeluaran")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;
  const maxChartValue = Math.max(
    ...weeklyData.map((item) => Math.max(item.income, item.expense)),
    1,
  );

  const totalCategory = categoryData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <span>Keuangan</span>
              <span>/</span>
              <span className="text-gray-700">Laporan</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Laporan Keuangan
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Pantau dan analisis kondisi keuanganmu.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            <Download size={17} />
            Cetak Laporan
          </button>
        </div>

        {/* Period Filter */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <CalendarDays size={18} />
            Periode laporan
          </div>

          <div className="flex rounded-xl border border-gray-200 bg-white p-1">
            {(["Minggu ini", "Bulan ini", "Tahun ini"] as Period[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    period === item
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ArrowDownLeft size={22} />
              </div>
              <span className="text-xs font-medium text-gray-400">
                Total pemasukan
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Pemasukan</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {formatRupiah(income)}
            </h2>
            <p className="mt-2 text-xs text-emerald-600">
              <TrendingUp className="mr-1 inline" size={14} />
              Uang yang masuk
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <ArrowUpRight size={22} />
              </div>
              <span className="text-xs font-medium text-gray-400">
                Total pengeluaran
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Pengeluaran</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {formatRupiah(expense)}
            </h2>
            <p className="mt-2 text-xs text-red-500">
              <TrendingDown className="mr-1 inline" size={14} />
              Uang yang keluar
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Wallet size={22} />
              </div>
              <span className="text-xs font-medium text-gray-400">
                Selisih pemasukan dan pengeluaran
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Sisa uang</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {formatRupiah(balance)}
            </h2>
            <p className="mt-2 text-xs text-blue-600">
              Saldo bersih periode ini
            </p>
          </div>
        </div>

        {/* Chart and Category */}
        <div className="grid gap-5 xl:grid-cols-3">
          {/* Chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold text-gray-900">Grafik Keuangan</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Perbandingan pemasukan dan pengeluaran
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2 text-gray-500">
                  <span className="size-2.5 rounded-full bg-emerald-500" />
                  Pemasukan
                </span>
                <span className="flex items-center gap-2 text-gray-500">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  Pengeluaran
                </span>
              </div>
            </div>

            <div className="mt-8 flex h-64 items-end justify-between gap-2 border-b border-gray-100 px-1">
              {weeklyData.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      title={`Pemasukan: ${formatRupiah(item.income)}`}
                      className="w-3 rounded-t-md bg-emerald-500 transition-all hover:bg-emerald-600 sm:w-5"
                      style={{
                        height: `${Math.max(
                          (item.income / maxChartValue) * 85,
                          item.income > 0 ? 4 : 0,
                        )}%`,
                      }}
                    />
                    <div
                      title={`Pengeluaran: ${formatRupiah(item.expense)}`}
                      className="w-3 rounded-t-md bg-red-400 transition-all hover:bg-red-500 sm:w-5"
                      style={{
                        height: `${Math.max(
                          (item.expense / maxChartValue) * 85,
                          item.expense > 0 ? 4 : 0,
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="pb-2 text-xs text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900">Pengeluaran Kategori</h3>
              <p className="mt-1 text-xs text-gray-400">
                Rincian pengeluaran berdasarkan kategori
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-400">Total pengeluaran</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {formatRupiah(totalCategory)}
              </h2>
            </div>

            <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-gray-100">
              {categoryData.map((item) => (
                <div
                  key={item.name}
                  className={`${item.color} h-full`}
                  style={{
                    width: `${(item.amount / totalCategory) * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {categoryData.map((item) => {
                const Icon = item.icon;
                const percentage = Math.round(
                  (item.amount / totalCategory) * 100,
                );

                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2 text-xs">
                        <span className="truncate font-semibold text-gray-700">
                          {item.name}
                        </span>
                        <span className="text-gray-400">{percentage}%</span>
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatRupiah(item.amount)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-gray-900">Rincian Transaksi</h3>
              <p className="mt-1 text-xs text-gray-400">
                Daftar transaksi pada periode yang dipilih
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["Semua", "Pemasukan", "Pengeluaran"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTransactionFilter(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    transactionFilter === item
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Transaksi</th>
                  <th className="px-5 py-4 font-medium">Kategori</th>
                  <th className="px-5 py-4 font-medium">Tanggal</th>
                  <th className="px-5 py-4 font-medium">Jenis</th>
                  <th className="px-5 py-4 text-right font-medium">Nominal</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {new Date(`${item.date}T00:00:00`).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.type === "Pemasukan"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-semibold ${
                          item.type === "Pemasukan"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.type === "Pemasukan" ? "+" : "-"}
                        {formatRupiah(item.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-gray-400"
                    >
                      Tidak ada transaksi pada periode ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400">
              Menampilkan {filteredTransactions.length} transaksi
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Receipt size={15} />
              Data laporan MyFin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
