"use client";

import { MonitorSmartphone, PhoneCall, Bot, CloudCog, Globe, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function ServicesCards() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <MonitorSmartphone className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.softwareTitle,
      description: t.services.softwareDesc,
      highlight: false,
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.consultingTitle,
      description: t.services.consultingDesc,
      highlight: false,
    },
    {
      icon: <Bot className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.itTitle,
      description: t.services.itDesc,
      highlight: false,
    },
    {
      icon: <CloudCog className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.infraTitle,
      description: t.services.infraDesc,
      highlight: true,
    },
    {
      icon: <Globe className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.marketingTitle,
      description: t.services.marketingDesc,
      highlight: false,
    },
    {
      icon: <Megaphone className="w-5 h-5 text-[var(--color-accent)]" />,
      title: t.services.socialTitle,
      description: t.services.socialDesc,
      highlight: false,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
      {services.map((service, idx) => (
        <motion.div
          key={idx}
          className={`service-card group relative rounded-xl p-6 lg:p-8 flex flex-col bg-[var(--color-surface-card)] backdrop-blur-sm border overflow-hidden transition-colors duration-300 ${
            service.highlight
              ? 'border-[#12e399]/40'
              : 'border-[var(--color-border)]'
          }`}
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          {/* Hover glow overlay */}
          {!service.highlight && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--color-glow-strong),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}

          {/* Persistent glow for highlighted card */}
          {service.highlight && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(18,227,153,0.06),transparent_70%)] pointer-events-none" />
          )}

          {/* Icon Box */}
          <div className="relative z-10 w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center mb-5 self-start shrink-0 border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/20 group-hover:shadow-[0_0_12px_var(--color-card-hover-shadow)] transition-all duration-500">
            {service.icon}
          </div>

          <h3 className="relative z-10 text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {service.title}
          </h3>

          <p className="relative z-10 text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
