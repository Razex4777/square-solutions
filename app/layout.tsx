import type {Metadata} from 'next';
import { Outfit } from 'next/font/google';
import './globals.css'; // Global styles
import { SmoothScroll } from '@/components/SmoothScroll';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Square Solutions',
  description: 'Digital Transformation Partner',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans bg-[#0A0D14] text-slate-200 antialiased" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
