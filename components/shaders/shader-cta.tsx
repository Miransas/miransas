'use client';

import { AmbientSmoke } from '../shared/AmbientSmoke';
import { Reveal } from '../shared/reval';
import { GlowButton } from '../ui/glow-button';

export function ShaderCTA() {
  return (
    <section
      id="imagination"
      className="surface-page relative overflow-x-clip py-24"
    >
      <AmbientSmoke anchor="center" seed={11.4} intensity={0.62} />
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="dark-visual surface-card relative min-h-[420px] w-full overflow-hidden rounded-4xl md:aspect-[16/7]">
          <div className="absolute inset-0">
            {/* Existing cinematic artwork remains a fixed dark visual. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover opacity-80"
              src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790186437/PhotoshopExtension_Image_1_qionxr.png"
              alt="Miransas architectural light visualization"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 80% at 50% 50%, rgba(13, 75, 250, 0.24) 0%, rgba(0, 1, 3, 0.76) 72%)',
            }}
            aria-hidden
          />

          <div className="relative flex size-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
            <h2 className="text-3xl leading-[1.06] font-semibold tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.5rem]">
              Imagination, engineered.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.6] text-[#D1D1D1] sm:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">
              Build, send and observe — the infrastructure gets out of your way.
            </p>
            <div className="mt-8 flex gap-4">
              <GlowButton color="blue" href="/developers">
                Start building
              </GlowButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
