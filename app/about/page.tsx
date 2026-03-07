/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import AboutHero from "../../components/shared/about-hero";



const page = () => {
  return (
    <div>
      <Hero />
      <AboutHero />
    </div>
  )
}

export default page

const GRID_SIZE = 6;

// Positions to EXCLUDE from having bulbs (row, col) - 0-indexed
// Add or remove positions here to configure which intersections have bulbs
const EXCLUDED_POSITIONS: { row: number; col: number }[] = [
  { row: 0, col: 0 }, // Row 1, Column 2 (0-indexed: row 0, col 1)
  { row: 0, col: 1 }, // Row 1, Column 2 (0-indexed: row 0, col 1)
  { row: 0, col: 2 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
];

// Helper to check if a position is excluded
const isExcluded = (row: number, col: number) =>
  EXCLUDED_POSITIONS.some((pos) => pos.row === row && pos.col === col);

// Generate bulb positions, filtering out excluded ones
const BULB_POSITIONS = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) => ({ row, col })),
)
  .flat()
  .filter((pos) => !isExcluded(pos.row, pos.col));

type BulbState = "off" | "flickering" | "on" | "fused";

// Spark particle type
type Spark = {
  id: number;
  angle: number; // Direction in radians
  distance: number; // How far to travel
  duration: number; // Animation duration
  size: number; // Spark size
  color: string; // Yellow or orange
};

export const Hero = () => {
  const [bulbStates, setBulbStates] = useState<BulbState[]>(() =>
    BULB_POSITIONS.map(() => "off"),
  );
  const [phase, setPhase] = useState<"startup" | "allOn" | "fusing">("startup");
  const flickerTimeouts = useRef<NodeJS.Timeout[]>([]);

  // Calculate illumination level based on how many bulbs are on/flickering
  const illumination = React.useMemo(() => {
    if (phase === "allOn" || phase === "fusing") return 1;

    const onCount = bulbStates.filter((s) => s === "on").length;
    const flickeringCount = bulbStates.filter((s) => s === "flickering").length;
    const total = BULB_POSITIONS.length;

    // On bulbs count fully, flickering count as half
    const level = (onCount + flickeringCount * 0.5) / total;

    // Start at 0.2 brightness (dark), end at 1 (fully lit)
    return 0.2 + level * 0.8;
  }, [bulbStates, phase]);

  // Phase 1: Startup - bulbs flicker on one by one
  useEffect(() => {
    // Clear any existing timeouts
    flickerTimeouts.current.forEach(clearTimeout);
    flickerTimeouts.current = [];

    // Shuffle the order for random startup sequence
    const shuffledIndices = [...Array(BULB_POSITIONS.length).keys()].sort(
      () => Math.random() - 0.5,
    );

    shuffledIndices.forEach((bulbIndex, orderIndex) => {
      // Stagger the start time for each bulb
      const startDelay = orderIndex * 80; // 80ms between each bulb starting

      const timeout = setTimeout(() => {
        // Start flickering
        setBulbStates((prev) => {
          const newStates = [...prev];
          newStates[bulbIndex] = "flickering";
          return newStates;
        });

        // Flicker a few times then turn on
        const flickerCount = 2 + Math.floor(Math.random() * 4); // 2-5 flickers
        let flickerNum = 0;

        const flickerInterval = setInterval(
          () => {
            setBulbStates((prev) => {
              const newStates = [...prev];
              newStates[bulbIndex] = flickerNum % 2 === 0 ? "on" : "flickering";
              return newStates;
            });
            flickerNum++;

            if (flickerNum >= flickerCount * 2) {
              clearInterval(flickerInterval);
              setBulbStates((prev) => {
                const newStates = [...prev];
                newStates[bulbIndex] = "on";
                return newStates;
              });
            }
          },
          50 + Math.random() * 100,
        ); // Random flicker speed

        flickerTimeouts.current.push(
          flickerInterval as unknown as NodeJS.Timeout,
        );
      }, startDelay);

      flickerTimeouts.current.push(timeout);
    });

    // After all bulbs are on, move to allOn phase
    const allOnTimeout = setTimeout(
      () => {
        setPhase("allOn");
        setBulbStates(BULB_POSITIONS.map(() => "on"));
      },
      BULB_POSITIONS.length * 80 + 1500,
    );

    flickerTimeouts.current.push(allOnTimeout);

    return () => {
      flickerTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Phase 2 & 3: All on, then random fusing
  useEffect(() => {
    if (phase !== "allOn") return;

    // Start fusing after a brief moment of all lights on
    const startFusingTimeout = setTimeout(() => {
      setPhase("fusing");
    }, 2000);

    return () => clearTimeout(startFusingTimeout);
  }, [phase]);

  // Fusing logic - random bulbs fuse and come back
  useEffect(() => {
    if (phase !== "fusing") return;

    const fuseIntervals: NodeJS.Timeout[] = [];

    // Each bulb has a chance to fuse randomly
    BULB_POSITIONS.forEach((_, index) => {
      const checkFuse = () => {
        const shouldFuse = Math.random() < 0.08; // 8% chance to fuse each check

        if (shouldFuse) {
          // Fuse the bulb
          setBulbStates((prev) => {
            const newStates = [...prev];
            newStates[index] = "fused";
            return newStates;
          });

          // Bring it back after random delay with flicker
          const comeBackDelay = 800 + Math.random() * 2000;
          setTimeout(() => {
            // Flicker before coming back
            setBulbStates((prev) => {
              const newStates = [...prev];
              newStates[index] = "flickering";
              return newStates;
            });

            setTimeout(() => {
              setBulbStates((prev) => {
                const newStates = [...prev];
                newStates[index] = "on";
                return newStates;
              });
            }, 150);
          }, comeBackDelay);
        }
      };

      // Check for fusing at random intervals
      const interval = setInterval(checkFuse, 500 + Math.random() * 1000);
      fuseIntervals.push(interval);
    });

    // Periodically turn all lights on together
    const allOnInterval = setInterval(() => {
      setBulbStates(BULB_POSITIONS.map(() => "on"));
    }, 8000);

    return () => {
      fuseIntervals.forEach(clearInterval);
      clearInterval(allOnInterval);
    };
  }, [phase]);

  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative overflow-hidden py-16 perspective-[1800px] sm:py-24 md:py-32 lg:py-40">
      {/* Steel Grid Background */}

      <div className="pointer-events-none absolute inset-0 hidden translate-x-10 -rotate-y-50 -mask-linear-50 mask-linear-from-60% mask-linear-to-80% sm:block sm:translate-x-20 md:translate-x-32 lg:translate-x-40">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:42px_42px]",
            "[background-image:linear-gradient(to_right,var(--color-neutral-800),transparent_1px),linear-gradient(to_bottom,var(--color-neutral-800),transparent_1px)]",
          )}
        />
        <SteelGrid bulbStates={bulbStates} phase={phase} />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12"
        initial={{
          filter: `brightness(0.2)`,
        }}
        animate={{
          filter: [
            `brightness(0.2)`,
            `brightness(0.5)`,
            `brightness(0.3)`,
            `brightness(0.7)`,
            `brightness(0.4)`,
            `brightness(0.8)`,
            `brightness(1)`,
          ],
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <h1 className="font-manrope text-left text-3xl font-bold tracking-tight text-white text-shadow-lg text-shadow-white/20 sm:text-4xl md:text-5xl lg:text-6xl">
          Get Miransas <br className="hidden sm:block" /> Studio Software & Game 
        </h1>
        <p className="mt-3 max-w-xl text-lg font-light text-neutral-400 sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl">
          Sardor Azimov tarafından kurulan Miransas Studio, yüksek performanslı yazılım sistemleri ve atmosferik interaktif 
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6 md:mt-12 md:gap-8">
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition duration-150 hover:shadow-lg hover:shadow-white/10"
          >
            Explore templates
          </button>
          <button className="cursor-pointer text-sm text-neutral-400 sm:text-base">
            Checkout 20+ categories &rarr;
          </button>
        </div>
        <div className="relative mt-8 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 p-px sm:mt-10 sm:rounded-2xl md:mt-12 md:rounded-3xl">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="absolute -top-px -left-5 z-10 h-20 w-32 bg-[radial-gradient(ellipse_at_top_left,_white_0%,_transparent_70%)] sm:-left-8 sm:h-28 sm:w-40 md:-left-10 md:h-40 md:w-60"></div>
            <div className="absolute top-0 left-5 h-px w-32 bg-[radial-gradient(ellipse_at_top,_white,_transparent)] blur-[2px] sm:left-8 sm:w-40 md:left-10 md:w-60"></div>
            <div className="absolute top-0 left-5 h-px w-32 bg-[radial-gradient(ellipse_at_top,_white,_transparent)] blur-[4px] sm:left-8 sm:w-40 md:left-10 md:w-60"></div>
          </motion.div>
          <motion.div>
            <div className="absolute -top-px -right-5 z-10 h-20 w-40 bg-[radial-gradient(ellipse_at_top_right,var(--color-yellow-500)_0%,_transparent_70%)] sm:-right-8 sm:h-28 sm:w-60 md:-right-10 md:h-40 md:w-80"></div>
            <div className="absolute top-0 right-5 h-px w-32 bg-[radial-gradient(ellipse_at_top,var(--color-yellow-500),_transparent)] blur-[2px] sm:right-8 sm:w-40 md:right-10 md:w-60"></div>
            <div className="absolute top-0 right-5 h-px w-32 bg-[radial-gradient(ellipse_at_top,var(--color-yellow-500),_transparent)] blur-[4px] sm:right-8 sm:w-40 md:right-10 md:w-60"></div>
          </motion.div>
          <div className="relative z-20 rounded-[11px] bg-neutral-800 p-1 sm:rounded-[17px] sm:p-1.5 md:rounded-[23px] md:p-2">
            <img
              src="/"
              alt="hero"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover object-bottom-right grayscale sm:rounded-xl md:rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SteelGrid = ({
  bulbStates,
  phase,
}: {
  bulbStates: BulbState[];
  phase: "startup" | "allOn" | "fusing";
}) => {
  return (
    <div className="absolute inset-0">
      {/* Vertical steel lines */}
      {Array.from({ length: GRID_SIZE }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-800"
          style={{
            left: `${((i + 1) / (GRID_SIZE + 1)) * 100}%`,
            boxShadow:
              "inset 1px 0 0 rgba(255,255,255,0.1), inset -1px 0 0 rgba(0,0,0,0.3)",
          }}
        />
      ))}

      {/* Horizontal steel lines */}
      {Array.from({ length: GRID_SIZE }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute right-0 left-0 h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800"
          style={{
            top: `${((i + 1) / (GRID_SIZE + 1)) * 100}%`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)",
          }}
        />
      ))}

      {/* Bulbs at intersections */}
      {BULB_POSITIONS.map((pos, index) => (
        <div
          key={`bulb-${index}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${((pos.col + 1) / (GRID_SIZE + 1)) * 100}%`,
            top: `${((pos.row + 1) / (GRID_SIZE + 1)) * 100}%`,
          }}
        >
          <Bulb state={bulbStates[index]} phase={phase} />
        </div>
      ))}
    </div>
  );
};

const Bulb = ({
  state = "on",
  phase,
}: {
  state?: BulbState;
  phase: "startup" | "allOn" | "fusing";
}) => {
  const isOn = state === "on";
  const isFlickering = state === "flickering";
  const isFused = state === "fused";
  const isOff = state === "off";

  const prevStateRef = useRef<BulbState>(state);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdRef = useRef(0);

  // Detect state changes and trigger sparks (only during fusing phase)
  useEffect(() => {
    const prevState = prevStateRef.current;
    prevStateRef.current = state;

    // Only trigger sparks during the fusing phase when bulb goes from 'on' to 'fused'
    const shouldSpark =
      phase === "fusing" && prevState === "on" && state === "fused";

    if (shouldSpark) {
      // Generate random sparks
      const sparkCount = 15 + Math.floor(Math.random() * 20); // 15-34 sparks
      const newSparks: Spark[] = [];

      for (let i = 0; i < sparkCount; i++) {
        // Bias angle towards downward: center around π/2 (down) with spread
        // Range from about 0.1π to 0.9π (mostly downward with some horizontal spread)
        const baseAngle = Math.PI * 0.5; // Straight down
        const spread = (Math.random() - 0.5) * Math.PI * 1.2; // ±0.6π spread
        const angle = baseAngle + spread;

        const spark: Spark = {
          id: sparkIdRef.current++,
          angle: angle,
          distance: 50 + Math.random() * 120, // 50-170px travel
          duration: 1 + Math.random() * 2, // 1-3s duration
          size: 0.5 + Math.random() * 0.5, // 0.5-1px size
          color:
            Math.random() > 0.4
              ? `var(--color-yellow-500)` // Yellow
              : `var(--color-white)`, // Orange
        };
        newSparks.push(spark);
      }

      setSparks((prev) => [...prev, ...newSparks]);

      // Clean up old sparks after animation
      const maxDuration =
        Math.max(...newSparks.map((s) => s.duration)) * 1000 + 100;
      setTimeout(() => {
        setSparks((prev) =>
          prev.filter((s) => !newSparks.find((ns) => ns.id === s.id)),
        );
      }, maxDuration);
    }
  }, [state, phase]);

  // Determine opacity and glow based on state
  const glowIntensity = isOn ? 1 : isFlickering ? 0.5 : 0;
  const coreOpacity = isOn ? 0.9 : isFlickering ? 0.4 : isFused ? 0.05 : 0;

  return (
    <div className="relative">
      {/* Sparks container - positioned outside the bulb */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 50 }}
      >
        {sparks.map((spark) => (
          <SparkParticle key={spark.id} spark={spark} />
        ))}
      </div>

      {/* Steel frame - outer ring */}
      <div className="size-6 rounded-full bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 p-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.5)] sm:size-8 sm:p-[2px] md:size-10">
        {/* Steel frame - inner ring with brushed metal effect */}
        <div className="size-full rounded-full bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-600 p-[1px] shadow-[inset_0_2px_3px_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.3)] sm:p-[2px]">
          {/* The bulb itself */}
          <motion.div
            className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-neutral-900"
            animate={{
              boxShadow: isOn
                ? "0 0 15px 3px rgba(251, 191, 36, 0.4), 0 0 30px 8px rgba(251, 191, 36, 0.25), 0 0 50px 15px rgba(251, 191, 36, 0.15)"
                : isFlickering
                  ? "0 0 10px 2px rgba(251, 191, 36, 0.3), 0 0 20px 5px rgba(251, 191, 36, 0.15)"
                  : "0 0 0px 0px rgba(251, 191, 36, 0)",
            }}
            transition={{
              duration: isFlickering ? 0.05 : 0.2,
              ease: "easeInOut",
            }}
          >
            {/* Outer glow layer */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-sm"
              animate={{ opacity: glowIntensity }}
              transition={{ duration: isFlickering ? 0.05 : 0.2 }}
            />

            {/* Middle warm glow */}
            <motion.div
              className="absolute inset-0 m-auto h-[85%] w-[85%] rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 blur-[2px]"
              animate={{ opacity: isOn ? 0.6 : isFlickering ? 0.3 : 0.05 }}
              transition={{ duration: isFlickering ? 0.05 : 0.2 }}
            />

            {/* Inner bright core */}
            <motion.div
              className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 blur-[1px]"
              animate={{ opacity: coreOpacity }}
              transition={{ duration: isFlickering ? 0.05 : 0.2 }}
            />

            {/* Hot center - the brightest point */}
            <motion.div
              className="absolute inset-0 m-auto h-[40%] w-[40%] rounded-full bg-white blur-[0.5px]"
              animate={{ opacity: isOn ? 0.8 : isFlickering ? 0.3 : 0 }}
              transition={{ duration: isFlickering ? 0.05 : 0.2 }}
            />

            {/* Off/Fused state - dark filament */}
            <motion.div
              className="absolute inset-0 m-auto h-[30%] w-[30%] rounded-full bg-zinc-700"
              animate={{ opacity: isOff || isFused ? 0.6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Individual spark particle component
const SparkParticle = ({ spark }: { spark: Spark }) => {
  // Calculate end position based on angle and distance
  const endX = Math.cos(spark.angle) * spark.distance;
  const endY = Math.sin(spark.angle) * spark.distance;

  // Add strong gravity effect (sparks fall down)
  // const gravityY = 30 + Math.random() * 50

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: spark.size,
        height: spark.size,
        backgroundColor: spark.color,
        left: "50%",
        top: "50%",
        marginLeft: -spark.size / 2,
        marginTop: -spark.size / 2,
        boxShadow: `0 0 ${spark.size * 3}px ${spark.size * 1.5}px ${spark.color}`,
      }}
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "brightness(2.5)",
      }}
      animate={{
        x: endX,
        y: endY,
        opacity: 0,
        scale: 0.1,
        filter: "brightness(0)",
      }}
      transition={{
        duration: spark.duration,
        ease: [0.15, 0.6, 0.4, 0.95], // Custom easing - fast start, slow end (like falling sparks)
      }}
    />
  );
};
