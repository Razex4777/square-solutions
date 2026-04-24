"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function NavLinks() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.aboutUs, id: 'about-us' },
    { label: t.nav.ourServices, id: 'our-services' },
    { label: t.nav.faq, id: 'faq' }
  ];

  return (
    <nav className="hidden md:flex items-center gap-1 relative">
      {links.map((link, idx) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="relative px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg z-10"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {link.label}

          {/* Animated underline */}
          {hoveredIndex === idx && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-lg bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </a>
      ))}
    </nav>
  );
}
