"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { TopPageEntry } from "./DashboardShell";

interface TopPagesTableProps {
  data: TopPageEntry[];
  isInitialLoad: boolean;
}

export function TopPagesTable({ data, isInitialLoad }: TopPagesTableProps) {
  const { t } = useAnalyticsI18n();
  const maxViews = data.length > 0 ? Math.max(...data.map((d) => d.views)) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.topPages.label}</h3>
        <InfoTooltip text={t.charts.topPages.tooltip} />
      </div>

      <div className="space-y-2.5">
        {isInitialLoad ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 w-32 bg-[var(--color-border)]/40 rounded mb-2" />
              <div className="h-1.5 w-full bg-[var(--color-border)]/20 rounded" />
            </div>
          ))
        ) : data.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {data.map((page, idx) => (
              <motion.div
                key={page.page_url}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-[var(--color-text-secondary)] font-mono text-xs truncate max-w-[70%]">
                    {page.page_url || "/"}
                  </span>
                  <motion.span
                    key={page.views}
                    className="text-[var(--color-text-muted)] font-semibold tabular-nums text-xs"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {page.views} {t.table.views}
                  </motion.span>
                </div>
                <div className="h-1.5 bg-[var(--color-border)]/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(page.views / maxViews) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.04 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] py-10 text-sm">{t.table.noData}</p>
        )}
      </div>
    </motion.div>
  );
}
