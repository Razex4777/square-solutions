"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Users, TrendingUp, Calendar, Search, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  source: string;
}

interface NewsletterStats {
  total: number;
  active: number;
  this_week: number;
  this_month: number;
}

export function NewsletterPanel() {
  const { t, locale } = useAnalyticsI18n();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [subsRes, statsRes] = await Promise.all([
        supabase.rpc("get_newsletter_subscribers", { p_limit: 100, p_offset: 0 }),
        supabase.rpc("get_newsletter_count"),
      ]);
      setSubscribers(subsRes.data || []);
      setStats(statsRes.data || { total: 0, active: 0, this_week: 0, this_month: 0 });
    } catch (err) {
      console.error("[NewsletterPanel] Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statCards = [
    { label: t.newsletter.total, value: stats?.total ?? 0, icon: Users, color: "var(--color-accent)" },
    { label: t.newsletter.active, value: stats?.active ?? 0, icon: CheckCircle2, color: "#10b981" },
    { label: t.newsletter.thisWeek, value: stats?.this_week ?? 0, icon: TrendingUp, color: "#8b5cf6" },
    { label: t.newsletter.thisMonth, value: stats?.this_month ?? 0, icon: Calendar, color: "#f59e0b" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 lg:col-span-3"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--color-accent)]" />
          {t.newsletter.title}
          <InfoTooltip text={t.newsletter.tooltip} />
        </h3>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`${t.newsletter.email}...`}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-10" style={{ background: card.color }} />
            <card.icon className="w-5 h-5 mb-2" style={{ color: card.color }} />
            <motion.p
              key={card.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold tabular-nums"
            >
              {isLoading ? "—" : card.value}
            </motion.p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left py-2.5 px-3 text-[var(--color-text-muted)] font-medium">{t.newsletter.email}</th>
              <th className="text-left py-2.5 px-3 text-[var(--color-text-muted)] font-medium">{t.newsletter.subscribedAt}</th>
              <th className="text-left py-2.5 px-3 text-[var(--color-text-muted)] font-medium">{t.newsletter.status}</th>
              <th className="text-left py-2.5 px-3 text-[var(--color-text-muted)] font-medium">{t.newsletter.source}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="py-3 px-3">
                      <div className="h-4 bg-[var(--color-text-muted)]/10 rounded-md animate-pulse w-[70%]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-[var(--color-text-muted)]">
                  <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">{t.newsletter.noSubscribers}</p>
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {filtered.map((sub, i) => (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-accent)]/[0.03] transition-colors"
                  >
                    <td className="py-3 px-3">
                      <span className="font-medium text-[var(--color-accent)]">{sub.email}</span>
                    </td>
                    <td className="py-3 px-3 text-[var(--color-text-secondary)] tabular-nums">
                      {new Date(sub.subscribed_at).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-3">
                      {sub.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          {t.newsletter.activeStatus}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                          <XCircle className="w-3 h-3" />
                          {t.newsletter.inactiveStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-[var(--color-text-muted)] capitalize">{sub.source}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
