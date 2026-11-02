"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import OpeningIntro from "@/components/OpeningIntro";

export default function Home() {
  return (
    <>
      {/* Opening Intro Animation (Framer Motion) */}
      <OpeningIntro />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex flex-col gap-8 sm:gap-10">
        {/* HERO SECTION: OVERLAPPING COMIC COVER LAYOUT */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-[#FAF8F2] border-comic-4 shadow-comic-lg p-5 sm:p-8 lg:p-10 overflow-hidden"
        >
          {/* Halftone Accent Corner */}
          <div className="absolute top-0 right-0 w-72 h-72 benday-dots opacity-20 pointer-events-none -mr-12 -mt-12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Storylines, Narrative & Big Title */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Sound Burst / Action Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.span
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-[#F5B700] text-[#141414] font-display text-xs sm:text-sm px-3 py-1 border-2 border-[#141414] shadow-comic-sm transform -rotate-1 cursor-default inline-block"
                >
                  EDISI XVI // 21 JANUARI 2027
                </motion.span>
                <span className="bg-[#EAE5D9] text-[#404940] font-display text-xs uppercase px-2.5 py-1 border-2 border-[#141414] shadow-comic-sm">
                  RESMI PANITIA OSIS & BK EXPO
                </span>
              </div>

              {/* Comic Cover Display Title */}
              <div className="space-y-1">
                <motion.h1
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-[#0B5E2E] leading-none drop-shadow-[3px_3px_0px_#141414]"
                >
                  ESCAPE 2027
                </motion.h1>
                <p className="font-display text-lg sm:text-2xl tracking-wide text-[#141414] uppercase">
                  SIXTEEN CAREER & EDUCATION APPRECIATION EXPO
                </p>
              </div>

              {/* Narration Box (Dialogue Frame) */}
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 sm:p-5 border-comic shadow-comic relative border-l-8 border-l-[#0B5E2E]"
              >
                <div className="absolute -top-3 left-4 bg-[#0B5E2E] text-white font-display text-xs px-2 py-0.5 border border-[#141414] uppercase tracking-wider shadow-comic-sm">
                  CAPTION NARASI
                </div>
                <p className="font-body text-base sm:text-lg text-[#141414] font-bold pt-1">
                  Pameran Edukasi Kampus Terakbar SMAN 16 Surabaya
                </p>
                <p className="font-body text-xs sm:text-sm text-[#404940] mt-1.5 leading-relaxed font-medium">
                  Saatnya pejuang masa depan menentukan gerbang peradaban tinggi. Temukan puluhan universitas ternama, sekolah kedinasan impian, dan bimbingan langsung dari alumni lintas angkatan bersama tekad membaja Green Lantern Corps!
                </p>
              </motion.div>

              {/* Hero Action Buttons with Comic Tactile Press */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ y: 2, scale: 0.98 }}>
                  <Link
                    href="/rundown"
                    className="bg-[#0B5E2E] text-white font-display text-sm sm:text-base uppercase tracking-wider px-6 py-3 border-comic shadow-comic hover:bg-[#1E8449] transition-colors flex items-center gap-2"
                  >
                    <span>📅 Buka Jadwal Acara</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ y: 2, scale: 0.98 }}>
                  <Link
                    href="/direktori-stan"
                    className="bg-white text-[#141414] font-display text-sm sm:text-base uppercase tracking-wider px-6 py-3 border-comic shadow-comic hover:bg-[#F5B700] transition-colors flex items-center gap-2"
                  >
                    <span>🏛 Buka Database Kampus</span>
                  </Link>
                </motion.div>
              </div>

              {/* Comic Stamped Badges / Stats Section with Spring Hover */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-comic-sm flex flex-col justify-center items-center text-center cursor-default transition-shadow"
                >
                  <span className="font-display text-3xl sm:text-4xl text-[#0B5E2E] leading-none">
                    45+
                  </span>
                  <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-[#141414] mt-1">
                    Kampus & Kedinasan
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-comic-sm flex flex-col justify-center items-center text-center cursor-default transition-shadow"
                >
                  <span className="font-display text-3xl sm:text-4xl text-[#F5B700] leading-none drop-shadow-[1px_1px_0px_#141414]">
                    2
                  </span>
                  <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-[#141414] mt-1">
                    Zona Utama Expo
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-comic-sm flex flex-col justify-center items-center text-center cursor-default transition-shadow"
                >
                  <span className="font-display text-3xl sm:text-4xl text-[#0B5E2E] leading-none">
                    1.500+
                  </span>
                  <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-[#141414] mt-1">
                    Sixteeners & Wali
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Comic Panel Visual with Official ESCAPE 2027 Logo */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-sm sm:max-w-md bg-[#EAE5D9] border-comic-4 shadow-comic-lg p-5 sm:p-6 rotate-1"
              >
                {/* Issue Stamp Ribbon */}
                <div className="absolute -top-4 -right-3 bg-[#BA1A1A] text-white font-display text-xs uppercase px-3 py-1 border-2 border-[#141414] shadow-comic-sm transform rotate-3">
                  KOLABORASI RESMI!
                </div>

                {/* Comic Art Canvas Border */}
                <div className="border-comic bg-white p-5 sm:p-6 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 benday-emerald opacity-15 pointer-events-none" />

                  {/* Header strip inside card */}
                  <div className="w-full bg-[#0B5E2E] text-white py-1 px-3 border-2 border-[#141414] shadow-comic-sm mb-4 relative z-10">
                    <span className="font-display text-xs sm:text-sm uppercase tracking-wider">
                      TEKAD EMERALD SIXTEEN // 2027
                    </span>
                  </div>

                  {/* Official ESCAPE 2027 Logo Display with Pulse Animation */}
                  <div className="relative my-3 p-2 border-4 border-[#141414] bg-[#141414] rounded-full shadow-comic transform -rotate-1 w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src="/logo-escape-2027.png"
                        alt="Logo Resmi ESCAPE 2027"
                        width={180}
                        height={180}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Comic Action Caption */}
                  <div className="mt-3 bg-[#F5B700] text-[#141414] border-2 border-[#141414] py-2 px-4 shadow-comic-sm w-full relative z-10">
                    <p className="font-display text-sm sm:text-base uppercase tracking-wide">
                      &quot;WILLPOWER TO CONQUER THE FUTURE&quot;
                    </p>
                    <p className="font-body text-xs text-[#141414] font-bold">
                      Kekuatan Tekad Siswa SMAN 16 Surabaya
                    </p>
                  </div>

                  {/* Mini Footer stamp inside panel */}
                  <div className="mt-4 flex justify-between w-full text-[10px] font-display uppercase font-bold text-[#404940] relative z-10">
                    <span>SEKTOR PRAKIRAAN KARIER</span>
                    <span>VOL. 16 SURABAYA</span>
                  </div>
                </div>

                {/* Comic Corner Location Box */}
                <div className="mt-3 flex justify-between items-center px-1">
                  <div className="flex items-center gap-1 font-body text-xs font-bold text-[#141414]">
                    <span>📍</span>
                    <span>Jl. Prapen Indah I, Surabaya</span>
                  </div>
                  <span className="font-display text-[10px] bg-[#141414] text-white px-2 py-0.5 border border-[#141414]">
                    TERBUKA UMUM
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* WILLPOWER OATH BANNER (Comic Narration Caption Box) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full bg-[#0B5E2E] border-comic-4 shadow-comic-lg p-6 sm:p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 benday-dots opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#F5B700] text-[#141414] p-3 sm:p-4 border-comic shadow-comic flex-shrink-0 text-3xl sm:text-4xl"
            >
              ⚡
            </motion.div>
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-block bg-[#FAF8F2] text-[#0B5E2E] font-display text-xs uppercase px-2.5 py-0.5 border border-[#141414] shadow-comic-sm">
                IKRAR TEKAD SIXTEENERS
              </div>
              <blockquote className="font-display text-xl sm:text-2xl tracking-wide leading-snug">
                &ldquo;Dalam terang siang, dalam gelap gulita malam, tiada keraguan memadamkan tekad Sixteeners. Kobarkan api semangat, jemput gerbang pendidikan tinggi!&rdquo;
              </blockquote>
              <p className="font-body text-xs text-[#A7F4B5] uppercase tracking-wider font-bold">
                ★ SEMBOYAN RESMI EDISI ESCAPE XVI SMAN 16 SURABAYA ★
              </p>
            </div>
          </div>
        </motion.section>

        {/* FEATURE SECTION: 3 COMIC BOOK PANELS */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-[#141414] pb-3 gap-2">
            <div>
              <span className="bg-[#F5B700] text-[#141414] font-display text-xs px-2 py-0.5 border border-[#141414] uppercase font-bold shadow-comic-sm">
                PANEL UTAMA
              </span>
              <h2 className="font-display text-3xl sm:text-4xl uppercase text-[#0B5E2E] tracking-wide mt-1">
                PROGRAM UNGGULAN EXPO
              </h2>
            </div>
            <span className="font-display text-xs sm:text-sm text-[#404940] uppercase">
              STRIP 01 // TIGA RUANG EKSPLORASI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Panel 1: Eksplorasi Sektor Kampus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#0B5E2E] text-white p-3 border-b-2 border-[#141414] flex justify-between items-center">
                  <h3 className="font-display text-lg uppercase tracking-wider">
                    Eksplorasi Sektor Kampus
                  </h3>
                  <span className="font-display text-[10px] bg-[#F5B700] text-[#141414] px-1.5 py-0.5 border border-[#141414] font-bold">
                    PANEL A
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-[#EAE5D9] border-2 border-[#141414] p-2.5 benday-dots">
                    <p className="font-display text-sm text-[#141414] uppercase bg-white p-2 border border-[#141414] text-center">
                      PTN, PTS & KEDINASAN
                    </p>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#141414] leading-relaxed">
                    Kunjungi langsung stan resmi PTN terkemuka (ITB, UI, UGM, ITS, UNAIR, UB) serta akademi militer & politeknik kedinasan. Konsultasikan syarat nilai rapor dan daya tampung SNBP/SNBT.
                  </p>
                  <ul className="space-y-2 border-t-2 border-[#404940] pt-3 font-body text-xs font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Brosur Akreditasi & Passing Grade</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Simulasi Biaya UKT & Jalur Mandiri</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/direktori-stan"
                  className="w-full block text-center bg-white text-[#141414] font-display text-sm uppercase py-2.5 border-comic shadow-comic-sm hover:bg-[#F5B700] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  Jelajahi Stan Kampus →
                </Link>
              </div>
            </motion.div>

            {/* Panel 2: Gelar Wicara & Mentorship Alumni */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 benday-emerald opacity-10 pointer-events-none" />
              <div>
                <div className="bg-[#141414] text-white p-3 border-b-2 border-[#141414] flex justify-between items-center">
                  <h3 className="font-display text-lg uppercase tracking-wider text-white">
                    Gelar Wicara & Mentorship
                  </h3>
                  <span className="font-display text-[10px] bg-[#0B5E2E] text-white px-1.5 py-0.5 border border-white font-bold">
                    PANEL B
                  </span>
                </div>
                <div className="p-5 space-y-4 relative z-10">
                  <div className="bg-white border-2 border-[#141414] p-2.5 shadow-comic-sm">
                    <p className="font-display text-sm text-[#0B5E2E] uppercase text-center">
                      SHARING SESSION KELAS DUNIA
                    </p>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#141414] leading-relaxed">
                    Dengarkan langsung strategi lolos PTN dari alumni Sixteeners yang kini sukses meniti karier di bidang kedokteran, teknik industri, korporasi multinasional, hingga diplomat.
                  </p>
                  <ul className="space-y-2 border-t-2 border-[#404940] pt-3 font-body text-xs font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Sesi Tanya-Jawab Interaktif & Tips Lolos PTN</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Mentoring Pemilihan Jurusan Rasional</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-5 pt-0 relative z-10">
                <Link
                  href="/alumni"
                  className="w-full block text-center bg-[#0B5E2E] text-white font-display text-sm uppercase py-2.5 border-comic shadow-comic-sm hover:bg-[#1E8449] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  Daftar Mentorship Alumni →
                </Link>
              </div>
            </motion.div>

            {/* Panel 3: Klinik Beasiswa & Konsultasi Jurusan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#F5B700] text-[#141414] p-3 border-b-2 border-[#141414] flex justify-between items-center">
                  <h3 className="font-display text-lg uppercase tracking-wider">
                    Klinik Beasiswa & BK
                  </h3>
                  <span className="font-display text-[10px] bg-[#141414] text-white px-1.5 py-0.5 font-bold">
                    PANEL C
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-[#EAE5D9] border-2 border-[#141414] p-2.5">
                    <p className="font-display text-sm text-[#141414] uppercase text-center">
                      RUANG BIMBINGAN KARIER BK
                    </p>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#141414] leading-relaxed">
                    Konsultasi privat bersama Guru BK SMAN 16 Surabaya dan pakar psikologi pendidikan. Kupas tuntas beasiswa KIP-Kuliah, beasiswa swasta, dan pemetaan minat bakat siswa.
                  </p>
                  <ul className="space-y-2 border-t-2 border-[#404940] pt-3 font-body text-xs font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Review Portofolio & Esai Beasiswa</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0B5E2E]">✔</span>
                      <span>Tes Singkat Kecocokan Karier & MBTI</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/tanya-jawab"
                  className="w-full block text-center bg-white text-[#141414] font-display text-sm uppercase py-2.5 border-comic shadow-comic-sm hover:bg-[#F5B700] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  Jadwalkan Konsultasi →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK HIGHLIGHTS: RUNDOWN PREVIEW & ALUMNI SPEECH BUBBLE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="rundown-preview">
          {/* Rundown Strip Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-[#FAF8F2] border-comic-4 shadow-comic p-6 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center border-b-2 border-[#141414] pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl uppercase text-[#141414]">
                  ⏱ JADWAL UTAMA HARI EXPO
                </h3>
              </div>
              <span className="font-display text-xs bg-[#0B5E2E] text-white px-2.5 py-1 border border-[#141414] shadow-comic-sm">
                21 JANUARI 2027
              </span>
            </div>

            <div className="space-y-3 font-body text-sm">
              {/* Item 1 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 sm:gap-4 p-3 bg-white border-2 border-[#141414] shadow-comic-sm"
              >
                <div className="bg-[#F5B700] text-[#141414] font-display text-xs sm:text-sm px-2 py-1 border border-[#141414] min-w-[90px] text-center">
                  07.30 - 08.15
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base text-[#0B5E2E] uppercase">
                    Upacara Pembukaan & Parade Kampus
                  </p>
                  <p className="text-[#404940] text-xs font-medium">
                    Sambutan Kepala SMAN 16 Surabaya & Pembukaan Stan Expo
                  </p>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 sm:gap-4 p-3 bg-white border-2 border-[#141414] shadow-comic-sm"
              >
                <div className="bg-[#F5B700] text-[#141414] font-display text-xs sm:text-sm px-2 py-1 border border-[#141414] min-w-[90px] text-center">
                  08.30 - 11.30
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base text-[#0B5E2E] uppercase">
                    Sesi Stan Terbuka & Klinik Beasiswa
                  </p>
                  <p className="text-[#404940] text-xs font-medium">
                    Eksplorasi 45+ Booth di Hall Basket & Gedung Serbaguna
                  </p>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 sm:gap-4 p-3 bg-white border-2 border-[#141414] shadow-comic-sm"
              >
                <div className="bg-[#F5B700] text-[#141414] font-display text-xs sm:text-sm px-2 py-1 border border-[#141414] min-w-[90px] text-center">
                  12.45 - 14.30
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base text-[#0B5E2E] uppercase">
                    Talkshow Akbar Alumni Sixteen
                  </p>
                  <p className="text-[#404940] text-xs font-medium">
                    Panggung Utama: Strategi Tembus Fakultas Kedokteran & Sekolah Kedinasan
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-2 text-right">
              <Link
                href="/rundown"
                className="font-display text-sm text-[#0B5E2E] underline hover:text-[#1E8449]"
              >
                Lihat Rundown Lengkap 12 Sesi Acara →
              </Link>
            </div>
          </motion.div>

          {/* Testimonial / Speech Bubble Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 bg-[#EAE5D9] border-comic-4 shadow-comic p-6 flex flex-col justify-between relative"
          >
            <div className="space-y-4">
              <div className="inline-block bg-[#141414] text-white font-display text-xs uppercase px-2.5 py-1 border border-[#141414]">
                KATA ALUMNI SIXTEEN
              </div>

              {/* Speech bubble container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border-comic p-5 shadow-comic relative cursor-default"
              >
                <p className="font-body text-xs sm:text-sm text-[#141414] font-semibold italic leading-relaxed">
                  &ldquo;Expo ESCAPE di Sixteen waktu tahun 2024 jadi titik balik terpenting saya. Lewat stan alumni, saya tahu trik lolos SBMPTN tanpa les mahal dan sekarang bisa magang di BUMN!&rdquo;
                </p>
                {/* Comic Speech Bubble Triangle tail */}
                <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#141414]" />
              </motion.div>

              <div className="pt-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0B5E2E] text-white border-2 border-[#141414] flex items-center justify-center font-display text-base shadow-comic-sm">
                  FAR
                </div>
                <div>
                  <h4 className="font-display text-base uppercase text-[#141414] leading-tight">
                    Faris Ramadhan, S.T.
                  </h4>
                  <p className="font-body text-xs text-[#404940] font-medium">
                    Alumni Sixteen 2022 // Mahasiswa Berprestasi ITS
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-[#F5B700] border-2 border-[#141414] shadow-comic-sm text-center">
              <p className="font-display text-xs sm:text-sm uppercase text-[#141414]">
                ★ TOTAL 35 ALUMNI SIXTEEN SIAP MENGAWALMU! ★
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
