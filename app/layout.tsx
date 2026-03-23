import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/provider/theme-provider";
import Navbar from "../components/shared/header";
import Footer from "../components/shared/footer";
import SmoothScrolling from "../components/shared/smooth-scrolling";


// Font Tanımlamaları
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Miransas Studio SEO & Meta Veri Yapılandırması
export const metadata: Metadata = {
  title: {
    default: "Miransas Studio | Logic & Nightmares by Sardor Azimov",
    template: "%s | Miransas"
  },
  description: "Miransas Software & Game Studios. High-performance software engineering and atmospheric horror experiences like Lost Signal. Lead by Sardor Azimov in İzmir.",
  metadataBase: new URL("https://miransas.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo/logo.png", rel: "icon" }, // Senin favicon olarak kullanacağın ana logon
      { url: "/icons/icon-192x192.png", sizes: "192x192", rel: "icon" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", rel: "icon" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", rel: "apple-touch-icon" },
    ],
    shortcut: ["/logo/logo.png"],
  },
  openGraph: {
    title: "Miransas Studio | Sardor Azimov",
    description: "Architects of logic and nightmares. Building crash-safe systems and psychological thrillers.",
    url: "https://miransas.com",
    siteName: "Miransas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miransas Studio",
    description: "Next-gen software and gaming by Sardor Azimov.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505", // Karanlık mod önceliği
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] text-white selection:bg-[#075a07] selection:text-white`}
      >
        {/* Senin doğan karanlık olduğu için ThemeProvider hep dark kalacak */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {/* <Navbar /> */}

            <main className="flex-grow">
              {/* Sayfalar arası siber-lazer geçiş efekti */}
              <>
                <SmoothScrolling>
                  {children}
                </SmoothScrolling>
              </>
            </main>

            {/* <Footer /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}