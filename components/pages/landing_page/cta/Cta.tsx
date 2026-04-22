"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Cta() {
  const container = useRef<HTMLElement>(null);

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
    <section ref={container} className="relative py-24 bg-[#0A0D14] flex flex-col items-center w-full px-6 sm:px-8 md:px-12 lg:px-20 z-10">
      <div className="w-full max-w-[1600px] mx-auto border border-[#2dc5f4]/30 rounded-[2rem] p-8 lg:p-20 xl:py-28 flex flex-col items-center relative overflow-hidden bg-[#0A0D14]/80">
         
         {/* Dropdown line & dot */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
           <div className="cta-line w-[1px] h-20 lg:h-32 bg-gradient-to-b from-transparent via-[#2dc5f4]/50 to-[#2dc5f4]" />
           <div className="cta-dot w-2 h-2 rounded-full bg-white shadow-[0_0_15px_4px_#2dc5f4]" />
         </div>

         {/* Inner subtle glow */}
         <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(45,197,244,0.05)_0%,transparent_60%)] pointer-events-none" />

         <div className="cta-content flex flex-col items-center w-full mt-20 lg:mt-24 z-10">
           <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[#1e3a5f] bg-[#0c182c]/50 mb-10 text-[#2dc5f4] text-sm">
              Get In Touch
           </div>

           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-center">
              <span className="text-white">Ready To Take Your Business </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
                To The Next Level?
              </span>
           </h2>

           <p className="text-[#9ba8b8] text-center max-w-[800px] text-[17px] lg:text-lg leading-relaxed mb-12">
              Start With A Free Consultation — We'll Understand Your Challenges And Map Out A Clear Plan, No Strings Attached.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <button type="button" className="px-8 py-3.5 bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-md text-white font-medium hover:brightness-110 transition-all shadow-[0_0_20px_rgba(45,197,244,0.2)]">
                Book Your Free Consultation
              </button>
              <button type="button" className="px-8 py-3.5 border border-[#1e3a5f] text-[#2dc5f4] rounded-md font-medium hover:bg-[#1e3a5f]/20 transition-all">
                Explore Our Services
              </button>
           </div>
         </div>
      </div>
    </section>
  );
}
