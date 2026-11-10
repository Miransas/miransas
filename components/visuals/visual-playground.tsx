'use client';

import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMediaQuery } from '@/lib/use-media-query';
import CrystalizedBall from './crystalized-ball';
import { PRESET_OPTIONS, type CrystalPreset } from './crystalized-ball-presets';

export function VisualPlayground() {
  const id = useId();
  const [preset, setPreset] = useState<CrystalPreset>('abyss');
  const [speed, setSpeed] = useState(.75);
  const [interactive, setInteractive] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const current = PRESET_OPTIONS.find(option => option.value === preset)!;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_272px] lg:gap-12" data-visual-playground>
      <figure className="min-w-0">
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-4xl bg-foreground/[.025] sm:min-h-[520px] lg:min-h-[600px]">
          <div className="aspect-square w-full max-w-[720px]">
            <CrystalizedBall preset={preset} speed={speed} interactive={interactive} paused={paused} intro={false} />
          </div>
          <span className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] tracking-[.15em] text-muted-foreground sm:left-7 sm:top-7">001 / CRYSTAL FIELD</span>
          <button type="button" disabled={reduce} aria-label={reduce ? 'Animation paused for reduced motion' : paused ? 'Play animation' : 'Pause animation'} aria-pressed={paused || reduce} onClick={() => setPaused(value => !value)}
            className="absolute bottom-5 right-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-background/90 px-4 text-xs transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-default sm:bottom-7 sm:right-7">
            {paused || reduce ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            {reduce ? 'Reduced motion' : paused ? 'Play' : 'Pause'}
          </button>
        </div>
        <figcaption className="mt-5 flex flex-col justify-between gap-2 text-xs leading-6 text-muted-foreground sm:flex-row sm:gap-6">
          <span role="status" aria-live="polite">{current.description}</span>
          <span className="shrink-0">{reduce ? 'A still composition, at your pace.' : interactive ? 'Move across the field to influence its motion.' : 'Moving on its own.'}</span>
        </figcaption>
      </figure>

      <div className="pb-2 lg:pt-2">
        <fieldset>
          <legend className="mb-4 text-sm font-medium">Appearance</legend>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESET_OPTIONS.map(option => (
              <label key={option.value} className="relative cursor-pointer">
                <input className="peer sr-only" type="radio" name={`${id}-preset`} value={option.value} checked={preset === option.value} onChange={() => setPreset(option.value)} />
                <span className="flex min-h-11 items-center justify-center rounded-xl px-3 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-9">
          <div className="flex items-center justify-between gap-4 text-sm">
            <label htmlFor={`${id}-speed`} className="font-medium">Animation speed</label>
            <output htmlFor={`${id}-speed`} className="font-mono text-xs tabular-nums text-muted-foreground">{speed.toFixed(2)}×</output>
          </div>
          <input id={`${id}-speed`} type="range" min=".25" max="1.5" step=".25" value={speed} aria-valuetext={`${speed.toFixed(2)} times normal speed`} onChange={event => setSpeed(Number(event.target.value))} disabled={reduce}
            className="mt-4 h-6 w-full cursor-pointer accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-default disabled:opacity-40" />
          <div aria-hidden className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground"><span>SLOW</span><span>LIVELY</span></div>
        </div>

        <label className="mt-9 flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm font-medium">
          Interaction
          <span className="relative inline-flex">
            <input type="checkbox" role="switch" checked={interactive} onChange={event => setInteractive(event.target.checked)} disabled={reduce} className="peer sr-only" />
            <span aria-hidden className="h-6 w-10 rounded-full bg-foreground/15 transition-colors peer-checked:bg-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ring peer-disabled:opacity-40" />
            <span aria-hidden className="pointer-events-none absolute left-1 top-1 size-4 rounded-full bg-background transition-transform peer-checked:translate-x-4 motion-reduce:transition-none" />
          </span>
        </label>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">{reduce ? 'Animation follows your device’s reduced-motion preference. You can still explore every appearance.' : 'Optional pointer response. The field continues to evolve with interaction turned off.'}</p>
      </div>
    </div>
  );
}
