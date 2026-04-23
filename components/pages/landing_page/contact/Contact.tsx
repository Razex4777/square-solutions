"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ContactHeader } from './components/ContactHeader';
import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';

export function Contact() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".contact-header-anim > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-header-anim",
        start: "top 85%",
      }
    });

    // Info cards slide in from left
    gsap.from(".contact-info-anim", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%",
      }
    });

    // Form scales in
    gsap.from(".contact-form-anim", {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="contact-us" className="relative py-24 lg:py-32 bg-[var(--color-surface)] flex flex-col items-center w-full transition-colors duration-300">
      {/* Top Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,var(--color-glow),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <div className="contact-header-anim w-full">
          <ContactHeader />
        </div>

        {/* Layout Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 w-full mt-4">
          <div className="contact-info-anim">
            <ContactInfo />
          </div>
          <div className="contact-form-anim">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
