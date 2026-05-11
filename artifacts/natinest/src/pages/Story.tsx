import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

import { farmLand, farmFence, farmEggs, farmShed } from "@/assets";

const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const farmQuotes = [
  {
    quote: "These hens eat what the land gives them. The egg you get is exactly that — the land itself, in a shell.",
    attr: "From Karnataka's red-soil farms",
  },
  {
    quote: "No cage. No crowd. Just open ground, morning sun, and whatever the earth provides. That is all it takes.",
    attr: "Free-roaming farm, Karnataka",
  },
  {
    quote: "The yolk turns deep orange when the bird lives right. You cannot fake that colour. Nature doesn't lie.",
    attr: "Multi-generational farm, Karnataka",
  },
];

export default function Story() {
  return (
    <div className="flex flex-col w-full bg-[#FAF7F0]">

      {/* Hero Banner with Ken Burns */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-[#0F1F18] overflow-hidden">
        <motion.img
          src={farmLand}
          alt="Karnataka farmland"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 9, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F18] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227]"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-white font-bold max-w-4xl leading-tight"
          >
            Every 'farm fresh' label is a lie.{" "}
            <span className="text-[#C9A227] italic">Except ours.</span>
          </motion.h1>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-4">How It Started</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0F1F18] font-bold mb-8">
                Born from a <span className="text-[#C9A227] italic">simple frustration.</span>
              </h2>
              <div className="text-lg text-gray-800 space-y-6 leading-relaxed">
                <p>
                  We wanted real eggs. Not the pale, watery supermarket kind packed in cold storage for
                  30–45 days — but the kind with deep orange yolks that smell like the farm, that taste like something.
                </p>
                <p>
                  So we visited farms in Karnataka. What we saw changed everything — free-roaming hens,
                  wholesome natural feed, red Karnataka soil, and eggs with deep orange yolks that no supermarket
                  shelf could ever match.
                </p>
                <p>
                  The farms had everything. Except a way to reach city families without losing half the value
                  to middlemen. NatiNest is that connection — sourcing from the finest Karnataka farms and delivering
                  directly to you. No warehouses, no middlemen, no markup. Just an honest price for an honest egg.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#1B3A2D]/10 pt-10">
                {[
                  { num: "0",    label: "Middlemen",   sub: "Farm direct" },
                  { num: "100%", label: "Traceable",   sub: "Know your batch" },
                  { num: "∞",   label: "Transparent", sub: "No surprises" },
                ].map((stat) => (
                  <div key={stat.num} className="text-center">
                    <div className="text-4xl font-serif font-bold text-[#1B3A2D]">{stat.num}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227] mt-1">{stat.label}</div>
                    <div className="text-xs text-[#0F1F18]/50 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Photo grid with Ken Burns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 h-[600px]"
            >
              <div className="col-span-2 h-1/2 overflow-hidden rounded-xl">
                <motion.img
                  src={farmFence} alt="Chickens on fence"
                  initial={{ scale: 1.0 }} whileInView={{ scale: 1.07 }}
                  viewport={{ once: true }} transition={{ duration: 7, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full overflow-hidden rounded-xl">
                <motion.img
                  src={farmLand} alt="Karnataka farm land"
                  initial={{ scale: 1.0 }} whileInView={{ scale: 1.07 }}
                  viewport={{ once: true }} transition={{ duration: 8, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full overflow-hidden rounded-xl">
                <motion.img
                  src={farmEggs} alt="Fresh eggs in basket"
                  initial={{ scale: 1.0 }} whileInView={{ scale: 1.07 }}
                  viewport={{ once: true }} transition={{ duration: 8, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farm Quotes Section — replaces Know Your Farmer */}
      <section className="bg-[#1B3A2D] py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-14"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-4">From the Source</p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#FAF7F0] font-bold">
              The farms <span className="text-[#C9A227] italic">speak for themselves.</span>
            </h2>
            <p className="text-[#EDE8DC]/60 text-base mt-4 max-w-xl mx-auto">
              We source from multiple Karnataka farms — each one chosen for its commitment to free-roaming, natural feed, and honesty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {farmQuotes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FAF7F0]/5 border border-[#C9A227]/20 rounded-2xl p-8"
              >
                <p className="text-[#C9A227] text-3xl font-serif leading-none mb-4">"</p>
                <p className="text-[#EDE8DC] font-serif italic text-base leading-relaxed mb-6">
                  {item.quote}
                </p>
                <p className="text-[#4A7C5F] text-xs font-bold uppercase tracking-wider">— {item.attr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-[#FAF7F0] py-12 border-y border-[#1B3A2D]/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 text-center">
            <div>
              <div className="font-serif text-4xl text-[#C9A227] font-bold">0</div>
              <div className="uppercase tracking-widest text-sm font-bold text-[#1B3A2D] mt-2">Middlemen</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#1B3A2D]/20" />
            <div>
              <div className="font-serif text-4xl text-[#4A7C5F] font-bold">100%</div>
              <div className="uppercase tracking-widest text-sm font-bold text-[#1B3A2D] mt-2">Traceable</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#1B3A2D]/20" />
            <div>
              <div className="font-serif text-4xl text-[#0F1F18] font-bold">∞</div>
              <div className="uppercase tracking-widest text-sm font-bold text-[#1B3A2D] mt-2">Transparent</div>
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#0F1F18] font-bold">
              What Makes a NatiNest Egg Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: farmEggs, alt: "Eggs in wicker basket",     title: "Hens With Space & Purpose",
                body: "No cages. No crowding. Our birds live as nature intended, scratching in the dirt and roaming free under the Karnataka sun." },
              { img: farmLand, alt: "Karnataka coconut farmland", title: "Karnataka's Natural Land",
                body: "Raised on the rich red soil of Karnataka plantations. The environment shapes the egg — and these eggs are extraordinary." },
              { img: farmShed, alt: "Inside the farm shed",       title: "Zero Artificial Feed",
                body: "No synthetic colours to fake a dark yolk. Only wholesome natural foraging and quality grains produce our true deep orange yolks." },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={card.img} alt={card.alt}
                    initial={{ scale: 1.0 }} whileInView={{ scale: 1.07 }}
                    viewport={{ once: true }} transition={{ duration: 7, ease: "linear" }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-[#1B3A2D] mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section — replaces founders with names */}
      <section className="bg-[#1B3A2D] py-24 px-6 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-4">Why NatiNest Exists</p>
          <h2 className="font-serif text-4xl font-bold mb-6">
            Built by people who got <span className="text-[#C9A227] italic">tired of being lied to.</span>
          </h2>
          <p className="text-[#EDE8DC]/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            We're not a corporation. We're not farm owners. We're a small team that visited Karnataka farms,
            saw what a real egg looks and tastes like, and decided no city family should have to guess.
          </p>

          {/* Mission quote */}
          <div className="bg-[#FAF7F0]/5 border border-[#C9A227]/30 rounded-2xl px-10 py-8 max-w-2xl mx-auto mb-12">
            <p className="font-serif text-xl md:text-2xl text-[#FAF7F0] italic leading-relaxed">
              "We make nothing. We grow nothing. We simply remove every hand between the farm and your kitchen — and that changes everything."
            </p>
            <p className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mt-4">— The NatiNest Team</p>
          </div>

          <Link
            href="/membership"
            className="inline-block bg-[#C9A227] hover:bg-[#b08e1f] text-[#0F1F18] px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:-translate-y-1"
          >
            Join the Nest
          </Link>
        </div>
      </section>
    </div>
  );
}
