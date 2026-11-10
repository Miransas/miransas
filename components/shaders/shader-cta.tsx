'use client';

import { Reveal } from '../shared/reval';

import { GlowButton } from '../ui/glow-button';

export function ShaderCTA() {
  return (
    <section id="imagination" className="relative py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="dark-visual bg-background border-border relative min-h-[420px] w-full overflow-hidden rounded-2xl border md:aspect-[16/7]">
          <div className="absolute inset-0">
            <div className="absolute inset-0">
              {/* Existing cinematic artwork remains a fixed dark visual. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790186437/PhotoshopExtension_Image_1_qionxr.png" alt="" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-black/60" aria-hidden />

          <div className="relative flex size-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl">Imagination, engineered.</h2>
            <p className="mt-6 max-w-md text-sm text-pretty text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">Build, send and observe — the infrastructure gets out of your way.</p>
            <div className="mt-8 flex gap-4">
              <GlowButton color="neutral" href="/developers">
                Start building
              </GlowButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
