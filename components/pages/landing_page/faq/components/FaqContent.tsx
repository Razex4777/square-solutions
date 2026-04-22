import { FaqAccordion } from "./FaqAccordion";

export function FaqContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col items-start w-full mb-10">
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[#1e3a5f] bg-[#0c182c]/50 mb-6 text-[#2dc5f4] text-sm">
          Frequently Asked Questions
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 tracking-tight">
          <span className="text-white block sm:inline">Everything You Need </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
            To Know
          </span>
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          Clear And Direct Answers To The Questions Our Clients Ask Before Starting Their Partnership With Us.{" "}
          <a href="mailto:Info@Sq-Solution.Com" className="text-[#2dc5f4] hover:underline underline-offset-4 pointer-events-auto">
            Info@Sq-Solution.Com
          </a>
        </p>
      </div>

      {/* Accordion */}
      <FaqAccordion />
    </div>
  );
}
