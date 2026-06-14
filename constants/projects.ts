export type ProjectStatus = "live" | "wip" | "paused"

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  status: ProjectStatus
  tech: string[]
  links: {
    website?: string
    github?: string
    docs?: string
  }
  longDescription: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: "binboi",
    name: "Binboi",
    tagline: "Self-hosted ngrok alternative",
    description:
      "Tunnel localhost to a public HTTPS URL. Custom subdomains, request inspection, PAT-based auth.",
    status: "live",
    tech: ["Go", "Next.js", "Postgres", "Caddy"],
    links: {
      website: "https://binboi.com",
      docs: "https://docs.binboi.com",
    },
    longDescription:
      "Binboi exposes local services to the internet over secure HTTPS tunnels. Built for developers who want ngrok's convenience without the per-seat pricing or vendor lock-in. Polar.sh billing, Personal Access Tokens, automatic TLS for *.binboi.com, and a clean dashboard for managing tunnels and tokens.",
    highlights: [
      "Wildcard TLS via Cloudflare DNS-01",
      "Personal Access Tokens with lifetime caps",
      "Polar.sh billing — FREE, PRO ($10), MAX ($19)",
      "Yamux-multiplexed agent over single TCP connection",
      "Production-ready: Linode + Neon + Vercel",
    ],
  },
  {
    slug: "courierx",
    name: "CourierX",
    tagline: "Resend-compatible self-hosted email API",
    description:
      "Drop-in replacement for Resend. Postgres queue, worker-based delivery, multi-provider support.",
    status: "wip",
    tech: ["Rust", "Axum", "Postgres", "Tokio"],
    links: {
      github: "https://github.com/Miransas/courierx",
    },
    longDescription:
      "CourierX is a self-hosted email delivery API with a Resend-compatible interface — swap two lines of code, keep your data on your own infrastructure. Postgres-backed job queue with FOR UPDATE SKIP LOCKED, pluggable providers (Resend, SES), and an SDK family for Node, Next.js, and React Email.",
    highlights: [
      "Resend-compatible API surface",
      "Postgres queue with worker-based delivery",
      "Multi-provider (Resend, SES) via swappable trait",
      "MIT licensed",
      "Currently paused while Binboi ships",
    ],
  },
  {
    slug: "miransas-chess",
    name: "Miransas Chess",
    tagline: "From-scratch chess engine in Rust",
    description:
      "Bitboard-based move generation, perft-verified, working toward a competitive UCI engine.",
    status: "wip",
    tech: ["Rust"],
    links: {
      github: "https://github.com/Miransas/miransas-chess",
    },
    longDescription:
      "A chess engine written from scratch in Rust to learn systems programming through one of the deepest games ever encoded. Bitboards, magic numbers, perft-verified move generation. The eventual goal: a competitive UCI engine that can play on Lichess.",
    highlights: [
      "Bitboard representation",
      "Pseudo-legal + legal move generation",
      "Perft-verified through depth 6",
      "110+ unit tests passing",
      "Phase 3: search & evaluation",
    ],
  },
  {
    slug: "vscode-uzbek-pack",
    name: "VS Code Uzbek",
    tagline: "Uzbek language pack for VS Code",
    description:
      "First-class Uzbek (Latin) localization for Visual Studio Code, auto-translated via Claude.",
    status: "live",
    tech: ["TypeScript", "Node.js", "Claude API"],
    links: {
      github: "https://github.com/sardorazimov/vscode-language-pack-uz",
    },
    longDescription:
      "5,741 translation keys across 94 files, machine-translated via Claude with a resumable concurrent pipeline. Brings full Uzbek (Latin) UI to VS Code — menus, commands, settings, error messages. Built because Microsoft never shipped one.",
    highlights: [
      "5,741 keys translated",
      "Claude-based auto-translation pipeline",
      "Resumable with p-limit concurrency",
      "MIT licensed",
      "Published to VS Marketplace",
    ],
  },
  {
    slug: "miransas-pulse",
    name: "Miransas Pulse",
    tagline: "Mac menubar agent for system metrics",
    description:
      "Native macOS menubar app showing live CPU, RAM, and top processes. C and Objective-C, no Electron.",
    status: "live",
    tech: ["C", "Objective-C", "Cocoa"],
    links: {},
    longDescription:
      "A native macOS menubar utility for live system metrics. Built directly with Cocoa — no Electron, no web view, no Node runtime. Shows color-coded CPU and RAM per process, lets you kill misbehaving processes with a SIGTERM, and runs as a true LSUIElement so it never shows in the dock.",
    highlights: [
      "Native Cocoa, no Electron",
      "Live NSTimer-driven metrics",
      "Process kill via SIGTERM + NSAlert",
      "Custom cat-ear menubar icon",
      ".dmg installer, ad-hoc signed",
    ],
  },
  {
    slug: "blog",
    name: "Miransas Blog",
    tagline: "Building Miransas in public",
    description:
      "Long-form writing about systems programming, infrastructure failures, and shipping side projects.",
    status: "live",
    tech: ["Next.js", "MDX", "Vercel"],
    links: {
      website: "https://blog.miransas.com",
    },
    longDescription:
      "The engineering blog for Miransas. Notes on tunneling internals, Postgres at scale, Rust chess engines, GCP suspensions, and everything else that goes wrong when you're shipping products solo. Multi-language: English, Turkish, Uzbek.",
    highlights: [
      "i18n (en/tr/uz)",
      "Light + dark themes",
      "3 long-form posts shipped",
      "MDX with code highlighting",
      "Vercel + Cloudflare DNS",
    ],
  },
]

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug)
