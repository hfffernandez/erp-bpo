import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BPO-Core Chile | Braddan BPO',
  description: 'Plataforma ERP/SaaS de gestión contable y financiera BPO para estudios contables en Chile. Circuito cerrado SII-ERP en tiempo real.',
  keywords: ['BPO contable', 'ERP Chile', 'SII', 'facturación electrónica', 'DTE', 'contabilidad automatizada'],
  authors: [{ name: 'Braddan BPO' }],
  openGraph: {
    title: 'BPO-Core Chile | Braddan BPO',
    description: 'Plataforma ERP/SaaS de gestión contable BPO para estudios contables en Chile.',
    images: [
      {
        url: 'https://framerusercontent.com/images/GcLZ3ZapET4DSa78K5cVz8Tn9s.png',
        width: 1200,
        height: 630,
        alt: 'Braddan BPO — BPO-Core Chile',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  icons: {
    icon: 'https://framerusercontent.com/images/sP2IvcBCR7efj4T94P3HEVwb1VY.png',
    apple: 'https://framerusercontent.com/images/sP2IvcBCR7efj4T94P3HEVwb1VY.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://framerusercontent.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
