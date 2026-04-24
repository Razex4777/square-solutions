"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HeroContent } from './components/HeroContent';
import { HeroGraphic } from './components/HeroGraphic';

export function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // "Gravity animation" graphic drop-in
    gsap.from(".hero-graphic-anim", {
      y: -150,
      scale: 0.9,
      opacity: 0,
      rotation: 5,
      duration: 2.5,
      ease: "elastic.out(1, 0.5)",
      delay: 0.6
    });

    // Subtle parallax on the background glow while scrolling
    gsap.to(".hero-bg-glow", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: container });

  return (
    <section id="home" ref={container} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center bg-[var(--color-surface)] transition-colors duration-300">
      {/* Background radial gradient subtle effect */}
      <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle dot grid pattern */}
      <div className="hero-dot-grid absolute inset-0 pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center min-h-[60vh]">
          <div className="hero-content-anim">
            <HeroContent />
          </div>
          <div className="hero-graphic-anim perspective-[1000px]">
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
