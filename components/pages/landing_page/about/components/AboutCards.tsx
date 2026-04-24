"use client";

import { Target, Eye, Gem } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { TiltCard } from '@/components/ui/TiltCard';

export function AboutCards() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.about.missionTitle,
      description: t.about.missionDesc,
      icon: Target,
      spotlightColor: 'rgba(45, 197, 244, 0.12)',
    },
    {
      title: t.about.visionTitle,
      description: t.about.visionDesc,
      icon: Eye,
      spotlightColor: 'rgba(18, 227, 153, 0.12)',
    },
    {
      title: t.about.valuesTitle,
      description: t.about.valuesDesc,
      icon: Gem,
      spotlightColor: 'rgba(168, 85, 247, 0.12)',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 w-full mt-6" style={{ perspective: '1200px' }}>
      {cards.map((card, idx) => (
        <TiltCard
          key={idx}
          tiltDegree={10}
          spotlightColor={card.spotlightColor}
          contentZ={25}
          className="about-card group rounded-2xl p-6 lg:p-8 flex flex-col bg-[var(--color-surface-card)] backdrop-blur-sm border border-[var(--color-border)] hover:border-[var(--color-accent)]/25 transition-colors duration-300"
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-elevated)] flex items-center justify-center mb-6 self-start border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/30 group-hover:shadow-[0_0_20px_var(--color-card-hover-shadow)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2dc5f4]/10 to-[#12e399]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <card.icon className="w-5 h-5 text-[var(--color-accent)] relative z-10" />
          </div>

          <h3 className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {card.title}
          </h3>

          <p className="text-[var(--color-text-secondary)] text-sm lg:text-base leading-relaxed mt-auto">
            {card.description}
          </p>
        </TiltCard>
      ))}
    </div>
  );
}
