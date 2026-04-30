"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { personal, timeline } from "@/data/portfolio";

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="section-padding">
      <div className="container-wide" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-[#3B5BDB] mb-3">
            About Me
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            Engineering with intention
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-zinc-500 font-light leading-relaxed">
              I&apos;m a Software Engineer II at{" "}
              <span className="text-zinc-900 font-medium">Zotec Partners</span>,
              where I build the systems that power healthcare billing for some of
              the largest medical practices in the US. My work lives at the
              intersection of{" "}
              <span className="text-zinc-900 font-medium">
                revenue operations, patient experience, and cloud infrastructure
              </span>{" "}
              — where reliability isn&apos;t optional.
            </p>
            <p className="text-zinc-500 font-light leading-relaxed">
              I&apos;m drawn to problems that have both technical depth and
              real-world consequences: processing millions of insurance claims,
              accelerating denial resolution, securing PHI at scale. I care
              about{" "}
              <span className="text-zinc-900 font-medium">
                eliminating technical debt systematically
              </span>
              , not just shipping features.
            </p>
            <p className="text-zinc-500 font-light leading-relaxed">
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
            <div className="mt-8 p-5 bg-[#EEF2FF] border border-[#C5D0FA] rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B5BDB] flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                  PU
                </div>
                <div>
                  <div className="font-display font-bold text-zinc-900 text-sm">
                    Purdue University — West Lafayette
                  </div>
                  <div className="text-xs text-zinc-500 font-mono mt-0.5">
                    B.S. Computer Science · GPA 3.4 · May 2021
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Career Timeline
            </p>

            <div className="relative pl-5">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-0 w-px bg-zinc-200" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-5 top-[5px] w-2 h-2 rounded-full bg-[#3B5BDB] border-2 border-white ring-2 ring-[#3B5BDB]" />

                    <div className="font-mono text-xs text-[#3B5BDB] mb-1">
                      {item.date}
                    </div>
                    <div className="font-display font-bold text-zinc-900 text-sm">
                      {item.role}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
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
                alt={personal.name}
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* DevOps terminal card */}
            <div className="mt-6 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-zinc-500 text-xs font-mono ml-2">
                  CI/CD · main
                </span>
              </div>
              <div className="p-4 space-y-2 font-mono text-xs">
                {[
                  { icon: "✓", label: "lint & type-check", color: "text-green-400" },
                  { icon: "✓", label: "unit tests · TDD", color: "text-green-400" },
                  { icon: "✓", label: "docker build", color: "text-green-400" },
                  { icon: "✓", label: "terraform plan", color: "text-green-400" },
                  { icon: "▶", label: "deploy → AWS ECS", color: "text-yellow-400" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={step.color}>{step.icon}</span>
                    <span className="text-zinc-400">{step.label}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-zinc-800 text-green-400">
                  ● Deploying to production...
                  <div className="text-zinc-600 mt-1">
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
