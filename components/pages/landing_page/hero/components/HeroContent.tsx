import { Sparkles } from 'lucide-react';

export function HeroContent() {
  return (
    <div className="flex flex-col items-start w-full max-w-3xl xl:max-w-4xl pt-10 lg:pt-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2dc5f4]/30 bg-[#2dc5f4]/10 mb-8 text-[#2dc5f4]">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs sm:text-sm font-medium">Your Digital Transformation Partner Since 2025</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.1] tracking-tight mb-6 w-full">
        <span className="text-white block">Engineering The Digital</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          Future Of Your Business
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl xl:max-w-3xl leading-relaxed">
        From Custom Software Solutions To Managed IT Infrastructure And Digital
        Marketing We Deliver A Complete Technology Ecosystem That Accelerates
        Growth And Gives You A Real Competitive Edge.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4 w-full">
        <button className="px-6 sm:px-8 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#2dc5f4] to-[#12e399] hover:opacity-90 transition-opacity rounded-md">
          Start Your Digital Journey
        </button>
        <button className="px-6 sm:px-8 py-3.5 text-sm font-semibold text-[#12e399] border hover:bg-[#12e399]/5 transition-colors border-[#184949] rounded-md">
          Explore Our Solutions
        </button>
      </div>
    </div>
  );
}
