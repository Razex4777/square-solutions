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
        scrub: 2, // Smooth, slightly lagging scrub
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="our-services" className="relative py-24 lg:py-32 bg-[#0A0D14] flex flex-col items-center w-full">
      {/* Top Divider exactly like screenshot */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      {/* Background glow to simulate screenshot's subtle lighting */}
      <div className="services-glow absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#2dc5f4]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <ServicesHeader />
        <ServicesCards />
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </section>
  );
}
