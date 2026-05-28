import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/provider/theme-provider";

// ── Miransas Fonts ────────────────────────────────────────────────────────
const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Site Constants ────────────────────────────────────────────────────────
const SITE_URL = "https://miransas.com";
const SITE_NAME = "Miransas";
const SITE_TITLE = "Miransas Studio | Logic & Nightmares";
const SITE_DESCRIPTION =
  "Architects of high-performance software engineering and atmospheric horror experiences. Building crash-safe systems and psychological thrillers. Led by Sardor Azimov.";

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
    "sardor azimov",
    "software studio",
    "systems engineering",
    "rust",
    "go",
    "developer tools",
    "binboi",
    "horror game",
    "psychological thriller",
    "indie studio",
  ],
  authors: [{ name: "Sardor Azimov", url: SITE_URL }],
  creator: "Sardor Azimov",
  publisher: "Miransas",
  applicationName: SITE_NAME,
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description:
      "Building crash-safe systems and psychological thrillers. Logic & Nightmares.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Miransas — Logic & Nightmares",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Building crash-safe systems and psychological thrillers. Logic & Nightmares.",
    images: ["/og.png"],
    creator: "@miransas",
  },

  icons: {
    icon: [
      { url: "/logo/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo/logo.png",
    apple: "/icons/apple-touch-icon.png",
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

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#050505",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Structured data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Miransas",
              url: SITE_URL,
              logo: `${SITE_URL}/logo/logo.png`,
              description: SITE_DESCRIPTION,
              founder: {
                "@type": "Person",
                name: "Sardor Azimov",
              },
              sameAs: [
                "https://github.com/Miransas",
                "https://twitter.com/miransas",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} antialiased bg-[#050505] text-white selection:bg-[#8CFF2E] selection:text-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}