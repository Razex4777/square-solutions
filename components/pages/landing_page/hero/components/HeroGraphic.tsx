"use client";

import { motion } from "motion/react";

/* Type for a floating tag in the orbital rings */
interface OrbitTagProps {
  label: string;
  top: string;
  left: string;
  dotColor?: string;
}

function OrbitTag({ label, top, left, dotColor = "#12e399" }: OrbitTagProps) {
  return (
    <div
      className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1b2b3a]/60 bg-[#0f1923]/80 backdrop-blur-sm z-20"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
      />
      <span className="text-xs font-medium tracking-wide text-slate-300">
        {label}
      </span>
    </div>
  );
}

export function HeroGraphic() {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] mx-auto md:ml-auto">
      
      {/* Center glowing core */}
      <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#12e399]/20 to-[#2dc5f4] flex items-center justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2dc5f4] shadow-[0_0_80px_40px_rgba(45,197,244,0.4)]" />
      </div>

      {/* Concentric Circles and Orbit Lines */}
      {/* Outer Circle 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute w-[90%] h-[90%] border border-slate-800/60 rounded-full"
      >
        <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 bg-[#2dc5f4] rounded-full shadow-[0_0_8px_#2dc5f4]" />
        <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-[#12e399] rounded-full shadow-[0_0_8px_#12e399]" />
      </motion.div>

      {/* Inner Circle 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute w-[65%] h-[65%] border border-slate-700/50 rounded-full"
      >
        <div className="absolute top-[10%] right-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_white]" />
        <div className="absolute bottom-[10%] left-[25%] w-1 h-1 bg-[#2dc5f4] rounded-full shadow-[0_0_6px_#2dc5f4]" />
      </motion.div>

      {/* Innermost Circle 3 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[40%] h-[40%] border border-[#2dc5f4]/20 rounded-full"
      >
        <div className="absolute top-[50%] left-0 w-2 h-2 -ml-1 bg-[#12e399] rounded-full shadow-[0_0_12px_#12e399]" />
      </motion.div>

      {/* Floating Orbital Tags (Static wrappers so text isn't upside down) */}
      <OrbitTag label="Cyber Security" top="20%" left="75%" dotColor="#2dc5f4" />
      <OrbitTag label="Marketing" top="38%" left="15%" dotColor="#12e399" />
      <OrbitTag label="Software Dev" top="55%" left="85%" dotColor="#2dc5f4" />
      <OrbitTag label="Cloud Solutions" top="75%" left="30%" dotColor="#12e399" />
    </div>
  );
}
