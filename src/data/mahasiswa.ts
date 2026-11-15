import rawData from "./mahasiswa_terdata_fix.json";

export interface MahasiswaRecord {
  no: number;
  no_sekolah: number;
  nama: string;
  nisn: string;
  nis: number;
  kelas: string;
  skor_jml: number;
  status_snbp: "ELIGIBLE" | "NON ELIGIBLE";
  perguruan_tinggi: string;
  kategori_pt: "PTN" | "PTS";
  lokasi_kampus: string;
  zona_wilayah: string;
  program_studi: string;
  program_studi_asli: string;
  status_validasi: string;
  keterangan: string;
}

export interface MahasiswaDatabase {
  metadata: {
    judul: string;
    tahun_ajaran: string;
    sumber_data: string[];
    total_populasi_angkatan: number;
    total_record_mentah_pddikti: number;
    total_siswa_fix_termasuk: number;
    rincian_pengecualian: {
      total_dikecualikan: number;
      duplikat_homonim_dihapus: number;
      ambigu_perlu_konfirmasi_luar_kota: number;
    };
  };
  ringkasan: {
    berdasarkan_status_snbp: {
      "NON ELIGIBLE": number;
      ELIGIBLE: number;
    };
    jumlah_perguruan_tinggi: number;
    jumlah_program_studi: number;
    sebaran_per_kelas: Record<string, number>;
    sebaran_per_perguruan_tinggi: Record<string, number>;
  };
  data: MahasiswaRecord[];
}

export const MAHASISWA_DB = rawData as unknown as MahasiswaDatabase;
export const MAHASISWA_LIST: MahasiswaRecord[] = MAHASISWA_DB.data;

export const CAMPUS_SHORT_NAMES: Record<string, string> = {
  "UNIVERSITAS AIRLANGGA": "UNAIR",
  "INSTITUT TEKNOLOGI SEPULUH NOPEMBER": "ITS",
  "UNIVERSITAS NEGERI SURABAYA": "UNESA",
  "UNIVERSITAS PEMBANGUNAN NASIONAL VETERAN JAWA TIMUR": "UPN JATIM",
  "POLITEKNIK PERKAPALAN NEGERI SURABAYA": "PPNS",
  "POLITEKNIK ELEKTRONIKA NEGERI SURABAYA": "PENS",
  "INSTITUT TEKNOLOGI BANDUNG": "ITB",
  "UNIVERSITAS SURABAYA": "UBAYA",
  "UNIVERSITAS 17 AGUSTUS 1945 SURABAYA": "UNTAG SBY",
  "UNIVERSITAS HANG TUAH": "UHT SBY",
  "UNIVERSITAS GADJAH MADA": "UGM",
  "UNIVERSITAS WIJAYA KUSUMA SURABAYA": "UWKS",
  "STIKES YAYASAN RS. DR. SOETOMO": "STIKES SOETOMO",
  "UNIVERSITAS BRAWIJAYA": "UB",
  "UNIVERSITAS DINAMIKA": "UNDIKA",
  "UNIVERSITAS INDONESIA": "UI",
  "UNIVERSITAS HAYAM WURUK PERBANAS": "PERBANAS",
  "UNIVERSITAS KRISTEN PETRA": "UK PETRA",
  "INSTITUT PERTANIAN BOGOR": "IPB",
  "UNIVERSITAS NEGERI GORONTALO": "UNG",
  "UNIVERSITAS DIPONEGORO": "UNDIP",
  "UNIVERSITAS UDAYANA": "UNUD",
  "UNIVERSITAS KATOLIK WIDYA MANDALA SURABAYA": "UKWMS",
  "UNIVERSITAS ISLAM NEGERI MAULANA MALIK IBRAHIM": "UIN MALANG",
  "UNIVERSITAS TERBUKA": "UT",
  "UNIVERSITAS TRUNOJOYO MADURA": "UTM",
  "UNIVERSITAS NAHDLATUL ULAMA SURABAYA": "UNUSA",
};

export function getShortCampus(campusName: string): string {
  return CAMPUS_SHORT_NAMES[campusName] || campusName.slice(0, 10).toUpperCase();
}

export function formatTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      // Handle abbreviations in brackets or short words
      if (["itb", "its", "ui", "ugm", "ub", "unesa", "unair", "d3", "d4", "s1", "rs"].includes(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export function normalizeClassGroup(kelas: string): string {
  // Normalize "XII 1" -> "XII-1", "XII 10" -> "XII-10"
  return kelas.replace(/\s+/g, "-");
}

export const CLASS_PALETTES = [
  "bg-[#0B5E2E]",
  "bg-[#141414]",
  "bg-[#BA1A1A]",
  "bg-[#00441E]",
  "bg-[#262626]",
  "bg-[#1E8449]",
  "bg-[#F5B700] text-[#141414]",
];
