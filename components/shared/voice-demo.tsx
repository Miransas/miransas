"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Play, Pause, Download, AudioLines } from "lucide-react";
import AIConversation from "../smoothui/ai-conversation";
import AILoader from "../smoothui/ai-loader";

const THINKING_STEPS = [
  "Analyzing audio buffer & input intent...",
  "Running pitch contour extraction...",
  "Loading Shahzoda neural voice weights...",
  "Synthesizing Uzbek/English multi-lang audio stream...",
];

const FULL_SPEECH =
  "Assalomu alaykum! Miransas neural voice model is active. High-fidelity speech synthesis for Uzbek and multilingual evaluation is now streaming live.";

const AUDIO_SRC = "/tts-actor-miralas.mp3";

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

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStreamComplete, setIsStreamComplete] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let stepIndex = 0;
    const startTime = Date.now();

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

        let speechIndex = 0;
        const speechInterval = setInterval(() => {
          if (speechIndex < FULL_SPEECH.length) {
            setSpeechText((prev) => prev + FULL_SPEECH[speechIndex]);
            speechIndex++;
          } else {
            clearInterval(speechInterval);
            setIsStreamComplete(true);
          }
        }, 20);
      }
    }, 500);

    return () => clearInterval(thinkInterval);
  }, []);

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

  // Waveform üzerinden tıklanan yere sarma (Seek)
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !audioRef.current || !duration) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercent * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const contentKey = thinkingText.length + speechText.length + (isStreamComplete ? 1 : 0);

  return (
    <div className="flex min-h-[420px] w-full max-w-xl flex-col rounded-2xl  p-5 shadow-2xl font-sans text-stone-100">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-stone-300 font-medium uppercase tracking-wider">
            Miransas Pipeline
          </span>
        </div>
      </div>

      <AIConversation className="flex-1" contentKey={contentKey}>
        <div className="space-y-4 pr-1">
          {/* THINKING BLOĞU */}
          <div className="rounded-xl border border-stone-800/80 overflow-hidden transition-all duration-300 bg-black/60">
            <button
              type="button"
              onClick={() => setIsThoughtOpen(!isThoughtOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-stone-900/60 transition-colors"
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
                  <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px]">
                    <Check className="size-3.5 text-emerald-400" />
                    <span>Thought for {finalThoughtTime}s</span>
                  </div>
                )}
              </div>

              <ChevronDown
                className={`size-3.5 text-stone-500 transition-transform duration-300 ${
                  isThoughtOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isThoughtOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-stone-800/50 font-mono text-[11px] text-stone-400/90 leading-relaxed whitespace-pre-wrap">
                {thinkingText}
              </div>
            )}
          </div>

          {/* SES / TRANSCRIPT BLOĞU */}
          {speechText && (
            <div className="flex flex-col items-start space-y-2 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                <AudioLines className="animate-pulse text-emerald-400" size={16} />
                <span>MIRALAS AUDIO STREAM</span>
              </div>

              <div className="relative w-full rounded-2xl rounded-tl-xs bg-stone-900/80 border border-stone-800/60 p-4 text-[13px] text-stone-200 leading-relaxed shadow-sm space-y-4">
                <p className="font-sans">
                  {speechText}
                  {!isThinking && speechText.length < FULL_SPEECH.length && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </p>

                {/* AUDIO PLAYER */}
                {isStreamComplete && (
                  <div className="flex items-center gap-3 pt-3 border-t border-stone-800/80 select-none">
                    {/* Tıklanabilir Waveform Alanı */}
                    <div
                      ref={waveformRef}
                      onClick={handleSeek}
                      className="relative flex-1 flex items-center h-7 gap-[2px] cursor-pointer group"
                    >
                      {WAVEFORM_BARS.map((heightPercent, index) => {
                        const barPosition = (index / WAVEFORM_BARS.length) * 100;
                        const isPlayed = barPosition <= progressPercent;

                        return (
                          <span
                            key={index}
                            className={`w-[2px] rounded-full transition-colors duration-150 ${
                              isPlayed ? "bg-[#17c9b6]" : "bg-stone-700/60 group-hover:bg-stone-600"
                            }`}
                            style={{ height: `${Math.max(15, heightPercent)}%` }}
                          />
                        );
                      })}

                      {/* Scrubber Yuvarlağı */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
                        style={{ left: `${progressPercent}%` }}
                      >
                        <div className="w-[2px] h-6 bg-[#17c9b6]" />
                        <div className="size-2.5 rounded-full bg-white shadow-md border border-stone-900 -mt-4" />
                      </div>
                    </div>

                    {/* Süre Bilgisi */}
                    <span className="text-[11px] font-mono text-stone-400 shrink-0">
                      {formatTime(currentTime)} / {formatTime(duration || 10)}
                    </span>

                    {/* Play/Pause */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="text-stone-300 hover:text-white transition p-1 rounded-lg hover:bg-stone-800"
                    >
                      {isPlaying ? (
                        <Pause className="size-4 fill-current text-[#17c9b6]" />
                      ) : (
                        <Play className="size-4 fill-current" />
                      )}
                    </button>

                    {/* İndirme (Download) */}
                    <a
                      href={AUDIO_SRC}
                      download="miralas-voice.mp3"
                      className="text-stone-400 hover:text-white transition p-1 rounded-lg hover:bg-stone-800"
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