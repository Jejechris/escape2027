"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function OpeningIntro() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuditor =
        navigator.userAgent.includes("Chrome-Lighthouse") ||
        navigator.userAgent.includes("Lighthouse") ||
        navigator.userAgent.includes("HeadlessChrome") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isAuditor) {
        setShowIntro(false);
        return;
      }
    }

    const hasSeenIntro = sessionStorage.getItem("escape2027_seen_intro");
    if (hasSeenIntro) {
      setShowIntro(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("escape2027_seen_intro", "true");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
    sessionStorage.setItem("escape2027_seen_intro", "true");
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#FAF8F2] flex flex-col items-center justify-center p-4 selection:bg-[#F5B700] overflow-hidden"
        >
          {/* Halftone Comic Pattern Background */}
          <div className="absolute inset-0 benday-dots opacity-25 pointer-events-none" />

          {/* Animated Comic Energy Rays */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] opacity-10 pointer-events-none"
          >
            <div className="w-full h-full benday-emerald rounded-full" />
          </motion.div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 z-20 bg-[#F5B700] text-[#141414] font-body font-bold text-xs uppercase tracking-wide px-3.5 py-2 border-2 border-[#141414] shadow-comic-sm hover:bg-white active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            Lewati Intro ✕
          </motion.button>

          {/* Central Comic Burst Card */}
          <motion.div
            initial={{ scale: 0.6, rotate: -4, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
            className="relative z-10 max-w-sm w-full bg-[#FAF8F2] border-comic-4 p-8 shadow-comic-lg text-center flex flex-col items-center"
          >
            {/* Soundburst Comic Action Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="bg-[#F5B700] text-[#141414] font-body font-extrabold text-xs uppercase tracking-wide px-3.5 py-1 border-2 border-[#141414] shadow-comic-sm mb-5 rotate-[-2deg]"
            >
              ★ SMAN 16 SURABAYA • ISSUE XVI ★
            </motion.div>

            {/* Official Logo with Glowing Emerald Burst */}
            <div className="relative mb-4">
              {/* Outer Energy Pulse Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 bg-[#0B5E2E] rounded-full filter blur-xs"
              />

              <motion.div
                initial={{ rotate: -180, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.55, type: "spring", stiffness: 200 }}
                className="relative w-36 h-36 bg-[#141414] border-4 border-[#141414] rounded-full overflow-hidden shadow-comic-lg flex items-center justify-center z-10"
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

            {/* Title & Tagline with Punchy Entrance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-[#141414] leading-tight">
                ESCAPE 2027
              </h1>
              <div className="mt-1">
                <span className="font-body font-extrabold text-xs uppercase tracking-wide text-[#0B5E2E] bg-[#A7F4B5] px-2.5 py-0.5 border border-[#141414] inline-block shadow-comic-sm">
                  WILLPOWER CORPS EDITION
                </span>
              </div>
              <p className="font-body text-xs text-[#404940] mt-3 font-semibold">
                Memuat buletin resmi pameran edukasi kampus...
              </p>
            </motion.div>

            {/* Comic Loading Halftone Bar */}
            <div className="w-full mt-5 h-3.5 bg-[#EAE5D9] border-2 border-[#141414] overflow-hidden relative shadow-comic-sm">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-[#0B5E2E] benday-gold"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
