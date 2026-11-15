"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Building,
  GraduationCap,
} from "lucide-react";

interface RouteLockdownGuardProps {
  pageTitle: string;
  pageSubtitle?: string;
  children: React.ReactNode;
}

export default function RouteLockdownGuard({
  pageTitle,
  pageSubtitle,
  children,
}: RouteLockdownGuardProps) {
  const [bypassed, setBypassed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  // Countdown timer to 21 Januari 2027
  const targetDate = new Date("2027-01-21T07:30:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    // Only bypass if explicitly requested via query param ?bypass=sixteen2027 on this exact page
    if (typeof window !== "undefined") {
      // Clean up any old global bypass keys
      try {
        sessionStorage.removeItem("escape_bypass_lockdown");
        localStorage.removeItem("escape_bypass_lockdown");
      } catch {}

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("bypass") === "sixteen2027") {
        setBypassed(true);
      }
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === "sixteen2027") {
      setBypassed(true);
      setShowPasscodeModal(false);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // If unlocked by committee on this page:
  if (bypassed) {
    return (
      <>
        {/* Sticky Warning Bar for Committee */}
        <div className="w-full bg-[#F5B700] text-[#141414] border-b-4 border-[#141414] py-2 px-4 sticky top-0 z-[100] shadow-[0px_3px_0px_#141414]">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs font-display uppercase tracking-wider font-bold">
            <div className="flex items-center gap-2">
              <Unlock className="w-4 h-4 text-[#0B5E2E]" />
              <span>
                PRATINJAU PANITIA 64 &amp; IKAPOS: Halaman &ldquo;{pageTitle}&rdquo; ini terkunci untuk pengunjung umum.
              </span>
            </div>
            <button
              onClick={() => setBypassed(false)}
              className="bg-[#BA1A1A] text-white px-2.5 py-0.5 border border-[#141414] hover:bg-black cursor-pointer shadow-comic-sm font-medium"
            >
              Kunci Kembali ✕
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }

  // LOCKED STATE: RENDER DEDICATED COMIC LOCK SCREEN
  return (
    <div className="min-h-[85vh] bg-[#FAF8F2] text-[#141414] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Halftone ambient dots */}
      <div className="absolute inset-0 benday-dots opacity-15 pointer-events-none" />

      {/* Main Locked Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-lg bg-white border-comic-4 shadow-comic-lg p-6 sm:p-8 relative z-10 text-center"
      >
        {/* Locked Ribbon */}
        <div className="inline-flex items-center gap-2 bg-[#BA1A1A] text-white font-display text-xs uppercase tracking-wider px-3.5 py-1 border-2 border-[#141414] shadow-comic-sm mb-5 font-bold">
          <Lock className="w-3.5 h-3.5 text-[#F5B700]" />
          <span>HALAMAN TERKUNCI // SEDANG DIFINALISASI</span>
        </div>

        {/* Logo / Badge */}
        <div className="relative my-2 flex justify-center items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#141414] border-4 border-[#141414] rounded-full overflow-hidden shadow-comic p-1 mx-auto flex items-center justify-center">
            <Image
              src="/logo-escape-2027.png"
              alt="Logo Resmi ESCAPE 2027"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div className="mt-4 space-y-1">
          <h1 className="font-hero text-2xl sm:text-3xl uppercase tracking-wider text-[#0B5E2E] leading-tight drop-shadow-[2px_2px_0px_#141414]">
            {pageTitle}
          </h1>
          <p className="font-display text-xs uppercase tracking-wider text-[#404940] font-bold">
            {pageSubtitle || "EXHIBITION SIXTEEN CAMPUS EXPO • SMAN 16 SURABAYA"}
          </p>
        </div>

        {/* Explanation Box */}
        <div className="mt-4 p-3.5 bg-[#FAF8F2] border-2 border-[#141414] shadow-comic-sm text-xs font-body text-[#404940] leading-relaxed">
          Bagian ini sedang dalam tahap pemutakhiran dan finalisasi jadwal/zonasi oleh <strong>Panitia 64 &amp; IKAPOS</strong>. Rincian resmi akan dirilis mendekati hari H pameran (21 Januari 2027).
        </div>

        {/* Countdown to Event */}
        <div className="mt-5 pt-4 border-t-2 border-[#141414]">
          <span className="font-display text-[10px] uppercase tracking-wider text-[#404940] block mb-2 font-bold">
            HITUNG MUNDUR HARI H EXPO (21 JANUARI 2027):
          </span>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2 shadow-comic-sm text-center">
              <span className="font-display text-xl text-[#0B5E2E] block leading-none font-bold">
                {timeLeft.days}
              </span>
              <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                HARI
              </span>
            </div>
            <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2 shadow-comic-sm text-center">
              <span className="font-display text-xl text-[#141414] block leading-none font-bold">
                {timeLeft.hours}
              </span>
              <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                JAM
              </span>
            </div>
            <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2 shadow-comic-sm text-center">
              <span className="font-display text-xl text-[#141414] block leading-none font-bold">
                {timeLeft.minutes}
              </span>
              <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                MENIT
              </span>
            </div>
            <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2 shadow-comic-sm text-center">
              <span className="font-display text-xl text-[#0B5E2E] block leading-none font-bold">
                {timeLeft.seconds}
              </span>
              <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                DETIK
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/"
            className="bg-white hover:bg-[#FAF8F2] text-[#141414] font-display text-xs uppercase tracking-wider px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm flex items-center gap-1.5 font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/direktori-stan"
            className="bg-[#0B5E2E] hover:bg-[#1E8449] text-white font-display text-xs uppercase tracking-wider px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm flex items-center gap-1.5 font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <Building className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>Database Kampus</span>
          </Link>

          <Link
            href="/alumni"
            className="bg-[#F5B700] hover:bg-[#ffc933] text-[#141414] font-display text-xs uppercase tracking-wider px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm flex items-center gap-1.5 font-bold transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Data 221 Mahasiswa</span>
          </Link>
        </div>

        {/* Discreet Passcode Access for Committee */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowPasscodeModal(true)}
            className="text-[11px] font-display uppercase tracking-wider text-[#404940] hover:text-[#0B5E2E] flex items-center justify-center gap-1 mx-auto cursor-pointer underline transition-colors"
          >
            <Key className="w-3 h-3 text-[#0B5E2E]" />
            <span>Akses Pratinjau Khusus Panitia 64</span>
          </button>
        </div>
      </motion.div>

      {/* COMMITTEE PASSCODE MODAL */}
      <AnimatePresence>
        {showPasscodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg max-w-sm w-full p-6 text-left"
            >
              <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2 mb-4">
                <span className="font-display text-sm uppercase text-[#141414] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0B5E2E]" />
                  Akses Khusus Panitia 64
                </span>
                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(false)}
                  className="font-mono text-sm font-bold bg-[#BA1A1A] text-white px-2 py-0.5 border border-[#141414]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                <p className="font-body text-xs text-[#404940]">
                  Masukkan passcode resmi panitia untuk membuka pratinjau halaman ini:
                </p>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  placeholder="Passcode panitia..."
                  className="w-full bg-white border-2 border-[#141414] p-2 text-sm font-body shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-[#0B5E2E]"
                />
                {passcodeError && (
                  <p className="text-[11px] font-body text-[#BA1A1A] font-bold">
                    Passcode salah! Hubungi ketua Panitia 64.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#0B5E2E] text-white border-2 border-[#141414] py-2 font-display uppercase tracking-wider text-xs shadow-comic-sm font-bold"
                >
                  Buka Pratinjau
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
