"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { impactCards } from "@/data/portfolio";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-[#F2F5E8]",
    text: "text-[#6B7C2E]",
    border: "border-[#C8D49A]",
  },
  indigo: {
    bg: "bg-[#F2F5E8]",
    text: "text-[#4A5A1E]",
    border: "border-[#C8D49A]",
  },
  violet: {
    bg: "bg-[#F2F5E8]",
    text: "text-[#6B7C2E]",
    border: "border-[#C8D49A]",
  },
  slate: {
    bg: "bg-[#F2F5E8]",
    text: "text-[#4A5A1E]",
    border: "border-[#C8D49A]",
  },
};

const bentoClasses = ["bento-item-a", "bento-item-b", "bento-item-c", "bento-item-d"];

export default function Impact() {
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();

  const animateIn = (delay = 0) => ({
    initial: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    animate: prefersReduced ? { opacity: 1, y: 0 } : (inView ? { opacity: 1, y: 0 } : {}),
    transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : delay },
  });

  return (
    <section
      id="impact"
      aria-label="Impact metrics"
      className="section-padding bg-[#FFFFFF] border-t border-b border-zinc-100"
    >
      <div className="container-wide">
        <div ref={ref}>
          <motion.div {...animateIn()}>
            <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-3">
              Measured Impact
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
              Results that move the needle
            </h2>
            <p className="text-zinc-700 font-light max-w-lg">
              Every project I ship is tracked against real business outcomes —
              not just technical milestones.
            </p>
          </motion.div>

          {/* Bento grid: 1 col mobile → 2 col sm → bento lg+ */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 bento-impact">
            {impactCards.map((card, i) => {
              const c = colorMap[card.color] || colorMap.blue;
              const featured = i === 0;
              return (
                <motion.div
                  key={card.label}
                  {...animateIn(i * 0.08)}
                  className={`bg-white p-6 sm:p-8 rounded-2xl border border-zinc-100 hover:bg-zinc-50 transition-colors duration-200 group flex flex-col justify-between min-h-[140px] ${bentoClasses[i]}`}
                >
                  <div role="group" aria-label={`${card.value} — ${card.label}`}>
                    <div
                      aria-hidden="true"
                      className={`inline-block text-xs font-mono px-2.5 py-1 rounded-full border mb-4 ${c.bg} ${c.text} ${c.border}`}
                    >
                      {card.label}
                    </div>
                    <div
                      aria-hidden="true"
                      className={`font-display font-extrabold tracking-tight mb-3 ${c.text} ${
                        featured ? "text-4xl lg:text-6xl" : "text-4xl"
                      }`}
                    >
                      {card.value}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 font-light leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
