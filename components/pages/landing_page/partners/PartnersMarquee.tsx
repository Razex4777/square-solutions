"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import {
  MonitorSmartphone,
  PhoneCall,
  Bot,
  CloudCog,
  Globe,
  Megaphone,
} from 'lucide-react';

const SERVICE_ICONS = [
  MonitorSmartphone,
  PhoneCall,
  Bot,
  CloudCog,
  Globe,
  Megaphone,
];

function MarqueeItem({ service, index }: { service: string; index: number }) {
  const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
  return (
    <div className="flex shrink-0 items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-card)]/60 backdrop-blur-sm hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 transition-all duration-300 group cursor-default">
      <Icon className="w-4 h-4 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
      <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 whitespace-nowrap">
        {service}
      </span>
    </div>
  );
}

export function PartnersMarquee() {
  const { t } = useLanguage();

  const services = [
    t.services.softwareTitle,
    t.services.consultingTitle,
    t.services.itTitle,
    t.services.infraTitle,
    t.services.marketingTitle,
    t.services.socialTitle,
  ];

  /* Build a single "set" = all 6 services. We render 6 sets total (36 items).
     The animation scrolls exactly 3 sets worth (50% of 6 sets) then resets.
     Because set 1-3 is identical to set 4-6, the loop is seamless. */
  const tripleSet = [...services, ...services, ...services];

  return (
    <section className="w-full bg-[var(--color-surface)] py-10 md:py-14 overflow-hidden relative z-10 border-y border-[var(--color-border)]">
      <style>{`
        @keyframes marquee-loop {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-runner {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee-loop 40s linear infinite;
          will-change: transform;
        }
        .marquee-runner:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Two identical halves: [A B C A B C] [A B C A B C] — scrolls -50% then resets */}
        <div className="marquee-runner" aria-hidden="true">
          {tripleSet.map((service, i) => (
            <MarqueeItem key={`a-${i}`} service={service} index={i} />
          ))}
          {tripleSet.map((service, i) => (
            <MarqueeItem key={`b-${i}`} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
