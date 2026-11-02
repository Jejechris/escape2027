"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Rundown", href: "/rundown" },
  { label: "Database Kampus", href: "/direktori-stan" },
  { label: "Denah Acara", href: "/peta-kampus" },
  { label: "Alumni Sixteen", href: "/alumni" },
  { label: "Tanya Jawab", href: "/tanya-jawab" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* COMIC ISSUE HEADER RIBBON */}
      <div className="w-full bg-[#F5B700] border-b-4 border-[#141414] py-1.5 px-4 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[#141414]">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="bg-[#0B5E2E] text-white px-2 py-0.5 border border-[#141414] text-[10px] sm:text-xs font-display tracking-wider uppercase">
              BULETIN RESMI
            </span>
            <span className="text-[11px] sm:text-xs font-display uppercase tracking-wide truncate">
              EXHIBITION SIXTEEN CAMPUS EXPO • SMAN 16 SURABAYA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-display uppercase tracking-wider">
            <span>KAMIS, 21 JANUARI 2027</span>
            <span className="w-1.5 h-1.5 bg-[#141414] rounded-full inline-block" />
            <span>07.30 — 15.00 WIB</span>
          </div>
        </div>
      </div>

      {/* TOP APP BAR / COMIC MASTHEAD */}
      <header className="w-full bg-[#FAF8F2] border-b-4 border-[#141414] shadow-[0px_4px_0px_#141414] sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center">
          {/* Comic Masthead Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 shrink-0 bg-[#141414] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] rounded-full overflow-hidden group-hover:rotate-6 transition-transform">
              <Image
                src="/logo-escape-2027.png"
                alt="Logo Resmi ESCAPE 2027"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="bg-[#0B5E2E] text-white px-3 py-1 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] transform -rotate-2 group-hover:rotate-0 transition-transform">
              <span className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white leading-none block">
                ESCAPE 2027
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display text-[10px] bg-[#F5B700] text-[#141414] px-1.5 py-0.2 border border-[#141414] tracking-wider uppercase shadow-[1px_1px_0px_#141414]">
                EDISI XVI
              </span>
              <span className="font-body text-[9px] font-bold text-[#404940] tracking-tight">
                SMAN 16 SBY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display uppercase tracking-wider text-sm transition-all pb-0.5 ${
                    isActive
                      ? "text-[#0B5E2E] border-b-4 border-[#0B5E2E]"
                      : "text-[#141414] hover:text-[#0B5E2E] hover:border-b-4 hover:border-[#0B5E2E]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#tiket"
              className="hidden sm:inline-flex bg-[#0B5E2E] text-white font-display text-sm uppercase tracking-wider px-4 py-2 border-2 border-[#141414] shadow-comic hover:bg-[#1E8449] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all items-center gap-2"
            >
              <span>Daftar Tiket / Presensi</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-[#F5B700] border-2 border-[#141414] shadow-comic-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              <div className="w-5 flex flex-col gap-1">
                <span
                  className={`block w-full h-0.5 bg-[#141414] transition-transform ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-[#141414] transition-opacity ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-[#141414] transition-transform ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-4 border-[#141414] bg-[#FAF8F2] px-4 py-4 shadow-comic-lg">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 border-2 border-[#141414] font-display text-base uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#0B5E2E] text-white shadow-comic-sm translate-x-1"
                        : "bg-white text-[#141414] hover:bg-[#F0EEE8]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/#tiket"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center bg-[#F5B700] text-[#141414] font-display text-base uppercase tracking-wider px-4 py-2.5 border-2 border-[#141414] shadow-comic"
              >
                Daftar Tiket / Presensi
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
