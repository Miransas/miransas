import { FaDiscord, FaGithub, FaX, FaYoutube } from "react-icons/fa6";

export const FOOTER_NAV = [
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
      { label: "Developers", href: "/developers" },
      { label: "Support", href: "/support" },
      { label: "Blog", href: "https://blog.miransas.com", isExternal: true },
      { label: "RSS Feed", href: "/news/rss.xml", isExternal: true },
      { label: "Terms of Service", href: "https://privacy.miransas.com/terms", isExternal: true },
      { label: "Privacy Policy", href: "https://privacy.miransas.com/privacy", isExternal: true },
      { label: "Security", href: "https://privacy.miransas.com/security", isExternal: true },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "News", href: "/news" },
      { label: "Projects", href: "/projects" },
      { label: "Models", href: "/models" },
      { label: "Agent", href: "/agent" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "System Status", href: "https://status.miransas.com", isExternal: true },
    ],
  },
  {
    title: "Miralas AI",
    links: [
      { label: "Miralas Overview", href: "/projects/miralas" },
      { label: "miralas.io", href: "https://miralas.io", isExternal: true },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/miransaas", icon: FaX },
  { label: "GitHub", href: "https://github.com/Miransas", icon: FaGithub },
  { label: "Discord", href: "https://discord.gg/miransas", icon: FaDiscord },
  { label: "YouTube", href: "https://youtube.com/@miransaas", icon: FaYoutube },
] as const;