import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "You Choose Your Plan",
    desc: "Pick 15 eggs per week — our recommended weekly plan — or choose a custom quantity that suits your family exactly. No lock-in. Pause or cancel anytime.",
    accent: "Takes 2 minutes.",
  },
  {
    num: "02",
    title: "We Source From Our Network",
    desc: "Your order goes directly to our partner farms in Karnataka. We source from multiple trusted free-roaming farms — no single point of failure, always fresh. No warehouse, no cold storage.",
    accent: "Multi-farm network. Always available.",
  },
  {
    num: "03",
    title: "Packed with Full Traceability",
    desc: "Each carton is packed with the batch number and collection date. You know exactly which batch your egg came from and when it was collected. No guessing, no mystery.",
    accent: "Total transparency.",
  },
  {
    num: "04",
    title: "Delivered to Your Door",
    desc: "Eggs are collected fresh and dispatched the same day. Your delivery arrives within 24–48 hours of laying — straight from the farm, no cold room, no warehouse. After your first delivery, eggs flow continuously on your own rolling weekly cycle.",
    accent: "24–48 hrs · Farm to your door.",
  },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <div className="w-full bg-[#FAF7F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-5">
            The Process
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-[#0F1F18] leading-tight mb-6">
            Refreshingly simple.<br />
            <span className="text-[#1B3A2D] italic">Because honest food should be.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#0F1F18]/70 max-w-2xl mx-auto leading-relaxed mb-3">
            The problem was never eggs. It was the eleven hands they passed through before reaching you —
            each one adding days, cold storage, and a markup.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="text-base md:text-lg text-[#0F1F18]/70 max-w-2xl mx-auto leading-relaxed">
            NatiNest cuts every single one of them. Here is the whole process — no jargon, no fine print, no surprises.
          </motion.p>
        </div>

        {/* Step Cards */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants}
              className="bg-[#FAF7F0] p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-[#4A7C5F]/10 cursor-default">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A227] to-[#1B3A2D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <div className="text-[#1B3A2D]/[0.06] text-9xl font-serif italic font-bold absolute -right-3 -bottom-6 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500 leading-none">
                {step.num}
              </div>
              <div className="w-10 h-[3px] bg-[#C9A227] mb-8 group-hover:w-16 transition-all duration-300" />
              <h3 className="text-2xl font-serif font-bold text-[#0F1F18] mb-3 relative z-10">{step.title}</h3>
              <p className="text-[#0F1F18]/70 leading-relaxed relative z-10 mb-4">{step.desc}</p>
              <p className="text-[#C9A227] text-sm font-bold uppercase tracking-wider relative z-10">{step.accent}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Delivery callout — 24–48hrs messaging */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[#FAF7F0] border-l-4 border-[#C9A227] rounded-2xl px-8 py-7 mb-16 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-4xl shrink-0">🥚</div>
          <div>
            <p className="font-serif text-xl font-bold text-[#1B3A2D] mb-1">Laid Today. At Your Door by Tomorrow.</p>
            <p className="text-[#0F1F18]/60 text-base leading-relaxed">
              Every egg is collected and dispatched within hours of laying. Your delivery arrives <strong className="text-[#1B3A2D]">24–48 hours after collection</strong> — never from a cold room, never from a warehouse. Each customer has their own continuous rolling cycle, so there is no single bulk delivery day. Freshness is never a compromise.
            </p>
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-[#1B3A2D] rounded-3xl px-10 md:px-16 py-14 mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FAF7F0] mb-5">Why does this matter?</h2>
          <p className="text-[#FAF7F0]/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-3">
            Most Indian families have never tasted a truly wholesome, fresh egg. Not once. The last time you cracked
            one open, it had already spent weeks in a cold room — handled by people you will never know.
          </p>
          <p className="text-[#FAF7F0]/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Every NatiNest carton carries the collection date and batch number.
            That is not marketing. That is just honesty.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { val: "24–48hrs", label: "Farm to your door" },
              { val: "100%",     label: "Free-roaming hens" },
              { val: "₹0",       label: "Supermarket markup" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-[#C9A227]">{s.val}</div>
                <div className="text-[#FAF7F0]/50 text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Punchy quote */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-center py-6 mb-10">
          <p className="font-serif text-2xl text-[#0F1F18] font-bold mb-2">
            "Every carton tells you exactly when it was collected. That's not a feature — that's a right."
          </p>
          <p className="text-[#0F1F18]/50 mt-2">Nature built the recipe. We just deliver it — unchanged, unprocessed, unapologetic.</p>
        </motion.div>

        <div className="text-center">
          <Link href="/membership"
            className="inline-block bg-[#C9A227] text-[#0F1F18] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#b08e1f] hover:shadow-xl hover:-translate-y-1 transition-all">
            Join the Nest
          </Link>
        </div>
      </div>
    </div>
  );
}
