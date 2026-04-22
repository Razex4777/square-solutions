import { Navbar } from '@/components/pages/landing_page/navbar/Navbar';
import { Hero } from '@/components/pages/landing_page/hero/Hero';
import { About } from '@/components/pages/landing_page/about/About';
import { Services } from '@/components/pages/landing_page/services/Services';
import { Faq } from '@/components/pages/landing_page/faq/Faq';
import { Contact } from '@/components/pages/landing_page/contact/Contact';
import { Cta } from '@/components/pages/landing_page/cta/Cta';
import { Footer } from '@/components/pages/landing_page/footer/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0D14] flex flex-col font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
