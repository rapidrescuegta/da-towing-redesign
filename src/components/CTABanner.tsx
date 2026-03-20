"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight } from "@phosphor-icons/react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
      {/* Overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)`,
        }}
      />
      {/* Diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,1) 20px, rgba(0,0,0,1) 21px)`,
      }} />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-dark tracking-tight mb-4">
            Stranded? We&apos;re On Our Way.
          </h2>
          <p className="text-dark/70 text-base lg:text-lg max-w-2xl mx-auto mb-8">
            Don&apos;t wait on the side of the road. One call and our team is dispatched
            immediately — 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:7057950993"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-dark text-gold-light font-bold text-base rounded-2xl hover:bg-dark-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
            >
              <Phone size={20} weight="fill" />
              Call 705-795-0993
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-dark/30 hover:border-dark/60 text-dark font-bold text-base rounded-2xl transition-all duration-300 hover:bg-dark/10"
            >
              Request a Quote
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
