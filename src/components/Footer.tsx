"use client";

import { personal } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative overflow-hidden border-t border-zinc-100 px-5 md:px-12 lg:px-20 py-6 md:py-8">
      {/* Decorative background name */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display font-extrabold leading-none pointer-events-none select-none whitespace-nowrap"
        style={{
          fontSize: "clamp(3rem, 12vw, 12rem)",
          color: "rgba(107, 124, 46, 0.04)",
          letterSpacing: "-0.05em",
          fontWeight: 800,
        }}
      >
        RATHORE
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-center">
        <div className="absolute left-0 flex items-center gap-2">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#6B7C2E] animate-[pulseDot_2s_ease-in-out_infinite]" />
          <span className="text-xs font-mono font-semibold text-[#6B7C2E]">
            {personal.location}
          </span>
        </div>

        <div className="font-mono text-xs text-zinc-700">
          © {year}{" "}
          <span className="text-zinc-700 font-medium">{personal.name}</span>
          {" · "}Built with Next.js &amp; Tailwind
        </div>
      </div>
    </footer>
  );
}
