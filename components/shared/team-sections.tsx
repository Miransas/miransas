"use client";


import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Reveal } from "./reval";
import { GlowCard } from "../ui/glow-card";

type SocialLinks = {
  instagram?: string;
  github?: string;
  x?: string;
};

const TEAM: {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: SocialLinks;
}[] = [
    {
      name: "Sardor",
      role: "Founder & Engineer",
      bio: "Founded Miransas in 2023 and builds the core stack end-to-end — frontend, backend, infra, and billing.",
      image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894744/photo_2026-09-08_22.11.45_ozmn34.jpg",
      social: {
        instagram: "https://instagram.com/asardorazimov",
        github: "https://github.com/sardorazimov",
        x: "https://x.com/asardorazimov",
      },
    },
    {
      name: "Guliruhsar",
      role: "Voice Actor",
      bio: "Brings the voice behind Miransas's audio and TTS products to life — recording reference samples and reviewing synthesized output.",
      image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894765/ChatGPT_Image_Sep_8_2026_10_11_10_PM_ovrglt.png",
      social: {
        instagram: "https://instagram.com/guliruhsar.msn",
        x: "https://x.com/TODO_guliruhsar",
      },
    },
    {
      name: "Efe Kaya",
      role: "Backend Developer",
      bio: "Works on backend systems and infrastructure across the product lineup — APIs, databases, and production plumbing.",
      image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894746/PhotoshopExtension_Image_yi5uaz.png",
      social: {
        instagram: "https://instagram.com/efe_kaaya35",
        github: "https://github.com/efekaya35",
        x: "https://x.com/efekaya1510",
      },
    },
  ];

function SocialRow({ social }: { social: SocialLinks }) {
  const items = [
    { key: "instagram", href: social.instagram, Icon: FaInstagram },
    { key: "github", href: social.github, Icon: FaGithub },
    { key: "x", href: social.x, Icon: FaXTwitter },
  ].filter((item) => item.href);

  if (items.length === 0) return null;

  return (
    <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
      {items.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 dark:text-stone-400 text-stone-700 transition-colors hover:border-[#8CFF2E]/50 hover:text-[#8CFF2E]"
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
export function TeamSection() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
      <p className="mb-3 text-center font-mono text-[11px] font-semibold tracking-wide text-emerald-600 uppercase">
        THE TEAM
      </p>
      <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
        Three people, real products.
      </h2>

      {/* Grid boşluğu gap-8 yapıldı */}
      <div className="grid gap-8 md:grid-cols-3">
        {TEAM.map((member) => (
          <div key={member.name} color="emerald" className="group relative flex h-full flex-col rounded-2xl bg-stone-100 transition-all hover:scale-[1.01]  hover:bg-[#0a0a0a]  dark:bg-stone-900">
            <article className="flex h-full flex-col">
              {/* Fotoğraf oranı aspect-[4/5] ile dikey uzatıldı */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full  object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight dark:text-stone-300 text-stone-500">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-semibold tracking-wide uppercase text-emerald-600">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-stone-600">
                    {member.bio}
                  </p>
                </div>
                <SocialRow social={member.social} />
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}