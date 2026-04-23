"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ContactHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center w-full mb-16">
      <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-8 text-[var(--color-accent)] text-sm">
        {t.contact.badge}
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-[var(--color-text-primary)] block sm:inline">{t.contact.headingLine1}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          {t.contact.headingLine2}
        </span>
      </h2>

      <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
        {t.contact.description}
      </p>
    </div>
  );
}
