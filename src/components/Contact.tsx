"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { personal } from "@/data/portfolio";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formspreeId) {
      // Demo mode — show success without sending
      setFormState("loading");
      setTimeout(() => setFormState("success"), 1000);
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
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
    "w-full bg-[#FAFAF8] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#EEF2FF] transition-all duration-200 font-body";

  return (
    <section
      id="contact"
      className="section-padding bg-white border-t border-zinc-100"
    >
      <div className="container-wide" ref={ref}>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
              Let&apos;s build something great
            </h2>
            <p className="text-zinc-400 font-light">
              Whether it&apos;s a full-time role, a consulting engagement, or
              just a technical conversation — I&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          {formState === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="font-display font-bold text-xl text-zinc-900 mb-2">
                Message sent!
              </h3>
              <p className="text-zinc-400 text-sm">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-6 text-sm text-[#3B5BDB] underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#FAFAF8] border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell me about the opportunity, project, or question..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={inputClass + " resize-none"}
                />
              </div>

              {formState === "error" && (
                <p className="text-sm text-red-500">
                  Something went wrong. Please try emailing directly at{" "}
                  <a
                    href={`mailto:${personal.email}`}
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
                className="w-full bg-[#3B5BDB] text-white font-medium text-sm py-3.5 rounded-xl hover:bg-[#2C44B8] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "loading" ? "Sending..." : "Send Message →"}
              </button>

              {!formspreeId && (
                <p className="text-xs text-center text-zinc-400 font-mono">
                  Set NEXT_PUBLIC_FORMSPREE_ID in .env.local to enable real submissions
                </p>
              )}
            </form>
          )}

          {/* Social links */}
          <div className="flex justify-center flex-wrap gap-3 mt-8">
            {[
              { label: "✉ Email", href: `mailto:${personal.email}` },
              { label: "in LinkedIn", href: personal.linkedin },
              { label: "⌥ GitHub", href: personal.github },
              { label: "✆ Phone", href: `tel:${personal.phone.replace(/\D/g, "")}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-sm text-zinc-500 border border-zinc-200 px-4 py-2 rounded-full hover:border-[#3B5BDB] hover:text-[#3B5BDB] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
