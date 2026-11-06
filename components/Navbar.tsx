"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRound, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";

export default function Navbar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const hideNavigation = [
    "/",
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
  ].includes(pathname);

  if (hideNavigation) {
    return <div className="min-h-dvh">{children}</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-14 shrink-0 border-b border-gray-100 bg-white">
        <nav className="mx-auto flex h-14 w-full items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-5">
            {/* Hamburger */}
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              aria-expanded={isSidebarOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-emerald-600"
            >
              <Menu size={23} strokeWidth={1.8} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/assets/icon-navbar.png"
                alt="MyFin Logo"
                width={40}
                height={40}
                priority
                className="rounded-lg object-contain"
              />

              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                My<span className="text-emerald-500">Fin</span>
              </h1>
            </Link>
          </div>

          {/* User Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-full py-1 pl-3 pr-1.5 transition hover:bg-gray-50"
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-5 text-gray-800">
                Admin Dompetku
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100">
              <UserRound size={19} strokeWidth={1.8} />
            </div>
          </Link>
        </nav>
      </header>

      {/* Sidebar dan Main Content */}
      <div className="relative flex min-h-0 flex-1">
        {/* Overlay Mobile */}
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 z-30 bg-transparent md:hidden"
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          className={`
            min-w-0 flex-1
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "md:ml-55" : "md:ml-0"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
