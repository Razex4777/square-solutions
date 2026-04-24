"use client";

import { MonitorSmartphone, PhoneCall, Bot, CloudCog, Globe, Megaphone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { TiltCard } from '@/components/ui/TiltCard';

export function ServicesCards() {
  const { t } = useLanguage();

  const services = [
    {
      icon: MonitorSmartphone,
      title: t.services.softwareTitle,
      description: t.services.softwareDesc,
      highlight: false,
      spotlightColor: 'rgba(45, 197, 244, 0.12)',
    },
    {
      icon: PhoneCall,
      title: t.services.consultingTitle,
      description: t.services.consultingDesc,
      highlight: false,
      spotlightColor: 'rgba(18, 227, 153, 0.12)',
    },
    {
      icon: Bot,
      title: t.services.itTitle,
      description: t.services.itDesc,
      highlight: false,
      spotlightColor: 'rgba(99, 102, 241, 0.12)',
    },
    {
      icon: CloudCog,
      title: t.services.infraTitle,
      description: t.services.infraDesc,
      highlight: true,
      spotlightColor: 'rgba(18, 227, 153, 0.15)',
    },
    {
      icon: Globe,
      title: t.services.marketingTitle,
      description: t.services.marketingDesc,
      highlight: false,
      spotlightColor: 'rgba(251, 146, 60, 0.12)',
    },
    {
      icon: Megaphone,
      title: t.services.socialTitle,
      description: t.services.socialDesc,
      highlight: false,
      spotlightColor: 'rgba(168, 85, 247, 0.12)',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full" style={{ perspective: '1200px' }}>
      {services.map((service, idx) => (
        <TiltCard
          key={idx}
          tiltDegree={6}
          spotlightColor={service.spotlightColor}
          contentZ={20}
          className={`service-card group rounded-xl p-6 lg:p-8 flex flex-col bg-[var(--color-surface-card)] backdrop-blur-sm border transition-colors duration-300 ${
            service.highlight
              ? 'border-[#12e399]/40'
              : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/25'
          }`}
        >
          {/* Persistent glow for highlighted card */}
          {service.highlight && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(18,227,153,0.06),transparent_70%)] pointer-events-none z-0" />
          )}

          {/* Icon Box */}
          <div className="relative z-10 w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center mb-5 self-start shrink-0 border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/20 group-hover:shadow-[0_0_12px_var(--color-card-hover-shadow)] transition-all duration-500">
            <service.icon className="w-5 h-5 text-[var(--color-accent)]" />
          </div>

          <h3 className="relative z-10 text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {service.title}
          </h3>

          <p className="relative z-10 text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {service.description}
          </p>
        </TiltCard>
      ))}
    </div>
  );
}
