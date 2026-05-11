"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import {
  LayoutDashboard, LogOut, RefreshCw, Radio, Languages,
} from "lucide-react";
import { AnalyticsI18nProvider, useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { KPICards } from "./KPICards";
import { SessionsChart } from "./SessionsChart";
import { GeoChart } from "./GeoChart";
import { DeviceBrowserCharts } from "./DeviceBrowserCharts";
import { HourlyTrafficChart } from "./HourlyTrafficChart";
import { SectionStatsTable } from "./SectionStatsTable";
import { RecentSessionsTable } from "./RecentSessionsTable";
import { TopPagesTable } from "./TopPagesTable";
import { EngagementCard } from "./EngagementCard";
import { VisitorTypeChart } from "./VisitorTypeChart";
import { ReferrerChart } from "./ReferrerChart";
import { NewsletterPanel } from "./NewsletterPanel";

/* ── Shared Types ── */
export interface DashboardStats {
  total_sessions: number;
  total_pageviews: number;
  active_users_24h: number;
  avg_duration_seconds: number;
  bounce_rate: number;
  top_pages: { page_url: string; views: number }[];
}

export interface SessionByDate { date: string; count: number; }
export interface GeoEntry { country: string; count: number; }
export interface DeviceEntry { device: string; count: number; }
export interface BrowserEntry { browser_name: string; count: number; }
export interface HourlyEntry { hour: number; session_count: number; }
export interface SectionEntry { section_name: string; view_count: number; }
export interface TopPageEntry { page_url: string; views: number; }
export interface VisitorTypeEntry { visitor_type: string; count: number; }
export interface ReferrerEntry { referrer: string; count: number; }
export interface EngagementStats {
  avg_pages_per_session: number;
  avg_duration_seconds: number;
  engagement_rate: number;
  total_events: number;
}
export interface RecentSession {
  id: string; country: string; device: string; browser: string;
  started_at: string; last_active: string; duration_seconds: number;
}

interface DashboardShellProps { onLogout: () => void; }

/** Outer wrapper that provides i18n context */
export function DashboardShell(props: DashboardShellProps) {
  return (
    <AnalyticsI18nProvider>
      <DashboardContent {...props} />
    </AnalyticsI18nProvider>
  );
}

/** Inner dashboard content that consumes i18n */
function DashboardContent({ onLogout }: DashboardShellProps) {
  const { locale, t, toggleLocale } = useAnalyticsI18n();
  const [timeRange, setTimeRange] = useState(7);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [spinnerActive, setSpinnerActive] = useState(false);

  // Realtime state
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [realtimePulse, setRealtimePulse] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sessionsData, setSessionsData] = useState<SessionByDate[]>([]);
  const [geoData, setGeoData] = useState<GeoEntry[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceEntry[]>([]);
  const [browserData, setBrowserData] = useState<BrowserEntry[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyEntry[]>([]);
  const [sectionData, setSectionData] = useState<SectionEntry[]>([]);
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([]);
  const [topPages, setTopPages] = useState<TopPageEntry[]>([]);
  const [visitorTypes, setVisitorTypes] = useState<VisitorTypeEntry[]>([]);
  const [referrers, setReferrers] = useState<ReferrerEntry[]>([]);
  const [engagement, setEngagement] = useState<EngagementStats | null>(null);

  const fetchAllData = useCallback(async () => {
    setSpinnerActive(true);
    try {
      const [
        statsRes, sessionsRes, geoRes, deviceRes, browserRes,
        hourlyRes, sectionRes, recentRes, topPagesRes,
        visitorTypeRes, referrerRes, engagementRes,
      ] = await Promise.all([
        supabase.rpc("get_dashboard_stats", { p_days: timeRange }),
        supabase.rpc("get_sessions_by_date", { p_days: timeRange }),
        supabase.rpc("get_geo_stats", { p_days: timeRange }),
        supabase.rpc("get_device_stats", { p_days: timeRange }),
        supabase.rpc("get_browser_stats", { p_days: timeRange }),
        supabase.rpc("get_hourly_traffic", { p_days: timeRange }),
        supabase.rpc("get_section_stats", { p_days: timeRange }),
        supabase.rpc("get_recent_sessions", { p_limit: 20 }),
        supabase.rpc("get_top_pages", { p_days: timeRange }),
        supabase.rpc("get_new_vs_returning", { p_days: timeRange }),
        supabase.rpc("get_referrer_stats", { p_days: timeRange }),
        supabase.rpc("get_engagement_stats", { p_days: timeRange }),
      ]);

      setStats(statsRes.data || {
        total_sessions: 0, total_pageviews: 0, active_users_24h: 0,
        avg_duration_seconds: 0, bounce_rate: 0, top_pages: [],
      });
      setSessionsData(sessionsRes.data || []);
      setGeoData(geoRes.data || []);
      setDeviceData(deviceRes.data || []);
      setBrowserData(browserRes.data || []);
      setHourlyData(hourlyRes.data || []);
      setSectionData(sectionRes.data || []);
      setRecentSessions(recentRes.data || []);
      setTopPages(topPagesRes.data || []);
      setVisitorTypes(visitorTypeRes.data || []);
      setReferrers(referrerRes.data || []);
      setEngagement(engagementRes.data?.[0] || null);
      setLastRefresh(new Date());
      setIsInitialLoad(false);
    } catch (err) {
      console.error("[Dashboard] Error fetching data:", err);
    } finally {
      setSpinnerActive(false);
    }
  }, [timeRange]);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);
  useEffect(() => {
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "analytics_sessions" }, () => {
        setRealtimePulse(true);
        setTimeout(() => setRealtimePulse(false), 1500);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchAllData(), 3000);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "analytics_events" }, () => {
        setRealtimePulse(true);
        setTimeout(() => setRealtimePulse(false), 1500);
      })
      .subscribe((status) => setRealtimeConnected(status === "SUBSCRIBED"));
    return () => { supabase.removeChannel(channel); };
  }, [fetchAllData]);

  // Live visitors
  useEffect(() => {
    const fetchLive = async () => {
      const { data } = await supabase.rpc("get_live_visitors");
      setLiveVisitors(typeof data === "number" ? data : 0);
    };
    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div dir={t.dir} className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)] pb-20">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-[var(--color-navbar-bg)] backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">{t.nav.title}</h1>
              <p className="text-[11px] text-[var(--color-text-muted)] hidden sm:block tabular-nums">
                {t.nav.updated} {lastRefresh.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Visitors Badge */}
            <motion.div layout className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${realtimeConnected ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${realtimeConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
              </span>
              <motion.span key={liveVisitors} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-xs font-semibold text-[var(--color-text-secondary)] tabular-nums">
                {liveVisitors}
              </motion.span>
              <span className="text-[11px] text-[var(--color-text-muted)]">{t.nav.live}</span>
            </motion.div>

            {/* Realtime Pulse */}
            <AnimatePresence>
              {realtimePulse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                >
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-400">{t.nav.livePulse}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 rounded-lg transition-all"
              title={locale === "en" ? "التبديل للعربية" : "Switch to English"}
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{locale === "en" ? "AR" : "EN"}</span>
            </button>

            <button
              onClick={fetchAllData}
              disabled={spinnerActive}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 rounded-lg transition-all disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 transition-transform ${spinnerActive ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Time Range */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <motion.h2 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold tracking-tight">
              {t.overview.title}
            </motion.h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{t.overview.subtitle}</p>
          </div>
          <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        </div>

        <KPICards stats={stats} isInitialLoad={isInitialLoad} engagement={engagement} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <SessionsChart data={sessionsData} isInitialLoad={isInitialLoad} />
          <GeoChart data={geoData} isInitialLoad={isInitialLoad} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <EngagementCard data={engagement} isInitialLoad={isInitialLoad} />
          <VisitorTypeChart data={visitorTypes} isInitialLoad={isInitialLoad} />
          <ReferrerChart data={referrers} isInitialLoad={isInitialLoad} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <DeviceBrowserCharts deviceData={deviceData} browserData={browserData} isInitialLoad={isInitialLoad} />
          <HourlyTrafficChart data={hourlyData} isInitialLoad={isInitialLoad} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <TopPagesTable data={topPages} isInitialLoad={isInitialLoad} />
          <SectionStatsTable data={sectionData} isInitialLoad={isInitialLoad} />
          <RecentSessionsTable sessions={recentSessions} isInitialLoad={isInitialLoad} />
        </div>

        {/* ── Newsletter Subscribers ── */}
        <div className="grid grid-cols-1 gap-5 mb-5">
          <NewsletterPanel />
        </div>
      </main>
    </div>
  );
}
