import Image from "next/image";

export function FaqImage() {
  return (
    <div className="relative w-full h-[600px] lg:h-full min-h-[500px] rounded-[2rem] overflow-hidden bg-[#112435] flex items-center justify-center">
      
      {/* Overlay Filters to match the screenshot's dark moody blue look */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent z-10 opacity-60" />
      <div className="absolute inset-0 bg-[#081320] mix-blend-color z-10" />
      <div className="absolute inset-0 bg-[#14324f] opacity-40 mix-blend-multiply z-10" />
      
      {/* Base Image */}
      <Image
        src="https://picsum.photos/seed/faq-business/800/1000"
        alt="FAQ Context"
        fill
        className="object-cover object-center scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Mock Graphic if image doesn't match perfectly, giving it the FAQ chip look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/10 backdrop-blur-md border border-white/20 z-20 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <span className="text-[#89a1ba] text-5xl font-serif font-semibold tracking-wider drop-shadow-lg opacity-80">
          FAQ
        </span>
      </div>
    </div>
  );
}
