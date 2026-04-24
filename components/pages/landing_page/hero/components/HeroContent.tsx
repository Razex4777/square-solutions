"use client";

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

/** Splits text into words and animates each with blur + fade + rise */
function AnimatedHeadingLine({
  text,
  className,
  delayOffset = 0,
  gradient = false,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
  gradient?: boolean;
}) {
  const gradientClasses = gradient
    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]"
    : "";

  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.5,
            delay: delayOffset + i * 0.08,
            ease: "easeOut",
          }}
          className={`inline-block mr-[0.3em] rtl:mr-0 rtl:ml-[0.3em] ${gradientClasses}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start w-full max-w-3xl xl:max-w-4xl pt-10 lg:pt-20">
      {/* Badge — with animated sparkle pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-8 text-[var(--color-accent)] relative overflow-hidden group"
      >
        {/* Shimmer sweep on badge */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />

        <motion.span
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.span>
        <span className="text-xs sm:text-sm font-medium relative z-10">{t.hero.badge}</span>
      </motion.div>

      {/* Main Heading — word-by-word blur reveal */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.1] tracking-tight mb-6 w-full">
        <AnimatedHeadingLine
          text={t.hero.headingLine1}
          className="text-[var(--color-text-primary)] block"
          delayOffset={0.3}
        />
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399] block"
        >
          {t.hero.headingLine2}
        </motion.span>
      </h1>

      {/* Description — fade up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl xl:max-w-3xl leading-relaxed"
      >
        {t.hero.description}
      </motion.p>

      {/* Buttons — stagger fade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full"
      >
        {/* Primary CTA — shimmer gradient button */}
        <button
          type="button"
          onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm font-semibold text-black rounded-lg overflow-hidden active:scale-[0.97] transition-transform"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#2dc5f4] to-[#12e399]" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(45,197,244,0.35)]" />
          <span className="relative z-10">{t.hero.ctaPrimary}</span>
        </button>

        {/* Secondary CTA — subtle hover lift */}
        <motion.button
          type="button"
          onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm font-semibold text-[#12e399] border hover:bg-[#12e399]/5 transition-colors border-[var(--color-border)] rounded-lg"
        >
          {t.hero.ctaSecondary}
        </motion.button>
      </motion.div>
    </div>
  );
}
