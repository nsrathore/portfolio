"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { personal, timeline } from "@/data/portfolio";

export default function About() {
  const { ref, inView } = useInView();
  const prefersReduced = useReducedMotion();

  const animateIn = (delay = 0) => ({
    initial: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    animate: prefersReduced ? { opacity: 1, y: 0 } : (inView ? { opacity: 1, y: 0 } : {}),
    transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : delay },
  });

  return (
    <section id="about" aria-label="About me" className="section-padding bg-[#F9F8F5]">
      <div className="container-wide" ref={ref}>
        <motion.div
          {...animateIn()}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-[#4A5A1E] mb-3">
            About Me
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            Engineering with intention
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Text */}
          <motion.div
            {...animateIn(0.1)}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-zinc-600 font-light leading-relaxed">
              I&apos;m a Software Engineer II at{" "}
              <span className="text-zinc-900 font-medium">Zotec Partners</span>,
              where I build the systems that power healthcare billing for some of
              the largest medical practices in the US. My work lives at the
              intersection of{" "}
              <span className="text-zinc-900 font-medium">
                revenue operations, patient experience, and cloud infrastructure
              </span>{" "}
              - where reliability isn&apos;t optional.
            </p>
            <p className="text-zinc-600 font-light leading-relaxed">
              I&apos;m drawn to problems that have both technical depth and
              real-world consequences: processing millions of insurance claims,
              accelerating denial resolution, securing PHI at scale. I care
              about{" "}
              <span className="text-zinc-900 font-medium">
                eliminating technical debt systematically
              </span>
              , not just shipping features.
            </p>
            <p className="text-zinc-600 font-light leading-relaxed">
              Beyond individual contributions, I&apos;ve led cross-functional
              security initiatives, stepped in as{" "}
              <span className="text-zinc-900 font-medium">
                interim tech lead
              </span>{" "}
              under pressure, and standardized CI/CD practices across
              engineering teams. I actively leverage AI-assisted development
              tools like Cursor to ship faster without sacrificing code quality.
            </p>

            {/* Education card */}
            <h3 className="sr-only">Education</h3>
            <div className="mt-8 p-5 bg-[#F2F5E8] border border-[#C8D49A] rounded-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-[#6B7C2E] flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                >
                  PU
                </div>
                <div>
                  <h4 className="font-display font-bold text-zinc-900 text-sm">
                    Purdue University - West Lafayette
                  </h4>
                  <div className="text-xs text-zinc-600 font-mono mt-0.5">
                    B.S. Computer Science · GPA 3.4 · May 2021
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            {...animateIn(0.2)}
            className="lg:col-span-2"
          >
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">
              Career Timeline
            </p>

            <h3 className="sr-only">Career Timeline</h3>

            <div className="relative pl-5">
              {/* Vertical line */}
              <div aria-hidden="true" className="absolute left-0 top-2 bottom-0 w-px bg-zinc-200" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div aria-hidden="true" className="absolute -left-5 top-[5px] w-2 h-2 rounded-full bg-[#6B7C2E] border-2 border-white ring-2 ring-[#6B7C2E]" />

                    <div className="font-mono text-xs text-[#4A5A1E] mb-1">
                      {item.date}
                    </div>
                    <h4 className="font-display font-bold text-zinc-900 text-sm">
                      {item.role}
                    </h4>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      {item.place}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About photo */}
            <div className="mt-10 rounded-2xl overflow-hidden">
              <Image
                src="/images/about.jpeg"
                alt="Nikhilendra Rathore at work"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* DevOps terminal card */}
            <div className="mt-6 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800" aria-label="CI/CD pipeline example">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-zinc-400 text-xs font-mono ml-2">
                  CI/CD · main
                </span>
              </div>
              <div className="p-4 space-y-2 font-mono text-xs overflow-hidden" aria-label="Pipeline steps">
                {[
                  { icon: "✓", label: "lint & type-check", color: "text-green-400" },
                  { icon: "✓", label: "unit tests · TDD", color: "text-green-400" },
                  { icon: "✓", label: "docker build", color: "text-green-400" },
                  { icon: "✓", label: "terraform plan", color: "text-green-400" },
                  { icon: "▶", label: "deploy → AWS ECS", color: "text-yellow-400" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span aria-hidden="true" className={step.color}>{step.icon}</span>
                    <span className="text-zinc-400">{step.label}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-zinc-800 text-green-400">
                  ● Deploying to production...
                  <div className="text-zinc-300 mt-1">
                    ECS cluster: prod-healthcare-us-east-1
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
