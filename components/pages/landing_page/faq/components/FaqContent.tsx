"use client";

import { FaqAccordion } from "./FaqAccordion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FaqContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col items-start w-full mb-10">
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-6 text-[var(--color-accent)] text-sm">
          {t.faq.badge}
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 tracking-tight">
          <span className="text-[var(--color-text-primary)] block sm:inline">{t.faq.headingLine1}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
            {t.faq.headingLine2}
          </span>
        </h2>

        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl">
          {t.faq.description}{" "}
          <a href="mailto:Info@Sq-Solution.Com" className="text-[var(--color-accent)] hover:underline underline-offset-4 pointer-events-auto">
            Info@Sq-Solution.Com
          </a>
        </p>
      </div>

      {/* Accordion */}
      <FaqAccordion />
    </div>
  );
}
