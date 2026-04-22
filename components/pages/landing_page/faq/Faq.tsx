import { FaqContent } from "./components/FaqContent";
import { FaqImage } from "./components/FaqImage";

export function Faq() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#0A0D14] flex flex-col items-center w-full">
      {/* Background glow to spread some ambient cyan light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#2dc5f4]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 w-full items-stretch">
          
          {/* Left Side: Photography/Graphic Element */}
          <div className="w-full h-full order-2 lg:order-1">
            <FaqImage />
          </div>

          {/* Right Side: Questions Accordion */}
          <div className="w-full flex flex-col justify-center order-1 lg:order-2 py-8">
            <FaqContent />
          </div>

        </div>
      </div>
    </section>
  );
}
