import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, MapPin, Package, Star, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { farmEggs } from "@/assets";

const formSchema = z.object({
  fullName:     z.string().min(2, "Name is required"),
  phone:        z.string().min(10, "Valid phone number is required"),
  email:        z.string().email("Valid email is required"),
  address:      z.string().min(10, "Please enter your full delivery address"),
  city:         z.string().min(1, "Please select a city"),
  plan:         z.string().min(1, "Please select a plan"),
  customCount:  z.string().optional(),
  message:      z.string().optional(),
}).refine((data) => {
  if (data.plan === "custom") {
    const count = parseInt(data.customCount ?? "0");
    return count >= 6 && count <= 500;
  }
  return true;
}, {
  message: "Please enter a valid egg count (6–500)",
  path: ["customCount"],
});

type FormValues = z.infer<typeof formSchema>;

const tiers = [
  {
    id: "weekly",
    name: "Weekly Nest",
    perEgg: "₹20",
    weeklyTotal: "₹300",
    monthlyNote: "~₹1,200/month",
    volume: "15 eggs/week",
    tag: "Perfect for individuals & couples",
    popular: true,
    features: [
      "15 wholesome eggs delivered every week",
      "Free weekly delivery",
      "Batch number & collection date on every carton",
      "Full traceability — sourced from verified Karnataka farms",
      "First delivery within 7 days of confirmation",
      "Continuous weekly flow — not a single bulk day",
      "Pause or cancel anytime",
    ],
  },
  {
    id: "custom",
    name: "Custom Nest",
    perEgg: "₹20",
    weeklyTotal: "Your choice",
    monthlyNote: "₹20 per egg",
    volume: "You choose",
    tag: "Pick your exact weekly count",
    popular: false,
    features: [
      "You specify exactly how many eggs per week",
      "Minimum 6 eggs, no maximum limit",
      "Free weekly delivery",
      "Batch number & collection date on every carton",
      "Full traceability — sourced from verified Karnataka farms",
      "First delivery within 7 days of confirmation",
      "Pause or cancel anytime",
    ],
  },
];

const perks = [
  { icon: Truck,       title: "Farm-to-door, every week",          desc: "Collected fresh. Delivered directly. No cold-storage detour." },
  { icon: MapPin,      title: "Full traceability on every carton", desc: "Batch number and collection date — always visible, never hidden." },
  { icon: Package,     title: "Zero supermarket markup",           desc: "You pay fairly. Not a retail chain." },
  { icon: Star,        title: "Seasonal farm updates",             desc: "Photos, stories, and news straight from our partner farms." },
  { icon: ShieldCheck, title: "Pause or cancel anytime",           desc: "No lock-in. No penalties. Your membership, your rules." },
];

const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Membership() {
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      plan: "weekly",
      customCount: "",
      message: "",
    },
  });

  const selectedPlan = form.watch("plan");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
    setSuccess(true);
    setTimeout(() => { formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
  };

  const handleSelectPlan = (planId: string) => {
    form.setValue("plan", planId);
    setTimeout(() => { formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
  };

  return (
    <div className="w-full bg-[#FAF7F0] min-h-screen">

      {/* Header */}
      <div className="relative bg-[#1B3A2D] text-center py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#C9A227 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-5 relative z-10">
          Membership
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif font-bold text-[#FAF7F0] mb-6 leading-tight relative z-10">
          Join the <span className="text-[#C9A227] italic">Nest.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[#FAF7F0]/60 text-xl font-serif italic max-w-2xl mx-auto relative z-10 mb-4">
          Real eggs. Real farms. Founding spots are limited — because real farms have real limits.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
          className="text-[#FAF7F0]/45 text-base max-w-xl mx-auto relative z-10 leading-relaxed">
          ₹20/egg — wholesome, honest, traceable.
        </motion.p>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.12 }}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative ${
                tier.popular ? "border-2 border-[#C9A227] ring-4 ring-[#C9A227]/10" : "border-2 border-transparent"
              }`}
            >
              {tier.popular && (
                <div className="bg-[#C9A227] text-[#0F1F18] text-xs font-bold uppercase tracking-widest text-center py-2">
                  Most Popular — Start Here
                </div>
              )}
              <div className={`p-8 bg-[#FAF7F0] border-b border-[#EDE8DC] ${tier.popular ? "" : "pt-8"}`}>
                <h3 className="text-2xl font-serif font-bold text-[#1B3A2D] mb-1">{tier.name}</h3>
                <p className="text-[#0F1F18]/40 text-xs uppercase tracking-wider mb-4">{tier.tag}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold text-[#0F1F18]">{tier.perEgg}</span>
                  <span className="text-[#4A7C5F] text-base font-medium">/ egg</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-[#1B3A2D]">{tier.weeklyTotal}</span>
                  <span className="text-[#0F1F18]/40 text-sm">/week</span>
                  <span className="text-[#0F1F18]/30 text-xs">·</span>
                  <span className="text-[#0F1F18]/40 text-xs">{tier.monthlyNote}</span>
                </div>
                <div className="inline-block bg-[#1B3A2D] text-[#FAF7F0] px-4 py-1.5 rounded-full text-sm font-semibold">{tier.volume}</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 flex-1 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-4 h-4 text-[#C9A227] mr-3 shrink-0 mt-0.5" />
                      <span className="text-[#0F1F18]/80 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSelectPlan(tier.id)}
                  className={`w-full rounded-full py-5 text-base font-semibold transition-all hover:shadow-lg ${
                    tier.popular ? "bg-[#C9A227] hover:bg-[#b08e1f] text-[#0F1F18]" : "bg-[#1B3A2D] hover:bg-[#0F1F18] text-white"
                  }`}
                >
                  {tier.id === "custom" ? "Set My Own Count" : "Join This Plan"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delivery note */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-8">
        <div className="bg-[#EDE8DC] border-l-4 border-[#C9A227] rounded-xl px-6 py-4 flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">📅</span>
          <p className="text-[#0F1F18]/70 text-sm leading-relaxed">
            <strong className="text-[#1B3A2D]">First delivery within 7 days</strong> of confirming your reservation. After that, your eggs arrive on a continuous weekly schedule — your own rolling cycle, not a shared bulk delivery day.
          </p>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#EDE8DC] py-6 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12">
          {["No lock-in contracts", "Pause anytime", "Cancel anytime", "Weekly wholesome delivery"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C9A227]" />
              <span className="text-sm font-medium text-[#0F1F18]/70">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perks + Form */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16" ref={formRef}>

        {/* Perks */}
        <div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-3xl md:text-4xl font-serif font-bold text-[#0F1F18] mb-3">
            More than just <span className="text-[#C9A227] italic">eggs.</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-[#0F1F18]/60 mb-4 text-base leading-relaxed">
            Your NatiNest membership connects you directly to Karnataka's finest free-roaming farms.
          </motion.p>
          <div className="space-y-7">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#1B3A2D] flex items-center justify-center group-hover:bg-[#C9A227] transition-colors shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#FAF7F0]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#0F1F18] font-serif">{perk.title}</p>
                    <p className="text-[#0F1F18]/55 text-sm mt-1 leading-relaxed">{perk.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Farm image */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-12 rounded-2xl overflow-hidden h-52 relative">
            <motion.img src={farmEggs} alt="Fresh eggs from NatiNest farms"
              initial={{ scale: 1.0 }} whileInView={{ scale: 1.07 }}
              viewport={{ once: true }} transition={{ duration: 7, ease: "linear" }}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0F1F18]/40 flex items-end p-6">
              <p className="text-[#FAF7F0] font-serif italic text-xl font-bold">"This is what your egg used to taste like."</p>
            </div>
          </motion.div>
        </div>

        {/* Reservation Form */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-[#EDE8DC]">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[420px] text-center">
                <div className="text-6xl mb-6">🥚</div>
                <h3 className="text-3xl font-serif font-bold text-[#1B3A2D] mb-4">Welcome to the Nest!</h3>
                <p className="text-[#0F1F18]/70 text-base max-w-sm leading-relaxed">
                  Your spot is secured. Our team will be in touch shortly to confirm your details and schedule your first delivery — arriving within 7 days.
                </p>
                <Button onClick={() => { setSuccess(false); form.reset(); }}
                  className="mt-8 bg-transparent text-[#C9A227] border-2 border-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-white transition-all">
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-8">
                  <div className="w-8 h-[3px] bg-[#C9A227] mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-[#1B3A2D]">Reserve Your Spot</h3>
                  <p className="text-[#0F1F18]/50 text-sm mt-2">No payment now. We confirm and your first delivery arrives within 7 days.</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Full Name</FormLabel>
                        <FormControl><Input placeholder="Your full name" className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Email</FormLabel>
                          <FormControl><Input placeholder="you@example.com" type="email" className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Phone Number</FormLabel>
                          <FormControl><Input placeholder="+91 98765 43210" className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    {/* Full delivery address */}
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Full Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="House/flat no., street, area, landmark..."
                            className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] resize-none rounded-xl"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">City / Area</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl">
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bangalore">Bangalore</SelectItem>
                              <SelectItem value="mysore">Mysore</SelectItem>
                              <SelectItem value="other">Other (Join Waitlist)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="plan" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Selected Plan</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl">
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly Nest — 15 eggs/week · ₹300/wk</SelectItem>
                              <SelectItem value="custom">Custom Nest — I'll choose my count · ₹20/egg</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    {/* Custom count field — only shows when custom plan selected */}
                    <AnimatePresence>
                      {selectedPlan === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <FormField control={form.control} name="customCount" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">
                                How many eggs per week?
                                <span className="text-[#4A7C5F] normal-case tracking-normal ml-2 text-xs">(minimum 6)</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 24"
                                  type="number"
                                  min={6}
                                  className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] rounded-xl"
                                  {...field}
                                />
                              </FormControl>
                              {field.value && parseInt(field.value) >= 6 && (
                                <p className="text-[#4A7C5F] text-xs mt-1">
                                  ≈ ₹{parseInt(field.value) * 20}/week · ₹{parseInt(field.value) * 20 * 4}/month
                                </p>
                              )}
                              <FormMessage />
                            </FormItem>
                          )} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0F1F18]/70 text-xs uppercase tracking-wider">Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any special delivery instructions or questions..." className="bg-[#FAF7F0] border-[#EDE8DC] focus-visible:ring-[#C9A227] resize-none rounded-xl" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit"
                      className="w-full bg-[#C9A227] hover:bg-[#b08e1f] text-[#0F1F18] py-5 text-base font-bold rounded-full mt-2 transition-all hover:shadow-lg">
                      Secure My Spot
                    </Button>
                    <p className="text-center text-xs text-[#0F1F18]/40 mt-2">No payment now. We'll confirm and share your delivery schedule directly.</p>

                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
