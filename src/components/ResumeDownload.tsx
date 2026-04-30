"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export default function ResumeDownload() {
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="resume"
      aria-label="Resume download"
      className="section-padding bg-[#FFFFFF] border-t border-b border-zinc-100"
    >
      <div className="container-wide" ref={ref}>
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : (inView ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: prefersReduced ? 0 : 0.5 }}
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 border-l-4 border-l-[#3B5BDB]"
        >
          {/* Top gradient line */}
          <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#3B5BDB] via-[#818CF8] to-transparent" />

          <div className="bg-[#F9F8F5] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left — icon + text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-start gap-4 text-center sm:text-left">
              {/* PDF icon */}
              <svg
                aria-hidden="true"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="flex-shrink-0 mt-0.5"
              >
                <rect x="4" y="1" width="18" height="24" rx="2" stroke="#3B5BDB" strokeWidth="1.5" fill="none" />
                <path d="M18 1v7h6" stroke="#3B5BDB" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 13h10M8 17h7" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="4" y="19" width="14" height="9" rx="1.5" fill="#3B5BDB" opacity="0.12" />
                <text x="11" y="26" textAnchor="middle" fontFamily="monospace" fontSize="5" fontWeight="700" fill="#3B5BDB">PDF</text>
              </svg>

              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-[#2C44B8] mb-1">
                  Resume
                </p>
                <h2 className="font-display font-extrabold tracking-tight text-zinc-900 text-xl md:text-2xl">
                  Nikhilendra Rathore
                </h2>
                <p className="font-light text-zinc-600 text-sm mt-0.5">
                  Software Engineer II · Updated 2025
                </p>
              </div>
            </div>

            {/* Right — buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="/resume/nikhilendra_rathore_resume.pdf"
                download="Nikhilendra_Rathore_Resume.pdf"
                aria-label="Download Nikhilendra Rathore resume PDF"
                className="inline-flex items-center justify-center gap-2 bg-[#3B5BDB] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#2C44B8] transition-colors duration-200 w-full sm:w-auto"
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Resume
              </a>

              <a
                href="/resume/nikhilendra_rathore_resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View Nikhilendra Rathore resume PDF in new tab"
                className="inline-flex items-center justify-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-300 hover:border-zinc-500 hover:text-zinc-900 transition-all duration-200 w-full sm:w-auto"
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 1h4v4M13 1L7 7" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
