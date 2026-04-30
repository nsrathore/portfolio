"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio";

const links = [
  { href: "#impact", label: "Impact" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#3B5BDB] z-[200] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-800 text-lg tracking-tight text-zinc-900"
            style={{ fontWeight: 800 }}
          >
            N<span className="text-[#3B5BDB]">.</span>Rathore
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="text-sm font-medium bg-[#3B5BDB] text-white px-5 py-2 rounded-full hover:bg-[#2C44B8] transition-colors duration-200"
              >
                Let&apos;s talk
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-zinc-700 transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-zinc-700 transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-zinc-700 transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium bg-[#3B5BDB] text-white px-5 py-2.5 rounded-full text-center mt-2"
            >
              Let&apos;s talk
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
