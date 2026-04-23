"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AboutHeader } from './components/AboutHeader';
import { AboutCards } from './components/AboutCards';

export function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Parallax background glows
    gsap.to(".about-glow-1", {
      y: 150,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(".about-glow-2", {
      y: -100,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Header reveal
    gsap.from(".about-header-anim > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-header-anim",
        start: "top 85%",
      }
    });

    // Cards staggered batch reveal
    gsap.from(".about-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-cards-grid",
        start: "top 80%",
      }
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      id="about-us"
      className="relative py-24 lg:py-32 flex flex-col items-center w-full bg-[var(--color-surface)] transition-colors duration-300"
    >
      {/* Top Divider with gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      {/* Background glow to simulate subtle lighting */}
      <div className="about-glow-1 absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-glow)] rounded-full blur-[120px] pointer-events-none" />
      <div className="about-glow-2 absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--color-glow)] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <div className="about-header-anim w-full">
          <AboutHeader />
        </div>
        <div className="about-cards-grid w-full">
          <AboutCards />
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/10 to-transparent" />
    </section>
  );
}
