# Project Structure — Square Solutions

```text
square-solutions/
├── 📄 .env.example                    ( Environment variables template for API keys and config )
├── 📄 .eslintrc.json                  ( ESLint configuration for code quality enforcement )
├── 📄 .gitignore                      ( Git exclusion rules for node_modules, .next, etc. )
├── 📄 eslint.config.mjs               ( Flat ESLint config for Next.js and TypeScript )
├── 📄 metadata.json                   ( Project metadata including name, version, and description )
├── 📄 next.config.ts                  ( Next.js configuration — image domains, webpack, i18n )
├── 📄 next-env.d.ts                   ( TypeScript declarations for Next.js )
├── 📄 package.json                    ( Dependencies and scripts for the project )
├── 📄 postcss.config.mjs              ( PostCSS configuration for Tailwind CSS processing )
├── 📄 README.md                       ( Project overview and setup instructions )
├── 📄 tsconfig.json                   ( TypeScript compiler options with strict mode and path aliases )
│
├── 📁 app/                            ( Next.js App Router entry — pages, layouts, globals )
│   ├── 📄 globals.css                 ( Global CSS tokens, theme variables, shimmer keyframes, dot grid )
│   ├── 📄 layout.tsx                  ( Root layout with ThemeProvider, LanguageProvider, fonts )
│   ├── 📄 page.tsx                    ( Main landing page composition — assembles all sections )
│   │
│   └── 📁 admin/                      ( Private admin dashboard area )
│       └── 📁 analytics/             ( Realtime analytics dashboard — /admin/analytics )
│           ├── 📄 page.tsx            ( Auth-gated analytics page with login screen )
│           ├── 📁 components/         ( Dashboard widgets and visualizations )
│           │   ├── 📄 DashboardShell.tsx      ( Main shell: navbar, layout grid, data fetching, realtime )
│           │   ├── 📄 KPICards.tsx             ( 6 KPI metric cards with animated counters )
│           │   ├── 📄 SessionsChart.tsx        ( Line chart — sessions over time via Recharts )
│           │   ├── 📄 GeoChart.tsx             ( Top locations with country flag emoji mapping )
│           │   ├── 📄 EngagementCard.tsx       ( 4-metric engagement panel with donut charts )
│           │   ├── 📄 VisitorTypeChart.tsx     ( Pie chart — new vs returning visitors )
│           │   ├── 📄 ReferrerChart.tsx        ( Traffic sources list with color-coded bars )
│           │   ├── 📄 DeviceBrowserCharts.tsx  ( Dual pie charts for devices and browsers )
│           │   ├── 📄 HourlyTrafficChart.tsx   ( Bar chart — traffic distribution by hour )
│           │   ├── 📄 TopPagesTable.tsx        ( Ranked page list with progress bars )
│           │   ├── 📄 SectionStatsTable.tsx    ( Section scroll popularity with progress bars )
│           │   ├── 📄 RecentSessionsTable.tsx  ( Latest sessions table with device icons )
│           │   ├── 📄 TimeRangeSelector.tsx    ( Preset buttons + custom calendar date picker )
│           │   └── 📄 InfoTooltip.tsx          ( Reusable hoverable info icon with animated popover )
│           └── 📁 i18n/               ( Analytics-scoped internationalization )
│               ├── 📄 AnalyticsI18nProvider.tsx ( React Context for EN/AR locale toggling )
│               └── 📄 translations.ts          ( Exhaustive EN/AR translation strings for all widgets )
│
├── 📁 components/                     ( All React components, organized by domain )
│   ├── 📄 AnalyticsTracker.tsx        ( Client-side tracker: pageviews, sessions, section IntersectionObserver )
│   ├── 📁 pages/                      ( Page-level section compositions )
│   │   └── 📁 landing_page/           ( Landing page sections )
│   │       ├── 📁 about/              ( Our Story / About section )
│   │       │   ├── 📄 About.tsx       ( Section wrapper with GSAP scroll animations )
│   │       │   └── 📁 components/
│   │       │       ├── 📄 AboutCards.tsx   ( Mission/Vision/Values cards with TiltCard 3D parallax )
│   │       │       ├── 📄 AboutHeader.tsx  ( Section badge, heading, and description )
│   │       │       └── 📄 AboutStats.tsx   ( Animated counter stats: Years, Projects, Clients, Commitment )
│   │       │
│   │       ├── 📁 contact/            ( Get In Touch section )
│   │       │   ├── 📄 Contact.tsx     ( Contact section wrapper )
│   │       │   └── 📁 components/
│   │       │       ├── 📄 ContactForm.tsx  ( Multi-field form with custom dropdown and keyboard nav )
│   │       │       ├── 📄 ContactHeader.tsx ( Section header with badge and gradient heading )
│   │       │       └── 📄 ContactInfo.tsx  ( Company contact details: email, phone, address )
│   │       │
│   │       ├── 📁 cta/                ( Call-to-Action banner section )
│   │       │   └── 📄 Cta.tsx         ( CTA with GSAP drop-line animation and glowing border )
│   │       │
│   │       ├── 📁 faq/                ( Frequently Asked Questions section )
│   │       │   ├── 📄 Faq.tsx         ( FAQ section wrapper with side-image layout )
│   │       │   └── 📁 components/
│   │       │       ├── 📄 FaqAccordion.tsx ( Animated accordion with spring physics )
│   │       │       ├── 📄 FaqContent.tsx   ( FAQ header and accordion composition )
│   │       │       └── 📄 FaqImage.tsx     ( Crossfading FAQ images that change per question )
│   │       │
│   │       ├── 📁 footer/             ( Site footer with garage-door reveal )
│   │       │   └── 📄 Footer.tsx      ( Company links, services, newsletter, social media )
│   │       │
│   │       ├── 📁 hero/               ( Hero section at top of page )
│   │       │   ├── 📄 Hero.tsx        ( Hero wrapper with GSAP parallax glow )
│   │       │   └── 📁 components/
│   │       │       ├── 📄 HeroContent.tsx  ( Heading with word-by-word blur reveal, CTA buttons )
│   │       │       └── 📄 HeroGraphic.tsx  ( Orbital rings graphic with rotating tags )
│   │       │
│   │       ├── 📁 navbar/             ( Fixed navigation bar )
│   │       │   ├── 📄 Navbar.tsx      ( Scroll-aware navbar with mobile hamburger )
│   │       │   └── 📁 components/
│   │       │       ├── 📄 NavActions.tsx   ( Theme toggle, language switch, Get Started CTA )
│   │       │       ├── 📄 NavLinks.tsx     ( Desktop navigation links with hover effects )
│   │       │       └── 📄 NavLogo.tsx      ( Logo with light/dark mode support )
│   │       │
│   │       ├── 📁 partners/           ( Services marquee between Hero and About )
│   │       │   └── 📄 PartnersMarquee.tsx ( Auto-scrolling pill chips with service icons )
│   │       │
│   │       └── 📁 services/           ( Services section )
│   │           ├── 📄 Services.tsx    ( Services wrapper with GSAP batch scroll reveal )
│   │           └── 📁 components/
│   │               ├── 📄 ServicesCards.tsx  ( 6 service cards with TiltCard 3D parallax )
│   │               └── 📄 ServicesHeader.tsx ( Section badge, heading, and description )
│   │
│   ├── 📁 providers/                  ( Context providers wrapping the app )
│   │   ├── 📄 SmoothScroll.tsx        ( Lenis smooth scroll wrapper )
│   │   └── 📄 ThemeProvider.tsx        ( Dark/Light mode theme context provider )
│   │
│   └── 📁 ui/                         ( Reusable UI primitives )
│       ├── 📄 CountUp.tsx             ( Spring-physics animated number counter — scroll triggered )
│       └── 📄 TiltCard.tsx            ( 3D parallax tilt card with mouse-tracking spotlight glow )
│
├── 📁 docs/                           ( Project documentation )
│   ├── 📄 changelog.md                ( Historical change log — max 500 lines )
│   ├── 📄 project_structure.md        ( This file — current architecture snapshot )
│   └── 📁 plans/
│       └── 📄 2026-04-22-animations-and-theming.md ( Initial animation and theming plan )
│
├── 📁 hooks/                          ( Custom React hooks )
│   └── 📄 use-mobile.ts              ( Mobile viewport detection hook )
│
├── 📁 lib/                            ( Shared utilities and i18n )
│   ├── 📄 utils.ts                    ( Tailwind merge utility — cn() helper )
│   ├── 📁 supabase/
│   │   └── 📄 client.ts               ( Supabase browser client singleton — createBrowserClient() )
│   └── 📁 i18n/
│       ├── 📄 ar.ts                   ( Arabic (RTL) translation strings )
│       ├── 📄 en.ts                   ( English translation strings )
│       └── 📄 LanguageProvider.tsx     ( Language context with localStorage persistence )
│
└── 📁 public/                         ( Static assets served directly )
    ├── 📄 AR.pdf                      ( Arabic content reference document )
    ├── 📄 EN.pdf                      ( English content reference document )
    └── 📁 images/
        ├── 📄 faq-1.webp — faq-5.webp ( FAQ section images, one per question )
        ├── 📄 faq-bg.webp             ( FAQ background fallback )
        ├── 📄 logo-dark.png           ( Logo for dark mode )
        └── 📄 logo-light.png          ( Logo for light mode )
```

---

### 🎨 Project Metadata

- **Framework**: Next.js 15 (App Router) + React 19
- **Design System**: Majestic Tech — dark-themed, cinematic premium aesthetic
- **Typography**: Inter (UI), system fonts fallback
- **Color Palette**: Dark Mode Centric — Cyan `#2dc5f4`, Mint `#12e399`, deep navy surface
- **Animation Stack**: Framer Motion (component entrances), GSAP (scroll-triggered parallax), CSS keyframes (marquee)
- **UI Components**: TiltCard (3D parallax), CountUp (animated counters), SpotlightCard pattern
- **i18n**: English + Arabic (RTL) via LanguageProvider (landing) + AnalyticsI18nProvider (dashboard)
- **Analytics**: Custom Supabase-based analytics (sessions, events, sections, geo, devices, browsers, referrers)
- **Realtime**: Supabase Realtime (postgres_changes) for live dashboard updates
- **Charts**: Recharts (Line, Bar, Pie)
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
