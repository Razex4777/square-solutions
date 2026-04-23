"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function AboutHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center w-full mb-16">
      <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-8 text-[var(--color-accent)] text-sm">
        {t.about.badge}
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-[var(--color-text-primary)] block sm:inline">{t.about.headingLine1}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          {t.about.headingLine2}
        </span>
      </h2>

      <p className="text-[var(--color-text-secondary)] max-w-[900px] text-lg lg:text-xl leading-relaxed">
        {t.about.description}
      </p>
    </div>
  );
}
