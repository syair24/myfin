import type { Metadata } from "next";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyFin - Personal Finance Management",
    template: "%s | MyFin",
  },
  description:
    "MyFin adalah aplikasi pengelola keuangan pribadi untuk mencatat transaksi, mengatur kategori, dan memantau kondisi keuangan dengan mudah.",
  applicationName: "MyFin",
  keywords: [
    "MyFin",
    "Keuangan Pribadi",
    "Personal Finance",
    "Manajemen Keuangan",
    "Catatan Keuangan",
  ],
  authors: [{ name: "MyFin" }],
  creator: "MyFin",
  openGraph: {
    title: "MyFin - Personal Finance Management",
    description:
      "Kelola keuangan pribadi dengan lebih mudah dan terorganisir bersama MyFin.",
    siteName: "MyFin",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/assets/icon-navbar.png",
    shortcut: "/assets/icon-navbar.png",
    apple: "/assets/icon-navbar.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <SmoothScrollProvider>
          <Navbar>{children}</Navbar>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
