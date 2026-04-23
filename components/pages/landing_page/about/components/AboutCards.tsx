"use client";

import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function AboutCards() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.about.missionTitle,
      description: t.about.missionDesc,
    },
    {
      title: t.about.visionTitle,
      description: t.about.visionDesc,
    },
    {
      title: t.about.valuesTitle,
      description: t.about.valuesDesc,
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className="about-card group relative rounded-xl p-6 lg:p-8 flex flex-col bg-[var(--color-surface-card)] backdrop-blur-sm border border-[var(--color-border)] overflow-hidden transition-colors duration-300"
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          {/* Gradient top bar — hover-reveal */}
          <div
            className="absolute top-[-1px] left-[-1px] right-[-1px] h-[3px] rounded-t-xl z-10 box-content bg-gradient-to-r from-[#2dc5f4] to-[#12e399] transition-all duration-500 ease-out opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
            style={{ transformOrigin: 'center' }}
          />

          {/* Hover glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-glow-strong),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center mb-6 self-start border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/20 group-hover:shadow-[0_0_12px_var(--color-card-hover-shadow)] transition-all duration-500">
            <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
          </div>

          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {card.title}
          </h3>

          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {card.description}
          </p>

          {/* Top glow on hover */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[50%] h-16 bg-transparent blur-[30px] transition-all duration-500 group-hover:bg-[var(--color-accent)]/10 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
