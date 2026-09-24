"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { ShaderAnimation } from "../shaders/shader";
import { GlowButton } from "../ui/glow-button";
import RobotEyes from "./RobotEyes";

export function HeroScroll() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /*
   * =====================================================
   * TEXT
   * =====================================================
   */

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -70]
  );

  /*
   * =====================================================
   * BACKGROUND
   * =====================================================
   */

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 140]
  );

  const shaderY = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    [0, -100]
  );

  /*
   * =====================================================
   * ROBOT
   * =====================================================
   *
   * Robot ilk anda aşağıda.
   * Scroll sırasında çok hafif yükseliyor.
   */

  const robotY = useTransform(
    scrollYProgress,
    [0, 0.75],
    [35, -35]
  );

  const robotScale = useTransform(
    scrollYProgress,
    [0, 0.7],
    [0.94, 1]
  );

  /*
   * =====================================================
   * GRASS
   * =====================================================
   *
   * Başlangıçta tamamen aşağıda.
   * Scroll ile yukarı çıkıyor.
   */

  const grassY = useTransform(
    scrollYProgress,
    [0, 0.88],
    ["125%", "8%"]
  );

  const grassScale = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1.04, 1]
  );

  /*
   * =====================================================
   * SCROLL CUE
   * =====================================================
   */

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative h-[250vh] bg-[#020302]"
    >
      {/* =================================================
          STICKY SCENE
      ================================================= */}

      <div
        className="sticky top-0 h-screen w-full overflow-hidden isolate"
      >
        {/* =================================================
            SHADER
        ================================================= */}

        <motion.div
          style={{
            y: shaderY,
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <ShaderAnimation />
        </motion.div>

        {/* =================================================
            BACKGROUND
        ================================================= */}

        <motion.div
          style={{
            y: bgY,
          }}
          className="absolute inset-0 -top-24 z-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/images/hero.jpg)",

              filter:
                "brightness(0.42) saturate(0.85) contrast(1.05)",
            }}
          />

          <div
            className="absolute inset-0 bg-linear-to-b from-black via-black/35 to-black"
          />
        </motion.div>

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="absolute left-6 top-[18%] z-50 w-[calc(100vw-3rem)] max-w-[680px] md:left-[7vw] md:top-[23%] lg:left-[8vw] lg:top-[25%]"
        >
          {/* BADGE */}

          <motion.span
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="inline-flex whitespace-nowrap rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[11px] tracking-wide text-white/70 backdrop-blur"
          >
            Miransas Projects
          </motion.span>

          {/* TITLE */}

          <motion.h1
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.75,
              ease: "easeOut",
            }}
            className="mt-6 w-full max-w-none text-left whitespace-normal break-normal text-[38px] leading-[1.08] tracking-[-0.045em] text-[#fff3f0] sm:text-[46px] md:text-[56px] md:leading-[1.08]"
          >
            Push the limits with flawless voice cloning.
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.38,
              duration: 0.75,
              ease: "easeOut",
            }}
            className="mt-6 max-w-[560px] text-left text-[14px] leading-6 text-white/65 md:text-[15px] md:leading-7"
          >
            Miralas provides studio-quality multilingual
            text-to-speech and advanced voice synthesis
            infrastructure for creators and developers.
          </motion.p>

          {/* BUTTONS */}

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
              delay: 0.5,
              duration: 0.7,
            }}
            className="mt-7 flex flex-nowrap items-center gap-3"
          >
            <GlowButton
              href="/about"
              color="rose"
            >
              Explore the project
            </GlowButton>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("next-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="h-10 rounded-full border border-white/10 bg-white/[0.035] px-4 text-sm text-white/60 backdrop-blur transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              See how it works
            </button>
          </motion.div>
        </motion.div>

        {/* =================================================
    RIGHT AI ORBIT / HUD
================================================= */}

        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="pointer-events-none absolute right-[6vw] top-[20%] z-40 hidden md:block w-[320px] lg:w-[380px] h-[360px]"
        >
          {/* Main orbital ring */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] [mask-image:linear-gradient( to_right, transparent, black_18%, black_82%, transparent )]"
          >
            {/* orbital light */}

            <div
              className="absolute -top-[2px] left-1/2 h-1 w-1 rounded-full bg-[#EFEFEF] shadow-[0_0_12px_rgba(239,239,239,.8)]"
            />

            <div
              className="absolute right-[26px] top-[54px] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(216,180,254,.75)]"
            />

            <div
              className="absolute bottom-[36px] left-[48px] h-1.5 w-1.5 rounded-full bg-rose-300 shadow-[0_0_14px_rgba(253,164,175,.7)]"
            />
          </motion.div>

          {/* Secondary orbit */}

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/[0.07] rotate-[35deg]"
          />

          {/* Center glow */}

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-purple-300/[0.035] blur-3xl"
          />

          {/* =================================================
      01 / VOICE AI
  ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.75,
              duration: 0.8,
            }}
            className="absolute right-0 top-[28px] flex items-center gap-3"
          >
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-white/30"
            >
              01
            </span>

            <div
              className="h-px w-8 bg-gradient-to-r from-transparent to-white/20"
            />

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.16em] text-white/40"
              >
                Voice AI
              </p>

              <p
                className="mt-1 text-xs text-white/65"
              >
                Neural synthesis
              </p>
            </div>
          </motion.div>

          {/* =================================================
      02 / LANGUAGES
  ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="absolute right-[20px] top-[150px] flex items-center gap-3"
          >
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-white/30"
            >
              02
            </span>

            <div
              className="h-px w-6 bg-gradient-to-r from-transparent to-purple-300/25"
            />

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.16em] text-white/40"
              >
                Multilingual
              </p>

              <p
                className="mt-1 text-xs text-white/65"
              >
                128+ languages
              </p>
            </div>
          </motion.div>

          {/* =================================================
      03 / REAL TIME
  ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 1.05,
              duration: 0.8,
            }}
            className="absolute right-[12px] bottom-[32px] flex items-center gap-3"
          >
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-white/30"
            >
              03
            </span>

            <div
              className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300/20"
            />

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.16em] text-white/40"
              >
                Real-time
              </p>

              <div
                className="mt-1 flex items-center gap-2"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_rgba(181,255,54,.8)]"
                />

                <span
                  className="text-xs text-white/65"
                >
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* tiny floating particles */}

          <motion.span
            animate={{
              y: [-8, 8, -8],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[42px] top-[82px] h-1 w-1 rounded-full bg-rose-200 shadow-[0_0_10px_rgba(251,207,232,.8)]"
          />

          <motion.span
            animate={{
              y: [7, -7, 7],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[108px] left-[76px] h-1 w-1 rounded-full bg-purple-200 shadow-[0_0_10px_rgba(221,214,254,.7)]"
          />
        </motion.div>

        {/* =================================================
            ROBOT
        ================================================= */}

        <motion.div
          style={{
            y: robotY,
            scale: robotScale,
          }}
          className="absolute left-1/2 bottom-[-19vh] z-20 -translate-x-1/2 pointer-events-none"
        >
          <div
            className="relative w-[430px] h-[430px] sm:w-[500px] sm:h-[500px] md:w-[590px] md:h-[590px] lg:w-[650px] lg:h-[650px]"
          >
            <RobotEyes />
          </div>
        </motion.div>

        {/* =================================================
            GRASS
        ================================================= */}

        <motion.div
          style={{
            y: grassY,
            scale: grassScale,
          }}
          className="absolute left-0 right-0 bottom-0 z-30 origin-bottom pointer-events-none select-none will-change-transform"
        >
          <img
            src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790283621/ChatGPT_Image_24_Eyl_2026_23_58_07_wn8bog.png"
            alt=""
            draggable={false}
            className="block w-full h-auto min-w-full"
          />
        </motion.div>
        <div
          className="absolute inset-x-0 bottom-0 z-40 h-[18vh] pointer-events-none bg-gradient-to-t from-black via-black/35 to-transparent"
        />

      </div>
    </section>
  );
}