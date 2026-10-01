import { Mic2, Waves, Zap } from "lucide-react";
import { FaDiscord, FaGithub, FaX, FaYoutube } from "react-icons/fa6";

export const ROUTES = {
  home: "/",
  developer: "/developer",
  model: "/model",

  products: {
    studio: "https://console.miralas.io/studio",
    tts: "https://console.miralas.io/tts",
    voiceClone: "https://console.miralas.io/voice-clone",
    realtime: "https://console.miralas.io/realtime",
  },

  console: {
    studio: "https://console.miralas.io/studio",
    auth: "https://console.miralas.io/auth",
  },
} as const;

export const PRODUCT_MENU = [
  {
    label: "Studio",
    hint: "Create and manage AI voices",
    href: ROUTES.products.studio,
  },
  {
    label: "Text to Speech",
    hint: "Generate natural AI speech",
    href: ROUTES.products.tts,
  },
  {
    label: "Voice Clone",
    hint: "Create your own AI voice",
    href: ROUTES.products.voiceClone,
  },
  {
    label: "Realtime",
    hint: "Build real-time voice experiences",
    href: ROUTES.products.realtime,
  },
] as const;

export const RESOURCE_MENU = [
  { label: "Blog", href: "https://blog.miransas.com", isExternal: true },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  // { label: "Help", href: "/developers" },
] as const;

export const EXPLORE_MENU = [
  { label: "News", href: "/news" },
  { label: "Models", href: "/models" },
  { label: "Agent", href: "/agent" },
] as const;

export const COMPANY_MENU = [
    { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
  { label: "Careers", href: "/careers" },

] as const;

export const PROJECT_MENU = [
    { label: "Miralas", href: "/projects/miralas" },


] as const;

export const HEADER_MENU = [
  { label: "Products", items: PRODUCT_MENU },
  { label: "Explore", items: EXPLORE_MENU },
  { label: "Resources", items: RESOURCE_MENU },
  { label: "Company", items: COMPANY_MENU },
  { label:  "Projects", items: PROJECT_MENU}
] as const;