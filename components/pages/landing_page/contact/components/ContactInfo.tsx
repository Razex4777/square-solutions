"use client";

import { Mail, Facebook, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function ContactInfo() {
  const { t } = useLanguage();

  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com';

  const infoCards = [
    {
      icon: <Mail className="w-5 h-5 text-[var(--color-accent)]" />,
      label: t.contact.emailLabel,
      value: "Info@Sq-Solution.Com",
      href: 'mailto:Info@Sq-Solution.Com',
    },
    {
      icon: <Facebook className="w-5 h-5 text-[var(--color-accent)]" />,
      label: t.contact.facebookLabel,
      value: "Square Solutions",
      href: facebookUrl,
    },
    {
      icon: <Linkedin className="w-5 h-5 text-[var(--color-accent)]" />,
      label: t.contact.linkedinLabel,
      value: "Square Solutions",
      href: linkedinUrl,
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {infoCards.map((card, idx) => (
        <motion.div
          key={idx}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-4 py-4 px-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors duration-300"
        >
          {/* Icon Box */}
          <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-card)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
            {card.icon}
          </div>

          {/* Text Container */}
          <div className="flex flex-col">
            <span className="text-xs text-[var(--color-text-muted)] mb-0.5">{card.label}</span>
            <a href={card.href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-primary)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors">
              {card.value}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
