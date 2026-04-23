"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ServicesHeader } from './components/ServicesHeader';
import { ServicesCards } from './components/ServicesCards';

export function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(".services-glow", {
      y: 100,
      scale: 1.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      }
    });

    // Header reveal
    gsap.from(".services-header-anim > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-header-anim",
        start: "top 85%",
      }
    });

    // Cards stagger
    gsap.from(".service-card", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-cards-grid",
        start: "top 80%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="our-services" className="relative py-24 lg:py-32 bg-[var(--color-surface)] flex flex-col items-center w-full transition-colors duration-300">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-divider)]" />

      {/* Background glow */}
      <div className="services-glow absolute top-1/4 left-0 w-[400px] h-[400px] bg-[var(--color-glow)] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <div className="services-header-anim w-full">
          <ServicesHeader />
        </div>
        <div className="services-cards-grid w-full">
          <ServicesCards />
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-divider)]" />
    </section>
  );
}
