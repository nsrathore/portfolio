import { DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

// Self-hosted at build time by next/font (no runtime request to Google).
// Each font is exposed as a CSS variable consumed by tailwind.config.ts fontFamily.

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
