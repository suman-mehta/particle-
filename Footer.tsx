"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
              <span className="font-mono text-sm tracking-[0.2em] text-white/60 uppercase">
                AM.dev
              </span>
            </div>
            <p className="font-body text-xs text-white/25 leading-relaxed max-w-[180px]">
              Available for select projects, 2025 onwards.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase mb-4">
              Navigate
            </div>
            {["Work", "About", "Process", "Contact"].map((item) => (
              <div key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-body text-xs text-white/35 hover:text-white/70 transition-colors duration-300"
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase mb-4">
              Get in touch
            </div>
            {[
              { label: "Email", href: "mailto:hello@alexmercer.dev", text: "hello@alexmercer.dev" },
              { label: "Twitter", href: "#", text: "@alexmercer" },
              { label: "GitHub", href: "#", text: "github/alexmercer" },
              { label: "LinkedIn", href: "#", text: "in/alexmercer" },
            ].map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="font-mono text-[10px] text-white/30 hover:text-[#c8ff00]/70 transition-colors duration-300"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-white/[0.04] gap-4">
          <span className="font-mono text-[10px] tracking-[0.15em] text-white/15 uppercase">
            © 2025 Alex Mercer. All rights reserved.
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-white/15 uppercase">
            Built with Next.js · Framer Motion · Canvas API
          </span>
        </div>
      </div>
    </footer>
  );
}
