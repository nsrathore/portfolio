"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
  backend:  "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
  frontend: "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
  devops:   "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
  security: "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
  ai:       "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
};

const METRIC_COLORS: Record<string, string> = {
  primary: "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
  dark:    "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
};

const glassStyle = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 24px rgba(107, 124, 46, 0.06), 0 1px 2px rgba(0,0,0,0.04)",
};

const glassHoverStyle = {
  boxShadow: "0 8px 32px rgba(107, 124, 46, 0.10), 0 1px 2px rgba(0,0,0,0.04)",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedSystemDesign, setExpandedSystemDesign] = useState<string | null>(null);
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
              <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-3">
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
                      ? "bg-[#6B7C2E] text-white border-[#6B7C2E]"
                      : "bg-white text-zinc-800 border-zinc-300 hover:border-zinc-500 hover:text-zinc-900"
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
                  <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#6B7C2E] via-[#9AAD4E] to-transparent" />

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
                        <p className="text-xs text-zinc-700 font-mono mt-1">
                          {project.company}
                        </p>
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
                        <div className="text-xs font-mono mt-1">
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
                          <div className="mb-2">
                            <span className="text-xs font-bold font-body text-zinc-700">
                              {section.label}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-700 font-light leading-relaxed hyphens-none">
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
                          className="text-xs font-mono text-zinc-700 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Live Demo / GitHub / System Design buttons */}
                    {(project.link || project.github || project.systemDesign) && (
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-zinc-100">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`View live demo of ${project.title} (opens in new tab)`}
                            className="inline-flex items-center gap-2 bg-[#6B7C2E] text-white font-medium text-xs px-4 py-2 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="2" y1="12" x2="22" y2="12"/>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                            className="inline-flex items-center gap-2 bg-white text-zinc-800 font-medium text-xs px-4 py-2 rounded-full border border-zinc-300 hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                            View Code
                          </a>
                        )}
                        {project.systemDesign && (
                          <button
                            onClick={() =>
                              setExpandedSystemDesign(
                                expandedSystemDesign === project.id ? null : project.id
                              )
                            }
                            aria-expanded={expandedSystemDesign === project.id}
                            aria-controls={`system-design-${project.id}`}
                            className="inline-flex items-center gap-2 bg-[#6B7C2E] text-white font-medium text-xs px-4 py-2 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200 ml-auto"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="3" y="3" width="7" height="7" rx="1"/>
                              <rect x="14" y="3" width="7" height="7" rx="1"/>
                              <rect x="3" y="14" width="7" height="7" rx="1"/>
                              <path d="M17.5 17.5h.01M14 17.5h3.5M17.5 14v3.5"/>
                            </svg>
                            {expandedSystemDesign === project.id ? "Hide Diagram" : "System Design"}
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className="transition-transform duration-200"
                              style={{ transform: expandedSystemDesign === project.id ? "rotate(180deg)" : "rotate(0deg)" }}
                            >
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    )}

                    {/* System design diagram - animated expand */}
                    <AnimatePresence initial={false}>
                      {expandedSystemDesign === project.id && project.systemDesign && (
                        <motion.div
                          id={`system-design-${project.id}`}
                          key="system-design"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-zinc-100">
                            <p className="text-xs font-mono text-zinc-500 mb-3">
                              Architecture Overview
                            </p>
                            <div className="rounded-xl overflow-auto bg-zinc-50 border border-zinc-100 p-4">
                              <Image
                                src={project.systemDesign}
                                alt={`${project.title} system architecture diagram`}
                                width={1200}
                                height={700}
                                className="w-full h-auto"
                                unoptimized
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover accent bar */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] transition-transform duration-300 ease-out origin-left"
                    style={{
                      background: "linear-gradient(90deg, #6B7C2E, #9AAD4E)",
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
