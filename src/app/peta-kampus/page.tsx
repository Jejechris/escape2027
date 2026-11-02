"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Map as MapIcon,
  Printer,
  Compass,
  Navigation,
  MapPin,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  Building2,
  Users,
  Footprints,
  ArrowRight,
  HeartPulse,
  Utensils,
  DoorOpen,
} from "lucide-react";

interface ZoneData {
  id: "GK" | "BOOTH_JALAN" | "CHECKIN" | "FASILITAS";
  name: string;
  subname: string;
  location: string;
  capacity: string;
  badge: string;
  color: string;
  accentBg: string;
  description: string;
  highlights: string[];
  booths: string[];
}

const ZONES: Record<"GK" | "BOOTH_JALAN" | "CHECKIN" | "FASILITAS", ZoneData> = {
  GK: {
    id: "GK",
    name: "GEDUNG KESENIAN (GK) — AULA UTAMA",
    subname: "Gedung Vertikal Paling Kanan • Ruang Kosong / Lesehan",
    location: "Gedung Kesenian SMAN 16 (Gedung Paling Kanan Vertikal)",
    capacity: "Sekitar 500 Orang Mentok (Aula Bersih & Lapang)",
    badge: "AULA KOSONG & LESEHAN",
    color: "#0B5E2E",
    accentBg: "bg-[#0B5E2E]",
    description:
      "Gedung megah berorientasi vertikal di sisi kanan kompleks SMAN 16 Surabaya. Ruang dalam GK dibuat bersih dan kosong tanpa sekat stan pameran, difungsikan khusus sebagai aula sirkulasi terbuka dan area lesehan sejuk berpendingin udara (Full AC) dengan daya tampung maksimal sekitar 500 orang mentok.",
    highlights: [
      "Kapasitas Maksimal: Sekitar 500 orang mentok",
      "Area Dalam Bersih & Lapang: Tanpa stan pameran di dalam aula",
      "Sirkulasi Nyaman: Pendingin udara (Full AC) & karpet lesehan terbuka",
      "Pintu 1 (Ujung Vertikal Atas) & Pintu 2 (Samping Tengah Sebelah Jalan)",
    ],
    booths: [
      "Aula Terbuka Full AC (Area Bersih)",
      "Zonasi Lesehan Istirahat Pengunjung",
      "Pintu 1 (Akses Ujung Atas)",
      "Pintu 2 (Akses Samping Tengah)",
    ],
  },
  BOOTH_JALAN: {
    id: "BOOTH_JALAN",
    name: "JALAN STAN BOOTH (MEMANJANG KE KIRI)",
    subname: "Jalan Abu-Abu Depan GK Memanjang ke Arah Barat",
    location: "Jalan Paving/Selasar Antar-Gedung di Depan GK ke Kiri",
    capacity: "750 Orang (Koridor Terbuka Sejuk)",
    badge: "KLUSTER STAN EXPO",
    color: "#1F6C3A",
    accentBg: "bg-[#1F6C3A]",
    description:
      "Jalan abu-abu terbuka yang memanjang horizontal ke arah kiri (barat) persis dari depan Gedung Kesenian. Menjadi pusat seluruh pameran stan terbuka untuk Kubah Kedinasan, kampus swasta unggulan, edutech bimbel, dan karya riset siswa.",
    highlights: [
      "Deretan tenda booth rapi memanjang di sepanjang sisi jalan abu-abu",
      "Kluster Kedinasan: PKN STAN, POLSTAT STIS, IPDN, POLTEKIP",
      "Kluster Kampus Swasta & Global: UBAYA, UK Petra, Study Abroad",
      "Stan Inovasi Karya Siswa & Robotika Sixteen di ujung barat jalan",
    ],
    booths: [
      "PKN STAN",
      "POLSTAT STIS",
      "POLTEKIP",
      "UBAYA",
      "UK Petra",
      "Brain Academy",
      "Ganesha Operation",
      "Robotika Sixteen",
    ],
  },
  CHECKIN: {
    id: "CHECKIN",
    name: "MEJA CHECK-IN & REGISTRASI PRESENSI",
    subname: "Samping Pintu Masuk Samping Dekat Jalur Booth",
    location: "Samping Pintu 2 GK (Dekat Akses Masuk Samping & Jalan Booth)",
    capacity: "Sistem Barcode Scan Cepat (Kapasitas Alur 500 Orang)",
    badge: "MEJA REGISTRASI",
    color: "#F5B700",
    accentBg: "bg-[#F5B700]",
    description:
      "Meja registrasi dan check-in resmi yang diposisikan di samping pintu masuk samping GK (Pintu 2), tepat bersebelahan dengan pangkal jalur booth jalan abu-abu. Pengunjung melakukan scan barcode e-ticket dan mengambil gelang tanda masuk sebelum memasuki area acara.",
    highlights: [
      "Lokasi: Tepat di samping pintu masuk samping GK (dekat deretan booth)",
      "6 Jalur Meja Scanner Barcode Elektronik Anti-Antre",
      "Penukaran Gelang ID Resmi ESCAPE 2027",
      "Akses langsung masuk ke Pintu 2 GK atau menuju jalan stan abu-abu",
    ],
    booths: [
      "Meja Scan Barcode Tiket 1-6",
      "Pos Penukaran Gelang ID",
      "Helpdesk & Layanan Tamu",
      "Meja Penitipan Barang Tertib",
    ],
  },
  FASILITAS: {
    id: "FASILITAS",
    name: "AREA PENDUKUNG & MUSHOLLA BAITUL 'ILMI",
    subname: "Sayap Barat & Selatan Kompleks Sekolah",
    location: "Musholla Baitul 'Ilmi, Pos Medis PMR, dan Kantin",
    capacity: "Layanan Umum Seluruh Pengunjung",
    badge: "FASILITAS UMUM",
    color: "#D97706",
    accentBg: "bg-[#D97706]",
    description:
      "Fasilitas penunjang kenyamanan pengunjung di sekitar area acara, mencakup Musholla Baitul 'Ilmi di sisi kiri bawah, pos medis siaga PMR 16, toilet higienis, serta kantin kuliner.",
    highlights: [
      "Musholla Baitul 'Ilmi di sisi barat daya (sarung & mukena siap pakai)",
      "Pos Medis PMR 16 dengan dokter pembina dan tabung oksigen",
      "Toilet terpisah pria/wanita di selasar belakang gedung",
      "Kantin makanan dan minuman higienis metode QRIS",
    ],
    booths: [
      "Musholla Baitul 'Ilmi",
      "Pos Medis PMR 16",
      "Kantin Sekolah",
      "Pusat Informasi & Keamanan",
    ],
  },
};

const FACILITIES = [
  {
    name: "Musholla Baitul 'Ilmi",
    desc: "Kapasitas 120 jamaah, mukena & sarung bersih, tempat wudhu ikhwan/akhwat terpisah.",
    loc: "Sayap Kiri Bawah (Barat Daya)",
    tag: "IBADAH",
    badgeBg: "bg-[#0B5E2E] text-[#FAF8F2]",
    icon: Building2,
  },
  {
    name: "Pos Medis PMR 16",
    desc: "Dokter pembina siaga, tim tandu darurat, suplai tabung oksigen & obat P3K lengkap.",
    loc: "Samping Ruang UKS / Depan Musholla",
    tag: "MEDIS",
    badgeBg: "bg-[#BA1A1A] text-[#FAF8F2]",
    icon: HeartPulse,
  },
  {
    name: "Kantin Terbuka",
    desc: "18 tenant makanan & minuman higienis, area teduh rindang, pembayaran cashless/QRIS.",
    loc: "Koridor Selatan SMAN 16",
    tag: "KULINER",
    badgeBg: "bg-[#F5B700] text-[#141414]",
    icon: Utensils,
  },
  {
    name: "Toilet & Sanitasi",
    desc: "8 bilik pria dan 12 bilik wanita dibersihkan berkala, air mengalir deras & wastafel sabun.",
    loc: "Belakang Gedung Kelas & Dekat GK",
    tag: "SANITASI",
    badgeBg: "bg-[#FAF8F2] text-[#141414]",
    icon: Footprints,
  },
];

export default function PetaKampusPage() {
  const [selectedZone, setSelectedZone] = useState<"GK" | "BOOTH_JALAN" | "CHECKIN" | "FASILITAS">("GK");

  const currentZone = ZONES[selectedZone];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-16 selection:bg-[#F5B700] selection:text-[#141414]">
      {/* ================= TOP COMIC ISSUE RIBBON ================= */}
      <section className="bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_3px_0px_#141414] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-display text-sm tracking-wide text-[#141414]">
          <div className="flex items-center gap-3">
            <span className="bg-[#141414] text-[#FAF8F2] px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
              DENAH RESMI ACARA
            </span>
            <span className="hidden sm:inline">
              ESCAPE 2027 • GEDUNG KESENIAN (GK KOSONG ~500 ORANG) • STAND TALKSHOW DEPAN GK • MEJA CHECK-IN SAMPING PINTU
            </span>
            <span className="sm:hidden">GK KOSONG ~500 ORANG • JALAN STAN KE KIRI</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5E2E] animate-pulse"></span>
            <span>KAMIS, 21 JANUARI 2027</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative">
          <div className="absolute -top-3 left-6 bg-[#F5B700] text-[#141414] px-3 py-0.5 border-2 border-[#141414] font-display text-xs uppercase shadow-[2px_2px_0px_#141414] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>DENAH TATA RUANG ACARA ESCAPE 2027</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#0B5E2E] text-[#FAF8F2] px-2.5 py-0.5 font-display text-xs uppercase border border-[#141414] mb-2">
                GEDUNG UTAMA GK (VERTIKAL KANAN) • STAND TALKSHOW DEPAN GK • MEJA CHECK-IN SAMPING PINTU DEKAT BOOTH
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                DENAH LOKASI ACARA EXPO ESCAPE 2027
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-medium leading-relaxed">
                Panduan tata letak acara: <strong>Gedung Kesenian (GK)</strong> di sisi vertikal paling kanan sebagai aula utama ber-AC yang bersih dan kosong (kapasitas sekitar 500 orang mentok), <strong>stand talkshow</strong> persis di depan GK, <strong>meja check-in</strong> di samping pintu masuk samping dekat booth, dan <strong>jalan stan abu-abu</strong> yang memanjang ke kiri.
              </p>
            </div>

            {/* Quick Action Tools */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="comic-btn bg-[#FAF8F2] text-[#141414] border-[3px] border-[#141414] px-4 py-2.5 font-display text-xs sm:text-sm uppercase shadow-[3px_3px_0px_#141414] hover:bg-[#F5B700] flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>

              <div className="bg-[#FAF8F2] text-[#0B5E2E] border-[3px] border-[#141414] px-4 py-2.5 font-display text-xs sm:text-sm uppercase shadow-[3px_3px_0px_#141414] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B5E2E] animate-ping"></span>
                <span>Area Aktif: <strong>{currentZone.name.split("—")[0]}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WORKSPACE: PURE COMIC ARCHITECTURAL MAP + SIDEBAR ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLS: MAIN MAP CANVAS */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg p-4 sm:p-6 relative overflow-hidden">
              {/* Tactical Map Header Bar */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b-4 border-[#141414] gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0B5E2E] text-[#FAF8F2] font-display text-xs uppercase px-2.5 py-1 border-2 border-[#141414]">
                    DENAH TAKTIS LOKASI ACARA
                  </span>
                  <span className="font-display text-xs sm:text-sm text-[#141414] uppercase">
                    KLIK AREA UNTUK INSPEKSI RINCIAN
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="flex items-center gap-1 font-body text-[11px] font-bold uppercase bg-[#EAE5D9] px-2 py-0.5 border border-[#141414]">
                    <span className="w-2.5 h-2.5 bg-[#0B5E2E] border border-[#141414] inline-block"></span> GK Kosong (~500 Orang)
                  </span>
                  <span className="flex items-center gap-1 font-body text-[11px] font-bold uppercase bg-[#EAE5D9] px-2 py-0.5 border border-[#141414]">
                    <span className="w-2.5 h-2.5 bg-[#F5B700] border border-[#141414] inline-block"></span> Stand Talkshow Depan GK
                  </span>
                  <span className="flex items-center gap-1 font-body text-[11px] font-bold uppercase bg-[#EAE5D9] px-2 py-0.5 border border-[#141414]">
                    <span className="w-2.5 h-2.5 bg-[#A8A29E] border border-[#141414] inline-block"></span> Jalan Booth Abu-Abu
                  </span>
                  <span className="flex items-center gap-1 font-body text-[11px] font-bold uppercase bg-[#EAE5D9] px-2 py-0.5 border border-[#141414]">
                    <span className="w-2.5 h-2.5 bg-[#FEF08A] border border-[#141414] inline-block"></span> Check-in Samping Pintu
                  </span>
                </div>
              </div>

              {/* THE PURE COMIC ARCHITECTURAL CAMPUS MAP SVG */}
              <div className="relative w-full aspect-[4/3] bg-[#FAF8F2] border-[3px] border-[#141414] overflow-hidden select-none shadow-inner">
                {/* Compass Rose */}
                <div className="absolute top-3 left-3 z-20 bg-[#FAF8F2] border-2 border-[#141414] p-1.5 sm:p-2 shadow-[2px_2px_0px_#141414] text-center">
                  <div className="font-display text-[10px] sm:text-xs text-[#0B5E2E] font-bold">U (UTARA)</div>
                  <div className="w-5 h-5 mx-auto flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-[#0B5E2E]" />
                  </div>
                  <div className="font-body text-[8px] uppercase tracking-tighter text-[#404940] font-bold">ORIENTASI ACARA</div>
                </div>

                {/* Sound Effect Badges */}
                <div className="absolute top-4 right-4 z-20 bg-[#F5B700] border-2 border-[#141414] px-2.5 py-1 shadow-[2px_2px_0px_#141414] font-display text-[11px] text-[#141414] pointer-events-none transform rotate-1">
                  ★ ARENA UTAMA: GK VERTIKAL ★
                </div>

                {/* SVG Architectural Blueprint */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 900 650"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="comic-grid-pure" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141414" strokeWidth="0.5" strokeOpacity="0.08" />
                    </pattern>
                    <marker id="arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0B5E2E" />
                    </marker>
                    <marker id="arr-gold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#F5B700" />
                    </marker>
                    <marker id="arr-ink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#141414" />
                    </marker>
                  </defs>

                  <rect width="900" height="650" fill="url(#comic-grid-pure)" />

                  {/* Nature / Courtyard Backdrop (Bersih Tanpa Ornamen Yang Kurang Jelas) */}
                  <rect x="20" y="20" width="860" height="610" fill="#FAF8F2" />

                  {/* ================= NORTH HORIZONTAL BUILDING (GEDUNG KELAS UTARA) ================= */}
                  <g id="gedung-utara">
                    <rect x="75" y="80" width="470" height="130" fill="#141414" rx="2" />
                    <rect x="70" y="75" width="470" height="130" fill="#EAE5D9" stroke="#141414" strokeWidth="3.5" rx="2" />
                    <polygon points="70,75 540,75 490,140 120,140" fill="#DCDAD4" stroke="#141414" strokeWidth="1.5" />
                    <text x="140" y="115" fill="#141414" fontFamily="Anton, sans-serif" fontSize="15" letterSpacing="1">
                      GEDUNG KELAS UTARA (RUANG TRANSIT &amp; OSIS)
                    </text>
                    <text x="140" y="132" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700">
                      Zona Akademik &amp; Ruang Panitia SMAN 16 Surabaya
                    </text>
                  </g>

                  {/* ================= SOUTHWEST BUILDING (MUSHOLLA BAITUL 'ILMI) ================= */}
                  <g id="gedung-selatan-kiri" onClick={() => setSelectedZone("FASILITAS")} className="cursor-pointer">
                    <rect x="75" y="445" width="210" height="130" fill="#141414" rx="2" />
                    <rect x="70" y="440" width="210" height="130" fill="#EAE5D9" stroke="#141414" strokeWidth="3" rx="2" />
                    <polygon points="70,440 280,440 250,505 100,505" fill="#DCDAD4" stroke="#141414" strokeWidth="1" />
                    <rect x="80" y="450" width="90" height="22" fill="#0B5E2E" stroke="#141414" strokeWidth="1" />
                    <text x="88" y="465" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="11">
                      BAITUL &apos;ILMI
                    </text>
                    <text x="80" y="495" fill="#141414" fontFamily="Anton, sans-serif" fontSize="14">
                      MUSHOLLA UTAMA
                    </text>
                    <text x="80" y="525" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9.5" fontWeight="700">
                      Kapasitas 120 Jamaah • Area Wudhu Luas
                    </text>
                  </g>

                  {/* ================= SOUTH MIDDLE BUILDING ================= */}
                  <g id="gedung-selatan-tengah">
                    <rect x="315" y="455" width="165" height="115" fill="#141414" rx="2" />
                    <rect x="310" y="450" width="165" height="115" fill="#EAE5D9" stroke="#141414" strokeWidth="3" rx="2" />
                    <text x="325" y="500" fill="#141414" fontFamily="Anton, sans-serif" fontSize="13">
                      RUANG KELAS &amp; OSIS
                    </text>
                    <text x="325" y="520" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="600">
                      Pos Logistik &amp; Media Center
                    </text>
                  </g>

                  {/* ================= JALAN ABU-ABU MEMANJANG KE KIRI DARI DEPAN GK ================= */}
                  <g
                    id="jalan-abu-abu-booth"
                    onClick={() => setSelectedZone("BOOTH_JALAN")}
                    className="cursor-pointer group"
                  >
                    {/* Grey Road Surface */}
                    <rect
                      x="55"
                      y="225"
                      width="540"
                      height="125"
                      rx="4"
                      fill={selectedZone === "BOOTH_JALAN" ? "#D6D3D1" : "#A8A29E"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "BOOTH_JALAN" ? "4.5" : "3.5"}
                      className="transition-all duration-150"
                    />
                    <line x1="60" y1="287" x2="585" y2="287" stroke="#141414" strokeWidth="2" strokeDasharray="14 10" strokeOpacity="0.4" />

                    <rect x="70" y="235" width="370" height="24" rx="2" fill="#141414" />
                    <text x="80" y="251" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="12" letterSpacing="1">
                      JALAN STAN BOOTH • MEMANJANG KE KIRI DARI DEPAN GK
                    </text>

                    {/* North Row Booths */}
                    <g fill="#FAF8F2" stroke="#141414" strokeWidth="2">
                      <rect x="70" y="265" width="75" height="36" rx="2" />
                      <rect x="155" y="265" width="75" height="36" rx="2" />
                      <rect x="240" y="265" width="75" height="36" rx="2" />
                      <rect x="325" y="265" width="75" height="36" rx="2" />
                      <rect x="410" y="265" width="75" height="36" rx="2" />
                      <rect x="495" y="265" width="75" height="36" rx="2" />
                    </g>
                    <text x="76" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">PKN STAN</text>
                    <text x="160" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">POLSTAT STIS</text>
                    <text x="247" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">POLTEKIP</text>
                    <text x="338" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">UBAYA</text>
                    <text x="418" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">UK PETRA</text>
                    <text x="502" y="287" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="10">ROBOTIKA</text>

                    {/* South Row Booths */}
                    <g fill="#FAF8F2" stroke="#141414" strokeWidth="2">
                      <rect x="70" y="306" width="95" height="36" rx="2" />
                      <rect x="175" y="306" width="95" height="36" rx="2" />
                      <rect x="280" y="306" width="95" height="36" rx="2" />
                      <rect x="385" y="306" width="95" height="36" rx="2" />
                      <rect x="490" y="306" width="85" height="36" rx="2" />
                    </g>
                    <text x="78" y="328" fill="#D97706" fontFamily="Anton, sans-serif" fontSize="10">BRAIN ACADEMY</text>
                    <text x="183" y="328" fill="#D97706" fontFamily="Anton, sans-serif" fontSize="10">GANESHA OP.</text>
                    <text x="290" y="328" fill="#D97706" fontFamily="Anton, sans-serif" fontSize="10">RUANGGURU</text>
                    <text x="395" y="328" fill="#D97706" fontFamily="Anton, sans-serif" fontSize="10">BEASISWA S1</text>
                    <text x="496" y="328" fill="#D97706" fontFamily="Anton, sans-serif" fontSize="10">EDUTECH</text>

                    <path d="M 570 300 L 70 300" stroke="#141414" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr-ink)" opacity="0.6" />
                    <rect x="200" y="212" width="180" height="20" rx="2" fill="#F5B700" stroke="#141414" strokeWidth="1.5" />
                    <text x="210" y="226" fill="#141414" fontFamily="Anton, sans-serif" fontSize="10.5">
                      ← ALUR JELAJAH STAN KE KIRI
                    </text>
                  </g>

                  {/* ================= STAND PANGGUNG TALKSHOW (PERSIS DI DEPAN GK) ================= */}
                  <g id="stand-talkshow-depan-gk" className="cursor-pointer group">
                    <rect x="445" y="80" width="155" height="130" rx="3" fill="#141414" />
                    <rect x="440" y="75" width="155" height="130" rx="3" fill="#FAF8F2" stroke="#141414" strokeWidth="3" />
                    <rect x="440" y="75" width="155" height="28" fill="#F5B700" stroke="#141414" strokeWidth="2" />
                    <text x="448" y="94" fill="#141414" fontFamily="Anton, sans-serif" fontSize="12" letterSpacing="0.5">
                      🎤 STAND PANGGUNG TALKSHOW
                    </text>
                    <rect x="450" y="110" width="135" height="46" fill="#0B5E2E" stroke="#141414" strokeWidth="1.5" rx="2" />
                    <text x="458" y="130" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="12">
                      GELAR WICARA UTAMA
                    </text>
                    <text x="458" y="146" fill="#F5B700" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
                      Keynote Alumni &amp; Beasiswa Kampus
                    </text>
                    <rect x="450" y="162" width="135" height="34" fill="#EAE5D9" stroke="#141414" strokeWidth="1" />
                    <text x="455" y="176" fill="#141414" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.5" fontWeight="800">
                      📍 POSISI: PERSIS DI DEPAN GK
                    </text>
                    <text x="455" y="189" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="600">
                      Sound System &amp; Mimbar Presentasi
                    </text>
                  </g>

                  {/* ================= GEDUNG KESENIAN (GK) — GEDUNG PALING KANAN VERTIKAL (BENAR-BENAR KOSONG) ================= */}
                  <g
                    id="gedung-kesenian-gk"
                    onClick={() => setSelectedZone("GK")}
                    className="cursor-pointer group"
                  >
                    <rect x="625" y="85" width="245" height="490" rx="4" fill="#141414" />
                    <rect
                      x="615"
                      y="75"
                      width="245"
                      height="490"
                      rx="4"
                      fill={selectedZone === "GK" ? "#0F7A3D" : "#0B5E2E"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "GK" ? "5" : "4"}
                      className="transition-all duration-150"
                    />

                    {/* Interior Hall Carpet Texture (AULA BERSIH TANPA STAN) */}
                    <rect x="625" y="85" width="225" height="470" fill="#EBF7EE" stroke="#141414" strokeWidth="1.5" strokeDasharray="6 4" />

                    {/* Open Area North Wing */}
                    <rect x="640" y="100" width="195" height="120" fill="#FFFFFF" stroke="#0B5E2E" strokeWidth="1.5" strokeDasharray="4 4" rx="2" opacity="0.95" />
                    <text x="652" y="150" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="13" letterSpacing="1">
                      AULA KOSONG UTARA
                    </text>
                    <text x="652" y="170" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="600">
                      Area Lesehan Berpendingin Udara (Full AC)
                    </text>

                    {/* Central Hall Banner — Ruang Kosong Kapasitas ~500 Orang */}
                    <rect x="635" y="235" width="205" height="160" fill="#FAF8F2" stroke="#141414" strokeWidth="3" rx="2" />
                    <rect x="640" y="240" width="195" height="26" fill="#0B5E2E" stroke="#141414" strokeWidth="1" />
                    <text x="648" y="258" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="13" letterSpacing="1">
                      GEDUNG KESENIAN (GK)
                    </text>
                    <text x="645" y="288" fill="#141414" fontFamily="Anton, sans-serif" fontSize="15">
                      AULA UTAMA (KOSONG)
                    </text>
                    <rect x="645" y="298" width="185" height="24" fill="#F5B700" stroke="#141414" strokeWidth="1" rx="2" />
                    <text x="650" y="314" fill="#141414" fontFamily="Anton, sans-serif" fontSize="10.5">
                      KAPASITAS: SEKITAR 500 ORANG MENTOK
                    </text>
                    <text x="645" y="340" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
                      Ruang Terbuka Bebas Tanpa Sekat Stan
                    </text>
                    <text x="645" y="356" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.5" fontWeight="600">
                      Area Istirahat, Sirkulasi, &amp; Lesehan Santai
                    </text>
                    <text x="645" y="372" fill="#0B5E2E" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="800">
                      ★ FULL AIR CONDITIONER (SEJUK) ★
                    </text>

                    {/* Open Area South Wing */}
                    <rect x="640" y="410" width="195" height="125" fill="#FFFFFF" stroke="#0B5E2E" strokeWidth="1.5" strokeDasharray="4 4" rx="2" opacity="0.95" />
                    <text x="652" y="460" fill="#0B5E2E" fontFamily="Anton, sans-serif" fontSize="13" letterSpacing="1">
                      AULA KOSONG SELATAN
                    </text>
                    <text x="652" y="480" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="600">
                      Sirkulasi Pengunjung &amp; Koridor Bebas
                    </text>

                    {/* ================= PINTU 1: UJUNG VERTIKAL ATAS ================= */}
                    <g id="pintu-1-ujung-atas">
                      <rect x="675" y="62" width="125" height="26" fill="#F5B700" stroke="#141414" strokeWidth="3" rx="2" />
                      <text x="683" y="79" fill="#141414" fontFamily="Anton, sans-serif" fontSize="11">
                        🚪 PINTU 1 (UJUNG ATAS)
                      </text>
                    </g>

                    {/* ================= PINTU 2: SAMPING TENGAH SEBELAH JALAN ================= */}
                    <g id="pintu-2-samping-tengah">
                      <rect x="600" y="275" width="28" height="100" fill="#F5B700" stroke="#141414" strokeWidth="3" rx="2" />
                      <text x="618" y="360" fill="#141414" fontFamily="Anton, sans-serif" fontSize="10" transform="rotate(-90 618 360)">
                        🚪 PINTU 2 (SAMPING TENGAH)
                      </text>
                      <path d="M 580 325 L 610 325" stroke="#0B5E2E" strokeWidth="4" markerEnd="url(#arr-green)" />
                    </g>
                  </g>

                  {/* ================= MEJA CHECK-IN: DI SAMPING PINTU DEKAT BOOTH MASUK SAMPING ================= */}
                  <g
                    id="meja-checkin-samping-pintu"
                    onClick={() => setSelectedZone("CHECKIN")}
                    className="cursor-pointer group"
                  >
                    <rect x="460" y="375" width="145" height="100" rx="3" fill="#141414" />
                    <rect
                      x="455"
                      y="370"
                      width="145"
                      height="100"
                      rx="3"
                      fill={selectedZone === "CHECKIN" ? "#F5B700" : "#FEF08A"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "CHECKIN" ? "4.5" : "3.5"}
                      className="transition-all duration-150"
                    />
                    <rect x="455" y="370" width="145" height="24" fill="#141414" />
                    <text x="462" y="386" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="10.5">
                      📍 MEJA CHECK-IN REGISTRASI
                    </text>

                    <rect x="462" y="399" width="131" height="20" fill="#0B5E2E" stroke="#141414" strokeWidth="1" rx="2" />
                    <text x="467" y="413" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="9.5">
                      SAMPING PINTU 2 GK
                    </text>

                    <text x="462" y="434" fill="#141414" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.5" fontWeight="800">
                      Dekat Jalur Masuk Stan Booth
                    </text>
                    <text x="462" y="448" fill="#474646" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
                      Scan E-Ticket &amp; Ambil Gelang ID
                    </text>
                    <text x="462" y="461" fill="#0B5E2E" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="7.5" fontWeight="800">
                      Kapasitas Alur ~500 Orang Cepat
                    </text>

                    {/* Direct connection arrow to Pintu 2 and Booth road */}
                    <path d="M 600 415 L 610 375" stroke="#0B5E2E" strokeWidth="3" markerEnd="url(#arr-green)" />
                  </g>

                  {/* ================= HALAMAN / SELASAR SELATAN GK ================= */}
                  <g id="selasar-selatan-gk">
                    <rect x="615" y="580" width="245" height="48" rx="3" fill="#EAE5D9" stroke="#141414" strokeWidth="2.5" />
                    <text x="630" y="602" fill="#141414" fontFamily="Anton, sans-serif" fontSize="11" letterSpacing="1">
                      HALAMAN / DROP-OFF SELATAN GK
                    </text>
                    <text x="630" y="617" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.5" fontWeight="600">
                      Akses Jalur Evakuasi &amp; Penjemputan Pengunjung
                    </text>
                  </g>
                </svg>
              </div>

              {/* Interactive Quick Zone Strip */}
              <div className="mt-4 pt-4 border-t-2 border-[#141414] grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                {(["GK", "BOOTH_JALAN", "CHECKIN", "FASILITAS"] as const).map((zid) => {
                  const z = ZONES[zid];
                  const isSelected = selectedZone === zid;
                  return (
                    <button
                      key={zid}
                      onClick={() => setSelectedZone(zid)}
                      className={`comic-btn p-2 border-2 border-[#141414] transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0B5E2E] text-[#FAF8F2] shadow-[3px_3px_0px_#141414] -translate-y-0.5"
                          : "bg-[#FAF8F2] text-[#141414] hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414]"
                      }`}
                    >
                      <span className="block font-display text-xs sm:text-sm uppercase tracking-wide truncate">
                        {z.name.split("—")[0].trim()}
                      </span>
                      <span className="font-body text-[10px] sm:text-[11px] block opacity-90 truncate">
                        {z.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROTOKOL TERTIB PENGUNJUNG (Comic Speech Bubble Callout) */}
            <div className="bg-[#FAF8F2] border-comic-4 shadow-comic p-6 relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F5B700] border-[3px] border-[#141414] shadow-[2px_2px_0px_#141414] flex-shrink-0 flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-[#141414]" />
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-[#0B5E2E] text-[#FAF8F2] px-2 py-0.5 border border-[#141414] font-display text-xs uppercase mb-1">
                    KOMANDO SIRKULASI ACARA
                  </div>
                  <h2 className="font-display text-xl uppercase text-[#141414]">
                    Alur Tertib Jelajah ESCAPE 2027 SMAN 16
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 font-body text-xs text-[#404940]">
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-2.5 border border-[#141414]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>1. Meja Check-in (Samping Pintu 2 Masuk Samping):</strong> Verifikasi e-ticket barcode persis di samping Pintu 2 GK dekat pangkal jalan booth untuk mengambil gelang ID.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-2.5 border border-[#141414]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>2. Stand Panggung Talkshow (Depan GK):</strong> Saksikan sesi talkshow inspiratif dan presentasi kampus unggulan di panggung stand persis di depan GK.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-2.5 border border-[#141414]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>3. Aula Gedung Kesenian (GK Kosong ~500 Orang):</strong> Masuk via Pintu 1 atau Pintu 2. Area dalam bersih dan lapang tanpa stan pameran, nyaman ber-AC untuk istirahat lesehan santai (kapasitas sekitar 500 orang mentok).</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-2.5 border border-[#141414]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>4. Jalan Stan Abu-Abu (Memanjang ke Kiri):</strong> Jelajahi seluruh deretan stan booth kedinasan, swasta, bimbel &amp; karya siswa yang memanjang ke arah barat.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT 4 COLS: ZONE DETAIL INSPECTOR & CAPACITIES */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* INSPECTED ZONE CARD */}
            <div className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg overflow-hidden">
              <div className="bg-[#0B5E2E] text-[#FAF8F2] p-4 border-b-4 border-[#141414] flex justify-between items-center">
                <div>
                  <span className="font-display text-[10px] bg-[#F5B700] text-[#141414] px-1.5 py-0.5 border border-[#141414] uppercase tracking-wider inline-block mb-1">
                    INSPEKSI BERKAS TATA RUANG
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#FAF8F2]">
                    {currentZone.name.split("—")[0]}
                  </h3>
                </div>
                <span className="bg-[#F5B700] text-[#141414] px-2 py-0.5 font-display text-xs uppercase border border-[#141414] font-bold">
                  {currentZone.badge}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="bg-[#EAE5D9] p-3 border-2 border-[#141414]">
                  <div className="flex items-center justify-between text-xs font-display text-[#141414] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#0B5E2E]" />
                      <span>KAPASITAS:</span>
                    </span>
                    <span className="text-[#0B5E2E] font-bold">{currentZone.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-body text-[#404940]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#BA1A1A]" />
                      <span>Lokasi:</span>
                    </span>
                    <span className="font-semibold text-right text-[11px]">{currentZone.location}</span>
                  </div>
                </div>

                <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed">
                  {currentZone.description}
                </p>

                {/* Highlights */}
                <div>
                  <div className="font-display text-xs text-[#141414] uppercase mb-2">
                    SOROTAN UTAMA AREA INI:
                  </div>
                  <ul className="space-y-1.5 font-body text-xs text-[#404940]">
                    {currentZone.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0B5E2E] font-bold mt-0.5">✔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booths in this zone */}
                <div className="pt-3 border-t border-[#141414]/20">
                  <div className="font-display text-xs text-[#141414] uppercase mb-2 flex justify-between items-center">
                    <span>DAFTAR BOOTH / RUANG DI AREA INI:</span>
                    <Link
                      href="/direktori-stan"
                      className="text-[11px] text-[#0B5E2E] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Eksplor Booth</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentZone.booths.map((b, i) => (
                      <span
                        key={i}
                        className="bg-[#EAE5D9] text-[#141414] px-2 py-0.5 text-[11px] font-bold border border-[#141414]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/direktori-stan"
                  className="comic-btn w-full text-center bg-[#F5B700] text-[#141414] font-display text-xs uppercase py-2.5 border-[3px] border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#FFE066] mt-2 block"
                >
                  Buka Halaman Eksplor Booth &rarr;
                </Link>
              </div>
            </div>

            {/* EMERGENCY HOTLINE CARD */}
            <div className="bg-[#FAF8F2] border-comic-4 shadow-comic p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#BA1A1A] text-[#FAF8F2] border-2 border-[#141414] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#141414]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-display text-xs uppercase text-[#BA1A1A] leading-tight">
                  HOTLINE PENGADUAN &amp; MEDIS
                </div>
                <div className="font-display text-base text-[#141414]">0812-3416-2027</div>
                <div className="font-body text-[11px] text-[#404940]">Sie Keamanan OSIS &amp; PMR 16 Surabaya</div>
              </div>
              <a
                href="tel:081234162027"
                className="comic-btn p-2 bg-[#F5B700] text-[#141414] border border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-[#FFE066]"
                title="Panggil Hotline"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>

        {/* ================= CAMPUS SUPPORT FACILITIES GRID ================= */}
        <section className="mt-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#0B5E2E] text-[#FAF8F2] px-3.5 py-1 font-display text-base uppercase border-[3px] border-[#141414] shadow-[3px_3px_0px_#141414]">
              FASILITAS PENDUKUNG DI SEKITAR AREA EXPO
            </span>
            <div className="flex-1 h-1 bg-[#141414]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-[#FAF8F2] border-comic-4 shadow-comic p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-[#EAE5D9] text-[#141414] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0B5E2E]" />
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-display uppercase border border-[#141414] ${f.badgeBg}`}>
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg uppercase text-[#141414]">{f.name}</h3>
                    <p className="font-body text-xs text-[#404940] mt-1 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t-2 border-[#141414] font-display text-[11px] uppercase text-[#0B5E2E] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#BA1A1A]" />
                    <span>{f.loc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
