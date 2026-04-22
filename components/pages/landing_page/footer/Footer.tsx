import { Facebook, Linkedin } from "lucide-react";
import { NavLogo } from "@/components/pages/landing_page/navbar/components/NavLogo";

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0D14] border-t border-white/[0.08] flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 pt-20 pb-8 relative z-10">
       <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Socials */}
          <div className="flex flex-col">
             <div className="mb-6 -ml-2">
                <NavLogo />
             </div>
             
             <p className="text-[#9ba8b8] text-[15px] leading-relaxed mb-10 max-w-[360px]">
               At Square Solution, We Create Lasting Value For Businesses By Building And Elevating Their Brands Through Impactful Digital Solutions.
             </p>

             <div className="flex items-center gap-4">
               <span className="text-[#9ba8b8] text-sm pr-2">Follow Us On</span>
               <button className="w-10 h-10 rounded shadow-lg bg-gradient-to-br from-[#2dc5f4] to-[#12e399] flex items-center justify-center text-[#0A0D14] hover:brightness-110 transition-all">
                  <Facebook className="w-5 h-5 fill-current" />
               </button>
               <button className="w-10 h-10 rounded border border-[#1e3a5f] bg-[#0c121e] flex items-center justify-center text-[#2dc5f4] hover:bg-[#1e3a5f]/40 transition-all">
                  <Linkedin className="w-5 h-5 fill-current" />
               </button>
             </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
             <h4 className="text-white text-lg font-semibold mb-8">Company</h4>
             <ul className="flex flex-col gap-5">
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Home</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Our Story</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Contact Us</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">FAQ</a></li>
             </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col">
             <h4 className="text-white text-lg font-semibold mb-8">Services</h4>
             <ul className="flex flex-col gap-5">
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Software Solutions</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Consulting Services</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Digital Marketing</a></li>
               <li><a href="#" className="text-[#9ba8b8] text-[15px] hover:text-[#2dc5f4] transition-colors">Social Media Management</a></li>
             </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
             <h4 className="text-white text-[17px] font-semibold mb-8">Newsletter</h4>
             <form className="w-full relative">
                <input 
                  type="email" 
                  placeholder="Enter Your Email"
                  className="w-full bg-[#080d16] border border-[#1e2e42] rounded-lg px-5 py-3.5 text-[15px] text-slate-200 placeholder-[#4e627d] focus:outline-none focus:border-[#2dc5f4] transition-colors"
                />
             </form>
          </div>

       </div>

       {/* Bottom Bar */}
       <div className="w-full max-w-[1600px] mx-auto border-t border-white/[0.08] pt-8 flex items-center justify-center">
          <p className="text-[#4e627d] text-[13px]">
             @2026 Square Solution . All Rights Reserved.
          </p>
       </div>
    </footer>
  );
}
