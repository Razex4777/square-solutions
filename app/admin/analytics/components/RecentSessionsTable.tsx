"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Tablet, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { RecentSession } from "./DashboardShell";

interface RecentSessionsTableProps {
  sessions: RecentSession[];
  isInitialLoad: boolean;
}

function DeviceIcon({ device }: { device: string }) {
  const d = device?.toLowerCase() || "";
  if (d.includes("mobile") || d.includes("phone")) return <Smartphone className="w-3.5 h-3.5" />;
  if (d.includes("tablet") || d.includes("ipad")) return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export function RecentSessionsTable({ sessions, isInitialLoad }: RecentSessionsTableProps) {
  const { t } = useAnalyticsI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
        <Clock className="w-5 h-5 text-[var(--color-text-muted)]" />
        {t.charts.recentSessions.label}
        <InfoTooltip text={t.charts.recentSessions.tooltip} />
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left py-2 px-2 text-[var(--color-text-muted)] font-medium">{t.table.country}</th>
              <th className="text-left py-2 px-2 text-[var(--color-text-muted)] font-medium">{t.table.device}</th>
              <th className="text-left py-2 px-2 text-[var(--color-text-muted)] font-medium">{t.table.browser}</th>
              <th className="text-left py-2 px-2 text-[var(--color-text-muted)] font-medium">{t.table.duration}</th>
              <th className="text-left py-2 px-2 text-[var(--color-text-muted)] font-medium">{t.table.started}</th>
            </tr>
          </thead>
          <tbody>
            {isInitialLoad ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="py-3 px-2">
                      <div className="animate-pulse h-3 w-16 bg-[var(--color-border)]/40 rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sessions.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {sessions.map((session, idx) => {
                  const isActive =
                    new Date(session.last_active).getTime() > Date.now() - 5 * 60 * 1000;

                  return (
                    <motion.tr
                      key={session.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, delay: idx * 0.02 }}
                      className="border-b border-[var(--color-border)]/30 hover:bg-[var(--color-accent)]/5 transition-colors"
                    >
                      <td className="py-2.5 px-2 text-[var(--color-text-secondary)]">
                        <div className="flex items-center gap-1.5">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          {session.country || "Unknown"}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-1.5">
                          <DeviceIcon device={session.device} />
                          {session.device || "Unknown"}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[var(--color-text-muted)]">{session.browser || "Unknown"}</td>
                      <td className="py-2.5 px-2 text-[var(--color-text-muted)] tabular-nums">
                        {formatDuration(session.duration_seconds)}
                      </td>
                      <td className="py-2.5 px-2 text-[var(--color-text-muted)] text-xs">
                        {(() => {
                          try {
                            return formatDistanceToNow(new Date(session.started_at), { addSuffix: true });
                          } catch {
                            return "Unknown";
                          }
                        })()}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[var(--color-text-muted)]">
                  {t.table.noData}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
