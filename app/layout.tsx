import type {Metadata} from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Square Solutions | Innovative Digital Transformation',
  description: 'Square Solutions is your premier partner for end-to-end digital transformation. We deliver cutting-edge software development, enterprise-grade architectures, cloud infrastructure, and data-driven marketing campaigns to scale your business into the future.',
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} overflow-x-hidden`} suppressHydrationWarning>
      <body className="font-sans bg-[var(--color-surface)] text-[var(--color-text-primary)] antialiased transition-colors duration-300 overflow-x-hidden w-full relative" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
