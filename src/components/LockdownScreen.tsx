"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  PhoneCall,
  Share2,
  Lock,
  Key,
  AlertTriangle,
} from "lucide-react";

interface LockdownScreenProps {
  onBypassSuccess?: () => void;
}

export default function LockdownScreen({ onBypassSuccess }: LockdownScreenProps) {
  // Live Countdown to 21 Januari 2027, 07:30 WIB (UTC+7)
  const targetDate = new Date("2027-01-21T07:30:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showBypassModal, setShowBypassModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === "sixteen2027") {
      sessionStorage.setItem("escape_bypass_lockdown", "true");
      setPasscodeError(false);
      setShowBypassModal(false);
      if (onBypassSuccess) {
        onBypassSuccess();
      } else {
        window.location.reload();
      }
    } else {
      setPasscodeError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#141414] flex flex-col justify-between selection:bg-[#F5B700] selection:text-[#141414] overflow-x-hidden relative">
      {/* ================= 1. REFINED TOP STATUS RIBBON ================= */}
      <div className="w-full bg-[#F5B700] border-b-2 border-[#141414] py-1.5 px-4 select-none relative z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-display uppercase tracking-wider font-semibold text-[#141414]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#0B5E2E] rounded-full animate-pulse" />
            <span>STATUS: PORTAL SEDANG DALAM PROSES PENGERJAAN</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-[#141414]">
            <span>SMAN 16 SURABAYA</span>
            <span>•</span>
            <span>21 JANUARI 2027</span>
          </div>
        </div>
      </div>

      {/* ================= 2. LIGHT AMBIENT BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Halftone Ben-Day pattern */}
        <div className="absolute inset-0 benday-dots opacity-20" />

        {/* Rotating subtle emerald willpower circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] opacity-10"
        >
          <div className="w-full h-full benday-emerald rounded-full" />
        </motion.div>
      </div>

      {/* ================= 3. COMPACT PREMIUM CARD ================= */}
      <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8 flex flex-col items-center text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full bg-white border-comic-4 shadow-comic-lg p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle Halftone Corner */}
          <div className="absolute -top-8 -right-8 w-28 h-28 benday-gold opacity-30 pointer-events-none" />

          {/* Compact Fancy Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#BA1A1A] text-white font-display text-xs uppercase tracking-wider px-3 py-1 border border-[#141414] shadow-comic-sm mb-4 font-medium">
            <Wrench className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>SEDANG DALAM PROSES PEMBUATAN</span>
          </div>

          {/* Logo with Smooth Glowing Pulse */}
          <div className="relative my-3 flex justify-center items-center">
            {/* Soft Emerald Halo */}
            <motion.div
              animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 bg-[#0B5E2E] rounded-full filter blur-md"
            />
            {/* Soft Gold Halo */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.25, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-28 h-28 bg-[#F5B700] rounded-full filter blur-xs"
            />

            {/* Rotating Logo Core */}
            <motion.div
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#141414] border-3 border-[#141414] rounded-full overflow-hidden shadow-comic flex items-center justify-center z-10"
            >
              <Image
                src="/logo-escape-2027.png"
                alt="Logo Resmi ESCAPE 2027"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Title & Issue Tagline */}
          <div className="mt-4 space-y-1">
            <h1 className="font-hero text-3xl sm:text-4xl uppercase tracking-wider text-[#0B5E2E] leading-tight drop-shadow-[2px_2px_0px_#141414]">
              ESCAPE 2027
            </h1>
            <p className="font-display text-xs uppercase tracking-wider text-[#404940] font-semibold">
              EXHIBITION SIXTEEN CAMPUS EXPO • SMAN 16 SURABAYA
            </p>
          </div>

          {/* Clean Live Countdown */}
          <div className="mt-6 pt-5 border-t-2 border-[#141414]">
            <span className="font-display text-[11px] uppercase tracking-wider text-[#404940] block mb-2.5 font-medium">
              HITUNG MUNDUR MENUJU HARI EXPO (21 JANUARI 2027):
            </span>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2.5 shadow-comic-sm text-center">
                <span className="font-display text-2xl text-[#0B5E2E] block leading-none font-bold">
                  {timeLeft.days}
                </span>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                  HARI
                </span>
              </div>
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2.5 shadow-comic-sm text-center">
                <span className="font-display text-2xl text-[#141414] block leading-none font-bold">
                  {timeLeft.hours}
                </span>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                  JAM
                </span>
              </div>
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2.5 shadow-comic-sm text-center">
                <span className="font-display text-2xl text-[#141414] block leading-none font-bold">
                  {timeLeft.minutes}
                </span>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                  MENIT
                </span>
              </div>
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-2.5 shadow-comic-sm text-center">
                <span className="font-display text-2xl text-[#0B5E2E] block leading-none font-bold">
                  {timeLeft.seconds}
                </span>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#404940] font-semibold mt-1 block">
                  DETIK
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap justify-center items-center gap-2.5">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B5E2E] text-white font-display text-xs uppercase tracking-wider px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm hover:bg-[#1E8449] flex items-center gap-1.5 cursor-pointer font-medium active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F5B700]" />
              <span>WhatsApp Panitia</span>
            </a>

            <a
              href="https://instagram.com/escapesman16"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FAF8F2] text-[#141414] font-display text-xs uppercase tracking-wider px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm hover:bg-[#F5B700] flex items-center gap-1.5 cursor-pointer font-medium active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#BA1A1A]" />
              <span>@escapesman16</span>
            </a>
          </div>
        </motion.div>

        {/* Discreet Bypass Link */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <button
            onClick={() => setShowBypassModal(true)}
            className="text-[11px] font-display uppercase tracking-wider text-[#404940] hover:text-[#0B5E2E] flex items-center gap-1.5 cursor-pointer underline transition-colors"
          >
            <Lock className="w-3 h-3 text-[#0B5E2E]" />
            <span>Akses Internal Panitia / Pratinjau Pengembang</span>
          </button>
        </div>
      </main>

      {/* ================= 4. COMMITTEE PASSCODE MODAL ================= */}
      <AnimatePresence>
        {showBypassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg max-w-sm w-full p-6 text-[#141414] relative"
            >
              <button
                onClick={() => {
                  setShowBypassModal(false);
                  setPasscodeError(false);
                }}
                className="absolute top-4 right-4 bg-[#F5B700] text-[#141414] font-bold text-xs w-7 h-7 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center cursor-pointer hover:bg-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Key className="w-4 h-4 text-[#0B5E2E]" />
                <h3 className="font-display text-base uppercase tracking-wider text-[#141414]">
                  KUNCI AKSES PANITIA
                </h3>
              </div>

              <p className="font-body text-xs text-[#404940] mb-4">
                Masukkan kode akses internal untuk membuka pratinjau website:
              </p>

              <form onSubmit={handleBypassSubmit} className="space-y-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPasscodeError(false);
                    }}
                    placeholder="Kode: sixteen2027"
                    className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                  />
                  {passcodeError && (
                    <p className="text-[#BA1A1A] font-body text-xs font-bold mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Kode akses salah. Gunakan: sixteen2027</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0B5E2E] text-white font-display text-xs uppercase tracking-wider py-2.5 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#1E8449] cursor-pointer font-medium"
                  >
                    Buka Pratinjau
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBypassModal(false);
                      setPasscodeError(false);
                    }}
                    className="px-4 bg-white text-[#141414] font-display text-xs uppercase tracking-wider py-2.5 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#F5B700] cursor-pointer font-medium"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 5. FOOTER STAMP (BOTTOM) ================= */}
      <footer className="relative z-10 w-full py-3 px-4 text-center border-t border-[#141414]/20 bg-[#FAF8F2] text-[11px] font-display uppercase tracking-wider text-[#404940] flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto">
        <span>© SMAN 16 SURABAYA • BIMBINGAN KONSELING &amp; KESISWAAN</span>
        <span className="text-[#0B5E2E] font-semibold mt-0.5 sm:mt-0">PRE-LAUNCH PHASE // ISSUE XVI</span>
      </footer>
    </div>
  );
}
