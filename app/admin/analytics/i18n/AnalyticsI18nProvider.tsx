"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  analyticsTranslations,
  type AnalyticsLocale,
  type AnalyticsTranslations,
} from "./translations";

interface AnalyticsI18nContextType {
  locale: AnalyticsLocale;
  t: AnalyticsTranslations;
  toggleLocale: () => void;
}

const AnalyticsI18nContext = createContext<AnalyticsI18nContextType>({
  locale: "en",
  t: analyticsTranslations.en,
  toggleLocale: () => {},
});

export function AnalyticsI18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<AnalyticsLocale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = analyticsTranslations[locale];

  return (
    <AnalyticsI18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </AnalyticsI18nContext.Provider>
  );
}

export function useAnalyticsI18n() {
  return useContext(AnalyticsI18nContext);
}
