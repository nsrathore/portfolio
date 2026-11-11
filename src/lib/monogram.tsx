import { personal } from "@/data/portfolio";

// Shared "NR" monogram used by icon.tsx and apple-icon.tsx.
// `fullBleed` drops the border/radius: iOS applies its own mask and fills
// transparent corners with black.
export function Monogram({ size, fullBleed = false }: { size: number; fullBleed?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9F8F5",
        border: fullBleed ? "none" : `${Math.max(1, Math.round(size / 32))}px solid #6B7C2E`,
        borderRadius: fullBleed ? 0 : Math.round(size * 0.22),
        color: "#6B7C2E",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 800,
        fontSize: Math.round(size * 0.5),
        letterSpacing: "-0.04em",
      }}
    >
      {personal.initials}
    </div>
  );
}
