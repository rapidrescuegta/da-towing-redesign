'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Curated 8 hero images — high quality, diverse, professional
const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1594761051903-f4a8d4a3e5a6?w=1920&q=80',
    alt: 'Tow truck on highway at sunset',
    label: 'Highway Rescue',
  },
  {
    src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80',
    alt: 'Professional tow truck driver',
    label: 'Expert Team',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Flat tire repair service',
    label: 'Quick Repairs',
  },
  {
    src: 'https://images.unsplash.com/photo-1615906655593ffd0381f9c?w=1920&q=80',
    alt: 'Emergency roadside assistance',
    label: '24/7 Service',
  },
  {
    src: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1920&q=80',
    alt: 'Modern fleet of tow trucks',
    label: 'Modern Fleet',
  },
  {
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
    alt: 'Vehicle recovery operation',
    label: 'Safe Recovery',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Smooth crossfade transition
  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
      setProgress(0);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar — only update when not transitioning
  useEffect(() => {
    if (isTransitioning) return;
    const start = Date.now();
    const duration = 6000;
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [current, isTransitioning]);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-neutral-900">
      {/* Image Slideshow */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              quality={85}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-28 md:px-16 md:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
            Trusted Local Service
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Fast, Reliable
            <br />
            <span className="text-primary">Towing Services</span>
          </h1>
          <p className="mb-8 text-lg text-white/90 drop-shadow-md md:text-xl">
            24/7 Emergency Roadside Assistance — Anywhere, Anytime
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:+12895551234"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
            >
              📞 Call Now: 289-555-1234
            </a>
            <a
              href="#services"
              className="rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 border border-white/20"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/10">
        <div
          className="h-full bg-primary transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
