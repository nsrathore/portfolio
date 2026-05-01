"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";

const fileId = process.env.NEXT_PUBLIC_RESUME_FILEID;
if (!fileId) 
  throw new Error("Missing the appropriate resume fileid");

const PREVIEW_PATH = `https://drive.google.com/file/d/${fileId}/preview`;
const DOWNLOAD_PATH = "/api/resume";
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

  const [portalEl] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.setAttribute("id", "resume-modal-portal");
    el.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 200;
      pointer-events: none;
    `;
    return el;
  });

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(DOWNLOAD_PATH);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = DOWNLOAD_NAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!portalEl) return;
    document.body.appendChild(portalEl);
    return () => {
      if (document.body.contains(portalEl)) document.body.removeChild(portalEl);
    };
  }, [portalEl]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (previewOpen) {
      document.body.style.overflow = "hidden";
      if (portalEl) portalEl.style.pointerEvents = "all";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      if (portalEl) portalEl.style.pointerEvents = "none";
      previewButtonRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [previewOpen, portalEl]);

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

  const desktopPanelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    width: "calc(100vw - 3rem)",
    maxWidth: "64rem",
    height: "97vh",
    maxHeight: "97vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: "1rem",
    zIndex: 201,
  };

  const mobilePanelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: "1rem 1rem 0 0",
    zIndex: 201,
  };

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
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(24, 24, 27, 0.8)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
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
            style={isMobile ? mobilePanelStyle : desktopPanelStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div aria-hidden="true" className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-zinc-300" />
              </div>
            )}

            {/* Header */}
            <div
              className="flex items-center justify-between border-b border-zinc-100 bg-white"
              style={{ flexShrink: 0, padding: "0.5rem 1.25rem" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                  <rect x="4" y="1" width="18" height="24" rx="2" stroke="#6B7C2E" strokeWidth="1.5" fill="none" />
                  <path d="M18 1v7h6" stroke="#6B7C2E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8 13h10M8 17h7" stroke="#6B7C2E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="min-w-0">
                  <h2 className="font-display font-bold text-zinc-900 text-base leading-none truncate">
                    Nikhilendra Rathore — Resume
                  </h2>
                  <p className="font-mono text-xs text-zinc-600 mt-0.5">PDF Preview</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Download button — triggers blob download, not preview */}
                <button
                  onClick={handleDownload}
                  aria-label="Download resume PDF"
                  className="w-8 h-8 rounded-lg bg-[#6B7C2E] flex items-center justify-center hover:bg-[#4A5A1E] transition-colors duration-150"
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M6 8l-2.5-2.5M6 8l2.5-2.5M1 10.5h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

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

            {/* Modal body — hybrid: desktop iframe / mobile fallback */}
            <div
              className="bg-zinc-100"
              style={{ flex: 1, minHeight: 0, overflow: "hidden", height: "100%" }}
            >
              {isMobile ? (
                /* Mobile: clean fallback card */
                <div className="flex flex-col items-center justify-center h-full px-6 gap-6 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl bg-[#F2F5E8] border border-[#C8D49A] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6B7C2E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-display font-bold text-zinc-900 text-base mb-1">
                      Nikhilendra Rathore — Resume
                    </p>
                    <p className="text-sm text-zinc-600 font-light leading-relaxed max-w-xs">
                      Tap below to open the resume in your device&apos;s PDF viewer for the best mobile experience.
                    </p>
                  </div>

                  <a
                    href={PREVIEW_PATH}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 bg-[#6B7C2E] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#4A5A1E] active:bg-[#3A4A15] transition-colors duration-200 w-full justify-center max-w-xs"
                    aria-label="Open resume PDF in device viewer"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Open in PDF Viewer
                  </a>

                  {/* Mobile download — blob approach */}
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-300 hover:border-zinc-500 hover:text-zinc-900 transition-all duration-200 w-full justify-center max-w-xs"
                    aria-label="Download resume PDF"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Instead
                  </button>
                </div>
              ) : (
                /* Desktop: Google Drive preview iframe */
                <iframe
                  src={PREVIEW_PATH}
                  style={{ width: "100%", height: "100%", minHeight: "85vh", display: "block", border: "none" }}
                  title="Nikhilendra Rathore Resume PDF"
                  aria-label="Resume PDF preview"
                >
                  <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                    <p className="text-zinc-600 text-sm font-light">
                      Unable to preview PDF inline.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="bg-[#6B7C2E] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200"
                    >
                      Download Resume
                    </button>
                  </div>
                </iframe>
              )}
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
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 border-l-4 border-l-[#6B7C2E]"
          >
            {/* Top gradient line */}
            <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#6B7C2E] via-[#9AAD4E] to-transparent" />

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
                  <rect x="4" y="1" width="18" height="24" rx="2" stroke="#6B7C2E" strokeWidth="1.5" fill="none" />
                  <path d="M18 1v7h6" stroke="#6B7C2E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8 13h10M8 17h7" stroke="#6B7C2E" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="4" y="19" width="14" height="9" rx="1.5" fill="#6B7C2E" opacity="0.12" />
                  <text x="11" y="26" textAnchor="middle" fontFamily="monospace" fontSize="5" fontWeight="700" fill="#6B7C2E">PDF</text>
                </svg>

                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-1">
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
                {/* Download — blob fetch, forces true download */}
                <button
                  onClick={handleDownload}
                  aria-label="Download Nikhilendra Rathore resume PDF"
                  className="inline-flex items-center justify-center gap-2 bg-[#6B7C2E] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200 w-full sm:w-auto"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </button>

                {/* Preview — opens modal with Google Drive iframe */}
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

      {mounted && portalEl && createPortal(modal, portalEl)}
    </>
  );
}