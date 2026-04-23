"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLogo } from './components/NavLogo';
import { NavLinks } from './components/NavLinks';
import { NavActions } from './components/NavActions';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.aboutUs, id: 'about-us' },
    { label: t.nav.ourServices, id: 'our-services' },
    { label: t.nav.faq, id: 'faq' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-navbar-bg)] backdrop-blur-xl border-b border-[var(--color-border)] shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 h-20 flex items-center justify-between">
          <NavLogo />
          <NavLinks />
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <NavActions />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex w-10 h-10 shrink-0 rounded-lg border border-[var(--color-border)] items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors bg-[var(--color-surface)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] backdrop-blur-xl shadow-2xl shadow-black/10"
          >
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
