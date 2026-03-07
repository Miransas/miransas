"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Shield, Bot, Code2, 
  ArrowRight, Github, Cpu, Activity,
  Server, Mic, Gamepad2
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- BORDER BEAM (PROJE EKRANLARI İÇİN) ---
const BorderBeam = ({ className, color = "#FF4F00", duration = 4 }: { className?: string; color?: string; duration?: number }) => (
  <div className={cn("absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10", className)}>
    <motion.div
      className="absolute w-[2px] h-[40%] blur-[2px]"
      style={{
        background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.8) 50%, ${color} 100%)`,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
      animate={{ top: ["-40%", "100%", "100%", "-40%", "-40%"], left: ["0%", "0%", "100%", "100%", "0%"] }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const PROJECTS = [
  {
    id: "sentinel",
    title: "macOS Sentinel VPN",
    category: "Systems Engineering",
    status: "Production Ready",
    color: "#3B82F6", // Blue
    icon: <Shield size={24} className="text-blue-500" />,
    description: "A memory-safe, zero-latency Virtual Private Network client engineered exclusively for macOS architecture. Built from the ground up to handle high-throughput traffic without crashing.",
    tech: ["Rust", "Tokio", "ChaCha20Poly1305", "macOS NetworkExtension"],
    metrics: [
      { label: "Architecture", value: "M1 Optimized" },
      { label: "Encryption", value: "ChaCha20" },
      { label: "Latency", value: "< 12ms" }
    ],
    mockupCode: `// Sentinel Engine v2.0 - Core Tunnel Init
use tokio::net::TcpStream;
use chacha20poly1305::{ChaCha20Poly1305, Key, Nonce};

async fn establish_secure_tunnel() -> Result<(), VPNError> {
    let stream = TcpStream::connect("miransas.core:443").await?;
    let cipher = initialize_cipher(&MASTER_KEY);
    
    tracing::info!("macOS TUN interface active. Zero-latency routing enabled.");
    Ok(())
}`
  },
  {
    id: "elasiya",
    title: "Elasiya Network Tunnel",
    category: "Network Infrastructure",
    status: "In Development",
    color: "#A855F7", // Purple 
    icon: <Activity size={24} className="text-purple-500" />,
    description: "A secure, high-performance reverse proxy and tunneling service functioning as a proprietary ngrok alternative. Engineered to expose local development servers to the public internet with end-to-end encryption.",
    tech: ["Go", "TCP/IP", "WebSockets", "Reverse Proxy"],
    metrics: [
      { label: "Protocol", value: "TCP / HTTP" },
      { label: "Routing", value: "Dynamic Pipe" },
      { label: "Status", value: "Ongoing" }
    ],
    mockupCode: `// Elasiya Core - Reverse Proxy Relay
func EstablishRelay(ctx context.Context, target string) error {
    listener, err := net.Listen("tcp", ":8080")
    if err != nil { return err }
    
    log.Info("Elasiya secure tunnel active. Exposing local port...")
    
    for {
        clientConn, _ := listener.Accept()
        go routeTraffic(clientConn, target) // Zero-latency stream
    }
}`
  },
  {
    id: "dolphinx",
    title: "DolphinX Server",
    category: "Private Server Architecture",
    status: "Active Ops",
    color: "#06B6D4", // Cyan
    icon: <Server size={24} className="text-cyan-500" />,
    description: "Custom-built, bare-metal server infrastructure powering the entire Miransas ecosystem. DolphinX handles containerized deployments, load balancing, and secure routing for all internal projects.",
    tech: ["Linux", "Go", "Docker", "Nginx"],
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Deployment", value: "Containerized" },
      { label: "Security", value: "Strict SSH" }
    ],
    mockupCode: `// DolphinX Orchestrator - Node Initialization
func BootMiransasNode() {
    log.Println("DolphinX server architecture online.")
    
    deployContainer("elasiya-proxy", 8080)
    deployContainer("beksar-ai-agent", 8081)
    deployContainer("miransas-web", 3000)
    
    log.Println("All systems green. Listening for traffic...")
}`
  },
  {
    id: "beksar",
    title: "Beksar AI Voice Agent",
    category: "Artificial Intelligence",
    status: "In Development",
    color: "#F43F5E", // Rose
    icon: <Mic size={24} className="text-rose-500" />,
    description: "A 100% voice-driven, autonomous AI assistant. Beksar listens, processes, and responds in real-time, functioning as an intelligent agent capable of executing system commands via voice prompts.",
    tech: ["Python", "STT/TTS Engines", "WebSockets", "LLM Processing"],
    metrics: [
      { label: "Interaction", value: "100% Voice" },
      { label: "Latency", value: "< 400ms" },
      { label: "Agent Type", value: "Autonomous" }
    ],
    mockupCode: `# Beksar Voice Agent Core - Stream Processor
async def process_voice_stream(audio_buffer):
    # 1. Speech to Text
    text_prompt = await stt_engine.transcribe(audio_buffer)
    
    # 2. LLM Reasoning
    response_text = await ai_model.generate_response(text_prompt)
    
    # 3. Text to Speech & Execute
    audio_out = await tts_engine.synthesize(response_text)
    return audio_out`
  },
  {
    id: "lost-signal",
    title: "Lost Signal Engine",
    category: "Interactive IP",
    status: "Chapter I Released",
    color: "#EF4444", // Red
    icon: <Gamepad2 size={24} className="text-red-500" />,
    description: "The custom game logic and atmospheric engine driving the psychological horror experience of Lost Signal. Optimized specifically for M1 architecture to deliver high-fidelity stealth and environmental audio mechanics.",
    tech: ["C#", "Unity / Unreal Engine", "M1 Optimization", "FMOD"],
    metrics: [
      { label: "Genre", value: "Psychological" },
      { label: "Protagonist", value: "Sad" },
      { label: "Antagonist", value: "Das" }
    ],
    mockupCode: `// Lost Signal - Radio Frequency Controller
public class RadioMechanic : MonoBehaviour {
    [SerializeField] private float currentFrequency;
    private const float DAS_FREQUENCY = 104.5f;

    void Update() {
        if (Mathf.Approximately(currentFrequency, DAS_FREQUENCY)) {
            SanityManager.Decrease(1.5f * Time.deltaTime);
            AudioSystem.PlayDistortion("whispers_01");
            VisionEffect.AddGlitch();
        }
    }
}`
  },
  {
    id: "miransas-web",
    title: "Studio Infrastructure",
    category: "Web Architecture",
    status: "Deployed",
    color: "#10B981", // Emerald
    icon: <Code2 size={24} className="text-emerald-500" />,
    description: "The scalable backbone of Miransas Studio. From dynamic Next.js frontends to Drizzle ORM data layers handling global requests. Fully integrated with Next-Gen databases.",
    tech: ["Next.js 14", "TypeScript", "Drizzle ORM", "Neon Postgres"],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Database", value: "Serverless" },
      { label: "SEO Score", value: "100/100" }
    ],
    mockupCode: `// Drizzle ORM - Global Schema Definition
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const telemetryLogs = pgTable('telemetry_logs', {
  id: serial('id').primaryKey(),
  signal_origin: text('signal_origin').notNull(),
  latency_ms: text('latency_ms'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// Syncing with Neon Edge endpoints...`
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen mt-20 bg-[#050505] text-white pt-32 pb-32 font-sans selection:bg-[#FF4F00]/30 overflow-hidden">
      
      {/* ─── DOT BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #ffffff 1px, transparent 0)`, backgroundSize: `32px 32px` }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ─── HEADER ─── */}
        <div className="mb-32 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">Production Archive</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Engineered <br /> <span className="text-neutral-600">Solutions.</span>
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Deep dives into the core architectures built by Sardor Azimov. Every system is designed for zero-downtime, maximum efficiency, and memory-safe execution.
            </p>
          </motion.div>
        </div>

        {/* ─── PROJE LİSTESİ (DEV KARTLAR) ─── */}
        <div className="space-y-40">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              
              {/* SOL/SAĞ: MOCKUP & KOD EKRANI */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                  {/* Işın Efekti */}
                  <BorderBeam color={project.color} />
                  
                  {/* Mac Pencere Başlığı */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/50 relative z-20">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-neutral-700" />
                      <div className="w-3 h-3 rounded-full bg-neutral-700" />
                      <div className="w-3 h-3 rounded-full bg-neutral-700" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      <Cpu size={12} /> {project.id}.core
                    </div>
                  </div>

                  {/* Terminal Kod İçeriği */}
                  <div className="flex-1 overflow-hidden relative z-20">
                    <pre className="text-[11px] md:text-sm font-mono leading-loose text-neutral-400 whitespace-pre-wrap">
                      <code className="language-javascript" dangerouslySetInnerHTML={{
                        __html: project.mockupCode
                          .replace(/(const|let|var|async|await|func|use|import|export|from|type|def|public|class|void|if)/g, `<span style="color: ${project.color}">$1</span>`)
                          .replace(/(function|fn|return|error)/g, '<span class="text-rose-400">$1</span>')
                          .replace(/(\/\/.+|# .+)/g, '<span class="text-neutral-600">$1</span>')
                      }} />
                    </pre>
                  </div>

                  {/* Alt Durum Çubuğu */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/50 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500 relative z-20">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                      {project.status}
                    </span>
                    <span>System Online</span>
                  </div>
                </div>
              </div>

              {/* SAĞ/SOL: PROJE DETAYLARI */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                    {project.icon}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-white">
                  {project.title}
                </h2>
                
                <p className="text-neutral-400 font-light leading-relaxed mb-8 text-sm md:text-base">
                  {project.description}
                </p>

                {/* Metric Kutuları */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{metric.label}</span>
                      <span className="text-sm font-bold text-neutral-200">{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Etiketleri */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex items-center gap-4">
                  <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                    View Systems <ArrowRight size={14} />
                  </a>
                  <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-transparent border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-neutral-900 transition-colors">
                    <Github size={14} /> Source
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}