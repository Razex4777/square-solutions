"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { UserPlus, UserCheck } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { VisitorTypeEntry } from "./DashboardShell";

interface VisitorTypeChartProps {
  data: VisitorTypeEntry[];
  isInitialLoad: boolean;
}

const COLORS: Record<string, { fill: string; icon: React.ReactNode }> = {
  New: { fill: "#3b82f6", icon: <UserPlus className="w-4 h-4" /> },
  Returning: { fill: "#8b5cf6", icon: <UserCheck className="w-4 h-4" /> },
};

export function VisitorTypeChart({ data, isInitialLoad }: VisitorTypeChartProps) {
  const { t } = useAnalyticsI18n();
  const total = data.reduce((s, d) => s + d.count, 0) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.newVsReturning.label}</h3>
        <InfoTooltip text={t.charts.newVsReturning.tooltip} />
      </div>

      {isInitialLoad ? (
        <div className="h-[180px] flex items-center justify-center">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-[var(--color-border)]/30 border-t-blue-500 animate-spin" />
        </div>
      ) : data.length > 0 ? (
        <div className="flex items-center gap-6">
          <div style={{ width: 140, height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={62}
                  dataKey="count"
                  nameKey="visitor_type"
                  stroke="none"
                  isAnimationActive={true}
                  animationDuration={600}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.visitor_type}
                      fill={COLORS[entry.visitor_type]?.fill || "#64748b"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface-card)",
                    borderColor: "var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {data.map((entry) => {
              const percentage = ((entry.count / total) * 100).toFixed(1);
              const meta = COLORS[entry.visitor_type] || { fill: "#64748b", icon: null };
              return (
                <motion.div
                  key={entry.visitor_type}
                  layout
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${meta.fill}15`, color: meta.fill }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--color-text-secondary)]">{entry.visitor_type}</span>
                      <span className="text-sm font-bold tabular-nums">{entry.count}</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{percentage}%</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-[180px] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
          No visitor data yet
        </div>
      )}
    </motion.div>
  );
}
