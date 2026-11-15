"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  Search,
  MessageSquare,
  CheckCircle2,
  Star,
  Users,
  Send,
  Sparkles,
  BookOpen,
  Building,
  MapPin,
  Filter,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  MAHASISWA_LIST,
  MAHASISWA_DB,
  MahasiswaRecord,
  getShortCampus,
  getInitials,
  normalizeClassGroup,
  formatTitleCase,
} from "@/data/mahasiswa";

const CLASS_OPTIONS = [
  { label: "Semua Kelas", value: "all", count: 221 },
  { label: "XII-1", value: "XII 1", count: 18 },
  { label: "XII-2", value: "XII 2", count: 18 },
  { label: "XII-3", value: "XII 3", count: 17 },
  { label: "XII-4", value: "XII 4", count: 14 },
  { label: "XII-5", value: "XII 5", count: 25 },
  { label: "XII-6", value: "XII 6", count: 24 },
  { label: "XII-7", value: "XII 7", count: 15 },
  { label: "XII-8", value: "XII 8", count: 21 },
  { label: "XII-9", value: "XII 9", count: 18 },
  { label: "XII-10", value: "XII 10", count: 26 },
  { label: "XII-11", value: "XII 11", count: 25 },
];

const POPULAR_CAMPUSES = [
  { label: "Semua Kampus", value: "all" },
  { label: "UNAIR (59)", value: "UNIVERSITAS AIRLANGGA" },
  { label: "ITS (41)", value: "INSTITUT TEKNOLOGI SEPULUH NOPEMBER" },
  { label: "UNESA (41)", value: "UNIVERSITAS NEGERI SURABAYA" },
  { label: "UPN JATIM (22)", value: "UNIVERSITAS PEMBANGUNAN NASIONAL VETERAN JAWA TIMUR" },
  { label: "PPNS (10)", value: "POLITEKNIK PERKAPALAN NEGERI SURABAYA" },
  { label: "PENS (6)", value: "POLITEKNIK ELEKTRONIKA NEGERI SURABAYA" },
  { label: "ITB (5)", value: "INSTITUT TEKNOLOGI BANDUNG" },
  { label: "UBAYA (4)", value: "UNIVERSITAS SURABAYA" },
  { label: "UGM (3)", value: "UNIVERSITAS GADJAH MADA" },
  { label: "UI (2)", value: "UNIVERSITAS INDONESIA" },
  { label: "UB (2)", value: "UNIVERSITAS BRAWIJAYA" },
];

const CARDS_PER_PAGE = 24;

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedCampus, setSelectedCampus] = useState("all");
  const [selectedSnbpStatus, setSelectedSnbpStatus] = useState<"all" | "ELIGIBLE" | "NON ELIGIBLE">("all");
  const [sortBy, setSortBy] = useState<"rank" | "name" | "campus">("rank");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Modal State
  const [selectedStudent, setSelectedStudent] = useState<MahasiswaRecord | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [consultTopic, setConsultTopic] = useState("Review Portofolio & Nilai Rapor SNBP");

  // Filtering Logic
  const filteredStudents = useMemo(() => {
    return MAHASISWA_LIST.filter((student) => {
      // Filter by Class
      if (selectedClass !== "all" && student.kelas !== selectedClass) {
        return false;
      }

      // Filter by Campus
      if (selectedCampus !== "all" && student.perguruan_tinggi !== selectedCampus) {
        return false;
      }

      // Filter by SNBP Status
      if (selectedSnbpStatus !== "all" && student.status_snbp !== selectedSnbpStatus) {
        return false;
      }

      // Search query (name, major, campus, nisn)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = student.nama.toLowerCase().includes(q);
        const matchMajor = student.program_studi.toLowerCase().includes(q);
        const matchCampus = student.perguruan_tinggi.toLowerCase().includes(q);
        const matchClass = student.kelas.toLowerCase().includes(q) || normalizeClassGroup(student.kelas).toLowerCase().includes(q);
        const matchNisn = student.nisn?.toLowerCase().includes(q);

        if (!matchName && !matchMajor && !matchCampus && !matchClass && !matchNisn) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rank") {
        return a.no_sekolah - b.no_sekolah;
      }
      if (sortBy === "name") {
        return a.nama.localeCompare(b.nama);
      }
      if (sortBy === "campus") {
        return a.perguruan_tinggi.localeCompare(b.perguruan_tinggi);
      }
      return 0;
    });
  }, [searchQuery, selectedClass, selectedCampus, selectedSnbpStatus, sortBy]);

  const displayedStudents = useMemo(() => {
    return filteredStudents.slice(0, visibleCount);
  }, [filteredStudents, visibleCount]);

  const handleSendConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
    setTimeout(() => {
      setConsultationSuccess(false);
      setSelectedStudent(null);
    }, 2800);
  };

  const getAvatarBg = (student: MahasiswaRecord) => {
    if (student.status_snbp === "ELIGIBLE") {
      return "bg-[#0B5E2E]";
    }
    if (student.kategori_pt === "PTS") {
      return "bg-[#BA1A1A]";
    }
    return "bg-[#141414]";
  };

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20 selection:bg-[#F5B700] selection:text-[#141414]">
      {/* ================= TOP COMIC ISSUE RIBBON ================= */}
      <section className="bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_3px_0px_#141414] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between font-body font-bold text-xs sm:text-sm tracking-wide text-[#141414] gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="bg-[#141414] text-[#FAF8F2] px-2.5 py-0.5 text-xs font-display uppercase tracking-wider font-bold">
              DATABASE RESMI PDDIKTI
            </span>
            <span className="font-bold">
              SMAN 16 SURABAYA ANGKATAN 64 • TAHUN AJARAN 2025/2026
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-display uppercase tracking-wider bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <Award className="w-3.5 h-3.5 text-[#0B5E2E]" />
            <span>221 MAHASISWA TERVERIFIKASI</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative mt-3">
          <div className="absolute -top-3.5 left-6 bg-[#0B5E2E] text-[#FAF8F2] px-3.5 py-1 border-2 border-[#141414] font-display text-xs uppercase font-semibold shadow-[2px_2px_0px_#141414] flex items-center gap-1.5 tracking-wider z-20">
            <Star className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>DIREKTORI ALUMNI RESMI KEMDIKTISAINTEK</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#F5B700] text-[#141414] px-3 py-1 font-body text-xs uppercase border-2 border-[#141414] mb-2 font-extrabold tracking-wide shadow-comic-sm">
                DATA MAHASISWA TERDATA PDDIKTI • KELAS XII-1 S/D XII-11 • ANGKATAN 64
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                ARSIP MAHASISWA SIXTEEN 64
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-semibold leading-relaxed">
                Database faktual <strong>221 mahasiswa SMAN 16 Surabaya (Angkatan 64)</strong> yang terdata di PDDikti Kemdiktisaintek. 
                Tersebar di <strong>27 Perguruan Tinggi</strong> (PTN & PTS) dan <strong>74 Program Studi</strong> di seluruh Indonesia.
              </p>
            </div>

            {/* Telemetry Counter Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[100px]">
                <div className="font-display text-2xl text-[#0B5E2E] leading-none">221</div>
                <div className="font-body text-[10px] font-bold text-[#141414] uppercase mt-1">Siswa Terdata</div>
              </div>
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[100px]">
                <div className="font-display text-2xl text-[#0B5E2E] leading-none">27</div>
                <div className="font-body text-[10px] font-bold text-[#141414] uppercase mt-1">Kampus PTN/PTS</div>
              </div>
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[100px]">
                <div className="font-display text-2xl text-[#BA1A1A] leading-none">109</div>
                <div className="font-body text-[10px] font-bold text-[#141414] uppercase mt-1">SNBP Eligible</div>
              </div>
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[100px]">
                <div className="font-display text-2xl text-[#F5B700] leading-none">112</div>
                <div className="font-body text-[10px] font-bold text-[#141414] uppercase mt-1">SNBT / Mandiri</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & ADVANCED FILTER TOOLBAR ================= */}
        <section className="space-y-4">
          {/* Search Box + Sorting Bar */}
          <div className="bg-[#FAF8F2] border-comic-4 p-4 shadow-comic flex flex-col md:flex-row gap-3 items-stretch justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#404940]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(CARDS_PER_PAGE);
                }}
                placeholder="Cari nama mahasiswa, jurusan (Kedokteran, Informatika, Hukum), kampus, atau NISN..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] shadow-comic-sm placeholder-gray-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-white border-2 border-[#141414] px-2.5 py-1.5 shadow-comic-sm">
                <span className="text-[11px] font-display uppercase tracking-wider text-[#404940]">Urut:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "rank" | "name" | "campus")}
                  className="bg-transparent font-body text-xs font-bold text-[#141414] focus:outline-none cursor-pointer"
                >
                  <option value="rank">Peringkat Sekolah (1-388)</option>
                  <option value="name">Nama Mahasiswa (A-Z)</option>
                  <option value="campus">Perguruan Tinggi</option>
                </select>
              </div>

              {/* Status SNBP Filter */}
              <div className="flex items-center gap-1.5 bg-white border-2 border-[#141414] px-2.5 py-1.5 shadow-comic-sm">
                <span className="text-[11px] font-display uppercase tracking-wider text-[#404940]">Jalur:</span>
                <select
                  value={selectedSnbpStatus}
                  onChange={(e) => {
                    setSelectedSnbpStatus(e.target.value as "all" | "ELIGIBLE" | "NON ELIGIBLE");
                    setVisibleCount(CARDS_PER_PAGE);
                  }}
                  className="bg-transparent font-body text-xs font-bold text-[#141414] focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Jalur</option>
                  <option value="ELIGIBLE">Eligible SNBP (109)</option>
                  <option value="NON ELIGIBLE">SNBT / Mandiri (112)</option>
                </select>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-2 bg-[#F5B700] text-[#141414] font-body font-bold text-xs uppercase tracking-wide border-2 border-[#141414] shadow-comic-sm hover:bg-white cursor-pointer"
                >
                  Reset ✕
                </button>
              )}
            </div>
          </div>

          {/* Class Filter Pills */}
          <div>
            <div className="text-[11px] font-display uppercase tracking-wider text-[#141414] font-bold mb-1.5 flex items-center gap-1.5">
              <span>PILIH ASAL KELAS SMA (XII-1 S/D XII-11):</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CLASS_OPTIONS.map((cls) => {
                const isSelected = selectedClass === cls.value;
                return (
                  <button
                    key={cls.value}
                    onClick={() => {
                      setSelectedClass(cls.value);
                      setVisibleCount(CARDS_PER_PAGE);
                    }}
                    className={`comic-btn font-display text-xs uppercase px-3.5 py-1.5 border-2 border-[#141414] whitespace-nowrap transition-all cursor-pointer tracking-wider font-medium ${
                      isSelected
                        ? "bg-[#0B5E2E] text-[#FAF8F2] shadow-[2px_2px_0px_#141414] -translate-y-0.5"
                        : "bg-[#FAF8F2] text-[#141414] hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414]"
                    }`}
                  >
                    {cls.label} <span className="opacity-80 text-[10px]">({cls.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Campuses Filter Bar */}
          <div>
            <div className="text-[11px] font-display uppercase tracking-wider text-[#141414] font-bold mb-1.5 flex items-center gap-1.5">
              <span>FILTER KAMPUS TERPOPULER:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {POPULAR_CAMPUSES.map((c) => {
                const isSelected = selectedCampus === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => {
                      setSelectedCampus(c.value);
                      setVisibleCount(CARDS_PER_PAGE);
                    }}
                    className={`font-body text-[11px] font-semibold px-2.5 py-1 border border-[#141414] whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#141414] text-white shadow-comic-sm font-bold"
                        : "bg-white text-[#141414] hover:bg-[#FAF8F2]"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="text-xs font-display uppercase text-[#404940] flex justify-between items-center px-1 tracking-wider border-t-2 border-[#141414] pt-2">
            <span>
              Menampilkan {displayedStudents.length} dari total {filteredStudents.length} mahasiswa terdata
              {selectedClass !== "all" && ` (Kelas ${normalizeClassGroup(selectedClass)})`}
              {selectedCampus !== "all" && ` • ${getShortCampus(selectedCampus)}`}
            </span>
            <span className="hidden sm:inline">PDDikti Validated • Angkatan 64</span>
          </div>
        </section>

        {/* ================= ALUMNI CARDS GRID (221 SISWA) ================= */}
        <section aria-labelledby="alumni-grid-heading" className="space-y-6">
          <h2 id="alumni-grid-heading" className="sr-only">
            Daftar Profil Mahasiswa SMAN 16 Surabaya Terdata PDDikti
          </h2>

          {filteredStudents.length === 0 ? (
            <div className="bg-[#FAF8F2] border-comic-4 p-8 text-center shadow-comic">
              <p className="font-display text-xl uppercase text-[#141414] mb-2">
                Tidak ada data mahasiswa yang cocok dengan kriteria pencarian!
              </p>
              <p className="font-body text-xs text-[#404940] mb-4">
                Coba sesuaikan kata kunci pencarian, filter kelas, atau filter kampus.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClass("all");
                  setSelectedCampus("all");
                  setSelectedSnbpStatus("all");
                }}
                className="bg-[#0B5E2E] text-white px-4 py-2 border-2 border-[#141414] font-display text-xs uppercase shadow-comic-sm cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedStudents.map((student) => {
                const shortCampus = getShortCampus(student.perguruan_tinggi);
                const classLabel = normalizeClassGroup(student.kelas);
                const avatarBg = getAvatarBg(student);
                const initials = getInitials(student.nama);

                return (
                  <div
                    key={`${student.no}-${student.nama}`}
                    className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between hover:-translate-y-1 transition-transform overflow-hidden"
                  >
                    <div>
                      {/* Top ribbon: Class & Campus */}
                      <div className="bg-[#EAE5D9] border-b-2 border-[#141414] px-4 py-2 flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-[#141414] text-[#FAF8F2] text-xs font-display uppercase px-2.5 py-0.5 border border-[#141414] font-medium shadow-comic-sm tracking-wider">
                            KELAS {classLabel}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#404940]">
                            #{student.no_sekolah}
                          </span>
                        </div>
                        <span className="bg-[#0B5E2E] text-white text-xs font-display uppercase px-2.5 py-0.5 border border-[#141414] font-medium shadow-comic-sm tracking-wider shrink-0 font-bold">
                          {shortCampus}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 ${avatarBg} text-white border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-display font-bold text-base flex-shrink-0`}
                          >
                            {initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-base sm:text-lg uppercase text-[#141414] leading-tight line-clamp-2 font-bold">
                              {student.nama}
                            </h3>
                            <p className="font-body text-xs sm:text-sm text-[#0B5E2E] font-bold mt-0.5 leading-snug">
                              {student.program_studi}
                            </p>
                            <p className="font-body text-[11px] text-[#404940] font-semibold mt-0.5 truncate">
                              {student.perguruan_tinggi}
                            </p>
                          </div>
                        </div>

                        {/* Telemetry / Rank / Status Badge */}
                        <div className="bg-white border-2 border-[#141414] p-2.5 shadow-comic-sm space-y-1 text-[11px] font-body">
                          <div className="flex items-center justify-between">
                            <span className="text-[#404940]">Status Seleksi:</span>
                            {student.status_snbp === "ELIGIBLE" ? (
                              <span className="bg-[#A7F4B5] border border-[#0B5E2E] text-[#00441E] px-1.5 py-0.2 font-display text-[10px] uppercase font-bold">
                                ★ ELIGIBLE SNBP
                              </span>
                            ) : (
                              <span className="bg-[#FFDEA0] border border-[#141414] text-[#141414] px-1.5 py-0.2 font-display text-[10px] uppercase font-bold">
                                ⚡ SNBT / MANDIRI
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-200 pt-1">
                            <span className="text-[#404940]">Wilayah:</span>
                            <span className="font-semibold text-[#141414] truncate max-w-[170px]">
                              {student.lokasi_kampus}
                            </span>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-200 pt-1">
                            <span className="text-[#404940]">Skor Rapor SMAN 16:</span>
                            <span className="font-mono font-bold text-[#0B5E2E]">
                              {student.skor_jml.toLocaleString()} pts
                            </span>
                          </div>
                        </div>

                        {/* PDDikti validation label */}
                        <div className="flex items-center gap-1.5 text-[10px] font-body text-[#0B5E2E] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Terdata &amp; Terverifikasi PDDikti</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="p-4 sm:p-5 pt-0">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="comic-btn w-full bg-[#FAF8F2] text-[#141414] font-display text-xs uppercase py-2.5 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#F5B700] flex items-center justify-center gap-1.5 cursor-pointer font-medium tracking-wider"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#0B5E2E]" />
                        <span>Lihat Profil &amp; Tanya Kakak ({classLabel})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredStudents.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
                className="bg-[#0B5E2E] hover:bg-[#1E8449] text-white font-display text-sm uppercase tracking-wider px-8 py-3 border-3 border-[#141414] shadow-comic hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all font-bold cursor-pointer inline-flex items-center gap-2"
              >
                <span>Muat Mahasiswa Selanjutnya ({filteredStudents.length - visibleCount} lagi)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* ================= SMAN 16 SOLIDARITY CTA ================= */}
        <section className="mt-8 bg-[#F5B700] border-comic-4 shadow-comic-lg p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="bg-[#141414] text-[#FAF8F2] font-body font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 inline-block">
                KEKUATAN KONTINGEN SIXTEENERS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl uppercase text-[#141414] tracking-tight leading-tight">
                221 MAHASISWA SIXTEEN 64 SIAP MENGAWALMU DI ESCAPE 2027!
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#141414] font-semibold leading-relaxed">
                Ingin tahu kiat nyata lolos jurusan kedokteran, teknik industri, hukum, hingga sekolah bisnis di kampus idaman? 
                Hadir langsung di Gedung Kesenian SMAN 16 Surabaya pada 21 Januari 2027!
              </p>
            </div>

            <Link
              href="/direktori-stan"
              className="comic-btn bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs sm:text-sm uppercase tracking-wider px-6 py-3 border-2 border-[#141414] shadow-[4px_4px_0px_#141414] hover:bg-[#1F6C3A] whitespace-nowrap font-bold inline-flex items-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>🏛️ Jelajahi Database Stan Kampus &rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ================= STUDENT DETAIL & CONSULTATION MODAL ================= */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg max-w-lg w-full p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 bg-[#FAF8F2] text-[#141414] w-8 h-8 border-2 border-[#141414] font-body font-bold text-sm flex items-center justify-center hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414] cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-14 h-14 ${getAvatarBg(selectedStudent)} text-white border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center font-body font-black text-lg flex-shrink-0`}
                  >
                    {getInitials(selectedStudent.nama)}
                  </div>
                  <div>
                    <span className="bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs uppercase px-2.5 py-0.5 border border-[#141414] font-medium tracking-wider">
                      KELAS {normalizeClassGroup(selectedStudent.kelas)} • ANGKATAN 64
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase text-[#141414] leading-tight mt-1 font-bold">
                      {selectedStudent.nama}
                    </h3>
                    <p className="font-body text-sm text-[#0B5E2E] font-bold">
                      {selectedStudent.program_studi}
                    </p>
                    <p className="font-body text-xs text-[#404940] font-semibold">
                      {selectedStudent.perguruan_tinggi} ({selectedStudent.kategori_pt})
                    </p>
                  </div>
                </div>

                {/* Detail Specifications Table */}
                <div className="bg-white border-2 border-[#141414] p-4 shadow-comic-sm space-y-2 text-xs font-body">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#404940]">Peringkat Sekolah:</span>
                    <span className="font-bold text-[#141414]">
                      Peringkat #{selectedStudent.no_sekolah} (dari 388 siswa)
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#404940]">Skor Rapor Kumulatif:</span>
                    <span className="font-mono font-bold text-[#0B5E2E]">
                      {selectedStudent.skor_jml.toLocaleString()} pts
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#404940]">Status Kelayakan SNBP:</span>
                    <span className="font-bold text-[#141414]">
                      {selectedStudent.status_snbp === "ELIGIBLE"
                        ? "ELIGIBLE (Kuota Prestasi Sekolah)"
                        : "NON ELIGIBLE (Lolos Seleksi SNBT / Ujian Mandiri)"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#404940]">Lokasi &amp; Wilayah Kampus:</span>
                    <span className="font-semibold text-[#141414]">
                      {selectedStudent.lokasi_kampus} ({selectedStudent.zona_wilayah})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#404940]">Status Verifikasi:</span>
                    <span className="font-bold text-[#0B5E2E]">
                      ✓ {selectedStudent.status_validasi} (PDDikti)
                    </span>
                  </div>
                </div>

                {consultationSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-[#A7F4B5] border-2 border-[#141414] text-center space-y-2"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#0B5E2E] mx-auto" />
                    <h3 className="font-display text-lg uppercase text-[#141414]">
                      Pertanyaan Berhasil Dititipkan!
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#141414] font-medium">
                      Pertanyaanmu untuk <strong>{selectedStudent.nama}</strong> telah dicatat panitia ESCAPE 2027. 
                      Kamu bisa menyapa dan berkonsultasi langsung di stan pameran Gedung Kesenian!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendConsultation} className="space-y-3 pt-1">
                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Pilih Topik yang Ingin Ditanyakan:
                      </label>
                      <select
                        value={consultTopic}
                        onChange={(e) => setConsultTopic(e.target.value)}
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0B5E2E]"
                      >
                        <option value="Review Portofolio & Nilai Rapor SNBP">Kiat Nilai Rapor &amp; Portofolio di {selectedStudent.program_studi}</option>
                        <option value="Strategi Lolos SNBT / UTBK">Strategi Hadapi Soal SNBT / UTBK</option>
                        <option value="Tips Ujian Mandiri & Seleksi Kampus">Kiat Ujian Mandiri di {getShortCampus(selectedStudent.perguruan_tinggi)}</option>
                        <option value="Tanya Realita Kehidupan Kuliah">Keseharian &amp; Beban Kuliah di Jurusan Ini</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Nama &amp; Kelasmu di Sixteen:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Farhan (XI-4 Sixteen)"
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Pertanyaanmu untuk Kakak Kelas:
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder={`Tanyakan hal yang ingin kamu ketahui seputar ${selectedStudent.program_studi} di ${getShortCampus(selectedStudent.perguruan_tinggi)}...`}
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] font-medium"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="comic-btn flex-1 bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs sm:text-sm uppercase py-3 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#1F6C3A] flex items-center justify-center gap-1.5 cursor-pointer font-bold tracking-wider"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim Pertanyaan ⚡</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(null)}
                        className="px-4 py-2.5 bg-white text-[#141414] font-display text-xs uppercase border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#F5B700] cursor-pointer font-medium tracking-wider"
                      >
                        Tutup
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
