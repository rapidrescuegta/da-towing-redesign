"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, ArrowDown, ShieldCheck, Clock, Star } from "@phosphor-icons/react";

// All photos from the original D&A Towing site
const heroPhotos = [
  "/images/equipment-towing.jpg",
  "/images/services1.jpg",
  "/images/heavy-duty.jpg",
  "/images/services3.jpg",
  "/images/rv-towing.jpg",
  "/images/services5.jpg",
  "/images/ser1.jpg",
  "/images/services4.jpg",
  "/images/flatbed.jpg",
  "/images/services7.jpg",
  "/images/ser3.jpg",
  "/images/about.jpg",
  "/images/services2.jpg",
  "/images/light-duty.jpg",
  "/images/ser2.jpg",
  "/images/services8.jpg",
  "/images/accident.jpg",
  "/images/services9.jpg",
  "/images/auto-hauling.jpg",
  "/images/services6.jpg",
  "/images/ser5.jpg",
  "/images/services11.jpg",
  "/images/ser7.jpg",
  "/images/services10.jpg",
  "/images/ser8.jpg",
  "/images/ser6.jpg",
  "/images/ser11.jpg",
  "/images/feature.jpg",
];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Corner-peel page curl effect.
 * The current photo peels from the bottom-right corner, curling up and away
 * diagonally to reveal the next photo underneath.
 */
function PageCurlSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [peelProgress, setPeelProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startPeel = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNextIndex((currentIndex + 1) % heroPhotos.length);

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds for the peel

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-in-out curve for natural feel
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      setPeelProgress(eased);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Peel complete — swap photos
        setCurrentIndex((currentIndex + 1) % heroPhotos.length);
        setPeelProgress(0);
        setIsAnimating(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [currentIndex, isAnimating]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(startPeel, 4500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [startPeel]);

  // Pause on tab hidden
  useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (animRef.current) cancelAnimationFrame(animRef.current);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Calculate the peel clip-path
  // The peel originates from bottom-right corner and expands diagonally
  // As peelProgress goes 0→1, the diagonal line moves from bottom-right to top-left
  const peelSize = peelProgress * 200; // percentage overshoot for full coverage

  // The clip-path for the current (top) photo — shrinks as the page peels away
  // Diagonal from bottom-right corner expanding toward top-left
  const cx = 100 - peelSize;
  const cy = 100 - peelSize;

  const currentClip = peelProgress === 0
    ? "none"
    : `polygon(0% 0%, 100% 0%, 100% ${Math.max(0, cy)}%, ${Math.max(0, cx)}% 100%, 0% 100%)`;

  // The "curled" underside of the peeled page — shows as a lighter strip
  // along the diagonal fold line
  const foldAngle = -45; // diagonal
  const foldX = 100 - peelProgress * 120;
  const foldY = 100 - peelProgress * 120;
  const curlWidth = 15 + peelProgress * 25;

  return (
    <>
      {/* Bottom layer: NEXT photo (revealed as current peels) */}
      <div className="absolute inset-0">
        <Image
          src={heroPhotos[nextIndex]}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
      </div>

      {/* Top layer: CURRENT photo (peels away from bottom-right corner) */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          clipPath: currentClip,
        }}
      >
        <Image
          src={heroPhotos[currentIndex]}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Curl shadow — the shadow cast by the peeling corner */}
      {isAnimating && peelProgress > 0.02 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${foldAngle}deg,
              transparent ${Math.max(0, 100 - peelSize - curlWidth - 5)}%,
              rgba(0,0,0,0.3) ${Math.max(0, 100 - peelSize - curlWidth)}%,
              rgba(0,0,0,0.08) ${Math.max(0, 100 - peelSize - 2)}%,
              transparent ${Math.max(0, 100 - peelSize)}%)`,
            opacity: Math.min(1, peelProgress * 3),
          }}
        />
      )}

      {/* Curl highlight — the light catching the curled paper edge */}
      {isAnimating && peelProgress > 0.02 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${foldAngle}deg,
              transparent ${Math.max(0, 100 - peelSize - 3)}%,
              rgba(255,255,255,0.15) ${Math.max(0, 100 - peelSize - 1)}%,
              rgba(212,160,23,0.08) ${Math.max(0, 100 - peelSize)}%,
              transparent ${Math.max(0, 100 - peelSize + 2)}%)`,
            opacity: Math.min(1, peelProgress * 4) * (1 - Math.max(0, peelProgress - 0.8) * 5),
          }}
        />
      )}

      {/* The curled corner — the actual folded-back triangle with page underside */}
      {isAnimating && peelProgress > 0.01 && peelProgress < 0.95 && (
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            right: 0,
            width: `${Math.min(60, peelSize * 0.7)}%`,
            height: `${Math.min(60, peelSize * 0.7)}%`,
            clipPath: `polygon(100% ${Math.max(0, 100 - peelProgress * 130)}%, ${Math.max(0, 100 - peelProgress * 130)}% 100%, 100% 100%)`,
            background: `linear-gradient(${foldAngle}deg,
              rgba(200,180,140,0.25) 0%,
              rgba(245,200,66,0.08) 40%,
              rgba(180,160,120,0.15) 100%)`,
            transform: `rotate(${peelProgress * -2}deg)`,
            transformOrigin: "bottom right",
            filter: "blur(0.5px)",
          }}
        />
      )}
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === PAGE-CURL PHOTO BACKDROP === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20"
      >
        {/* Photo slideshow with corner-peel effect */}
        <PageCurlSlideshow />

        {/* Dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/85 via-dark-800/80 to-midnight/85 z-[2]" />

        {/* Radial glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] z-[3]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-dark/8 rounded-full blur-[100px] z-[3]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-[3]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Diagonal accent lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] z-[3]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="100%" x2="60%" y2="0" stroke="#D4A017" strokeWidth="1" />
          <line x1="40%" y1="100%" x2="100%" y2="0" stroke="#D4A017" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* === CONTENT === */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Clock size={14} weight="fill" />
              24/7 Emergency Towing
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-6"
            >
              <span className="text-white">Barrie&apos;s</span>
              <br />
              <span className="text-gradient-gold">Most Trusted</span>
              <br />
              <span className="text-white">Towing Service</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-steel-light text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            >
              Fast, professional, and affordable towing &amp; storage services
              serving Barrie, Orillia, Essa and all of Simcoe County. When
              you&apos;re stuck, we get you moving.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="tel:7057950993"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-dark font-bold text-base rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Phone size={20} weight="fill" className="relative z-10" />
                <span className="relative z-10">Call Now — 705-795-0993</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-4 border border-dark-500 hover:border-gold/50 text-steel-light hover:text-white font-medium text-base rounded-2xl transition-all duration-300 hover:bg-dark-700/50"
              >
                View Our Services
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6 text-sm text-steel"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} weight="fill" className="text-gold" />
                Fully Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={16} weight="fill" className="text-gold" />
                MTO Certified Rates
              </span>
            </motion.div>
          </div>

          {/* Right: Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative bg-dark-800/60 backdrop-blur-xl border border-dark-600/50 rounded-3xl p-8 lg:p-10">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent rounded-tr-3xl rounded-bl-[80px]" />

              <h3 className="text-xl font-bold mb-8 text-white">
                Why Barrie Calls{" "}
                <span className="text-gradient-gold">D&amp;A Towing</span>
              </h3>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: 5000, suffix: "+", label: "Vehicles Towed" },
                  { number: 15, suffix: "+", label: "Years Experience" },
                  { number: 99, suffix: "%", label: "Customer Satisfaction" },
                  { number: 30, suffix: " min", label: "Avg. Response Time" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="group relative p-4 rounded-2xl bg-dark-700/40 border border-dark-600/30 hover:border-gold/20 transition-all duration-300 hover:bg-dark-700/60"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-gradient-gold mb-1">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs sm:text-sm text-steel">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Associated companies */}
              <div className="mt-8 pt-6 border-t border-dark-600/30">
                <p className="text-xs text-steel mb-3 uppercase tracking-wider">
                  Also serving you through
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-steel-light">
                  {[
                    "Simcoe Muskoka Rentals",
                    "D&A Auto Hauler",
                    "D&A Truck & Auto Repair",
                    "D&A Float Services",
                  ].map((company) => (
                    <span
                      key={company}
                      className="px-3 py-1.5 rounded-lg bg-dark-700/60 border border-dark-600/30"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-steel/50 hover:text-gold transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
