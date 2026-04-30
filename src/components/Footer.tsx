"use client";

import { personal } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 px-6 md:px-12 lg:px-20 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-zinc-400">
          © {year}{" "}
          <span className="text-zinc-700 font-medium">{personal.name}</span>
          {" · "}Built with Next.js & Tailwind
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            {personal.email}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] animate-[pulseDot_2s_ease-in-out_infinite]" />
          <span className="text-xs font-mono text-zinc-400">
            {personal.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
