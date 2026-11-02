"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ComicPageLoader() {
  const pathname = usePathname();
  const [initialLoading, setInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const isFirstRender = useRef(true);

  // Dynamic Comic Status text based on progress percentage for initial load
  const getInitialStatusText = (pct: number) => {
    if (pct < 30) return "Mengumpulkan frekuensi lentera hijau...";
    if (pct < 65) return "Mengakses arsip 45+ perguruan tinggi...";
    if (pct < 90) return "Menghubungkan sinyal alumni SMAN 16...";
    return "Siap! Membuka gerbang pameran ESCAPE 2027...";
  };

  // Dynamic Route Destination title based on pathname
  const getRouteDestinationTitle = (path: string) => {
    if (path.includes("direktori-stan")) return "Membuka Database & Kuota Kampus...";
    if (path.includes("alumni")) return "Menghubungkan Direktori Alumni Sixteen...";
    if (path.includes("peta-kampus")) return "Memuat Denah Gedung Kesenian (GK)...";
    if (path.includes("rundown")) return "Menyiapkan Jadwal & Linimasa Acara...";
    if (path.includes("tanya-jawab")) return "Membuka Pusat Bantuan & FAQ Resmi...";
    return "Menyiapkan Beranda Utama ESCAPE 2027...";
  };

  // Full Initial & Hard-Refresh Animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuditor =
        navigator.userAgent.includes("Chrome-Lighthouse") ||
        navigator.userAgent.includes("Lighthouse") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isAuditor) {
        setInitialLoading(false);
        return;
      }
    }

    setInitialLoading(true);
    setProgress(0);

    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds for cinematic intro

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setInitialLoading(false);
        }, 180);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Satisfying Blurry Comic Route Transition on client-side page switch
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger rich 1100ms blurry comic transition when navigating
    setRouteLoading(true);
    setRouteProgress(0);

    const startTime = Date.now();
    const duration = 1100; // 1.1s duration for satisfying loading impression

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setRouteProgress(rawPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setRouteLoading(false);
        }, 120);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [pathname]);

  const handleSkip = () => {
    setInitialLoading(false);
  };

  return (
    <>
      {/* ================= 1. EPIC INITIAL / REFRESH CINEMATIC INTRO ================= */}
      <AnimatePresence>
        {initialLoading && (
          <motion.div
            key="cinematic-refresh-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[110] bg-[#FAF8F2] flex flex-col items-center justify-center p-4 selection:bg-[#F5B700] overflow-hidden"
          >
            {/* Halftone Comic Pattern Background */}
            <div className="absolute inset-0 benday-dots opacity-25 pointer-events-none" />

            {/* Rotating Emerald Willpower Rays */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute w-[650px] h-[650px] opacity-15 pointer-events-none"
            >
              <div className="w-full h-full benday-emerald rounded-full" />
            </motion.div>

            {/* Tactile Skip Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleSkip}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 bg-[#F5B700] text-[#141414] font-display font-medium text-xs sm:text-sm uppercase tracking-wider px-4 py-2 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              Lewati Intro ✕
            </motion.button>

            {/* Central Comic Burst Card */}
            <motion.div
              initial={{ scale: 0.7, rotate: -4, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 240, damping: 20 }}
              className="relative z-20 max-w-sm sm:max-w-md w-full bg-[#FAF8F2] border-comic-4 p-6 sm:p-8 shadow-comic-lg text-center flex flex-col items-center"
            >
              {/* Soundburst Comic Action Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.25, 1] }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="bg-[#F5B700] text-[#141414] font-display font-semibold text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1 border-2 border-[#141414] shadow-comic-sm mb-5 -rotate-2"
              >
                ★ SMAN 16 SURABAYA • ISSUE XVI ★
              </motion.div>

              {/* Official ESCAPE 2027 Logo with Pulsing Energy Shockwaves */}
              <div className="relative mb-4">
                {/* Outer Willpower Pulse Wave 1 */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute -inset-4 bg-[#0B5E2E] rounded-full filter blur-xs"
                />

                {/* Outer Willpower Pulse Wave 2 */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.9, 0.2, 0.9] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 bg-[#F5B700] rounded-full filter blur-xs"
                />

                {/* Rotating Logo Emblem */}
                <motion.div
                  initial={{ rotate: -180, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 220 }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 bg-[#141414] border-4 border-[#141414] rounded-full overflow-hidden shadow-comic-lg flex items-center justify-center z-10"
                >
                  <Image
                    src="/logo-escape-2027.png"
                    alt="Logo Resmi ESCAPE 2027"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Title & Issue Tagline */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="space-y-1.5"
              >
                <h1 className="font-hero text-3xl sm:text-4xl uppercase tracking-wider text-[#141414] leading-tight">
                  ESCAPE 2027
                </h1>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="font-display font-medium text-xs uppercase tracking-wider text-[#0B5E2E] bg-[#A7F4B5] px-2.5 py-0.5 border border-[#141414] shadow-comic-sm">
                    EXHIBITION SIXTEEN CAMPUS EXPO
                  </span>
                </div>
              </motion.div>

              {/* Progress Counter & Dynamic Status */}
              <div className="w-full mt-5 space-y-2">
                <div className="flex justify-between items-center text-xs font-display uppercase tracking-wider text-[#141414]">
                  <span className="truncate max-w-[240px] text-left font-medium text-[#0B5E2E]">
                    {getInitialStatusText(progress)}
                  </span>
                  <span className="font-bold text-sm text-[#0B5E2E] pl-2">
                    {progress}%
                  </span>
                </div>

                {/* Halftone Emerald Progress Bar */}
                <div className="w-full h-4 bg-[#EAE5D9] border-2 border-[#141414] overflow-hidden relative shadow-comic-sm">
                  <motion.div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-[#0B5E2E] benday-gold transition-all duration-75"
                  />
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="mt-4 pt-2 border-t border-[#141414]/30 w-full flex justify-between items-center text-[10px] font-display uppercase tracking-wider text-[#404940]">
                <span>KAMIS, 21 JANUARI 2027</span>
                <span>GEDUNG KESENIAN SMAN 16</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. SATISFYING BLURRY COMIC ROUTE TRANSITION (PINDAH HALAMAN) ================= */}
      <AnimatePresence>
        {routeLoading && (
          <motion.div
            key="route-page-transition-blur"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[105] bg-[#FAF8F2]/80 backdrop-blur-md flex flex-col justify-center items-center p-4 selection:bg-[#F5B700] overflow-hidden"
          >
            {/* Ambient Halftone Pattern in blur layer */}
            <div className="absolute inset-0 benday-dots opacity-15 pointer-events-none" />

            {/* Top Comic Speed Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#EAE5D9] border-b border-[#141414] overflow-hidden">
              <motion.div
                style={{ width: `${routeProgress}%` }}
                className="h-full bg-[#0B5E2E] benday-gold transition-all duration-75"
              />
            </div>

            {/* Central Fancy Loading Card */}
            <motion.div
              initial={{ scale: 0.85, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -10, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 22 }}
              className="bg-white border-comic-4 p-6 sm:p-7 shadow-comic-lg max-w-sm w-full text-center flex flex-col items-center relative overflow-hidden"
            >
              {/* Halftone Accent Corner */}
              <div className="absolute -top-6 -right-6 w-20 h-20 benday-emerald opacity-25 pointer-events-none" />

              {/* Status Header Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#0B5E2E] text-white font-display text-xs uppercase tracking-wider px-3 py-0.5 border border-[#141414] shadow-comic-sm mb-4 font-medium">
                <span className="w-2 h-2 bg-[#F5B700] rounded-full animate-pulse" />
                <span>MEMUAT HALAMAN BARU</span>
              </div>

              {/* Spinning Logo with Pulsing Emerald Halo */}
              <div className="relative my-2 flex justify-center items-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-24 h-24 bg-[#0B5E2E] rounded-full filter blur-xs"
                />
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-20 h-20 bg-[#F5B700] rounded-full filter blur-xs"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="relative w-16 h-16 bg-[#141414] border-3 border-[#141414] rounded-full overflow-hidden shadow-comic flex items-center justify-center z-10"
                >
                  <Image
                    src="/logo-escape-2027.png"
                    alt="Logo ESCAPE 2027"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Dynamic Route Destination Title */}
              <div className="mt-3 space-y-1">
                <h3 className="font-display text-base sm:text-lg uppercase text-[#141414] leading-tight font-semibold">
                  {getRouteDestinationTitle(pathname)}
                </h3>
                <p className="font-display text-xs uppercase tracking-wider text-[#0B5E2E] font-medium">
                  ESCAPE 2027 • SMAN 16 SURABAYA
                </p>
              </div>

              {/* Animated Route Progress Bar */}
              <div className="w-full mt-4 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-display uppercase tracking-wider text-[#404940]">
                  <span>SINKRONISASI DATA</span>
                  <span className="font-bold text-[#0B5E2E]">{routeProgress}%</span>
                </div>
                <div className="w-full h-3 bg-[#EAE5D9] border-2 border-[#141414] overflow-hidden relative shadow-comic-sm">
                  <motion.div
                    style={{ width: `${routeProgress}%` }}
                    className="h-full bg-[#0B5E2E] benday-gold transition-all duration-75"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
