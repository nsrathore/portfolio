import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        cream: {
          50: "#FAFAF8",
          100: "#F5F5F0",
          200: "#EBEBЕ4",
        },
        slate: {
          brand: "#6B7C2E",
          light: "#F2F5E8",
          mid: "#C8D49A",
          dark: "#4A5A1E",
          deeper: "#3A4A15",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.75)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
