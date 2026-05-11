"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

/**
 * AnalyticsTracker — invisible component that tracks:
 * 1. Session creation (with geo, device, browser, referrer)
 * 2. Page views
 * 3. Section views (via IntersectionObserver)
 * 4. Session activity heartbeat (every 15s)
 *
 * Key design decisions:
 * - visitor_id persisted in localStorage (survives tabs/sessions → same person = 1 visitor)
 * - session_id in sessionStorage (unique per tab → different tabs = different sessions)
 * - Observer waits for session init before tracking sections
 * - Admin pages excluded from tracking
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionId = useRef<string | null>(null);
  const sessionReady = useRef(false);
  const observedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Skip tracking on admin pages
    if (pathname?.startsWith("/admin")) return;

    // ── Persistent visitor ID (localStorage) ──
    // Same person across tabs/sessions/days = same visitor_id
    if (!localStorage.getItem("sq_visitor_id")) {
      localStorage.setItem("sq_visitor_id", crypto.randomUUID());
    }
    const visitorId = localStorage.getItem("sq_visitor_id")!;

    // ── Session ID (sessionStorage) ──
    // Unique per tab — new tab = new session, but same visitor
    if (!sessionStorage.getItem("sq_session_id")) {
      sessionStorage.setItem("sq_session_id", crypto.randomUUID());
    }
    sessionId.current = sessionStorage.getItem("sq_session_id");

    const initSession = async () => {
      if (sessionReady.current) return;

      const browser = detectBrowser(navigator.userAgent);
      const device = /Mobi|Android/i.test(navigator.userAgent)
        ? "Mobile"
        : /Tablet|iPad/i.test(navigator.userAgent)
          ? "Tablet"
          : "Desktop";
      const referrer = document.referrer
        ? (() => { try { return new URL(document.referrer).hostname.replace("www.", ""); } catch { return ""; } })()
        : "";

      // Fetch geo from server-side API
      let country = "Unknown";
      try {
        const geoRes = await fetch("/api/geo");
        if (geoRes.ok) {
          const geo = await geoRes.json();
          country = geo.country || "Unknown";
        }
      } catch {
        // Silently fail — country will be "Unknown"
      }

      // Upsert session with SEPARATE visitor_id (from localStorage)
      const { error } = await supabase.from("analytics_sessions").upsert(
        {
          id: sessionId.current,
          visitor_id: visitorId,
          country,
          device,
          browser,
          referrer,
          start_time: new Date().toISOString(),
          last_active: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.warn("[Analytics] Session upsert failed:", error.message);
      }

      // Mark session as ready AFTER the upsert succeeds
      sessionReady.current = true;
    };

    const recordPageView = async () => {
      if (!sessionId.current) return;
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        event_type: "pageview",
        event_data: { path: pathname },
      });
    };

    const updateSessionActivity = async () => {
      if (!sessionId.current) return;

      const now = Date.now();
      const startKey = sessionStorage.getItem("sq_session_start");
      if (!startKey) {
        sessionStorage.setItem("sq_session_start", now.toString());
      }
      const startMs = parseInt(sessionStorage.getItem("sq_session_start") || now.toString());
      const durationSec = Math.floor((now - startMs) / 1000);

      await supabase
        .from("analytics_sessions")
        .update({
          last_active: new Date().toISOString(),
          duration_seconds: durationSec,
        })
        .eq("id", sessionId.current);
    };

    // ── Initialize session FIRST, then record pageview ──
    initSession().then(() => recordPageView());

    // Heartbeat: update activity every 15s
    const heartbeat = setInterval(updateSessionActivity, 15000);

    // ── IntersectionObserver for section tracking ──
    // IMPORTANT: We wait for sessionReady before inserting section events
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sessionReady.current && sessionId.current) {
            const sectionId =
              entry.target.id ||
              entry.target.getAttribute("data-section") ||
              "unknown";
            const trackingKey = `${pathname}::${sectionId}`;

            if (!observedSections.current.has(trackingKey)) {
              observedSections.current.add(trackingKey);

              // Fire-and-forget with error logging
              supabase.from("analytics_events").insert({
                session_id: sessionId.current,
                event_type: "section_view",
                event_data: { section: sectionId, path: pathname },
              }).then(({ error }) => {
                if (error) console.warn("[Analytics] Section insert failed:", error.message);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Give DOM time to render, then observe ALL elements with an id inside <section> or [data-section]
    const observeTimer = setTimeout(() => {
      const targets = document.querySelectorAll("section[id], [data-section]");
      targets.forEach((el) => observer.observe(el));
    }, 2000);

    return () => {
      clearInterval(heartbeat);
      clearTimeout(observeTimer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

/**
 * Extracts a clean browser name from the user agent string.
 */
function detectBrowser(ua: string): string {
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";
  return ua.substring(0, 50);
}
