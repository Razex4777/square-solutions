export function ContactHeader() {
  return (
    <div className="flex flex-col items-center text-center w-full mb-16">
      <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[#1e3a5f] bg-[#0c182c]/50 mb-8 text-[#2dc5f4] text-sm">
        Get In Touch
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-white block sm:inline">Ready To Start Your </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          Digital Journey?
        </span>
      </h2>

      <p className="text-slate-400 max-w-[900px] text-lg leading-relaxed">
        Tell Us About Your Project Or The Challenge You're Facing. Our Consulting Team Will Reach Out Within 24 Hours To Schedule A Free Consultation And Create A Custom Action Plan.
      </p>
    </div>
  );
}
