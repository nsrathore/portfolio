"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { impactCards } from "@/data/portfolio";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-[#EEF2FF]",
    text: "text-[#3B5BDB]",
    border: "border-[#C5D0FA]",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-200",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-200",
  },
  slate: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

export default function Impact() {
  const { ref, inView } = useInView();

  return (
    <section
      id="impact"
      className="section-padding bg-[#FFFFFF] border-t border-b border-zinc-100"
    >
      <div className="container-wide">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
              Measured Impact
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
              Results that move the needle
            </h2>
            <p className="text-zinc-400 font-light max-w-lg">
              Every project I ship is tracked against real business outcomes —
              not just technical milestones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden mt-12">
            {impactCards.map((card, i) => {
              const c = colorMap[card.color] || colorMap.blue;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 hover:bg-zinc-50 transition-colors duration-200 group"
                >
                  <div
                    className={`inline-block text-xs font-mono px-2.5 py-1 rounded-full border mb-4 ${c.bg} ${c.text} ${c.border}`}
                  >
                    {card.label}
                  </div>
                  <div
                    className={`font-display text-4xl font-extrabold tracking-tight mb-3 ${c.text}`}
                  >
                    {card.value}
                  </div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
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
