"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  List,
  X,
  MapPin,
  Envelope,
  Clock,
} from "@phosphor-icons/react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-dark-800/90 backdrop-blur-sm border-b border-dark-600/50 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9 text-xs text-steel">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} weight="fill" className="text-gold" />
              #462 Tiffin St, Barrie, ON L4N 9W8
            </span>
            <span className="flex items-center gap-1.5">
              <Envelope size={13} weight="fill" className="text-gold" />
              datowingstorage@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} weight="fill" className="text-gold" />
            <span>24/7 Emergency Service Available</span>
          </div>
        </div>
      </motion.div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 md:top-9 top-0 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-gold/30 transition-shadow duration-300">
              <span className="text-dark font-black text-base lg:text-lg">
                D&A
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base lg:text-lg font-bold tracking-tight text-white">
                D&A Towing
              </div>
              <div className="text-[10px] lg:text-xs text-steel uppercase tracking-[0.2em]">
                & Storage
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeSection === item.href.replace("#", "")
                    ? "text-gold"
                    : "text-steel-light hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-light to-gold-dark rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:7057950993"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold text-sm rounded-full hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Phone size={16} weight="fill" />
              <span>705-795-0993</span>
            </a>
            <a
              href="tel:7057950993"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gold to-gold-dark text-dark"
            >
              <Phone size={18} weight="fill" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-steel-light hover:text-white hover:bg-dark-600/50 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-dark-800 border-l border-dark-600/50 z-50 lg:hidden p-6 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-steel hover:text-white hover:bg-dark-600/50 transition-all"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      activeSection === item.href.replace("#", "")
                        ? "text-gold bg-gold/10"
                        : "text-steel-light hover:text-white hover:bg-dark-600/30"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-dark-600/50">
                <a
                  href="tel:7057950993"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-full"
                >
                  <Phone size={18} weight="fill" />
                  705-795-0993
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
