"use client"
/* eslint-disable react-hooks/purity */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { Code2, Cpu, Activity, Zap, Layers } from "lucide-react";

type Phase = "TYPING" | "FLYTHROUGH" | "CONVERGE" | "REVEAL";

const CODE_SNIPPETS = [
  "const core = initSystem();",
  "import { neural } from '@miransas/sdk';",
  "async function deploy(target: Host) {",
  "  await neural.sync();",
  "  return await secureConnect(target);",
  "}",
  "interface QuantumState { flux: number; }",
  "0x8F2A: MOVN R1, #0x04",
  "MIRANSAS.initialize({ debug: false });",
  "for (let x of grid) x.process();",
  "export default function Nexus() {",
  "  const [sync, setSync] = useState(0);",
  "  return <NeuralGate status={sync} />;",
  "}",
];

const TypingCode = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        return [snippet, ...prev].slice(0, 15);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[11px] md:text-base leading-relaxed overflow-hidden py-10">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={i % 2 === 0 ? "text-neon-blue glow-blue" : "text-neon-purple glow-purple"}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

const CodeLayer = ({ delay, zIndex }: { delay: number; zIndex: number }) => {
  const snippets = useMemo(() => 
    Array.from({ length: 8 }, () => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]),
  []);

  return (
    <motion.div
      initial={{ z: -2000, opacity: 0 }}
      animate={{ z: 1000, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4, delay, ease: "linear", repeat: Infinity }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ perspective: "1000px", zIndex }}
    >
      <div className="flex flex-wrap justify-center max-w-4xl gap-8">
        {snippets.map((s, i) => (
          <div 
            key={i} 
            className={`font-mono text-xl whitespace-nowrap opacity-40 ${i % 3 === 0 ? 'text-neon-blue' : 'text-neon-purple'}`}
            style={{ transform: `translateZ(${Math.random() * 200}px)` }}
          >
            {s}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function MiransasAnimations() {
  const [phase, setPhase] = useState<Phase>("TYPING");

  useEffect(() => {
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 3000));
      setPhase("FLYTHROUGH");
      
      await new Promise((r) => setTimeout(r, 4500));
      setPhase("CONVERGE");
      
      await new Promise((r) => setTimeout(r, 1000));
      setPhase("REVEAL");
    };
    sequence();
  }, []);

  return (
    <main className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans select-none perspective-[1500px]">
      <AnimatePresence mode="wait">
        {phase === "TYPING" && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl px-6"
          >
            <div className="flex items-center space-x-3 mb-6 opacity-30">
              <Code2 className="w-5 h-5 text-neon-blue" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Neural Uplink: Active</span>
            </div>
            <TypingCode />
          </motion.div>
        )}

        {phase === "FLYTHROUGH" && (
          <motion.div
            key="flythrough"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "brightness(5)" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CodeLayer delay={0} zIndex={10} />
            <CodeLayer delay={1} zIndex={20} />
            <CodeLayer delay={2} zIndex={30} />
            <CodeLayer delay={3} zIndex={40} />
            
            {/* Camera Movement Simulation */}
            <motion.div 
              className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, black 90%)"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="z-50 flex flex-col items-center opacity-50">
              <Layers className="w-8 h-8 mb-4 text-white animate-pulse" />
              <div className="font-mono text-[10px] tracking-widest uppercase">Traversing Data Layers</div>
            </div>
          </motion.div>
        )}

        {phase === "CONVERGE" && (
          <motion.div
            key="converge"
            className="flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {CODE_SNIPPETS.slice(0, 5).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? -500 : 500, y: i < 3 ? -300 : 300, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circIn" }}
                className="w-4 h-32 bg-neon-blue/20 blur-xl"
              />
            ))}
          </motion.div>
        )}

        {phase === "REVEAL" && (
          <motion.div
            key="reveal"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, letterSpacing: "1.5em", filter: "blur(10px)" }}
              animate={{ scale: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="text-8xl md:text-9xl font-extrabold uppercase glitch-text tracking-tight px-4 leading-none text-white">
                Miransas
              </h1>
              
              {/* Subtle Ambient Glow behind text */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "300px", opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent mt-8"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-8 flex items-center space-x-12 text-[10px] uppercase font-mono tracking-[0.4em] text-white/30"
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3" />
                <span>Synchronized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-neon-purple" />
                <span>0ms Overflow</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Cinematic Assets */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
      <div className="fixed inset-0 pointer-events-none z-[100] bg-gradient-to-b from-black via-transparent to-black" />
    </main>
  );
}

