"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      className="section-padding bg-[#FFFFFF] border-t border-zinc-100 overflow-hidden"
    >
      <div className="container-wide" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
            Technical Skills
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
            Technologies I master
          </h2>
          <p className="text-zinc-400 font-light max-w-md">
            Curated to reflect what I genuinely use in production — not a
            keyword list.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#FAFAF8] border border-zinc-100 rounded-2xl p-4 sm:p-6 hover:border-zinc-200 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-100">
                <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-base">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-zinc-900 tracking-tight">
                  {category.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className={`text-xs sm:text-sm font-mono px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                      item.highlight
                        ? "bg-[#EEF2FF] text-[#3B5BDB] border-[#C5D0FA] font-medium"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-700"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
