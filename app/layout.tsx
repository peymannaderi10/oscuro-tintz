import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/Footer';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { LegacyScripts } from '@/components/LegacyScripts';
import { Nav } from '@/components/Nav';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/siteMeta';
import './globals.css';

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
    url: SITE_URL,
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
    icon: '/assets/oscuro-logo.png',
    apple: '/assets/oscuro-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/styles.css" />
        <link rel="stylesheet" href="/assets/cinematic-additions.css" />
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
