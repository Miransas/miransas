"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  FaDiscord,
  FaGithub,
  FaX,
  FaYoutube,
} from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { AvatarGroupDemo } from "../shared/avatar-grup";

const FOOTER_NAV = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Voice Agents", href: "/#voice-agents" },
      { label: "FAQ", href: "/#faq" },
      {
        label: "Issues",
        href: "https://github.com/Miransas/miransas/issues/new",
        isExternal: true,
      },
      {
        label: "Discussions",
        href: "https://github.com/orgs/Miransas/discussions/new/choose",
        isExternal: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
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

// ─────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/miransaas", icon: FaX },
  { label: "GitHub", href: "https://github.com/Miransas", icon: FaGithub },
  { label: "Discord", href: "https://discord.gg/miransas", icon: FaDiscord },
  { label: "YouTube", href: "https://youtube.com/@miransaas", icon: FaYoutube },
];

// ─────────────────────────────────────────────────────────────
// ATMOSFERİK CANLI DUMAN EFEKTİ (Optimized Canvas)
// ─────────────────────────────────────────────────────────────

type Puff = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
  speed: number;
  alpha: number;
  seed: number;
};

function SmokeCanvas({ density = 22 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Yumuşak duman dokusu sprite'ı
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 300;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(150, 150, 0, 150, 150, 150);
    g.addColorStop(0, "rgba(220, 225, 240, 0.22)");
    g.addColorStop(0.3, "rgba(180, 190, 210, 0.08)");
    g.addColorStop(0.7, "rgba(140, 150, 180, 0.02)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 300, 300);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (initial = false): Puff => {
      const edge = Math.random();
      let x: number, y: number, vx: number, vy: number;

      if (edge < 0.6) {
        x = rand(-0.1, 1.1) * w;
        y = h + rand(20, 100);
        vx = rand(-0.08, 0.08);
        vy = -rand(0.08, 0.2);
      } else if (edge < 0.8) {
        x = -rand(50, 150);
        y = rand(0.3, 1.0) * h;
        vx = rand(0.05, 0.15);
        vy = -rand(0.02, 0.08);
      } else {
        x = w + rand(50, 150);
        y = rand(0.3, 1.0) * h;
        vx = -rand(0.05, 0.15);
        vy = -rand(0.02, 0.08);
      }

      return {
        x,
        y,
        vx,
        vy,
        r: rand(180, 340), // Daha geniş ve yumuşak duman kütleleri
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.0004, 0.0004),
        life: initial ? Math.random() : 0,
        speed: rand(0.00003, 0.00007), // Yavaş, doğal akış
        alpha: rand(0.25, 0.55),
        seed: rand(0, Math.PI * 2),
      };
    };

    const puffs: Puff[] = Array.from({ length: density }, () => spawn(true));

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        p.life += dt * p.speed;

        if (p.life >= 1) {
          puffs[i] = spawn();
          continue;
        }

        const wind = Math.sin(now * 0.0001 + p.seed) * 0.04;

        p.x += (p.vx + wind) * dt * 0.05;
        p.y += p.vy * dt * 0.05;
        p.rot += p.vr * dt;
        p.r += dt * 0.008;

        // Pürüzsüz fade in / fade out eğrisi
        const fade = Math.sin(p.life * Math.PI);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = fade * p.alpha * 0.45;
        ctx.drawImage(sprite, -p.r, -p.r, p.r * 2, p.r * 2);
        ctx.restore();
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0, 0);
      return () => window.removeEventListener("resize", resize);
    }

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
    />
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export function SiteFooter() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);


    return () => clearInterval(timer);
  }, []);


  const currentYear = currentTime.getFullYear();


  const formattedTime = currentTime.toLocaleTimeString('tr-TR');
  const handleAnchorClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return;

    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);

    if (!element) return;

    e.preventDefault();
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  };

  return (
    <footer className="relative w-full overflow-hidden  bg-black text-white">
      {/* 🌫️ Arka Plan Duman Katmanı */}
      <SmokeCanvas />

      {/* Üst Degrade Parlama Çizgisi */}


      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">

          {/* ───────────────────────────────────────────────────
              SOL TARAF: MARKA, SOSYAL MEDYA VE TOPLULUK
          ─────────────────────────────────────────────────── */}
          <div className="flex flex-col max-w-sm shrink-0">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-4 transition-opacity hover:opacity-80"
              aria-label="Miransas home"
            >
              <img
                src="/icons/logo.png"
                alt="Miransas"
                className="w-12 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Miransas
              </span>
            </Link>

            {/* Açıklama */}
            <p className="text-sm text-stone-400/90 leading-relaxed mb-6">
              Building next-generation voice AI and real-time audio intelligence infrastructure for modern applications.
            </p>

            {/* Sosyal İkonlar */}
            <div className="flex items-center gap-2.5 mb-8">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-stone-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>

            {/* Topluluk Rozeti */}
            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm w-fit">
              <AvatarGroupDemo />
              <div className="text-xs">
                <p className="font-medium text-stone-200">Developers Media Actors</p>
                <p className="text-stone-500">Building with Miransas</p>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────
              SAĞ TARAF: NAVİGASYON KOLONLARI
          ─────────────────────────────────────────────────── */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 text-sm font-semibold text-stone-200 tracking-wide">
                  {column.title}
                </h3>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-stone-400 transition-colors duration-200 hover:text-white"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="size-3.5 text-stone-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-sm text-stone-400 transition-colors duration-200 hover:text-white"
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
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">

          {/* Sol Kısım: Telif Hakkı ve Canlı Saat */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          
            <p>© 2023–{currentYear} Miransas Inc. All rights reserved.</p>

            {/* Araya küçük bir nokta koyarak canlı saati ekliyoruz */}
            <span className="hidden md:block w-1 h-1 rounded-full bg-stone-600"></span>
            <p className="font-mono text-stone-400 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedTime}
            </p>
          </div>

         
          <a
            href="https://status.miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/15"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">All systems operational</span>
          </a>

        </div>
      </div>


      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[350px] w-[500px] translate-x-[20%] translate-y-[20%] rounded-full bg-indigo-500/[0.03] blur-[120px]"
      />
    </footer>
  );
}