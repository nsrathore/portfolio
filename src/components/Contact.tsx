"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { personal } from "@/data/portfolio";

type FormState = "idle" | "loading" | "success" | "error" | "disabled";

export default function Contact() {
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 503) {
        setFormState("disabled");
      } else if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full bg-[#FAFAF8] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#6B7C2E] focus:ring-2 focus:ring-[#F2F5E8] transition-all duration-200 font-body";

  const animateIn = (delay = 0) => ({
    initial: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    animate: prefersReduced ? { opacity: 1, y: 0 } : (inView ? { opacity: 1, y: 0 } : {}),
    transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : delay },
  });

  return (
    <section
      id="contact"
      aria-label="Contact form"
      className="section-padding bg-[#FFFFFF] border-t border-zinc-100"
    >
      <div className="container-wide" ref={ref}>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div {...animateIn()}>
            <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-3">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
              Let&apos;s build something great
            </h2>
            <p className="text-zinc-700 font-light">
              Whether it&apos;s a full-time role, a consulting engagement, or
              just a technical conversation — I&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>

        <motion.div
          {...animateIn(0.1)}
          className="max-w-xl mx-auto"
        >
          {formState === "disabled" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#A1A1AA" strokeWidth="1.5" />
                  <path d="M12 7v6M12 17h.01" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-zinc-900 mb-2">
                Contact form is currently offline
              </h3>
              <p className="text-zinc-700 text-sm">
                You can still reach Nikhil directly at{" "}
                <a
                  href={`mailto:${personal.email}`}
                  aria-label={`Send email to ${personal.email}`}
                  className="text-[#6B7C2E] underline underline-offset-4"
                >
                  {personal.email}
                </a>
              </p>
            </div>
          ) : formState === "success" ? (
            <div role="status" aria-live="polite" className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#F2F5E8] flex items-center justify-center mx-auto mb-4 text-2xl" aria-hidden="true">
                ✓
              </div>
              <h3 className="font-display font-bold text-xl text-zinc-900 mb-2">
                Message sent!
              </h3>
              <p className="text-zinc-700 text-sm">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-6 text-sm text-[#6B7C2E] underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#FAFAF8] border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono text-zinc-600 uppercase tracking-widest"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono text-zinc-600 uppercase tracking-widest"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-mono text-zinc-600 uppercase tracking-widest"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-mono text-zinc-600 uppercase tracking-widest"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about the opportunity, project, or question..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  rows={5}
                  className={inputClass + " resize-none"}
                />
              </div>

              {formState === "error" && (
                <p role="alert" className="text-sm text-red-600">
                  Something went wrong. Please try emailing directly at{" "}
                  <a
                    href={`mailto:${personal.email}`}
                    aria-label={`Send email to ${personal.email}`}
                    className="underline"
                  >
                    {personal.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full bg-[#6B7C2E] text-white font-medium text-sm py-3.5 rounded-xl hover:bg-[#4A5A1E] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "loading" ? "Sending..." : "Send Message →"}
              </button>

            </form>
          )}

          {/* Social links */}
          <div className="flex justify-center flex-wrap gap-3 mt-8">
            {[
              {
                label: "Email",
                display: "✉ Email",
                href: `mailto:${personal.email}`,
                ariaLabel: `Send email to ${personal.email}`,
              },
              {
                label: "LinkedIn",
                display: "in LinkedIn",
                href: personal.linkedin,
                ariaLabel: "Visit LinkedIn profile (opens in new tab)",
              },
              {
                label: "GitHub",
                display: "⌥ GitHub",
                href: personal.github,
                ariaLabel: "Visit GitHub profile (opens in new tab)",
              },
              {
                label: "Phone",
                display: "✆ Phone",
                href: `tel:${personal.phone.replace(/\D/g, "")}`,
                ariaLabel: `Call ${personal.phone}`,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={link.ariaLabel}
                className="text-sm text-zinc-600 border border-zinc-300 px-4 py-2 rounded-full hover:border-[#6B7C2E] hover:text-[#6B7C2E] transition-all duration-200"
              >
                {link.display}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
