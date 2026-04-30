"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";

const PDF_PATH = "/resume/nikhilendra_rathore_resume.pdf";
const PDF_PUBLIC_URL =
  "https://portfolio-inky-one-22p6o58j1c.vercel.app/resume/nikhilendra_rathore_resume.pdf";
const DOWNLOAD_NAME = "Nikhilendra_Rathore_Resume.pdf";

export default function ResumeDownload() {
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (previewOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      previewButtonRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [previewOpen]);

  const handleModalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") { setPreviewOpen(false); return; }
    if (e.key === "Tab") {
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  }, []);

  useEffect(() => {
    if (!previewOpen) return;
    document.addEventListener("keydown", handleModalKeyDown);
    return () => document.removeEventListener("keydown", handleModalKeyDown);
  }, [previewOpen, handleModalKeyDown]);

  const modal = (
    <AnimatePresence>
      {previewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm"
            style={{ zIndex: 200 }}
            onClick={() => setPreviewOpen(false)}
          />

          {/* Modal panel */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Resume PDF preview"
            tabIndex={-1}
            initial={
              prefersReduced ? { opacity: 1 } :
              isMobile ? { y: "100%" } : { y: 20, opacity: 0 }
            }
            animate={
              prefersReduced ? { opacity: 1 } :
              isMobile ? { y: 0 } : { y: 0, opacity: 1 }
            }
            exit={
              prefersReduced ? { opacity: 0 } :
              isMobile ? { y: "100%" } : { y: 20, opacity: 0 }
            }
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bg-white overflow-hidden flex flex-col ${
              isMobile
                ? "bottom-0 left-0 right-0 rounded-t-2xl"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl rounded-2xl"
            }`}
            style={{
              zIndex: 201,
              maxHeight: isMobile ? "92vh" : "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div aria-hidden="true" className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-zinc-300" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 flex-shrink-0 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <rect x="4" y="1" width="18" height="24" rx="2" stroke="#3B5BDB" strokeWidth="1.5" fill="none" />
                  <path d="M18 1v7h6" stroke="#3B5BDB" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8 13h10M8 17h7" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="min-w-0">
                  <h2 className="font-display font-bold text-zinc-900 text-base leading-none truncate">
                    Nikhilendra Rathore — Resume
                  </h2>
                  <p className="font-mono text-xs text-zinc-600 mt-0.5">PDF Preview</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Download */}
                <a
                  href={PDF_PATH}
                  download={DOWNLOAD_NAME}
                  aria-label="Download resume PDF"
                  className="w-8 h-8 rounded-lg bg-[#3B5BDB] flex items-center justify-center hover:bg-[#2C44B8] transition-colors duration-150"
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M6 8l-2.5-2.5M6 8l2.5-2.5M1 10.5h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Close */}
                <button
                  ref={closeButtonRef}
                  onClick={() => setPreviewOpen(false)}
                  aria-label="Close resume preview"
                  className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-600 text-lg leading-none hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-150"
                >
                  ×
                </button>
              </div>
            </div>

            {/* PDF body — Google Docs viewer */}
            <div
              className="relative w-full bg-zinc-100"
              style={{ height: isMobile ? "calc(92vh - 130px)" : "calc(90vh - 130px)" }}
            >
              {/* Loading state */}
              <div
                id="pdf-loading"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-100"
              >
                <div
                  className="w-8 h-8 border-2 border-[#3B5BDB] border-t-transparent rounded-full animate-spin"
                  aria-hidden="true"
                />
                <p className="text-sm text-zinc-600 font-mono">Loading resume...</p>
              </div>

              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(PDF_PUBLIC_URL)}&embedded=true`}
                className="absolute inset-0 w-full h-full border-0"
                title="Nikhilendra Rathore Resume PDF"
                onLoad={() => {
                  const loading = document.getElementById("pdf-loading");
                  if (loading) loading.style.display = "none";
                }}
                allow="autoplay"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
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
                  href={PDF_PATH}
                  download={DOWNLOAD_NAME}
                  aria-label="Download Nikhilendra Rathore resume PDF"
                  className="inline-flex items-center justify-center gap-2 bg-[#3B5BDB] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#2C44B8] transition-colors duration-200 w-full sm:w-auto"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </a>

                <button
                  ref={previewButtonRef}
                  onClick={() => setPreviewOpen(true)}
                  aria-label="Preview resume PDF"
                  className="inline-flex items-center justify-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-300 hover:border-zinc-500 hover:text-zinc-900 transition-all duration-200 w-full sm:w-auto"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <ellipse cx="7" cy="7" rx="6" ry="4" stroke="#71717a" strokeWidth="1.5" />
                    <circle cx="7" cy="7" r="1.5" stroke="#71717a" strokeWidth="1.5" />
                  </svg>
                  Preview Resume
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
