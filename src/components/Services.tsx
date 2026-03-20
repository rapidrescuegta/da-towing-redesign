"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Car,
  Warning,
  Package,
  Crane,
  Garage,
  MapTrifold,
  Van,
  Warehouse,
  Compass,
  ArrowRight,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface Service {
  title: string;
  slug: string;
  description: string;
  icon: PhosphorIcon;
  accent: string;
  iconColor: string;
  image?: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    title: "Equipment Towing",
    slug: "equipment-towing",
    description:
      "Construction equipment, machinery, and industrial loads. Heavy-haul solutions for commercial clients across Ontario.",
    icon: Package,
    accent: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-orange-400",
    image: "/images/equipment-towing.jpg",
    featured: true,
  },
  {
    title: "Heavy Duty Towing",
    slug: "heavy-duty-towing",
    description:
      "Commercial trucks, buses, and heavy equipment. Our fleet handles the biggest jobs across Ontario.",
    icon: Truck,
    accent: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
    image: "/images/heavy-duty.jpg",
    featured: true,
  },
  {
    title: "RV Towing",
    slug: "rv-towing",
    description:
      "Motorhomes, travel trailers, and fifth wheels. Specialized equipment for oversized recreational vehicles.",
    icon: Van,
    accent: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
    image: "/images/rv-towing.jpg",
    featured: true,
  },
  {
    title: "Light Duty Towing",
    slug: "light-duty-towing",
    description:
      "Cars, SUVs, and small trucks towed safely with modern equipment. Quick response for breakdowns and relocations.",
    icon: Car,
    accent: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    image: "/images/light-duty.jpg",
  },
  {
    title: "Flatbed Towing",
    slug: "flatbed-towing",
    description:
      "The safest way to transport luxury, lowered, or AWD vehicles. Zero-contact, zero-damage transport.",
    icon: Crane,
    accent: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
    image: "/images/flatbed.jpg",
  },
  {
    title: "Accident Recovery",
    slug: "accident-towing",
    description:
      "24/7 emergency accident towing and recovery. We work with insurance companies and police services.",
    icon: Warning,
    accent: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
    image: "/images/accident.jpg",
  },
  {
    title: "Auto Car Hauling",
    slug: "auto-car-hauling",
    description:
      "Multi-vehicle transport for dealerships and auctions. Reliable, efficient, and on-schedule delivery.",
    icon: Garage,
    accent: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    image: "/images/auto-hauling.jpg",
  },
  {
    title: "Float Towing",
    slug: "float-towing",
    description:
      "Float and trailer towing services across Barrie and beyond. Equipment floats handled with care.",
    icon: MapTrifold,
    accent: "from-pink-500/20 to-pink-600/5",
    iconColor: "text-pink-400",
  },
  {
    title: "Cross-Country Transport",
    slug: "cross-country-transport",
    description:
      "Long-distance auto transport anywhere in Canada. Door-to-door service with real-time tracking updates.",
    icon: Compass,
    accent: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-400",
  },
  {
    title: "Storage & Warehousing",
    slug: "storage-warehousing",
    description:
      "Secure indoor and outdoor vehicle storage. Gated facility with 24/7 surveillance at our Barrie location.",
    icon: Warehouse,
    accent: "from-teal-500/20 to-teal-600/5",
    iconColor: "text-teal-400",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featured = services.filter((s) => s.featured);
  const regular = services.filter((s) => !s.featured);

  return (
    <section id="services" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-dark to-dark-800" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
          >
            Complete Towing &{" "}
            <span className="text-gradient-gold">Recovery Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-steel max-w-2xl mx-auto text-base lg:text-lg"
          >
            From a flat tire to a 40-ton recovery — we&apos;ve got the equipment,
            the experience, and the team to handle it all.
          </motion.p>
        </div>

        {/* Featured services — big photo cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {featured.map((service, i) => (
            <FeaturedCard
              key={service.title}
              service={service}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Regular services — smaller cards with photos where available */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {regular.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i + 3}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  service,
  index,
  isInView,
}: {
  service: Service;
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative block rounded-2xl overflow-hidden"
      >
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light to-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-9 h-9 rounded-lg bg-dark/60 backdrop-blur-sm border border-white/10 flex items-center justify-center ${service.iconColor}`}
            >
              <Icon size={18} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-gold-light transition-colors duration-300">
              {service.title}
            </h3>
          </div>
          <p className="text-sm text-steel-light/80 leading-relaxed">
            {service.description}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Learn more <ArrowRight size={12} weight="bold" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: Service;
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative block bg-dark-800/40 border border-dark-600/30 rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-500 h-full"
      >
        {/* Photo if available */}
        {service.image && (
          <div className="relative h-28 overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 14vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 to-transparent" />
          </div>
        )}

        {/* Hover gradient for non-photo cards */}
        {!service.image && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
          />
        )}

        <div className="relative z-10 p-4 lg:p-5">
          <div
            className={`w-10 h-10 rounded-xl bg-dark-700/80 border border-dark-600/50 flex items-center justify-center mb-3 group-hover:border-gold/20 transition-all duration-300 ${service.iconColor}`}
          >
            <Icon size={20} weight="duotone" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-gold-light transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-xs text-steel leading-relaxed">
            {service.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Learn more <ArrowRight size={12} weight="bold" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
