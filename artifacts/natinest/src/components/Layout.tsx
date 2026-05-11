import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/membership", label: "Join the Nest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF7F0] text-[#0F1F18]">

      {/* ── Single fixed header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#FAF7F0] border-b border-[#EDE8DC] shadow-sm flex items-center px-6 md:px-12 justify-between">

        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-full bg-[#1B3A2D] flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-serif text-xl font-bold text-[#C9A227] leading-none">N</span>
          </div>
          <div className="flex items-baseline gap-0">
            <span className="font-serif text-2xl font-bold text-[#0F1F18] group-hover:text-[#1B3A2D] transition-colors">Nati</span>
            <span className="font-serif text-2xl font-bold text-[#C9A227]">Nest</span>
          </div>
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-[5px] p-2 group"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-[#0F1F18] transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#0F1F18] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#0F1F18] transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="fixed inset-0 z-40 bg-[#1B3A2D] flex flex-col"
          >
            {/* Close bar */}
            <div className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#4A7C5F]/40">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#C9A227] flex items-center justify-center shrink-0">
                  <span className="font-serif text-xl font-bold text-[#1B3A2D] leading-none">N</span>
                </div>
                <span className="font-serif text-2xl font-bold text-white">Nati<span className="text-[#C9A227]">Nest</span></span>
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-7 h-7 text-[#FAF7F0]" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-10 md:px-20 gap-2">
              {NAV.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                >
                  <Link
                    href={href}
                    className={`block font-serif text-5xl md:text-7xl font-bold leading-tight py-2 transition-colors ${
                      location === href ? "text-[#C9A227]" : "text-[#FAF7F0]/80 hover:text-[#C9A227]"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer strip in overlay */}
            <div className="px-10 md:px-20 pb-10 flex items-center justify-between">
              <p className="text-[#4A7C5F] text-sm">Karnataka, India</p>
              <a
                href="https://natinest.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A227] font-semibold text-sm hover:underline"
              >
                natinest.in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header spacer */}
      <div className="h-16 shrink-0" />

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B3A2D] text-[#FAF7F0] border-t-4 border-[#C9A227]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            <div>
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-full bg-[#C9A227] flex items-center justify-center shrink-0">
                  <span className="font-serif text-2xl font-bold text-[#1B3A2D] leading-none">N</span>
                </div>
                <span className="font-serif text-2xl font-bold">Nati<span className="text-[#C9A227]">Nest</span></span>
              </Link>
              <p className="text-[#4A7C5F] text-base font-serif italic leading-relaxed max-w-xs">
                Free roaming. Full truth. Zero compromise.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#C9A227] mb-2">Explore</h4>
              {NAV.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-white text-[#4A7C5F] transition-colors w-fit">{label}</Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#C9A227] mb-1">NatiNest</h4>
              <p className="text-[#EDE8DC]/70 text-sm leading-relaxed max-w-xs">
                Born from a genuine frustration with fake "farm-fresh" labels — we connect city families directly to Karnataka's finest free-roaming farms. No names needed. Only honest eggs.
              </p>
              <p className="text-[#4A7C5F] text-sm mt-1">Karnataka, India</p>
            </div>
          </div>

          <div className="border-t border-[#4A7C5F]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#4A7C5F] text-sm">© {new Date().getFullYear()} NatiNest. All rights reserved.</p>
            <a href="https://natinest.in" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] font-semibold text-sm hover:underline">
              natinest.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
