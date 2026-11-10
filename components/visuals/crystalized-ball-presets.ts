import type { CSSProperties } from 'react';

export type CrystalPreset = 'plasma' | 'aurora' | 'nebula' | 'ember' | 'frost' | 'solar' | 'eclipse' | 'abyss';
export type Motion = 'rise' | 'fall' | 'drift' | 'orbit';
export type ParticleShape = 'square' | 'round';
export type Theme = 'dark' | 'light';
export type Rgb = [number, number, number];

export interface PresetValues {
  color: string;
  strands: number;
  crackle: number;
  flares: number;
  glow: number;
  sparks: number;
  particleCount: number;
  fill: number;
  motion: Motion;
  particleShape: ParticleShape;
  depth: number;
  sway: number;
  twinkle: number;
  haze: number;
  dustSpeed: number;
}

export interface CrystalizedBallProps extends Partial<PresetValues> {
  preset?: CrystalPreset;
  theme?: Theme;
  size?: number;
  speed?: number;
  interactive?: boolean;
  hoverStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const CRYSTAL_PRESETS: Record<CrystalPreset, PresetValues> = {
  plasma: {
    color: '#F25BD0',
    strands: 6,
    crackle: 0.85,
    flares: 0.65,
    glow: 0.9,
    sparks: 0.6,
    particleCount: 15000,
    fill: 0.5,
    motion: 'rise',
    particleShape: 'square',
    depth: 0.6,
    sway: 0.5,
    twinkle: 0.5,
    haze: 0.7,
    dustSpeed: 1
  },
  aurora: {
    color: '#5CFFC8',
    strands: 5,
    crackle: 0.6,
    flares: 0.5,
    glow: 0.8,
    sparks: 0.45,
    particleCount: 15000,
    fill: 0.5,
    motion: 'rise',
    particleShape: 'square',
    depth: 0.6,
    sway: 0.5,
    twinkle: 0.5,
    haze: 0.7,
    dustSpeed: 1
  },
  nebula: {
    color: '#9478FF',
    strands: 6,
    crackle: 1,
    flares: 0.5,
    glow: 0.9,
    sparks: 0.6,
    particleCount: 18000,
    fill: 0.45,
    motion: 'rise',
    particleShape: 'square',
    depth: 0.5,
    sway: 0.4,
    twinkle: 0.6,
    haze: 0.8,
    dustSpeed: 1.2
  },
  ember: {
    color: '#FF8A2A',
    strands: 5,
    crackle: 0.9,
    flares: 0.8,
    glow: 1,
    sparks: 0.8,
    particleCount: 12000,
    fill: 0.35,
    motion: 'rise',
    particleShape: 'round',
    depth: 0.7,
    sway: 0.3,
    twinkle: 0.7,
    haze: 0.9,
    dustSpeed: 1.6
  },
  frost: {
    color: '#BFE6FF',
    strands: 3,
    crackle: 0.3,
    flares: 0.3,
    glow: 0.6,
    sparks: 0.2,
    particleCount: 16000,
    fill: 0.6,
    motion: 'fall',
    particleShape: 'round',
    depth: 0.8,
    sway: 0.4,
    twinkle: 0.4,
    haze: 0.5,
    dustSpeed: 0.7
  },
  solar: {
    color: '#FFD36E',
    strands: 6,
    crackle: 0.7,
    flares: 1,
    glow: 1.1,
    sparks: 0.5,
    particleCount: 15000,
    fill: 0.55,
    motion: 'orbit',
    particleShape: 'square',
    depth: 0.6,
    sway: 0.7,
    twinkle: 0.5,
    haze: 0.8,
    dustSpeed: 1
  },
  eclipse: {
    color: '#FFFFFF',
    strands: 4,
    crackle: 0.5,
    flares: 0.4,
    glow: 0.7,
    sparks: 0.35,
    particleCount: 14000,
    fill: 0.5,
    motion: 'drift',
    particleShape: 'square',
    depth: 0.7,
    sway: 0.5,
    twinkle: 0.5,
    haze: 0.5,
    dustSpeed: 0.8
  },
  abyss: {
    color: '#3F7BFF',
    strands: 5,
    crackle: 0.55,
    flares: 0.6,
    glow: 0.9,
    sparks: 0.4,
    particleCount: 20000,
    fill: 0.8,
    motion: 'orbit',
    particleShape: 'round',
    depth: 0.8,
    sway: 0.8,
    twinkle: 0.5,
    haze: 0.6,
    dustSpeed: 0.9
  }
};

export const PRESET_OPTIONS: { value: CrystalPreset; label: string; description: string }[] = [
  { value: 'plasma', label: 'Plasma', description: 'Fine, expressive strands with a violet-pink charge.' },
  { value: 'aurora', label: 'Aurora', description: 'Cool green light with a gentle upward drift.' },
  { value: 'nebula', label: 'Nebula', description: 'Layered violet particles and a softly textured edge.' },
  { value: 'ember', label: 'Ember', description: 'Warm, rising particles with a more active perimeter.' },
  { value: 'frost', label: 'Frost', description: 'Icy light, falling particles and a quieter rhythm.' },
  { value: 'solar', label: 'Solar', description: 'Golden strands around an orbiting particle field.' },
  { value: 'eclipse', label: 'Eclipse', description: 'A restrained, near-monochrome study of light and depth.' },
  { value: 'abyss', label: 'Abyss', description: 'Deep blue light with a slow, orbiting interior.' },
];
