-- ============================================================
-- ENHANCED ANALYTICS MIGRATION
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)
-- Project: squaresolutions (kzwlbedjxkathkuxeoaz)
-- ============================================================

-- 1. Enable Realtime on analytics tables
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_events;

-- 2. RLS: allow anon to SELECT for dashboard reads
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon select sessions') THEN
    CREATE POLICY "Allow anon select sessions" ON analytics_sessions FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon select events') THEN
    CREATE POLICY "Allow anon select events" ON analytics_events FOR SELECT USING (true);
  END IF;
END $$;

-- 3. Device stats function
CREATE OR REPLACE FUNCTION get_device_stats(p_days integer DEFAULT 7)
RETURNS TABLE(device text, count bigint)
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT COALESCE(device, 'Unknown') AS device, COUNT(*) AS count
  FROM analytics_sessions
  WHERE created_at >= NOW() - (p_days || ' days')::interval
  GROUP BY device ORDER BY count DESC;
$$;

-- 4. Browser stats function
CREATE OR REPLACE FUNCTION get_browser_stats(p_days integer DEFAULT 7)
RETURNS TABLE(browser_name text, count bigint)
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    CASE
      WHEN browser ILIKE '%Chrome%' AND browser NOT ILIKE '%Edg%' THEN 'Chrome'
      WHEN browser ILIKE '%Firefox%' THEN 'Firefox'
      WHEN browser ILIKE '%Safari%' AND browser NOT ILIKE '%Chrome%' THEN 'Safari'
      WHEN browser ILIKE '%Edg%' THEN 'Edge'
      WHEN browser ILIKE '%Opera%' OR browser ILIKE '%OPR%' THEN 'Opera'
      ELSE 'Other'
    END AS browser_name,
    COUNT(*) AS count
  FROM analytics_sessions
  WHERE created_at >= NOW() - (p_days || ' days')::interval
  GROUP BY browser_name ORDER BY count DESC;
$$;

-- 5. Recent sessions function
CREATE OR REPLACE FUNCTION get_recent_sessions(p_limit integer DEFAULT 20)
RETURNS TABLE(
  id uuid, country text, device text, browser text,
  created_at timestamptz, last_active timestamptz, duration_seconds numeric
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT s.id, COALESCE(s.country, 'Unknown'),
    COALESCE(s.device, 'Unknown'),
    CASE
      WHEN s.browser ILIKE '%Chrome%' AND s.browser NOT ILIKE '%Edg%' THEN 'Chrome'
      WHEN s.browser ILIKE '%Firefox%' THEN 'Firefox'
      WHEN s.browser ILIKE '%Safari%' AND s.browser NOT ILIKE '%Chrome%' THEN 'Safari'
      WHEN s.browser ILIKE '%Edg%' THEN 'Edge'
      ELSE 'Other'
    END,
    s.created_at, s.last_active,
    EXTRACT(EPOCH FROM (COALESCE(s.last_active, s.created_at) - s.created_at))
  FROM analytics_sessions s ORDER BY s.created_at DESC LIMIT p_limit;
$$;

-- 6. Section stats function
CREATE OR REPLACE FUNCTION get_section_stats(p_days integer DEFAULT 7)
RETURNS TABLE(section_name text, view_count bigint)
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT COALESCE(event_data->>'section', event_data->>'path', 'Unknown') AS section_name,
    COUNT(*) AS view_count
  FROM analytics_events
  WHERE created_at >= NOW() - (p_days || ' days')::interval
  GROUP BY section_name ORDER BY view_count DESC LIMIT 15;
$$;

-- 7. Hourly traffic function
CREATE OR REPLACE FUNCTION get_hourly_traffic(p_days integer DEFAULT 7)
RETURNS TABLE(hour integer, session_count bigint)
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXTRACT(HOUR FROM created_at)::integer AS hour, COUNT(*) AS session_count
  FROM analytics_sessions
  WHERE created_at >= NOW() - (p_days || ' days')::interval
  GROUP BY hour ORDER BY hour;
$$;

-- 8. Override get_dashboard_stats (returns proper JSON)
CREATE OR REPLACE FUNCTION get_dashboard_stats(p_days integer DEFAULT 7)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE result json;
BEGIN
  SELECT json_build_object(
    'total_sessions', (SELECT COUNT(*) FROM analytics_sessions WHERE created_at >= NOW() - (p_days || ' days')::interval),
    'total_pageviews', (SELECT COUNT(*) FROM analytics_events WHERE created_at >= NOW() - (p_days || ' days')::interval AND event_type IN ('pageview', 'section_view')),
    'active_users_24h', (SELECT COUNT(DISTINCT visitor_id) FROM analytics_sessions WHERE last_active >= NOW() - interval '24 hours'),
    'avg_duration_seconds', (SELECT COALESCE(AVG(EXTRACT(EPOCH FROM (COALESCE(last_active, created_at) - created_at))), 0) FROM analytics_sessions WHERE created_at >= NOW() - (p_days || ' days')::interval),
    'bounce_rate', (
      SELECT COALESCE(ROUND((COUNT(*) FILTER (WHERE event_count <= 1)::numeric / NULLIF(COUNT(*)::numeric, 0)) * 100, 1), 0)
      FROM (SELECT s.id, COUNT(e.id) AS event_count FROM analytics_sessions s LEFT JOIN analytics_events e ON e.session_id = s.id WHERE s.created_at >= NOW() - (p_days || ' days')::interval GROUP BY s.id) sub
    ),
    'top_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (SELECT COALESCE(event_data->>'section', event_data->>'path', '/') AS page_url, COUNT(*) AS views
      FROM analytics_events WHERE created_at >= NOW() - (p_days || ' days')::interval
      GROUP BY page_url ORDER BY views DESC LIMIT 10) t
    )
  ) INTO result;
  RETURN result;
END; $$;

-- 9. Override get_geo_stats (returns JSON array)
CREATE OR REPLACE FUNCTION get_geo_stats(p_days integer DEFAULT 7)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE result json;
BEGIN
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (SELECT COALESCE(country, 'Unknown') AS country, COUNT(*) AS count
    FROM analytics_sessions WHERE created_at >= NOW() - (p_days || ' days')::interval
    GROUP BY country ORDER BY count DESC LIMIT 10) t;
  RETURN result;
END; $$;

-- 10. Override get_sessions_by_date (returns date + count)
CREATE OR REPLACE FUNCTION get_sessions_by_date(p_days integer DEFAULT 7)
RETURNS TABLE(date date, count bigint)
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT created_at::date AS date, COUNT(*) AS count
  FROM analytics_sessions
  WHERE created_at >= NOW() - (p_days || ' days')::interval
  GROUP BY date ORDER BY date;
$$;
