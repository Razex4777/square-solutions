"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Clock } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { HourlyEntry } from "./DashboardShell";

interface HourlyTrafficChartProps {
  data: HourlyEntry[];
  isInitialLoad: boolean;
}

export function HourlyTrafficChart({ data, isInitialLoad }: HourlyTrafficChartProps) {
  const { t } = useAnalyticsI18n();
  const hasAnimated = useRef(false);

  const fullDay = Array.from({ length: 24 }, (_, i) => {
    const match = data.find((d) => d.hour === i);
    return { hour: i, session_count: match?.session_count || 0, label: `${String(i).padStart(2, "0")}:00` };
  });

  const shouldAnimate = !hasAnimated.current;
  if (data.length > 0) hasAnimated.current = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-[var(--color-text-muted)]" />
        <h3 className="text-base font-semibold">{t.charts.trafficByHour.label}</h3>
        <InfoTooltip text={t.charts.trafficByHour.tooltip} />
      </div>
      <div style={{ width: "100%", height: 240 }}>
        {isInitialLoad ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#8b5cf6]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fullDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} />
              <XAxis dataKey="label" stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} interval={2} />
              <YAxis stroke="var(--color-text-muted)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} width={25} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface-card)",
                  borderColor: "var(--color-border)",
                  borderRadius: "12px",
                  color: "var(--color-text-primary)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="session_count"
                fill="var(--color-accent)"
                radius={[4, 4, 0, 0]}
                name="Sessions"
                isAnimationActive={shouldAnimate}
                animationDuration={600}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
