// ─── Nav Link Types ───────────────────────────────────────────────────────────

import { FaGithub, FaInstagram, FaRadio, FaX, FaYoutube } from "react-icons/fa6";

export interface NavLink {
  name: string;
  href: string;
}

// ─── Header Nav Links ─────────────────────────────────────────────────────────

export const headerNavLinks: NavLink[] = [
  { name: "Projects", href: "/projects" },
  { name: "Games", href: "/games" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
  { name: "Support", href: "/support" },
  { name: "Blog", href: "/blog" },
];

// ─── Footer Nav Links ─────────────────────────────────────────────────────────

export const footerNavLinks: NavLink[] = [
  { name: "Legal", href: "/legal" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Careers", href: "/careers" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Support", href: "/support" },
  { name: "Code of Conduct", href: "/conduct" },
];

// ─── Sidebar Nav Links ────────────────────────────────────────────────────────

export const sidebarNavLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Games", href: "/games" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
  { name: "Support", href: "/support" },
];


export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com/miransas", icon: FaInstagram, color: "#E4405F" },
  { name: "X", href: "https://x.com/miransas", icon: FaX, color: "#FFFFFF" },
  { name: "YouTube", href: "https://youtube.com/@miransas", icon: FaYoutube, color: "#FF0000" },
  { name: "Kick", href: "https://kick.com/miransas", icon: FaRadio, color: "#53FC18" }, // Kick için Radio ikonu ve neon yeşil
  { name: "GitHub", href: "https://github.com/miransas", icon: FaGithub, color: "#4078c0" },
];