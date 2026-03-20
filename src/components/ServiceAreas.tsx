"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, NavigationArrow, Check } from "@phosphor-icons/react";

const areas = [
  { name: "Barrie", primary: true, description: "Headquarters — #462 Tiffin St" },
  { name: "Orillia", primary: true, description: "Full service coverage" },
  { name: "Essa", primary: true, description: "Full service coverage" },
  { name: "Innisfil", primary: false, description: "Extended coverage" },
  { name: "Wasaga Beach", primary: false, description: "Extended coverage" },
  { name: "Angus", primary: false, description: "Extended coverage" },
  { name: "Midland", primary: false, description: "Extended coverage" },
  { name: "Collingwood", primary: false, description: "Extended coverage" },
  { name: "Alliston", primary: false, description: "Extended coverage" },
  { name: "Bradford", primary: false, description: "Extended coverage" },
  { name: "Newmarket", primary: false, description: "Extended coverage" },
  { name: "Simcoe County", primary: false, description: "County-wide service" },
];

export default function ServiceAreas() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="areas" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Service Areas
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6"
            >
              Serving All of{" "}
              <span className="text-gradient-gold">Simcoe County</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-steel-light text-base lg:text-lg leading-relaxed mb-8"
            >
              Based in Barrie with coverage across Simcoe County and beyond.
              Whether you&apos;re broken down on Highway 400 or need a tow from
              Wasaga Beach, we&apos;ve got you covered.
            </motion.p>

            {/* Primary areas */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <NavigationArrow size={16} weight="fill" className="text-gold" />
                Primary Coverage
              </h3>
              <div className="flex flex-wrap gap-2">
                {areas
                  .filter((a) => a.primary)
                  .map((area) => (
                    <span
                      key={area.name}
                      className="px-4 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold font-semibold text-sm"
                    >
                      {area.name}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* Extended areas */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <MapPin size={16} weight="fill" className="text-steel" />
                Extended Coverage
              </h3>
              <div className="flex flex-wrap gap-2">
                {areas
                  .filter((a) => !a.primary)
                  .map((area) => (
                    <span
                      key={area.name}
                      className="px-3 py-1.5 rounded-lg bg-dark-700/50 border border-dark-600/30 text-steel-light text-sm"
                    >
                      {area.name}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* Cross-country note */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 rounded-xl bg-dark-800/60 border border-dark-600/30"
            >
              <div className="flex items-start gap-3">
                <Check size={18} weight="bold" className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-steel-light">
                  <span className="font-semibold text-white">Cross-country transport available</span>{" "}
                  — We also offer long-distance auto transport anywhere in Canada.
                  Call for a custom quote.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Map visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Concentric rings - coverage visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[100, 75, 50, 30].map((size, i) => (
                  <motion.div
                    key={size}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                    className="absolute rounded-full border"
                    style={{
                      width: `${size}%`,
                      height: `${size}%`,
                      borderColor:
                        i === 3
                          ? "rgba(212,160,23,0.4)"
                          : i === 2
                          ? "rgba(212,160,23,0.2)"
                          : i === 1
                          ? "rgba(212,160,23,0.1)"
                          : "rgba(212,160,23,0.05)",
                      backgroundColor:
                        i === 3 ? "rgba(212,160,23,0.08)" : "transparent",
                    }}
                  />
                ))}
                {/* Center pin */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1, type: "spring", stiffness: 300 }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-xl shadow-gold/30"
                >
                  <MapPin size={28} weight="fill" className="text-dark" />
                </motion.div>
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="absolute top-[calc(50%+50px)] text-center"
                >
                  <span className="text-gold font-bold text-sm">Barrie HQ</span>
                  <br />
                  <span className="text-steel text-xs">#462 Tiffin St</span>
                </motion.div>
              </div>

              {/* Scattered area labels */}
              {[
                { name: "Orillia", top: "15%", left: "65%" },
                { name: "Essa", top: "30%", left: "18%" },
                { name: "Wasaga Beach", top: "10%", left: "25%" },
                { name: "Innisfil", top: "70%", left: "55%" },
                { name: "Midland", top: "8%", left: "48%" },
                { name: "Alliston", top: "65%", left: "20%" },
                { name: "Collingwood", top: "18%", left: "8%" },
                { name: "Bradford", top: "80%", left: "38%" },
              ].map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="absolute"
                  style={{ top: area.top, left: area.left }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                    <span className="text-xs text-steel whitespace-nowrap">{area.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
