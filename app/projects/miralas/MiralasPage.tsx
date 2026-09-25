"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  Brain,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Cpu,
  FlaskConical,
  Globe2,
  Headphones,
  Lock,
  Mic2,
  Play,
  Radio,
  SlidersHorizontal,
  Sparkles,

  Zap,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import RobotEyes from "../../../components/shared/RobotEyes";
import { FaFileWaveform } from "react-icons/fa6";



const LANGUAGES = [
  {
    name: "Uzbek",
    label: "Native focus",
    status: "Core",
    description:
      "Miralas'ın ana araştırma hattı. Doğal telaffuz, ritim ve Özbekçe konuşma davranışı üzerine çalışıyoruz.",
  },
  {
    name: "Turkish",
    label: "Turkic track",
    status: "Research",
    description:
      "Türkçe için ayrı konuşma karakterleri ve doğal prosodi üzerinde deneyler yapılıyor.",
  },
  {
    name: "Azerbaijani",
    label: "Turkic track",
    status: "Research",
    description:
      "Türk dilleri ailesindeki aktarılabilir özellikleri test ettiğimiz araştırma hattı.",
  },
  {
    name: "Kazakh",
    label: "Turkic track",
    status: "Research",
    description:
      "Ses yapısı ve konuşma ritmi açısından araştırılan gelecek dil hattı.",
  },
  {
    name: "Kyrgyz",
    label: "Turkic track",
    status: "Research",
    description:
      "Türk dilleri ailesi kapsamında değerlendirdiğimiz deneysel çalışma alanı.",
  },
];

const PIPELINE = [
  {
    id: "research",
    number: "01",
    title: "Research",
    short: "Araştırma",
    description:
      "Model davranışlarını, veri kalitesini ve hedef dillerin konuşma karakterlerini inceliyoruz.",
    icon: FlaskConical,
  },
  {
    id: "tune",
    number: "02",
    title: "Tune",
    short: "Tune",
    description:
      "Model parametreleri ve inference davranışı üzerinde kontrollü deneyler gerçekleştiriyoruz.",
    icon: SlidersHorizontal,
  },
  {
    id: "finetune",
    number: "03",
    title: "Fine-tune",
    short: "Fine-tune",
    description:
      "Seçilen veri setleri üzerinde modele yeni konuşma örüntüleri kazandırmaya çalışıyoruz.",
    icon: Brain,
  },
  {
    id: "evaluate",
    number: "04",
    title: "Evaluate",
    short: "Evaluation",
    description:
      "Doğallık, telaffuz, tutarlılık ve dil performansını farklı testlerle değerlendiriyoruz.",
    icon: FaFileWaveform,
  },
  {
    id: "release",
    number: "05",
    title: "Release",
    short: "Release",
    description:
      "Testler yeterli seviyeye geldiğinde ürünü kontrollü biçimde yayınlamayı hedefliyoruz.",
    icon: Radio,
  },
];

const MODEL_TRACKS = [
  {
    name: "LLaSA-3B",
    category: "Speech research",
    status: "Testing",
    progress: 72,
    description:
      "3B sınıfındaki speech-language araştırma hattı. Model davranışı ve ses üretim potansiyeli test ediliyor.",
  },
  {
    name: "Chatterbox",
    category: "Multilingual speech",
    status: "Testing",
    progress: 58,
    description:
      "Çok dilli konuşma üretimi için deneysel kullanım. Türk dilleri üzerindeki sonuçlar ayrıca değerlendiriliyor.",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Native first",
    description:
      "Özbekçeyi sonradan eklenen bir dil olarak değil, projenin merkezindeki dil araştırmalarından biri olarak ele alıyoruz.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Data matters",
    description:
      "Model kalitesinin yalnızca model mimarisinden değil, veri ve veri işleme kalitesinden de geldiğine odaklanıyoruz.",
    icon: AudioLines,
  },
  {
    number: "03",
    title: "Iterate constantly",
    description:
      "Tek seferde mükemmel sonuç yerine küçük deneyler, ölçüm, tuning ve tekrar yaklaşımını benimsiyoruz.",
    icon: SlidersHorizontal,
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionEyebrow({
  children,
  icon: Icon = Sparkles,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 backdrop-blur-xl">
      <Icon className="size-3.5 text-rose-300/80" />
      <span>{children}</span>
    </div>
  );
}

function StatusDot({ pulse = true }: { pulse?: boolean }) {
  return (
    <span className="relative flex size-2.5 items-center justify-center">
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-full bg-lime-300/40"
          animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      <span className="relative size-1.5 rounded-full bg-lime-300" />
    </span>
  );
}

function MiniWaveform() {
  const bars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const base = Math.sin(index * 0.72) * 0.5 + 0.5;
        const noise = ((index * 17) % 11) / 18;
        return 16 + Math.round((base * 0.65 + noise * 0.35) * 38);
      }),
    [],
  );

  return (
    <div className="flex h-16 items-center gap-[3px] overflow-hidden">
      {bars.map((height, index) => (
        <motion.span
          key={index}
          className="w-1.5 shrink-0 rounded-full bg-white/30"
          style={{ height }}
          animate={{
            opacity: [0.25, 0.7, 0.25],
            scaleY: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 1.6 + (index % 5) * 0.1,
            repeat: Infinity,
            delay: index * 0.025,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MiralasPage() {
  const [activePipeline, setActivePipeline] = useState("research");

  const { scrollYProgress } = useScroll();

  const heroY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, -110]),
    {
      stiffness: 90,
      damping: 20,
      mass: 0.7,
    },
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.17, 0.35],
    [1, 1, 0],
  );

  const currentPipeline =
    PIPELINE.find((item) => item.id === activePipeline) ?? PIPELINE[0];

  return (
    <main className="relative overflow-hidden mx-auto max-w-full bg-[#020203] text-[#EFEFEF]">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.055),transparent_33%),radial-gradient(circle_at_15%_30%,rgba(244,114,182,0.06),transparent_25%),radial-gradient(circle_at_84%_52%,rgba(168,85,247,0.06),transparent_25%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:80px_80px]" />

        <motion.div
          className="absolute left-[15%] top-[8%] size-[24rem] rounded-full bg-rose-500/5 blur-[120px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 25, 0],
            scale: [1, 1.08, 0.94, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[8%] top-[30%] size-[28rem] rounded-full bg-purple-500/5 blur-[140px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -20, 0],
            scale: [1, 0.92, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-12 pt-24 sm:px-8 lg:px-12"
        >
          <div className="grid flex-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealLeft}
              className="relative z-20 max-w-xl"
            >
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 backdrop-blur-xl">
                <StatusDot />
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                  Miralas / Development build
                </span>
              </div>

              <h1 className="text-balance text-[clamp(3.4rem,7.4vw,7.9rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                A voice
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">
                  built for us.
                </span>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-7 text-white/48 sm:text-lg">
                Miralas, Miransas'ın konuşma zekâsı üzerine yürüttüğü araştırma
                projesi. Özellikle Özbekçe ve Türk dilleri ailesi için doğal,
                akıcı ve karakterli ses üretimi üzerine çalışıyoruz.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document
                      .getElementById("miralas-lab")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group inline-flex items-center gap-3 rounded-full bg-[#EFEFEF] px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white"
                >
                  Explore Miralas
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-medium text-white/72 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  Current status
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/30">
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-lime-300/70" />
                  Active research
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-rose-300/70" />
                  Model tuning
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-purple-300/70" />
                  Fine-tune experiments
                </div>
              </div>
            </motion.div>

            {/* ROBOT */}
            <motion.div
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.15,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative order-first flex min-h-[470px] items-center justify-center lg:order-none lg:min-h-[680px]"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0, 9, 0],
                  rotate: [0, 0.5, 0, -0.5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <RobotEyes />
              </motion.div>

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 52,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.04]"
              />

              <div className="pointer-events-none absolute left-1/2 top-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/[0.035] blur-[70px]" />
            </motion.div>

            {/* RIGHT HUD */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealRight}
              className="relative z-20 ml-auto w-full max-w-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Project telemetry
                </span>

                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-lime-200/55">
                  <StatusDot />
                  Live
                </span>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: -4 }}
                  className="rounded-[28px] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-rose-400/8 text-rose-200/75">
                        <Mic2 className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80">Voice engine</p>
                        <p className="mt-1 text-xs text-white/30">
                          Development pipeline
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-lime-300/10 bg-lime-300/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-lime-200/60">
                      Active
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: -4 }}
                  className="rounded-[28px] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Current focus</p>
                      <p className="mt-1 text-xs text-white/30">
                        Language quality
                      </p>
                    </div>

                    <Globe2 className="size-4 text-purple-200/60" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Uzbek", "Turkish", "Turkic"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/8 px-3 py-1.5 text-[11px] text-white/48"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: -4 }}
                  className="rounded-[28px] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Audio signal</p>
                      <p className="mt-1 text-xs text-white/30">
                        Experimental sample
                      </p>
                    </div>

                    <AudioLines className="size-4 text-rose-200/60" />
                  </div>

                  <MiniWaveform />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* HERO FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center justify-between border-t border-white/[0.06] pt-5"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/20">
              MIRALAS / MIRANSAS
            </span>

            <div className="flex items-center gap-3 text-white/24">
              <span className="text-[10px] uppercase tracking-[0.22em]">
                Scroll to explore
              </span>
              <ArrowDown className="size-3.5" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section
        id="miralas-lab"
        className="relative mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="max-w-4xl"
        >
          <SectionEyebrow icon={Sparkles}>The project</SectionEyebrow>

          <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            We're not shipping
            <br />
            <span className="text-white/35">yet.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/42 sm:text-lg">
            Miralas şu anda aktif geliştirme aşamasında. Veri hazırlama, model
            seçimi, tuning, fine-tuning ve farklı konuşma senaryoları üzerinde
            sürekli deney yapıyoruz.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealLeft}
            className="relative overflow-hidden rounded-[36px] border border-white/8 bg-white/[0.025] p-7 sm:p-9"
          >
            <div className="absolute right-0 top-0 size-64 rounded-full bg-rose-400/[0.035] blur-[90px]" />

            <div className="relative">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/75">Development state</p>
                  <p className="mt-1 text-xs text-white/28">
                    Miralas research environment
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-lime-300/10 bg-lime-300/5 px-3 py-1.5">
                  <StatusDot />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-lime-200/60">
                    In progress
                  </span>
                </div>
              </div>

              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="text-6xl font-semibold tracking-[-0.06em] text-white">
                    03
                  </span>
                  <span className="ml-2 text-xs uppercase tracking-[0.2em] text-white/25">
                    active tracks
                  </span>
                </div>

                <span className="text-xs text-white/25">
                  Research / Audio / Language
                </span>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="mt-6 space-y-3">
                {[
                  "Language research",
                  "Model tuning",
                  "Fine-tune experiments",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-3">
                      <CircleDot className="size-3.5 text-rose-200/45" />
                      <span className="text-sm text-white/48">{item}</span>
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-lime-200/45">
                      active
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealRight}
            className="rounded-[36px] border border-white/8 bg-white/[0.025] p-7 sm:p-9"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] text-purple-200/65">
              <Cpu className="size-5" />
            </div>

            <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">
              Open-ended experimentation.
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/38">
              Hangi modelin son üründe kullanılacağı bugün kesin değil. Farklı
              modelleri ve eğitim yöntemlerini test ediyor, elde ettiğimiz
              sonuçlara göre sonraki iterasyonu belirliyoruz.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {["3B research", "Speech models", "Fine-tuning", "Evaluation"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.02] px-3.5 py-2 text-[11px] text-white/35"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PIPELINE
      ========================================================== */}
      <section className="relative border-y border-white/[0.06] bg-white/[0.01]">
        <div className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
          >
            <SectionEyebrow icon={FlaskConical}>
              Development pipeline
            </SectionEyebrow>

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  From experiment
                  <br />
                  to voice.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white/35">
                Her aşama bir sonraki deneyi besliyor. Burada amaç hızlıca
                yayınlamak değil; doğru sonucu tekrar tekrar ölçmek.
              </p>
            </div>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            {/* STEPS */}
            <div className="space-y-2">
              {PIPELINE.map((step, index) => {
                const Icon = step.icon;
                const active = activePipeline === step.id;

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActivePipeline(step.id)}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                    }}
                    whileHover={{ x: 4 }}
                    className={`group flex w-full items-center gap-5 rounded-[24px] border p-4 text-left transition-all duration-500 ${
                      active
                        ? "border-white/12 bg-white/[0.055]"
                        : "border-transparent bg-transparent hover:border-white/6 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                        active
                          ? "bg-white text-black"
                          : "border border-white/8 bg-white/[0.025] text-white/35"
                      }`}
                    >
                      <Icon className="size-4.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.2em] text-white/20">
                          {step.number}
                        </span>
                        <h3
                          className={`text-sm font-medium transition-colors duration-300 ${
                            active ? "text-white" : "text-white/45"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-xs text-white/20">
                        {step.short}
                      </p>
                    </div>

                    <ChevronRight
                      className={`size-4 transition-all duration-300 ${
                        active
                          ? "translate-x-0 text-white/55"
                          : "-translate-x-2 text-white/0"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* ACTIVE DETAIL */}
            <motion.div
              layout
              className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.025] p-7 sm:p-9"
            >
              <motion.div
                key={currentPipeline.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/20">
                    Current stage
                  </span>

                  <span className="rounded-full border border-rose-300/10 bg-rose-300/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-rose-200/55">
                    {currentPipeline.number}
                  </span>
                </div>

                <h3 className="mt-14 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  {currentPipeline.title}
                </h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/38">
                  {currentPipeline.description}
                </p>

                <div className="mt-12 overflow-hidden rounded-[24px] border border-white/7 bg-black/20 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs text-white/35">
                      Experiment activity
                    </span>

                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-lime-200/50">
                      <StatusDot pulse={false} />
                      Running
                    </span>
                  </div>

                  <MiniWaveform />
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/20">
                      Priority
                    </p>
                    <p className="mt-2 text-sm text-white/58">
                      Language quality
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/20">
                      State
                    </p>
                    <p className="mt-2 text-sm text-white/58">
                      Experimental
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MODELS
      ========================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
        >
          <SectionEyebrow icon={Brain}>Model experiments</SectionEyebrow>

          <h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Different models.
            <br />
            One research direction.
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/37">
            Miralas'ın arkasındaki model seçimi hâlâ gelişim sürecinde. Bu
            nedenle farklı speech ve language modellerini test edip sonuçlarını
            karşılaştırıyoruz.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {MODEL_TRACKS.map((model, index) => (
            <motion.article
              key={model.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.12,
                duration: 0.65,
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.025] p-7 sm:p-9"
            >
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-purple-400/[0.035] blur-[70px] transition-all duration-700 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/22">
                      {model.category}
                    </p>

                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white/82">
                      {model.name}
                    </h3>
                  </div>

                  <span className="rounded-full border border-lime-300/10 bg-lime-300/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-lime-200/55">
                    {model.status}
                  </span>
                </div>

                <p className="mt-7 text-sm leading-7 text-white/35">
                  {model.description}
                </p>

                <div className="mt-9">
                  <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-white/20">Experiment progress</span>
                    <span className="text-white/38">{model.progress}%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${model.progress}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.3,
                        delay: 0.2 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-rose-300/70 via-purple-300/70 to-white/60"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 rounded-[28px] border border-dashed border-white/8 bg-white/[0.018] p-5 text-center"
        >
          <p className="text-xs leading-6 text-white/24">
            Model seçimleri ve oranlar geliştirme sürecine bağlı olarak
            değişebilir. Buradaki göstergeler ürün performansı veya final
            release sözü değildir.
          </p>
        </motion.div>
      </section>

      {/* =========================================================
          LANGUAGES
      ========================================================== */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012]">
        <div className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionEyebrow icon={Globe2}>Language research</SectionEyebrow>

            <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Native Uzbek.
              <br />
              Broader Turkic research.
            </h2>

            <p className="mt-7 text-base leading-8 text-white/37">
              İlk odak noktamız Özbekçe. Bunun yanında Türk dilleri ailesindeki
              benzerlikleri ve ayrışmaları araştırarak gelecekteki dil
              kapsamını genişletmek istiyoruz.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LANGUAGES.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                whileHover={{ y: -6 }}
                className={`group relative min-h-[250px] overflow-hidden rounded-[28px] border p-6 transition-colors duration-500 ${
                  language.name === "Uzbek"
                    ? "border-rose-300/12 bg-rose-300/[0.035]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.035]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/22">
                    {language.label}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] ${
                      language.name === "Uzbek"
                        ? "border-rose-300/10 bg-rose-300/5 text-rose-200/55"
                        : "border-white/7 text-white/25"
                    }`}
                  >
                    {language.status}
                  </span>
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl font-medium tracking-[-0.035em] text-white/78">
                    {language.name}
                  </h3>

                  <p className="mt-4 text-xs leading-6 text-white/30">
                    {language.description}
                  </p>
                </div>

                <div className="absolute bottom-5 right-5 size-2 rounded-full bg-white/10 transition-all duration-500 group-hover:scale-[2]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <SectionEyebrow icon={Zap}>How we approach it</SectionEyebrow>

            <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Built through
              <br />
              iteration.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/34">
            Miralas bir gecede ortaya çıkacak bir ürün değil. Her model,
            dataset ve deney bir sonraki versiyonun parçası.
          </p>
        </motion.div>

        <div className="mt-16 grid border-y border-white/[0.06] lg:grid-cols-3 lg:divide-x lg:divide-white/[0.06]">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.65,
                }}
                className="py-8 lg:px-9 lg:py-10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.22em] text-white/18">
                    {item.number}
                  </span>

                  <Icon className="size-4 text-white/25" />
                </div>

                <h3 className="mt-16 text-xl font-medium tracking-[-0.025em] text-white/72">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/30">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          DEMO / LAB
      ========================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 pb-28 sm:px-8 lg:px-12 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[40px] border border-white/8 bg-white/[0.025]"
        >
          <div className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full bg-rose-400/[0.035] blur-[120px]" />

          <div className="relative grid min-h-[580px] items-center gap-14 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            {/* LEFT */}
            <div>
              <SectionEyebrow icon={Headphones}>Miralas lab</SectionEyebrow>

              <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Hear it
                <br />
                when it's ready.
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/34">
                Gerçek zamanlı demo, voice cloning ve public API erişimi henüz
                açık değil. Model yeterli test seviyesine geldiğinde bu alan
                doğrudan çalışan bir deneyim haline gelecek.
              </p>

              <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.025] px-4 py-2.5">
                <Lock className="size-3.5 text-white/25" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Demo locked
                </span>
              </div>
            </div>

            {/* RIGHT LAB */}
            <div className="relative">
              <div className="overflow-hidden rounded-[32px] border border-white/8 bg-black/25">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="size-2 rounded-full bg-white/10" />
                      <span className="size-2 rounded-full bg-white/10" />
                      <span className="size-2 rounded-full bg-white/10" />
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                      miralas.playground
                    </span>
                  </div>

                  <Lock className="size-3.5 text-white/20" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="rounded-[24px] border border-white/7 bg-white/[0.018] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70">
                          Experimental voice
                        </p>
                        <p className="mt-1 text-xs text-white/25">
                          Uzbek / Turkic research build
                        </p>
                      </div>

                      <button
                        disabled
                        className="flex size-11 cursor-not-allowed items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/20"
                      >
                        <Play className="ml-0.5 size-4" />
                      </button>
                    </div>

                    <div className="mt-8 opacity-40">
                      <MiniWaveform />
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Voice", "Experimental"],
                        ["Language", "Uzbek"],
                        ["Access", "Locked"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/6 bg-white/[0.02] p-4"
                        >
                          <p className="text-[9px] uppercase tracking-[0.18em] text-white/18">
                            {label}
                          </p>
                          <p className="mt-2 text-xs text-white/40">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-[22px] border border-dashed border-white/7 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Code2 className="size-4 text-white/20" />
                      <span className="text-xs text-white/28">
                        API access
                      </span>
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/18">
                      Coming later
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/[0.035] blur-[140px]" />

        <div className="relative mx-auto max-w-[1000px] px-5 py-32 text-center sm:px-8 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SectionEyebrow icon={Sparkles}>MIRALAS</SectionEyebrow>

            <h2 className="text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-8xl">
              A voice in
              <br />
              the making.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/32 sm:text-base">
              Miralas gelişiyor. Yeni modeller, yeni veri setleri ve yeni
              deneylerle bu sayfa da birlikte büyüyecek.
            </p>

            <motion.button
              whileHover={{
                y: -3,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#EFEFEF] px-7 py-4 text-sm font-medium text-black"
            >
              Follow the project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}