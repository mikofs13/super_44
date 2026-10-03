import type { Metadata } from 'next';
import '@fontsource/press-start-2p/latin-400.css';

import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-600.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Super 44 | Inside the garage',
  description: 'A first look inside Super 44, an independent developer portfolio taking shape.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

