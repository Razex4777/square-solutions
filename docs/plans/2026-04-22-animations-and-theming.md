# Epic: Advanced Animations & Theming (GSAP + Framer Motion + Light Mode)

## 🎯 Objective
Transform the static landing page into a modern, dynamic, and interactive experience using a hybrid animation approach (GSAP for scroll sequences, Framer Motion for UI/micro-interactions) and implement a robust Light/Dark mode system.

## 🏗️ Technical Stack & Approach
- **Scroll Animations**: `gsap` & `@gsap/react` (ScrollTrigger for section reveals, parallax, and pinning).
- **UI Animations**: `framer-motion` (Spring physics for hover states, dropdown menus, and layout shifts).
- **Theming**: `next-themes` (Class-based dark mode management, toggling `dark:` variants in Tailwind).

## 📝 Execution Plan

### Phase 1: Foundation & Theming Setup
- [ ] Install dependencies: `npm i gsap @gsap/react framer-motion next-themes`
- [ ] Configure `next-themes` ThemeProvider in `app/layout.tsx`.
- [ ] Audit global CSS and setup Tailwind dark mode config (`darkMode: 'class'`).
- [ ] Implement the Light/Dark mode toggle switch in the Navbar.
- [ ] **Crucial**: Go through all components (Hero, About, Services, FAQ, Contact) and update hardcoded dark hex colors (like `bg-[#0A0D14]`, `text-slate-400`) to support light mode using Tailwind's `dark:` modifier (e.g., `bg-white dark:bg-[#0A0D14]`).

### Phase 2: The Pinned Interactive Navbar
- [ ] Update `Navbar.tsx` to handle scroll events (make it sticky/pinned with a frosted glass backdrop when scrolling down).
- [ ] Add Framer Motion to the Navbar dropdowns so they open with a smooth spring animation (`AnimatePresence`).
- [ ] Add Framer Motion hover effects to Navbar links.

### Phase 3: Framer Motion UI Micro-Interactions
- [ ] **Services Cards**: Replace standard CSS hovers with Framer Motion spring physics (scale up, shadow pop, magnetic effect).
- [ ] **About Cards**: Add layout animations and interactive hover glows.
- [ ] **Buttons & Inputs**: Upgrade standard buttons and form inputs with Framer tap/hover animations.

### Phase 4: GSAP ScrollTrigger Masterpiece
- [ ] Setup `useGSAP` in the layout or main page wrapper.
- [ ] **Hero Section**: Staggered text reveal and image entrance on initial load.
- [ ] **About & Services**: Add `ScrollTrigger.batch()` to reveal cards sequentially as they enter the viewport.
- [ ] **FAQ Section**: Parallax effect on the mountain image while the accordion items fade in from the right.
- [ ] **Contact Section**: Smooth form scale-in and background glow expansion when scrolled into view.

## 🤝 Questions for the User (Review)
1. **Light Mode Strategy**: Right now, the design heavily relies on deep blues and cyans. For light mode, do you want a clean white/gray aesthetic with cyan accents, or something else?
2. **Scroll Feel**: Do you prefer fast and snappy reveal animations as you scroll, or slow, elegant, and floaty animations?
3. **Approval**: Once you confirm this plan, I will start by installing the dependencies and setting up the theming foundation!
