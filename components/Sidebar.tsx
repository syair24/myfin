"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  ChartNoAxesCombined,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transaksi",
    href: "/transaksi",
    icon: ArrowLeftRight,
  },
  {
    name: "Kategori",
    href: "/kategori",
    icon: Tags,
  },
  {
    name: "Laporan",
    href: "/laporan",
    icon: ChartNoAxesCombined,
  },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
    fixed left-0 top-14 bottom-0 z-40
    w-55 overflow-hidden
    border-r border-gray-100 bg-white
    transition-all duration-300 ease-in-out

    ${
      isOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0 md:w-0 md:border-r-0"
    }
  `}
    >
      {/* Area Scroll Sidebar */}
      <div className="h-full w-55 overflow-x-hidden overflow-y-auto overscroll-contain">
        <div className="p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu Utama
          </p>

          <div className="space-y-2">
            {menus.map((menu) => {
              const Icon = menu.icon;

              const active =
                pathname === menu.href || pathname.startsWith(menu.href + "/");

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`
                    flex items-center gap-3 rounded-xl px-4 py-3
                    text-sm font-medium transition-colors duration-200

                    ${
                      active
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {menu.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
