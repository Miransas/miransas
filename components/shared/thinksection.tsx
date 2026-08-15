"use client"

import { useEffect, useRef, useState } from "react"
import { BrainCircuit, Loader2, Sparkles } from "lucide-react"

// ==========================================
// 1. ABSORPTION ANIMATION (BACKGROUND ENGINE)
// ==========================================
interface Particle {
  gridX: number
  gridY: number
  opacity: number
  targetOpacity: number
  size: number
  targetSize: number
  flickerSpeed: number
  scale: number
  targetScale: number
  distanceFromCenter: number
  baseSize: number
}

interface Wave {
  startTime: number
}

function AbsorptionAnimation({ shape = "circle" }: { shape?: "circle" | "triangle" | "square" | "diamond" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const gridInfoRef = useRef({ cols: 0, rows: 0, spacing: 20 })
  const wavesRef = useRef<Wave[]>([])
  const lastWaveCreationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const initializeParticles = () => {
      const spacing = 12 // Noktalar arası boşluk (biraz daha ferahlatıldı)
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)

      gridInfoRef.current = { cols, rows, spacing }

      const centerCol = cols / 2
      const centerRow = rows / 2

      particlesRef.current = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const opacity = Math.random() * 0.5 // Başlangıç opaklığı düşürüldü
          const baseSize = Math.random() * 1.5 + 0.5
          const size = baseSize
          const distanceFromCenter = Math.sqrt(Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2))

          particlesRef.current.push({
            gridX: col * spacing + spacing / 2,
            gridY: row * spacing + spacing / 2,
            opacity,
            targetOpacity: opacity,
            size,
            targetSize: size,
            flickerSpeed: Math.random() * 0.05 + 0.02,
            scale: 1,
            targetScale: 1,
            distanceFromCenter,
            baseSize,
          })
        }
      }
    }

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initializeParticles()
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      // Miralas Tarzı Amber & Beyaz Karışımı Noktalar
      ctx.fillStyle = `rgba(255, 235, 180, ${opacity * 0.8})`

      switch (shape) {
        case "circle":
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(x, y - size)
          ctx.lineTo(x - size * 0.866, y + size * 0.5)
          ctx.lineTo(x + size * 0.866, y + size * 0.5)
          ctx.closePath()
          ctx.fill()
          break
        case "square":
          ctx.fillRect(x - size, y - size, size * 2, size * 2)
          break
        case "diamond":
          ctx.beginPath()
          ctx.moveTo(x, y - size)
          ctx.lineTo(x + size, y)
          ctx.lineTo(x, y + size)
          ctx.lineTo(x - size, y)
          ctx.closePath()
          ctx.fill()
          break
      }
    }

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const maxDistance = Math.max(gridInfoRef.current.cols, gridInfoRef.current.rows) * 0.8
      const currentTime = Date.now()

      // Dalga frekansı: Düşünme hızına göre 800ms'den 1200ms'ye çıkarıldı (Daha sakin bir pulsing)
      if (wavesRef.current.length === 0 || currentTime - lastWaveCreationRef.current >= 1200) {
        wavesRef.current.push({ startTime: currentTime })
        lastWaveCreationRef.current = currentTime
      }

      wavesRef.current = wavesRef.current.filter((wave) => {
        const waveAge = (currentTime - wave.startTime) / 1000
        const waveRadius = waveAge * 25 // Dalga yayılma hızı biraz yavaşlatıldı
        return waveRadius < maxDistance + 20
      })

      particlesRef.current.forEach((particle) => {
        const distanceFadeForSize = Math.max(0, 1 - particle.distanceFromCenter / (maxDistance * 1.2))
        const baseSize = particle.baseSize * (0.3 + distanceFadeForSize * 0.7)

        let maxOpacity = 0
        let maxScale = 0

        wavesRef.current.forEach((wave) => {
          const waveAge = (currentTime - wave.startTime) / 1000
          const waveRadius = waveAge * 25
          const distanceDiff = Math.abs(particle.distanceFromCenter - waveRadius)

          const waveWidth = 12
          const risePhase = waveWidth * 0.3
          const holdPhase = waveWidth * 0.4
          const fallPhase = waveWidth * 0.3

          if (distanceDiff < waveWidth) {
            let waveIntensity = 0

            if (distanceDiff < risePhase) {
              waveIntensity = distanceDiff / risePhase
            } else if (distanceDiff < risePhase + holdPhase) {
              waveIntensity = 1
            } else {
              const fallProgress = (distanceDiff - risePhase - holdPhase) / fallPhase
              waveIntensity = 1 - fallProgress
            }

            const distanceFade = Math.max(0, 1 - particle.distanceFromCenter / (maxDistance * 1.5))
            const effectiveIntensity = waveIntensity * distanceFade

            maxOpacity = Math.max(maxOpacity, effectiveIntensity)
            maxScale = Math.max(maxScale, effectiveIntensity * 1.8)
          }
        })

        particle.targetOpacity = maxOpacity
        particle.targetScale = maxScale
        particle.targetSize = baseSize

        particle.opacity += (particle.targetOpacity - particle.opacity) * (particle.flickerSpeed * 0.8)
        particle.size += (particle.targetSize - particle.size) * (particle.flickerSpeed * 0.8)
        particle.scale += (particle.targetScale - particle.scale) * (particle.flickerSpeed * 0.8)

        const finalSize = particle.size * particle.scale

        drawShape(ctx, particle.gridX, particle.gridY, finalSize, particle.opacity)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [shape])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Miralas Karanlık Tema Gradient Arka Planı */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-black to-[#050510] blur-3xl scale-125 z-0" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-blue-900/20 blur-2xl scale-125 z-0" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-60" />

      {/* Ortayı karanlıklaştıran radial mask, böylece merkezdeki kart daha çok ön plana çıkar */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_80%)] z-20" />
    </div>
  )
}

// ==========================================
// 2. MAIN THINKING PAGE / SCREEN UI
// ==========================================
export default function ThinkingSection() {
  const [dots, setDots] = useState("");

  // Basit bir 3 noktalı yükleme animasyonu
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden font-sans">

      {/* Arka Plan WebGL Canvas Dalga Animasyonu */}
      <AbsorptionAnimation shape="diamond" />

      {/* Merkez UI: Glassmorphic Düşünme Kartı */}
      <div className="relative z-30 flex flex-col items-center">

        {/* Parıldayan Merkez İkon Halkası */}
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shadow-[0_0_80px_rgba(245,158,11,0.15)] mb-8">

          {/* İçeride dönen loader */}
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500/50 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 rounded-full border-r-2 border-blue-500/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '4s' }} />

          {/* Merkez İkon */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30">
            <BrainCircuit className="h-8 w-8 animate-pulse" />
          </div>
        </div>

        {/* Bilgi Metinleri */}
        <div className="flex flex-col items-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Miransas is Active
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center">
           Analyzing Context
            <span className="inline-block w-8 text-left">{dots}</span>
          </h1>

          <p className="text-sm text-neutral-400 max-w-[280px] text-center leading-relaxed">
            They will be listed here as soon as possible.          </p>
        </div>

        {/* Alt Kısım Ekstra Yükleme Detayları (Opsiyonel) */}
        <div className="absolute bottom-[-100px] flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span className="uppercase tracking-wider">Axum Elixir DSTSA</span>
        </div>

      </div>
    </div>
  )
}