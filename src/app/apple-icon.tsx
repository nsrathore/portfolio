import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/ogFonts";
import { Monogram } from "@/lib/monogram";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={size.width} fullBleed />, {
    ...size,
    fonts: await loadOgFonts(["plus-jakarta-sans-latin-800-normal.ttf"]),
  });
}
