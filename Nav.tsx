"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.nav
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
    >
      <motion.div
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
        className="absolute inset-0 bg-black/40 border-b border-white/[0.04]"
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
        <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
          AM.dev
        </span>
      </div>

      {/* Links */}
      <div className="relative z-10 hidden md:flex items-center gap-8">
        {["Work", "About", "Process", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-body text-xs tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors duration-300 uppercase"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="mailto:hello@alexmercer.dev"
        className="relative z-10 font-mono text-xs tracking-wider text-[#c8ff00] border border-[#c8ff00]/30 px-4 py-2 hover:bg-[#c8ff00]/10 transition-all duration-300"
      >
        hire me →
      </a>
    </motion.nav>
  );
}
