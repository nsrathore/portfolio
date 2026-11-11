import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/ogFonts";
import { Monogram } from "@/lib/monogram";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram size={size.width} />, {
    ...size,
    fonts: await loadOgFonts(["plus-jakarta-sans-latin-800-normal.ttf"]),
  });
}
