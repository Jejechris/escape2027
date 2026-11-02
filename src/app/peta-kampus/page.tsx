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
    name: "GEDUNG KESENIAN (GK) — AULA & STAND TALKSHOW",
    subname: "Gedung Vertikal Paling Kanan • Stand Talkshow di Paling Bawah Ujung GK",
    location: "Gedung Kesenian SMAN 16 (Gedung Paling Kanan Vertikal)",
    capacity: "Sekitar 500 Orang Mentok (Aula Lapang Lesehan Full AC)",
    badge: "AULA & PANGGUNG TALKSHOW",
    color: "#0B5E2E",
    accentBg: "bg-[#0B5E2E]",
    description:
      "Gedung megah berorientasi vertikal di sisi kanan kompleks SMAN 16 Surabaya. Stand panggung talkshow berada di paling bawah ujung dari gedung GK untuk gelar wicara narasumber kampus dan alumni. Area tengah hingga utara GK difungsikan sebagai aula lapang berkarpet lesehan sejuk (Full AC) menampung sekitar 500 orang mentok tanpa sekat stan pameran.",
    highlights: [
      "Stand Panggung Talkshow: Berada di paling bawah ujung dari gedung GK",
      "Kapasitas Penonton: Sekitar 500 orang mentok (Aula lapang & lesehan Full AC)",
      "Area Dalam Bersih & Lapang: Bebas stan pameran demi kenyamanan penonton",
      "Dua Akses Utama: Pintu 1 (Ujung Vertikal Atas) & Pintu 2 (Samping Tengah Dekat Jalan Booth)",
    ],
    booths: [
      "Stand Panggung Talkshow (Ujung Bawah GK)",
      "Aula Terbuka Full AC (Lesehan ~500 Orang)",
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
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body font-bold text-xs sm:text-sm tracking-wide text-[#141414]">
          <div className="flex items-center gap-3">
            <span className="bg-[#141414] text-[#FAF8F2] px-2.5 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              DENAH RESMI ACARA
            </span>
            <span className="hidden sm:inline font-bold">
              ESCAPE 2027 • GEDUNG KESENIAN (GK KOSONG ~500 ORANG) • STAND TALKSHOW DI UJUNG BAWAH GK • MEJA CHECK-IN SAMPING PINTU 2
            </span>
            <span className="sm:hidden font-bold">GK KOSONG ~500 ORANG • TALKSHOW UJUNG BAWAH GK</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5E2E] animate-pulse"></span>
            <span>KAMIS, 21 JANUARI 2027</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative mt-3">
          <div className="absolute -top-3.5 left-6 bg-[#F5B700] text-[#141414] px-3.5 py-1 border-2 border-[#141414] font-display text-xs uppercase font-semibold shadow-[2px_2px_0px_#141414] flex items-center gap-1.5 tracking-wider z-20">
            <Compass className="w-3.5 h-3.5" />
            <span>DENAH TATA RUANG ACARA ESCAPE 2027</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#0B5E2E] text-[#FAF8F2] px-3 py-1 font-body text-xs sm:text-sm uppercase border-2 border-[#141414] mb-2 font-bold shadow-comic-sm tracking-wide">
                GEDUNG UTAMA GK (VERTIKAL KANAN) • STAND TALKSHOW DI PALING BAWAH UJUNG GK • MEJA CHECK-IN SAMPING PINTU 2
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                DENAH LOKASI ACARA EXPO ESCAPE 2027
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-semibold leading-relaxed">
                Panduan tata letak acara: <strong>Gedung Kesenian (GK)</strong> di sisi vertikal paling kanan sebagai aula utama ber-AC yang lapang dan kosong (kapasitas sekitar 500 orang mentok), <strong>stand panggung talkshow</strong> berada di paling bawah ujung dari gedung GK, <strong>meja check-in</strong> di samping pintu masuk samping (Pintu 2 GK) dekat booth, dan <strong>jalan stan abu-abu</strong> yang memanjang ke kiri.
              </p>
            </div>

            {/* Quick Action Tools */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="comic-btn bg-[#FAF8F2] text-[#141414] border-[3px] border-[#141414] px-4 py-2.5 font-body text-xs sm:text-sm uppercase font-bold shadow-[3px_3px_0px_#141414] hover:bg-[#F5B700] flex items-center gap-2 cursor-pointer tracking-wider"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>

              <div className="bg-[#FAF8F2] text-[#0B5E2E] border-[3px] border-[#141414] px-4 py-2.5 font-body text-xs sm:text-sm uppercase font-bold shadow-[3px_3px_0px_#141414] flex items-center gap-2 tracking-wide">
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
                  <span className="bg-[#0B5E2E] text-[#FAF8F2] font-body text-xs uppercase px-3 py-1 border-2 border-[#141414] font-bold tracking-wider">
                    DENAH TAKTIS LOKASI ACARA
                  </span>
                  <span className="font-body text-xs sm:text-sm text-[#141414] uppercase font-bold tracking-wide">
                    KLIK AREA UNTUK INSPEKSI RINCIAN
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold uppercase bg-[#EAE5D9] px-3 py-1 border-2 border-[#141414] shadow-comic-sm">
                    <span className="w-3.5 h-3.5 bg-[#0B5E2E] border border-[#141414] inline-block"></span> GK Kosong (~500 Orang)
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold uppercase bg-[#EAE5D9] px-3 py-1 border-2 border-[#141414] shadow-comic-sm">
                    <span className="w-3.5 h-3.5 bg-[#F5B700] border border-[#141414] inline-block"></span> Stand Talkshow Ujung Bawah GK
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold uppercase bg-[#EAE5D9] px-3 py-1 border-2 border-[#141414] shadow-comic-sm">
                    <span className="w-3.5 h-3.5 bg-[#A8A29E] border border-[#141414] inline-block"></span> Jalan Booth Abu-Abu
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold uppercase bg-[#EAE5D9] px-3 py-1 border-2 border-[#141414] shadow-comic-sm">
                    <span className="w-3.5 h-3.5 bg-[#FEF08A] border border-[#141414] inline-block"></span> Check-in Samping Pintu 2
                  </span>
                </div>
              </div>

              {/* THE PURE COMIC ARCHITECTURAL CAMPUS MAP SVG */}
              <div className="relative w-full aspect-[4/3] bg-[#FAF8F2] border-[3px] border-[#141414] overflow-hidden select-none shadow-inner">
                {/* Compass Rose */}
                <div className="absolute top-3 left-3 z-20 bg-[#FAF8F2] border-2 border-[#141414] p-2 shadow-[2px_2px_0px_#141414] text-center">
                  <div className="font-body text-xs sm:text-sm text-[#0B5E2E] font-extrabold tracking-wide">U (UTARA)</div>
                  <div className="w-6 h-6 mx-auto flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-[#0B5E2E]" />
                  </div>
                  <div className="font-body text-[9px] uppercase tracking-wider text-[#404940] font-bold">ORIENTASI ACARA</div>
                </div>

                {/* Sound Effect Badges */}
                <div className="absolute top-4 right-4 z-20 bg-[#F5B700] border-2 border-[#141414] px-3 py-1.5 shadow-[2px_2px_0px_#141414] font-body text-xs sm:text-sm text-[#141414] pointer-events-none transform rotate-1 font-extrabold uppercase tracking-wide">
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

                  {/* Nature / Courtyard Backdrop */}
                  <rect x="20" y="20" width="860" height="610" fill="#FAF8F2" />

                  {/* ================= NORTH HORIZONTAL BUILDING (GEDUNG KELAS UTARA) ================= */}
                  <g id="gedung-utara">
                    <rect x="55" y="75" width="510" height="125" fill="#141414" rx="2" />
                    <rect x="50" y="70" width="510" height="125" fill="#EAE5D9" stroke="#141414" strokeWidth="3.5" rx="2" />
                    <polygon points="50,70 560,70 515,135 95,135" fill="#DCDAD4" stroke="#141414" strokeWidth="1.5" />
                    <text x="110" y="108" fill="#141414" fontFamily="Anton, sans-serif" fontSize="16" letterSpacing="1">
                      GEDUNG KELAS UTARA (RUANG TRANSIT &amp; OSIS)
                    </text>
                    <text x="110" y="128" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="700">
                      Zona Akademik &amp; Ruang Panitia SMAN 16 Surabaya
                    </text>
                  </g>

                  {/* ================= SOUTHWEST BUILDING (MUSHOLLA BAITUL 'ILMI) ================= */}
                  <g id="gedung-selatan-kiri" onClick={() => setSelectedZone("FASILITAS")} className="cursor-pointer">
                    <rect x="55" y="445" width="235" height="135" fill="#141414" rx="2" />
                    <rect x="50" y="440" width="235" height="135" fill="#EAE5D9" stroke="#141414" strokeWidth="3" rx="2" />
                    <polygon points="50,440 285,440 255,505 80,505" fill="#DCDAD4" stroke="#141414" strokeWidth="1" />
                    <rect x="65" y="450" width="115" height="26" fill="#0B5E2E" stroke="#141414" strokeWidth="1" />
                    <text x="73" y="468" fill="#FFFFFF" fontFamily="Anton, sans-serif" fontSize="13">
                      BAITUL &apos;ILMI
                    </text>
                    <text x="65" y="498" fill="#141414" fontFamily="Anton, sans-serif" fontSize="16">
                      MUSHOLLA UTAMA
                    </text>
                    <text x="65" y="528" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="700">
                      Kapasitas 120 Jamaah • Area Wudhu Luas
                    </text>
                  </g>

                  {/* ================= SOUTH MIDDLE BUILDING ================= */}
                  <g id="gedung-selatan-tengah">
                    <rect x="305" y="455" width="120" height="120" fill="#141414" rx="2" />
                    <rect x="300" y="450" width="120" height="120" fill="#EAE5D9" stroke="#141414" strokeWidth="3" rx="2" />
                    <text x="312" y="495" fill="#141414" fontFamily="Anton, sans-serif" fontSize="14">
                      RUANG KELAS
                    </text>
                    <text x="312" y="515" fill="#141414" fontFamily="Anton, sans-serif" fontSize="12">
                      &amp; POS LOGISTIK
                    </text>
                    <text x="312" y="538" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="700">
                      Media Center SMAN 16
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
                      x="40"
                      y="215"
                      width="545"
                      height="155"
                      rx="4"
                      fill={selectedZone === "BOOTH_JALAN" ? "#D6D3D1" : "#A8A29E"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "BOOTH_JALAN" ? "4.5" : "3.5"}
                      className="transition-all duration-150"
                    />
                    <line x1="45" y1="292" x2="575" y2="292" stroke="#141414" strokeWidth="2.5" strokeDasharray="14 10" strokeOpacity="0.45" />

                    <rect x="50" y="223" width="460" height="28" rx="2" fill="#141414" />
                    <text x="62" y="242" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="13" letterSpacing="0.5">
                      JALAN STAN BOOTH • MEMANJANG KE KIRI DARI DEPAN GK
                    </text>

                    {/* North Row Booths */}
                    <g fill="#FAF8F2" stroke="#141414" strokeWidth="2">
                      <rect x="50" y="258" width="80" height="38" rx="2" />
                      <rect x="138" y="258" width="85" height="38" rx="2" />
                      <rect x="231" y="258" width="80" height="38" rx="2" />
                      <rect x="319" y="258" width="75" height="38" rx="2" />
                      <rect x="402" y="258" width="80" height="38" rx="2" />
                      <rect x="490" y="258" width="85" height="38" rx="2" />
                    </g>
                    <text x="90" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">PKN STAN</text>
                    <text x="180" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">POLSTAT STIS</text>
                    <text x="271" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">POLTEKIP</text>
                    <text x="356" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">UBAYA</text>
                    <text x="442" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">UK PETRA</text>
                    <text x="532" y="282" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">ROBOTIKA</text>

                    {/* South Row Booths */}
                    <g fill="#FAF8F2" stroke="#141414" strokeWidth="2">
                      <rect x="50" y="303" width="98" height="38" rx="2" />
                      <rect x="156" y="303" width="98" height="38" rx="2" />
                      <rect x="262" y="303" width="98" height="38" rx="2" />
                      <rect x="368" y="303" width="102" height="38" rx="2" />
                      <rect x="478" y="303" width="98" height="38" rx="2" />
                    </g>
                    <text x="99" y="327" textAnchor="middle" fill="#D97706" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">BRAIN ACADEMY</text>
                    <text x="205" y="327" textAnchor="middle" fill="#D97706" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">GANESHA OP.</text>
                    <text x="311" y="327" textAnchor="middle" fill="#D97706" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">RUANGGURU</text>
                    <text x="419" y="327" textAnchor="middle" fill="#D97706" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">BEASISWA S1</text>
                    <text x="527" y="327" textAnchor="middle" fill="#D97706" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">EDUTECH 16</text>

                    <path d="M 565 348 L 55 348" stroke="#141414" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr-ink)" opacity="0.7" />
                    <rect x="150" y="347" width="260" height="20" rx="2" fill="#F5B700" stroke="#141414" strokeWidth="1.5" />
                    <text x="280" y="361" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">
                      ← ALUR JELAJAH STAN KE ARAH BARAT
                    </text>
                  </g>

                  {/* ================= MEJA CHECK-IN: DI SAMPING PINTU 2 GK DEKAT JALUR BOOTH ================= */}
                  <g
                    id="meja-checkin-samping-pintu"
                    onClick={() => setSelectedZone("CHECKIN")}
                    className="cursor-pointer group"
                  >
                    <rect x="440" y="388" width="165" height="125" rx="3" fill="#141414" />
                    <rect
                      x="435"
                      y="383"
                      width="165"
                      height="125"
                      rx="3"
                      fill={selectedZone === "CHECKIN" ? "#F5B700" : "#FEF08A"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "CHECKIN" ? "4.5" : "3.5"}
                      className="transition-all duration-150"
                    />
                    <rect x="435" y="383" width="165" height="28" fill="#141414" />
                    <text x="517" y="402" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="12">
                      📍 MEJA CHECK-IN REGISTRASI
                    </text>

                    <rect x="443" y="417" width="149" height="24" fill="#0B5E2E" stroke="#141414" strokeWidth="1" rx="2" />
                    <text x="517" y="433" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10">
                      SAMPING PINTU 2 GK (DEKAT BOOTH)
                    </text>

                    <text x="517" y="458" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11">
                      Pangkal Jalur Masuk Booth
                    </text>
                    <text x="517" y="475" textAnchor="middle" fill="#404940" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="10" fontWeight="600">
                      Scan E-Ticket &amp; Gelang Masuk
                    </text>
                    <text x="517" y="493" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10">
                      Alur Cepat ~500 Pengunjung
                    </text>

                    {/* Direct connection arrow to Pintu 2 and Booth road */}
                    <path d="M 590 440 L 610 365" stroke="#0B5E2E" strokeWidth="3.5" markerEnd="url(#arr-green)" />
                  </g>

                  {/* ================= GEDUNG KESENIAN (GK) — GEDUNG PALING KANAN VERTIKAL ================= */}
                  <g
                    id="gedung-kesenian-gk"
                    onClick={() => setSelectedZone("GK")}
                    className="cursor-pointer group"
                  >
                    <rect x="625" y="75" width="245" height="505" rx="4" fill="#141414" />
                    <rect
                      x="615"
                      y="65"
                      width="245"
                      height="505"
                      rx="4"
                      fill={selectedZone === "GK" ? "#0F7A3D" : "#0B5E2E"}
                      stroke="#141414"
                      strokeWidth={selectedZone === "GK" ? "5" : "4"}
                      className="transition-all duration-150"
                    />

                    {/* Interior Hall Carpet Texture (AULA BERSIH LAPANG TANPA STAN) */}
                    <rect x="625" y="75" width="225" height="485" fill="#EBF7EE" stroke="#141414" strokeWidth="1.5" strokeDasharray="6 4" />

                    {/* Central Hall Banner — Ruang Kosong Kapasitas ~500 Orang Mentok */}
                    <rect x="635" y="95" width="205" height="175" fill="#FAF8F2" stroke="#141414" strokeWidth="3" rx="2" />
                    <rect x="640" y="100" width="195" height="28" fill="#0B5E2E" stroke="#141414" strokeWidth="1" />
                    <text x="737" y="120" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="14" letterSpacing="1">
                      GEDUNG KESENIAN (GK)
                    </text>
                    <text x="737" y="152" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="16">
                      AULA UTAMA (KOSONG)
                    </text>
                    <rect x="645" y="162" width="185" height="28" fill="#F5B700" stroke="#141414" strokeWidth="1" rx="2" />
                    <text x="737" y="181" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10.5">
                      KAPASITAS: SEKITAR 500 ORANG MENTOK
                    </text>
                    <text x="737" y="210" textAnchor="middle" fill="#404940" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="10.5" fontWeight="600">
                      Ruang Lapang Terbuka Bebas Stan
                    </text>
                    <text x="737" y="228" textAnchor="middle" fill="#404940" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="10" fontWeight="600">
                      Area Duduk Lesehan Penonton Full AC
                    </text>
                    <text x="737" y="246" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10">
                      ★ FULL AIR CONDITIONER (SEJUK) ★
                    </text>

                    {/* Middle Audience Viewing Area */}
                    <rect x="635" y="280" width="205" height="115" fill="#FFFFFF" stroke="#0B5E2E" strokeWidth="1.5" strokeDasharray="4 4" rx="2" opacity="0.95" />
                    <text x="737" y="308" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="12" letterSpacing="0.5">
                      ZONA LESEHAN PENONTON (~500 ORANG)
                    </text>
                    <text x="737" y="328" textAnchor="middle" fill="#404940" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="10.5" fontWeight="600">
                      Sirkulasi Lapang &amp; Bebas Halangan
                    </text>
                    <text x="737" y="352" textAnchor="middle" fill="#BA1A1A" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11" letterSpacing="0.5">
                      ↓↓ MENGHADAP PANGGUNG DI BAWAH ↓↓
                    </text>
                    <path d="M 740 360 L 740 385" stroke="#BA1A1A" strokeWidth="3" markerEnd="url(#arr-green)" />

                    {/* ================= STAND PANGGUNG TALK SHOW: PALING BAWAH UJUNG DARI GEDUNG GK ================= */}
                    <g id="stand-talkshow-ujung-bawah-gk">
                      <rect x="625" y="405" width="225" height="155" rx="3" fill="#F5B700" stroke="#141414" strokeWidth="3.5" />
                      <rect x="625" y="405" width="225" height="32" fill="#141414" />
                      <text x="737" y="426" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="13" letterSpacing="0.5">
                        🎤 STAND PANGGUNG TALK SHOW
                      </text>

                      {/* Screen / Backdrop on Stage */}
                      <rect x="635" y="445" width="205" height="44" fill="#0B5E2E" stroke="#141414" strokeWidth="1.5" rx="2" />
                      <text x="737" y="465" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="12">
                        GELAR WICARA &amp; SHARING ALUMNI
                      </text>
                      <text x="737" y="480" textAnchor="middle" fill="#F5B700" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="9.5" fontWeight="600">
                        Narasumber Perguruan Tinggi &amp; Beasiswa
                      </text>

                      {/* Stage info box */}
                      <rect x="635" y="495" width="205" height="55" fill="#FAF8F2" stroke="#141414" strokeWidth="1.5" rx="2" />
                      <text x="737" y="513" textAnchor="middle" fill="#BA1A1A" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10.5">
                        📍 POSISI: PALING BAWAH UJUNG DARI GEDUNG GK
                      </text>
                      <text x="737" y="529" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-body), 'Plus Jakarta Sans', sans-serif" fontSize="9.5" fontWeight="600">
                        Mimbar Presentasi • Sound System • LED
                      </text>
                      <text x="737" y="544" textAnchor="middle" fill="#0B5E2E" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10">
                        ★ ARENA TALKSHOW UTAMA ESCAPE 2027 ★
                      </text>
                    </g>

                    {/* ================= PINTU 1: UJUNG VERTIKAL ATAS ================= */}
                    <g id="pintu-1-ujung-atas">
                      <rect x="670" y="50" width="135" height="30" fill="#F5B700" stroke="#141414" strokeWidth="3" rx="2" />
                      <text x="737" y="70" textAnchor="middle" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="11.5">
                        🚪 PINTU 1 (UJUNG ATAS)
                      </text>
                    </g>

                    {/* ================= PINTU 2: SAMPING TENGAH SEBELAH JALAN ================= */}
                    <g id="pintu-2-samping-tengah">
                      <rect x="596" y="260" width="32" height="110" fill="#F5B700" stroke="#141414" strokeWidth="3" rx="2" />
                      <text x="616" y="348" fill="#141414" fontFamily="var(--font-comic-display), Oswald, sans-serif" fontSize="10" transform="rotate(-90 616 348)">
                        🚪 PINTU 2 (SAMPING TENGAH)
                      </text>
                      <path d="M 575 315 L 605 315" stroke="#0B5E2E" strokeWidth="4" markerEnd="url(#arr-green)" />
                    </g>
                  </g>

                  {/* ================= HALAMAN / SELASAR SELATAN GK ================= */}
                  <g id="selasar-selatan-gk">
                    <rect x="615" y="585" width="245" height="42" rx="3" fill="#EAE5D9" stroke="#141414" strokeWidth="2.5" />
                    <text x="625" y="605" fill="#141414" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="11.5" letterSpacing="0.5">
                      HALAMAN / DROP-OFF SELATAN GK
                    </text>
                    <text x="625" y="620" fill="#404940" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="600">
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
                      <span className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide truncate">
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
                  <div className="inline-block bg-[#0B5E2E] text-[#FAF8F2] px-2 py-0.5 border border-[#141414] font-body font-bold text-xs uppercase tracking-wide mb-1">
                    KOMANDO SIRKULASI ACARA
                  </div>
                  <h2 className="font-display text-xl uppercase text-[#141414]">
                    Alur Tertib Jelajah ESCAPE 2027 SMAN 16
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 font-body text-xs sm:text-sm text-[#404940]">
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-3 border-2 border-[#141414] shadow-comic-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>1. Meja Check-in (Samping Pintu 2 Masuk Samping):</strong> Verifikasi barcode e-ticket persis di samping Pintu 2 GK dekat pangkal jalan booth untuk mengambil gelang ID.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-3 border-2 border-[#141414] shadow-comic-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>2. Stand Panggung Talkshow (Paling Bawah Ujung GK):</strong> Saksikan sesi gelar wicara inspiratif dan presentasi kampus di panggung utama yang berada di paling bawah ujung gedung GK.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-3 border-2 border-[#141414] shadow-comic-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
                      <span><strong>3. Aula Gedung Kesenian (GK Kosong ~500 Orang):</strong> Masuk via Pintu 1 atau Pintu 2. Area aula lapang dan bersih tanpa stan pameran, nyaman ber-AC untuk istirahat lesehan santai (kapasitas sekitar 500 orang mentok).</span>
                    </div>
                    <div className="flex items-start gap-2 bg-[#FAF8F2] p-3 border-2 border-[#141414] shadow-comic-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#0B5E2E] flex-shrink-0 mt-0.5" />
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
                  <span className="font-body text-xs bg-[#F5B700] text-[#141414] px-2 py-0.5 border border-[#141414] uppercase tracking-wider inline-block mb-1 font-extrabold">
                    INSPEKSI BERKAS TATA RUANG
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#FAF8F2]">
                    {currentZone.name.split("—")[0]}
                  </h3>
                </div>
                <span className="bg-[#F5B700] text-[#141414] px-2.5 py-1 font-body text-xs uppercase border-2 border-[#141414] font-extrabold tracking-wide">
                  {currentZone.badge}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="bg-[#EAE5D9] p-3.5 border-2 border-[#141414]">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-body font-bold text-[#141414] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0B5E2E]" />
                      <span className="uppercase tracking-wider">KAPASITAS:</span>
                    </span>
                    <span className="text-[#0B5E2E] font-extrabold">{currentZone.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-body text-[#404940]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#BA1A1A]" />
                      <span>Lokasi:</span>
                    </span>
                    <span className="font-semibold text-right text-xs sm:text-sm">{currentZone.location}</span>
                  </div>
                </div>

                <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed font-medium">
                  {currentZone.description}
                </p>

                {/* Highlights */}
                <div>
                  <div className="font-body text-xs sm:text-sm text-[#141414] uppercase mb-2 font-extrabold tracking-wide">
                    SOROTAN UTAMA AREA INI:
                  </div>
                  <ul className="space-y-2 font-body text-xs sm:text-sm text-[#404940] font-medium">
                    {currentZone.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0B5E2E] font-bold mt-0.5">✔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booths in this zone */}
                <div className="pt-3 border-t-2 border-[#141414]/20">
                  <div className="font-body text-xs sm:text-sm text-[#141414] uppercase mb-2 flex justify-between items-center font-extrabold tracking-wide">
                    <span>DAFTAR BOOTH / RUANG DI AREA INI:</span>
                    <Link
                      href="/direktori-stan"
                      className="text-xs text-[#0B5E2E] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Database Kampus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentZone.booths.map((b, i) => (
                      <span
                        key={i}
                        className="bg-[#EAE5D9] text-[#141414] px-2.5 py-1 text-xs font-bold border-2 border-[#141414] shadow-comic-sm"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/direktori-stan"
                  className="comic-btn w-full text-center bg-[#F5B700] text-[#141414] font-body font-extrabold text-xs sm:text-sm uppercase tracking-wide py-3 border-[3px] border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#FFE066] mt-2 block"
                >
                  Buka Halaman Database Kampus &rarr;
                </Link>
              </div>
            </div>

            {/* EMERGENCY HOTLINE CARD */}
            <div className="bg-[#FAF8F2] border-comic-4 shadow-comic p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#BA1A1A] text-[#FAF8F2] border-2 border-[#141414] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#141414]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-body font-extrabold text-xs uppercase tracking-wide text-[#BA1A1A] leading-tight">
                  HOTLINE PENGADUAN &amp; MEDIS
                </div>
                <div className="font-body font-black text-base text-[#141414] tracking-wider">0812-3416-2027</div>
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
            <span className="bg-[#0B5E2E] text-[#FAF8F2] px-3.5 py-1 font-body font-extrabold text-sm sm:text-base uppercase tracking-wide border-[3px] border-[#141414] shadow-[3px_3px_0px_#141414]">
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
                      <span className={`px-2 py-0.5 text-[10px] font-body font-extrabold uppercase tracking-wide border border-[#141414] ${f.badgeBg}`}>
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg uppercase text-[#141414]">{f.name}</h3>
                    <p className="font-body text-xs text-[#404940] mt-1 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t-2 border-[#141414] font-body text-[11px] uppercase text-[#0B5E2E] font-extrabold tracking-wide flex items-center gap-1">
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
