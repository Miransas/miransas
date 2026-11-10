'use client';

import dynamic from 'next/dynamic';
import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@/lib/use-media-query';
import { registerVisualScene } from '@/lib/visual-scene-budget';
import { CRYSTAL_PRESETS, type CrystalizedBallProps } from './crystalized-ball-presets';

export type { CrystalizedBallProps, CrystalPreset } from './crystalized-ball-presets';

const Engine = dynamic(() => import('./crystalized-ball-engine'), { ssr: false });

function StillField({ color, fill }: { color: string; fill: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 600 600" className="size-full" aria-hidden="true" style={{ color }}>
      <defs>
        <radialGradient id={id}>
          <stop offset=".65" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".12" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><circle cx="300" cy="300" r="202" /></clipPath>
      </defs>
      <circle cx="300" cy="300" r="203" fill={`url(#${id})`} stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="300" cy="300" rx="207" ry="201" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".45" transform="rotate(-18 300 300)" />
      <g clipPath={`url(#${id}-clip)`} fill="currentColor">
        {Array.from({ length: 120 }, (_, i) => {
          const angle = i * 2.39996;
          const radius = Math.sqrt((i + .5) / 120) * 199;
          const x = 300 + Math.cos(angle) * radius;
          const y = 300 + Math.sin(angle) * radius;
          return <circle key={i} cx={x} cy={y} r={i % 7 ? .9 : 1.5} opacity={y > 390 - fill * 150 ? .7 : .12} />;
        })}
      </g>
    </svg>
  );
}

/** Lazy, theme-aware shell around the supplied OGL field and particle simulation. */
export default function CrystalizedBall({ preset = 'abyss', theme, className = '', style, ...props }: CrystalizedBallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const compact = useMediaQuery('(max-width: 767px)');
  const [scene, setScene] = useState({ active: false, seen: false });
  const [status, setStatus] = useState<'idle' | 'ready' | 'fallback'>('idle');
  const tone = theme ?? (resolvedTheme === 'light' ? 'light' : 'dark');
  const base = CRYSTAL_PRESETS[preset];

  useEffect(() => {
    if (!ref.current) return;
    return registerVisualScene(ref.current, active => {
      setScene(previous => ({ active, seen: previous.seen || active }));
    });
  }, []);

  return (
    <div ref={ref} data-crystal-experience data-preset={preset} data-scene-active={scene.active} data-render-status={status}
      role="img" aria-label={`Crystal field, ${preset} appearance`}
      className={`relative isolate size-full overflow-hidden ${className}`} style={style}>
      {status !== 'ready' && (
        <div className="pointer-events-none absolute inset-0">
          <StillField color={tone === 'light' && preset === 'eclipse' ? '#4e657d' : props.color ?? base.color} fill={props.fill ?? base.fill} />
        </div>
      )}
      {scene.seen && <Engine {...props} preset={preset} theme={tone} active={scene.active} compact={compact} onStatus={setStatus}
        size={props.size ?? .68} speed={props.speed ?? .65} interactive={props.interactive ?? false}
        particleCount={Math.min(props.particleCount ?? 10000, compact ? 2400 : 16000)}
        glow={props.glow ?? base.glow * .55} flares={(props.flares ?? base.flares) * (compact ? .6 : 1)}
        sparks={(props.sparks ?? base.sparks) * (compact ? .25 : .6)}
        className={status === 'ready' ? '' : 'opacity-0'} />}
      {status === 'fallback' && <p className="absolute inset-x-4 bottom-4 text-center font-mono text-[10px] tracking-wide text-muted-foreground">A still study is shown on this device.</p>}
    </div>
  );
}
