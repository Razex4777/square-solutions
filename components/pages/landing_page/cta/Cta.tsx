"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function Cta() {
  const container = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    // Drop line
    tl.from(".cta-line", {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.8,
      ease: "power3.inOut"
    })
    // Bounce dot with gravity
    .from(".cta-dot", {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "bounce.out"
    }, "-=0.2")
    // Fade in text
    .from(".cta-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    }, "-=1.2");

  }, { scope: container });

  return (
    <section ref={container} id="cta" className="relative py-24 bg-[var(--color-surface)] flex flex-col items-center w-full px-6 sm:px-8 md:px-12 lg:px-20 z-10 transition-colors duration-300">
      <div className="w-full max-w-[1600px] mx-auto border border-[var(--color-accent)]/30 rounded-[2rem] p-8 lg:p-20 xl:py-28 flex flex-col items-center relative overflow-hidden bg-[var(--color-surface-elevated)]/80">

         {/* Dropdown line & dot */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
           <div className="cta-line w-[1px] h-20 lg:h-32 bg-gradient-to-b from-transparent via-[var(--color-accent)]/50 to-[var(--color-accent)]" />
           <div className="cta-dot w-2 h-2 rounded-full bg-[var(--color-text-primary)] shadow-[0_0_15px_4px_var(--color-accent)]" />
         </div>

         {/* Inner atmospheric glows */}
         <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(45,197,244,0.12),transparent_55%)] pointer-events-none" />
         <div className="absolute bottom-0 inset-x-0 h-[60%] bg-[radial-gradient(ellipse_at_bottom,rgba(45,197,244,0.06),transparent_60%)] pointer-events-none" />
         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[radial-gradient(circle,rgba(45,197,244,0.05),transparent_60%)] pointer-events-none blur-[40px]" />

         <div className="cta-content flex flex-col items-center w-full mt-20 lg:mt-24 z-10">
           <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] mb-10 text-[var(--color-accent)] text-sm">
              {t.cta.badge}
           </div>

           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-center">
              <span className="text-[var(--color-text-primary)]">{t.cta.headingLine1}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
                {t.cta.headingLine2}
              </span>
           </h2>

           <p className="text-[var(--color-text-secondary)] text-center max-w-[800px] text-[17px] lg:text-lg leading-relaxed mb-12">
              {t.cta.description}
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <motion.button
                type="button"
                onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(45, 197, 244, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-8 py-3.5 bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-lg text-black font-medium hover:brightness-110 transition-all"
              >
                {t.cta.ctaPrimary}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-8 py-3.5 border border-[var(--color-border)] text-[var(--color-accent)] rounded-lg font-medium hover:bg-[var(--color-accent)]/5 transition-all"
              >
                {t.cta.ctaSecondary}
              </motion.button>
           </div>
         </div>
      </div>
    </section>
  );
}
