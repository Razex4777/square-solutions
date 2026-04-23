"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ServicesHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center w-full mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
        <span className="text-[var(--color-text-primary)] block sm:inline">{t.services.headingLine1}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          {t.services.headingLine2}
        </span>
      </h2>

      <p className="text-[var(--color-text-secondary)] max-w-[900px] text-lg leading-relaxed">
        {t.services.description}
      </p>
    </div>
  );
}
