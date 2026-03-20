"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightning,
  CurrencyDollar,
  Headset,
  ShieldStar,
  Wrench,
  ClockCountdown,
} from "@phosphor-icons/react";

const reasons = [
  {
    icon: Lightning,
    title: "Rapid Response",
    description: "Average 30-minute response time across our service area. When you call, we're already on our way.",
    stat: "30 min",
    statLabel: "avg response",
  },
  {
    icon: CurrencyDollar,
    title: "Fair, Honest Pricing",
    description: "MTO-certified rates with zero surprises. We quote before we tow — what you see is what you pay.",
    stat: "0",
    statLabel: "hidden fees",
  },
  {
    icon: Headset,
    title: "24/7 Dispatch",
    description: "Round-the-clock availability, 365 days a year. Breakdowns don't wait for business hours, and neither do we.",
    stat: "24/7",
    statLabel: "availability",
  },
  {
    icon: ShieldStar,
    title: "Fully Equipped Fleet",
    description: "Light duty to heavy duty, flatbeds to float trailers — our diverse fleet handles every scenario.",
    stat: "10+",
    statLabel: "vehicle types",
  },
  {
    icon: Wrench,
    title: "Complete Solutions",
    description: "Towing is just the start. We offer storage, repair, hauling, rentals, and cross-country transport.",
    stat: "5",
    statLabel: "companies",
  },
  {
    icon: ClockCountdown,
    title: "15+ Years of Trust",
    description: "Over a decade serving Barrie and Simcoe County. Our reputation is built on thousands of successful jobs.",
    stat: "5K+",
    statLabel: "jobs completed",
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-midnight to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[200px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
          >
            The <span className="text-gradient-gold">D&amp;A Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-steel max-w-2xl mx-auto text-base lg:text-lg"
          >
            We don&apos;t just tow vehicles — we deliver peace of mind. Here&apos;s
            what sets D&amp;A Towing apart from the rest.
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="group relative"
              >
                <div className="h-full relative bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-2xl p-6 lg:p-7 hover:border-gold/20 transition-all duration-500 overflow-hidden">
                  {/* Hover highlight */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-light to-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 transition-all duration-300">
                      <Icon size={24} weight="duotone" className="text-gold" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-gradient-gold">{reason.stat}</div>
                      <div className="text-[10px] text-steel uppercase tracking-wider">{reason.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-light transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
