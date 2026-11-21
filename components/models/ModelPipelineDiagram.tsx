'use client';

import {
  AudioWaveform,
  Cpu,
  FileAudio,
  Layers,
  Mic,
  Music,
  Server,
  ShieldCheck,
  Sliders,
  Sparkles,
  Volume2,
  type LucideIcon,
} from 'lucide-react';

export type ModelTabId = 'chatterbox' | 'ace-step' | 'stable-audio';

type PipelineStep = {
  step: string;
  stage: string;
  title: string;
  detail: string;
  spec: string;
  icon: LucideIcon;
  highlight?: boolean;
};

type InternalStage = {
  index: string;
  name: string;
  role: string;
};

type PipelineConfig = {
  heading: string;
  subheading: string;
  runtimeLabel: string;
  steps: PipelineStep[];
  internalTitle: string;
  internalNote: string;
  internalStages: InternalStage[];
};

const PIPELINES: Record<ModelTabId, PipelineConfig> = {
  chatterbox: {
    heading: 'How Chatterbox runs inside Miralas',
    subheading:
      'End-to-end synthesis path from an authorized request through the Rust API gateway to the Python gRPC GPU worker.',
    runtimeLabel: 'Verified in development · Rust API + Python gRPC worker',
    steps: [
      {
        step: '01',
        stage: 'Input Layer',
        title: 'Text + Optional Reference Audio',
        detail:
          'Target text prompt paired with a baseline voice or an authorized ~10s single-speaker reference clip.',
        spec: '23 baseline languages · ~10s ref',
        icon: Mic,
      },
      {
        step: '02',
        stage: 'Rust API Gateway',
        title: 'Auth, Rate Limit & Consent Check',
        detail:
          'Validates request permissions, enforces voice-owner consent rules, and routes over internal gRPC.',
        spec: 'Rust · gRPC · Auth & Policy',
        icon: ShieldCheck,
      },
      {
        step: '03',
        stage: 'Python GPU Worker',
        title: 'Chatterbox t3_mtl23ls_v2',
        detail:
          'Verifies pinned artifact checksum before loading, extracts speaker embedding, and runs token-to-mel-to-waveform synthesis.',
        spec: 't3_mtl23ls_v2.safetensors',
        icon: Cpu,
        highlight: true,
      },
      {
        step: '04',
        stage: 'Output & Watermark',
        title: 'Post-Processing & 24 kHz Audio Output',
        detail:
          'Embeds an imperceptible PerTh neural watermark and streams or returns 24 kHz mono PCM16 audio.',
        spec: '24 kHz · Mono PCM16 · PerTh',
        icon: AudioWaveform,
      },
    ],
    internalTitle: 'Internal Chatterbox synthesis stages (token-to-waveform)',
    internalNote:
      'The language model determines linguistic content and rhythm, while the speaker embedding determines vocal identity.',
    internalStages: [
      {
        index: '1',
        name: 'Tokenizer',
        role: 'Splits input text into linguistic tokens understood by the backbone.',
      },
      {
        index: '2',
        name: 'Speaker Embedding',
        role: 'Extracts vocal timbre, pitch, and style fingerprint from the ~10s reference clip.',
      },
      {
        index: '3',
        name: 'Llama-Based LM',
        role: 'Generates prosody-aware speech tokens conditioned on text and speaker identity.',
      },
      {
        index: '4',
        name: 'Mel Decoder',
        role: 'Translates generated speech tokens and speaker embedding into a mel spectrogram.',
      },
      {
        index: '5',
        name: 'Vocoder',
        role: 'Synthesizes an audible 24 kHz waveform from the mel spectrogram.',
      },
      {
        index: '6',
        name: 'PerTh Watermark',
        role: 'Embeds an imperceptible neural watermark resilient to compression and editing.',
      },
    ],
  },
  'ace-step': {
    heading: 'How ACE-Step 1.5 is architected for Miralas',
    subheading:
      'Planned asynchronous music generation pipeline connecting the Rust API job queue to dedicated GPU diffusion workers.',
    runtimeLabel: 'Planned / In Evaluation · Async GPU Worker Queue',
    steps: [
      {
        step: '01',
        stage: 'Input Layer',
        title: 'Style Prompt + Structured Lyrics',
        detail:
          'Musical genre/instrumentation prompt combined with optional lyrics and section markers ([Verse], [Chorus], [Bridge]).',
        spec: '50+ languages · Instrumental or Vocal',
        icon: Music,
      },
      {
        step: '02',
        stage: 'Rust API Gateway',
        title: 'Job Queue & Credit Check',
        detail:
          'Validates prompt constraints and duration bounds (10s to 10 min) and dispatches the job to the music worker queue.',
        spec: 'Rust · Async Job Dispatch',
        icon: Server,
      },
      {
        step: '03',
        stage: 'Python Music Worker',
        title: 'Qwen3 Text Encoder + ACE-Step 1.5 Diffusion',
        detail:
          'Encodes semantic style and lyric structure via Qwen3-Embedding-0.6B and runs ACE-Step 1.5 diffusion synthesis.',
        spec: 'MIT Core + Apache 2.0 Encoder',
        icon: Sparkles,
        highlight: true,
      },
      {
        step: '04',
        stage: 'Output Delivery',
        title: 'Stereo Mastering & Audio Delivery',
        detail:
          'Decodes latent audio into a full-band stereo track with loudness normalization for preview and export.',
        spec: 'Up to 10 min · Full-Song Stereo',
        icon: FileAudio,
      },
    ],
    internalTitle: 'Internal ACE-Step 1.5 generation stages',
    internalNote:
      'Combines Apache-2.0 semantic embedding conditioning with an MIT-licensed diffusion backbone designed for fast worker inference.',
    internalStages: [
      {
        index: '1',
        name: 'Prompt & Lyric Parser',
        role: 'Separates acoustic style descriptors from structural tags ([Verse], [Chorus], [Bridge]).',
      },
      {
        index: '2',
        name: 'Qwen3-Embedding-0.6B',
        role: 'Apache-2.0 text encoder producing multilingual semantic and rhythmic conditioning.',
      },
      {
        index: '3',
        name: 'ACE-Step 1.5 Diffusion',
        role: 'MIT-licensed diffusion transformer generating coherent long-horizon musical latents.',
      },
      {
        index: '4',
        name: 'Stereo Decoder',
        role: 'Reconstructs vocal and instrumental stems into full-length stereo audio.',
      },
    ],
  },
  'stable-audio': {
    heading: 'How Stable Audio Open is architected for Miralas',
    subheading:
      'Planned sound effects, foley, and loop generation path from text prompt and duration conditioning to 44.1 kHz stereo output.',
    runtimeLabel: 'Planned / In Evaluation · Non-Vocal SFX & Loop Worker',
    steps: [
      {
        step: '01',
        stage: 'Input Layer',
        title: 'SFX Prompt + Duration up to 47s',
        detail:
          'Text description of the target sound effect, ambient texture, foley impact, or instrumental loop plus target duration.',
        spec: '0–47 sec · Non-vocal audio prompt',
        icon: Sliders,
      },
      {
        step: '02',
        stage: 'Rust API Gateway',
        title: 'Request Validation & Dispatch',
        detail:
          'Checks duration limits, enforces non-vocal SFX scope, and routes the generation request to the audio worker.',
        spec: 'Rust · gRPC · Scope Guardrails',
        icon: Layers,
      },
      {
        step: '03',
        stage: 'Python Audio Worker',
        title: 'Stable Audio Open DiT',
        detail:
          'Runs latent Diffusion Transformer (DiT) conditioned on text and exact timing embeddings (`seconds_start`, `seconds_total`).',
        spec: 'DiT · Timing-Conditioned Latents',
        icon: Cpu,
        highlight: true,
      },
      {
        step: '04',
        stage: 'Output Delivery',
        title: '44.1 kHz Stereo WAV / MP3 Output',
        detail:
          'Autoencoder decodes latent representations into crisp 44.1 kHz stereo sound effects or tempo-accurate loops.',
        spec: '44.1 kHz · Stereo WAV / MP3',
        icon: Volume2,
      },
    ],
    internalTitle: 'Internal Stable Audio Open synthesis stages',
    internalNote:
      'Purpose-built for 44.1 kHz stereo sound effects, foley, ambient soundscapes, and instrumental loops—explicitly not human vocals.',
    internalStages: [
      {
        index: '1',
        name: 'T5 Text Conditioning',
        role: 'Encodes acoustic texture, impact characteristics, or BPM loop descriptions.',
      },
      {
        index: '2',
        name: 'Timing Conditioning',
        role: 'Injects exact start and total duration parameters (up to 47 seconds) so sounds end cleanly.',
      },
      {
        index: '3',
        name: 'Diffusion Transformer (DiT)',
        role: 'Denoises compressed stereo audio latents in operator-controlled GPU memory.',
      },
      {
        index: '4',
        name: '44.1 kHz Autoencoder',
        role: 'Decodes latent tokens directly into full-bandwidth 44.1 kHz stereo waveforms.',
      },
    ],
  },
};

function HorizontalConnector() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden items-center justify-center lg:flex"
    >
      <svg
        width="36"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
        className="w-8 shrink-0 text-[#0d4bfa]"
      >
        <line
          x1="2"
          y1="10"
          x2="28"
          y2="10"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="15" cy="10" r="2.2" fill="currentColor">
          <animate
            attributeName="cx"
            values="4;26;4"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M25 5.5L30.5 10L25 14.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function VerticalConnector() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex items-center justify-center py-1 lg:hidden"
    >
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        className="h-6 text-[#0d4bfa]"
      >
        <line
          x1="10"
          y1="2"
          x2="10"
          y2="21"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M5.5 18L10 23.5L14.5 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ModelPipelineDiagram({ modelId }: { modelId: ModelTabId }) {
  const config = PIPELINES[modelId];

  return (
    <div className="rounded-3xl bg-[#F7F8FC] p-6 sm:p-8 dark:bg-[#121214]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-[#0d4bfa] uppercase dark:text-[#6b93ff]">
            <span aria-hidden="true" className="size-1.5 rounded-xl bg-[#0d4bfa]" />
            Architecture &amp; Execution Flow
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-2xl dark:text-white">
            {config.heading}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-[1.6] text-neutral-600 dark:text-[#6E6E74]">
            {config.subheading}
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 items-center rounded-xl bg-black/[0.04] px-3 py-1.5 font-mono text-xs text-neutral-700 dark:bg-white/[0.05] dark:text-[#D1D1D1]">
          {config.runtimeLabel}
        </span>
      </div>

      {/* 4-Step Infrastructure Pipeline (Left-to-Right on Desktop, Vertical on Mobile) */}
      <ol
        aria-label={`${config.heading} steps`}
        className="mt-7 flex flex-col lg:flex-row lg:items-stretch"
      >
        {config.steps.map((node, index) => {
          const Icon = node.icon;
          return (
            <li
              key={node.step}
              className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-stretch"
            >
              <div
                className={`relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-5 ${
                  node.highlight
                    ? 'bg-[#0d4bfa]/[0.08] dark:bg-[#0d4bfa]/[0.14]'
                    : 'bg-white dark:bg-[#0a0a0a]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#0d4bfa] dark:text-[#89abff]">
                      <span>{node.step}</span>
                      <span className="text-neutral-400 dark:text-[#6E6E74]">·</span>
                      <span className="tracking-[0.06em] uppercase">{node.stage}</span>
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-white/[0.06] dark:text-[#89abff]">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </div>

                  <h4 className="mt-3.5 text-base leading-[1.3] font-semibold tracking-[-0.015em] text-[#1d1d1f] dark:text-white">
                    {node.title}
                  </h4>

                  <p className="mt-2 text-xs leading-[1.6] text-neutral-600 sm:text-[13px] dark:text-[#D1D1D1]">
                    {node.detail}
                  </p>
                </div>

                <div className="mt-4 pt-2">
                  <span className="inline-flex rounded-xl bg-[#EFEFEF]/80 px-2.5 py-1 font-mono text-[11px] leading-[1.4] text-neutral-700 dark:bg-[#121214] dark:text-[#D1D1D1]">
                    {node.spec}
                  </span>
                </div>
              </div>

              {index < config.steps.length - 1 && (
                <>
                  <HorizontalConnector />
                  <VerticalConnector />
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Internal Model Stage Breakdown */}
      <div className="mt-7 rounded-xl bg-white p-5 dark:bg-[#0a0a0a]">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <h4 className="text-sm font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white">
            {config.internalTitle}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-[#6E6E74]">
            {config.internalNote}
          </p>
        </div>

        <div
          className={`mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${
            config.internalStages.length === 6
              ? 'lg:grid-cols-6'
              : 'lg:grid-cols-4'
          }`}
        >
          {config.internalStages.map((stage) => (
            <div
              key={stage.index}
              className="flex flex-col justify-between rounded-xl bg-[#F7F8FC] p-3.5 dark:bg-[#121214]"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-xl bg-[#0d4bfa]/12 font-mono text-[11px] font-semibold text-[#0d4bfa] dark:bg-[#0d4bfa]/20 dark:text-[#89abff]">
                    {stage.index}
                  </span>
                  <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                    {stage.name}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-[1.55] text-neutral-600 dark:text-[#6E6E74]">
                  {stage.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
