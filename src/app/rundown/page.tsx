"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectorFilter = "all" | "sektor-1" | "sektor-2";

interface TimelineItem {
  id: string;
  sektor: "sektor-1" | "sektor-2";
  time: string;
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
  location: string;
  status: string;
  highlight?: boolean;
}

const TIMELINE_SEKTOR_1: TimelineItem[] = [
  {
    id: "gk-1",
    sektor: "sektor-1",
    time: "07.30 - 08.30 WIB",
    badge: "SESI PEMBUKA",
    title: "Pawai Panji Lentera & Pembukaan Resmi Kepala Sekolah",
    description:
      "Pawai pembuka perwakilan 40+ bendera kampus Nusantara, penabuhan gong simbolik oleh Kepala SMAN 16 Surabaya, serta pertunjukan tari teatrikal Sixteen Art Troupe.",
    location: "ARENA PANGGUNG GK",
    status: "TERBUKA UMUM",
  },
  {
    id: "gk-2",
    sektor: "sektor-1",
    time: "08.30 - 10.30 WIB",
    badge: "SOROTAN UTAMA",
    badgeColor: "bg-[#0B5E2E] text-white",
    title: "Gelar Wicara Akbar Alumni Kampus Impian",
    description:
      "Bedah strategi portofolio SNBP, taktik pengerjaan subtes SNBT, dan kiat lolos seleksi sekolah kedinasan oleh delegasi alumni Sixteen di UI, ITB, UNAIR, ITS, & STAN.",
    location: "MODERATOR: KETUA OSIS 2026/2027",
    status: "KAPASITAS: 500 KURSI",
    highlight: true,
  },
  {
    id: "gk-3",
    sektor: "sektor-1",
    time: "10.30 - 12.00 WIB",
    badge: "PITCH BATCH 1",
    title: "Parade Presentasi Interaktif Jurusan & Fakultas",
    description:
      "Lightning presentations 8 menit bergantian dari perwakilan Fakultas Kedokteran, Teknik, Seni Rupa & Desain, Ilmu Komunikasi, serta Hubungan Internasional kampus ternama.",
    location: "FORMAT: LIGHTNING PITCH + TANYA JAWAB",
    status: "SESI INTERAKTIF",
  },
  {
    id: "gk-4",
    sektor: "sektor-1",
    time: "13.00 - 14.30 WIB",
    badge: "SESI KHUSUS",
    title: "Sesi Tanya Jawab Beasiswa & Doorprize",
    description:
      "Panduan pendaftaran KIP-Kuliah, Beasiswa Indonesia Maju, serta beasiswa prestisius dari yayasan alumni. Diakhiri undian doorprize paket buku SNBT 2027.",
    location: "DIPIMPIN: GURU BK SMAN 16 & YAYASAN ALUMNI",
    status: "30 BUKU SNBT DIBAGIKAN",
  },
  {
    id: "gk-5",
    sektor: "sektor-1",
    time: "15.00 - 15.30 WIB",
    badge: "PENUTUPAN",
    badgeColor: "bg-[#BA1A1A] text-white",
    title: "Ikrar Tekad Sixteeners & Penutupan Lentera",
    description:
      "Pengucapan Ikrar Bersama Angkatan 2027 menyongsong kelulusan, penyalaan lentera tekad hijau, dan penyerahan plakat apresiasi kepada 45 perguruan tinggi mitra.",
    location: "SELURUH ANGKATAN BERKUMPUL",
    status: "FINALE EMOSIONAL",
  },
];

const TIMELINE_SEKTOR_2: TimelineItem[] = [
  {
    id: "outdoor-1",
    sektor: "sektor-2",
    time: "08.00 - 15.00 WIB",
    badge: "NON-STOP",
    badgeColor: "bg-[#0B5E2E] text-white",
    title: "Konsultasi Terbuka Stan PTN & PTS Nusantara",
    description:
      "Pameran stan interaktif dari 40+ perguruan tinggi negeri, swasta, dan kedinasan. Konseling langsung dengan perwakilan humas kampus, pembagian brosur beasiswa, dan suvenir edisi terbatas.",
    location: "BLOK A (DEPAN GK) & BLOK B (PLAZA PERPUS)",
    status: "TERBUKA SEPANJANG HARI",
  },
  {
    id: "outdoor-2",
    sektor: "sektor-2",
    time: "09.00 - 14.00 WIB",
    badge: "ONE-ON-ONE",
    badgeColor: "bg-[#F5B700] text-[#141414]",
    title: "Klinik Minat Bakat & Bedah Rasionalisasi Nilai Rapor",
    description:
      "Sesi konsultasi privat dengan psikolog pendidikan dan guru BK Sixteen. Bawa salinan rapor semester 1-5 untuk kalkulasi peluang persaingan SNBP secara real-time.",
    location: "RUANG MULTIMEDIA PERPUS",
    status: "BERKAS: FC RAPOR SMT 1-5",
    highlight: true,
  },
  {
    id: "outdoor-3",
    sektor: "sektor-2",
    time: "09.30 - 13.00 WIB",
    badge: "TES CBT MANDIRI",
    title: "Uji Coba Simulasi SNBT / Ujian Mandiri",
    description:
      "Mini tryout kilat berbasis komputer dengan sistem IRT (Item Response Theory). Terbagi dalam 3 kloter pengerjaan (45 menit/sesi) untuk menguji kesiapan penalaran umum dan kuantitatif.",
    location: "LAB KOMPUTER 1 & 2 (LANTAI 2)",
    status: "KLOTER I, II, & III",
  },
];

export default function RundownPage() {
  const [filter, setFilter] = useState<SectorFilter>("all");
  const [bookedSeats, setBookedSeats] = useState<number>(385);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const totalSeats = 500;
  const percentage = Math.round((bookedSeats / totalSeats) * 100);

  const handleBookSeat = () => {
    if (bookedSeats < totalSeats) {
      setBookedSeats((prev) => prev + 1);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 4000);
    }
  };

  const handleSaveCalendar = () => {
    const calendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=ESCAPE+2027+-+SMAN+16+Surabaya&dates=20270121T003000Z/20270121T083000Z&details=Pameran+Edukasi+dan+Karier+SMAN+16+Surabaya+-+Tema+DC+Green+Lantern+Willpower+Corps&location=SMAN+16+Surabaya,+Jl.+Prapen+Indah+I";
    window.open(calendarUrl, "_blank");
  };

  const showSektor1 = filter === "all" || filter === "sektor-1";
  const showSektor2 = filter === "all" || filter === "sektor-2";

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-8">
      {/* PAGE HERO & EDITORIAL BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-comic-4 bg-[#FAF8F2] p-6 sm:p-8 shadow-comic-lg relative overflow-hidden">
          {/* Halftone accent corner */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 benday-emerald opacity-20 pointer-events-none border-2 border-[#141414]" />

          {/* Top comic tab label */}
          <div className="inline-block bg-[#0B5E2E] text-white font-body font-bold text-xs uppercase tracking-wide px-4 py-1 border-2 border-[#141414] -rotate-1 mb-4 shadow-comic-sm">
            PROGRAM BUKU ACARA // LEMBAR 02
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none mb-3">
                JADWAL & RUNDOWN ACARA
              </h1>
              <p className="font-body text-base sm:text-lg text-[#0B5E2E] font-bold">
                Linimasa Kegiatan Pameran Kampus SMAN 16 Surabaya — Kamis, 21 Januari 2027
              </p>
              <p className="font-body text-xs sm:text-sm text-[#404940] mt-1 font-semibold">
                Dipusatkan di Gedung Kesenian (GK) dan Plaza Selasar SMAN 16 Surabaya. Gerbang registrasi dibuka pukul 07.00 WIB.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 2, scale: 0.98 }}
                onClick={handleSaveCalendar}
                className="bg-[#F5B700] text-[#141414] font-body font-bold text-xs sm:text-sm uppercase tracking-wide px-5 py-3 border-comic shadow-comic hover:bg-white active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📅 Simpan ke Google Calendar</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 2, scale: 0.98 }}
                onClick={() => window.print()}
                className="bg-white text-[#141414] font-body font-bold text-xs sm:text-sm uppercase tracking-wide px-4 py-3 border-comic shadow-comic hover:bg-[#FAF8F2] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>🖨 Cetak / PDF Rundown</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTOR TABS / CHAPTER SPLIT */}
      <section>
        <div className="flex items-center justify-between flex-wrap gap-4 border-b-4 border-[#141414] pb-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`font-body font-bold text-xs sm:text-sm uppercase tracking-wide px-5 py-2.5 border-comic transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#0B5E2E] text-white shadow-comic translate-x-1"
                  : "bg-white text-[#141414] hover:bg-[#FAF8F2] shadow-comic-sm"
              }`}
            >
              Semua Sesi (8 Acara)
            </button>
            <button
              onClick={() => setFilter("sektor-1")}
              className={`font-body font-bold text-xs sm:text-sm uppercase tracking-wide px-5 py-2.5 border-comic transition-all cursor-pointer ${
                filter === "sektor-1"
                  ? "bg-[#0B5E2E] text-white shadow-comic translate-x-1"
                  : "bg-white text-[#141414] hover:bg-[#FAF8F2] shadow-comic-sm"
              }`}
            >
              Sektor 1: Gedung Kesenian (GK)
            </button>
            <button
              onClick={() => setFilter("sektor-2")}
              className={`font-body font-bold text-xs sm:text-sm uppercase tracking-wide px-5 py-2.5 border-comic transition-all cursor-pointer ${
                filter === "sektor-2"
                  ? "bg-[#0B5E2E] text-white shadow-comic translate-x-1"
                  : "bg-white text-[#141414] hover:bg-[#FAF8F2] shadow-comic-sm"
              }`}
            >
              Sektor 2: Depan GK & Perpustakaan
            </button>
          </div>

          {/* Status Filter Badge */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#141414] px-3 py-1 font-body font-bold text-xs uppercase tracking-wide shadow-comic-sm">
            <span className="w-2.5 h-2.5 bg-[#0B5E2E] rounded-full animate-pulse border border-[#141414]" />
            <span>WAKTU LOKAL: WIB (SURABAYA)</span>
          </div>
        </div>
      </section>

      {/* FEATURED KEYNOTE PANEL (Asymmetric Large Comic Card) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-comic-4 bg-white shadow-comic-lg relative overflow-hidden"
      >
        {/* Header Strip */}
        <div className="bg-[#0B5E2E] text-white px-5 sm:px-8 py-3 border-b-4 border-[#141414] flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-[#F5B700] text-[#141414] font-body font-extrabold text-xs px-2.5 py-0.5 border border-[#141414] uppercase tracking-wide shadow-comic-sm">
              SOROTAN UTAMA
            </span>
            <span className="font-body font-extrabold text-sm sm:text-base tracking-wide text-white">
              PANGGUNG GK (08.30 - 10.30 WIB)
            </span>
          </div>
          <div className="font-body font-bold text-xs uppercase tracking-wider bg-[#141414] text-white px-3 py-1 border border-white">
            EPISODE #02 EXCLUSIVE
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#FAF8F2] font-body font-bold text-xs uppercase tracking-wide px-2.5 py-1 border border-[#141414]">
                SESI PLENO AKADEMIK
              </span>
              <span className="bg-[#A7F4B5] font-body font-bold text-xs uppercase tracking-wide px-2.5 py-1 border border-[#141414] text-[#0B5E2E]">
                WAJIB KELAS XII
              </span>
              <span className="bg-[#FAF8F2] font-body font-bold text-xs uppercase tracking-wide px-2.5 py-1 border border-[#141414]">
                TERBUKA KELAS X & XI
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-[#141414] uppercase leading-tight tracking-normal">
              Gelar Wicara Akbar: Strategi Menembus PTN Favorit & Kedinasan 2027
            </h2>

            {/* Speech Bubble Callout (Comic Trope) */}
            <div className="relative bg-[#FAF8F2] border-comic p-4 shadow-comic-sm mt-1 max-w-2xl">
              <div className="absolute -top-3 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#141414]" />
              <p className="font-body text-xs sm:text-sm font-bold text-[#0B5E2E] italic leading-relaxed">
                &ldquo;Panelis alumni lintas UI, ITB, UNAIR, ITS, dan STAN membedah tuntas passing grade, strategi portofolio prestasi, dan taktik jitu lolos jalur SNBP serta SNBT 2027!&rdquo;
              </p>
            </div>

            {/* University Stamp Chips */}
            <div className="pt-2">
              <span className="font-body font-bold text-xs text-[#404940] block mb-2 uppercase tracking-wide">
                PERWAKILAN ALUMNI SIXTEEN:
              </span>
              <div className="flex flex-wrap gap-2">
                {["UI", "ITB", "UNAIR", "ITS", "UGM", "STAN", "POLSTAT STIS"].map((univ) => (
                  <motion.span
                    key={univ}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="bg-[#FAF8F2] font-body font-extrabold text-xs px-3 py-1 border border-[#141414] shadow-comic-sm cursor-default"
                  >
                    {univ}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action & Capacity Box (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-[#FAF8F2] p-5 sm:p-6 border-comic shadow-comic">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#141414]">
              <span className="font-body font-bold text-xs uppercase tracking-wide text-[#404940]">KAPASITAS AUDITORIUM:</span>
              <div className="bg-[#0B5E2E] text-white font-body font-extrabold text-sm px-3 py-1 border border-[#141414] shadow-comic-sm">
                500 Kursi
              </div>
            </div>

            <div className="space-y-2 py-1">
              <div className="flex justify-between font-body font-bold text-xs uppercase tracking-wide">
                <span>STATUS KURSI:</span>
                <span className="font-extrabold text-[#0B5E2E]">
                  {bookedSeats} / {totalSeats} TERPESAN
                </span>
              </div>

              {/* Comic Meter Bar */}
              <div className="w-full h-5 border-2 border-[#141414] bg-white p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#0B5E2E] benday-gold"
                />
              </div>

              <p className="font-body text-[11px] text-[#404940] font-medium">
                *Sisa kuota {totalSeats - bookedSeats} kursi dialokasikan untuk antrean registrasi langsung (On the Spot).
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 2, scale: 0.98 }}
                onClick={handleBookSeat}
                className="w-full bg-[#0B5E2E] text-white font-body font-bold text-sm sm:text-base uppercase tracking-wide py-3 border-comic shadow-comic hover:bg-[#1E8449] active:translate-x-[2px] active:translate-y-[2px] transition-all text-center cursor-pointer"
              >
                🎟 Booking Kursi Sesi
              </motion.button>

              <AnimatePresence>
                {bookingSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-2.5 bg-[#A7F4B5] border-2 border-[#141414] text-center font-body font-bold text-xs uppercase tracking-wide text-[#0B5E2E] shadow-comic-sm"
                  >
                    ✔ Kursi #{bookedSeats} Berhasil Dipesan! Tunjukkan Kartu Pelajar saat Masuk.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DUAL COLUMN COMIC TIMELINE PANELS */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* COLUMN 1: PANGGUNG UTAMA GK */}
          {showSektor1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="border-comic-4 bg-white shadow-comic-lg flex flex-col"
            >
              {/* Column Header Strip */}
              <div className="bg-[#0B5E2E] text-white p-4 border-b-4 border-[#141414] flex justify-between items-center">
                <div>
                  <span className="font-body font-extrabold text-[10px] uppercase tracking-wider block text-[#A7F4B5]">
                    SEKTOR 01 • INDOOR AUDITORIUM
                  </span>
                  <h3 className="font-display text-lg uppercase tracking-wide text-white">
                    PANGGUNG UTAMA GK (GELANGGANG REMAJA)
                  </h3>
                </div>
                <span className="bg-[#F5B700] text-[#141414] font-body font-bold text-xs px-2.5 py-0.5 border border-[#141414] uppercase shadow-comic-sm">
                  5 SESI
                </span>
              </div>

              {/* Timeline Strip Items */}
              <div className="p-5 sm:p-6 space-y-5">
                {TIMELINE_SEKTOR_1.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 4 }}
                    className={`border-comic p-4 shadow-comic-sm relative ${
                      item.highlight
                        ? "bg-[#FAF8F2] border-l-8 border-l-[#0B5E2E]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b-2 border-[#141414] pb-2 mb-3">
                      <div className="bg-[#F5B700] text-[#141414] font-body font-bold text-xs px-2.5 py-0.5 border border-[#141414] uppercase shadow-comic-sm">
                        {item.time}
                      </div>
                      <span
                        className={`font-body font-extrabold text-[10px] px-2 py-0.5 border border-[#141414] uppercase tracking-wide ${
                          item.badgeColor || "bg-[#FAF8F2] text-[#141414]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-body font-extrabold text-base uppercase text-[#141414] mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-body text-xs text-[#404940] leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-body font-bold text-[#141414] pt-2 border-t border-gray-200 uppercase tracking-wide">
                      <span className="text-[#404940]">{item.location}</span>
                      <span className="font-extrabold text-[#0B5E2E]">{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COLUMN 2: SEKTOR STAN & OUTDOOR */}
          {showSektor2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="border-comic-4 bg-white shadow-comic-lg flex flex-col"
            >
              {/* Column Header Strip */}
              <div className="bg-[#141414] text-white p-4 border-b-4 border-[#141414] flex justify-between items-center">
                <div>
                  <span className="font-body font-extrabold text-[10px] uppercase tracking-wider block text-[#F5B700]">
                    SEKTOR 02 • OUTDOOR & SELASAR
                  </span>
                  <h3 className="font-display text-lg uppercase tracking-wide text-white">
                    SEKTOR STAN: DEPAN GK & PLAZA PERPUS
                  </h3>
                </div>
                <span className="bg-[#0B5E2E] text-white font-body font-bold text-xs px-2.5 py-0.5 border border-white uppercase shadow-comic-sm">
                  3 ZONA
                </span>
              </div>

              {/* Timeline Strip Items */}
              <div className="p-5 sm:p-6 space-y-5">
                {TIMELINE_SEKTOR_2.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 4 }}
                    className={`border-comic p-4 shadow-comic-sm relative ${
                      item.highlight
                        ? "bg-[#FAF8F2] border-l-8 border-l-[#F5B700]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b-2 border-[#141414] pb-2 mb-3">
                      <div className="bg-[#F5B700] text-[#141414] font-body font-bold text-xs px-2.5 py-0.5 border border-[#141414] uppercase shadow-comic-sm">
                        {item.time}
                      </div>
                      <span
                        className={`font-body font-extrabold text-[10px] px-2 py-0.5 border border-[#141414] uppercase tracking-wide ${
                          item.badgeColor || "bg-[#FAF8F2] text-[#141414]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-body font-extrabold text-base uppercase text-[#141414] mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-body text-xs text-[#404940] leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-body font-bold text-[#141414] pt-2 border-t border-gray-200 uppercase tracking-wide">
                      <span className="text-[#404940]">{item.location}</span>
                      <span className="font-extrabold text-[#0B5E2E]">{item.status}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Bonus Callout: Area Kuliner & Lounge */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-comic p-4 bg-[#FAF8F2] shadow-comic-sm relative"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">☕</span>
                    <div>
                      <h5 className="font-body font-extrabold text-sm uppercase text-[#141414] mb-1">
                        AREA KULINER & RESTING LOUNGE
                      </h5>
                      <p className="font-body text-xs text-[#404940]">
                        Bazar makanan & minuman kewirausahaan siswa kelas XI Sixteen buka sepanjang hari di koridor sayap timur depan kantin sehat.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* COMIC REMINDER NOTIFICATION BOX */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-comic-4 bg-[#F5B700] p-6 sm:p-8 shadow-comic-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#141414] text-white flex items-center justify-center border-2 border-[#141414] shrink-0 shadow-comic text-2xl sm:text-3xl">
              🔔
            </div>
            <div>
              <div className="inline-block bg-[#0B5E2E] text-white font-body font-bold text-xs uppercase tracking-wide px-2 py-0.5 border border-[#141414] mb-1 shadow-comic-sm">
                JANGAN SAMPAI TERTINGGAL
              </div>
              <h3 className="font-display text-xl sm:text-2xl uppercase text-[#141414] tracking-wide">
                4 Hal Penting yang Wajib Dibawa Siswa
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs font-semibold text-[#141414]">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#0B5E2E]">✔</span>
                  <span>Fotokopi Rapor Semester 1 - 5 untuk Rasionalisasi</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#0B5E2E]">✔</span>
                  <span>Buku Catatan / Tablet untuk Resume Sesi Talkshow</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#0B5E2E]">✔</span>
                  <span>Baterai HP Cukup untuk Presensi QR Code</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#0B5E2E]">✔</span>
                  <span>Seragam Batik Sekolah Rapi & Kartu Pelajar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
