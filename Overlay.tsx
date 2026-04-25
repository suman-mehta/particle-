"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface OverlaySectionProps {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
  children: React.ReactNode;
  className?: string;
  yOffset?: [number, number];
}

function OverlaySection({
  scrollYProgress,
  inStart,
  inEnd,
  outStart,
  outEnd,
  children,
  className = "",
  yOffset = [30, -30],
}: OverlaySectionProps) {
  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [yOffset[0], 0, 0, yOffset[1]]
  );
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{ opacity, y: springY }}
      className={`absolute pointer-events-none z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface OverlayProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Overlay({ containerRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll indicator opacity
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      {/* ── Section 1: Hero — center, 0% → 20% ── */}
      <OverlaySectionHero
        scrollYProgress={scrollYProgress}
        inStart={0}
        inEnd={0.05}
        outStart={0.15}
        outEnd={0.22}
      />

      {/* ── Section 2: "I build digital experiences" — left, 30% → 50% ── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inStart={0.28}
        inEnd={0.36}
        outStart={0.48}
        outEnd={0.56}
        className="left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm"
        yOffset={[40, -40]}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-[#c8ff00]" />
            <span className="font-mono text-xs text-[#c8ff00]/70 tracking-[0.2em] uppercase">
              02 / craft
            </span>
          </div>
          <h2
            className="font-display text-5xl md:text-7xl text-white/95 leading-[0.9]"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            I build
            <br />
            <em className="not-italic text-[#c8ff00]">digital</em>
            <br />
            experiences.
          </h2>
          <p className="font-body text-sm text-white/40 tracking-wide leading-relaxed max-w-[220px]">
            From micro-interactions to full-stack systems — engineered with obsessive precision.
          </p>
        </div>
      </OverlaySection>

      {/* ── Section 3: "Bridging design and engineering" — right, 60% → 80% ── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inStart={0.58}
        inEnd={0.66}
        outStart={0.78}
        outEnd={0.86}
        className="right-8 md:right-16 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm text-right"
        yOffset={[40, -40]}
      >
        <div className="flex flex-col gap-4 items-end">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#c8ff00]/70 tracking-[0.2em] uppercase">
              03 / philosophy
            </span>
            <div className="w-6 h-[1px] bg-[#c8ff00]" />
          </div>
          <h2
            className="font-display text-5xl md:text-7xl text-white/95 leading-[0.9]"
            style={{ fontWeight: 300 }}
          >
            Bridging
            <br />
            <span className="italic text-white/60">design &</span>
            <br />
            engineering.
          </h2>
          <p className="font-body text-sm text-white/40 tracking-wide leading-relaxed max-w-[220px]">
            The intersection where beautiful meets functional. That&apos;s where I live.
          </p>
        </div>
      </OverlaySection>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
          scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 h-4 bg-[#c8ff00]"
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Frame counter (aesthetic, top right) ── */}
      <FrameCounter scrollYProgress={scrollYProgress} />
    </>
  );
}

// ── Hero section (special layout) ──────────────────────────────────────────
function OverlaySectionHero({
  scrollYProgress,
  inStart,
  inEnd,
  outStart,
  outEnd,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [50, 0, 0, -50]
  );
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{ opacity, y: springY }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-[#c8ff00]/50" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#c8ff00]/60 uppercase">
          01 / identity
        </span>
        <div className="w-8 h-[1px] bg-[#c8ff00]/50" />
      </div>

      {/* Name */}
      <h1
        className="font-display text-center leading-none mb-3"
        style={{
          fontSize: "clamp(56px, 10vw, 130px)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "rgba(240,240,240,0.95)",
        }}
      >
        Alex Mercer.
      </h1>

      {/* Role */}
      <p
        className="font-body text-center tracking-[0.2em] uppercase"
        style={{
          fontSize: "clamp(11px, 1.5vw, 14px)",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.25em",
        }}
      >
        Creative Developer
        <span className="text-[#c8ff00]/60 mx-3">·</span>
        Digital Craftsman
        <span className="text-[#c8ff00]/60 mx-3">·</span>
        Systems Thinker
      </p>
    </motion.div>
  );
}

// ── Aesthetic frame counter ─────────────────────────────────────────────────
function FrameCounter({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const frame = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 119]
  );

  return (
    <motion.div
      className="fixed top-6 right-8 z-20 pointer-events-none hidden md:flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.span className="font-mono text-[10px] text-white/20 tracking-[0.15em]">
        {useTransform(frame, (v) => String(Math.round(v)).padStart(3, "0"))}
        <span className="text-white/10"> / 119</span>
      </motion.span>
    </motion.div>
  );
}
