# D&A Towing & Storage — Website Redesign

## Project Overview
**Client:** D&A Towing & Storage — Professional towing and vehicle storage in Barrie, Ontario
**Type:** Marketing / service showcase website (static, no backend)
**Location:** `/home/gracco/da-towing-redesign`
**GitHub:** `rapidrescuegta/da-towing-redesign` (public)
**Dev Port:** 3006

## Stack
- **Framework:** Next.js 16 (App Router, standalone output)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4.2 + custom theme in `globals.css`
- **Animation:** Framer Motion 12
- **Icons:** Phosphor Icons React
- **Deployment:** Railway (Docker, Node 22 Alpine)

## Dev Commands
```bash
npm run dev -- --port 3006    # Dev server
npm run build                 # Production build
npm start                     # Start production
```

## Business Info
- **Phone:** 705-795-0993
- **Email:** datowingstorage@gmail.com
- **Address:** #462 Tiffin St, Barrie, ON L4N 9W8
- **Service Area:** Barrie, Orillia, Essa, Simcoe County (+ Ontario/Canada-wide for select services)

### Related Companies
- D&A Towing & Storage — 705-795-0993
- Simcoe Muskoka Rentals — 705-220-5011
- D&A Auto Hauler — 705-896-2255
- D&A Truck & Auto Repair — 705-896-2255
- D&A Float Services — 705-726-1267

## Branding
- **Dark theme** — midnight backgrounds (#070B14 to #243054)
- **Gold accent** — #D4A017 (primary), #F5C842 (bright), #B8860B (dark)
- **Steel text** — #94A3B8 / #CBD5E1
- Custom utilities: `.text-gradient-gold`, `.glow-gold`, `.animate-border-glow`

## Site Structure

### Pages
- `/` — Home (single-page with all sections)
- `/photos` — Photo gallery
- `/services/[slug]` — Dynamic service detail pages (10 services)

### Homepage Sections (in order)
1. **Navigation** — Fixed top bar, logo, nav links, phone CTA, mobile drawer
2. **Hero** — 26-photo carousel with 3D flip transitions, stat counters
3. **Services** — 3 featured + 7 regular service cards
4. **About** — Company background, family of companies, highlights
5. **Why Us** — 6 differentiators (response time, pricing, 24/7, fleet, etc.)
6. **CTA Banner** — Call-to-action
7. **Service Areas** — Coverage info
8. **Contact** — Form with service dropdown, address/phone/email cards
9. **Footer** — Links, related companies, social

### 10 Services
1. Equipment Towing — Heavy machinery, industrial loads
2. Heavy Duty Towing — Commercial trucks, buses, 40+ ton
3. RV Towing — Motorhomes, trailers, fifth wheels
4. Light Duty Towing — Cars, SUVs, 30-min response
5. Flatbed Towing — Luxury, lowered, AWD/4WD vehicles
6. Accident Recovery — 24/7 emergency, police coordination
7. Auto Car Hauling — Multi-vehicle, dealership services
8. Float Towing — Equipment floats, utility trailers
9. Cross-Country Transport — Canada-wide, open/enclosed
10. Storage & Warehousing — Gated facility, 24/7 surveillance

## Key Stats
- 15+ years serving Ontario
- 5,000+ vehicles towed
- 99% customer satisfaction
- 30-minute average response

## Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page (all sections) |
| `src/app/layout.tsx` | Root layout + metadata |
| `src/app/globals.css` | Theme colors, custom utilities |
| `src/lib/services-data.ts` | All 10 service details (slug, headline, features) |
| `src/app/services/[slug]/page.tsx` | Dynamic service pages |
| `src/app/photos/page.tsx` | Photo gallery |
| `public/images/` | 26+ photos |
| `Dockerfile` | Multi-stage Node 22 Alpine build |
| `railway.toml` | Railway deploy config |

## Environment Variables
**None required** — fully static site, all content hardcoded.

## Deployment
- **Platform:** Railway (Dockerfile builder)
- **Health check:** GET `/`
- **Restart:** ON_FAILURE, max 3 retries
- **Production port:** 3000

## Notes
- All content is static/hardcoded in components (no CMS, no database)
- Contact form not yet wired to a backend (future: Resend integration)
- Hero carousel auto-rotates every 4 seconds, pauses when tab inactive
