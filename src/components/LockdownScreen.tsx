"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Clock,
  Wrench,
  Sparkles,
  PhoneCall,
  Share2,
  Lock,
  Key,
  CheckCircle2,
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
    // Default bypass passcode for committee & developers
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
    <div className="min-h-screen bg-[#0D1510] text-[#FAF8F2] flex flex-col justify-between selection:bg-[#F5B700] selection:text-[#141414] overflow-x-hidden relative">
      {/* ================= 1. ANIMATED WARNING HAZARD STRIP (TOP) ================= */}
      <div className="w-full bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_4px_0px_#141414] overflow-hidden select-none relative z-30">
        <div className="flex items-center gap-4 text-[#141414] whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 font-display text-xs sm:text-sm uppercase tracking-wider font-semibold">
              <span className="bg-[#141414] text-[#F5B700] px-2 py-0.5 border border-[#141414]">
                ⚠️ PERINGATAN SISTEM
              </span>
              <span>SEKTOR XVI DALAM PENGERJAAN &amp; STERILISASI</span>
              <span className="text-[#0B5E2E] font-extrabold">•</span>
              <span>SMAN 16 SURABAYA</span>
              <span className="text-[#0B5E2E] font-extrabold">•</span>
              <span>PROTOKOL LENTERA AKTIF</span>
              <span className="text-[#0B5E2E] font-extrabold">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 2. BACKGROUND WILLPOWER CONCENTRIC GRID ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Halftone Ben-Day pattern */}
        <div className="absolute inset-0 benday-dots opacity-20" />

        {/* Emerald radial glow core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-[#0B5E2E]/25 rounded-full filter blur-3xl pointer-events-none" />

        {/* Rotating Geometric Energy Radar Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] border border-[#0B5E2E]/30 rounded-full"
        >
          <div className="w-full h-full border-2 border-dashed border-[#F5B700]/20 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] border-2 border-[#A7F4B5]/20 rounded-full"
        />
      </div>

      {/* ================= 3. CENTRAL CONTAINMENT CARD ================= */}
      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full bg-[#FAF8F2] text-[#141414] border-comic-4 shadow-[8px_8px_0px_#0B5E2E] p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Halftone Accent Corner */}
          <div className="absolute -top-10 -right-10 w-44 h-44 benday-emerald opacity-20 pointer-events-none" />

          {/* Top Header Stamp */}
          <div className="inline-flex items-center gap-2 bg-[#BA1A1A] text-white font-display text-xs sm:text-sm uppercase tracking-wider px-4 py-1 border-2 border-[#141414] shadow-comic-sm mb-6 -rotate-1 font-medium">
            <ShieldAlert className="w-4 h-4 text-[#F5B700]" />
            <span>PROTOKOL LOCKDOWN AKTIF // SITUS SEDANG DIBUAT</span>
          </div>

          {/* Glowing Animated Containment Core (Logo ESCAPE 2027) */}
          <div className="relative my-2 flex justify-center items-center">
            {/* Outer Pulsing Wave 1 */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-[#0B5E2E] rounded-full filter blur-md"
            />
            {/* Outer Pulsing Wave 2 */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-[#F5B700] rounded-full filter blur-xs"
            />

            {/* Rotating Logo Core */}
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 bg-[#141414] border-4 border-[#141414] rounded-full overflow-hidden shadow-comic-lg flex items-center justify-center z-10"
            >
              <Image
                src="/logo-escape-2027.png"
                alt="Logo Resmi ESCAPE 2027"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Big Titles */}
          <div className="mt-5 space-y-1">
            <h1 className="font-hero text-4xl sm:text-6xl uppercase tracking-wider text-[#0B5E2E] leading-none drop-shadow-[2px_2px_0px_#141414]">
              ESCAPE 2027
            </h1>
            <p className="font-display text-lg sm:text-2xl uppercase tracking-wide text-[#141414] font-semibold">
              PORTAL RESMI DALAM PROSES PENGERJAAN
            </p>
            <div className="inline-block bg-[#EAE5D9] text-[#404940] font-display text-xs sm:text-sm uppercase tracking-wider px-3 py-1 border border-[#141414] mt-2 font-medium">
              EXHIBITION SIXTEEN CAMPUS EXPO • SMAN 16 SURABAYA
            </div>
          </div>

          {/* Comic Narration Box (Dialogue Frame) */}
          <div className="mt-6 bg-[#FEF08A] border-2 border-[#141414] p-4 sm:p-5 shadow-comic-sm text-left relative max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📢</span>
              <span className="font-display text-xs sm:text-sm uppercase tracking-wider text-[#141414] font-bold">
                PENGUMUMAN RESMI PANITIA &amp; GURU BK:
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#141414] font-medium leading-relaxed">
              Halo Sixteeners dan Bapak/Ibu Wali Murid! Website resmi <strong>ESCAPE 2027</strong> sedang kami kunci sementara untuk finalisasi kurasi database 45+ perguruan tinggi, penyelarasan sistem presensi barcode, dan persiapan panggung Gedung Kesenian (GK). Kami sedang bekerja intensif agar pengalaman pameran kampus menjadi yang terbaik!
            </p>
          </div>

          {/* Progress Telemetry Checklist */}
          <div className="mt-6 border-2 border-[#141414] bg-white p-4 sm:p-5 shadow-comic-sm text-left max-w-2xl mx-auto space-y-3">
            <div className="flex justify-between items-center border-b-2 border-[#141414] pb-2">
              <span className="font-display text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#141414] flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#0B5E2E]" />
                <span>TELEMETRI KESIAPAN EXPO:</span>
              </span>
              <span className="bg-[#0B5E2E] text-white font-display text-xs uppercase tracking-wider px-2.5 py-0.5 border border-[#141414] font-medium">
                85% SELESAI
              </span>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body font-semibold">
              <div className="flex items-center gap-2 bg-[#FAF8F2] p-2 border border-[#141414]">
                <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] shrink-0" />
                <span>Database 15+ PTN &amp; Kedinasan</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F2] p-2 border border-[#141414]">
                <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] shrink-0" />
                <span>Denah Gedung Kesenian (GK)</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F2] p-2 border border-[#141414]">
                <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] shrink-0" />
                <span>Direktori Alumni Lintas Kelas XII</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFBEB] p-2 border border-[#F5B700]">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0 animate-spin" />
                <span className="text-[#B45309]">Finalisasi Jadwal &amp; Registrasi</span>
              </div>
            </div>

            {/* Animated Halftone Progress Bar */}
            <div className="w-full h-4 bg-[#EAE5D9] border-2 border-[#141414] overflow-hidden relative shadow-comic-sm mt-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[#0B5E2E] benday-gold"
              />
            </div>
          </div>

          {/* Live Countdown to Grand Launch */}
          <div className="mt-6 max-w-2xl mx-auto">
            <span className="font-display text-xs uppercase tracking-wider text-[#404940] block mb-2 font-medium">
              WAKTU HITUNG MUNDUR MENUJU HARI-H (KAMIS, 21 JANUARI 2027 • 07.30 WIB):
            </span>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-[#141414] text-white p-3 border-2 border-[#141414] shadow-comic-sm text-center">
                <span className="font-display text-2xl sm:text-3xl text-[#F5B700] block leading-none">
                  {timeLeft.days}
                </span>
                <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-gray-300">
                  HARI
                </span>
              </div>
              <div className="bg-[#141414] text-white p-3 border-2 border-[#141414] shadow-comic-sm text-center">
                <span className="font-display text-2xl sm:text-3xl text-white block leading-none">
                  {timeLeft.hours}
                </span>
                <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-gray-300">
                  JAM
                </span>
              </div>
              <div className="bg-[#141414] text-white p-3 border-2 border-[#141414] shadow-comic-sm text-center">
                <span className="font-display text-2xl sm:text-3xl text-white block leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-gray-300">
                  MENIT
                </span>
              </div>
              <div className="bg-[#141414] text-white p-3 border-2 border-[#141414] shadow-comic-sm text-center">
                <span className="font-display text-2xl sm:text-3xl text-[#A7F4B5] block leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-gray-300">
                  DETIK
                </span>
              </div>
            </div>
          </div>

          {/* Official Committee Contact Channels */}
          <div className="mt-8 pt-6 border-t-2 border-[#141414] flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B5E2E] text-white font-display text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 border-2 border-[#141414] shadow-comic-sm hover:bg-[#1E8449] flex items-center gap-2 cursor-pointer font-medium active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#F5B700]" />
              <span>WhatsApp Panitia (+62 812-3456-7890)</span>
            </a>

            <a
              href="https://instagram.com/escapesman16"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FAF8F2] text-[#141414] font-display text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 border-2 border-[#141414] shadow-comic-sm hover:bg-[#F5B700] flex items-center gap-2 cursor-pointer font-medium active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Share2 className="w-4 h-4 text-[#BA1A1A]" />
              <span>Instagram @escapesman16</span>
            </a>
          </div>
        </motion.div>

        {/* Discreet Developer / Committee Bypass Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => setShowBypassModal(true)}
            className="text-xs font-display uppercase tracking-wider text-[#A7F4B5]/80 hover:text-[#F5B700] flex items-center gap-1.5 cursor-pointer underline transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Akses Internal Panitia / Pratinjau Pengembang</span>
          </button>
          <span className="text-[11px] font-display uppercase tracking-widest text-gray-500">
            MODE ENV: LOCKDOWN (NEXT_PUBLIC_SITE_PUBLISHED=0) • UBAH KE 1 UNTUK PUBLISH
          </span>
        </div>
      </main>

      {/* ================= 4. COMMITTEE PASSCODE MODAL ================= */}
      <AnimatePresence>
        {showBypassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
                <Key className="w-5 h-5 text-[#0B5E2E]" />
                <h3 className="font-display text-lg uppercase tracking-wider text-[#141414]">
                  KUNCI AKSES PANITIA
                </h3>
              </div>

              <p className="font-body text-xs text-[#404940] mb-4">
                Masukkan kode akses tim internal untuk membuka pratinjau website selama masa lockdown:
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
                    className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
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
      <footer className="relative z-10 w-full py-4 px-4 text-center border-t-2 border-[#141414] bg-[#0A0F0C] text-[11px] font-display uppercase tracking-wider text-gray-400 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <span>© 2026/2027 SMAN 16 SURABAYA • BIDANG KESISWAAN &amp; BIMBINGAN KONSELING</span>
        <span className="text-[#F5B700] font-semibold mt-1 sm:mt-0">WILLPOWER CORPS // PRE-LAUNCH PHASE</span>
      </footer>
    </div>
  );
}
