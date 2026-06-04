import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { LegacyScripts } from '@/components/LegacyScripts';
import { Nav } from '@/components/Nav';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/siteMeta';
import './styles.css';
import './cinematic-additions.css';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, Premium Window Tinting in Yuba City, CA`,
    template: `%s, ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'window tinting',
    'Yuba City',
    'Marysville',
    'Sutter County',
    'ceramic tint',
    'carbon tint',
    'Hitek film',
    'mobile tint service',
    'auto tint',
    'car window tint',
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME}, Premium Window Tinting in Yuba City, CA`,
    description: SITE_DESCRIPTION,
    // og:url is intentionally omitted — a layout-level static URL would mark every
    // page as the homepage. Crawlers fall back to each page's canonical.
    locale: 'en_US',
    images: [
      {
        url: '/assets/oscuro-logo.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME}, Premium Window Tinting in Yuba City, CA`,
    description: SITE_DESCRIPTION,
    images: ['/assets/oscuro-logo.png'],
  },
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <LegacyScripts />
      </body>
    </html>
  );
}
