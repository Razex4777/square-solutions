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
  }, { scope: container });

  return (
    <section ref={container} id="about-us" className="relative py-24 lg:py-32 bg-[#0A0D14] flex flex-col items-center w-full">
      {/* Top Divider with gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background glow to simulate screenshot's subtle lighting */}
      <div className="about-glow-1 absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#12e399]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="about-glow-2 absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#2dc5f4]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <AboutHeader />
        <AboutCards />
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </section>
  );
}
