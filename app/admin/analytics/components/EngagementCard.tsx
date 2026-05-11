"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gauge, FileStack, Timer, Sparkles } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { EngagementStats } from "./DashboardShell";

interface EngagementCardProps {
  data: EngagementStats | null;
  isInitialLoad: boolean;
}

function useAnimatedValue(target: number, duration = 700): number {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(fromRef.current + (target - fromRef.current) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);
  return display;
}

export function EngagementCard({ data, isInitialLoad }: EngagementCardProps) {
  const { t } = useAnalyticsI18n();
  const engagementRate = useAnimatedValue(data?.engagement_rate || 0);
  const avgPages = useAnimatedValue(data?.avg_pages_per_session || 0);
  const avgDuration = useAnimatedValue(data?.avg_duration_seconds || 0);
  const totalEvents = useAnimatedValue(data?.total_events || 0);

  const metrics = [
    {
      label: t.engagement.engagementRate,
      value: `${Math.round(engagementRate)}%`,
      icon: <Gauge className="w-4 h-4" />,
      color: "#06b6d4",
      progress: engagementRate,
    },
    {
      label: t.engagement.pagesPerSession,
      value: avgPages.toFixed(1),
      icon: <FileStack className="w-4 h-4" />,
      color: "#8b5cf6",
      progress: Math.min(avgPages * 20, 100),
    },
    {
      label: t.engagement.avgDuration,
      value: (() => {
        const s = Math.floor(avgDuration);
        const m = Math.floor(s / 60);
        return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
      })(),
      icon: <Timer className="w-4 h-4" />,
      color: "#f59e0b",
      progress: Math.min(avgDuration / 3, 100),
    },
    {
      label: t.engagement.totalEvents,
      value: Math.round(totalEvents).toLocaleString(),
      icon: <Sparkles className="w-4 h-4" />,
      color: "#10b981",
      progress: Math.min(totalEvents / 10, 100),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Gauge className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.engagement.label}</h3>
        <InfoTooltip text={t.charts.engagement.tooltip} />
      </div>

      <div className="space-y-4">
        {isInitialLoad
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-border)]/40" />
                <div className="flex-1">
                  <div className="h-3 w-20 bg-[var(--color-border)]/40 rounded mb-1" />
                  <div className="h-1.5 w-full bg-[var(--color-border)]/20 rounded" />
                </div>
              </div>
            ))
          : metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${m.color}15`, color: m.color }}
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[var(--color-text-muted)]">{m.label}</span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)] tabular-nums">{m.value}</span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-border)]/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: m.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
}
