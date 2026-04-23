"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function NavActions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, toggleLocale } = useLanguage();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="w-10 h-10 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-colors"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Language Toggle */}
      <motion.button
        onClick={toggleLocale}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
      >
        {t.nav.langToggle}
      </motion.button>

      {/* CTA Button */}
      <motion.a
        href="#contact-us"
        whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(45, 197, 244, 0.3)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-lg hover:opacity-95 transition-opacity"
      >
        {t.nav.contactUs}
      </motion.a>
    </div>
  );
}
