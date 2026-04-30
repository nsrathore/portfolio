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
          color: "rgba(59, 91, 219, 0.04)",
          letterSpacing: "-0.05em",
          fontWeight: 800,
        }}
      >
        RATHORE
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="font-mono text-xs text-zinc-500">
          © {year}{" "}
          <span className="text-zinc-700 font-medium">{personal.name}</span>
          {" · "}Built with Next.js &amp; Tailwind
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit GitHub profile (opens in new tab)"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit LinkedIn profile (opens in new tab)"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label={`Send email to ${personal.email}`}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            {personal.email}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] animate-[pulseDot_2s_ease-in-out_infinite]" />
          <span className="text-xs font-mono text-zinc-500">
            {personal.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
