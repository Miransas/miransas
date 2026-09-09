"use client";
import { ClientOnly } from "@tanstack/react-router";
import { GrainGradient } from "@paper-design/shaders-react";
import { ArrowRight } from "lucide-react";

import LiquidChrome from "../LiquidChrome";
import { GlowButton } from "../ui/glow-button";

export function ShaderCTA() {
  return (
    <section id="imagination" className="relative  py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border md:aspect-[16/7]">
          <div className="absolute inset-0">
            <div style={{ width: '100%', height: '1250px', position: 'absolute' }}>
              <LiquidChrome
                baseColor={[0.1, 0.1, 0.1]}
                speed={0.3}
                amplitude={0.3}
                interactive
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(0,0,0,0.6),transparent_75%)]"
            aria-hidden
          />

          <div className="relative flex size-full flex-col items-center justify-center px-6 text-center">

            <h2 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-6xl md:text-7xl">
              imagination is limit
            </h2>
            <p className="mt-6 max-w-md text-pretty text-sm text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">
              Build, send and observe — the infrastructure gets out of your way.
            </p>
            <div className="mt-8 flex gap-4">
              <GlowButton >
                Start building

              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
