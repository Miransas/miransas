"use client";

import Link from "next/link";
import { FooterVideoText } from "./footer-videotext";
import { FaDiscord, FaGithub, FaYoutube } from "react-icons/fa6";
import { SystemStatusBadge } from "./SystemStatusBadge";

// X (Twitter) SVG İkonu
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const FOOTER_NAV = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Voice Agents", href: "/#voice-agents" },
      { label: "FAQ", href: "/#faq" },
      { label: "Issues", href: "https://github.com/Miransas/miransas/issues/new", isExternal: true },
      { label: "Discussions", href: "https://github.com/orgs/Miransas/discussions/new/choose", isExternal: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Terms of Service", href: "https://privacy.miransas.com/terms", isExternal: true },
      { label: "Privacy Policy", href: "https://privacy.miransas.com/privacy", isExternal: true },
      { label: "Cookie Policy", href: "https://privacy.miransas.com/cookie", isExternal: true },
      { label: "Security", href: "https://privacy.miransas.com/security", isExternal: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "https://blog.miransas.com", isExternal: true },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
      { label: "System Status", href: "https://status.miransas.com", isExternal: true },
    ],
  },
  {
    title: "Miralas AI",
    links: [
      { label: "Miralas Overview", href: "https://miralas.io", isExternal: true },
      { label: "Dashboard Console", href: "https://console.miralas.io", isExternal: true },
      { label: "Studio TTS", href: "https://console.miralas.io/studio/tts", isExternal: true },
      { label: "Live Streams", href: "https://console.miralas.io/studio/streams", isExternal: true },
    ],
  },
];

export function SiteFooter() {
  // Sayfa içi anchor (#faq, #features vb.) tıklandığında pürüzsüz kaydırma
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <footer className="w-full bg-black text-zinc-400 font-sans  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Sol Kolon: Açıklama, Sosyal İkonlar & Status Badge */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img src="/icons/logo.png" className="w-14 h-14 object-contain" alt="Miransas Logo" />
                  <h3 className="text-white text-lg font-bold tracking-tight">Miransas</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400 max-w-xs">
                  Next-generation AI voice systems, real-time speech agents, and advanced web technologies.
                </p>
              </div>

              {/* Yuvarlak Sosyal Medya İkonları */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://x.com/miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <XIcon className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="https://github.com/Miransas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/miransas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <FaDiscord className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Status Indicator */}
            <div>
              <a
                href="https://status.miransas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/40 text-xs font-medium text-zinc-300 hover:border-zinc-700 transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All systems operational</span>
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Navigasyon Sütunları (4 Kolon) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_NAV.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-100 tracking-wide">
                  {column.title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Dev Video Text - Miransas Branding */}

      <div className="border-t border-white/10 w-full ">
        <div className="mx-auto mt-10 flex max-w-6xl justify-between text-xs text-white/35">
          <p>© Miransas. 2026. All rights reserved</p>
          <a href="mailto:contact@miransas.com">contact@miransas.com</a>
        </div>
      </div>
      <div className="w-full overflow-hidden select-none border-t border-zinc-900/50 pt-8 pb-4 flex justify-center items-center">
        <div className="w-full h-[22vw] max-h-[320px] min-h-[120px]">
          <FooterVideoText
            src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1787353513/14130907_1920_1080_30fps_q1vnk6.mp4"
            fontSize={18}
            fontWeight={900}
            fontFamily="system-ui, -apple-system, sans-serif"
            className="w-full h-full"
          >
            Miransas
          </FooterVideoText>
        </div>
      </div>
    </footer>
  );
}