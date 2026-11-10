/**
 * @license Miransas
 * @copyright
 * miransas product
 *
 * Copyright (c) Miransas.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

import { SmoothScroll } from '../components/provider/smooth-scroll';
import { SiteHeader } from '../components/layouts/header';
import { SiteFooter } from '../components/layouts/footer';
import NoticeModal from '../components/provider/site-modal';
import { GoogleAnalytics } from '../components/provider/google-analytics';
import { PageTransition } from '../components/provider/page-transition';
import { ThemeProvider } from '../components/provider/theme-provider';

// ── Fonts ─────────────────────────────────────────────────────────────────
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans-runtime',
  display: 'swap',
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono-runtime',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

// ── Site Constants ────────────────────────────────────────────────────────
const SITE_URL = 'https://miransas.com';
const SITE_NAME = 'Miransas';
const SITE_TITLE = 'Miransas — Secure • Connect • Evolve';
const SITE_DESCRIPTION = 'Miransas is an independent engineering studio building voice AI, developer tools and the infrastructure behind them.';
// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Miransas',
  },
  description: SITE_DESCRIPTION,
  keywords: ['miransas', 'software engineering', 'rust', 'go', 'next.js', 'infrastructure', 'binboi', 'chess engine', 'developer tools'],
  authors: [{ name: 'Sardor Azimov', url: SITE_URL }],
  creator: 'Sardor Azimov',
  publisher: 'Miransas',
  applicationName: SITE_NAME,

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Miransas — Secure • Connect • Evolve',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@miransaas',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-48x48.png', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  manifest: '/manifest.webmanifest',

  alternates: {
    canonical: SITE_URL,
  },

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
};

// ── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#efefef' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
};

// ── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript dangerouslySetInnerHTML={{ __html: "<style>.scroll-reveal { opacity: 1 !important; transform: none !important; filter: none !important; }</style>" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Miransas',
              url: SITE_URL,
              logo: `${SITE_URL}/icons/logo.png`,
              description: SITE_DESCRIPTION,
              founder: {
                '@type': 'Person',
                name: 'Sardor Azimov',
              },
              sameAs: ['https://github.com/miransas', 'https://twitter.com/miransaas', 'https://www.instagram.com/miransaas', 'https://www.youtube.com/@miransaas'],
            }),
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${plexMono.variable} bg-background text-foreground font-sans antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <NoticeModal />
            <a href="#main-content" className="bg-primary text-primary-foreground fixed top-4 left-4 z-[100] -translate-y-24 rounded-lg px-4 py-3 text-sm focus:translate-y-0">
              Skip to content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <PageTransition>
                <main id="main-content" tabIndex={-1} className="flex-1 pt-[var(--header-h)]">
                  {children}
                </main>
              </PageTransition>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
