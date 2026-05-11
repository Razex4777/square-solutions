"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* Type for a floating tag in the orbital rings */
interface OrbitTagProps {
  label: string;
  dotColor?: string;
}

function OrbitTag({ label, dotColor = "#12e399" }: OrbitTagProps) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 backdrop-blur-md shadow-lg z-20 whitespace-nowrap"
    >
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
        style={{ backgroundColor: dotColor, boxShadow: `0 0 10px ${dotColor}` }}
      />
      <span className="text-xs sm:text-sm font-medium tracking-wide text-[var(--color-text-primary)]">
        {label}
      </span>
    </div>
  );
}

export function HeroGraphic() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full aspect-square flex items-center justify-center max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] mx-auto md:ml-auto">
      
      {/* Center glowing core with pulse animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#12e399]/20 to-[#2dc5f4]/30 flex items-center justify-center backdrop-blur-md border border-white/5"
      >
        <motion.div 
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2dc5f4] shadow-[0_0_80px_40px_rgba(45,197,244,0.4)]" 
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#12e399]/40"
        />
      </motion.div>

      {/* Orbit 1: Outer Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[var(--color-border)] rounded-full" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]"
      >
        {/* Planet 1 */}
        <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-2 h-2 bg-[#2dc5f4] rounded-full shadow-[0_0_12px_#2dc5f4]" />
        </div>
        
        {/* Tag: Software Dev */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            <OrbitTag label={t.hero.orbitSoftware} dotColor="#2dc5f4" />
          </motion.div>
        </div>

        {/* Tag: Cloud Solutions */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            <OrbitTag label={t.hero.orbitCloud} dotColor="#12e399" />
          </motion.div>
        </div>
      </motion.div>

      {/* Orbit 2: Middle Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border border-[var(--color-border)] rounded-full" />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%]"
      >
        {/* Planets */}
        <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
        <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#2dc5f4] rounded-full shadow-[0_0_10px_#2dc5f4]" />

        {/* Tag: AI Solutions — CLIENT REQUESTED */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}>
            <OrbitTag label={t.hero.orbitAI} dotColor="#a78bfa" />
          </motion.div>
        </div>
      </motion.div>

      {/* Orbit 3: Inner Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-[#2dc5f4]/20 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%]"
      >
        {/* Planet */}
        <div className="absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#12e399] rounded-full shadow-[0_0_15px_#12e399]" />
        
        {/* Tag: Marketing */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <OrbitTag label={t.hero.orbitMarketing} dotColor="#12e399" />
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
