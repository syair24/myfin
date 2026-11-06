"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ShoppingBag,
  Utensils,
  Briefcase,
  House,
  Car,
  CircleDollarSign,
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================

type TransactionType = "income" | "expense";
type TypeFilter = "all" | TransactionType;

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
  note?: string;
}

// =====================================================
// DATA CONTOH
// =====================================================

const initialTransactions: Transaction[] = [
  {
    id: "1",
    name: "Gaji Bulanan",
    category: "Pekerjaan",
    date: "2026-11-05",
    amount: 7500000,
    type: "income",
  },
  {
    id: "2",
    name: "Belanja Bulanan",
    category: "Belanja",
    date: "2026-11-04",
    amount: 850000,
    type: "expense",
  },
  {
    id: "3",
    name: "Makan Siang",
    category: "Makanan & Minuman",
    date: "2026-11-03",
    amount: 75000,
    type: "expense",
  },
  {
    id: "4",
    name: "Freelance",
    category: "Pekerjaan",
    date: "2026-11-02",
    amount: 1000000,
    type: "income",
  },
  {
    id: "5",
    name: "Transportasi",
    category: "Transportasi",
    date: "2026-11-01",
    amount: 125000,
    type: "expense",
  },
  {
    id: "6",
    name: "Bayar Kontrakan",
    category: "Tempat Tinggal",
    date: "2026-11-01",
    amount: 1200000,
    type: "expense",
  },
  {
    id: "7",
    name: "Pembelian Perlengkapan",
    category: "Belanja",
    date: "2026-11-01",
    amount: 2000000,
    type: "expense",
  },
];

const incomeCategories = [
  "Pekerjaan",
  "Bisnis",
  "Investasi",
  "Hadiah",
  "Lainnya",
];

const expenseCategories = [
  "Makanan & Minuman",
  "Belanja",
  "Transportasi",
  "Tempat Tinggal",
  "Kesehatan",
  "Hiburan",
  "Pendidikan",
  "Lainnya",
];

// =====================================================
// HELPERS
// =====================================================

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Pekerjaan":
    case "Bisnis":
      return Briefcase;
    case "Makanan & Minuman":
      return Utensils;
    case "Belanja":
      return ShoppingBag;
    case "Tempat Tinggal":
      return House;
    case "Transportasi":
      return Car;
    default:
      return CircleDollarSign;
  }
};

// =====================================================
// PAGE
// =====================================================

export default function TransaksiPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<TypeFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2026-11");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "expense" as TransactionType,
    amount: "",
    category: expenseCategories[0],
    date: "2026-11-05",
    note: "",
  });

  const itemsPerPage = 6;

  // =====================================================
  // SUMMARY
  // =====================================================

  const monthlyTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        transaction.date.startsWith(selectedMonth),
      ),
    [transactions, selectedMonth],
  );

  const totalIncome = monthlyTransactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const monthLabel = new Date(
    `${selectedMonth}-01T00:00:00`,
  ).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  // =====================================================
  // FILTER
  // =====================================================

  const filteredTransactions = useMemo(() => {
    return monthlyTransactions
      .filter((item) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword);

        const matchesType =
          selectedType === "all" || item.type === selectedType;

        const matchesCategory =
          selectedCategory === "all" || item.category === selectedCategory;

        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [monthlyTransactions, search, selectedType, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedTransactions = filteredTransactions.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const resetPage = () => setCurrentPage(1);

  // =====================================================
  // ADD TRANSACTION
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      name: "",
      type: "expense",
      amount: "",
      category: expenseCategories[0],
      date: `${selectedMonth}-05`,
      note: "",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // EDIT TRANSACTION
  // =====================================================

  const openEditModal = (transaction: Transaction) => {
    setEditingId(transaction.id);

    setFormData({
      name: transaction.name,
      type: transaction.type,
      amount: String(transaction.amount),
      category: transaction.category,
      date: transaction.date,
      note: transaction.note ?? "",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // SAVE TRANSACTION
  // =====================================================

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const newTransaction: Transaction = {
      id: editingId ?? String(Date.now()),
      name: formData.name.trim(),
      type: formData.type,
      amount,
      category: formData.category,
      date: formData.date,
      note: formData.note.trim(),
    };

    if (editingId) {
      setTransactions((prev) =>
        prev.map((item) => (item.id === editingId ? newTransaction : item)),
      );
    } else {
      setTransactions((prev) => [newTransaction, ...prev]);
    }

    setSelectedMonth(formData.date.slice(0, 7));
    setSelectedType("all");
    setSelectedCategory("all");
    setSearch("");
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  // =====================================================
  // DELETE TRANSACTION
  // =====================================================

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus transaksi ini?",
    );

    if (!confirmed) return;

    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  // =====================================================
  // CATEGORY OPTIONS
  // =====================================================

  const categories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  const filterCategories = [
    ...new Set(monthlyTransactions.map((item) => item.category)),
  ];

  const getCategoryColor = (type: TransactionType) =>
    type === "income"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-orange-50 text-orange-500";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Transaksi
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola seluruh pemasukan dan pengeluaran kamu.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <Plus size={18} />
            Tambah Transaksi
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Income */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Pemasukan
              </p>
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <TrendingUp size={21} />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
              {formatRupiah(totalIncome)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">{monthLabel}</p>
          </div>

          {/* Expense */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Pengeluaran
              </p>
              <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                <TrendingDown size={21} />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
              {formatRupiah(totalExpense)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">{monthLabel}</p>
          </div>

          {/* Balance */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Selisih</p>
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <Wallet size={21} />
              </div>
            </div>

            <h2
              className={`mt-4 text-xl font-bold sm:text-2xl ${
                balance >= 0 ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {formatRupiah(balance)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Pemasukan dikurangi pengeluaran
            </p>
          </div>
        </div>

        {/* TRANSACTION LIST */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* SECTION HEADER */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-gray-900">Daftar Transaksi</h2>
              <p className="mt-1 text-sm text-gray-500">
                Riwayat transaksi keuangan kamu.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600">
              <CalendarDays size={17} className="text-emerald-600" />
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  resetPage();
                }}
                className="min-w-0 bg-transparent outline-none"
                aria-label="Pilih bulan transaksi"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="space-y-4 p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Cari nama atau kategori transaksi..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    resetPage();
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                />
              </div>

              {/* Category Filter */}
              <div className="relative flex items-center">
                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-3 text-gray-400"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    resetPage();
                  }}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-9 text-sm text-gray-600 outline-none focus:border-emerald-400 sm:w-52"
                >
                  <option value="all">Semua Kategori</option>

                  {filterCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TYPE FILTER */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Semua", value: "all" },
                { label: "Pemasukan", value: "income" },
                { label: "Pengeluaran", value: "expense" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setSelectedType(filter.value as TypeFilter);
                    resetPage();
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    selectedType === filter.value
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}

              <span className="ml-auto text-xs text-gray-400">
                {filteredTransactions.length} transaksi
              </span>
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-y border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Transaksi
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Jenis
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Nominal
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category);
                  const isIncome = transaction.type === "income";

                  return (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`rounded-xl p-2.5 ${getCategoryColor(
                              transaction.type,
                            )}`}
                          >
                            <Icon size={19} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {transaction.name}
                            </p>
                            {transaction.note && (
                              <p className="mt-1 text-xs text-gray-400">
                                {transaction.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transaction.category}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            isIncome
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {isIncome ? (
                            <ArrowDownLeft size={13} />
                          ) : (
                            <ArrowUpRight size={13} />
                          )}
                          {isIncome ? "Pemasukan" : "Pengeluaran"}
                        </span>
                      </td>

                      <td
                        className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${
                          isIncome ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatRupiah(transaction.amount)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEditModal(transaction)}
                            title="Edit transaksi"
                            aria-label={`Edit ${transaction.name}`}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(transaction.id)}
                            title="Hapus transaksi"
                            aria-label={`Hapus ${transaction.name}`}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="divide-y divide-gray-100 md:hidden">
            {paginatedTransactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.category);
              const isIncome = transaction.type === "income";

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`shrink-0 rounded-xl p-2.5 ${getCategoryColor(
                        transaction.type,
                      )}`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {transaction.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-400">
                        {transaction.category} · {formatDate(transaction.date)}
                      </p>

                      <span
                        className={`mt-1 inline-block text-xs font-medium ${
                          isIncome ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {isIncome ? "Pemasukan" : "Pengeluaran"}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-semibold ${
                        isIncome ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatRupiah(transaction.amount)}
                    </p>

                    <div className="mt-2 flex justify-end gap-1">
                      <button
                        onClick={() => openEditModal(transaction)}
                        aria-label={`Edit ${transaction.name}`}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(transaction.id)}
                        aria-label={`Hapus ${transaction.name}`}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {paginatedTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="rounded-2xl bg-gray-100 p-4 text-gray-400">
                <Search size={27} />
              </div>

              <h3 className="mt-4 font-semibold text-gray-800">
                Transaksi tidak ditemukan
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Coba ubah pencarian atau filter transaksi kamu.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedType("all");
                  setSelectedCategory("all");
                  resetPage();
                }}
                className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              Menampilkan{" "}
              {filteredTransactions.length === 0
                ? 0
                : (safePage - 1) * itemsPerPage + 1}
              {" - "}
              {Math.min(
                safePage * itemsPerPage,
                filteredTransactions.length,
              )}{" "}
              dari {filteredTransactions.length} transaksi
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={safePage <= 1}
                onClick={() => setCurrentPage(safePage - 1)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />
                Sebelumnya
              </button>

              <span className="px-2 text-xs text-gray-500">
                {safePage} / {totalPages}
              </span>

              <button
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage(safePage + 1)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Selanjutnya
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <p className="pb-2 text-center text-xs text-gray-400">
          MyFin · Kelola keuangan dengan lebih mudah
        </p>
      </div>

      {/* ================================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================= */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  id="transaction-modal-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {editingId ? "Edit Transaksi" : "Tambah Transaksi"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Lengkapi informasi transaksi kamu.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup modal"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Jenis Transaksi
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: "income",
                        category: incomeCategories[0],
                      }))
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition ${
                      formData.type === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <TrendingUp size={17} />
                    Pemasukan
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: "expense",
                        category: expenseCategories[0],
                      }))
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition ${
                      formData.type === "expense"
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <TrendingDown size={17} />
                    Pengeluaran
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Transaksi
                </label>

                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Contoh: Gaji Bulanan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nominal
                </label>

                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  placeholder="Masukkan nominal"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                />
              </div>

              {/* Category and Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kategori
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-400"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Catatan (Opsional)
                </label>

                <textarea
                  rows={3}
                  maxLength={500}
                  placeholder="Tambahkan catatan transaksi..."
                  value={formData.note}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                >
                  {editingId ? "Simpan Perubahan" : "Simpan Transaksi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
