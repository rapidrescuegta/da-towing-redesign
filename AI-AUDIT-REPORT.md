# Digital Angel / D&A Towing — Site Audit Report

**Date:** 2026-03-25  
**Branch:** `feature/ai-video-frames`  
**Auditor:** Steve (AI Subagent)

---

## Task 1: Code Review ✅

### Architecture
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + custom theme (dark/gold palette)
- **Animation:** Framer Motion v12
- **Icons:** Phosphor Icons
- **Output:** `standalone` mode

### Component Inventory (10 components)
| Component | Lines | Notes |
|---|---|---|
| `Navigation` | ~170 | Sticky nav, mobile drawer, scroll tracking |
| `Hero` | ~280 | 26-photo slideshow, animated counters, 3D flip transitions |
| `Services` | ~320 | 10 service cards, featured grid + regular grid |
| `About` | ~150 | Two-column layout, highlights grid |
| `WhyUs` | ~150 | 6 reasons with stats, animated cards |
| `CTABanner` | ~70 | Full-width gold gradient banner |
| `ServiceAreas` | ~180 | Coverage map with concentric rings |
| `Contact` | ~240 | Form + info cards + other lines |
| `Footer` | ~140 | 4-column links + social |
| `ServicePageClient` | ~120 | Dynamic service detail page |

### Key Observations
- **All components are `"use client"`** — sacrifices SSR/SSG benefits. Only `page.tsx` (server component) is server-rendered.
- **No metadata export** from dynamic service pages (would need `generateMetadata`).
- **Hero slideshow loads all 26 images** regardless of which is shown — significant initial bundle.
- **No route prefetching** hints for service pages.

---

## Task 2: Image Review ✅

**Total: 29 images in `public/images/`**

### File Size Summary
| Range | Count | Files |
|---|---|---|
| < 50KB | 3 | logo.png (30K), feature.jpg (42K), ser6.jpg (50K) |
| 50–100KB | 8 | heavy-duty, ser11, ser2, ser3, ser5, flatbed, ser7, ser8, accident |
| 100–200KB | 15 | Most service images |
| > 200KB | 3 | services1.jpg (265K), rv-towing.jpg (297K), **services5.jpg (301K)** |

### Naming Inconsistencies
- `ser1–ser11` (11 images) vs `services1–services11` (11 images) — **22 images with near-identical names, likely duplicates**
- `feature.jpg` — purpose unclear (only used on photos page)
- No `webp` conversion — all source images are large JPEGs

### Recommendations
1. **Convert all images to WebP** (saves 30–60% file size)
2. **Resize oversized images** — most don't need to be > 1200px wide
3. **Remove duplicate/unused images** (photos page references all 26 hero photos but the page itself is a dev/debug tool)
4. **Add `next/image`** `priority` to above-the-fold images (only Hero currently has it)

---

## Task 3: AI Video Frames ❌

**Status: FAILED — No image generation API key configured**

Attempted to generate 3 cinematic concept frames for the hero video:
- Frame 1: Car breakdown on dark highway (emotional distress)
- Frame 2: Digital Angel app panic button activating (app UI + driver)
- Frame 3: Tow truck arriving — peace of mind (warm resolution)

**Error:** `google.geminiai` API key invalid. `openai` provider also not configured.

**Recommendation:** Set `GEMINI_API_KEY` or `OPENAI_API_KEY` in environment variables to enable image generation. Once configured, run:
```
image_generate with prompts above → save to public/images/ai-video-frames/
```

Created empty directory at `public/images/ai-video-frames/` for future assets.

---

## Task 4: Efficiency & Dead Code Audit ✅

### ✅ Good Patterns
- TypeScript used throughout with proper typing
- `services-data.ts` provides clean data layer for service pages
- `IntersectionObserver` used for scroll-triggered animations (efficient)
- `AnimatePresence` + `popLayout` mode prevents layout thrashing
- Image `sizes` attributes present on all `next/image` usages
- `priority` prop on above-the-fold `About.tsx` image

### ⚠️ Issues Found

#### Critical: Hero Slideshow Performance
```tsx
// 26 images all loaded simultaneously with heavy 3D CSS transforms
// AnimatePresence with rotateY animations on EVERY photo change
// Every 4 seconds: 2 expensive layout animations fire simultaneously
// "photo number badge" (#1, #2...) overlaid on every image
```
**Impact:** High CPU usage, potential jank on scroll, large CLS from animated layout.
**Fix:** Reduce hero photos to 5–6 best shots, simplify flip to fade.

#### High: Bundle Size
- `framer-motion@12.38.0` is a large dependency (~80KB gzipped)
- `Hero.tsx` alone imports 7 framer-motion hooks + AnimatePresence
- Consider: Replace framer-motion slideshow with CSS-only carousel

#### High: Image Optimization Missing
- `next.config.mjs` has no `images` configuration
- No remote patterns restricted (security)
- No quality/sizes defaults set globally
- Should add:
```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128],
  remotePatterns: [{ hostname: '**' }],
}
```

#### Medium: Dead/Unused Code
1. **`src/app/photos/page.tsx`** — Debug/admin page listing all hero photos with numbers. Not linked anywhere in nav. Consider removing or password-protecting.
2. **26 hero photos in Hero.tsx** — Many are visually redundant. Could be reduced to 6–8.
3. **`src/app/layout.tsx`** — No font optimization (`next/font`), no metadata for SEO beyond title/description.

#### Medium: Code Splitting
- All 10 components are `use client` — zero SSR/SSG benefit
- Consider making `About`, `WhyUs`, `ServiceAreas`, `Footer` server components (they have no interactivity)
- The `AnimatedCounter` in Hero is only interactive part — could lazy-load it

#### Low: Missing
- No `sitemap.xml` or `robots.txt`
- No OG images for social sharing
- No favicon configured

### Dead Code Summary
| Item | Action |
|---|---|
| `photos/page.tsx` | Remove or move to separate debug route |
| `ser1–ser11` + `services1–services11` (22 images) | Audit for duplicates, remove unused |
| Debug photo number badge in Hero | Remove `#N` overlay in production |

---

## Task 5: Google Drive Upload ❌

**Status: SKIPPED — No Google Drive integration available**

To enable: configure Google Drive credentials in OpenClaw. Alternatively, this report (AI-AUDIT-REPORT.md) can be shared manually.

---

## Summary of Recommendations

### Immediate (Quick Wins)
1. ✅ Remove `photos/page.tsx` debug page from nav or delete it
2. ✅ Add `priority` prop to Hero's first 2 slide images
3. ✅ Reduce Hero slideshow from 26 → 6–8 images
4. ✅ Strip debug `#N` badge overlay from Hero slideshow
5. ✅ Convert hero/service images to WebP

### Short-Term
6. Add `next/image` config to `next.config.mjs`
7. Replace Hero framer-motion slideshow with CSS `fade` transition
8. Make `About`, `WhyUs`, `ServiceAreas`, `Footer` server components
9. Add OG image metadata for social sharing
10. Generate hero video frames once API key is configured

### Long-Term
11. Implement proper service worker for offline PWA support
12. Add `sitemap.xml` + `robots.txt`
13. Consider Next.js App Router `generateMetadata` for dynamic routes
14. Add bundle analyzer (`@next/bundle-analyzer`)
