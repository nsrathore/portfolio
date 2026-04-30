"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile menu on hash change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Escape closes menu and returns focus to hamburger; Tab traps focus inside menu
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const progressBar = (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[2px] bg-[#3B5BDB] z-[200] transition-all duration-100"
      style={{ width: `${progress}%` }}
    />
  );

  // Floating pill — desktop only when scrolled
  if (scrolled && !isMobile) {
    return (
      <>
        {progressBar}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="fixed z-[100] transition-all duration-300"
          style={{
            top: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.9)",
            borderRadius: "9999px",
            padding: "0.5rem 1.5rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            whiteSpace: "nowrap",
          }}
        >
          <div className="flex items-center gap-6 h-9">
            <a
              href="#"
              aria-label="Nikhilendra Rathore — back to top"
              className="font-display text-sm tracking-tight text-zinc-900"
              style={{ fontWeight: 800 }}
            >
              N<span className="text-[#3B5BDB]" aria-hidden="true">.</span>R
            </a>
            <ul className="flex items-center gap-5" aria-label="Main menu">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm font-medium bg-[#3B5BDB] text-white px-4 py-1.5 rounded-full hover:bg-[#2C44B8] transition-colors duration-200"
                >
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  // Full-width nav — mobile always, desktop when not scrolled
  return (
    <>
      {progressBar}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-12 lg:px-20 flex items-center justify-between h-16">
          <a
            href="#"
            aria-label="Nikhilendra Rathore — back to top"
            className="font-display text-lg tracking-tight text-zinc-900"
            style={{ fontWeight: 800 }}
          >
            N<span className="text-[#3B5BDB]" aria-hidden="true">.</span>Rathore
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" aria-label="Main menu">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
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

          {/* Hamburger — 44×44 touch target */}
          <button
            ref={hamburgerRef}
            className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden bg-white border-t border-zinc-100 px-5 py-3 flex flex-col"
          >
            <ul aria-label="Mobile menu" className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-zinc-600 hover:text-zinc-900 flex items-center min-h-[44px] py-3 border-b border-zinc-50 last:border-b-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium bg-[#3B5BDB] text-white px-5 py-3 rounded-full text-center mt-3 min-h-[44px] flex items-center justify-center"
            >
              Let&apos;s talk
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
