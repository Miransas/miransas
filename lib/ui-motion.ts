import type { CSSProperties } from 'react';

/** Content-only motion. Hero and global route/theme choreography stay independent. */
export const UI_EASE = [0.22, 1, 0.36, 1] as const;

export const UI_DURATION = {
  interactive: 0.18,
  theme: 0.22,
  overlay: 0.28,
  route: 0.3,
  paragraph: 0.45,
  heading: 0.65,
  section: 0.6,
  stagger: 0.055,
} as const;

export const UI_MOTION_STYLE = {
  '--ui-interactive-duration': `${UI_DURATION.interactive * 1000}ms`,
  '--ui-theme-duration': `${UI_DURATION.theme * 1000}ms`,
  '--ui-panel-duration': `${UI_DURATION.overlay * 1000}ms`,
  '--ui-ease': `cubic-bezier(${UI_EASE.join(',')})`,
} as CSSProperties;

export const UI_REVEAL = {
  opacity: [0, 1],
  y: [10, 0],
};

export const UI_VIEWPORT = { once: true, amount: 0.12 } as const;
