/**
 * @license Miransas
 * @copyright
 * miransas product
 *
 * Copyright (c) Miransas.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import './non-hero.css';

import { SmoothScroll } from '../components/provider/smooth-scroll';
import { SiteHeader } from '../components/layouts/header';
import { SiteFooter } from '../components/layouts/footer';
import NoticeModal from '../components/provider/site-modal';
import { GoogleAnalytics } from '../components/provider/google-analytics';
import { PageTransition } from '../components/provider/page-transition';
import { ThemeProvider } from '../components/provider/theme-provider';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  getOrganizationJsonLd,
} from '@/src/lib/seo';

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

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Miransas',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Miransas',
    'Miralas',
    'voice AI lab',
    'Uzbek speech synthesis',
    'Uzbek text to speech',
    'multilingual TTS',
    'permission-based voice cloning',
    'conversational voice agents',
    'Rust gRPC voice infrastructure',
    'Chatterbox Multilingual',
    'Binboi',
  ],
  authors: [{ name: 'Sardor Azimov', url: SITE_URL }],
  creator: 'Sardor Azimov',
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'technology',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    types: {
      'application/rss+xml': `${SITE_URL}/news/rss.xml`,
    },
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
    { media: '(prefers-color-scheme: light)', color: '#EFEFEF' },
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
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>.scroll-reveal { opacity: 1 !important; transform: none !important; filter: none !important; }</style>',
          }}
        />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body
        className={`${jakarta.variable} ${plexMono.variable} surface-page text-foreground font-sans antialiased`}
      >
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <NoticeModal />
            <a
              href="#main-content"
              className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-xl bg-[#3847ff] px-4 py-3 text-sm font-medium text-white focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
            >
              Skip to content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <PageTransition>
                <main
                  id="main-content"
                  tabIndex={-1}
                  className="flex-1 pt-[var(--header-h)]"
                >
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
