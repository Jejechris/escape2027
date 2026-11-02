"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Search,
  Building,
  MapPin,
  Award,
  Users,
  Target,
  FileText,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Compass,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";

type CategoryFilter = "all" | "ptn-jatim" | "ptn-luar" | "kedinasan" | "pts";
type SortOption = "alumni" | "utbk" | "name";

export interface MajorInfo {
  name: string;
  keketatan: string;
  kuota: string;
  nilaiRaporAman: string;
}

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  category: "ptn-jatim" | "ptn-luar" | "kedinasan" | "pts";
  categoryLabel: string;
  location: string;
  accreditation: string;
  nationalRank?: string;
  alumniSixteenCount: number;
  utbkTargetScore: string;
  utbkNumeric: number;
  snbpRaporTarget: string;
  tuitionRange: string;
  admissionPaths: string[];
  topMajors: MajorInfo[];
  scholarships: string[];
  overview: string;
  specialFeatures: string[];
  websiteUrl: string;
  badge: string;
  featured?: boolean;
}

const CAMPUS_DATABASE: Campus[] = [
  {
    id: "unair",
    name: "UNIVERSITAS AIRLANGGA",
    shortName: "UNAIR",
    category: "ptn-jatim",
    categoryLabel: "PTN JAWA TIMUR",
    location: "Surabaya, Jawa Timur",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#4 Nasional • Top 308 Dunia (QS WUR 2025)",
    alumniSixteenCount: 42,
    utbkTargetScore: "645 — 725+",
    utbkNumeric: 685,
    snbpRaporTarget: "88.5 — 94.0",
    tuitionRange: "Rp 500.000 — Rp 10.000.000 / semester (UKT 1-7)",
    admissionPaths: ["SNBP (Rapor)", "SNBT (UTBK)", "Mandiri Reguler", "Mandiri Kemitraan", "IUP International"],
    topMajors: [
      { name: "Kedokteran Umum", keketatan: "1.42% (Sangat Ketat)", kuota: "75 Kursi SNBT", nilaiRaporAman: "93.5+" },
      { name: "Farmasi", keketatan: "2.85%", kuota: "65 Kursi", nilaiRaporAman: "90.2" },
      { name: "Sistem Informasi", keketatan: "3.60%", kuota: "50 Kursi", nilaiRaporAman: "89.0" },
      { name: "Ilmu Hukum", keketatan: "4.10%", kuota: "110 Kursi", nilaiRaporAman: "88.8" },
      { name: "Psikologi", keketatan: "3.20%", kuota: "80 Kursi", nilaiRaporAman: "89.5" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Pemkot Surabaya (Generasi Emas)", "Beasiswa Alumni Sixteen", "Djarum Beasiswa Plus"],
    overview:
      "Perguruan tinggi negeri badan hukum (PTN-BH) terkemuka di Surabaya dengan reputasi riset biomedis, farmasi, sains terapan, dan hukum terkuat di Indonesia Timur. Menjadi tujuan utama paling diminati siswa SMAN 16 Surabaya tiap tahunnya.",
    specialFeatures: [
      "Rumah Sakit Universitas Airlangga (RSUA) & Rumah Sakit Khusus Infeksi",
      "Fakultas Kedokteran tertua kedua di Indonesia dengan fasilitas riset internasional",
      "Kerjasama pertukaran mahasiswa dengan 150+ kampus luar negeri (AIMS, Erasmus)",
    ],
    websiteUrl: "https://ppmb.unair.ac.id",
    badge: "FAVORIT NO. 1 SIXTEEN",
    featured: true,
  },
  {
    id: "its",
    name: "INSTITUT TEKNOLOGI SEPULUH NOPEMBER",
    shortName: "ITS",
    category: "ptn-jatim",
    categoryLabel: "PTN JAWA TIMUR",
    location: "Sukolilo, Surabaya, Jawa Timur",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#6 Nasional • Pusat Inovasi Maritim & AI",
    alumniSixteenCount: 38,
    utbkTargetScore: "655 — 730+",
    utbkNumeric: 692,
    snbpRaporTarget: "89.0 — 94.5",
    tuitionRange: "Rp 500.000 — Rp 12.500.000 / semester",
    admissionPaths: ["SNBP (Rapor)", "SNBT (UTBK)", "Seleksi Mandiri Prestasi", "Seleksi Mandiri Umum", "IUP"],
    topMajors: [
      { name: "Teknik Informatika", keketatan: "1.65%", kuota: "90 Kursi", nilaiRaporAman: "92.8" },
      { name: "Teknik Sistem & Industri", keketatan: "3.40%", kuota: "70 Kursi", nilaiRaporAman: "90.0" },
      { name: "Sains Data", keketatan: "2.30%", kuota: "40 Kursi", nilaiRaporAman: "91.2" },
      { name: "Teknik Elektro", keketatan: "4.20%", kuota: "80 Kursi", nilaiRaporAman: "89.4" },
      { name: "Teknik Sipil", keketatan: "3.90%", kuota: "75 Kursi", nilaiRaporAman: "89.1" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Paragon Technology", "Beasiswa Karya Salemba Empat (KSE)", "Beasiswa Ikoma ITS"],
    overview:
      "Kawah candradimuka teknologi rekayasa dan maritim terbaik di Jawa Timur. Memiliki ekosistem riset kendaraan listrik, robotika dunia (Ichiro, Anargya), serta keunggulan komputasi data skala enterprise.",
    specialFeatures: [
      "Tim Robotika ITS peraih Juara Dunia Robocup & Kontes Robot Indonesia (KRI)",
      "Pusat Unggulan IPTEK Kecerdasan Buatan & Sistem Maritim Otonom",
      "Jejaring industri teknik multinasional dengan program magang berbayar",
    ],
    websiteUrl: "https://admission.its.ac.id",
    badge: "KAMPUS SAINTEK & ROBOTIKA",
    featured: true,
  },
  {
    id: "ugm",
    name: "UNIVERSITAS GADJAH MADA",
    shortName: "UGM",
    category: "ptn-luar",
    categoryLabel: "PTN LUAR JAWA TIMUR",
    location: "Sleman, D.I. Yogyakarta",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#2 Nasional • Top 239 Dunia (QS WUR 2025)",
    alumniSixteenCount: 19,
    utbkTargetScore: "660 — 735+",
    utbkNumeric: 698,
    snbpRaporTarget: "89.5 — 95.0",
    tuitionRange: "Rp 0 — Rp 12.000.000 / semester (Subsidi 100%, 75%, 50%, 0%)",
    admissionPaths: ["SNBP", "SNBT", "UM UGM CBT (Ujian Tulis)", "PBUB (Bibit Unggul Berprestasi)", "IUP"],
    topMajors: [
      { name: "Kedokteran", keketatan: "1.15%", kuota: "60 Kursi", nilaiRaporAman: "94.0" },
      { name: "Ilmu Komunikasi", keketatan: "1.80%", kuota: "35 Kursi", nilaiRaporAman: "91.8" },
      { name: "Manajemen FEB", keketatan: "2.10%", kuota: "45 Kursi", nilaiRaporAman: "92.0" },
      { name: "Teknik Sipil", keketatan: "3.50%", kuota: "55 Kursi", nilaiRaporAman: "89.8" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Kagama (Alumni UGM)", "Beasiswa Djarum Plus", "Beasiswa Bank Indonesia"],
    overview:
      "Universitas nasional tertua berwawasan kebangsaan di Yogyakarta. Kampus kerakyatan dengan fakultas terakreditasi internasional AACSB (FEB) dan laboratorium rekayasa terpadu terlengkap.",
    specialFeatures: [
      "Fakultas Ekonomika dan Bisnis berakreditasi internasional AACSB pertama di Indonesia",
      "Jalur mandiri CBT UGM yang dapat diakses dari lokasi tes Surabaya",
      "Komunitas alumni Sixteen yang solid di kawasan Bulaksumur Yogyakarta",
    ],
    websiteUrl: "https://um.ugm.ac.id",
    badge: "PTN BULAKSUMUR YOGYA",
  },
  {
    id: "ui",
    name: "UNIVERSITAS INDONESIA",
    shortName: "UI",
    category: "ptn-luar",
    categoryLabel: "PTN LUAR JAWA TIMUR",
    location: "Depok & Salemba, Jawa Barat / DKI Jakarta",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#1 Nasional • Top 206 Dunia (QS WUR 2025)",
    alumniSixteenCount: 14,
    utbkTargetScore: "670 — 745+",
    utbkNumeric: 708,
    snbpRaporTarget: "90.0 — 95.5",
    tuitionRange: "Rp 0 — Rp 15.000.000 / semester (BOP Berkeadilan)",
    admissionPaths: ["SNBP", "SNBT", "PPKB UI (Rapor Sekolah Mitra)", "SIMAK UI Ujian Tulis", "Talenta Berprestasi"],
    topMajors: [
      { name: "Pendidikan Dokter", keketatan: "0.95%", kuota: "75 Kursi", nilaiRaporAman: "94.8" },
      { name: "Ilmu Komputer (Fasilkom)", keketatan: "1.70%", kuota: "50 Kursi", nilaiRaporAman: "93.0" },
      { name: "Ilmu Hukum", keketatan: "2.90%", kuota: "120 Kursi", nilaiRaporAman: "91.5" },
      { name: "Psikologi", keketatan: "2.40%", kuota: "70 Kursi", nilaiRaporAman: "92.2" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Makara UI", "Beasiswa Tanoto Foundation", "Beasiswa BSI Maslahat"],
    overview:
      "Pusat keunggulan sains, sosial humaniora, dan kedokteran rujukan nasional. SMAN 16 Surabaya memiliki akses jalur rapor prestasi PPKB UI sebagai sekolah mitra unggulan Jawa Timur.",
    specialFeatures: [
      "Akses jalur rapor khusus PPKB UI khusus sekolah undangan",
      "Perpustakaan Crystal of Knowledge terbesar di Asia Tenggara",
      "Jejaring karir dan alumni lintas kementerian dan korporasi global",
    ],
    websiteUrl: "https://penerimaan.ui.ac.id",
    badge: "KAMPUS KUNING DEPOK",
  },
  {
    id: "itb",
    name: "INSTITUT TEKNOLOGI BANDUNG",
    shortName: "ITB",
    category: "ptn-luar",
    categoryLabel: "PTN LUAR JAWA TIMUR",
    location: "Bandung & Jatinangor, Jawa Barat",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#3 Nasional • Top 256 Dunia (QS WUR 2025)",
    alumniSixteenCount: 11,
    utbkTargetScore: "665 — 740+",
    utbkNumeric: 702,
    snbpRaporTarget: "90.5 — 95.0",
    tuitionRange: "Rp 0 — Rp 14.500.000 / semester",
    admissionPaths: ["SNBP", "SNBT", "Seleksi Mandiri ITB (SM-ITB Nilai UTBK + Tes)", "Kemitraan Daerah"],
    topMajors: [
      { name: "STEI Rekayasa", keketatan: "2.10%", kuota: "120 Kursi", nilaiRaporAman: "93.2" },
      { name: "FTTM Perminyakan", keketatan: "2.60%", kuota: "110 Kursi", nilaiRaporAman: "91.8" },
      { name: "SBM Manajemen Bisnis", keketatan: "2.40%", kuota: "85 Kursi", nilaiRaporAman: "92.4" },
      { name: "FSRD Desain Komunikasi Visual", keketatan: "3.10%", kuota: "60 Kursi", nilaiRaporAman: "90.0" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Ganesha ITB", "Beasiswa Ikatan Alumni ITB (IA-ITB)", "Beasiswa Medco"],
    overview:
      "Institusi pendidikan tinggi teknik pertama di Indonesia, pencetak insinyur legendaris dan teknopreneur terkemuka. Sistem tahun pertama bersama (TPB) mengasah dasar matematika sains yang solid.",
    specialFeatures: [
      "Sistem Tahap Persiapan Bersama (TPB) sebelum penjurusan spesifik",
      "Akreditasi internasional ABET untuk seluruh program studi teknik utama",
      "Pusat inkubator startup teknologi teraktif di Asia Tenggara",
    ],
    websiteUrl: "https://admission.itb.ac.id",
    badge: "INSTITUT TEKNIK GANESHA",
  },
  {
    id: "ub",
    name: "UNIVERSITAS BRAWIJAYA",
    shortName: "UB",
    category: "ptn-jatim",
    categoryLabel: "PTN JAWA TIMUR",
    location: "Malang, Jawa Timur",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#8 Nasional • Kampus Terfavorit Pendaftar SNBT",
    alumniSixteenCount: 26,
    utbkTargetScore: "615 — 680+",
    utbkNumeric: 648,
    snbpRaporTarget: "86.5 — 92.0",
    tuitionRange: "Rp 500.000 — Rp 9.500.000 / semester (UKT 1-8)",
    admissionPaths: ["SNBP", "SNBT", "SMUB Jalur Rapor", "SMUB Jalur UTBK", "Mandiri Prestasi"],
    topMajors: [
      { name: "Kedokteran", keketatan: "1.55%", kuota: "85 Kursi", nilaiRaporAman: "92.5" },
      { name: "Ilmu Komunikasi", keketatan: "2.80%", kuota: "110 Kursi", nilaiRaporAman: "89.2" },
      { name: "Teknik Informatika FILKOM", keketatan: "3.10%", kuota: "95 Kursi", nilaiRaporAman: "89.6" },
      { name: "Hubungan Internasional", keketatan: "3.70%", kuota: "65 Kursi", nilaiRaporAman: "88.4" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Unggulan Kemendikbud", "Beasiswa Bank Indonesia", "Beasiswa Pemda"],
    overview:
      "Kampus berhawa sejuk di kota pelajar Malang yang selalu mencatatkan peminat terbanyak secara nasional di SNBT. Menawarkan spektrum jurusan lengkap dari agro-kompleks, kedokteran, hingga komputasi.",
    specialFeatures: [
      "Kampus paling diminati pendaftar seleksi nasional selama 5 tahun berturut-turut",
      "Rumah Sakit UB dan laboratorium lapangan agroteknologi seluas 100 hektar",
      "Akses jalur mandiri nilai rapor yang sangat ramah alumni SMAN 16",
    ],
    websiteUrl: "https://selma.ub.ac.id",
    badge: "KAMPUS BIRU MALANG",
  },
  {
    id: "pkn-stan",
    name: "POLITEKNIK KEUANGAN NEGARA STAN",
    shortName: "PKN STAN",
    category: "kedinasan",
    categoryLabel: "SEKOLAH KEDINASAN",
    location: "Bintaro Jaya, Tangerang Selatan, Banten",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "Kedinasan No. 1 Kementerian Keuangan RI",
    alumniSixteenCount: 9,
    utbkTargetScore: "SKD BKN 410+ & UTBK 610+",
    utbkNumeric: 670,
    snbpRaporTarget: "Nilai Rapor Semester 1-5 ≥ 85.0",
    tuitionRange: "GRATIS 100% (Ikatan Dinas, Asrama & Uang Saku)",
    admissionPaths: ["SPMB PKN STAN Reguler", "Jalur Afirmasi Kewilayahan", "Jalur Pembibitan Pemda"],
    topMajors: [
      { name: "D4 Akuntansi Sektor Publik", keketatan: "0.85%", kuota: "180 Kursi", nilaiRaporAman: "89.0+" },
      { name: "D4 Manajemen Keuangan Negara", keketatan: "0.95%", kuota: "160 Kursi", nilaiRaporAman: "88.5+" },
      { name: "D4 Manajemen Aset Publik", keketatan: "1.20%", kuota: "100 Kursi", nilaiRaporAman: "87.8+" },
    ],
    scholarships: ["Biaya Pendidikan 100% Ditanggung APBN Negara", "Tunjangan Ikatan Dinas CPNS"],
    overview:
      "Pendidikan tinggi kedinasan di bawah Kementerian Keuangan RI. Lulusan langsung diangkat menjadi Calon Pegawai Negeri Sipil (CPNS) di Kementerian Keuangan, BPKP, dan instansi pengelola keuangan negara.",
    specialFeatures: [
      "Pengangkatan langsung menjadi CPNS Golongan III/a setelah lulus",
      "Kurikulum pengelolaan APBN, kepabeanan cukai, dan audit forensik keuangan",
      "Fasilitas asrama taruna dan seragam dinas lengkap tanpa pungutan biaya",
    ],
    websiteUrl: "https://spmb.pknstan.ac.id",
    badge: "IKATAN DINAS KEMENKEU",
  },
  {
    id: "polstat-stis",
    name: "POLITEKNIK STATISTIKA STIS",
    shortName: "POLSTAT STIS",
    category: "kedinasan",
    categoryLabel: "SEKOLAH KEDINASAN",
    location: "Otista, Jakarta Timur, DKI Jakarta",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "Kedinasan Resmi Badan Pusat Statistik (BPS)",
    alumniSixteenCount: 7,
    utbkTargetScore: "SKD BKN 405+ & Matematika ≥ 75",
    utbkNumeric: 665,
    snbpRaporTarget: "Matematika & Bahasa Inggris Rapor ≥ 85.0",
    tuitionRange: "GRATIS 100% (Ikatan Dinas & Uang Saku BPS)",
    admissionPaths: ["SPMB Polstat STIS Jalur Ikatan Dinas"],
    topMajors: [
      { name: "D4 Komputasi Statistik", keketatan: "1.10%", kuota: "120 Kursi", nilaiRaporAman: "89.5" },
      { name: "D4 Statistika Terapan", keketatan: "1.25%", kuota: "150 Kursi", nilaiRaporAman: "88.8" },
      { name: "D3 Statistika", keketatan: "1.60%", kuota: "80 Kursi", nilaiRaporAman: "87.5" },
    ],
    scholarships: ["Biaya Kuliah 100% Ditanggung Pemerintah", "Uang Saku Bulanan Ikatan Dinas"],
    overview:
      "Sekolah kedinasan ikatan dinas Badan Pusat Statistik (BPS). Memfokuskan diri pada penguasaan sains data, komputasi big data statistik, dan metodologi sensus kependudukan nasional.",
    specialFeatures: [
      "Penempatan CPNS di Badan Pusat Statistik seluruh wilayah Indonesia",
      "Fokus kurikulum data science, machine learning statistik, dan pemodelan AI",
      "Bebas biaya studi dari semester awal hingga kelulusan",
    ],
    websiteUrl: "https://spmb.stis.ac.id",
    badge: "IKATAN DINAS BPS DATA",
  },
  {
    id: "poltekim",
    name: "POLITEKNIK IMIGRASI & PEMASYARAKATAN",
    shortName: "POLTEKIM/IP",
    category: "kedinasan",
    categoryLabel: "SEKOLAH KEDINASAN",
    location: "Gandul Cinere, Depok & Tangerang",
    accreditation: "Baik Sekali",
    nationalRank: "Kedinasan Kementerian Hukum & HAM RI",
    alumniSixteenCount: 5,
    utbkTargetScore: "SKD BKN 395+ & Tes Kesamaptaan Fisik",
    utbkNumeric: 640,
    snbpRaporTarget: "Rapor Semester 1-5 Rata-rata ≥ 80.0",
    tuitionRange: "GRATIS 100% (Pendidikan Semi Militer, Asrama Penuh)",
    admissionPaths: ["Seleksi Penerimaan Taruna Baru (SPTB) Kemenkumham"],
    topMajors: [
      { name: "D4 Hukum Keimigrasian", keketatan: "1.30%", kuota: "90 Taruna", nilaiRaporAman: "87.0" },
      { name: "D4 Manajemen Teknologi Imigrasi", keketatan: "1.45%", kuota: "80 Taruna", nilaiRaporAman: "86.5" },
      { name: "D4 Bimbingan Kemasyarakatan", keketatan: "1.80%", kuota: "75 Taruna", nilaiRaporAman: "85.8" },
    ],
    scholarships: ["Pendidikan Taruna Gratis 100%", "Asrama, Seragam, & Uang Saku Ikatan Dinas"],
    overview:
      "Kawah candradimuka perwira penegak hukum keimigrasian dan pemasyarakatan Indonesia. Memadukan disiplin ketarunaan semi-militer dengan kompetensi hukum internasional dan intelijen dokumen.",
    specialFeatures: [
      "Penempatan dinas di Kantor Imigrasi, Bandara Internasional, dan KBRI luar negeri",
      "Latihan fisik kesamaptaan, beladiri militer, dan kemahiran menembak",
      "Pengangkatan menjadi pejabat imigrasi berpangkat Letnan Dua / Golongan III/a",
    ],
    websiteUrl: "https://catar.kemenkumham.go.id",
    badge: "IKATAN DINAS IMIGRASI",
  },
  {
    id: "unesa",
    name: "UNIVERSITAS NEGERI SURABAYA",
    shortName: "UNESA",
    category: "ptn-jatim",
    categoryLabel: "PTN JAWA TIMUR",
    location: "Ketintang & Lidah Wetan, Surabaya",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "PTN-BH Terakreditasi Unggul • Kampus Satu Langkah di Depan",
    alumniSixteenCount: 31,
    utbkTargetScore: "575 — 640+",
    utbkNumeric: 610,
    snbpRaporTarget: "84.0 — 89.5",
    tuitionRange: "Rp 500.000 — Rp 8.000.000 / semester",
    admissionPaths: ["SNBP", "SNBT", "SPMB Mandiri Prestasi", "SPMB Mandiri UTBK", "Mandiri Tes Tulis"],
    topMajors: [
      { name: "Psikologi", keketatan: "2.90%", kuota: "90 Kursi", nilaiRaporAman: "88.2" },
      { name: "Desain Komunikasi Visual (DKV)", keketatan: "3.40%", kuota: "65 Kursi", nilaiRaporAman: "87.5" },
      { name: "Manajemen", keketatan: "3.10%", kuota: "120 Kursi", nilaiRaporAman: "87.0" },
      { name: "Ilmu Keolahragaan & Fisioterapi", keketatan: "4.50%", kuota: "60 Kursi", nilaiRaporAman: "85.0" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Atlet Berprestasi", "Beasiswa Pemprov Jatim", "Beasiswa Unggulan"],
    overview:
      "PTN-BH di Surabaya dengan fasilitas keolahragaan dan laboratorium seni/desain modern bertaraf internasional. Memiliki program vokasi dan sarjana terapan yang sangat terintegrasi dengan dunia kerja.",
    specialFeatures: [
      "Fasilitas laboratorium sport science dan stadion atletik terakreditasi internasional",
      "Fakultas Bahasa dan Seni dengan studio rekaman dan galeri pameran modern",
      "Lokasi kampus strategis di Surabaya Selatan dan Barat yang mudah dijangkau dari SMAN 16",
    ],
    websiteUrl: "https://admisi.unesa.ac.id",
    badge: "PTN-BH KOTA SURABAYA",
  },
  {
    id: "upn-jatim",
    name: "UPN 'VETERAN' JAWA TIMUR",
    shortName: "UPN V JATIM",
    category: "ptn-jatim",
    categoryLabel: "PTN JAWA TIMUR",
    location: "Rungkut Madya, Surabaya, Jawa Timur",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "PTN Bela Negara • Pusat Ilmu Komunikasi & IT",
    alumniSixteenCount: 24,
    utbkTargetScore: "560 — 635+",
    utbkNumeric: 598,
    snbpRaporTarget: "83.5 — 89.0",
    tuitionRange: "Rp 500.000 — Rp 7.500.000 / semester",
    admissionPaths: ["SNBP", "SNBT", "Jalur Mandiri Reguler (JAMA)", "Mandiri Jalur Nilai UTBK", "Mandiri Kemitraan"],
    topMajors: [
      { name: "Ilmu Komunikasi", keketatan: "2.70%", kuota: "130 Kursi", nilaiRaporAman: "87.8" },
      { name: "Sistem Informasi", keketatan: "3.20%", kuota: "80 Kursi", nilaiRaporAman: "87.0" },
      { name: "Teknik Informatika", keketatan: "3.00%", kuota: "90 Kursi", nilaiRaporAman: "87.4" },
      { name: "Teknik Kimia", keketatan: "4.80%", kuota: "70 Kursi", nilaiRaporAman: "85.2" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Djarum Plus", "Beasiswa Pemkot Surabaya", "Beasiswa Alumni"],
    overview:
      "Perguruan tinggi negeri berkarakter bela negara di kawasan Rungkut Surabaya. Dikenal sangat kuat dalam rumpun ilmu komunikasi, informatika, dan rekayasa industri kimia.",
    specialFeatures: [
      "Laboratorium penyiaran televisi dan radio modern untuk jurusan Komunikasi",
      "Kemitraan industri strategis di kawasan industri SIER Rungkut Surabaya",
      "Kultur pembentukan karakter kepemimpinan dan disiplin kebangsaan",
    ],
    websiteUrl: "https://simaba.upnjatim.ac.id",
    badge: "PTN BELA NEGARA",
  },
  {
    id: "ubaya",
    name: "UNIVERSITAS SURABAYA",
    shortName: "UBAYA",
    category: "pts",
    categoryLabel: "KAMPUS SWASTA & GLOBAL",
    location: "Tenggilis Mejoyo & Ngagel, Surabaya",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "PTS No. 1 di Jawa Timur • Akreditasi Internasional",
    alumniSixteenCount: 22,
    utbkTargetScore: "Jalur Rapor SMA 16 / Tes Potensi",
    utbkNumeric: 620,
    snbpRaporTarget: "Rapor Semester 1-4 Rata-rata ≥ 80.0",
    tuitionRange: "Rp 9.500.000 — Rp 24.000.000 / semester (Tersedia Beasiswa 50-100%)",
    admissionPaths: ["Jalur Prestasi Unggulan (JPU Rapor Mitra)", "Jalur Tes Mandiri", "Beasiswa Simpatik"],
    topMajors: [
      { name: "Farmasi & Profesi Apoteker", keketatan: "3.20%", kuota: "140 Kursi", nilaiRaporAman: "88.0" },
      { name: "Pendidikan Dokter (FK UBAYA)", keketatan: "2.10%", kuota: "50 Kursi", nilaiRaporAman: "90.5" },
      { name: "Fakultas Bisnis & Ekonomika (FBE)", keketatan: "4.10%", kuota: "180 Kursi", nilaiRaporAman: "84.5" },
      { name: "Bioteknologi", keketatan: "3.80%", kuota: "60 Kursi", nilaiRaporAman: "85.0" },
    ],
    scholarships: ["Beasiswa Jalur Prestasi Rapor SMAN 16 (Hingga 100%)", "Beasiswa Olahraga & Seni", "Beasiswa Cendekia"],
    overview:
      "Perguruan tinggi swasta terbaik di Jawa Timur dengan jaminan mutu internasional. Memiliki Fakultas Farmasi legendaris dan Fakultas Kedokteran berfasilitas RS pendidikan terpadu di Surabaya.",
    specialFeatures: [
      "Laboratorium farmasi dan bioteknologi terlengkap dengan sertifikasi ISO",
      "Program dual degree dengan universitas ternama di Australia dan Eropa",
      "Akses beasiswa potongan uang gedung khusus siswa kemitraan SMAN 16 Surabaya",
    ],
    websiteUrl: "https://daftar.ubaya.ac.id",
    badge: "PTS UNGGULAN JAWA TIMUR",
  },
  {
    id: "petra",
    name: "UNIVERSITAS KRISTEN PETRA",
    shortName: "UK PETRA",
    category: "pts",
    categoryLabel: "KAMPUS SWASTA & GLOBAL",
    location: "Siwalankerto, Surabaya, Jawa Timur",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "PTS Unggulan Bidang Arsitektur & Desain",
    alumniSixteenCount: 18,
    utbkTargetScore: "Jalur Kerjasama Sekolah / Portofolio",
    utbkNumeric: 615,
    snbpRaporTarget: "Rapor Semester 1-4 Rata-rata ≥ 80.0",
    tuitionRange: "Rp 12.000.000 — Rp 26.000.000 / semester",
    admissionPaths: ["Jalur Kerjasama Sekolah Mitra SMAN 16", "Jalur Prestasi Akademik", "Jalur Umum"],
    topMajors: [
      { name: "Arsitektur (Akreditasi KAAB)", keketatan: "2.80%", kuota: "90 Kursi", nilaiRaporAman: "87.0" },
      { name: "Desain Komunikasi Visual (DKV)", keketatan: "3.10%", kuota: "80 Kursi", nilaiRaporAman: "86.5" },
      { name: "Teknik Sipil", keketatan: "3.90%", kuota: "75 Kursi", nilaiRaporAman: "85.0" },
      { name: "International Business Management", keketatan: "3.50%", kuota: "100 Kursi", nilaiRaporAman: "86.0" },
    ],
    scholarships: ["Beasiswa Petra Leader", "Beasiswa Prestasi Akademik SMAN 16", "Beasiswa Putra-Putri Guru"],
    overview:
      "Kampus swasta bergengsi di kawasan Surabaya Selatan yang terkenal dengan keunggulan prodi Arsitektur, Desain Komunikasi Visual, dan Teknik Sipil berstandar internasional.",
    specialFeatures: [
      "Program studi Arsitektur terakreditasi internasional KAAB (Korea Architectural Accrediting Board)",
      "Studio desain, laboratorium beton, dan workshop fabrikasi digital terdepan",
      "Jejaring biro konsultan arsitektur dan konstruksi ternama di tingkat nasional",
    ],
    websiteUrl: "https://admission.petra.ac.id",
    badge: "PUSAT ARSITEKTUR & DESAIN",
  },
  {
    id: "uc",
    name: "UNIVERSITAS CIPUTRA SURABAYA",
    shortName: "UC SURABAYA",
    category: "pts",
    categoryLabel: "KAMPUS SWASTA & GLOBAL",
    location: "CitraLand CBD Boulevard, Surabaya Barat",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "Kampus Entrepreneurship & Bisnis Inovatif",
    alumniSixteenCount: 15,
    utbkTargetScore: "Jalur Rapor Wirausaha & Tes Bakat",
    utbkNumeric: 605,
    snbpRaporTarget: "Rapor Semester 1-4 Rata-rata ≥ 80.0",
    tuitionRange: "Rp 14.000.000 — Rp 28.000.000 / semester",
    admissionPaths: ["Jalur Prestasi Entrepreneur Muda", "Jalur Rapor Mitra", "Jalur Reguler"],
    topMajors: [
      { name: "International Business Management", keketatan: "3.20%", kuota: "150 Kursi", nilaiRaporAman: "86.5" },
      { name: "Kedokteran Umum (FK UC)", keketatan: "2.30%", kuota: "50 Kursi", nilaiRaporAman: "91.0" },
      { name: "Visual Communication Design", keketatan: "3.70%", kuota: "80 Kursi", nilaiRaporAman: "85.5" },
      { name: "Culinary Business", keketatan: "4.20%", kuota: "60 Kursi", nilaiRaporAman: "84.0" },
    ],
    scholarships: ["Beasiswa Founder Ciputra (Potongan 25% - 100%)", "Beasiswa Anak Guru", "Beasiswa Prestasi"],
    overview:
      "Perguruan tinggi berbasis kewirausahaan terdepan di CitraLand Surabaya Barat. Setiap mahasiswa dibimbing merintis dan mengeksekusi bisnis nyata sejak semester pertama.",
    specialFeatures: [
      "Inkubator bisnis Ciputra dengan akses pendanaan modal ventura (Venture Capital)",
      "Dosen praktisi founder startup dan CEO korporasi terkemuka",
      "Kurikulum wajib Entrepreneurship Project setiap semester",
    ],
    websiteUrl: "https://uc.ac.id/admission",
    badge: "KAMPUS ENTREPRENEUR",
  },
  {
    id: "ipb",
    name: "INSTITUT PERTANIAN BOGOR",
    shortName: "IPB UNIVERSITY",
    category: "ptn-luar",
    categoryLabel: "PTN LUAR JAWA TIMUR",
    location: "Dramaga, Bogor, Jawa Barat",
    accreditation: "Unggul (BAN-PT)",
    nationalRank: "#5 Nasional • Top 1 di Bidang Agro-Maritim & Bio-Sains",
    alumniSixteenCount: 8,
    utbkTargetScore: "635 — 695+",
    utbkNumeric: 662,
    snbpRaporTarget: "87.0 — 92.5",
    tuitionRange: "Rp 500.000 — Rp 11.000.000 / semester",
    admissionPaths: ["SNBP", "SNBT", "Jalur Ketua OSIS", "Prestasi Internasional & Nasional (PIN)", "SM-IPB"],
    topMajors: [
      { name: "Kedokteran Hewan (FKH)", keketatan: "2.20%", kuota: "80 Kursi", nilaiRaporAman: "90.5" },
      { name: "Ilmu Komputer", keketatan: "2.50%", kuota: "65 Kursi", nilaiRaporAman: "91.0" },
      { name: "Teknologi Pangan", keketatan: "3.10%", kuota: "75 Kursi", nilaiRaporAman: "89.2" },
      { name: "Sekolah Bisnis (SB-IPB)", keketatan: "2.80%", kuota: "70 Kursi", nilaiRaporAman: "89.8" },
    ],
    scholarships: ["KIP-Kuliah", "Beasiswa Yayasan IPB", "Beasiswa Tanoto", "Beasiswa Bank Indonesia"],
    overview:
      "Pusat inovasi biosains, teknologi pangan, agromaritim, dan kedokteran hewan nomor satu di Indonesia. Memiliki jalur khusus yang sangat bergengsi yaitu Jalur Khusus Ketua OSIS bagi pengurus siswa.",
    specialFeatures: [
      "Jalur pendaftaran khusus Ketua OSIS SMA dengan kuota mandiri langsung",
      "Fakultas Kedokteran Hewan tertua dan terlengkap dengan RS Hewan Pendidikan terbesar",
      "Riset bioteknologi pangan penyumbang 40% inovasi pangan nasional",
    ],
    websiteUrl: "https://admisi.ipb.ac.id",
    badge: "PUSAT BIOSAINS & PANGAN",
  },
];

export default function DatabaseKampusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("alumni");
  const [selectedCampusModal, setSelectedCampusModal] = useState<Campus | null>(null);

  const filteredAndSortedCampuses = useMemo(() => {
    let result = CAMPUS_DATABASE.filter((campus) => {
      const matchesSearch =
        campus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campus.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campus.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campus.topMajors.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        campus.admissionPaths.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "all" || campus.category === selectedCategory;

      return matchesSearch && matchesCat;
    });

    result.sort((a, b) => {
      if (sortBy === "alumni") return b.alumniSixteenCount - a.alumniSixteenCount;
      if (sortBy === "utbk") return b.utbkNumeric - a.utbkNumeric;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-16 selection:bg-[#F5B700] selection:text-[#141414]">
      {/* ================= TOP COMIC ISSUE RIBBON ================= */}
      <section className="bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_3px_0px_#141414] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body font-bold text-xs sm:text-sm tracking-wide text-[#141414]">
          <div className="flex items-center gap-3">
            <span className="bg-[#141414] text-[#FAF8F2] px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider">
              DATABASE RESMI
            </span>
            <span className="hidden sm:inline font-bold">
              ESCAPE 2027 • DIREKTORI AKADEMIK KAMPUS, DAYA TAMPUNG &amp; TARGET UTBK ALUMNI SIXTEEN
            </span>
            <span className="sm:hidden font-bold">DATABASE KAMPUS SIXTEEN</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5E2E] animate-pulse"></span>
            <span>EDISI AKADEMIK 2027</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative overflow-hidden">
          <div className="absolute -top-3 left-6 bg-[#F5B700] text-[#141414] px-3 py-1 border-2 border-[#141414] font-body text-xs uppercase font-extrabold shadow-[2px_2px_0px_#141414] flex items-center gap-1.5 tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ARSIP AKADEMIK PERGURUAN TINGGI SMAN 16 SURABAYA</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#0B5E2E] text-[#FAF8F2] px-3 py-1 font-body text-xs uppercase border-2 border-[#141414] mb-2 font-bold tracking-wide shadow-comic-sm">
                15+ PERGURUAN TINGGI TERVERIFIKASI • 280+ ALUMNI SIXTEEN TERLACAK
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                DATABASE KAMPUS &amp; PANDUAN MASUK PTN
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-semibold leading-relaxed">
                Katalog komprehensif data perguruan tinggi negeri, sekolah kedinasan, dan swasta unggulan. Menampilkan informasi aktual: <strong>daya tampung jurusan</strong>, <strong>rentang skor aman UTBK-SNBT</strong>, <strong>rerata nilai rapor SNBP</strong>, <strong>biaya UKT</strong>, serta <strong>sebaran alumni SMAN 16 Surabaya</strong> yang aktif berkuliah.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-[2px_2px_0px_#141414] text-center">
                <span className="block font-display text-2xl text-[#0B5E2E] leading-none">15</span>
                <span className="font-body text-[10px] uppercase font-bold text-[#141414]">Kampus Terdata</span>
              </div>
              <div className="bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-[2px_2px_0px_#141414] text-center">
                <span className="block font-display text-2xl text-[#0B5E2E] leading-none">280+</span>
                <span className="font-body text-[10px] uppercase font-bold text-[#141414]">Alumni Aktif</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-[#FAF8F2] border-2 border-[#141414] p-3 shadow-[2px_2px_0px_#141414] text-center">
                <span className="block font-display text-2xl text-[#F5B700] leading-none">100%</span>
                <span className="font-body text-[10px] uppercase font-bold text-[#141414]">Data Aktual</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH, CATEGORY & SORT BAR ================= */}
        <section className="space-y-4">
          <div className="bg-white border-comic-4 p-4 shadow-comic flex flex-col md:flex-row gap-3 items-stretch justify-between">
            {/* Search Box */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#141414]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kampus (UNAIR, ITS, STAN), prodi (Kedokteran, Informatika), kota, atau jalur..."
                aria-label="Cari database kampus"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border-2 border-[#141414] font-body text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414] placeholder-gray-500 font-semibold"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-campus" className="font-body font-bold text-xs uppercase text-[#141414] whitespace-nowrap flex items-center gap-1 tracking-wider">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Urutkan:</span>
              </label>
              <select
                id="sort-campus"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Urutkan database kampus"
                className="p-2.5 bg-[#FAF8F2] border-2 border-[#141414] font-body text-xs font-bold text-[#141414] focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414] cursor-pointer"
              >
                <option value="alumni">Alumni Sixteen Terbanyak</option>
                <option value="utbk">Target Skor UTBK Tertinggi</option>
                <option value="name">Nama Kampus (A - Z)</option>
              </select>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3.5 py-2 bg-[#F5B700] text-[#141414] font-body font-bold text-xs uppercase border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:bg-white cursor-pointer tracking-wider"
                >
                  Reset ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { key: "all", label: "Semua Kampus (15)" },
              { key: "ptn-jatim", label: "PTN Jawa Timur" },
              { key: "ptn-luar", label: "PTN Luar Jatim" },
              { key: "kedinasan", label: "Sekolah Kedinasan Ikatan Dinas" },
              { key: "pts", label: "Kampus Swasta & Global" },
            ].map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key as CategoryFilter)}
                  className={`comic-btn font-body font-bold text-xs uppercase px-4 py-2 border-2 border-[#141414] whitespace-nowrap transition-all cursor-pointer tracking-wide ${
                    isSelected
                      ? "bg-[#0B5E2E] text-white shadow-[3px_3px_0px_#141414] -translate-y-0.5"
                      : "bg-[#FAF8F2] text-[#141414] hover:bg-[#F5B700] shadow-[2px_2px_0px_#141414]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-body font-bold uppercase text-[#404940] flex justify-between items-center px-1 tracking-wider">
            <span>Ditemukan {filteredAndSortedCampuses.length} kampus terverifikasi</span>
            <span>SMAN 16 Surabaya • Edisi XVI</span>
          </div>
        </section>

        {/* ================= CAMPUS DATABASE CARDS GRID ================= */}
        <section aria-labelledby="campus-grid-heading" className="space-y-4">
          <h2 id="campus-grid-heading" className="sr-only">
            Daftar Profil Database Kampus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCampuses.map((campus) => (
              <motion.article
                key={campus.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.18 }}
                className="bg-[#FAF8F2] border-comic-4 shadow-comic flex flex-col justify-between overflow-hidden relative group"
              >
                <div>
                  {/* Card Header Strip */}
                  <div className="bg-[#0B5E2E] text-white p-3 sm:p-3.5 border-b-2 border-[#141414] flex justify-between items-center">
                    <span className="font-body text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <Building className="w-4 h-4 text-[#F5B700]" />
                      <span>{campus.categoryLabel}</span>
                    </span>
                    <span className="bg-[#F5B700] text-[#141414] font-body text-xs uppercase px-2.5 py-1 border border-[#141414] font-extrabold tracking-wide">
                      {campus.badge}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col gap-4">
                    {/* Title & Location */}
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#404940] uppercase tracking-wider font-body">
                        <MapPin className="w-3.5 h-3.5 text-[#BA1A1A]" />
                        <span>{campus.location}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl uppercase text-[#141414] leading-tight mt-1">
                        {campus.name}
                      </h3>
                      {campus.nationalRank && (
                        <div className="inline-block mt-2 bg-[#EAE5D9] text-[#141414] text-xs font-body font-bold px-3 py-1 border border-[#141414] shadow-comic-sm">
                          {campus.nationalRank}
                        </div>
                      )}
                    </div>

                    {/* Telemetry Metric Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-white p-3.5 border-2 border-[#141414] shadow-[3px_3px_0px_#141414]">
                      <div className="border-r border-[#141414] pr-2">
                        <span className="block font-body text-xs uppercase text-[#404940] font-bold tracking-wider">ALUMNI SIXTEEN:</span>
                        <span className="font-body font-extrabold text-lg sm:text-xl text-[#0B5E2E] leading-tight">
                          {campus.alumniSixteenCount} Mahasiswa
                        </span>
                      </div>
                      <div className="pl-2">
                        <span className="block font-body text-xs uppercase text-[#404940] font-bold tracking-wider">TARGET UTBK:</span>
                        <span className="font-body font-extrabold text-lg text-[#141414] leading-tight">
                          {campus.utbkTargetScore}
                        </span>
                      </div>
                      <div className="col-span-2 pt-2.5 border-t border-[#141414] flex justify-between items-center text-xs sm:text-sm font-bold font-body">
                        <span className="text-[#404940]">Nilai Rapor SNBP Aman:</span>
                        <span className="font-body font-extrabold text-[#0B5E2E] text-base">{campus.snbpRaporTarget}</span>
                      </div>
                    </div>

                    {/* Brief Overview */}
                    <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed font-medium line-clamp-2">
                      {campus.overview}
                    </p>

                    {/* Top Majors Quick List */}
                    <div className="space-y-1.5">
                      <span className="font-body text-xs uppercase text-[#141414] block font-bold tracking-wider">
                        JURUSAN FAVORIT &amp; KEKETATAN:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {campus.topMajors.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="bg-[#EAE5D9] text-[#141414] text-xs font-body font-bold px-2.5 py-1 border border-[#141414]"
                          >
                            {m.name} ({m.keketatan})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Admission Paths */}
                    <div className="space-y-1">
                      <span className="font-body text-xs uppercase text-[#404940] block font-bold tracking-wider">
                        JALUR MASUK TERBUKA:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-xs font-bold text-[#0B5E2E] font-body">
                        {campus.admissionPaths.slice(0, 3).join(" • ")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => setSelectedCampusModal(campus)}
                    className="w-full comic-btn bg-[#FAF8F2] text-[#141414] hover:bg-[#F5B700] font-body text-xs sm:text-sm uppercase py-3 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center gap-2 cursor-pointer font-bold tracking-wider"
                  >
                    <span>Buka Arsip Lengkap &amp; Kuota</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ================= DETAILED CAMPUS DOSSIER MODAL ================= */}
        <AnimatePresence>
          {selectedCampusModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#FAF8F2] border-comic-4 shadow-comic-lg max-w-2xl w-full p-6 sm:p-8 relative my-8 overflow-hidden"
              >
                {/* Comic Halftone Accent Corner */}
                <div className="absolute top-0 right-0 w-36 h-36 benday-emerald opacity-20 pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCampusModal(null)}
                  className="absolute top-4 right-4 bg-[#F5B700] text-[#141414] font-body font-bold text-sm w-8 h-8 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center hover:bg-white cursor-pointer z-20"
                >
                  ✕
                </button>

                <div className="space-y-5 relative z-10">
                  {/* Modal Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-[#0B5E2E] text-[#FAF8F2] font-body font-bold text-xs uppercase px-3 py-1 border border-[#141414] tracking-wide">
                        {selectedCampusModal.categoryLabel}
                      </span>
                      <span className="bg-[#F5B700] text-[#141414] font-body font-extrabold text-xs uppercase px-3 py-1 border border-[#141414] tracking-wide">
                        {selectedCampusModal.accreditation}
                      </span>
                      <span className="font-body text-xs font-bold text-[#404940] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#BA1A1A]" />
                        <span>{selectedCampusModal.location}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl uppercase text-[#141414] leading-tight">
                      {selectedCampusModal.name} ({selectedCampusModal.shortName})
                    </h3>
                    {selectedCampusModal.nationalRank && (
                      <p className="font-body font-bold text-xs sm:text-sm text-[#0B5E2E] mt-1.5">
                        {selectedCampusModal.nationalRank}
                      </p>
                    )}
                  </div>

                  {/* Quick Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3.5 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] text-center">
                    <div>
                      <span className="block font-body font-bold text-[11px] uppercase text-[#404940] tracking-wider">ALUMNI SIXTEEN:</span>
                      <span className="font-body font-black text-xl text-[#0B5E2E]">{selectedCampusModal.alumniSixteenCount} Orang</span>
                    </div>
                    <div>
                      <span className="block font-body font-bold text-[11px] uppercase text-[#404940] tracking-wider">TARGET UTBK:</span>
                      <span className="font-body font-black text-lg text-[#141414]">{selectedCampusModal.utbkTargetScore}</span>
                    </div>
                    <div>
                      <span className="block font-body font-bold text-[11px] uppercase text-[#404940] tracking-wider">RAPOR SNBP:</span>
                      <span className="font-body font-black text-lg text-[#0B5E2E]">{selectedCampusModal.snbpRaporTarget}</span>
                    </div>
                    <div>
                      <span className="block font-body font-bold text-[11px] uppercase text-[#404940] tracking-wider">AKREDITASI:</span>
                      <span className="font-body font-black text-lg text-[#141414]">{selectedCampusModal.accreditation.split(" ")[0]}</span>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="p-3.5 bg-[#EAE5D9] border-2 border-[#141414]">
                    <span className="font-body font-bold text-xs sm:text-sm uppercase text-[#141414] block mb-1 tracking-wider">
                      PROFIL &amp; KEUNGGULAN KAMPUS:
                    </span>
                    <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed font-medium">
                      {selectedCampusModal.overview}
                    </p>
                  </div>

                  {/* Program Studi Favorit Table */}
                  <div className="space-y-2">
                    <span className="font-body font-bold text-xs sm:text-sm uppercase text-[#141414] block tracking-wider">
                      DATA KEKETATAN &amp; DAYA TAMPUNG PRODI UNGGULAN:
                    </span>
                    <div className="border-2 border-[#141414] overflow-x-auto bg-white shadow-[2px_2px_0px_#141414]">
                      <table className="w-full text-left font-body text-xs">
                        <thead className="bg-[#0B5E2E] text-white font-body font-bold uppercase text-xs tracking-wider">
                          <tr>
                            <th className="p-2.5 border-r border-[#141414]">Nama Program Studi</th>
                            <th className="p-2.5 border-r border-[#141414]">Keketatan</th>
                            <th className="p-2.5 border-r border-[#141414]">Daya Tampung</th>
                            <th className="p-2.5">Rerata Rapor Aman</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#141414]">
                          {selectedCampusModal.topMajors.map((m, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-[#FAF8F2]" : "bg-white"}>
                              <td className="p-2.5 font-bold text-[#141414] border-r border-[#141414]">{m.name}</td>
                              <td className="p-2.5 text-[#BA1A1A] font-extrabold border-r border-[#141414]">{m.keketatan}</td>
                              <td className="p-2.5 border-r border-[#141414] font-semibold">{m.kuota}</td>
                              <td className="p-2.5 font-body font-extrabold text-[#0B5E2E]">{m.nilaiRaporAman}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Biaya Kuliah & Beasiswa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white border border-[#141414] space-y-1">
                      <span className="font-body font-bold uppercase text-xs text-[#0B5E2E] block tracking-wider">BIAYA KULIAH (UKT):</span>
                      <p className="font-body font-semibold text-[#141414]">{selectedCampusModal.tuitionRange}</p>
                    </div>
                    <div className="p-3 bg-white border border-[#141414] space-y-1">
                      <span className="font-body font-bold uppercase text-xs text-[#0B5E2E] block tracking-wider">BEASISWA TERSEDIA:</span>
                      <p className="font-body font-medium text-[#404940]">{selectedCampusModal.scholarships.join(", ")}</p>
                    </div>
                  </div>

                  {/* Jalur Pendaftaran */}
                  <div className="p-3 bg-white border border-[#141414] text-xs">
                    <span className="font-body font-bold uppercase text-xs text-[#141414] block mb-1 tracking-wider">JALUR SELEKSI PENERIMAAN:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCampusModal.admissionPaths.map((p, idx) => (
                        <span key={idx} className="bg-[#FAF8F2] px-2.5 py-1 border border-[#141414] font-bold text-[#0B5E2E] font-body text-xs">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedCampusModal.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0B5E2E] text-white font-body font-bold text-xs sm:text-sm uppercase py-3.5 text-center border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#1E8449] flex items-center justify-center gap-2 cursor-pointer tracking-wider"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka Portal Resmi PMB {selectedCampusModal.shortName}</span>
                    </a>
                    <Link
                      href="/alumni"
                      className="px-5 py-3.5 bg-[#F5B700] text-[#141414] font-body font-bold text-xs sm:text-sm uppercase text-center border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-white flex items-center justify-center gap-1.5 tracking-wider"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Tanya Alumni Sixteen</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
