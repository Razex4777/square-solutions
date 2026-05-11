import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: stats } = await supabase.rpc('get_dashboard_stats', { p_days: 7 });
  console.log('STATS:', JSON.stringify(stats, null, 2));

  const { data: sessions } = await supabase.rpc('get_sessions_by_date', { p_days: 7 });
  console.log('SESSIONS:', JSON.stringify(sessions, null, 2));

  const { data: geo } = await supabase.rpc('get_geo_stats', { p_days: 7 });
  console.log('GEO:', JSON.stringify(geo, null, 2));
}

test();
