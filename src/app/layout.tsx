import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import '@fontsource/press-start-2p/latin-400.css';

import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-600.css';
import './globals.css';

export const metadata: Metadata = {
  title: `${profile.name || 'Super 44'} | Portfolio`,
  description: 'Academic achievements, student leadership and engineering projects.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

