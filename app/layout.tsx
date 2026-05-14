import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google"; // Siber ruhu yansıtan fontlar
import "./globals.css";
import { ThemeProvider } from "../components/provider/theme-provider";

// Miransas Karakteristik Fontları
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

export const metadata: Metadata = {
  title: {
    default: "Miransas Studio | Logic & Nightmares",
    template: "%s | Miransas"
  },
  description: "Architects of high-performance software engineering and atmospheric horror experiences. Led by Sardor Azimov.",
  metadataBase: new URL("https://miransas.com"),
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "Miransas Studio | Logic & Nightmares",
    description: "Building crash-safe systems and psychological thrillers.",
    url: "https://miransas.com",
    siteName: "Miransas",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505", // Console ile uyumlu derin siyah
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
        className={`${sans.variable} ${mono.variable} antialiased bg-[#050505] text-white selection:bg-[#8CFF2E] selection:text-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            
            
            <main className="flex-grow">
              
              {children}
            </main>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}