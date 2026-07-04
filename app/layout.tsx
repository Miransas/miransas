import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────────────────
const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Site Constants ────────────────────────────────────────────────────────
const SITE_URL = "https://miransas.com";
const SITE_NAME = "Miransas";
const SITE_TITLE = "Miransas — Secure • Connect • Evolve";
const SITE_DESCRIPTION =
  "Solo engineering studio building high-performance software, infrastructure, and games. No investors. No agencies. Just craft.";

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Miransas",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "miransas",
    "software engineering",
    "indie game studio",
    "rust",
    "go",
    "next.js",
    "infrastructure",
    "binboi",
    "project sad",
    "chess engine",
    "developer tools",
  ],
  authors: [{ name: "Sardor Azimov", url: SITE_URL }],
  creator: "Sardor Azimov",
  publisher: "Miransas",
  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Miransas — Secure • Connect • Evolve",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@miransaas",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-48x48.png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  manifest: "/manifest.webmanifest",

  alternates: {
    canonical: SITE_URL,
  },

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
};

// ── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

// ── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Miransas",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
              description: SITE_DESCRIPTION,
              founder: {
                "@type": "Person",
                name: "Sardor Azimov",
              },
              sameAs: [
                "https://github.com/miransas",
                "https://twitter.com/miransaas",
                "https://www.instagram.com/miransaas",
                "https://www.youtube.com/@miransaas",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} font-sans antialiased bg-black text-white selection:bg-neutral-800 selection:text-white`}
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}