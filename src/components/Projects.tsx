"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("all");
  const { ref, inView } = useInView();

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">
        <div ref={ref}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
                Case Studies
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
                How I ship software
              </h2>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium ${
                    activeFilter === f.value
                      ? "bg-[#3B5BDB] text-white border-[#3B5BDB]"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-sm transition-all duration-200 group"
                >
                  {/* Card top bar */}
                  <div className="h-[2px] bg-gradient-to-r from-[#3B5BDB] via-[#818CF8] to-transparent" />

                  <div className="p-6 md:p-8">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
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
                        <p className="text-xs text-zinc-400 font-mono mt-1">
                          {project.company}
                        </p>
                        {(project.link || project.github) && (
                          <div className="flex items-center gap-3 mt-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                                className="text-xs font-mono text-zinc-400 hover:text-zinc-700 hover:underline"
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
                        className={`flex-shrink-0 text-center px-5 py-3 rounded-xl border ${
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "The Problem", text: project.problem },
                        { label: "The Approach", text: project.approach },
                        { label: "The Results", text: project.result },
                      ].map((section) => (
                        <div key={section.label}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-px bg-zinc-300" />
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                              {section.label}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            {section.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-zinc-50">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
