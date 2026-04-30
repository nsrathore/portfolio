"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { projects, type ProjectTag } from "@/data/portfolio";

const FILTERS: { label: string; value: ProjectTag }[] = [
  { label: "All", value: "all" },
  { label: "Backend", value: "backend" },
  { label: "Frontend", value: "frontend" },
  { label: "DevOps", value: "devops" },
  { label: "Security", value: "security" },
  { label: "AI", value: "ai" },
];

const TAG_COLORS: Record<string, string> = {
  backend: "bg-blue-50 text-blue-600 border-blue-200",
  frontend: "bg-violet-50 text-violet-600 border-violet-200",
  devops: "bg-amber-50 text-amber-600 border-amber-200",
  security: "bg-rose-50 text-rose-600 border-rose-200",
  ai: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const METRIC_COLORS: Record<string, string> = {
  blue: "bg-[#EEF2FF] text-[#3B5BDB] border-[#C5D0FA]",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
  violet: "bg-violet-50 text-violet-600 border-violet-200",
  slate: "bg-slate-50 text-slate-600 border-slate-200",
};

const glassStyle = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 24px rgba(59, 91, 219, 0.06), 0 1px 2px rgba(0,0,0,0.04)",
};

const glassHoverStyle = {
  boxShadow: "0 8px 32px rgba(59, 91, 219, 0.10), 0 1px 2px rgba(0,0,0,0.04)",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const animateIn = (delay = 0) => ({
    initial: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    animate: prefersReduced ? { opacity: 1, y: 0 } : (inView ? { opacity: 1, y: 0 } : {}),
    transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : delay },
  });

  const handleFilterKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % FILTERS.length;
      filterRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + FILTERS.length) % FILTERS.length;
      filterRefs.current[prev]?.focus();
    }
  };

  return (
    <section id="projects" aria-label="Case studies" className="section-padding bg-[#F9F8F5]">
      <div className="container-wide">
        <div ref={ref}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div {...animateIn()}>
              <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
                Case Studies
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
                How I ship software
              </h2>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              {...animateIn(0.1)}
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by category"
            >
              {FILTERS.map((f, index) => (
                <button
                  key={f.value}
                  ref={(el) => { filterRefs.current[index] = el; }}
                  onClick={() => setActiveFilter(f.value)}
                  onKeyDown={(e) => handleFilterKeyDown(e, index)}
                  aria-pressed={activeFilter === f.value}
                  className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium ${
                    activeFilter === f.value
                      ? "bg-[#3B5BDB] text-white border-[#3B5BDB]"
                      : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Case study cards */}
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: prefersReduced ? 0 : 0.35, delay: prefersReduced ? 0 : i * 0.05 }}
                  className="relative rounded-2xl overflow-hidden group transition-all duration-200"
                  style={
                    hoveredId === project.id
                      ? { ...glassStyle, ...glassHoverStyle }
                      : glassStyle
                  }
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Card top bar */}
                  <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#3B5BDB] via-[#818CF8] to-transparent" />

                  <div className="p-4 sm:p-6 md:p-8">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3" aria-label="Project categories">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs font-mono px-2.5 py-0.5 rounded-full border capitalize ${
                                TAG_COLORS[tag] || ""
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-600 font-mono mt-1">
                          {project.company}
                        </p>
                        {(project.link || project.github) && (
                          <div className="flex items-center gap-3 mt-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} live demo (opens in new tab)`}
                                className="text-xs font-mono text-[#3B5BDB] hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Live Demo →
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} GitHub repository (opens in new tab)`}
                                className="text-xs font-mono text-zinc-600 hover:text-zinc-900 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                GitHub →
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Metric badge */}
                      <div
                        className={`w-full sm:w-auto flex-shrink-0 text-center px-5 py-3 rounded-xl border ${
                          METRIC_COLORS[project.metricColor] ||
                          METRIC_COLORS.blue
                        }`}
                      >
                        <div className="font-display text-2xl font-extrabold tracking-tight leading-none">
                          {project.metric.value}
                        </div>
                        <div className="text-xs font-mono mt-1 opacity-70">
                          {project.metric.label}
                        </div>
                      </div>
                    </div>

                    {/* Three-column body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y divide-zinc-100 md:divide-y-0">
                      {[
                        { label: "The Problem", text: project.problem },
                        { label: "The Approach", text: project.approach },
                        { label: "The Results", text: project.result },
                      ].map((section) => (
                        <div key={section.label} className="pt-4 first:pt-0 md:pt-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div aria-hidden="true" className="w-4 h-px bg-zinc-300" />
                            <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                              {section.label}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 font-light leading-relaxed">
                            {section.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-zinc-100">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover accent bar */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] transition-transform duration-300 ease-out origin-left"
                    style={{
                      background: "linear-gradient(90deg, #3B5BDB, #6366f1)",
                      transform: hoveredId === project.id ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
