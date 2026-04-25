"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Forma Studio",
    category: "Brand Identity · Web",
    year: "2024",
    description:
      "A full rebrand and digital presence for a Copenhagen architecture studio. WebGL-powered portfolio with real-time 3D renders.",
    tags: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
    accent: "#c8ff00",
    size: "large",
  },
  {
    id: "02",
    title: "Pulse Finance",
    category: "Product Design · Engineering",
    year: "2024",
    description:
      "Real-time financial dashboard with AI-driven insights. Sub-16ms render cycles across 40+ live data streams.",
    tags: ["React", "D3.js", "WebSockets", "Rust"],
    accent: "#00d4ff",
    size: "small",
  },
  {
    id: "03",
    title: "Kinetic Type",
    category: "Creative Development",
    year: "2023",
    description:
      "An experimental typographic playground exploring the boundaries of CSS and WebGL motion design.",
    tags: ["WebGL", "GLSL", "TypeScript"],
    accent: "#ff6b6b",
    size: "small",
  },
  {
    id: "04",
    title: "Meridian OS",
    category: "Interface Design · Frontend",
    year: "2023",
    description:
      "A spatial computing interface concept for next-generation hardware. 60fps animations, zero layout thrash.",
    tags: ["React", "Framer Motion", "Canvas API"],
    accent: "#a78bfa",
    size: "large",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass glow-hover rounded-none group relative overflow-hidden ${
        project.size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
      data-cursor
    >
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${project.accent}08 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[280px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/20 uppercase">
              {project.id}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: `${project.accent}99` }}
            >
              {project.category}
            </span>
          </div>
          <span className="font-mono text-xs text-white/20">{project.year}</span>
        </div>

        {/* Title */}
        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="font-display mb-4 leading-none"
            style={{
              fontSize: project.size === "large" ? "clamp(36px, 4vw, 58px)" : "clamp(28px, 3vw, 42px)",
              fontWeight: 300,
              color: "rgba(240,240,240,0.92)",
            }}
          >
            {project.title}
          </h3>
          <p className="font-body text-sm text-white/40 leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-8 pt-6 border-t border-white/[0.05]">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.15em] text-white/25 border border-white/[0.06] px-2 py-1 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <motion.div
            className="flex items-center gap-2 font-mono text-xs tracking-wider"
            style={{ color: project.accent }}
            whileHover={{ x: 4 }}
          >
            <span className="hidden md:inline opacity-60">View</span>
            <span className="text-lg leading-none">→</span>
          </motion.div>
        </div>
      </div>

      {/* Accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-32 px-6 md:px-12 lg:px-20">
      {/* Section header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between mb-16 md:mb-20"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#c8ff00]" />
            <span className="font-mono text-xs tracking-[0.2em] text-[#c8ff00]/60 uppercase">
              Selected Work
            </span>
          </div>
          <h2
            className="font-display leading-none"
            style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              color: "rgba(240,240,240,0.9)",
            }}
          >
            Case Studies
          </h2>
        </div>

        <span className="font-mono text-xs text-white/20 hidden md:block">
          2023 — present
        </span>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex justify-center mt-16"
      >
        <button className="group flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-white/30 hover:text-[#c8ff00] transition-colors duration-300 uppercase">
          <div className="w-12 h-[1px] bg-current transition-all duration-300 group-hover:w-20" />
          View all projects
          <div className="w-12 h-[1px] bg-current transition-all duration-300 group-hover:w-20" />
        </button>
      </motion.div>
    </section>
  );
}
