import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const comicDisplay = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-comic-display",
  display: "swap",
});

const comicBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-comic-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESCAPE 2027 — Exhibition Sixteen Campus Expo | SMAN 16 Surabaya",
  description:
    "Pameran edukasi kampus SMAN 16 Surabaya — Kamis, 21 Januari 2027. Temukan kampus impianmu bersama Green Lantern Willpower Corps!",
  icons: {
    icon: "/logo-escape-2027.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${comicDisplay.variable} ${comicBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F2] text-[#141414] font-body selection:bg-[#F5B700] selection:text-[#141414]">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
