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
  background: "linear-gradient(135deg, #3B5BDB, #6366f1)",
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
    // No overflow-hidden — it clips letter bottoms when combined with leading-[1.0]
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
      // sm:min-h-screen — no min-h on mobile so section is content-height only,
      // eliminating the blank void caused by items-center in a full-viewport flex container
      className="sm:min-h-screen flex items-start sm:items-center pt-24 sm:pt-28 pb-16 px-5 md:px-12 lg:px-20 relative overflow-hidden bg-[#F9F8F5]"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,91,219,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,91,219,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft accent blob — desktop only, sits behind headshot */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(135deg, #F0F4FF 0%, #F9F8F5 50%, #F9F8F5 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 min-w-0">
            {/* Availability badge */}
            <motion.div {...motionProps(0)} className="mb-6 sm:mb-8">
              {personal.availableForWork && (
                <span
                  className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-[#3B5BDB] text-[#1D2F8A] text-xs font-mono tracking-widest px-4 py-2 rounded-full uppercase"
                  aria-label="Currently available for new opportunities"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[#1D2F8A] animate-[pulseDot_2s_ease-in-out_infinite]"
                  />
                  Available for new opportunities
                </span>
              )}
            </motion.div>

            {/* Name — staggered letter animation, leading-[1.1] gives letters room */}
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
            <motion.p
              {...motionProps(0.2)}
              className="font-display text-[clamp(1rem,2.5vw,1.4rem)] font-semibold text-[#3B5BDB] tracking-tight mb-5 sm:mb-6"
            >
              {personal.title} · {personal.tagline}
            </motion.p>

            {/* Summary */}
            <motion.p
              {...motionProps(0.3)}
              className="text-zinc-600 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              {personal.summary}
            </motion.p>

            {/* Stats — vertical on mobile, horizontal on sm+ */}
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
                  {/* Divider — sm+ only */}
                  {i < stats.length - 1 && (
                    <div aria-hidden="true" className="hidden sm:block w-px h-8 bg-zinc-200" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTAs — stacked on mobile, row on sm+ */}
            <motion.div {...motionProps(0.4)} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 bg-[#3B5BDB] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#2C44B8] transition-colors duration-200 w-full sm:w-auto"
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
            </motion.div>
          </div>

          {/* Headshot — lg+ only, never renders on mobile */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
          >
            <div className="rounded-full ring-[3px] ring-[#3B5BDB] ring-offset-[6px]">
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

      {/* Scroll hint — hidden on mobile to avoid overlapping CTAs */}
      <motion.div
        aria-hidden="true"
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? { duration: 0 } : { delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-300 to-transparent" />
      </motion.div>
    </section>
  );
}
