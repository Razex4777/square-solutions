"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaqContent } from "./components/FaqContent";
import { FaqImage } from "./components/FaqImage";

export function Faq() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Parallax on the image
    gsap.to(".faq-image-parallax", {
      y: -40,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // FAQ content fade-in from right
    gsap.from(".faq-content-anim > *", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-content-anim",
        start: "top 80%",
      }
    });

    // Background glow
    gsap.to(".faq-glow", {
      y: 100,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="faq" className="relative py-24 lg:py-32 bg-[var(--color-surface)] flex flex-col items-center w-full transition-colors duration-300">
      {/* Background glow */}
      <div className="faq-glow absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-glow)] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 w-full items-stretch">

          {/* Left Side: Image with parallax */}
          <div className="w-full h-full order-2 lg:order-1 faq-image-parallax">
            <FaqImage />
          </div>

          {/* Right Side: Questions Accordion */}
          <div className="faq-content-anim w-full flex flex-col justify-center order-1 lg:order-2 py-8">
            <FaqContent />
          </div>
        </div>
      </div>
    </section>
  );
}
