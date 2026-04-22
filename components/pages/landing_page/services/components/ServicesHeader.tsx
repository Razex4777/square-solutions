export function ServicesHeader() {
  return (
    <div className="flex flex-col items-center text-center w-full mb-16">
      <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-slate-700/50 bg-[#0A0D14] mb-8 text-[#2dc5f4] text-sm">
        What We Offer
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-white block sm:inline">End-To-End Solutions That </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          Move You Forward
        </span>
      </h2>

      <p className="text-slate-400 max-w-[900px] text-lg leading-relaxed">
        We Don't Believe In Off-The-Shelf Solutions. Every Service Is Custom-Tailored To Fit Your Business, Address Your Real Challenges, And Achieve Your Goals With Precision.
      </p>
    </div>
  );
}
