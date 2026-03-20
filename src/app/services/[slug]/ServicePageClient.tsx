"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowLeft,
  Check,
  ArrowRight,
  MapPin,
  Clock,
  Envelope,
} from "@phosphor-icons/react";
import type { ServiceData } from "@/lib/services-data";

export default function ServicePageClient({
  service,
  related,
}: {
  service: ServiceData;
  related: ServiceData[];
}) {
  return (
    <div className="min-h-screen bg-midnight text-white">
      {/* Nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-dark-600/50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-steel hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} weight="bold" />
              Back
            </Link>
            <div className="h-5 w-px bg-dark-600" />
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <span className="text-dark font-black text-xs">D&A</span>
              </div>
              <span className="text-sm font-bold text-white hidden sm:block">
                D&A Towing
              </span>
            </Link>
          </div>
          <a
            href="tel:7057950993"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold text-sm rounded-full hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
          >
            <Phone size={15} weight="fill" />
            <span className="hidden sm:inline">705-795-0993</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-dark-700 via-dark-800 to-midnight" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-dark/40" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/25 text-gold text-xs font-semibold tracking-wider uppercase mb-4">
                  <Clock size={12} weight="fill" />
                  Available 24/7
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3">
                  {service.headline}
                </h1>
                <p className="text-steel-light text-base lg:text-lg max-w-2xl">
                  {service.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left: Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  About This Service
                </h2>
                <div className="space-y-4 mb-10">
                  {service.details.map((para, i) => (
                    <p
                      key={i}
                      className="text-steel-light text-base leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Features */}
                <h3 className="text-xl font-bold text-white mb-5">
                  What&apos;s Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-10">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-dark-800/50 border border-dark-600/30"
                    >
                      <Check
                        size={18}
                        weight="bold"
                        className="text-gold mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-steel-light">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Callout */}
                {service.callout && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/10 to-gold-dark/5 border border-gold/20">
                    <p className="text-gold-light font-medium text-base">
                      {service.callout}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 space-y-5"
              >
                {/* CTA card */}
                <div className="p-6 rounded-2xl bg-dark-800/60 border border-dark-600/40">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Need {service.title}?
                  </h3>
                  <p className="text-sm text-steel mb-5">
                    Call us now for immediate dispatch or request a free quote.
                  </p>
                  <a
                    href="tel:7057950993"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark text-dark font-bold text-base rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 mb-3"
                  >
                    <Phone size={18} weight="fill" />
                    705-795-0993
                  </a>
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-dark-500 hover:border-gold/40 text-steel-light hover:text-white font-medium text-sm rounded-xl transition-all duration-300"
                  >
                    <Envelope size={16} weight="duotone" />
                    Request a Quote
                  </Link>
                </div>

                {/* Info card */}
                <div className="p-5 rounded-2xl bg-dark-800/40 border border-dark-600/30">
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Service Info
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2.5 text-steel-light">
                      <Clock size={16} weight="duotone" className="text-gold shrink-0" />
                      Available 24/7, 365 days
                    </div>
                    <div className="flex items-center gap-2.5 text-steel-light">
                      <MapPin size={16} weight="duotone" className="text-gold shrink-0" />
                      Barrie, Orillia, Essa & Simcoe County
                    </div>
                    <div className="flex items-center gap-2.5 text-steel-light">
                      <Phone size={16} weight="duotone" className="text-gold shrink-0" />
                      Main: 705-795-0993
                    </div>
                  </div>
                </div>

                {/* Related services */}
                <div className="p-5 rounded-2xl bg-dark-800/40 border border-dark-600/30">
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Other Services
                  </h4>
                  <div className="space-y-2">
                    {related.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-dark-700/40 transition-all"
                      >
                        <span className="text-sm text-steel-light group-hover:text-white transition-colors">
                          {s.title}
                        </span>
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="text-steel opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all"
                        />
                      </Link>
                    ))}
                    <Link
                      href="/#services"
                      className="block text-center text-xs text-gold hover:text-gold-light transition-colors pt-2 mt-1 border-t border-dark-600/30"
                    >
                      View all services
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-dark-700/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Ready to Get <span className="text-gradient-gold">Moving?</span>
          </h2>
          <p className="text-steel mb-6">
            One call is all it takes. Available 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:7057950993"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              <Phone size={18} weight="fill" />
              Call 705-795-0993
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-dark-500 hover:border-gold/40 text-steel-light hover:text-white font-medium rounded-xl transition-all"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
