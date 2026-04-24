"use client";

import { Facebook, Linkedin } from "lucide-react";
import { NavLogo } from "@/components/pages/landing_page/navbar/components/NavLogo";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 pt-20 pb-8 relative z-10 transition-colors duration-300 overflow-hidden">
       {/* Atmospheric blue glow — left to right sweep */}
       <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2dc5f4]/40 to-transparent" />
       <div className="absolute -top-[100px] left-0 w-[60%] h-[350px] bg-[radial-gradient(ellipse_at_top_left,rgba(45,197,244,0.12),transparent_60%)] pointer-events-none" />
       <div className="absolute -top-[50px] left-[20%] w-[80%] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(45,197,244,0.08),transparent_55%)] pointer-events-none" />
       <div className="absolute top-0 right-0 w-[50%] h-[250px] bg-[radial-gradient(ellipse_at_top_right,rgba(45,197,244,0.10),transparent_60%)] pointer-events-none" />

       <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 lg:gap-8 mb-20 relative z-10">

          {/* Brand & Socials */}
          <div className="flex flex-col">
             <div className={`mb-6 ${isRTL ? '-mr-2' : '-ml-2'}`}>
                <NavLogo />
             </div>

             <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-10 max-w-[360px]">
               {t.footer.description}
             </p>

             <div className="flex items-center gap-4">
               <span className={`text-[var(--color-text-secondary)] text-sm ${isRTL ? 'pl-2' : 'pr-2'}`}>{t.footer.followUs}</span>
               <motion.button
                 whileHover={{ scale: 1.1, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-10 h-10 rounded-lg shadow-lg bg-gradient-to-br from-[#2dc5f4] to-[#12e399] flex items-center justify-center text-black hover:brightness-110 transition-all"
               >
                  <Facebook className="w-5 h-5 fill-current" />
               </motion.button>
               <motion.button
                 whileHover={{ scale: 1.1, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all"
               >
                  <Linkedin className="w-5 h-5 fill-current" />
               </motion.button>
             </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
             <h4 className="text-[var(--color-text-primary)] text-lg font-semibold mb-8">{t.footer.company}</h4>
             <ul className="flex flex-col gap-5">
               {t.footer.companyLinks.map((link, idx) => {
                 const anchors = ['home', 'about-us', 'contact-us', 'faq'];
                 return (
                  <li key={link}>
                    <a
                      href={`#${anchors[idx]}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(anchors[idx])?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[var(--color-text-secondary)] text-[15px] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                 );
               })}
             </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col">
             <h4 className="text-[var(--color-text-primary)] text-lg font-semibold mb-8">{t.footer.servicesTitle}</h4>
             <ul className="flex flex-col gap-5">
               {t.footer.serviceLinks.map((link) => (
                 <li key={link}>
                   <a href="#" className="text-[var(--color-text-secondary)] text-[15px] hover:text-[var(--color-accent)] transition-colors">
                     {link}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
             <h4 className="text-[var(--color-text-primary)] text-[17px] font-semibold mb-8">{t.footer.newsletter}</h4>
             <form className="w-full relative">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-5 py-3.5 text-[15px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
             </form>
          </div>

       </div>

       {/* Bottom Bar */}
       <div className="w-full max-w-[1600px] mx-auto border-t border-[var(--color-border)] pt-8 flex items-center justify-center">
          <p className="text-[var(--color-text-muted)] text-[13px]">
             {t.footer.copyright}
          </p>
       </div>
    </footer>
  );
}
