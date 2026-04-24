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

  return (
    <section className="w-full bg-[var(--color-surface)] py-10 md:py-14 overflow-hidden relative z-10 border-y border-[var(--color-border)]">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 35s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max items-center gap-12 md:gap-16 py-2 pr-12 md:pr-16 animate-marquee-scroll">
          {/* Render 4x to guarantee seamless infinite loop on all screen sizes */}
          {[...services, ...services, ...services, ...services].map((service, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
            return (
              <div
                key={index}
                className="flex shrink-0 items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-card)]/60 backdrop-blur-sm hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 transition-all duration-300 group cursor-default"
              >
                <Icon className="w-4 h-4 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 whitespace-nowrap">
                  {service}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
