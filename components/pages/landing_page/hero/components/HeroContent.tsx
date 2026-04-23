"use client";

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function HeroContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start w-full max-w-3xl xl:max-w-4xl pt-10 lg:pt-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-8 text-[var(--color-accent)]">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs sm:text-sm font-medium">{t.hero.badge}</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.1] tracking-tight mb-6 w-full">
        <span className="text-[var(--color-text-primary)] block">{t.hero.headingLine1}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          {t.hero.headingLine2}
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl xl:max-w-3xl leading-relaxed">
        {t.hero.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <motion.button
          type="button"
          onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(45, 197, 244, 0.25)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#2dc5f4] to-[#12e399] hover:opacity-95 transition-opacity rounded-lg"
        >
          {t.hero.ctaPrimary}
        </motion.button>
        <motion.button
          type="button"
          onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm font-semibold text-[#12e399] border hover:bg-[#12e399]/5 transition-colors border-[var(--color-border)] rounded-lg"
        >
          {t.hero.ctaSecondary}
        </motion.button>
      </div>
    </div>
  );
}
