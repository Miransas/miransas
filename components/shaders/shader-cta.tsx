'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../shared/reval';

export function ShaderCTA() {
  return (
    <section
      id="imagination"
      className="surface-page relative overflow-x-clip py-24 sm:py-32"
    >
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="dark-visual relative min-h-[420px] w-full overflow-hidden rounded-4xl bg-surface-card md:aspect-[16/7]">
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
            style={{ background: 'rgba(5, 5, 5, 0.68)' }}
            aria-hidden
          />

          <div className="relative flex size-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
            <h2 className="text-3xl leading-[1.06] font-semibold tracking-[-0.025em] text-heading sm:text-5xl lg:text-[3.5rem]">
              Imagination, engineered.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.6] text-prominent sm:text-lg">
              Build, send and observe — the infrastructure gets out of your way.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/developers"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#0d4bfa] px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
              >
                Start building
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
