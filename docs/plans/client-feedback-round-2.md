# Client Feedback Round 2 — 2026-04-27

## Tasks

### 1. Remove Lenis Scroll "Gravity" Animation
- [x] Remove `SmoothScroll` wrapper from `app/layout.tsx`
- [x] Replace `SmoothScroll.tsx` with a bare GSAP ScrollTrigger registration (no Lenis)
- [x] Remove `lenis` from `package.json`

### 2. Add "AI Solution" to Hero Graphic & Marquee
- [x] Add `OrbitTag` "AI Solutions" / "حلول الذكاء الاصطناعي" to the orbital rings in `HeroGraphic.tsx`
- [x] Add "AI Solutions" to the marquee items in `PartnersMarquee.tsx` + i18n strings
- [x] Add matching icon (`BrainCircuit` or `Sparkles` from lucide)

### 3. Phone Input Country Code Dropdown
- [x] Install `react-international-phone` (lightweight, CSS-variable theming, country search)
- [x] Replace plain phone `<input>` in `ContactForm.tsx` with `<PhoneInput>` 
- [x] Style to match existing dark theme using CSS variables
- [x] Ensure responsive + RTL support

### 4. Newsletter → Send to Square Solutions Email
- [x] Create `app/api/newsletter/route.ts` — sends subscription email via Resend
- [x] Wire up footer newsletter `<form>` to submit to the API
- [x] Add success/error feedback states
- [x] Add i18n strings for subscribe button and feedback messages

## Review
All 4 tasks completed and verified.
