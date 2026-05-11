"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { TrendingUp } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { SessionByDate } from "./DashboardShell";

interface SessionsChartProps {
  data: SessionByDate[];
  isInitialLoad: boolean;
}

export function SessionsChart({ data, isInitialLoad }: SessionsChartProps) {
  const { t } = useAnalyticsI18n();
  const hasAnimated = useRef(false);

  const chartData = data.length > 0
    ? data
    : [{ date: format(new Date(), "yyyy-MM-dd"), count: 0 }];

  // Only animate on first render, not on data updates
  const shouldAnimate = !hasAnimated.current;
  if (data.length > 0) hasAnimated.current = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.sessionsOverTime.label}</h3>
        <InfoTooltip text={t.charts.sessionsOverTime.tooltip} />
      </div>
      <div style={{ width: "100%", height: 280 }}>
        {isInitialLoad ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[var(--color-accent)]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} />
              <XAxis
                dataKey="date"
                stroke="var(--color-text-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  try { return format(new Date(val), "MMM dd"); }
                  catch { return val; }
                }}
              />
              <YAxis stroke="var(--color-text-muted)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} width={30} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface-card)",
                  borderColor: "var(--color-border)",
                  borderRadius: "12px",
                  color: "var(--color-text-primary)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  fontSize: "13px",
                }}
                labelFormatter={(val) => {
                  try { return format(new Date(val), "EEEE, MMM dd"); }
                  catch { return val; }
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--color-accent)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#sessionGradient)"
                name="Sessions"
                isAnimationActive={shouldAnimate}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
