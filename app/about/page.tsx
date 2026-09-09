"use client";

import { Reveal } from "../../components/shared/reval";
import { TeamSection } from "../../components/shared/team-sections";
import SideRays from "../../components/SideRays";
import { GlowButton } from "../../components/ui/glow-button";

const PRINCIPLES = [
  {
    kicker: "01",
    title: "Zero Bureaucracy",
    body: "We own the entire stack — from interactive frontends and AI voice pipelines to backend infrastructure. No handoffs, no endless meetings, just products that work.",
  },
  {
    kicker: "02",
    title: "Self-Hosted by Default",
    body: "When a managed service gets in the way, it gets replaced. We build robust, independent systems because they should exist, not because they are trendy.",
  },
  {
    kicker: "03",
    title: "Ship, Sell, Reinvest",
    body: "Every product is built to reach production, deliver value, and fund the next innovation. No investors, no runway anxiety — just a sustainable loop.",
  },
];

const TEAM = [
  {
    name: "Sardor",
    role: "Founder & CEO",
    bio: "Builds and ships the core stack — architecting the frontend, backend, and infrastructure.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894744/photo_2026-09-08_22.11.45_ozmn34.jpg",
  },
  {
    name: "Guliruhsar",
    role: "Voice Actor",
    bio: "The voice breathing life into Miransas's AI audio and advanced TTS models.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894765/ChatGPT_Image_Sep_8_2026_10_11_10_PM_ovrglt.png",
  },
  {
    name: "Efe Kaya",
    role: "Backend Developer",
    bio: "Engineers high-performance backend systems and scales the infrastructure.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894746/PhotoshopExtension_Image_yi5uaz.png",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen selection:bg-[#8CFF2E] selection:text-black">
      <div style={{ width: '100%', height: '1250px', position: 'absolute' }}>
        <SideRays
          speed={2.8}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={3}
          spread={2.4}
          origin="top-left"
          tilt={7}
          saturation={2}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>
      <section>
        {/* Hero */}
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <Reveal>
            <p className="font-mono text-[11px] tracking-wide text-[#8CFF2E] mb-4">
              EST. 2023
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[2.5rem] md:text-[4rem] leading-[1.1] font-bold text-white tracking-tight">
              Independent. Self-funded. <br />
              <span className="text-white/60">Built to scale.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Miransas started in 2023 as a one-person effort and evolved into a highly focused team building real software.
              No outside funding, no roadmap decided by a committee. We build AI voice tools, robust web applications,
              and infrastructure that simply ships.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="mx-auto max-w-6xl px-5 md:px-8 pb-20 md:pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="h-full rounded-[24px] border border-white/10 bg-[#0a0a0a] p-8 transition-colors hover:bg-[#111] hover:border-white/20">
                  <p className="font-mono text-[11px] tracking-wide text-[#8CFF2E]">
                    {p.kicker}
                  </p>
                  <h3 className="mt-5 text-2xl leading-tight tracking-tight text-white font-bold">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-[24px] border border-white/10 bg-[#0a0a0a] p-10 text-center">
            <Reveal delay={0.1}>
              <p className="text-4xl font-bold text-white">2023</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-stone-500 font-mono">Founded</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-4xl font-bold text-white">3</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-stone-500 font-mono">Core Members</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-4xl font-bold text-[#8CFF2E]">0</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-[#8CFF2E]/60 font-mono">Investors</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-4xl font-bold text-white">4</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-stone-500 font-mono">Products Shipped</p>
            </Reveal>
          </div>
        </div>

        {/* Team Section */}
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <Reveal>
            <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-tight">The Team</h2>
          </Reveal>
          {/* Buraya kendi TeamSection component'in gelecek, TEAM array'ini prop olarak da geçebilirsin */}
          <TeamSection />
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-4xl px-6 pb-24 md:pb-32 pt-10 text-center">
          <Reveal delay={0.2}>
            <GlowButton href="https://github.com/miransas" color="emerald" size="lg">
              Explore Our Products
            </GlowButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;