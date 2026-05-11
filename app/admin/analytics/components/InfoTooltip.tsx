"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
}

/**
 * Hoverable info icon that shows a tooltip with the given text.
 * Positions itself above or below depending on viewport space.
 */
export function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [above, setAbove] = useState(true);

  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setAbove(rect.top > 160);
    }
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center ml-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Info className="w-3.5 h-3.5 text-[var(--color-text-muted)] cursor-help opacity-50 hover:opacity-100 transition-opacity" />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: above ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: above ? 4 : -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-[220px] sm:w-[260px] p-3 rounded-xl text-xs leading-relaxed
              bg-[var(--color-surface-card)] border border-[var(--color-border)]
              text-[var(--color-text-secondary)] shadow-xl shadow-black/20
              ${above ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : "top-full mt-2 left-1/2 -translate-x-1/2"}`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
