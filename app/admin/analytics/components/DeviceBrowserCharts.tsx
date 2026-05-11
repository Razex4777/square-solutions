"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import { Monitor, Globe } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { DeviceEntry, BrowserEntry } from "./DashboardShell";

interface DeviceBrowserChartsProps {
  deviceData: DeviceEntry[];
  browserData: BrowserEntry[];
  isInitialLoad: boolean;
}

const DEVICE_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444"];
const BROWSER_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

export function DeviceBrowserCharts({ deviceData, browserData, isInitialLoad }: DeviceBrowserChartsProps) {
  const { t } = useAnalyticsI18n();
  const hasAnimatedDevice = useRef(false);
  const hasAnimatedBrowser = useRef(false);

  const animateDevice = !hasAnimatedDevice.current;
  const animateBrowser = !hasAnimatedBrowser.current;
  if (deviceData.length > 0) hasAnimatedDevice.current = true;
  if (browserData.length > 0) hasAnimatedBrowser.current = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Devices */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-[var(--color-text-muted)]" />
            <h3 className="text-base font-semibold">{t.charts.devices.label}</h3>
            <InfoTooltip text={t.charts.devices.tooltip} />
          </div>
          <div style={{ width: "100%", height: 180 }}>
            {isInitialLoad ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-[var(--color-border)]/30 border-t-blue-500 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="count"
                    nameKey="device"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    stroke="none"
                    isAnimationActive={animateDevice}
                    animationDuration={600}
                  >
                    {deviceData.map((_, i) => (
                      <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
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
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {deviceData.map((d, i) => (
              <div key={d.device} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DEVICE_COLORS[i % DEVICE_COLORS.length] }} />
                <span className="text-xs text-[var(--color-text-muted)]">{d.device}</span>
                <span className="text-xs font-bold tabular-nums">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[var(--color-text-muted)]" />
            <h3 className="text-base font-semibold">{t.charts.browsers.label}</h3>
            <InfoTooltip text={t.charts.browsers.tooltip} />
          </div>
          <div style={{ width: "100%", height: 180 }}>
            {isInitialLoad ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-[var(--color-border)]/30 border-t-emerald-500 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    dataKey="count"
                    nameKey="browser_name"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    stroke="none"
                    isAnimationActive={animateBrowser}
                    animationDuration={600}
                  >
                    {browserData.map((_, i) => (
                      <Cell key={i} fill={BROWSER_COLORS[i % BROWSER_COLORS.length]} />
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
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {browserData.map((b, i) => (
              <div key={b.browser_name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BROWSER_COLORS[i % BROWSER_COLORS.length] }} />
                <span className="text-xs text-[var(--color-text-muted)]">{b.browser_name}</span>
                <span className="text-xs font-bold tabular-nums">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
