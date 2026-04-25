"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "8+", label: "Years of craft" },
  { value: "60+", label: "Projects shipped" },
  { value: "12", label: "Industries served" },
  { value: "∞", label: "Commits to beauty" },
];

const SKILLS = [
  "Next.js", "TypeScript", "Framer Motion", "Three.js",
  "GSAP", "WebGL / GLSL", "Figma", "Rust",
  "Node.js", "PostgreSQL", "AWS", "Canvas API",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.04]">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: Bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[1px] bg-[#c8ff00]" />
                <span className="font-mono text-xs tracking-[0.2em] text-[#c8ff00]/60 uppercase">
                  About
                </span>
              </div>

              <h2
                className="font-display mb-8 leading-[1.1]"
                style={{
                  fontSize: "clamp(36px, 4vw, 56px)",
                  fontWeight: 300,
                  color: "rgba(240,240,240,0.9)",
                }}
              >
                I obsess over the details
                <span className="italic text-white/50"> others skip.</span>
              </h2>

              <div className="space-y-4 font-body text-sm text-white/45 leading-relaxed">
                <p>
                  Based between Berlin and remote. I specialise in the space where
                  high-fidelity design meets high-performance engineering — the kind of
                  work that earns Awwwards honorable mentions and actually converts.
                </p>
                <p>
                  Before going independent, I led frontend at two Series B startups and
                  shipped interfaces for Fortune 500 brands. Now I work with studios,
                  founders, and agencies who care as much about craft as outcomes.
                </p>
              </div>

              <motion.a
                href="mailto:hello@alexmercer.dev"
                className="inline-flex items-center gap-3 mt-10 font-mono text-xs tracking-[0.2em] text-[#c8ff00] border border-[#c8ff00]/20 px-6 py-3 hover:bg-[#c8ff00]/08 transition-all duration-300 uppercase"
                whileHover={{ x: 4 }}
              >
                Start a project →
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Stats + Skills */}
          <div className="space-y-12">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="glass p-6"
                >
                  <div
                    className="font-display mb-1"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      fontWeight: 300,
                      color: "#c8ff00",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] text-white/30 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase mb-4">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
                    className="font-mono text-[10px] tracking-[0.1em] text-white/40 border border-white/[0.06] px-3 py-1.5 hover:border-[#c8ff00]/30 hover:text-[#c8ff00]/60 transition-all duration-300 cursor-default uppercase"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
