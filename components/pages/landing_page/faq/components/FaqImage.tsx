"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_IMAGES = [
  "/images/faq-1.webp",
  "/images/faq-2.webp",
  "/images/faq-3.webp",
  "/images/faq-4.webp",
  "/images/faq-5.webp",
];

interface FaqImageProps {
  activeIndex: number;
}

export function FaqImage({ activeIndex }: FaqImageProps) {
  const currentImage = activeIndex >= 0 ? FAQ_IMAGES[activeIndex] : "/images/faq-default.webp";

  return (
    <div className="relative w-full h-[600px] lg:h-full min-h-[500px] rounded-[2rem] overflow-hidden bg-[var(--color-surface-card)] flex items-center justify-center shadow-2xl">

      {/* Crossfade between images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt="FAQ Illustration"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/60 via-transparent to-[var(--color-surface)]/20 z-10 pointer-events-none" />
    </div>
  );
}
