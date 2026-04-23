import Image from "next/image";

export function FaqImage() {
  return (
    <div className="relative w-full h-[600px] lg:h-full min-h-[500px] rounded-[2rem] overflow-hidden bg-[#0A0D14] flex items-center justify-center shadow-2xl">
      
      {/* Base Image */}
      <Image
        src="/images/faq-bg.webp"
        alt="FAQ Mountain Context"
        fill
        className="object-cover object-center"
      />

      {/* Elegant Frosted Glass Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-[#0a1524]/40 backdrop-blur-xl border border-white/5 z-20 flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <span className="text-[#a8c1d9] text-5xl font-serif tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90">
          FAQ
        </span>
      </div>
    </div>
  );
}
