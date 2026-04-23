"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function NavLinks() {
  const { t, isRTL } = useLanguage();
  
  const links = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.aboutUs, id: 'about-us' },
    { label: t.nav.ourServices, id: 'our-services' },
    { label: t.nav.faq, id: 'faq' }
  ];

  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => (
        <motion.a
          key={link.id}
          href={`#${link.id}`}
          className="relative px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {link.label}
        </motion.a>
      ))}
    </nav>
  );
}
