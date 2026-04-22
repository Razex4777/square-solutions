import { ContactHeader } from './components/ContactHeader';
import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';

export function Contact() {
  return (
    <section id="contact-us" className="relative py-24 lg:py-32 bg-[#0A0D14] flex flex-col items-center w-full">

      {/* Top Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(45,197,244,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        <ContactHeader />
        
        {/* Layout Grid: Left Info Column, Right Form Column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 w-full mt-4">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
