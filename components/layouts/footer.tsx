"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import {
  
  FaArrowRight,
  FaDiscord,
  FaGithub,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

// ─────────────────────────────────────────────────────────────
// FOOTER NAVIGATION
// ─────────────────────────────────────────────────────────────

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
// CANLI DUMAN EFEKTİ (Canvas — ekstra paket gerektirmez)
// ─────────────────────────────────────────────────────────────

type Puff = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;   // 0 → 1 ilerleme
  speed: number;  // yaşam hızı
  alpha: number;  // taban opaklık
  seed: number;   // rüzgar fazı
};

function SmokeCanvas({ density = 28 }: { density?: number }) {
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

    // Duman sprite'ını bir kez üret (her frame gradient çizmek yerine → performans)
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 256;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,255,255,0.50)");
    g.addColorStop(0.35, "rgba(255,255,255,0.18)");
    g.addColorStop(0.7, "rgba(255,255,255,0.06)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 256, 256);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (initial = false): Puff => {
      // Görseldeki gibi: çoğunlukla alttan, bir kısmı sol/sağ kenardan doğar
      const edge = Math.random();
      let x: number, y: number, vx: number, vy: number;

      if (edge < 0.55) {
        // ALT
        x = rand(-0.1, 1.1) * w;
        y = h + rand(40, 160);
        vx = rand(-0.12, 0.12);
        vy = -rand(0.1, 0.3);
      } else if (edge < 0.78) {
        // SOL
        x = -rand(60, 180);
        y = rand(0.2, 1.05) * h;
        vx = rand(0.08, 0.22);
        vy = -rand(0.03, 0.12);
      } else {
        // SAĞ
        x = w + rand(60, 180);
        y = rand(0.2, 1.05) * h;
        vx = -rand(0.08, 0.22);
        vy = -rand(0.03, 0.12);
      }

      return {
        x, y, vx, vy,
        r: rand(90, 240),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.0006, 0.0006),
        life: initial ? Math.random() : 0,
        speed: rand(0.00004, 0.00009),
        alpha: rand(0.35, 0.8),
        seed: rand(0, Math.PI * 2),
      };
    };

    const puffs: Puff[] = Array.from({ length: density }, () => spawn(true));

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        p.life += dt * p.speed;

        if (p.life >= 1) {
          puffs[i] = spawn();
          continue;
        }

        // Yumuşak sinüzoidal rüzgar salınımı
        const wind = Math.sin(now * 0.00012 + p.seed) * 0.05;

        p.x += (p.vx + wind) * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.rot += p.vr * dt;
        p.r += dt * 0.006; // zamanla hafifçe genişle

        const fade = Math.sin(p.life * Math.PI); // belir → kaybol

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = fade * p.alpha * 0.5; // ← genel yoğunluk
        ctx.drawImage(sprite, -p.r, -p.r, p.r * 2, p.r * 2);
        ctx.restore();
      }
    };

    // Hareket istemeyen kullanıcıya statik tek kare çiz
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
      // Görseldeki gibi duman metnin ÖNÜNDEN geçer (z-20).
      // Arkasında kalsın istersen z-0 yap. pointer-events-none olduğu
      // için linkler tıklanabilir kalır.
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export function SiteFooter() {
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
    <footer className="relative w-full overflow-hidden bg-[#050505] py-16 md:py-24">
      {/* 🌫️ CANLI DUMAN */}
      <SmokeCanvas />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">

          {/* ───────────────────────────────────────────────────
              LEFT: BRAND, COPYRIGHT & SOCIALS
          ─────────────────────────────────────────────────── */}
          <div className="flex flex-col max-w-sm">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-8 transition-opacity hover:opacity-80"
              aria-label="Miransas home"
            >
              <img
                src="/icons/logo.png"
                alt="Miransas"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold tracking-wide text-white">
                Miransas
              </span>
            </Link>

            {/* Copyright Text */}
            <div className="mb-8 space-y-1 text-[13px] text-stone-500/80">
              <p>Copyright © 2023–2026 Miransas. All Rights Reserved.</p>
              <p>Building next-generation voice AI.</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/[0.06] text-white/60 transition-all duration-300 hover:bg-white/[0.12] hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────
              RIGHT: NAVIGATION COLUMNS
          ─────────────────────────────────────────────────── */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full lg:w-auto">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="mb-6 text-[14px] font-medium text-white">
                  {column.title}
                </h3>

                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[14px] text-stone-400/80 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                          <FaArrowRight className="size-2.5 opacity-50" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-[14px] text-stone-400/80 transition-colors duration-200 hover:text-white"
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

      {/* Alttaki yumuşak parlama */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[400px] w-[600px] translate-x-[20%] translate-y-[30%] rounded-full bg-white/[0.03] blur-[100px]"
      />
    </footer>
  );
}