'use client';

import { ArrowUpRight, BrainCircuit, Cpu, Globe2, HeartHandshake, Sparkles, Target, Users, Waypoints } from 'lucide-react';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

import Link from 'next/link';
import { useMediaQuery } from '@/lib/use-media-query';
import { useRef, type ComponentType } from 'react';
import RobotEyes from './RobotEyes';

/* =========================================================
   TYPES
========================================================= */

type IconComponent = ComponentType<{
  className?: string;
}>;

type AboutBlock = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconComponent;
};

/* =========================================================
   CONTENT
   Metinleri sonradan rahatça değiştir.
========================================================= */

const ABOUT_BLOCKS: AboutBlock[] = [
  {
    number: '01',
    eyebrow: 'Who we are',
    title: 'A small team building useful intelligence.',
    description: 'Miransas is an independent technology studio focused on voice, conversational AI, and intelligent software experiences.',
    icon: Users,
  },

  {
    number: '02',
    eyebrow: 'What we build',
    title: 'Interfaces that can listen, understand, and act.',
    description: 'We build systems where AI is not just a chat box, but a useful layer inside products, services, and everyday workflows.',
    icon: BrainCircuit,
  },

  {
    number: '03',
    eyebrow: 'How we think',
    title: 'Technology should feel natural.',
    description: 'The best AI experiences disappear into the product. We care about clarity, responsiveness, good interaction design, and technology that feels human.',
    icon: HeartHandshake,
  },

  {
    number: '04',
    eyebrow: "Where we're going",
    title: 'From voice models to intelligent agents.',
    description: 'Our long-term direction is to connect voice, language, automation, and action into experiences people can actually use.',
    icon: Target,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getAccent() {
  return {
    icon: 'border-border bg-card text-foreground',
    glow: 'bg-foreground/[0.025]',
    line: 'bg-foreground/40',
  };
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export function AboutContent() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const robotY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const robotScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  const centerGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.55]);

  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-foreground/[0.025] absolute top-[8%] left-[-140px] h-[420px] w-[420px] rounded-full blur-[140px]" />

        <div className="bg-foreground/[0.025] absolute top-[18%] right-[-160px] h-[480px] w-[480px] rounded-full blur-[150px]" />

        <div className="bg-foreground/[0.025] absolute top-[42%] left-1/2 h-[550px] w-[750px] -translate-x-1/2 rounded-full blur-[160px]" />

        <div className="absolute inset-0 bg-transparent" />
      </div>

      <section ref={heroRef} className="relative z-10 min-h-[105vh] overflow-hidden">
        <div className="mx-auto flex min-h-[105vh] max-w-7xl flex-col px-6 pt-28 pb-20 lg:px-8 lg:pt-36">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="border-border bg-card text-muted-foreground mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase backdrop-blur-xl"
          >
            <Sparkles className="text-muted-foreground size-3.5" />
            About Miransas
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.75,
            }}
            className="relative z-10 mx-auto mt-7 max-w-3xl text-center"
          >
            <h1 className="text-foreground text-[44px] leading-[0.98] tracking-[-0.04em] sm:text-[58px] md:text-[70px] lg:text-[78px]">
              We build technology
              <br />
              <span className="text-foreground">that feels alive.</span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base">Miransas is an independent software studio exploring what happens when artificial intelligence becomes a natural part of everyday products and services.</p>
          </motion.div>

          <motion.div
            style={{
              y: reduce || !desktop ? 0 : robotY,
              scale: reduce || !desktop ? 1 : robotScale,
            }}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              ease: 'easeOut',
            }}
            className="relative mx-auto mt-8 flex flex-1 items-end justify-center lg:mt-0"
          >
            <motion.div
              style={{
                opacity: centerGlowOpacity,
              }}
              className="bg-foreground/[0.025] pointer-events-none absolute bottom-[8%] left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full blur-[110px]"
            />

            <div className="relative z-10 aspect-square w-[min(85vw,590px)]">
              <RobotEyes />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.7,
            }}
            className="mx-auto mt-2 flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground text-[9px] tracking-[0.24em] uppercase">Scroll to explore</span>

            <span className="from-foreground/25 h-8 w-px bg-gradient-to-b to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="border-border relative z-10 border-t">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-[0.7fr_1.3fr] md:items-start lg:px-8 lg:py-32">
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <span className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">The idea</span>

            <h2 className="text-foreground mt-4 max-w-sm text-3xl font-medium tracking-[-0.04em] sm:text-4xl">AI should become useful before it becomes impressive.</h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              delay: 0.08,
            }}
            className="text-muted-foreground max-w-2xl space-y-5 text-sm leading-7 sm:text-base"
          >
            <p>Miransas explores voice, language, automation, and agent-based software with one simple goal: build systems people can actually use.</p>

            <p>We care about the experience around the model as much as the model itself. A powerful system should still feel clear, fast, approachable, and intentional.</p>

            <p>Our work moves between research and product — from voice models and multilingual speech to the interfaces that turn those capabilities into useful experiences.</p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {ABOUT_BLOCKS.map((block, index) => {
              const Icon = block.icon;

              const accent = getAccent();

              return (
                <motion.article
                  key={block.number}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-60px',
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.07,
                  }}
                  className="group border-border bg-card hover:border-border hover:bg-card relative min-h-[330px] overflow-hidden rounded-[30px] border p-6 backdrop-blur-xl transition-all duration-300 sm:p-7"
                >
                  <div className={`pointer-events-none absolute -top-20 -right-20 size-48 rounded-full ${accent.glow} opacity-50 blur-[80px] transition-opacity group-hover:opacity-100`} />

                  <div className="relative flex items-center justify-between">
                    <div className={`flex size-11 items-center justify-center rounded-2xl border ${accent.icon}`}>
                      <Icon className="size-5" />
                    </div>

                    <span className="text-muted-foreground font-mono text-[10px] tracking-[0.15em]">{block.number}</span>
                  </div>

                  <div className="relative mt-14">
                    <span className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase">{block.eyebrow}</span>

                    <h3 className="text-foreground mt-3 max-w-md text-2xl leading-tight font-medium tracking-[-0.035em]">{block.title}</h3>

                    <div className={`mt-5 h-px w-8 ${accent.line} opacity-60 transition-all group-hover:w-14`} />

                    <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-7">{block.description}</p>
                  </div>

                  <ArrowUpRight className="text-muted-foreground group-hover:text-muted-foreground absolute right-6 bottom-6 size-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-border relative z-10 border-y">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Sparkles,
              label: 'Curious',
              text: 'We explore what is possible.',
            },
            {
              icon: Target,
              label: 'Intentional',
              text: 'We build with a reason.',
            },
            {
              icon: Waypoints,
              label: 'Practical',
              text: 'Useful beats impressive.',
            },
            {
              icon: Globe2,
              label: 'Open',
              text: 'Built for a global audience.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            const accent = getAccent();

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                className="border-border p-6 sm:border-b sm:last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className={`flex size-8 items-center justify-center rounded-xl border ${accent.icon}`}>
                  <Icon className="size-4" />
                </div>

                <h3 className="text-foreground mt-5 text-sm font-medium">{item.label}</h3>

                <p className="text-muted-foreground mt-1 text-xs leading-6">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 overflow-hidden">
        <div className="bg-foreground/[0.025] pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="border-border bg-card mx-auto flex size-11 items-center justify-center rounded-2xl border">
              <Cpu className="text-muted-foreground size-5" />
            </div>

            <p className="text-muted-foreground mt-7 text-[10px] tracking-[0.22em] uppercase">The next chapter</p>

            <h2 className="text-foreground mx-auto mt-4 max-w-3xl text-3xl leading-tight font-medium tracking-[-0.045em] sm:text-4xl md:text-5xl">
              We&#39;re still early.
              <br />
              That&#39;s the interesting part.
            </h2>

            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-sm leading-7">More voices, more languages, smarter agents, and more useful ways to interact with software are already on the way.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/projects" className="bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-lg px-5 text-sm font-medium">
                Explore our projects
              </Link>
              <Link href="/contact" className="border-border hover:bg-secondary inline-flex min-h-11 items-center rounded-lg border px-5 text-sm font-medium">
                Get in touch
              </Link>
            </div>
            <div className="border-border bg-card text-muted-foreground mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] tracking-[0.17em] uppercase">
              <span className="bg-foreground size-1.5 rounded-full" />
              Building in public
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
