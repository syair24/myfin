"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Tags,
  TrendingUp,
  TrendingDown,
  Wallet,
  Utensils,
  Car,
  ShoppingBag,
  House,
  HeartPulse,
  GraduationCap,
  Gamepad2,
  BriefcaseBusiness,
  Laptop,
  Gift,
  CircleDollarSign,
  X,
  Trash2,
  Filter,
} from "lucide-react";

type CategoryType = "Pemasukan" | "Pengeluaran";

interface Category {
  id: number;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  bg: string;
}

const iconOptions = [
  { name: "Utensils", icon: Utensils },
  { name: "Car", icon: Car },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "House", icon: House },
  { name: "HeartPulse", icon: HeartPulse },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "BriefcaseBusiness", icon: BriefcaseBusiness },
  { name: "Laptop", icon: Laptop },
  { name: "Gift", icon: Gift },
  { name: "Wallet", icon: Wallet },
  { name: "CircleDollarSign", icon: CircleDollarSign },
];

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Gaji",
    type: "Pemasukan",
    icon: "BriefcaseBusiness",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 2,
    name: "Freelance",
    type: "Pemasukan",
    icon: "Laptop",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    name: "Bonus",
    type: "Pemasukan",
    icon: "Gift",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: 4,
    name: "Makanan",
    type: "Pengeluaran",
    icon: "Utensils",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 5,
    name: "Transportasi",
    type: "Pengeluaran",
    icon: "Car",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 6,
    name: "Belanja",
    type: "Pengeluaran",
    icon: "ShoppingBag",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    id: 7,
    name: "Tempat Tinggal",
    type: "Pengeluaran",
    icon: "House",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: 8,
    name: "Kesehatan",
    type: "Pengeluaran",
    icon: "HeartPulse",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: 9,
    name: "Pendidikan",
    type: "Pengeluaran",
    icon: "GraduationCap",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: 10,
    name: "Hiburan",
    type: "Pengeluaran",
    icon: "Gamepad2",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function KategoriPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<CategoryType>("Pengeluaran");
  const [selectedIcon, setSelectedIcon] = useState("Wallet");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesFilter =
        activeFilter === "Semua" || category.type === activeFilter;

      const matchesSearch = category.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [categories, activeFilter, search]);

  const incomeCount = categories.filter(
    (item) => item.type === "Pemasukan",
  ).length;

  const expenseCount = categories.filter(
    (item) => item.type === "Pengeluaran",
  ).length;

  const addCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      name: categoryName.trim(),
      type: categoryType,
      icon: selectedIcon,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    };

    setCategories((prev) => [...prev, newCategory]);
    setCategoryName("");
    setCategoryType("Pengeluaran");
    setSelectedIcon("Wallet");
    setIsModalOpen(false);
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (iconName: string) => {
    return iconOptions.find((item) => item.name === iconName)?.icon ?? Wallet;
  };

  return (
    <div className="min-h-dvh bg-gray-50/70 p-5 sm:p-7 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-medium text-emerald-600">Kategori</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Kategori
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kelola kategori pemasukan dan pengeluaran kamu.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <Plus size={19} />
            Tambah Kategori
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <Tags size={21} />
              </div>
              <span className="text-xs font-medium text-gray-400">
                Total kategori
              </span>
            </div>

            <div className="mt-5">
              <p className="text-3xl font-bold text-gray-900">
                {categories.length}
              </p>
              <p className="mt-1 text-sm text-gray-500">Kategori terdaftar</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={21} />
              </div>
              <span className="text-xs font-medium text-emerald-600">
                Pemasukan
              </span>
            </div>

            <div className="mt-5">
              <p className="text-3xl font-bold text-gray-900">{incomeCount}</p>
              <p className="mt-1 text-sm text-gray-500">Kategori pemasukan</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <TrendingDown size={21} />
              </div>
              <span className="text-xs font-medium text-rose-600">
                Pengeluaran
              </span>
            </div>

            <div className="mt-5">
              <p className="text-3xl font-bold text-gray-900">{expenseCount}</p>
              <p className="mt-1 text-sm text-gray-500">Kategori pengeluaran</p>
            </div>
          </div>
        </div>

        {/* Category List */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Daftar Kategori
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Semua kategori keuangan kamu.
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kategori..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                />
              </div>

              {/* Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={16} className="text-gray-400" />

                {["Semua", "Pemasukan", "Pengeluaran"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeFilter === filter
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
            {filteredCategories.map((category) => {
              const Icon = getIcon(category.icon);

              return (
                <div
                  key={category.id}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-emerald-200 hover:shadow-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.bg} ${category.color}`}
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {category.name}
                      </p>

                      <p
                        className={`mt-1 text-xs ${
                          category.type === "Pemasukan"
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}
                      >
                        {category.type}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCategory(category.id)}
                    aria-label={`Hapus kategori ${category.name}`}
                    className="rounded-lg p-2 text-gray-300 opacity-100 transition hover:bg-rose-50 hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <Search size={24} />
                </div>
                <p className="font-semibold text-gray-700">
                  Kategori tidak ditemukan
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Coba gunakan kata kunci lain.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Tambah Kategori
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Buat kategori keuangan baru.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nama Kategori
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Contoh: Makan, Gaji, Transportasi"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
              />
            </div>

            {/* Type */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Jenis Kategori
              </label>

              <div className="grid grid-cols-2 gap-3">
                {(["Pemasukan", "Pengeluaran"] as CategoryType[]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setCategoryType(type)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        categoryType === type
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Icon */}
            <div className="mb-7">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Pilih Ikon
              </label>

              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedIcon(item.name)}
                      aria-label={`Pilih ikon ${item.name}`}
                      className={`flex h-11 items-center justify-center rounded-xl border transition ${
                        selectedIcon === item.name
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                onClick={addCategory}
                disabled={!categoryName.trim()}
                className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Simpan Kategori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
