"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone,
  Envelope,
  MapPin,
  Clock,
  PaperPlaneTilt,
  User,
  ChatText,
  Truck,
} from "@phosphor-icons/react";

const contactInfo = [
  {
    icon: Phone,
    label: "Main Line",
    value: "705-795-0993",
    href: "tel:7057950993",
    description: "24/7 dispatch",
  },
  {
    icon: Envelope,
    label: "Email",
    value: "datowingstorage@gmail.com",
    href: "mailto:datowingstorage@gmail.com",
    description: "Quotes & inquiries",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "#462 Tiffin St, Barrie",
    href: "https://maps.google.com/?q=462+Tiffin+St+Barrie+ON+L4N+9W8",
    description: "ON L4N 9W8",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24 Hours / 7 Days",
    href: "#",
    description: "Never closed",
  },
];

const otherLines = [
  { label: "Simcoe Muskoka Rentals", phone: "705-220-5011" },
  { label: "D&A Auto Hauler", phone: "705-896-2255" },
  { label: "D&A Truck & Auto Repair", phone: "705-896-2255" },
  { label: "D&A Float Services", phone: "705-726-1267" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you! We'll get back to you shortly.");
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-800 to-midnight" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/3 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
          >
            Need a <span className="text-gradient-gold">Tow?</span> Call Now.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-steel max-w-xl mx-auto"
          >
            Available 24/7 for emergencies. For non-urgent requests, fill out
            the form and we&apos;ll get back to you ASAP.
          </motion.p>
        </div>

        {/* Big CTA phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <a
            href="tel:7057950993"
            className="group block max-w-2xl mx-auto p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-gold-light/10 via-gold/10 to-gold-dark/10 border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform duration-300">
              <Phone size={28} weight="fill" className="text-dark" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient-gold mb-2">
              705-795-0993
            </div>
            <div className="text-steel text-sm">
              Tap to call — Available 24/7, 365 days a year
            </div>
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Contact info + other lines */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-dark-800/40 border border-dark-600/30 hover:border-gold/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-dark-700/80 border border-dark-600/50 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-all duration-300 shrink-0">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <div>
                    <div className="text-xs text-steel uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-gold-light transition-colors">
                      {item.value}
                    </div>
                    <div className="text-xs text-steel">{item.description}</div>
                  </div>
                </motion.a>
              );
            })}

            {/* Other phone lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="p-5 rounded-xl bg-dark-800/40 border border-dark-600/30"
            >
              <h4 className="text-xs font-semibold text-steel uppercase tracking-wider mb-3">
                Our Other Lines
              </h4>
              <div className="space-y-2.5">
                {otherLines.map((line) => (
                  <a
                    key={line.label}
                    href={`tel:${line.phone.replace(/-/g, "")}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-steel-light group-hover:text-white transition-colors">
                      {line.label}
                    </span>
                    <span className="text-sm font-semibold text-gold">{line.phone}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Quote form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 lg:p-8 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-dark-600/30"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ChatText size={20} weight="duotone" className="text-gold" />
                Request a Quote
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-steel mb-1.5 uppercase tracking-wider">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      weight="duotone"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-steel"
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-dark-700/50 border border-dark-600/40 text-white text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-steel mb-1.5 uppercase tracking-wider">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      weight="duotone"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-steel"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-dark-700/50 border border-dark-600/40 text-white text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="(705) 555-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-steel mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Envelope
                    size={16}
                    weight="duotone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-steel"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-dark-700/50 border border-dark-600/40 text-white text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="john@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-steel mb-1.5 uppercase tracking-wider">
                  Service Needed
                </label>
                <div className="relative">
                  <Truck
                    size={16}
                    weight="duotone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-steel"
                  />
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-dark-700/50 border border-dark-600/40 text-white text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all appearance-none"
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="light">Light Duty Towing</option>
                    <option value="heavy">Heavy Duty Towing</option>
                    <option value="flatbed">Flatbed Towing</option>
                    <option value="accident">Accident Recovery</option>
                    <option value="rv">RV Towing</option>
                    <option value="equipment">Equipment Towing</option>
                    <option value="hauling">Auto Car Hauling</option>
                    <option value="float">Float Towing</option>
                    <option value="transport">Cross-Country Transport</option>
                    <option value="storage">Storage & Warehousing</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs text-steel mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-dark-600/40 text-white text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                  placeholder="Tell us about your situation — vehicle type, location, urgency, etc."
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-dark font-bold text-base rounded-2xl hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <PaperPlaneTilt
                  size={18}
                  weight="fill"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
                Send Quote Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
