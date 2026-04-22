export function AboutHeader() {
  return (
    <div className="flex flex-col items-center text-center w-full mb-16">
      <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-slate-700/50 bg-[#0A0D14] mb-8 text-[#2dc5f4] text-sm">
        Our Story
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-white block sm:inline">From A Local Idea To A </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dc5f4] to-[#12e399]">
          Regional Tech Partner
        </span>
      </h2>

      <p className="text-slate-400 max-w-[900px] text-lg lg:text-xl leading-relaxed">
        For More Than Two Years, We Have Been Building Systems, Managing Infrastructure, And Launching Digital Marketing Campaigns For Businesses Of All Sizes.
      </p>
    </div>
  );
}
