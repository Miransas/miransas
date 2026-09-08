"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Shdr02 from "../ui/shdr-02";


export default function ContinuousOrbLoop() {
  const [stage, setStage] = useState<"orbit" | "merging" | "waveform">("orbit");
  const [audioVolume, setAudioVolume] = useState(0.2);


  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (stage === "orbit") {

      timer = setTimeout(() => {
        setStage("merging");
      }, 1200);
    } else if (stage === "merging") {

      timer = setTimeout(() => {
        setStage("waveform");
      }, 300);
    } else if (stage === "waveform") {

      timer = setTimeout(() => {
        setStage("orbit");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [stage]);


  useEffect(() => {
    if (stage !== "waveform") return;

    const interval = setInterval(() => {
      const time = Date.now() * 0.009;
      const wave = Math.sin(time) * 0.35 + Math.cos(time * 2.8) * 0.25 + 0.45;
      setAudioVolume(Math.min(Math.max(wave, 0.12), 0.98));
    }, 40);

    return () => clearInterval(interval);
  }, [stage]);

  const orbAngles = [0, 120, 240];
  const orbitRadius = 100;

  return (
    <div className="relative flex h-auto w-full items-center justify-center overflow-hidden bg-transparent">


      {stage !== "waveform" && (
        <motion.div
          className="relative flex w-auto h-auto items-center justify-center"
          animate={{
            rotate: stage === "orbit" ? 360 : 720,
          }}
          transition={{
            duration: stage === "orbit" ? 1.2 : 0.3,
            ease: stage === "orbit" ? "linear" : "easeIn",
          }}
        >
          {orbAngles.map((angle, index) => {
            const rad = (angle * Math.PI) / 180;
            const initialX = Math.cos(rad) * orbitRadius;
            const initialY = Math.sin(rad) * orbitRadius;

            return (
              <motion.div
                key={index}
                className="absolute flex items-center justify-center"
                initial={{ x: initialX, y: initialY, scale: 1, opacity: 1 }}
                animate={{
                  x: stage === "merging" ? 0 : initialX,
                  y: stage === "merging" ? 0 : initialY,
                  scale: stage === "merging" ? 0.1 : 1,
                  opacity: stage === "merging" ? 0.1 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.7, 0, 0.84, 0],
                }}
              >
                <Shdr02
                  size={85}
                  state="idle"
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}


      <AnimatePresence mode="wait">
        {stage === "waveform" && (
          <motion.div
            key="waveform-orb"
            className="relative flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 16,
            }}
          >

            <motion.div
              className="absolute rounded-full border border-indigo-400/40 pointer-events-none"
              style={{
                boxShadow: "0 0 25px rgba(99, 102, 241, 0.25)",
              }}
              animate={{
                width: 180 + audioVolume * 150,
                height: 180 + audioVolume * 150,
                opacity: [0.3, 0.85, 0.3],
                borderWidth: `${1 + audioVolume * 3.5}px`,
              }}
              transition={{
                duration: 0.06,
                ease: "easeOut",
              }}
            />

            <motion.div
              className="absolute rounded-full pointer-events-none"
              animate={{
                width: 210 + audioVolume * 210,
                height: 210 + audioVolume * 210,
                opacity: [0.15, 0.6, 0.15],
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            />


            <Shdr02
              size={410}
              state={audioVolume > 0.4 ? "speaking" : "thinking"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}