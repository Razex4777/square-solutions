# Changelog

## 2026-04-24 12:50

### 3D Parallax TiltCard Implementation
- **`components/ui/TiltCard.tsx`** (NEW): Created reusable 3D tilt card component combining Magic UI's ParallaxTiltCard (perspective rotation via Framer Motion springs) with ReactBits' SpotlightCard (mouse-tracking radial gradient glow). Configurable tilt degree, spotlight color, and content Z-depth.
- **`components/pages/landing_page/about/components/AboutCards.tsx`**: Replaced static motion.div cards with TiltCard wrappers. Each card now has unique spotlight colors (Cyan/Mission, Green/Vision, Purple/Values).
- **`components/pages/landing_page/services/components/ServicesCards.tsx`**: Wrapped all 6 service cards with TiltCard for 3D parallax hover. Unique accent colors per service (Cyan, Green, Indigo, Green, Orange, Purple).
- **`components/pages/landing_page/about/components/AboutStats.tsx`**: Upgraded stats grid with TiltCard wrappers, per-stat unique accent colors, and responsive sizing for mobile (2-col) and desktop (4-col).
- **`docs/project_structure.md`** (NEW): Created comprehensive architecture documentation with visual tree, descriptions, and metadata footer.

## 2026-04-23 20:34

### Translation Sync with Client Reference PDFs
- **`lib/i18n/en.ts`**: Fixed missing period in hero description ("Digital Marketing." → sentence break)
- **`lib/i18n/ar.ts`**: Full rewrite to match `AR.pdf` reference document:
  - Hero: Updated badge, heading, description, and both CTA buttons
  - About: Updated heading (removed `إقليمي`), description, mission, vision, and values text
  - Services: Replaced formal heading with colloquial Saudi (`كل اللي تحتاجه تحت سقف واحد`), expanded all 6 service descriptions
  - Contact: Replaced heading with colloquial Saudi (`عندك فكرة؟ خلنا نحققها سوا`), updated all form placeholders and submit button
  - FAQ: Updated Q1, Q2, Q4, Q5 wording; updated A1 with Agile transliteration; changed brand name to English `Square Solution`
  - CTA: Rewrote heading and description
  - Footer: Changed brand name format, updated newsletter label, service links, and copyright text
- **`app/globals.css`**: Added `@custom-variant dark (&:is(.dark *))` for Tailwind CSS v4 to fix dark mode class-based toggling (was using media query default, conflicting with `next-themes` class attribute)
- Key parity validated: 90 keys in both EN and AR files ✅

### Navbar Logo Fix (Light Mode)
- **`app/globals.css`**: Root cause — Tailwind v4 `dark:` variant defaulted to `@media (prefers-color-scheme: dark)` but ThemeProvider uses `.dark` class. Added `@custom-variant dark` directive.
- **`components/pages/landing_page/navbar/components/NavLogo.tsx`**: CSS-based dual logo approach (dark:block / dark:hidden) now works correctly with the class-based dark variant.
