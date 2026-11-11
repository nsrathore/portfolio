import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static TTFs (OFL, from Fontsource) for next/og ImageResponse.
// Satori can't use woff2 or variable fonts, so these are vendored rather
// than pulled from next/font.
const FONT_DIR = join(process.cwd(), "src/assets/fonts");

type Weight = 400 | 500 | 800;

const FONTS: Record<string, { name: string; weight: Weight }> = {
  "plus-jakarta-sans-latin-800-normal.ttf": { name: "Plus Jakarta Sans", weight: 800 },
  "dm-sans-latin-400-normal.ttf": { name: "DM Sans", weight: 400 },
  "dm-sans-latin-500-normal.ttf": { name: "DM Sans", weight: 500 },
  "jetbrains-mono-latin-500-normal.ttf": { name: "JetBrains Mono", weight: 500 },
};

export async function loadOgFonts(files: (keyof typeof FONTS)[] = Object.keys(FONTS)) {
  return Promise.all(
    files.map(async (file) => ({
      ...FONTS[file],
      style: "normal" as const,
      data: await readFile(join(FONT_DIR, file)),
    }))
  );
}
