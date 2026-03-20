"use client";

import { Phone, Envelope, MapPin, InstagramLogo, FacebookLogo, ArrowUp } from "@phosphor-icons/react";

const serviceLinks = [
  "Light Duty Towing",
  "Heavy Duty Towing",
  "Flatbed Towing",
  "Accident Recovery",
  "RV Towing",
  "Equipment Towing",
  "Auto Car Hauling",
  "Float Towing",
  "Cross-Country Transport",
  "Storage & Warehousing",
];

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Service Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
  { label: "MTO Rates", href: "#" },
  { label: "Certification", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-midnight border-t border-dark-700/50">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <span className="text-dark font-black text-base">D&A</span>
              </div>
              <div>
                <div className="text-base font-bold text-white">D&A Towing</div>
                <div className="text-[10px] text-steel uppercase tracking-[0.2em]">& Storage</div>
              </div>
            </div>
            <p className="text-sm text-steel leading-relaxed mb-5">
              Professional towing and storage services serving Barrie, Orillia,
              Essa, and all of Simcoe County. Available 24/7.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="tel:7057950993"
                className="flex items-center gap-2 text-steel hover:text-gold transition-colors"
              >
                <Phone size={14} weight="fill" className="text-gold" />
                705-795-0993
              </a>
              <a
                href="mailto:datowingstorage@gmail.com"
                className="flex items-center gap-2 text-steel hover:text-gold transition-colors"
              >
                <Envelope size={14} weight="fill" className="text-gold" />
                datowingstorage@gmail.com
              </a>
              <div className="flex items-center gap-2 text-steel">
                <MapPin size={14} weight="fill" className="text-gold" />
                #462 Tiffin St, Barrie, ON L4N 9W8
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-dark-700/60 border border-dark-600/30 flex items-center justify-center text-steel hover:text-gold hover:border-gold/20 transition-all"
                aria-label="Facebook"
              >
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-dark-700/60 border border-dark-600/30 flex items-center justify-center text-steel hover:text-gold hover:border-gold/20 transition-all"
                aria-label="Instagram"
              >
                <InstagramLogo size={18} weight="fill" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-steel hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-steel hover:text-gold transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Family of companies */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Our Companies
            </h4>
            <div className="space-y-3">
              {[
                { name: "D&A Towing & Storage", phone: "705-795-0993" },
                { name: "Simcoe Muskoka Rentals", phone: "705-220-5011" },
                { name: "D&A Auto Hauler", phone: "705-896-2255" },
                { name: "D&A Truck & Auto Repair", phone: "705-896-2255" },
                { name: "D&A Float Services", phone: "705-726-1267" },
              ].map((company) => (
                <div key={company.name}>
                  <div className="text-sm text-steel-light font-medium">
                    {company.name}
                  </div>
                  <a
                    href={`tel:${company.phone.replace(/-/g, "")}`}
                    className="text-xs text-gold hover:text-gold-light transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel">
            &copy; {new Date().getFullYear()} D&amp;A Towing and Storage. All rights reserved.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-xs text-steel hover:text-gold transition-colors"
          >
            Back to top
            <ArrowUp size={12} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
