"use client";

import CountUp from '@/components/ui/CountUp';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Calendar, FolderCheck, Users, Handshake } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

export function AboutStats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Calendar,
      value: 2,
      suffix: '+',
      label: t.about.statsYears,
      color: '#2dc5f4',
      spotlightColor: 'rgba(45, 197, 244, 0.1)',
    },
    {
      icon: FolderCheck,
      value: 50,
      suffix: '+',
      label: t.about.statsProjects,
      color: '#12e399',
      spotlightColor: 'rgba(18, 227, 153, 0.1)',
    },
    {
      icon: Users,
      value: 30,
      suffix: '+',
      label: t.about.statsClients,
      color: '#a855f7',
      spotlightColor: 'rgba(168, 85, 247, 0.1)',
    },
    {
      icon: Handshake,
      value: 100,
      suffix: '%',
      label: t.about.statsCommitment,
      color: '#fb923c',
      spotlightColor: 'rgba(251, 146, 60, 0.1)',
    },
  ];

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full mt-14 pt-14 border-t border-[var(--color-border)]"
      style={{ perspective: '1000px' }}
    >
      {stats.map((stat, idx) => (
        <TiltCard
          key={idx}
          tiltDegree={12}
          spotlightColor={stat.spotlightColor}
          contentZ={15}
          className="group rounded-2xl p-5 sm:p-6 lg:p-8 bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/20 transition-colors duration-300 flex flex-col items-center text-center"
        >
          {/* Icon with colored glow */}
          <div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 border border-[var(--color-border)] group-hover:border-opacity-50 transition-all duration-500 relative overflow-hidden"
            style={{
              backgroundColor: `${stat.color}08`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${stat.color}20, transparent 70%)`,
              }}
            />
            <stat.icon className="w-5 h-5 relative z-10" style={{ color: stat.color }} />
          </div>

          {/* Animated Number */}
          <div className="flex items-baseline gap-0.5 mb-2">
            <CountUp
              to={stat.value}
              duration={2.5}
              delay={idx * 0.15}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] tabular-nums"
            />
            <span
              className="text-xl sm:text-2xl lg:text-3xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.suffix}
            </span>
          </div>

          {/* Label */}
          <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-tight">
            {stat.label}
          </span>
        </TiltCard>
      ))}
    </div>
  );
}
