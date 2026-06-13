"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Next.js projesi için. Standart React ise <a> kullanabilirsiniz.
import { 
  ArrowUpRight, 
  
  Mail, 
  Globe, 
  Clock, 
  Activity 
} from "lucide-react";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa"; // Sosyal medya ikonları
// Discord ikonu lucide-react içinde doğrudan bulunmadığı için Globe veya özel SVG kullanılabilir.
// Burada basitlik ve tutarlılık adına MessageSquare yerine özel Discord SVG'si veya standart bir ikon seçtik.

const footerLinks = {
  Project: [
    { name: "Chess Engine", href: "/projects" },
    { name: "Binboi", href: "/projects" },
    { name: "Game", href: "/projects" },
    { name: "Courierx", href: "/projects" },
  ],
  Developers: [
    { name: "Developers", href: "/developers" },
    { name: "Changelog", href: "/changelog" },
    { name: "Status", href: "/status" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "https://blog.miransas.com", isExternal: true },
    { name: "Careers", href: "/careers", badge: "Hiring" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/miransaas", icon: FaTwitter },
  { name: "GitHub", href: "https://github.com/miransas", icon: FaGithub },
  { name: "Instagram", href: "https://instagram.com/miransaas", icon: FaInstagram },
  { name: "Email", href: "mailto:info@miransas.com", icon: Mail },
];

export function Footer() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const startTime = new Date();

    const updateClock = () => {
      const now = new Date();

      // Canlı saat (TR formatı)
      const currentTime = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(currentTime);

      // Session uptime hesaplama
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setUptime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-zinc-900 bg-neutral-950 text-zinc-100 overflow-hidden">
      
      {/* Koyu Tema Arka Plan Parlama Efektleri */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Ana Footer Bölümü */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-12 lg:gap-8">
            
            {/* Logo ve Marka Sütunu */}
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                  <span className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-indigo-400">
                    Miransas
                  </span>
                  <span className="text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono px-1.5 py-0.5 rounded">
                    TM
                  </span>
                </Link>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xs">
                  The platform for teams who ship. Build, deploy, and scale with unprecedented velocity.
                </p>
              </div>

              {/* Sosyal Medya İkonları */}
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all"
                      aria-label={link.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link Sütunları */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="col-span-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => {
                    const isExternal = "isExternal" in link && link.isExternal;
                    
                    const LinkComponent = isExternal ? 'a' : Link;
                    const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

                    return (
                      <li key={link.name}>
                        <LinkComponent
                          href={link.href}
                          {...extraProps}
                          className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                        >
                          <span>{link.name}</span>
                          {isExternal && (
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          )}
                          {"badge" in link && link.badge && (
                            <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </LinkComponent>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Alt Bilgi Çubuğu */}
        <div className="py-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-zinc-500 order-2 md:order-1">
            © {mounted ? `2024-${new Date().getFullYear()}` : "2024"} Miransas. All rights reserved.
          </p>

          {/* Sistem Durumu ve Zaman Göstergeleri */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 text-xs text-zinc-400 order-1 md:order-2">
            
            {/* Sistem Durumu */}
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </span>

            {/* Bölgesel Canlı Saat */}
            {mounted && time && (
              <span className="flex items-center gap-1.5 font-mono text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {time}
              </span>
            )}

            {/* Oturum Süresi (Uptime) */}
            {mounted && uptime && (
              <span className="flex items-center gap-1.5 font-mono text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                <Activity className="w-3.5 h-3.5" />
                Session: {uptime}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}