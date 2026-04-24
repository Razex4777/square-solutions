"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
  return (
    <div
      className={`flex flex-col border rounded-xl overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-[var(--color-accent)]/30 bg-[var(--color-surface-elevated)]" : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-hover)]"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between w-full px-6 py-5 text-left rtl:text-right"
      >
        <span className="text-[var(--color-text-primary)] font-medium text-[15px]">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-accent)] shrink-0 ltr:ml-4 rtl:mr-4" />
        </motion.div>
      </button>

      {/* Answer content with Framer Motion */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <p className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed rtl:text-right">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({ onActiveChange }: { onActiveChange?: (index: number) => void }) {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const { t } = useLanguage();

  const handleClick = (idx: number) => {
    const newIndex = openIndex === idx ? -1 : idx;
    setOpenIndex(newIndex);
    onActiveChange?.(newIndex);
  };

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {faqs.map((faq, idx) => (
        <FaqItem
          key={idx}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === idx}
          onClick={() => handleClick(idx)}
        />
      ))}
    </div>
  );
}
