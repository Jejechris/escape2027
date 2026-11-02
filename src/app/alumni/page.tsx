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
} from "lucide-react";

interface Alumni {
  id: string;
  name: string;
  classGroup: string; // e.g. "XII MIPA 1", "XII IPS 2"
  campus: string;
  shortCampus: string;
  major: string;
  batchYear: number;
  batchName: string;
  track: string;
  focus: string;
  avatarText: string;
  avatarBg: string;
  quote?: string;
}

const ALUMNI_LIST: Alumni[] = [
  {
    id: "rayhan-daniswara",
    name: "Muhammad Rayhan Daniswara",
    classGroup: "XII-1",
    campus: "Institut Teknologi Bandung (ITB)",
    shortCampus: "ITB BANDUNG",
    major: "Teknik Informatika",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "Jalur SNBP (Peringkat 1)",
    focus: "Software Engineering & Algoritma Kompetitif",
    avatarText: "MRD",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Kunci SNBP adalah konsistensi grafik nilai dari semester 1 dan portofolio karya nyata yang terverifikasi.",
  },
  {
    id: "bagas-aditya",
    name: "Bagas Aditya Nugraha",
    classGroup: "XII-1",
    campus: "Institut Teknologi Bandung (ITB)",
    shortCampus: "ITB BANDUNG",
    major: "Teknik Sipil & Lingkungan",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "SNBT (Skor 730+)",
    focus: "Peraih Skor UTBK Tertinggi Subtes Penalaran Matematika Sixteen 34",
    avatarText: "BAN",
    avatarBg: "bg-[#1F6C3A]",
    quote: "Fokus drill soal tipe Penalaran Kuantitatif dan Literasi Bahasa tiap pagi sebelum masuk jam pertama sekolah.",
  },
  {
    id: "annisa-putri",
    name: "Annisa Putri Azzahra",
    classGroup: "XII-2",
    campus: "Universitas Airlangga (UNAIR)",
    shortCampus: "UNAIR SBY",
    major: "Kedokteran Umum",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "Jalur SNBP",
    focus: "Pre-klinis Kardiovaskular & Kesehatan Masyarakat",
    avatarText: "APA",
    avatarBg: "bg-[#BA1A1A]",
    quote: "Pertahankan nilai Biologi dan Kimia stabil naik. Jangan segan konsultasi rasionalisasi nilai ke Guru BK Sixteen.",
  },
  {
    id: "faris-haidar",
    name: "Faris Haidar Alamsyah",
    classGroup: "XII-3",
    campus: "Institut Teknologi Bandung (ITB)",
    shortCampus: "ITB BANDUNG",
    major: "Teknik Elektro",
    batchYear: 2025,
    batchName: "Sixteen 35",
    track: "SNBT STEI ITB",
    focus: "Penerima Beasiswa Prestasi Unggulan & Pengembang Sirkuit IoT",
    avatarText: "FHA",
    avatarBg: "bg-[#1F6C3A]",
    quote: "Passing grade STEI memang menantang, tapi pembagian target skor per subtes membuat belajarmu terarah.",
  },
  {
    id: "dimas-arya",
    name: "Dimas Arya Prakoso",
    classGroup: "XII-4",
    campus: "Institut Teknologi Sepuluh Nopember (ITS)",
    shortCampus: "ITS SURABAYA",
    major: "Sistem Informasi",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "Jalur SNBP",
    focus: "Juara Olimpiade Informatika Jatim & UI/UX Product Design",
    avatarText: "DAP",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Sertifikat lomba komputer dan portofolio desain web sangat mendongkrak peluang lolos SNBP di ITS.",
  },
  {
    id: "kevin-jonathan",
    name: "Kevin Jonathan Pratama",
    classGroup: "XII-5",
    campus: "Institut Teknologi Sepuluh Nopember (ITS)",
    shortCampus: "ITS SURABAYA",
    major: "Teknik Mesin & Dirgantara",
    batchYear: 2026,
    batchName: "Sixteen 36",
    track: "Jalur SNBT",
    focus: "Spesialis Aerodinamika & Tim Aeromodelling SMAN 16 Surabaya",
    avatarText: "KJP",
    avatarBg: "bg-[#1F6C3A]",
    quote: "Belajar fisika mekanika dan kalkulus jadi seru kalau kamu aktif di ekskul sains terapan Sixteen.",
  },
  {
    id: "salma-aulia",
    name: "Salma Aulia Rachman",
    classGroup: "XII-6",
    campus: "Universitas Airlangga (UNAIR)",
    shortCampus: "UNAIR SBY",
    major: "Farmasi Klinis",
    batchYear: 2026,
    batchName: "Sixteen 36",
    track: "Jalur SNBP",
    focus: "Juara 1 LKTI Ilmiah Remaja Jatim & Formulasi Herbal",
    avatarText: "SAR",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Prestasi lomba karya ilmiah di Sixteen membimbing langkahku tembus Farmasi UNAIR tanpa tes.",
  },
  {
    id: "rizky-pratama",
    name: "Rizky Pratama Yudha",
    classGroup: "XII-7",
    campus: "Politeknik Keuangan Negara STAN (PKN STAN)",
    shortCampus: "PKN STAN",
    major: "Akuntansi Sektor Publik",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "SPMB Kedinasan",
    focus: "Lulus Murni SKD (Skor 445+) & Pembinaan Kesamaptaan Fisik",
    avatarText: "RPY",
    avatarBg: "bg-[#141414]",
    quote: "Latihan fisik lari dan push-up wajib seimbang dengan latihan tryout materi TWK/TIU/TKP setiap minggu.",
  },
  {
    id: "clarissa-aurelia",
    name: "Clarissa Aurelia Wardhana",
    classGroup: "XII-8",
    campus: "Universitas Indonesia (UI)",
    shortCampus: "UI DEPOK",
    major: "Ilmu Hukum",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "Jalur SIMAK UI",
    focus: "Hukum Tata Negara & Debater Juara Nasional SMAN 16",
    avatarText: "CAW",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Esai seleksi mandiri harus punya pesan personal yang kuat mengenai visi dan kepedulian sosialmu.",
  },
  {
    id: "fathia-nabila",
    name: "Fathia Nabila Ramadhani",
    classGroup: "XII-8",
    campus: "Universitas Gadjah Mada (UGM)",
    shortCampus: "UGM YOGYA",
    major: "Manajemen Bisnis IUP",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "International (IUP)",
    focus: "Awardee Student Exchange Program & Konsultan GMST/IELTS",
    avatarText: "FNR",
    avatarBg: "bg-[#4D3700]",
    quote: "Kelas internasional butuh kepercayaan diri dalam presentasi bahasa Inggris dan analisis studi kasus.",
  },
  {
    id: "zahra-kirana",
    name: "Zahra Kirana Maharani",
    classGroup: "XII-9",
    campus: "Universitas Airlangga (UNAIR)",
    shortCampus: "UNAIR SBY",
    major: "Hubungan Internasional",
    batchYear: 2025,
    batchName: "Sixteen 35",
    track: "SNBP Prestasi",
    focus: "Mantan Ketua Divisi Humas Luar OSIS SMAN 16 & Diplomasi Pemuda",
    avatarText: "ZKM",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Pengalaman organisasi di Sixteen melatih diplomasi publik yang sangat berguna di bangku kuliah HI.",
  },
  {
    id: "nabila-syakira",
    name: "Nabila Syakira Jasmine",
    classGroup: "XII-10",
    campus: "Universitas Indonesia (UI)",
    shortCampus: "UI DEPOK",
    major: "Psikologi",
    batchYear: 2025,
    batchName: "Sixteen 35",
    track: "Jalur Mandiri UI",
    focus: "Praktisi Konseling Sebaya & Tim Redaksi Majalah Siswa Sixteen",
    avatarText: "NSJ",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Pahami konsep psikologi sosial dan bangun empati lewat kegiatan relawan di lingkungan sekolah.",
  },
  {
    id: "dinda-alissya",
    name: "Dinda Alissya Putri",
    classGroup: "XII-11",
    campus: "Universitas Gadjah Mada (UGM)",
    shortCampus: "UGM YOGYA",
    major: "Ilmu Komunikasi",
    batchYear: 2026,
    batchName: "Sixteen 36",
    track: "CBT UGM",
    focus: "Penyiar Radio SMAN 16 & Konten Kreator Edukasi Kampus",
    avatarText: "DAP",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Jalur mandiri CBT UGM sangat terukur kalau kamu kuasai pola soal TPA dan penalaran analitis.",
  },
  {
    id: "faris-ramadhan",
    name: "Faris Ramadhan, S.T.",
    classGroup: "XII-11",
    campus: "Institut Teknologi Sepuluh Nopember (ITS)",
    shortCampus: "ITS SURABAYA",
    major: "Manajemen Teknologi / Industri",
    batchYear: 2024,
    batchName: "Sixteen 34",
    track: "Jalur Prestasi",
    focus: "Mahasiswa Berprestasi ITS & Pengembang Start-up Edukasi",
    avatarText: "FAR",
    avatarBg: "bg-[#0B5E2E]",
    quote: "Anak IPS juga bisa tembus kampus teknologi lewat jurusan manajemen rekayasa dan digital bisnis!",
  },
];

const CLASS_LIST = [
  "Semua Kelas",
  "XII-1",
  "XII-2",
  "XII-3",
  "XII-4",
  "XII-5",
  "XII-6",
  "XII-7",
  "XII-8",
  "XII-9",
  "XII-10",
  "XII-11",
];

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");
  const [selectedAlumniModal, setSelectedAlumniModal] = useState<Alumni | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [consultTopic, setConsultTopic] = useState("Review Portofolio & Nilai Rapor");

  const filteredAlumni = useMemo(() => {
    return ALUMNI_LIST.filter((alumni) => {
      const matchClass = selectedClass === "Semua Kelas" || alumni.classGroup === selectedClass;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        alumni.name.toLowerCase().includes(q) ||
        alumni.campus.toLowerCase().includes(q) ||
        alumni.major.toLowerCase().includes(q) ||
        alumni.classGroup.toLowerCase().includes(q) ||
        (alumni.quote && alumni.quote.toLowerCase().includes(q));

      return matchClass && matchSearch;
    });
  }, [searchQuery, selectedClass]);

  const handleSendConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
    setTimeout(() => {
      setConsultationSuccess(false);
      setSelectedAlumniModal(null);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-16 selection:bg-[#F5B700] selection:text-[#141414]">
      {/* ================= TOP COMIC ISSUE RIBBON ================= */}
      <section className="bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_3px_0px_#141414] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body font-bold text-xs sm:text-sm tracking-wide text-[#141414]">
          <div className="flex items-center gap-3">
            <span className="bg-[#141414] text-[#FAF8F2] px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider">
              DATABASE ALUMNI PER KELAS
            </span>
            <span className="hidden sm:inline font-bold">
              REKAM JEJAK KELAS XII MIPA &amp; XII IPS SMAN 16 SURABAYA DI KAMPUS IMPIAN
            </span>
            <span className="sm:hidden font-bold">ALUMNI PER KELAS • SMAN 16</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <Award className="w-3.5 h-3.5 text-[#0B5E2E]" />
            <span>14 ALUMNI TERVERIFIKASI</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative mt-3">
          <div className="absolute -top-3.5 left-6 bg-[#0B5E2E] text-[#FAF8F2] px-3.5 py-1 border-2 border-[#141414] font-display text-xs uppercase font-semibold shadow-[2px_2px_0px_#141414] flex items-center gap-1.5 tracking-wider z-20">
            <Star className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>DIREKTORI ALUMNI PER KELAS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#F5B700] text-[#141414] px-3 py-1 font-body text-xs uppercase border-2 border-[#141414] mb-2 font-extrabold tracking-wide shadow-comic-sm">
                SORTIR MUDAH PER KELAS • KELAS XII-1 S/D XII-11 • TIPS TEMBUS PTN
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                ALUMNI SIXTEEN PER KELAS
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-semibold leading-relaxed">
                Temukan kakak kelas dari kelas asalmu di SMAN 16 Surabaya (Kelas XII-1 sampai XII-11). Pelajari strategi masuk PTN/Kedinasan mereka, dan tanyakan langsung pengalaman nyata kuliah!
              </p>
            </div>

            {/* Quick Stat Counter Badges */}
            <div className="flex items-center gap-3">
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[120px]">
                <div className="font-display text-2xl text-[#0B5E2E] leading-none">11 Kelas</div>
                <div className="font-body text-[11px] font-bold text-[#141414] uppercase mt-1">XII-1 s/d XII-11</div>
              </div>
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[120px]">
                <div className="font-display text-2xl text-[#0B5E2E] leading-none">100%</div>
                <div className="font-body text-[11px] font-bold text-[#141414] uppercase mt-1">Gratis Tanya</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & CLASS FILTER TOOLBAR ================= */}
        <section className="space-y-4">
          <div className="bg-[#FAF8F2] border-comic-4 p-4 shadow-comic flex flex-col sm:flex-row gap-3 items-stretch justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#404940]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama alumni, kelas (XII MIPA 1), kampus (ITB, UI, UNAIR), atau jurusan..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] shadow-comic-sm placeholder-gray-500 font-medium"
              />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-[#F5B700] text-[#141414] font-body font-bold text-xs uppercase tracking-wide border-2 border-[#141414] shadow-comic-sm hover:bg-white cursor-pointer"
              >
                Reset ✕
              </button>
            )}
          </div>

          {/* Class Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CLASS_LIST.map((cls) => {
              const isSelected = selectedClass === cls;
              return (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`comic-btn font-display text-xs uppercase px-3.5 py-1.5 border-2 border-[#141414] whitespace-nowrap transition-all cursor-pointer tracking-wider font-medium ${
                    isSelected
                      ? "bg-[#0B5E2E] text-[#FAF8F2] shadow-[2px_2px_0px_#141414] -translate-y-0.5"
                      : "bg-[#FAF8F2] text-[#141414] hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414]"
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-display uppercase text-[#404940] flex justify-between items-center px-1 tracking-wider">
            <span>Ditemukan {filteredAlumni.length} alumni dari {selectedClass}</span>
            <span>SMAN 16 Surabaya • Edisi XVI</span>
          </div>
        </section>

        {/* ================= ALUMNI CARDS GRID (PER KELAS) ================= */}
        <section aria-labelledby="alumni-grid-heading" className="space-y-4">
          <h2 id="alumni-grid-heading" className="sr-only">
            Daftar Profil Alumni SMAN 16
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between hover:-translate-y-1 transition-transform overflow-hidden"
              >
                <div>
                  {/* Header ribbon with CLASS badge & Campus */}
                  <div className="bg-[#EAE5D9] border-b-2 border-[#141414] px-4 py-2 flex justify-between items-center">
                    <span className="bg-[#141414] text-[#FAF8F2] text-xs font-display uppercase px-2.5 py-0.5 border border-[#141414] font-medium shadow-comic-sm tracking-wider">
                      KELAS {alumni.classGroup}
                    </span>
                    <span className="bg-[#0B5E2E] text-white text-xs font-display uppercase px-2.5 py-0.5 border border-[#141414] font-medium shadow-comic-sm tracking-wider">
                      {alumni.shortCampus}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 ${alumni.avatarBg} text-white border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-display font-bold text-base flex-shrink-0`}
                      >
                        {alumni.avatarText}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg sm:text-xl uppercase text-[#141414] leading-tight">
                          {alumni.name}
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-[#0B5E2E] font-bold mt-0.5 leading-snug">
                          {alumni.major}
                        </p>
                        <p className="font-body text-[11px] sm:text-xs text-[#404940] font-semibold mt-0.5">
                          {alumni.campus} • {alumni.batchName}
                        </p>
                      </div>
                    </div>

                    {/* Prominent Noted & Tips/Trick dari Alumni */}
                    {alumni.quote && (
                      <div className="bg-[#FEF08A] border-2 border-[#141414] p-3 shadow-comic-sm relative mt-0.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm">💡</span>
                          <span className="font-display text-xs uppercase tracking-wider text-[#141414] font-semibold">
                            NOTED TIPS &amp; TRIK DARI KAKAK {alumni.classGroup}:
                          </span>
                        </div>
                        <p className="font-body text-xs text-[#141414] font-medium leading-relaxed italic">
                          &ldquo;{alumni.quote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => setSelectedAlumniModal(alumni)}
                    className="comic-btn w-full bg-[#FAF8F2] text-[#141414] font-display text-xs uppercase py-2.5 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#F5B700] flex items-center justify-center gap-1.5 cursor-pointer font-medium tracking-wider"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#0B5E2E]" />
                    <span>Tanya Tips &amp; Pengalaman ({alumni.classGroup})</span>
                  </button>
                </div>
            </div>
          ))}
          </div>
        </section>

        {/* ================= SOLIDARITAS ALUMNI CALL TO ACTION ================= */}
        <section className="mt-8 bg-[#F5B700] border-comic-4 shadow-comic-lg p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="bg-[#141414] text-[#FAF8F2] font-body font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 inline-block">
                PANGGILAN SOLIDARITAS ALUMNI SIXTEEN
              </span>
              <h2 className="font-display text-2xl sm:text-3xl uppercase text-[#141414] tracking-tight leading-tight">
                KAMU ALUMNI DARI KELAS XII SIXTEEN?
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#141414] font-semibold leading-relaxed">
                Ayo bantu adik-adik kelasmu di SMAN 16 Surabaya menemukan jalan menuju kampus impian mereka! Bergabunglah menjadi mentor resmi dan bagikan kiat suksesmu.
              </p>
            </div>

            <button
              onClick={() => {
                alert("Terima kasih atas solidaritas alumni Sixteen! Formulir mentor resmi terkoordinasi dengan Bimbingan Konseling SMAN 16 Surabaya.");
              }}
              className="comic-btn bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#1F6C3A] whitespace-nowrap cursor-pointer font-medium"
            >
              Daftar Sebagai Mentor Alumni &rarr;
            </button>
          </div>
        </section>
      </main>

      {/* ================= INTERACTIVE CONSULTATION MODAL ================= */}
      <AnimatePresence>
        {selectedAlumniModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg max-w-lg w-full p-6 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedAlumniModal(null)}
                className="absolute top-4 right-4 bg-[#FAF8F2] text-[#141414] w-8 h-8 border-2 border-[#141414] font-body font-bold text-sm flex items-center justify-center hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414] cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-14 h-14 ${selectedAlumniModal.avatarBg} text-white border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center font-body font-black text-lg flex-shrink-0`}>
                    {selectedAlumniModal.avatarText}
                  </div>
                  <div>
                    <span className="bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs uppercase px-2.5 py-0.5 border border-[#141414] font-medium tracking-wider">
                      KELAS {selectedAlumniModal.classGroup} • ALUMNI SIXTEEN
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase text-[#141414] leading-tight mt-1">
                      {selectedAlumniModal.name}
                    </h3>
                    <p className="font-body text-sm text-[#0B5E2E] font-bold">
                      {selectedAlumniModal.major} • {selectedAlumniModal.campus}
                    </p>
                  </div>
                </div>

                {/* Noted tips & trick inside modal */}
                {selectedAlumniModal.quote && (
                  <div className="bg-[#FEF08A] border-2 border-[#141414] p-3.5 shadow-comic-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm">💡</span>
                      <span className="font-display text-xs uppercase text-[#141414] font-semibold tracking-wider">
                        NOTED DARI KAKAK {selectedAlumniModal.classGroup}:
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#141414] font-medium italic">
                      &ldquo;{selectedAlumniModal.quote}&rdquo;
                    </p>
                  </div>
                )}

                {consultationSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-[#A7F4B5] border-2 border-[#141414] text-center space-y-2"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#0B5E2E] mx-auto" />
                    <h3 className="font-display text-lg uppercase text-[#141414]">
                      Permintaan Konsultasi Terkirim!
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#141414] font-medium">
                      Pesanmu telah dicatat panitia ESCAPE 2027. Kakak alumni akan membalas atau menemuimu di booth kampus saat hari expo!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendConsultation} className="space-y-3 pt-1">
                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Pilih Topik Konsultasi:
                      </label>
                      <select
                        value={consultTopic}
                        onChange={(e) => setConsultTopic(e.target.value)}
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0B5E2E]"
                      >
                        <option value="Review Portofolio & Nilai Rapor">Review Portofolio & Nilai Rapor SNBP</option>
                        <option value="Strategi Lolos SNBT / UTBK">Strategi Lolos SNBT / Subtes UTBK</option>
                        <option value="Tips Ujian Mandiri & Seleksi Kedinasan">Tips Ujian Mandiri & Seleksi Kedinasan</option>
                        <option value="Tanya Realita Kehidupan Kampus & Kos">Tanya Realita Kehidupan Kampus & Kos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Nama &amp; Kelasmu:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Rian (XI MIPA 2)"
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-xs uppercase text-[#141414] mb-1 font-bold tracking-wider">
                        Pertanyaanmu:
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tanyakan hal yang ingin kamu ketahui seputar cara belajar, materi tes, atau jurusan..."
                        className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:border-[#0B5E2E] font-medium"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="comic-btn flex-1 bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs sm:text-sm uppercase py-3 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#1F6C3A] flex items-center justify-center gap-1.5 cursor-pointer font-medium tracking-wider"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim Pertanyaan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAlumniModal(null)}
                        className="px-4 py-2.5 bg-white text-[#141414] font-display text-xs uppercase border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#F5B700] cursor-pointer font-medium tracking-wider"
                      >
                        Batal
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
