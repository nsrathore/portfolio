"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { personal } from "@/data/portfolio";

export default function NotFound() {
  const pathname = usePathname() || "/";
  const prefersReduced = useReducedMotion();
  const user = personal.shortName.toLowerCase();

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center px-5 py-24 bg-[#F9F8F5]"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl"
      >
        <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-3">
          Error 404
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-8">
          Page not found
        </h1>

        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
            <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-zinc-400 text-xs font-mono ml-2">zsh · {user}@portfolio</span>
          </div>
          <div className="p-5 font-mono text-sm space-y-2 leading-relaxed">
            <p className="break-all">
              <span aria-hidden="true" className="text-[#C8D49A]">$ </span>
              <span className="text-zinc-100">cd {pathname}</span>
            </p>
            <p className="text-red-400 break-all">
              cd: no such file or directory: {pathname}
            </p>
            <p>
              <span aria-hidden="true" className="text-[#C8D49A]">$ </span>
              <span className="text-zinc-400">ls ~</span>
            </p>
            <p className="text-zinc-300">resume&nbsp;&nbsp;projects&nbsp;&nbsp;skills&nbsp;&nbsp;about&nbsp;&nbsp;contact</p>
            <p aria-hidden="true">
              <span className="text-[#C8D49A]">$ </span>
              <span className="inline-block w-2 h-4 align-middle bg-zinc-300 motion-safe:animate-pulse" />
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#6B7C2E] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#4A5A1E] transition-colors duration-200"
          >
            <span aria-hidden="true">←</span>
            cd ~ (back home)
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-zinc-700 font-medium text-sm px-6 py-3 rounded-full border border-zinc-400 hover:border-zinc-600 hover:text-zinc-900 transition-all duration-200"
          >
            Report a broken link
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
