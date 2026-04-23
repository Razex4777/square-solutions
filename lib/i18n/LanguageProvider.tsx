"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { en } from "./en";
import { ar } from "./ar";

type Translations = typeof en;
type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: en,
  toggleLocale: () => {},
  isRTL: false,
});

const translations: Record<Locale, Translations> = { en, ar };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  // Persist locale preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sq-locale") as Locale | null;
      if (saved && (saved === "en" || saved === "ar")) {
        setLocale(saved);
      }
    } catch {
      // localStorage unavailable (SSR, private browsing, etc.)
    }
  }, []);

  // Update <html> dir and lang attributes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", locale);
    try {
      localStorage.setItem("sq-locale", locale);
    } catch {
      // localStorage unavailable
    }
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: translations[locale],
        toggleLocale,
        isRTL: locale === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
