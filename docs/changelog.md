# Changelog

## 2026-05-07 20:27

### Database Rebuild & Newsletter Admin Panel
- **Database (Supabase)**:
  - Rebuilt full schema after free-tier pause wiped all tables/functions
  - Recreated: `analytics_sessions`, `analytics_events`, `admin_users`, `newsletter_subscribers`
  - Recreated all 14 analytics RPCs (verify_admin, get_dashboard_stats, get_sessions_by_date, etc.)
  - Created 2 new newsletter RPCs: `get_newsletter_subscribers`, `get_newsletter_count`
  - Fixed `verify_admin` column reference: uses `pw_hash` instead of `password_hash`
  - Admin credentials set: `squaresolutions` / `Sq@2026Admin!`
  - Enabled realtime for analytics + newsletter tables
  - All RLS policies restored

- **Newsletter Subscribers Admin Panel**:
  - Created `NewsletterPanel.tsx` component with stats cards (Total, Active, This Week, This Month)
  - Searchable subscriber table with email, date, status, source columns
  - Full AR/EN bilingual support via i18n system
  - Integrated into `DashboardShell` below existing analytics charts

- **Newsletter API Route Update**:
  - `app/api/newsletter/route.ts` now persists subscribers to Supabase `newsletter_subscribers` table
  - Uses upsert with `onConflict: "email"` to prevent duplicates
  - Backward compatible: still sends Resend email notification

## 2026-04-27 21:56

### Analytics Dashboard — Traffic Sources Fix
- **Backend RPCs (Supabase)**:
  - Fixed `get_referrer_stats(p_days)`: Resolved SQL ambiguity error `42702` where `GROUP BY referrer` clashed with the PL/pgSQL OUT variable. Changed to `GROUP BY 1` to ensure correct grouping by the calculated field, allowing Traffic Sources to render correctly instead of showing "No referrer data yet".

## 2026-04-27 21:23

### Analytics Dashboard — Full i18n (EN/AR) & InfoTooltips
- **i18n System**:
  - Created `AnalyticsI18nProvider` (React Context) with `useAnalyticsI18n()` hook
  - Created exhaustive `translations.ts` with `en` and `ar` locales
  - Language toggle button (🌐 AR/EN) in dashboard navbar with `dir` attribute switching
- **InfoTooltip Component**: Reusable hoverable info icon with animated popover, smart viewport-aware positioning
- **Components Updated** (all now consume `t` object + show InfoTooltip):
  - `KPICards`, `SessionsChart`, `GeoChart`, `EngagementCard`
  - `VisitorTypeChart`, `ReferrerChart`, `DeviceBrowserCharts`
  - `HourlyTrafficChart`, `TopPagesTable`, `SectionStatsTable`, `RecentSessionsTable`
- **Section Tracking Fixes**:
  - Added `id="cta"` to CTA section and `id="partners"` to PartnersMarquee
  - Lowered `IntersectionObserver` threshold from 0.5 → 0.3
  - Updated `get_section_stats` RPC to filter `event_type = 'section_view'`

## 2026-04-27 21:10

### Analytics Dashboard — Complete Overhaul
- **Backend RPCs (Supabase)**:
  - `get_top_pages(p_days)`: Aggregates views per URL path
  - `get_new_vs_returning(p_days)`: Calculates new vs returning visitors by session count per visitor_id
  - `get_referrer_stats(p_days)`: Tracks traffic sources (Direct, google.com, etc.)
  - `get_engagement_stats(p_days)`: Computes engagement rate, pages/session, avg duration, total events
  - `get_live_visitors()`: Fixed — uses `COUNT(DISTINCT visitor_id)` with 2-min activity window
- **Schema Migrations**:
  - Added `duration_seconds` (int) and `referrer` (text) columns to `analytics_sessions`
  - Added index on `referrer` for fast source queries
- **New UI Components**:
  - `TopPagesTable.tsx`: Ranked page list with animated progress bars and monospace paths
  - `EngagementCard.tsx`: 4-metric engagement panel (rate, pages/session, duration, events) with animated counters
  - `VisitorTypeChart.tsx`: Donut pie chart for New vs Returning visitors
  - `ReferrerChart.tsx`: Color-coded traffic source list with platform-aware dot colors
- **Anti-Flash Fix**: All Recharts components (Sessions, Hourly, Device/Browser) now use `hasAnimated` ref pattern — charts only animate on first render, not on subsequent data updates
- **KPICards.tsx**: Expanded to 6 cards (added Engagement Rate), gradient backgrounds, uppercase labels
- **DashboardShell.tsx**: New 3-row analytics grid layout with Engagement/VisitorType/Referrer row, 60s auto-refresh, 3s debounce on realtime events
- **AnalyticsTracker.tsx**: Now skips /admin/* pages entirely, captures `document.referrer`, computes `duration_seconds`

## 2026-04-24 11:17

### Vercel Analytics Integration
- **`app/layout.tsx`**: Imported and mounted the `<Analytics />` component from `@vercel/analytics/next` to enable page view tracking and visitor analytics on Vercel.
- **`package.json`**: Added `@vercel/analytics` dependency.

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
