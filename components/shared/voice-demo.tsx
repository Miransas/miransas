'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Play, Pause, Download, AudioLines } from 'lucide-react';
import AIConversation from '../smoothui/ai-conversation';
import AILoader from '../smoothui/ai-loader';

const THINKING_STEPS = ['Example step: inspect the audio input...', 'Example step: prepare voice features...', 'Example step: select a voice configuration...', 'Example step: present the recorded audio sample...'];

const FULL_SPEECH = 'Assalomu alaykum! Miransas neural voice model is active. High-fidelity speech synthesis for Uzbek and multilingual evaluation is now streaming live.';

const AUDIO_SRC = '/tts-actor-miralas.mp3';

const WAVEFORM_BARS = [10, 20, 15, 30, 20, 10, 10, 25, 10, 10, 80, 10, 20, 15, 10, 10, 10, 25, 80, 10, 20, 100, 10, 15, 10, 20, 10, 10, 45, 60, 50, 40, 10, 10, 10, 10, 20, 10, 10, 30, 10, 10, 10, 10, 10, 10, 10, 50, 80, 10, 20, 100, 10, 10, 20, 10, 10, 10, 10, 10, 10, 40, 60, 10, 10, 20, 10, 10, 10];

export default function LiveVoiceStream() {
  const [thinkingText, setThinkingText] = useState('');
  const [speechText, setSpeechText] = useState('');

  const [isThinking, setIsThinking] = useState(true);
  const [isThoughtOpen, setIsThoughtOpen] = useState(true);
  const [finalThoughtTime, setFinalThoughtTime] = useState('0.0');

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStreamComplete, setIsStreamComplete] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncDuration = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    // Cached audio may load its metadata before React attaches event handlers.
    const frame = requestAnimationFrame(syncDuration);
    audio.addEventListener('durationchange', syncDuration);
    return () => {
      cancelAnimationFrame(frame);
      audio.removeEventListener('durationchange', syncDuration);
    };
  }, []);

  useEffect(() => {
    let stepIndex = 0;
    const startTime = Date.now();
    let speechInterval: ReturnType<typeof setInterval> | undefined;

    const thinkInterval = setInterval(() => {
      if (stepIndex < THINKING_STEPS.length) {
        const nextStep = THINKING_STEPS[stepIndex];
        setThinkingText((prev) => (prev ? `${prev}\n▸ ${nextStep}` : `▸ ${nextStep}`));
        stepIndex++;
      } else {
        clearInterval(thinkInterval);
        setIsThinking(false);
        setIsThoughtOpen(false);
        setFinalThoughtTime(((Date.now() - startTime) / 1000).toFixed(1));

        let speechIndex = 0;
        speechInterval = setInterval(() => {
          if (speechIndex < FULL_SPEECH.length) {
            const character = FULL_SPEECH[speechIndex];
            speechIndex++;
            setSpeechText((prev) => prev + character);
          } else {
            clearInterval(speechInterval);
            setIsStreamComplete(true);
          }
        }, 20);
      }
    }, 500);

    return () => {
      clearInterval(thinkInterval);
      if (speechInterval) clearInterval(speechInterval);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
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
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const contentKey = thinkingText.length + speechText.length + (isStreamComplete ? 1 : 0);

  return (
    <div className="border-border bg-card text-foreground flex h-full min-h-[400px] w-full max-w-xl flex-col rounded-2xl border p-4 font-sans">
      <audio ref={audioRef} src={AUDIO_SRC} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} preload="auto" />

      {/* Header */}
      <div className="border-border mb-4 flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="bg-foreground/50 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-foreground/60 relative inline-flex h-2 w-2 rounded-full" />
          </span>
          <span className="text-foreground font-mono text-xs font-medium tracking-wider uppercase">Recorded audio · workflow demo</span>
        </div>
      </div>

      <AIConversation className="flex-1" contentKey={contentKey}>
        <div className="space-y-4 pr-1">
          {/* THINKING BLOĞU */}
          <div className="border-border bg-elevated overflow-hidden rounded-xl border transition-all duration-300">
            <button aria-expanded={isThoughtOpen} aria-label="Toggle demonstration steps" type="button" onClick={() => setIsThoughtOpen(!isThoughtOpen)} className="hover:bg-secondary flex w-full items-center justify-between px-3.5 py-2.5 transition-colors">
              <div className="flex items-center gap-2">
                {isThinking ? (
                  <AILoader variant="grid" label="Thinking" showElapsed={true} className="text-foreground font-mono text-[11px]" />
                ) : (
                  <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px]">
                    <Check className="text-foreground size-3.5" />
                    <span>Thought for {finalThoughtTime}s</span>
                  </div>
                )}
              </div>

              <ChevronDown className={`text-muted-foreground size-3.5 transition-transform duration-300 ${isThoughtOpen ? 'rotate-180' : ''}`} />
            </button>

            {isThoughtOpen && <div className="border-border text-muted-foreground border-t px-3.5 pt-1 pb-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">{thinkingText}</div>}
          </div>

          {/* SES / TRANSCRIPT BLOĞU */}
          {speechText && (
            <div className="flex flex-col items-start space-y-2 pt-2">
              <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px]">
                <AudioLines className="text-foreground animate-pulse" size={16} />
                <span>MIRALAS AUDIO SAMPLE</span>
              </div>

              <div className="bg-secondary border-border text-foreground relative w-full space-y-4 rounded-2xl rounded-tl-xs border p-4 text-[13px] leading-relaxed shadow-sm">
                <p className="font-sans">
                  {speechText}
                  {!isThinking && speechText.length < FULL_SPEECH.length && <span className="bg-foreground/50 ml-1 inline-block h-3.5 w-1.5 animate-pulse align-middle" />}
                </p>

                {/* AUDIO PLAYER */}
                {isStreamComplete && (
                  <div className="border-border flex items-center gap-3 border-t pt-3 select-none">
                    {/* Tıklanabilir Waveform Alanı */}
                    <div
                      ref={waveformRef}
                      onClick={handleSeek}
                      role="slider"
                      tabIndex={0}
                      aria-label="Audio position"
                      aria-valuemin={0}
                      aria-valuemax={duration || 0}
                      aria-valuenow={currentTime}
                      onKeyDown={(event) => {
                        if (!audioRef.current || !duration) return;
                        const next = event.key === 'Home' ? 0 : event.key === 'End' ? duration : event.key === 'ArrowRight' ? Math.min(duration, currentTime + 5) : event.key === 'ArrowLeft' ? Math.max(0, currentTime - 5) : null;
                        if (next === null) return;
                        event.preventDefault();
                        audioRef.current.currentTime = next;
                        setCurrentTime(next);
                      }}
                      className="group relative flex h-7 min-w-0 flex-1 cursor-pointer items-center gap-px"
                    >
                      {WAVEFORM_BARS.map((heightPercent, index) => {
                        const barPosition = (index / WAVEFORM_BARS.length) * 100;
                        const isPlayed = barPosition <= progressPercent;

                        return <span key={index} className={`w-[2px] rounded-full transition-colors duration-150 ${index % 2 ? 'hidden sm:block' : ''} ${isPlayed ? 'bg-foreground' : 'bg-stone-700/60 group-hover:bg-stone-600'}`} style={{ height: `${Math.max(15, heightPercent)}%` }} />;
                      })}

                      {/* Scrubber Yuvarlağı */}
                      <div className="pointer-events-none absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-75" style={{ left: `${progressPercent}%` }}>
                        <div className="bg-foreground h-6 w-[2px]" />
                        <div className="border-border -mt-4 size-2.5 rounded-full border bg-white shadow-md" />
                      </div>
                    </div>

                    {/* Süre Bilgisi */}
                    <span className="text-muted-foreground shrink-0 font-mono text-[11px]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    {/* Play/Pause */}
                    <button type="button" aria-label={isPlaying ? 'Pause audio sample' : 'Play audio sample'} onClick={togglePlay} className="text-foreground hover:text-foreground hover:bg-secondary rounded-lg p-1 transition">
                      {isPlaying ? <Pause className="text-foreground size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                    </button>

                    {/* İndirme (Download) */}
                    <a href={AUDIO_SRC} download="miralas-voice.mp3" aria-label="Download audio sample" className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg p-1 transition">
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
