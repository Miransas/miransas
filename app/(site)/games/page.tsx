import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gamepad2, Lock } from "lucide-react";
import { RoutePage } from "@/components/shared/route-page";

const games = [
  {
    title: "Lost Signal",
    chapter: "Chapter I",
    status: "Available",
    description: "A psychological first chapter built around a late shift, a stranger, and a signal that refuses to stay quiet.",
    image: "/images/lostsignal-1.png",
    href: "/games/lostsignal",
    active: true,
  },
  {
    title: "Lost Signal II",
    chapter: "Chapter II",
    status: "In production",
    description: "The next transmission expands the world, systems, and story language of the Lost Signal universe.",
    image: "/images/lostsignal-banner.png",
    href: "/games",
    active: false,
  },
  {
    title: "Experimental builds",
    chapter: "Prototype",
    status: "Private",
    description: "Small game systems and atmosphere tests that feed future Miransas interactive projects.",
    image: "/images/lost.png",
    href: "/games",
    active: false,
  },
];

export const metadata = {
  title: "Games — Miransas",
  description: "Interactive games and experiments by Miransas.",
};

export default function GamesPage() {
  return (
    <main
    >
    <section className="">
     <div>

     </div>
    </section>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex items-center gap-3">
          <Gamepad2 className="size-6 text-[#8CFF2E]" />
          <h2 className="text-3xl font-semibold tracking-tight text-white">Game archive</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.title}
              href={game.href}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition hover:-translate-y-1 hover:border-[#8CFF2E]/40"
            >
              <div className="relative aspect-[16/10] bg-black">
                <Image src={game.image} alt={game.title} fill className="object-cover opacity-70 transition group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                  {game.status}
                </span>
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">{game.chapter}</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{game.title}</h3>
                  {game.active ? <ArrowRight className="size-4 text-zinc-500 group-hover:text-[#8CFF2E]" /> : <Lock className="size-4 text-zinc-600" />}
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{game.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
