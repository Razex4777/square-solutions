"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Ensure the GSAP ticker is tied to lenis
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: false, // We'll manage the raf via GSAP ticker
      duration: 1.5, // nice slow gravity floatiness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease out
    });

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to prevent weird jumpiness integrating with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
