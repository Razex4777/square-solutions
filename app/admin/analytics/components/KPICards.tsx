"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Eye, Users, Clock, TrendingDown, Zap,
} from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { DashboardStats, EngagementStats } from "./DashboardShell";

interface KPICardsProps {
  stats: DashboardStats | null;
  isInitialLoad: boolean;
  engagement: EngagementStats | null;
}

function AnimatedNumber({
  value, suffix = "", decimals = 0, duration = 700,
}: {
  value: number; suffix?: string; decimals?: number; duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const step = (ts: number) => {
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * ease);
      if (p < 1) requestAnimationFrame(step);
      else prevRef.current = to;
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {suffix}
    </span>
  );
}

const ICON_MAP = [Globe, Eye, Users, Clock, TrendingDown, Zap];
const GRADIENTS = [
  "from-[#2dc5f4]/15 to-[#2dc5f4]/5",
  "from-[#8b5cf6]/15 to-[#8b5cf6]/5",
  "from-[#f59e0b]/15 to-[#f59e0b]/5",
  "from-[#10b981]/15 to-[#10b981]/5",
  "from-[#ef4444]/15 to-[#ef4444]/5",
  "from-[#06b6d4]/15 to-[#06b6d4]/5",
];
const ICON_COLORS = ["text-[#2dc5f4]", "text-[#8b5cf6]", "text-[#f59e0b]", "text-[#10b981]", "text-[#ef4444]", "text-[#06b6d4]"];

export function KPICards({ stats, isInitialLoad, engagement }: KPICardsProps) {
  const { t } = useAnalyticsI18n();

  const kpiKeys = ["totalSessions", "pageviews", "active24h", "avgDuration", "bounceRate", "engagement"] as const;

  const values = [
    stats?.total_sessions ?? 0,
    stats?.total_pageviews ?? 0,
    stats?.active_users_24h ?? 0,
    stats?.avg_duration_seconds ?? 0,
    stats?.bounce_rate ?? 0,
    engagement?.engagement_rate ?? 0,
  ];

  const suffixes = ["", "", "", "s", "%", "%"];
  const decimalsList = [0, 0, 0, 0, 1, 1];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-5">
      {kpiKeys.map((key, i) => {
        const Icon = ICON_MAP[i];
        const { label, tooltip } = t.kpi[key];

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-gradient-to-br ${GRADIENTS[i]} border border-[var(--color-border)] rounded-2xl p-4 sm:p-5 hover:border-[var(--color-accent)]/30 transition-all group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--color-surface-elevated)] border border-[var(--color-border)] group-hover:scale-110 transition-transform ${ICON_COLORS[i]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <InfoTooltip text={tooltip} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              {isInitialLoad ? (
                <div className="h-8 w-16 bg-[var(--color-border)]/30 rounded animate-pulse" />
              ) : (
                <AnimatedNumber value={values[i]} suffix={suffixes[i]} decimals={decimalsList[i]} />
              )}
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
