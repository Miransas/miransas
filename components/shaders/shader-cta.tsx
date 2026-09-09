import { ClientOnly } from "@tanstack/react-router";
import { GrainGradient } from "@paper-design/shaders-react";
import { ArrowRight } from "lucide-react";

export function ShaderCTA() {
  return (
    <section id="imagination" className="relative  py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border md:aspect-[16/7]">
          <div className="absolute inset-0">
            <ClientOnly
              fallback={<div className="size-full bg-[#04070d]" aria-hidden />}
            >
              <GrainGradient
                style={{ width: "100%", height: "100%" }}
                colors={["#7cbde3", "#a9d6ef", "#1b4c6b", "#0a0f16"]}
                colorBack="#000000"
                softness={0.85}
                intensity={0.35}
                noise={0.55}
                shape="corners"
                speed={0.6}
              />
            </ClientOnly>
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
            <a
              href="#start"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Start building
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
