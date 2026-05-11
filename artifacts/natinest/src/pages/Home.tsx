import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MarqueeStrip } from "@/components/MarqueeStrip";

import { farmShed, farmFence, farmEggs, farmCoop, farmLand } from "@/assets";

const heroPhotos = [farmLand, farmFence, farmCoop, farmShed, farmEggs];

const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/* ─── Customer quotes for the hero section ─── */
const customerQuotes = [
  {
    quote: "The yolk is so deep orange, my kids thought I'd switched to a different food entirely. I can never go back to supermarket eggs.",
    location: "Bengaluru",
  },
  {
    quote: "I cracked the first egg and just stood there. It smelled like something I remember from my grandfather's village. That smell is real.",
    location: "Mysuru",
  },
  {
    quote: "Finally — an egg that actually tastes like an egg. The weekly delivery is flawless. We haven't skipped a week in six months.",
    location: "Bengaluru",
  },
];

/* ─── 4 launch tiles ─── */
const tiles = [
  {
    href:    "/story",
    photo:   farmFence,
    num:     "01",
    label:   "Our Story",
    tag:     "How It Began",
    copy:    "Two friends, one visit to a Karnataka farm, and a frustration with every 'farm-fresh' lie on a supermarket shelf.",
    cta:     "Read the Story",
  },
  {
    href:    "/how-it-works",
    photo:   farmCoop,
    num:     "02",
    label:   "How It Works",
    tag:     "The Process",
    copy:    "No warehouses. No cold storage. No mystery. From the finest Karnataka farms to your kitchen — just honest eggs.",
    cta:     "See the Process",
  },
  {
    href:    "/membership",
    photo:   farmEggs,
    num:     "03",
    label:   "Join the Nest",
    tag:     "Membership · ₹20/egg",
    copy:    "Start with 15 eggs a week — or choose exactly how many you need. We handle everything else.",
    cta:     "View Plans",
    highlight: true,
  },
  {
    href:    "/story",
    photo:   farmLand,
    num:     "04",
    label:   "The Promise",
    tag:     "The NatiNest Standard",
    copy:    "Every carton carries the batch number and collection date. That is not marketing — that is accountability from farms we personally trust.",
    cta:     "Learn More",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % heroPhotos.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(p => (p + 1) % customerQuotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full">

      {/* ═══ HERO: Split layout with Ken Burns slideshow ═══ */}
      <section className="w-full min-h-[calc(100vh-4rem)] flex flex-col md:flex-row">

        {/* Left — cycling Ken Burns photos */}
        <div className="w-full md:w-1/2 h-[62vw] md:h-[calc(100vh-4rem)] relative overflow-hidden bg-[#0F1F18]">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute inset-0"
            >
              <img
                src={heroPhotos[current]}
                alt="Karnataka farm"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F18]/65 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1F18]/20 z-10 pointer-events-none" />

          {/* Cycling customer quote overlay */}
          <div className="absolute bottom-16 left-6 right-6 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="bg-[#0F1F18]/60 backdrop-blur-sm rounded-xl p-4 border-l-2 border-[#C9A227]"
              >
                <p className="text-[#FAF7F0] font-serif italic text-sm leading-relaxed mb-2">
                  "{customerQuotes[quoteIdx].quote}"
                </p>
                <p className="text-[#C9A227] text-[10px] font-bold uppercase tracking-widest">
                  — Member · {customerQuotes[quoteIdx].location}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <p className="text-[#FAF7F0]/60 text-[10px] font-bold uppercase tracking-[0.25em]">
              Partner Farms · Karnataka, India
            </p>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {heroPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === i ? "bg-[#C9A227] scale-125" : "bg-white/35"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right — headline + CTA */}
        <div className="w-full md:w-1/2 px-8 md:px-14 lg:px-20 py-16 flex flex-col justify-center bg-[#FAF7F0]">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-6">
              Karnataka, India · Early Access
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0F1F18] leading-[1.08] mb-6">
              Eggs that carry<br />
              <span className="text-[#1B3A2D] italic">the truth of the farm.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#0F1F18]/70 mb-4 max-w-md leading-relaxed">
              Your supermarket egg has been sitting in cold storage for up to 45 days. Ours was laid this morning. You will see the difference the second you crack it open.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#0F1F18]/70 mb-4 max-w-md leading-relaxed">
              Zero middlemen. Free-roaming hens. Zero artificial feed. Weekly delivery — straight from Karnataka's finest farms to your kitchen.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm font-bold text-[#1B3A2D] mb-10 max-w-md tracking-wide">
              ₹20/egg. The most honest price tag in your kitchen.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center">
              <Link
                href="/membership"
                className="inline-block bg-[#C9A227] text-[#0F1F18] px-8 py-4 rounded-full text-base font-bold hover:bg-[#b08e1f] hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Become a Founding Member
              </Link>
              <Link
                href="/story"
                className="text-sm font-medium text-[#1B3A2D] border-b-2 border-[#1B3A2D]/30 pb-0.5 hover:border-[#1B3A2D] transition-colors"
              >
                Our Story →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeStrip />

      {/* ═══ LAUNCH TILES — 4 big page portals ═══ */}
      <section className="w-full">
        <div className="bg-[#0F1F18] py-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A227] mb-3"
          >
            Explore NatiNest
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-[#FAF7F0] font-bold"
          >
            Four pages. One honest truth.
          </motion.h2>
        </div>

        {/* 2 × 2 grid of big tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {tiles.map((tile, idx) => (
            <Link
              key={tile.href + tile.num}
              href={tile.href}
              className="block relative overflow-hidden group"
              style={{ minHeight: "62vw" }}
            >
              {/* Ken Burns photo background */}
              <motion.img
                src={tile.photo}
                alt={tile.label}
                initial={{ scale: 1.0 }}
                whileInView={{ scale: 1.08 }}
                viewport={{ once: true }}
                transition={{ duration: 7, ease: "linear" }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0F1F18]/55 group-hover:bg-[#0F1F18]/40 transition-colors duration-500" />

              {/* Golden border for highlighted tile */}
              {tile.highlight && (
                <div className="absolute inset-0 border-4 border-[#C9A227] pointer-events-none" />
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-14 min-h-[62vw] md:min-h-[44vw] lg:min-h-[36vw]">
                {/* Ghost number top-right */}
                <span className="text-[#C9A227]/30 font-serif text-8xl font-bold absolute top-6 right-8 leading-none select-none">
                  {tile.num}
                </span>

                <span className="text-[#C9A227] text-[10px] font-bold uppercase tracking-[0.28em] mb-3 block">
                  {tile.tag}
                </span>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-[#C9A227] transition-colors duration-300">
                  {tile.label}
                </h3>
                <p className="text-[#FAF7F0]/65 text-base leading-relaxed max-w-sm mb-6">
                  {tile.copy}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A227] group-hover:gap-4 transition-all duration-300 uppercase tracking-wider">
                  {tile.cta}
                  <span className="text-lg">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ BOTTOM CTA STRIP ═══ */}
      <section className="bg-[#FAF7F0] py-20 px-6 text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl md:text-5xl text-[#0F1F18] font-bold mb-5">
            One egg. One truth. <span className="text-[#C9A227] italic">Zero compromise.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#0F1F18]/60 text-lg mb-10">
            Supermarkets sell eggs. We deliver mornings you can trust.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/membership"
              className="inline-block bg-[#C9A227] text-[#0F1F18] hover:bg-[#b08e1f] px-10 py-5 rounded-full font-bold text-xl transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Reserve Your Spot Today
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
