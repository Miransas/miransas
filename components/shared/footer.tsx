"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";


const footerLinks = {
  Project: [
    { name: "Chess Engine", href: "/projects/chess-engine" },
    { name: "Binboi", href: "/projects/binboi" },
    { name: "Game", href: "/gmaes" },
    // { name: "", href: "#integrations" },
  ],
  Developers: [
    {name: "Developer ", href: "/developers" },
    { name: "Chanelog", href: "/changelog" },
    { name: "Status", href: "/status" },

  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "https://blog.miransas.com" },
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
  { name: "Twitter", href: "https://twitter.com/miransaas" },
  { name: "GitHub", href: "https://github.com/miransas" },
  // { name: "LinkedIn", href: "https://linkedin.com/company/miransas" },
  { name: "Discord", href: "https://discord.gg/miransas" },
  {name : "Email", href: "mailto:info@miransas.com"},
  {name : "Instagram", href: "https://instagram.com/miransaas"}

];

export function Footer() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const startTime = new Date();

    const updateClock = () => {
      const now = new Date();

      // canlı saat
      const currentTime = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(currentTime);

      // uptime hesaplama
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
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">

      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">Miransas</span>
                <span className="text-xs text-muted-foreground font-mono">TM</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                The platform for teams who ship. Build, deploy, and scale with unprecedented velocity.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025-{new Date().getFullYear()} Miransas. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {/* sistem */}
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>

            {/* canlı saat */}
            <span className="font-mono tracking-wider">
              {time}
            </span>

            {/* uptime */}
            <span className="font-mono text-green-400">
              Uptime {uptime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
