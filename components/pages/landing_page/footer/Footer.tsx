"use client";

import { useState } from "react";
import { Facebook, Linkedin, Loader2, CheckCircle2 } from "lucide-react";
import { NavLogo } from "@/components/pages/landing_page/navbar/components/NavLogo";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type NewsletterStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Footer() {
  const { t, isRTL } = useLanguage();

  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle');

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? 'Failed to subscribe.');
      }

      setNewsletterStatus('success');
      setNewsletterEmail('');

      // Reset after 5 seconds
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch {
      setNewsletterStatus('error');
      // Reset after 4 seconds
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    }
  }

  const isNewsletterDisabled = newsletterStatus === 'submitting' || newsletterStatus === 'success';

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
               <motion.a
                 href={facebookUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ scale: 1.1, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_15px_rgba(45,197,244,0.15)] transition-all duration-300"
               >
                  <Facebook className="w-5 h-5 fill-current" />
               </motion.a>
               <motion.a
                 href={linkedinUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ scale: 1.1, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_15px_rgba(45,197,244,0.15)] transition-all duration-300"
               >
                  <Linkedin className="w-5 h-5 fill-current" />
               </motion.a>
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

          {/* Newsletter — Sends subscription to Square Solutions email */}
          <div className="flex flex-col">
             <h4 className="text-[var(--color-text-primary)] text-[17px] font-semibold mb-8">{t.footer.newsletter}</h4>
             <form className="w-full flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
                <div className="w-full flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t.footer.emailPlaceholder}
                    disabled={isNewsletterDisabled}
                    required
                    className="flex-1 min-w-0 bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-5 py-3.5 text-[15px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isNewsletterDisabled}
                    className="shrink-0 px-5 py-3.5 bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-lg text-[#08121e] font-semibold text-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(45,197,244,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {newsletterStatus === 'submitting' && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {newsletterStatus === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : null}
                    {newsletterStatus === 'submitting' 
                      ? t.footer.subscribing
                      : t.footer.subscribe
                    }
                  </button>
                </div>

                {/* Feedback messages */}
                {newsletterStatus === 'success' && (
                  <p className="text-[#12e399] text-sm font-medium">{t.footer.subscribeSuccess}</p>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-red-400 text-sm font-medium">{t.footer.subscribeError}</p>
                )}
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
