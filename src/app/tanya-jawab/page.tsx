"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles,
  Info,
  Share2,
  Compass,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: "biaya-tiket",
    question: "Apakah acara ESCAPE 2027 dipungut biaya tiket masuk?",
    answer:
      "Tidak ada pungutan biaya sama sekali (100% Gratis)! Seluruh siswa SMAN 16 Surabaya, siswa tamu lintas sekolah, serta orang tua/wali murid dapat menghadiri acara dan menikmati seluruh sesi talkshow serta konsultasi booth secara cuma-cuma.",
    category: "Tiket & Akses",
  },
  {
    id: "presensi-barcode",
    question: "Bagaimana cara melakukan presensi dan registrasi kedatangan?",
    answer:
      "Cukup buka e-ticket barcode di layar ponsel Anda, lalu tunjukkan kepada petugas panitia di Meja Check-in (berada di paling depan Gedung Kesenian GK). Petugas akan memindai barcode dan memberikan gelang ID resmi komik beserta booklet denah saku.",
    category: "Presensi",
  },
  {
    id: "orang-tua-wali",
    question: "Apakah orang tua atau wali murid diperkenankan mendampingi siswa?",
    answer:
      "Sangat diperkenankan! Sesi Gelar Wicara Akbar di dalam Gedung Kesenian dan konsultasi booth kampus terbuka luas bagi orang tua untuk mendiskusikan peluang beasiswa, pembiayaan kuliah, dan pemilihan jurusan bersama perwakilan universitas.",
    category: "Umum",
  },
  {
    id: "e-certificate",
    question: "Apakah disediakan sertifikat keikutsertaan digital (e-Certificate)?",
    answer:
      "Ya! e-Certificate resmi bertandatangan Kepala SMAN 16 Surabaya akan dikirimkan otomatis ke email terdaftar bagi peserta yang telah melakukan presensi scan barcode dan mengisi formulir evaluasi singkat pameran.",
    category: "Fasilitas",
  },
  {
    id: "simulasi-rapor",
    question: "Apakah booth universitas menyediakan simulasi nilai rapor (SNBP)?",
    answer:
      "Ya! Paviliun PTN favorit (seperti UNAIR, ITS, UGM, UB) dan lembaga bimbingan belajar menyediakan konsultasi rasionalisasi nilai rapor semester 1-5. Sangat disarankan membawa rekap nilai rapor atau salinan sertifikat prestasi.",
    category: "Konsultasi",
  },
  {
    id: "tata-tertib-pakaian",
    question: "Bagaimana ketentuan seragam dan tata tertib berpakaian pengunjung?",
    answer:
      "Siswa SMAN 16 wajib mengenakan seragam sekolah rapi hari Kamis atau seragam identitas sekolah. Pengunjung tamu atau orang tua dianjurkan mengenakan pakaian bebas sopan berkerah dan wajib mengenakan sepatu (tidak diperkenankan sandal jepit).",
    category: "Tata Tertib",
  },
];

export default function TanyaJawabPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>("biaya-tiket");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    sekolah: "",
    kontak: "",
    kategori: "Presensi & Tiket",
    pertanyaan: "",
  });

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nama: "",
        sekolah: "",
        kontak: "",
        kategori: "Presensi & Tiket",
        pertanyaan: "",
      });
    }, 3500);
  };

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-16 selection:bg-[#F5B700] selection:text-[#141414]">
      {/* ================= TOP COMIC ISSUE RIBBON ================= */}
      <section className="bg-[#F5B700] border-b-4 border-[#141414] py-2 px-4 shadow-[0px_3px_0px_#141414] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body font-bold text-xs sm:text-sm tracking-wide text-[#141414]">
          <div className="flex items-center gap-3">
            <span className="bg-[#141414] text-[#FAF8F2] px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
              EDISI KHUSUS
            </span>
            <span className="hidden sm:inline">
              PUSAT BANTUAN &amp; KOTAK SURAT PANITIA ESCAPE 2027 • SMAN 16 SURABAYA
            </span>
            <span className="sm:hidden">PUSAT BANTUAN • SMAN 16</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#FAF8F2] px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414]">
            <Clock className="w-3.5 h-3.5 text-[#0B5E2E]" />
            <span>RESPON CEPAT 08.00 - 16.00 WIB</span>
          </div>
        </div>
      </section>

      {/* ================= PAGE MASTHEAD BANNER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="w-full bg-[#EAE5D9] border-comic-4 p-6 sm:p-8 shadow-comic-lg relative mt-3">
          <div className="absolute -top-3.5 left-6 bg-[#0B5E2E] text-[#FAF8F2] px-3.5 py-1 border-2 border-[#141414] font-display text-xs uppercase font-semibold tracking-wider shadow-[2px_2px_0px_#141414] flex items-center gap-1.5 z-20">
            <HelpCircle className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>DIREKTORI TANYA JAWAB &amp; DUKUNGAN RESMI</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#F5B700] text-[#141414] px-2.5 py-0.5 font-body font-extrabold text-xs uppercase tracking-wide border border-[#141414] mb-2">
                FAQ RESMI • KOTAK SURAT PANITIA • KONTAK SEKRETARIAT OSIS
              </span>
              <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#141414] tracking-tight leading-none">
                PUSAT BANTUAN &amp; TANYA JAWAB (FAQ)
              </h1>
              <p className="font-body text-sm sm:text-base text-[#404940] mt-3 font-medium leading-relaxed">
                Punya pertanyaan seputar tiket presensi, jadwal sesi talkshow, denah stan expo, atau ketentuan berkunjung? Temukan jawaban resmi di bawah ini atau kirimkan pesan langsung ke panitia!
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-[#FAF8F2] border-[3px] border-[#141414] p-3 shadow-[3px_3px_0px_#141414] text-center min-w-[140px]">
                <div className="font-display text-xl text-[#0B5E2E] leading-none">PANITIA SIAGA</div>
                <div className="font-body text-[11px] font-bold text-[#141414] uppercase mt-1">Sie Acara &amp; Humas</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ASYMMETRIC 2-COLUMN SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: KOTAK SURAT PANITIA (5 COLS) */}
          <section className="lg:col-span-5 bg-[#FAF8F2] border-comic-4 shadow-comic-lg overflow-hidden">
            <div className="bg-[#0B5E2E] text-[#FAF8F2] px-5 py-3.5 border-b-4 border-[#141414] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F5B700]" />
                <h2 className="font-display text-lg uppercase tracking-wider text-[#FAF8F2]">
                  KOTAK SURAT PANITIA ESCAPE
                </h2>
              </div>
              <span className="bg-[#F5B700] text-[#141414] font-body font-extrabold text-xs px-2 py-0.5 border border-[#141414]">
                P-01
              </span>
            </div>

            <div className="p-6 space-y-5">
              <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed font-medium">
                Butuh informasi khusus rombongan sekolah, pertanyaan sponsorship, atau mengalami kendala teknis? Tulis transmisi pesanmu langsung ke tim desk panitia.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-[#A7F4B5] border-2 border-[#141414] text-center space-y-2 shadow-[3px_3px_0px_#141414]"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#0B5E2E] mx-auto" />
                  <h3 className="font-display text-xl uppercase text-[#141414]">
                    Pesan Berhasil Terkirim!
                  </h3>
                  <p className="font-body text-xs text-[#141414] font-semibold">
                    Terima kasih telah menghubungi panitia ESCAPE 2027. Tim sekretariat akan membalas via WhatsApp/Email dalam 1x24 jam kerja.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide text-[#141414] mb-1">
                      Nama Lengkap Siswa / Orang Tua *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      placeholder="Contoh: Arya Bimantara / Ibu Sulistiyowati"
                      className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide text-[#141414] mb-1">
                      Asal Kelas / Sekolah *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sekolah}
                      onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
                      placeholder="Contoh: XII-4 SMAN 16 Surabaya / Tamu Luar"
                      className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide text-[#141414] mb-1">
                      Nomor WhatsApp / Email Aktif *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.kontak}
                      onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                      placeholder="Contoh: 0812-3456-7890 atau email@domain.com"
                      className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                    />
                  </div>

                  <div>
                    <label htmlFor="kategori-pertanyaan" className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide text-[#141414] mb-1">
                      Kategori Pertanyaan *
                    </label>
                    <select
                      id="kategori-pertanyaan"
                      aria-label="Kategori Pertanyaan"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                    >
                      <option value="Presensi & Tiket">Presensi &amp; Tiket Masuk</option>
                      <option value="Denah Acara & Booth">Denah Acara &amp; Lokasi Booth</option>
                      <option value="Jadwal Talkshow & Konsultasi">Jadwal Talkshow &amp; Konsultasi</option>
                      <option value="Kesehatan & Fasilitas">Kesehatan &amp; Fasilitas Pendukung</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body font-bold text-xs sm:text-sm uppercase tracking-wide text-[#141414] mb-1">
                      Isi Pertanyaan Detail *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.pertanyaan}
                      onChange={(e) => setFormData({ ...formData, pertanyaan: e.target.value })}
                      placeholder="Tuliskan pertanyaanmu secara lengkap dan jelas di sini..."
                      className="w-full p-2.5 bg-white border-2 border-[#141414] font-body text-xs font-semibold focus:outline-none focus:border-[#0B5E2E] shadow-[2px_2px_0px_#141414]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="comic-btn w-full bg-[#0B5E2E] text-[#FAF8F2] font-display font-medium text-xs sm:text-sm uppercase tracking-wider py-3 border-2 border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#1F6C3A] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#F5B700]" />
                    <span>Kirim Pesan ke Panitia</span>
                  </button>
                </form>
              )}
            </div>

            <div className="border-t-2 border-[#141414] bg-[#EAE5D9] p-3 text-center font-body text-[10px] uppercase tracking-widest text-[#404940] font-extrabold">
              OFFICIAL DISPATCH SYSTEM // ESCAPE ISSUE XVI
            </div>
          </section>

          {/* RIGHT COLUMN: ACCORDION FAQ TERVERIFIKASI (7 COLS) */}
          <section className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between bg-[#F5B700] border-comic-4 p-3.5 shadow-comic">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0B5E2E]" />
                <h2 className="font-display text-base sm:text-lg uppercase text-[#141414]">
                  TANYA JAWAB (FAQ) TERVERIFIKASI
                </h2>
              </div>
              <span className="bg-[#0B5E2E] text-[#FAF8F2] font-body font-bold text-xs uppercase tracking-wide px-2.5 py-0.5 border border-[#141414]">
                6 TOPIK UTAMA
              </span>
            </div>

            {/* Accordion FAQ Items */}
            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-[#FAF8F2] border-comic-4 shadow-comic overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-start gap-4 hover:bg-[#EAE5D9]/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="bg-[#0B5E2E] text-[#FAF8F2] font-body font-extrabold text-xs w-7 h-7 flex items-center justify-center border-2 border-[#141414] shrink-0 shadow-[2px_2px_0px_#141414]">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="block font-body font-bold text-xs text-[#0B5E2E] uppercase tracking-wide">
                            {faq.category}
                          </span>
                          <span className="font-display font-medium text-sm sm:text-base text-[#141414] uppercase pt-0.5 block leading-snug">
                            {faq.question}
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-[#141414] shrink-0 transition-transform duration-200 mt-1 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 sm:px-5 pb-5 pt-1"
                        >
                          <div className="relative bg-white border-2 border-[#141414] p-4 shadow-[3px_3px_0px_#141414]">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="w-5 h-5 text-[#0B5E2E] shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <span className="font-body font-extrabold text-xs uppercase tracking-wide text-[#0B5E2E] block">
                                  JAWABAN RESMI PANITIA:
                                </span>
                                <p className="font-body text-xs sm:text-sm text-[#141414] font-medium leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Comic Tip Box */}
            <div className="bg-[#EAE5D9] border-comic-4 p-5 shadow-comic flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F5B700] text-[#141414] border-2 border-[#141414] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#141414]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-body font-extrabold text-sm uppercase tracking-wide text-[#0B5E2E]">
                  TIPS KUNJUNGAN EXPO
                </h3>
                <p className="font-body text-xs text-[#404940] mt-1 leading-relaxed font-medium">
                  Siapkan salinan sertifikat prestasi lomba atau rekap nilai rapor semester 1-5 Anda untuk berkonsultasi rasionalisasi prodi langsung di booth universitas impian!
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ================= SCHOOL OFFICIAL CONTACT INFO CARD ================= */}
        <section className="w-full bg-[#EAE5D9] border-comic-4 shadow-comic-lg relative mt-4 overflow-hidden">
          <div className="bg-[#141414] text-[#FAF8F2] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-5 h-5 text-[#F5B700]" />
              <h2 className="font-display text-base sm:text-lg uppercase tracking-wider text-[#FAF8F2]">
                KONTAK RESMI PANITIA &amp; KAMPUS SMAN 16 SURABAYA
              </h2>
            </div>
            <span className="hidden sm:inline-block font-body font-bold text-xs uppercase tracking-widest text-[#F5B700]">
              DIREKTORI SEKRETARIAT
            </span>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Card */}
            <div className="bg-[#FAF8F2] border-comic-4 p-5 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#0B5E2E] font-body font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">
                  <MapPin className="w-4 h-4 text-[#BA1A1A]" />
                  <span>LOKASI SEKRETARIAT</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#141414] font-semibold leading-relaxed">
                  Ruang Sekretariat OSIS/MPK SMAN 16 Surabaya, Jl. Prapen Indah I, Prapen, Kec. Tenggilis Mejoyo, Kota Surabaya
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-[#141414] font-body font-bold text-[11px] uppercase tracking-wide text-[#404940]">
                Gedung Utama SMAN 16 Lantai 1
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#FAF8F2] border-comic-4 p-5 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#0B5E2E] font-body font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">
                  <PhoneCall className="w-4 h-4 text-[#0B5E2E]" />
                  <span>WHATSAPP SIE ACARA</span>
                </div>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-medium text-lg sm:text-xl text-[#0B5E2E] hover:underline block leading-tight tracking-wider"
                >
                  +62 812-3456-7890
                </a>
                <p className="font-body text-xs text-[#404940] mt-1.5 leading-relaxed font-medium">
                  Layanan pesan cepat untuk informasi darurat, konfirmasi rombongan sekolah, &amp; validasi presensi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-[#141414] font-body font-bold text-[11px] uppercase tracking-wide text-[#404940]">
                Senin - Sabtu (08.00 - 16.00 WIB)
              </div>
            </div>

            {/* Instagram Card */}
            <div className="bg-[#FAF8F2] border-comic-4 p-5 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#0B5E2E] font-body font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">
                  <Share2 className="w-4 h-4 text-[#D97706]" />
                  <span>INSTAGRAM RESMI</span>
                </div>
                <a
                  href="https://instagram.com/escapesman16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-medium text-lg sm:text-xl text-[#0B5E2E] hover:underline block leading-tight tracking-wider"
                >
                  @escapesman16
                </a>
                <p className="font-body text-xs text-[#404940] mt-1.5 leading-relaxed font-medium">
                  Ikuti highlight kakak alumni, live story hari-H, dan pengumuman kuis doorprize expo!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-[#141414] font-body font-bold text-[11px] uppercase tracking-wide text-[#404940]">
                #ESCAPE2027 #SMAN16Surabaya
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
