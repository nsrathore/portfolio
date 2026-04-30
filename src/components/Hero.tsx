"use client";

import { motion } from "framer-motion";
import { personal, stats } from "@/data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,91,219,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,91,219,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft accent blob */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-3xl">
          {/* Availability badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            {personal.availableForWork && (
              <span className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-[#C5D0FA] text-[#3B5BDB] text-xs font-mono tracking-widest px-4 py-2 rounded-full uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] animate-[pulseDot_2s_ease-in-out_infinite]" />
                Available for new opportunities
              </span>
            )}
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-zinc-900 mb-4"
          >
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className={i === 0 ? "block" : "block"}>
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-display text-[clamp(1rem,2.5vw,1.4rem)] font-semibold text-[#3B5BDB] tracking-tight mb-6"
          >
            {personal.title} · {personal.tagline}
          </motion.p>

          {/* Summary */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-zinc-500 text-lg font-light leading-relaxed max-w-xl mb-10"
          >
            {personal.summary}
          </motion.p>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.35)}
            className="flex items-center gap-8 mb-10 flex-wrap"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-8">
                <div>
                  <div className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-widest mt-1 font-mono">
                    {stat.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-zinc-200" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#3B5BDB] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#2C44B8] transition-colors duration-200"
            >
              View Case Studies
              <span>→</span>
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-all duration-200"
            >
              ✉ {personal.email}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-300 font-mono tracking-widest uppercase">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-300 to-transparent" />
      </motion.div>
    </section>
  );
}
