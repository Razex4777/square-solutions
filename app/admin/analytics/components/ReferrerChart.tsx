"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2 } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { ReferrerEntry } from "./DashboardShell";

interface ReferrerChartProps {
  data: ReferrerEntry[];
  isInitialLoad: boolean;
}

const REFERRER_COLORS: Record<string, string> = {
  Direct: "#10b981",
  "google.com": "#4285f4",
  "facebook.com": "#1877f2",
  "twitter.com": "#1da1f2",
  "linkedin.com": "#0a66c2",
  "instagram.com": "#e4405f",
  "youtube.com": "#ff0000",
  "reddit.com": "#ff4500",
  "github.com": "#f0f6fc",
  "t.co": "#1da1f2",
};

function getRefColor(ref: string): string {
  return REFERRER_COLORS[ref] || "#8b5cf6";
}

export function ReferrerChart({ data, isInitialLoad }: ReferrerChartProps) {
  const { t } = useAnalyticsI18n();
  const maxCount = data.length > 0 ? Math.max(...data.map((d) => d.count)) : 1;
  const total = data.reduce((s, d) => s + d.count, 0) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Link2 className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.trafficSources.label}</h3>
        <InfoTooltip text={t.charts.trafficSources.tooltip} />
      </div>

      <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
        {isInitialLoad ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 py-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-border)]/40" />
              <div className="flex-1 h-3 bg-[var(--color-border)]/40 rounded" />
              <div className="w-8 h-3 bg-[var(--color-border)]/40 rounded" />
            </div>
          ))
        ) : data.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {data.map((entry, idx) => {
              const percentage = ((entry.count / total) * 100).toFixed(1);
              const barWidth = (entry.count / maxCount) * 100;
              const color = getRefColor(entry.referrer);

              return (
                <motion.div
                  key={entry.referrer}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-[var(--color-text-secondary)] truncate flex-1">
                      {entry.referrer}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted)] shrink-0">
                      {percentage}%
                    </span>
                    <motion.span
                      key={entry.count}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-bold tabular-nums shrink-0"
                      style={{ color }}
                    >
                      {entry.count}
                    </motion.span>
                  </div>
                  <div className="h-1 bg-[var(--color-border)]/20 rounded-full overflow-hidden ml-[18px]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.04 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Link2 className="w-8 h-8 text-[var(--color-text-muted)]/30" />
            <p className="text-sm text-[var(--color-text-muted)]">No referrer data yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
