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