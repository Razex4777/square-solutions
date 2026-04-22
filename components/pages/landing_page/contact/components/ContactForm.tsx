import { ChevronDown } from 'lucide-react';

export function ContactForm() {
  return (
    <form className="relative w-full rounded-2xl p-8 lg:p-12 flex flex-col bg-[#0c121e] border border-white/[0.08] overflow-hidden">
      {/* Inner background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(45,197,244,0.06),transparent_60%)] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(18,227,153,0.04),transparent_60%)] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Grid Inputs */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
        
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium px-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter Your Full Name" 
            className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-4 py-3.5 text-slate-200 placeholder-[#4e627d] focus:outline-none focus:border-[#2dc5f4] transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium px-1">Phone Number</label>
          <input 
            type="text" 
            placeholder="Enter Your Phone Number" 
            className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-4 py-3.5 text-slate-200 placeholder-[#4e627d] focus:outline-none focus:border-[#2dc5f4] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium px-1">Email</label>
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-4 py-3.5 text-slate-200 placeholder-[#4e627d] focus:outline-none focus:border-[#2dc5f4] transition-colors"
          />
        </div>

        {/* Service Needed (Select) */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium px-1">Service Needed</label>
          <div className="relative">
            <select 
              defaultValue=""
              className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-4 py-3.5 text-[#4e627d] appearance-none focus:outline-none focus:border-[#2dc5f4] transition-colors"
            >
              <option value="" disabled>Select Your Service Needed</option>
              <option value="software">Software Applications</option>
              <option value="consulting">Consulting Services</option>
              <option value="managed-it">IT Managed Services</option>
              <option value="infra">Digital Infrastructure</option>
              <option value="marketing">Digital Marketing</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4e627d] pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Message Textarea */}
      <div className="relative z-10 flex flex-col gap-2 w-full mb-8">
        <label className="text-white font-medium px-1">Message</label>
        <div>
          <textarea 
            placeholder="Your Message..." 
            rows={5}
            className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-4 py-3.5 text-slate-200 placeholder-[#4e627d] focus:outline-none focus:border-[#2dc5f4] transition-colors resize-none"
          />
          <div className="text-right mt-1 w-full text-[#9ba8b8] text-[13px]">
            Max 250 Chars
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="button"
        className="relative z-10 self-start px-8 py-3.5 bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-md text-white font-medium hover:brightness-110 transition-all shadow-[0_0_20px_rgba(45,197,244,0.3)]"
      >
        Book Your Free Consultation
      </button>

    </form>
  );
}
