export const ROUTES = {
  home: '/',
  developer: '/developers',
  model: '/models',

  products: {
    studio: '/projects#miralas',
    tts: '/models',
    voiceClone: '/models#voice-cloning',
    realtime: '/agent',
  },
} as const;

export const PRODUCT_MENU = [
  {
    label: 'Studio',
    hint: 'Explore the Miralas project',
    href: ROUTES.products.studio,
  },
  {
    label: 'Text to Speech',
    hint: 'Read the speech model notes',
    href: ROUTES.products.tts,
  },
  {
    label: 'Voice Clone',
    hint: 'Understand authorized voice cloning',
    href: ROUTES.products.voiceClone,
  },
  {
    label: 'Realtime',
    hint: 'Explore conversational infrastructure',
    href: ROUTES.products.realtime,
  },
] as const;

export const RESOURCE_MENU = [
  { label: 'Blog', href: 'https://blog.miransas.com', isExternal: true },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
  // { label: "Help", href: "/developers" },
] as const;

export const EXPLORE_MENU = [
  { label: 'News', href: '/news' },
  { label: 'Lab', href: '/lab' },
  { label: 'Models', href: '/models' },
  { label: 'Agent', href: '/agent' },
] as const;

export const COMPANY_MENU = [
  { label: 'About', href: '/about' },
  { label: 'Developers', href: '/developers' },
  { label: 'Careers', href: '/careers' },
] as const;

export const PROJECT_MENU = [{ label: 'Projects', href: '/projects/' }] as const;

export const HEADER_MENU = [
  { label: 'Products', items: PRODUCT_MENU },
  { label: 'Explore', items: EXPLORE_MENU },
  { label: 'Resources', items: RESOURCE_MENU },
  { label: 'Company', items: COMPANY_MENU },
  { label: 'Projects', items: PROJECT_MENU },
] as const;
