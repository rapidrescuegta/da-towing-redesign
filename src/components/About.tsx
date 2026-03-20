"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Users, Trophy, Handshake } from "@phosphor-icons/react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Licensed & Certified",
    description: "Fully licensed, insured, and operating at MTO-certified rates. Complete peace of mind.",
  },
  {
    icon: Users,
    title: "Experienced Crew",
    description: "Our operators have years of hands-on experience with every type of vehicle and recovery scenario.",
  },
  {
    icon: Trophy,
    title: "No Hidden Fees",
    description: "Transparent, competitive pricing on every job. The quote you get is the price you pay.",
  },
  {
    icon: Handshake,
    title: "Customer First",
    description: "We treat every call like it's our own family stranded. Fast response, respectful service.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-dark/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-dark-600/40">
              <Image
                src="/images/about.jpg"
                alt="D&A Towing & Storage team and fleet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-lg">
                    <span className="text-dark font-black text-sm">D&A</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">D&amp;A Towing &amp; Storage</div>
                    <div className="text-xs text-steel-light tracking-wider uppercase">Barrie, Ontario</div>
                  </div>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/15 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 lg:-right-6 bg-gradient-to-br from-gold-light to-gold-dark text-dark px-5 py-3 rounded-2xl shadow-xl shadow-gold/20"
            >
              <div className="text-2xl font-black">15+</div>
              <div className="text-xs font-bold opacity-80">Years Serving Ontario</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            >
              About D&amp;A Towing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6"
            >
              Your Reliable{" "}
              <span className="text-gradient-gold">Towing Partner</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-steel-light text-base lg:text-lg leading-relaxed mb-8"
            >
              D&amp;A Towing and Storage has been serving Ontario with dedication for
              over 15 years. We offer fast, professional, and affordable towing
              and storage services — whether you&apos;re dealing with a roadside
              emergency, need a vehicle transported, or require secure storage.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-steel text-base leading-relaxed mb-10"
            >
              Our growing family of companies — including Simcoe Muskoka Rentals,
              D&amp;A Auto Hauler, D&amp;A Truck &amp; Auto Repair, and D&amp;A Float
              Services — means we can serve you from every angle, no matter the size
              of the job.
            </motion.p>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="group p-4 rounded-xl bg-dark-700/30 border border-dark-600/30 hover:border-gold/15 transition-all duration-300"
                  >
                    <Icon
                      size={24}
                      weight="duotone"
                      className="text-gold mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-steel leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
