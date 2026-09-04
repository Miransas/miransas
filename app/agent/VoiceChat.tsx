"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Phase =
  | "idle"
  | "recording"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "done";

type SSEEvent =
  | { audio: string } // base64
  | { done: true; transcript: string; response: string; session_id: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function VoiceChat() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioQueueRef = useRef<string[]>([]); // base64 chunks
  const isPlayingRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Timer for recording/thinking phases
  useEffect(() => {
    if (phase !== "recording" && phase !== "thinking" && phase !== "speaking") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    startedAtRef.current ||= performance.now();
    const tick = () => {
      setElapsed((performance.now() - startedAtRef.current) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  const playQueue = useCallback(async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();

    let cursor = 0;
    while (cursor < audioQueueRef.current.length) {
      const b64 = audioQueueRef.current[cursor++];
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      try {
        const buf = await ctx.decodeAudioData(bytes.buffer.slice(0));
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start();
        await new Promise<void>((resolve) => {
          src.onended = () => resolve();
        });
      } catch {
        // skip bad chunk
      }
    }
    // keep polling queue for ~3s (streaming might add more)
    const drainStart = performance.now();
    while (performance.now() - drainStart < 3000) {
      if (audioQueueRef.current.length > cursor) {
        // more chunks arrived, keep playing
        continue;
      }
      await new Promise((r) => setTimeout(r, 100));
    }

    isPlayingRef.current = false;
    setPhase("done");
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setTranscript("");
      setResponse("");
      audioQueueRef.current = [];
      audioChunksRef.current = [];
      startedAtRef.current = 0;
      setElapsed(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setPhase("thinking");
        startedAtRef.current = 0;

        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const fd = new FormData();
        fd.append("audio", blob, "audio.webm");
        if (sessionIdRef.current) {
          fd.append("session_id", sessionIdRef.current);
        }

        try {
          const res = await fetch(`${API_URL}/api/voice/stream`, {
            method: "POST",
            body: fd,
          });
          if (!res.ok || !res.body) {
            throw new Error(`stream failed: ${res.status}`);
          }

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let firstAudioSeen = false;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (!json) continue;
              try {
                const ev: SSEEvent = JSON.parse(json);
                if ("audio" in ev) {
                  if (!firstAudioSeen) {
                    firstAudioSeen = true;
                    setPhase("speaking");
                    startedAtRef.current = 0;
                    playQueue();
                  }
                  audioQueueRef.current.push(String(ev.audio));
                } else if ("done" in ev) {
                  setTranscript(ev.transcript);
                  setResponse(ev.response);
                  sessionIdRef.current = ev.session_id;
                }
              } catch {
                // skip
              }
            }
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : "unknown");
          setPhase("idle");
        }
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setPhase("recording");
      startedAtRef.current = 0;
    } catch (e) {
      setError(e instanceof Error ? e.message : "mic error");
      setPhase("idle");
    }
  }, [playQueue]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setTranscript("");
    setResponse("");
    setElapsed(0);
    audioQueueRef.current = [];
  }, []);

  // Pulse ring animation helper
  const isLive =
    phase === "recording" || phase === "thinking" || phase === "speaking";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
      {/* Mic button */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {isLive && (
            <>
              <div
                className={`absolute inset-0 rounded-full ${
                  phase === "recording"
                    ? "bg-red-500/30"
                    : phase === "speaking"
                      ? "bg-emerald-500/30"
                      : "bg-purple-500/30"
                } animate-ping`}
              />
              <div
                className={`absolute -inset-4 rounded-full ${
                  phase === "recording"
                    ? "bg-red-500/10"
                    : phase === "speaking"
                      ? "bg-emerald-500/10"
                      : "bg-purple-500/10"
                } blur-2xl`}
              />
            </>
          )}

          {phase === "idle" || phase === "done" ? (
            <button
              onClick={startRecording}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 active:scale-95"
              aria-label="Start recording"
            >
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1a4 4 0 00-4 4v7a4 4 0 008 0V5a4 4 0 00-4-4zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
                />
              </svg>
            </button>
          ) : phase === "recording" ? (
            <button
              onClick={stopRecording}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/40 transition hover:scale-105"
              aria-label="Stop recording"
            >
              <div className="h-8 w-8 rounded-sm bg-white" />
            </button>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-400">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm font-medium capitalize text-white/80">
            {phase === "idle" && "mikrofona bas ve konuş"}
            {phase === "recording" && `kaydediliyor • ${elapsed.toFixed(1)}s`}
            {phase === "transcribing" && "duyuyorum..."}
            {phase === "thinking" && `düşünüyor • ${elapsed.toFixed(1)}s`}
            {phase === "speaking" && "konuşuyor..."}
            {phase === "done" && "bitti • yeniden başlat"}
          </div>
        </div>
      </div>

      {/* Transcript + response */}
      {(transcript || response || error) && (
        <div className="mt-8 space-y-3">
          {transcript && (
            <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                sen dedin
              </div>
              <div className="text-sm text-white/90">{transcript}</div>
            </div>
          )}
          {response && (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 p-4">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                miralas
              </div>
              <div className="text-sm leading-relaxed text-white/95">
                {response}
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Reset */}
      {phase === "done" && (
        <button
          onClick={reset}
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
        >
          yeni konuşma
        </button>
      )}
    </div>
  );
}