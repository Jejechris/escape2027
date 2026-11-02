import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF8F2",
          tint: "#F7F5EF",
          muted: "#F0EEE8",
          dark: "#EAE5D9",
        },
        ink: {
          DEFAULT: "#141414",
          soft: "#262626",
          muted: "#404940",
        },
        willpower: {
          DEFAULT: "#0B5E2E",
          dark: "#00441E",
          light: "#1E8449",
          mint: "#A7F4B5",
          lime: "#2ECC71",
        },
        comic: {
          gold: "#F5B700",
          yellow: "#FFDEA0",
          red: "#BA1A1A",
          cyan: "#00A896",
        },
      },
      fontFamily: {
        display: ["var(--font-comic-display)", "Anton", "Impact", "sans-serif"],
        body: ["var(--font-comic-body)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        comic: "4px 4px 0px #141414",
        "comic-sm": "2px 2px 0px #141414",
        "comic-lg": "8px 8px 0px #141414",
        "comic-willpower": "4px 4px 0px #0B5E2E",
        "comic-gold": "4px 4px 0px #F5B700",
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
      },
    },
  },
  plugins: [],
};

export default config;
