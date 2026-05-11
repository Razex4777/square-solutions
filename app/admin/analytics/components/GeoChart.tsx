"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";
import { useAnalyticsI18n } from "../i18n/AnalyticsI18nProvider";
import type { GeoEntry } from "./DashboardShell";

interface GeoChartProps {
  data: GeoEntry[];
  isInitialLoad: boolean;
}

/**
 * Country name → ISO 3166-1 alpha-2 code mapping for flag emoji generation.
 */
const COUNTRY_CODES: Record<string, string> = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Argentina": "AR",
  "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ",
  "Bahrain": "BH", "Bangladesh": "BD", "Belarus": "BY", "Belgium": "BE",
  "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Brazil": "BR", "Bulgaria": "BG",
  "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Chile": "CL",
  "China": "CN", "Colombia": "CO", "Costa Rica": "CR", "Croatia": "HR",
  "Cuba": "CU", "Cyprus": "CY", "Czech Republic": "CZ", "Czechia": "CZ",
  "Denmark": "DK", "Dominican Republic": "DO", "Ecuador": "EC", "Egypt": "EG",
  "El Salvador": "SV", "Estonia": "EE", "Ethiopia": "ET", "Finland": "FI",
  "France": "FR", "Georgia": "GE", "Germany": "DE", "Ghana": "GH",
  "Greece": "GR", "Guatemala": "GT", "Honduras": "HN", "Hong Kong": "HK",
  "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID",
  "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Israel": "IL",
  "Italy": "IT", "Jamaica": "JM", "Japan": "JP", "Jordan": "JO",
  "Kazakhstan": "KZ", "Kenya": "KE", "Kosovo": "XK", "Kuwait": "KW",
  "Latvia": "LV", "Lebanon": "LB", "Libya": "LY", "Lithuania": "LT",
  "Luxembourg": "LU", "Malaysia": "MY", "Malta": "MT", "Mexico": "MX",
  "Moldova": "MD", "Mongolia": "MN", "Montenegro": "ME", "Morocco": "MA",
  "Myanmar": "MM", "Nepal": "NP", "Netherlands": "NL", "New Zealand": "NZ",
  "Nicaragua": "NI", "Nigeria": "NG", "North Macedonia": "MK", "Norway": "NO",
  "Oman": "OM", "Pakistan": "PK", "Palestine": "PS", "Panama": "PA",
  "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Poland": "PL",
  "Portugal": "PT", "Qatar": "QA", "Romania": "RO", "Russia": "RU",
  "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Singapore": "SG",
  "Slovakia": "SK", "Slovenia": "SI", "Somalia": "SO", "South Africa": "ZA",
  "South Korea": "KR", "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD",
  "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Taiwan": "TW",
  "Tanzania": "TZ", "Thailand": "TH", "Tunisia": "TN", "Turkey": "TR",
  "Turkiye": "TR", "UAE": "AE", "Uganda": "UG", "Ukraine": "UA",
  "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US",
  "Uruguay": "UY", "Uzbekistan": "UZ", "Venezuela": "VE", "Vietnam": "VN",
  "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW",
  "Unknown": "UN",
};

/** Get ISO alpha-2 code for a country name */
function getCountryCode(countryName: string): string | null {
  const code = COUNTRY_CODES[countryName];
  if (code && code !== "UN") return code;
  // Fallback: partial name match
  const key = Object.keys(COUNTRY_CODES).find(
    (k) => k.toLowerCase().includes(countryName.toLowerCase()) ||
           countryName.toLowerCase().includes(k.toLowerCase())
  );
  return key ? COUNTRY_CODES[key] : null;
}

/** Renders a country flag image via flagcdn.com (works on all platforms including Windows) */
function CountryFlag({ country, size = 32 }: { country: string; size?: number }) {
  const code = getCountryCode(country);
  if (!code || code === "UN") {
    return <span className="text-xl leading-none">🌍</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      alt={country}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-sm object-cover"
      loading="lazy"
    />
  );
}

export function GeoChart({ data, isInitialLoad }: GeoChartProps) {
  const { t } = useAnalyticsI18n();
  const maxCount = data.length > 0 ? Math.max(...data.map((d) => d.count)) : 1;
  const total = data.reduce((sum, d) => sum + d.count, 0) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[var(--color-text-muted)]" />
          <h3 className="text-lg font-medium">{t.charts.topLocations.label}</h3>
          <InfoTooltip text={t.charts.topLocations.tooltip} />
        </div>
        {data.length > 0 && (
          <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded-md">
            {data.length} countries
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
        {isInitialLoad ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 px-3 py-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-border)]/40" />
              <div className="flex-1 h-3 bg-[var(--color-border)]/40 rounded" />
              <div className="w-8 h-3 bg-[var(--color-border)]/40 rounded" />
            </div>
          ))
        ) : data.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {data.map((entry, idx) => {
              const percentage = ((entry.count / total) * 100).toFixed(1);
              const barWidth = (entry.count / maxCount) * 100;

              return (
                <motion.div
                  key={entry.country}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-accent)]/5 transition-colors cursor-default"
                >
                  {/* Rank */}
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] w-4 text-right">
                    {idx + 1}
                  </span>

                  {/* Flag */}
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                    <CountryFlag country={entry.country} />
                  </div>

                  {/* Country + Bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {entry.country}
                      </span>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {percentage}%
                        </span>
                        <motion.span
                          className="text-sm font-bold text-[var(--color-accent)] tabular-nums"
                          key={entry.count}
                          initial={{ scale: 1.3, color: "var(--color-accent-green)" }}
                          animate={{ scale: 1, color: "var(--color-accent)" }}
                          transition={{ duration: 0.5 }}
                        >
                          {entry.count}
                        </motion.span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-[var(--color-border)]/30 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: "var(--color-accent)" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="text-4xl">🌍</div>
            <p className="text-sm text-[var(--color-text-muted)]">No location data yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
