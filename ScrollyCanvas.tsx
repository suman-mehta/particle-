"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 120;
const FRAME_DELAY = "0.066s";

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-${FRAME_DELAY}.webp`;
}

export default function ScrollyCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) { ctx.resetTransform(); ctx.scale(dpr, dpr); }
    const img = imagesRef.current[currentFrameRef.current];
    if (img?.complete) drawFrame(img);
  }, [drawFrame]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (i === 0) drawFrame(img);
        if (loaded === TOTAL_FRAMES) {
          const cur = imagesRef.current[currentFrameRef.current];
          if (cur?.complete) drawFrame(cur);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, resizeCanvas]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.max(Math.round(latest), 0), TOTAL_FRAMES - 1);
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const img = imagesRef.current[index];
      if (img?.complete) drawFrame(img);
    });
  });

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#0a0a0a" }} />
        <canvas ref={canvasRef} className="absolute inset-0" style={{ display: "block" }} />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.6) 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.95))" }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, transparent, rgba(10,10,10,0.7))" }} />
      </div>
    </div>
  );
}
