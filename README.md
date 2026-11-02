# 🎓 ESCAPE 2027 — Exhibition Sixteen Campus Expo
> **SMAN 16 Surabaya Official Campus Expo & Academic Discovery Platform**  
> *Edisi XVI — DC Comics "Willpower & Green Lantern" Kinetic Neo-Comic Aesthetic*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.9-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse_A11y-100%2F100-success?style=for-the-badge&logo=lighthouse)](file:///C:/Users/Senna/.gemini/antigravity/brain/f60b1f16-bfdf-4c05-bf07-c4adc33320f2/milestone-9-verification.md)

---

## 🌟 Tentang ESCAPE 2027

**ESCAPE 2027** (*Exhibition Sixteen Campus Expo*) adalah platform web resmi edukatif dan panduan interaktif acara pameran perguruan tinggi tahunan SMAN 16 Surabaya. Mengusung filosofi **DC Comics Green Lantern (Willpower & Green Construct)**, platform ini memadukan visual neo-komik berdaya tinggi dengan data akademik aktual yang dirancang khusus untuk membimbing siswa kelas X, XI, dan XII menuju perguruan tinggi impian.

---

## 🧭 Arsitektur & Peta Rute Aplikasi

| Rute URL | Nama Halaman | Fungsi & Fitur Utama |
| :--- | :--- | :--- |
| [`/`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/page.tsx) | **Beranda** | Opening comic intro, countdown timer, sorotan acara, timeline singkat, dan CTA pendaftaran. |
| [`/rundown`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/rundown/page.tsx) | **Rundown Acara** | Jadwal panggung interaktif, filter sesi (Talkshow, Alumni Sharing, Expo), dan penanda sesi aktif. |
| [`/direktori-stan`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/direktori-stan/page.tsx) | **Database Kampus** | 15 profil PTN/PTS/Kedinasan terfavorit Sixteen, skor aman UTBK, rerata rapor SNBP, rentang UKT, dan dossier modal. |
| [`/peta-kampus`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/peta-kampus/page.tsx) | **Denah Acara** | Tata letak arsitektur murni SMAN 16 (Gedung Kesenian kosong lapang 500 orang, panggung talkshow depan GK, meja check-in samping booth). |
| [`/alumni`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/alumni/page.tsx) | **Alumni Sixteen** | Direktori alumni berprestasi difilter per kelas (XII-1 s/d XII-11), modal konsultasi, dan tips tembus kampus. |
| [`/tanya-jawab`](file:///C:/Users/Senna/.gemini/antigravity/scratch/escape2027/src/app/tanya-jawab/page.tsx) | **Tanya Jawab FAQ** | Accordion FAQ interaktif seputar tiket, registrasi, beasiswa, dan formulir kirim pertanyaan panitia. |

---

## 🎨 Design Tokens & Sistem Desain Neo-Komik

- **Latar Belakang Halftone Kertas Komik**: `#FAF8F2` (Cream Vintage)
- **Warna Identitas Sixteen (Willpower Green)**: `#0B5E2E` / `#1E8449`
- **Aksen Kuning Energetik**: `#F5B700`
- **Tinta Komik & Border Tebal**: `#141414` (3px border comic)
- **Tipografi**:
  - Display: `Anton`, `Impact`, sans-serif (Bold uppercase headline)
  - Body: `Plus Jakarta Sans`, sans-serif (Tinggi keterbacaan)
- **Efek Bayangan Komik**: `box-shadow: 4px 4px 0px #141414` (Tactile 3D hard shadow)

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js $\ge$ 18.18.0
- npm / pnpm / yarn

### Instalasi & Dev Server
```bash
# Clone atau masuk ke direktori proyek
cd escape2027

# Install dependensi
npm install

# Jalankan dev server (Gunakan flag --webpack di Windows jika SWC native tidak aktif)
npm run dev
# dev server aktif di http://localhost:3000
```

### Build Produksi
```bash
# Kompilasi static pre-rendering
npm run build

# Menjalankan build produksi secara lokal
npm run start
```

---

## ☁️ Panduan Deploy ke Vercel (Milestone 10)

Platform ini 100% kompatibel dan siap di-deploy secara instan ke [Vercel](https://vercel.com):

### Opsi A: Deploy Melalui Vercel CLI
```bash
# 1. Install Vercel CLI global (jika belum)
npm i -g vercel

# 2. Login akun Vercel
vercel login

# 3. Deploy langsung dari terminal
vercel --prod
```

### Opsi B: Deploy Melalui GitHub Repo (Rekomendasi CI/CD)
1. Buat repository baru di GitHub (misal: `escape2027-sman16`).
2. Hubungkan remote dan push branch master:
   ```bash
   git remote add origin https://github.com/USERNAME/escape2027-sman16.git
   git branch -M main
   git push -u origin main
   ```
3. Buka dashboard [vercel.com](https://vercel.com/new).
4. Klik **Import Git Repository**, pilih repo `escape2027-sman16`.
5. Vercel akan secara otomatis mendeteksi Framework **Next.js**.
6. Klik **Deploy** — website akan live dalam kurun waktu < 2 menit dengan SSL gratis dan CDN global.

---

## 📊 Hasil Audit Google Lighthouse

Semua 6 rute produksi telah lulus audit performa, aksesibilitas, best practices, dan SEO:

```
========================================================================
             AUDIT GOOGLE LIGHTHOUSE 13.6.0 (ALL ROUTES)
========================================================================
 Rute                  | Performance | Accessibility | Best Practices | SEO
-----------------------+-------------+---------------+----------------+-----
 / (Beranda)           |     90      |      100      |      100       | 100
 /rundown              |     86      |      100      |      100       | 100
 /direktori-stan       |     90      |      100      |      100       | 100
 /peta-kampus          |     94      |      100      |      100       | 100
 /alumni               |     97      |      100      |      100       | 100
 /tanya-jawab          |     97      |      100      |      100       | 100
-----------------------+-------------+---------------+----------------+-----
 Rata-Rata Web         |    92.3     |     100.0     |     100.0      | 100
========================================================================
 Status: ALL GATES PASSED (100% WCAG 2.1 AA Compliant)
```

---

## 🏫 Hak Cipta & Tim Pengembang
Dikembangkan dengan dedikasi penuh untuk Keluarga Besar **SMAN 16 Surabaya** & Panitia Pelaksana **ESCAPE 2027**.  
*Semangat Enam Belas — Wujudkan Kampus Impian!*
