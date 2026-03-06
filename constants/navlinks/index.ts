// ─── Nav Link Types ───────────────────────────────────────────────────────────

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
