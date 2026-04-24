"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while preloading
    document.body.style.overflow = "hidden";
    
    // Simulate loading time (e.g., waiting for assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restore scroll after the exit animation completes
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000); // 1s to match the exit transition duration
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0A0D14] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#12e399]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-[320px] sm:w-[420px] h-[140px] sm:h-[180px] z-10"
          >
            <Image
              src="/logo.png"
              alt="Square Solutions"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Glowing Loading Bar */}
          <div className="mt-12 w-[200px] h-[2px] bg-[#1b2b3a] rounded-full overflow-hidden relative z-10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dc5f4] to-transparent w-full"
            />
          </div>

          {/* Loading Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#2dc5f4] to-[#12e399] text-xs sm:text-sm tracking-[0.3em] uppercase font-medium z-10"
          >
            Loading Experience
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
