import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#EAE5D9] border-t-4 border-[#141414] shadow-[0px_-4px_0px_#141414] mt-auto relative z-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        {/* Top Strip Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b-2 border-[#141414] pb-8">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 shrink-0 bg-[#141414] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] rounded-full overflow-hidden">
                <Image
                  src="/logo-escape-2027.png"
                  alt="Logo Resmi ESCAPE 2027"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#0B5E2E] text-white px-3 py-1 border-2 border-[#141414] shadow-[2px_2px_0px_#141414] transform -rotate-1 inline-block">
                <span className="font-display text-xl uppercase text-white">
                  ESCAPE 2027
                </span>
              </div>
              <span className="font-body text-xs bg-[#F5B700] text-[#141414] px-2 py-0.5 border border-[#141414] font-extrabold uppercase tracking-wider">
                ISSUE XVI
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#404940] leading-relaxed">
              Exhibition Sixteen Campus Expo — Pameran edukasi dan karier resmi yang diselenggarakan oleh panitia kolaborasi siswa & bimbingan konseling SMAN 16 Surabaya. Memandu langkah generasi penerus menuju gerbang perguruan tinggi impian dengan kekuatan tekad sejati.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B5E2E]">
              <span className="w-2 h-2 bg-[#0B5E2E] rounded-full inline-block" />
              <span>Tema: Green Lantern Willpower Corps</span>
            </div>
          </div>

          {/* Navigasi Cepat & Info Kampus */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-body font-extrabold text-xs sm:text-sm uppercase text-[#0B5E2E] border-b-2 border-[#141414] pb-1 tracking-wider">
              NAVIGASI EDISI
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link href="/" className="hover:text-[#0B5E2E] hover:underline">
                Beranda
              </Link>
              <Link href="/rundown" className="hover:text-[#0B5E2E] hover:underline">
                Rundown Acara
              </Link>
              <Link href="/direktori-stan" className="hover:text-[#0B5E2E] hover:underline">
                Database Kampus
              </Link>
              <Link href="/peta-kampus" className="hover:text-[#0B5E2E] hover:underline">
                Denah Acara
              </Link>
              <Link href="/alumni" className="hover:text-[#0B5E2E] hover:underline">
                Alumni Sixteen
              </Link>
              <Link href="/tanya-jawab" className="hover:text-[#0B5E2E] hover:underline">
                Tanya Jawab (FAQ)
              </Link>
            </div>
            <div className="mt-2 p-2 bg-[#FAF8F2] border border-[#141414] text-[11px] text-[#404940]">
              <span className="font-bold block text-[#141414]">LOKASI ACARA:</span>
              Gedung Pertemuan & Serbaguna SMAN 16 Surabaya, Jl. Prapen Indah I, Surabaya
            </div>
          </div>

          {/* Media Sosial & Kontak */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-body font-extrabold text-xs sm:text-sm uppercase text-[#0B5E2E] border-b-2 border-[#141414] pb-1 tracking-wider">
              SALURAN RESMI
            </span>
            <div className="flex flex-col gap-2 text-xs font-medium">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-1.5 bg-white border border-[#141414] shadow-comic-sm hover:bg-[#F5B700] transition-colors"
              >
                <span className="font-body font-black text-xs text-[#0B5E2E]">IG</span>
                <span className="font-semibold text-[11px]">@escapesman16</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-1.5 bg-white border border-[#141414] shadow-comic-sm hover:bg-[#F5B700] transition-colors"
              >
                <span className="font-body font-black text-xs text-[#0B5E2E]">TT</span>
                <span className="font-semibold text-[11px]">@escapesman16</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-1.5 bg-white border border-[#141414] shadow-comic-sm hover:bg-[#F5B700] transition-colors"
              >
                <span className="font-body font-black text-xs text-[#0B5E2E]">YT</span>
                <span className="font-semibold text-[11px]">SMAN 16 Surabaya</span>
              </a>
            </div>
          </div>
        </div>

        {/* Comic Legal & Issue Stamps */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-body text-xs font-semibold text-[#141414]">
            © 2027 SMAN 16 SURABAYA • ESCAPE ISSUE XVI • ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-body font-extrabold text-[10px] bg-[#0B5E2E] text-white px-2 py-0.5 border border-[#141414] uppercase tracking-wider shadow-comic-sm">
              AKREDITASI A
            </span>
            <span className="font-body font-extrabold text-[10px] bg-[#F5B700] text-[#141414] px-2 py-0.5 border border-[#141414] uppercase tracking-wider shadow-comic-sm">
              CETAKAN 01/2027
            </span>
            <span className="font-body font-extrabold text-[10px] bg-white text-[#141414] px-2 py-0.5 border border-[#141414] uppercase tracking-wider shadow-comic-sm">
              LIGHT MODE EDITION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
