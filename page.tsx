"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#c8ff00] to-transparent animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">Loading...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const scrollZoneRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Cursor />
      <Nav />

      {/* 500vh scroll zone — canvas + overlay share this ref */}
      <div ref={scrollZoneRef} className="relative" style={{ height: "500vh" }}>
        {/* Canvas fills the zone absolutely; its internal sticky does the scrubbing */}
        <div className="absolute inset-0">
          <ScrollyCanvas />
        </div>
        {/* Overlay sticks to viewport, reads progress from scrollZoneRef */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-10 pointer-events-none">
          <Overlay containerRef={scrollZoneRef} />
        </div>
      </div>

      <main className="relative bg-[#0a0a0a]">
        <Projects />
        <About />
        <Footer />
      </main>
    </>
  );
}
