"use client";


import AIConversation from "../smoothui/ai-conversation";
import AILoader from "../smoothui/ai-loader";



import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Volume2, Play, Pause, Download, Waves, AudioLines } from "lucide-react";


const THINKING_STEPS = [
  "Analyzing audio buffer & input intent...",
  "Running pitch contour extraction...",
  "Loading Shahzoda neural voice weights...",
  "Synthesizing Uzbek/English multi-lang audio stream...",
];

const FULL_SPEECH =
  ".%&/";

const AUDIO_SRC = "/tts-actor-miralas.mp3";

// Görseldeki dalga boyu kalıbı (Uzun, kısa, nokta tarzı barlar)
const WAVEFORM_BARS = [
  10, 20, 15, 30, 20, 10, 10, 25, 10, 10, 80, 10, 20, 15, 10, 10, 10, 25, 80,
  10, 20, 100, 10, 15, 10, 20, 10, 10, 45, 60, 50, 40, 10, 10, 10, 10, 20, 10,
  10, 30, 10, 10, 10, 10, 10, 10, 10, 50, 80, 10, 20, 100, 10, 10, 20, 10, 10,
  10, 10, 10, 10, 40, 60, 10, 10, 20, 10, 10, 10
];

export default function LiveVoiceStream() {
  const [thinkingText, setThinkingText] = useState("");
  const [speechText, setSpeechText] = useState("");

  const [isThinking, setIsThinking] = useState(true);
  const [isThoughtOpen, setIsThoughtOpen] = useState(true);
  const [finalThoughtTime, setFinalThoughtTime] = useState("0.0");

  // Audio Player Durumları
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStreamComplete, setIsStreamComplete] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let stepIndex = 0;
    const startTime = Date.now();

    // 1. Thinking Stream
    const thinkInterval = setInterval(() => {
      if (stepIndex < THINKING_STEPS.length) {
        const nextStep = THINKING_STEPS[stepIndex];
        setThinkingText((prev) =>
          prev ? `${prev}\n▸ ${nextStep}` : `▸ ${nextStep}`
        );
        stepIndex++;
      } else {
        clearInterval(thinkInterval);
        setIsThinking(false);
        setIsThoughtOpen(false);

        setFinalThoughtTime(((Date.now() - startTime) / 1000).toFixed(1));

        // 2. Speech Text Stream
        let speechIndex = 0;
        const speechInterval = setInterval(() => {
          if (speechIndex < FULL_SPEECH.length) {
            setSpeechText((prev) => prev + FULL_SPEECH[speechIndex]);
            speechIndex++;
          } else {
            clearInterval(speechInterval);
            setIsStreamComplete(true);
          }
        }, 25);
      }
    }, 550);

    return () => clearInterval(thinkInterval);
  }, []);

  // Audio Kontrolleri
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const contentKey = thinkingText.length + speechText.length + (isStreamComplete ? 1 : 0);

  return (
    <div className="flex h-[460px] w-full max-w-xl flex-col rounded-2xl  bg-black p-4 shadow-2xl font-sans">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-zinc-300 font-medium uppercase tracking-wider">
            Miralas Pipeline
          </span>
        </div>
      </div>

      <AIConversation className="flex-1" contentKey={contentKey}>
        <div className="space-y-4 pr-1">
          {/* THINKING BLOĞU */}
          <div className="rounded-xl border border-white/10 overflow-hidden transition-all duration-300 bg-black">
            <button
              onClick={() => setIsThoughtOpen(!isThoughtOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {isThinking ? (
                  <AILoader
                    variant="grid"
                    label="Thinking"
                    showElapsed={true}
                    className="text-emerald-400 font-mono text-[11px]"
                  />
                ) : (
                  <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Thought for {finalThoughtTime}s</span>
                  </div>
                )}
              </div>

              <ChevronDown
                className={`size-3.5 text-zinc-500 transition-transform duration-300 ${
                  isThoughtOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isThoughtOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-zinc-800/50 font-mono text-[11px] text-zinc-400/80 leading-relaxed whitespace-pre-wrap">
                {thinkingText}
              </div>
            )}
          </div>

          {/* SES / TRANSCRIPT BLOĞU */}
          {speechText && (
            <div className="flex flex-col items-start space-y-2 pt-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-200">
                <AudioLines className="animate-"  size={"22"}/>
                {/* <Volume2 className="size-3.5 animate-pulse" /> */}
                <span>MIRALAS AUDIO STREAM</span>
              </div>

              <div className="relative w-full rounded-2xl rounded-tl-xs bg-black  p-4 text-[13px] text-zinc-100 leading-relaxed shadow-sm space-y-4">
                <p>
                  {speechText}
                  {!isThinking && speechText.length < FULL_SPEECH.length && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </p>

                {/* GÖRSELDEKİ BİREBİR MİNİMAL AUDIO PLAYER */}
                {isStreamComplete && (
                  <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/80 select-none">
                    {/* Minimal Waveform Alanı */}
                    <div className="relative flex-1 flex items-center h-6 gap-[2px]">
                      {WAVEFORM_BARS.map((heightPercent, index) => {
                        const barPosition = (index / WAVEFORM_BARS.length) * 100;
                        const isPlayed = barPosition <= progressPercent;

                        return (
                          <span
                            key={index}
                            className={`w-[2px] rounded-full transition-colors duration-200 ${
                              isPlayed ? "bg-zinc-200" : "bg-zinc-700/60"
                            }`}
                            style={{ height: `${Math.max(15, heightPercent)}%` }}
                          />
                        );
                      })}

                      {/* Görseldeki Çizgili İlerleme Yuvarlağı (Scrubber) */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                        style={{ left: `${progressPercent}%` }}
                      >
                        <div className="w-[2px] h-6 bg-white" />
                        <div className="size-2.5 rounded-full bg-white shadow-md border border-black/40 -mt-4" />
                      </div>
                    </div>

                    {/* Süre Bilgisi (0:00 / 0:10) */}
                    <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                      {formatTime(currentTime)} / {formatTime(duration || 10)}
                    </span>

                    {/* Play/Pause Butonu */}
                    <button
                      onClick={togglePlay}
                      className="text-zinc-300 hover:text-white transition cursor-pointer p-1"
                    >
                      {isPlaying ? (
                        <Pause className="size-4 fill-current" />
                      ) : (
                        <Play className="size-4 fill-current" />
                      )}
                    </button>

                    {/* İndirme (Download) Butonu */}
                    <a
                      href={AUDIO_SRC}
                      download="miralas-voice.mp3"
                      className="text-zinc-400 hover:text-white transition p-1"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AIConversation>
    </div>
  );
}