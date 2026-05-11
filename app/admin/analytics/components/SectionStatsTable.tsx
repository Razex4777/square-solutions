"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { SectionEntry } from "./DashboardShell";

interface SectionStatsTableProps {
  data: SectionEntry[];
  isInitialLoad: boolean;
}

export function SectionStatsTable({ data, isInitialLoad }: SectionStatsTableProps) {
  const { t } = useAnalyticsI18n();
  const maxViews = data.length > 0 ? Math.max(...data.map((d) => d.view_count)) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-[var(--color-text-muted)]" />
        {t.charts.sectionPopularity.label}
        <InfoTooltip text={t.charts.sectionPopularity.tooltip} />
      </h3>
      <div className="space-y-3">
        {isInitialLoad ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 w-24 bg-[var(--color-border)]/40 rounded mb-2" />
              <div className="h-2 w-full bg-[var(--color-border)]/20 rounded" />
            </div>
          ))
        ) : data.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {data.map((section, idx) => (
              <motion.div
                key={section.section_name}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-[var(--color-text-secondary)] capitalize">
                    {section.section_name}
                  </span>
                  <motion.span
                    key={section.view_count}
                    className="text-[var(--color-text-muted)] font-medium tabular-nums"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.view_count}
                  </motion.span>
                </div>
                <div className="h-1.5 bg-[var(--color-border)]/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#8b5cf6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(section.view_count / maxViews) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.04 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] py-10 text-sm">
            {t.table.noData}
          </p>
        )}
      </div>
    </motion.div>
  );
}
