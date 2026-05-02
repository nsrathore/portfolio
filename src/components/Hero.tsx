"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personal, stats } from "@/data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const gradientStyle = {
  background: "linear-gradient(135deg, #6B7C2E, #9AAD4E)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function AnimatedWord({
  word,
  startIndex,
  applyGradient,
  charDelay = 0.04,
}: {
  word: string;
  startIndex: number;
  applyGradient?: boolean;
  charDelay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <span style={applyGradient ? gradientStyle : undefined}>{word}</span>
    );
  }

  return (
    // No overflow-hidden - it clips letter bottoms when combined with leading-[1.0]
    <span className="inline-flex" style={applyGradient ? gradientStyle : undefined}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: (startIndex + i) * charDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [firstName, lastName] = personal.name.split(" ");
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const charDelay = isMobile ? 0.02 : 0.04;

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : fadeUp(delay);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      // sm:min-h-screen - no min-h on mobile so section is content-height only,
      // eliminating the blank void caused by items-center in a full-viewport flex container
      className="sm:min-h-screen flex items-start sm:items-center pt-24 sm:pt-28 pb-16 px-5 md:px-12 lg:px-20 relative overflow-hidden bg-[#F9F8F5]"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(107,124,46,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,124,46,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft accent blob - desktop only, sits behind headshot */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(135deg, #F2F5E8 0%, #F9F8F5 50%, #F9F8F5 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 min-w-0">
            {/* Availability badge */}
            <motion.div {...motionProps(0)} className="mb-6 sm:mb-8">
              {personal.availableForWork && (
                <span
                  className="inline-flex items-center gap-2 bg-[#F2F5E8] border border-[#6B7C2E] text-[#3A4A15] text-xs font-mono tracking-widest px-4 py-2 rounded-full uppercase"
                  aria-label="Currently available for new opportunities"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[#3A4A15] animate-[pulseDot_2s_ease-in-out_infinite]"
                  />
                  Available for new opportunities
                </span>
              )}
            </motion.div>

            {/* Name - staggered letter animation, leading-[1.1] gives letters room */}
            <h1 className="font-display text-[clamp(2.2rem,8vw,5.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-zinc-900 mb-4">
              <span className="block">
                <AnimatedWord word={firstName} startIndex={0} charDelay={charDelay} />
              </span>
              <span className="block">
                <AnimatedWord
                  word={lastName}
                  startIndex={firstName.length}
                  applyGradient
                  charDelay={charDelay}
                />
              </span>
            </h1>

            {/* Title */}
            <motion.h2
              {...motionProps(0.2)}
              className="font-display text-[clamp(1rem,2.5vw,1.4rem)] font-semibold text-[#6B7C2E] tracking-tight mb-2"
            >
              {personal.title} · {personal.tagline}
            </motion.h2>

            {/* Location */}
            <motion.div {...motionProps(0.25)} className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 bg-[#F2F5E8] border border-[#6B7C2E] text-[#3A4A15] text-xs font-mono tracking-widest px-4 py-2 rounded-full uppercase">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {personal.location}
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p
              {...motionProps(0.3)}
              className="text-zinc-600 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              {personal.summary}
            </motion.p>

            {/* Stats - vertical on mobile, horizontal on sm+ */}
            <motion.div
              {...motionProps(0.35)}
              className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mb-8 sm:mb-10"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex sm:items-center gap-8">
                  <div role="group" aria-label={`${stat.value} ${stat.label}`}>
                    <div
                      aria-hidden="true"
                      className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter leading-none"
                      style={gradientStyle}
                    >
                      {stat.value}
                    </div>
                    <div aria-hidden="true" className="text-xs text-zinc-600 uppercase tracking-widest mt-1 font-mono">
                      {stat.label}
                    </div>
                  </div>
                  {/* Divider - sm+ only */}
                  {i < stats.length - 1 && (
                    <div aria-hidden="true" className="hidden sm:block w-px h-8 bg-zinc-200" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTAs - stacked on mobile, row on sm+ */}
            <motion.div {...motionProps(0.4)} className="flex flex-col gap-3">
              {/* Primary CTAs + desktop icon row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-[#6B7C2E] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200 w-full sm:w-auto"
                >
                  View Case Studies
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label={`Send email to ${personal.email}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-400 hover:border-zinc-600 hover:text-zinc-900 transition-all duration-200 w-full sm:w-auto overflow-hidden"
                >
                  <span aria-hidden="true">✉</span>
                  <span className="truncate">{personal.email}</span>
                </a>
                {/* Divider + icon buttons - desktop only */}
                <div className="hidden sm:flex items-center gap-3">
                  <div aria-hidden="true" className="w-px h-5 bg-zinc-300" />
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Visit LinkedIn profile (opens in new tab)"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Visit GitHub profile (opens in new tab)"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                  <a
                    href={`tel:${personal.phone.replace(/\D/g, "")}`}
                    aria-label={`Call ${personal.phone}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </a>
                </div>
              </div>
              {/* Icon buttons - mobile only, centered below CTAs */}
              <div className="flex sm:hidden items-center justify-center gap-3">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit GitHub profile (opens in new tab)"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
                <a
                  href={`tel:${personal.phone.replace(/\D/g, "")}`}
                  aria-label={`Call ${personal.phone}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Headshot - lg+ only, never renders on mobile */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
          >
            <div className="rounded-full ring-[3px] ring-[#6B7C2E] ring-offset-[6px]">
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden">
                <Image
                  src="/images/headshot.jpeg"
                  alt="Nikhilendra Rathore, Software Engineer II"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
