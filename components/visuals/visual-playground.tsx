'use client';

import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMediaQuery } from '@/lib/use-media-query';
import CrystalizedBall from './crystalized-ball';
import { PRESET_OPTIONS, type CrystalPreset } from './crystalized-ball-presets';

export function VisualPlayground() {
  const id = useId();
  const [preset, setPreset] = useState<CrystalPreset>('abyss');
  const [speed, setSpeed] = useState(0.75);
  const [interactive, setInteractive] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const current = PRESET_OPTIONS.find((option) => option.value === preset)!;

  return (
    <div
      className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12"
      data-visual-playground
    >
      <figure className="min-w-0">
        <div className="surface-card relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-4xl sm:min-h-[520px] lg:min-h-[600px]">
          <div className="aspect-square w-full max-w-[720px]">
            <CrystalizedBall
              preset={preset}
              speed={speed}
              interactive={interactive}
              paused={paused}
              intro={false}
            />
          </div>
          <span className="text-prominent pointer-events-none absolute top-5 left-5 font-mono text-xs leading-[1.45] tracking-[0.12em] uppercase sm:top-7 sm:left-7 sm:text-[13px]">
            001 / CRYSTAL FIELD
          </span>
          <button
            type="button"
            disabled={reduce}
            aria-label={
              reduce
                ? 'Animation paused for reduced motion'
                : paused
                  ? 'Play animation'
                  : 'Pause animation'
            }
            aria-pressed={paused || reduce}
            onClick={() => setPaused((value) => !value)}
            className="surface-card text-prominent hover:bg-surface-card-elevated absolute right-5 bottom-5 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] disabled:cursor-default sm:right-7 sm:bottom-7 sm:text-[13px]"
          >
            {paused || reduce ? (
              <Play className="size-3.5 text-[#3847ff]" aria-hidden />
            ) : (
              <Pause className="size-3.5 text-[#3847ff]" aria-hidden />
            )}
            {reduce ? 'Reduced motion' : paused ? 'Play' : 'Pause'}
          </button>
        </div>
        <figcaption className="text-supporting-copy mt-5 flex flex-col justify-between gap-2 text-xs leading-[1.45] sm:flex-row sm:gap-6 sm:text-[13px]">
          <span role="status" aria-live="polite">
            {current.description}
          </span>
          <span className="sm:max-w-xs sm:text-right">
            {reduce
              ? 'A still composition, at your pace.'
              : interactive
                ? 'Move across the field to influence its motion.'
                : 'Moving on its own.'}
          </span>
        </figcaption>
      </figure>

      <div className="surface-card rounded-3xl p-6">
        <fieldset>
          <legend className="text-heading mb-4 text-sm font-semibold">
            Appearance
          </legend>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESET_OPTIONS.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name={`${id}-preset`}
                  value={option.value}
                  checked={preset === option.value}
                  onChange={() => setPreset(option.value)}
                />
                <span className="surface-card-elevated text-prominent flex min-h-11 items-center justify-center rounded-xl px-3 text-xs font-medium transition-colors peer-checked:bg-[#3847ff] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#3847ff] sm:text-[13px]">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4 text-sm">
            <label htmlFor={`${id}-speed`} className="text-heading font-medium">
              Animation speed
            </label>
            <output
              htmlFor={`${id}-speed`}
              className="text-prominent font-mono text-xs tabular-nums"
            >
              {speed.toFixed(2)}×
            </output>
          </div>
          <input
            id={`${id}-speed`}
            type="range"
            min=".25"
            max="1.5"
            step=".25"
            value={speed}
            aria-valuetext={`${speed.toFixed(2)} times normal speed`}
            onChange={(event) => setSpeed(Number(event.target.value))}
            disabled={reduce}
            className="mt-4 h-6 w-full cursor-pointer accent-[#3847ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] disabled:cursor-default disabled:opacity-40"
          />
          <div
            aria-hidden
            className="text-supporting-copy mt-1 flex justify-between font-mono text-xs leading-[1.45]"
          >
            <span>SLOW</span>
            <span>LIVELY</span>
          </div>
        </div>

        <label className="text-heading mt-8 flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm font-medium">
          Interaction
          <span className="relative inline-flex">
            <input
              type="checkbox"
              role="switch"
              checked={interactive}
              onChange={(event) => setInteractive(event.target.checked)}
              disabled={reduce}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="surface-card-elevated h-6 w-10 rounded-xl transition-colors peer-checked:bg-[#3847ff] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#3847ff] peer-disabled:opacity-40"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-1 left-1 size-4 rounded-xl bg-white transition-transform peer-checked:translate-x-4 motion-reduce:transition-none"
            />
          </span>
        </label>
        <p className="text-supporting-copy mt-3 text-xs leading-[1.45] sm:text-[13px]">
          {reduce
            ? 'Animation follows your device’s reduced-motion preference. You can still explore every appearance.'
            : 'Optional pointer response. The field continues to evolve with interaction turned off.'}
        </p>
      </div>
    </div>
  );
}
