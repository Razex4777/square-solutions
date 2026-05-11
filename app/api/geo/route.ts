import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side geo-location endpoint.
 * 
 * Strategy:
 * 1. Try to extract IP from reverse-proxy headers (Vercel, Cloudflare, etc.)
 * 2. If on localhost (no proxy headers), fetch public IP via ipify.org
 * 3. Geo-locate the IP via ip-api.com
 * 
 * This ensures accurate country detection even during local development.
 */
export async function GET(request: NextRequest) {
  try {
    // ── Step 1: Try proxy headers first (production) ──
    const vercelIp = request.headers.get('x-vercel-forwarded-for');
    const cfIp = request.headers.get('cf-connecting-ip');
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    let ip = vercelIp || cfIp || forwardedFor?.split(',')[0]?.trim() || realIp || '';

    // ── Step 2: Detect local/private IPs ──
    const isLocal = !ip || ip === '127.0.0.1' || ip === '::1' ||
      ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');

    if (isLocal) {
      // Fetch real public IP from ipify (works from localhost)
      try {
        const ipifyRes = await fetch('https://api.ipify.org?format=json', {
          signal: AbortSignal.timeout(3000),
        });
        if (ipifyRes.ok) {
          const ipData = await ipifyRes.json();
          ip = ipData.ip || '';
        }
      } catch {
        // ipify failed — fall back to Unknown
        return NextResponse.json({ country: 'Unknown', city: 'Unknown', ip: 'local' });
      }
    }

    // ── Step 3: Geo-locate the IP ──
    if (!ip) {
      return NextResponse.json({ country: 'Unknown', city: 'Unknown', ip: '' });
    }

    const geoResponse = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,regionName,isp`,
      { signal: AbortSignal.timeout(3000) }
    );

    if (geoResponse.ok) {
      const geo = await geoResponse.json();
      if (geo.status === 'success') {
        return NextResponse.json({
          country: geo.country || 'Unknown',
          countryCode: geo.countryCode || '',
          city: geo.city || 'Unknown',
          region: geo.regionName || '',
          isp: geo.isp || '',
          ip,
        });
      }
    }

    return NextResponse.json({ country: 'Unknown', city: 'Unknown', ip });
  } catch {
    return NextResponse.json({ country: 'Unknown', city: 'Unknown', ip: '' });
  }
}
