import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, TextReveal } from './reval';

const facts = [
  {
    value: '23',
    label: 'Model languages',
    detail: 'Language coverage from the current Chatterbox Multilingual baseline.',
  },
  {
    value: '24 kHz',
    label: 'Audio pipeline',
    detail: 'Mono PCM16 output from the Python voice worker.',
  },
  {
    value: 'Rust + Python',
    label: 'Connected over gRPC',
    detail: 'API and voice worker integration verified in development.',
  },
  {
    value: 'Verified artifacts',
    label: 'Approved model files',
    detail: 'Pinned model artifacts are checked before loading.',
  },
];

const research = [
  {
    title: 'Chatterbox Multilingual',
    status: 'Current baseline',
    description:
      'The approved checkpoint is t3_mtl23ls_v2.safetensors. Model validation and language-specific evaluation guide the next steps.',
    meta: 't3_mtl23ls_v2.safetensors',
  },
  {
    title: 'Uzbek Speech Research',
    status: 'In Development',
    description:
      'Building toward native Uzbek speech support. Uzbek remains a research priority outside the current 23 model languages.',
    meta: 'Priority Research',
  },
  {
    title: 'Additional speech engines',
    status: 'Future exploration',
    description:
      'Further engines may be evaluated as the research develops. The current implementation uses Chatterbox Multilingual.',
    meta: 'Evaluation',
  },
];

const pipeline = [
  { step: '01', title: 'Text Input', detail: 'A synthesis request' },
  { step: '02', title: 'Rust API', detail: 'Authorization and routing' },
  { step: '03', title: 'Python Voice Engine', detail: 'Chatterbox over gRPC' },
  { step: '04', title: 'Audio Output', detail: '24 kHz · mono PCM16' },
];

export function EngineeringReality() {
  return (
    <section
      aria-labelledby="engineering-progress-title"
      className="surface-page px-6 pt-12 pb-24 sm:pt-16 sm:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
            Engineering progress
          </span>
        </Reveal>
        <TextReveal
          id="engineering-progress-title"
          className="text-heading mt-4 max-w-3xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
        >
          A working foundation.
          <br />A deliberate path forward.
        </TextReveal>
        <Reveal>
          <p className="text-supporting-copy mt-6 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
            The Miralas voice stack is taking shape through model validation, a
            connected audio pipeline and development infrastructure.
          </p>
        </Reveal>
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 0.06}
              className="surface-card h-full rounded-3xl p-6 sm:p-7"
            >
              <dt className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                {fact.label}
              </dt>
              <dd className="text-heading mt-4 tabular-nums text-2xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-3xl">
                {fact.value}
              </dd>
              <dd className="text-supporting-copy mt-4 text-[15px] leading-[1.6] sm:text-base">
                {fact.detail}
              </dd>
            </Reveal>
          ))}
        </dl>
        <Reveal>
          <p className="text-supporting-copy mt-10 max-w-2xl text-[15px] leading-[1.6] sm:text-base">
            Docker development and benchmark infrastructure is implemented. GPU
            performance on real NVIDIA hardware remains unmeasured.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ModelResearch() {
  return (
    <section
      aria-labelledby="research-title"
      className="surface-page relative overflow-x-clip px-6 py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
            Model research
          </span>
        </Reveal>
        <TextReveal
          id="research-title"
          className="text-heading mt-4 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
        >
          Speech research,
          <br />
          one language at a time.
        </TextReveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {research.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className="surface-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 lg:p-8"
            >
              <div className="relative z-10">
                <span className="text-prominent inline-flex items-center gap-2 rounded-xl bg-surface-card-elevated px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                  <span aria-hidden="true" className="size-1.5 rounded-xl bg-[#0d4bfa]" />
                  {item.status}
                </span>
                <h3 className="mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.02em] text-heading sm:text-2xl lg:text-[1.65rem]">
                  {item.title}
                </h3>
              </div>

              <div className="relative z-10 mt-6 flex flex-col gap-5">
                <p className="text-supporting-copy text-[15px] leading-[1.6] [overflow-wrap:anywhere] sm:text-base">
                  {item.description}
                </p>
                <div>
                  <span className="text-prominent inline-flex max-w-full items-center rounded-xl bg-surface-card-elevated px-3 py-1 text-xs leading-relaxed [overflow-wrap:anywhere]">
                    {item.meta}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/models"
            className="text-prominent inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-transparent bg-surface-card px-5 py-3 text-sm font-medium transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
          >
            Read the model notes{' '}
            <ArrowUpRight aria-hidden className="size-4 text-[#0d4bfa]" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function VoiceInfrastructure() {
  return (
    <section
      aria-labelledby="infrastructure-title"
      className="surface-page px-6 pb-24 sm:pb-32"
    >
      <div className="surface-card relative mx-auto max-w-6xl rounded-4xl px-6 py-10 sm:p-10 lg:p-12">
        <div className="relative z-10">
          <Reveal>
            <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
              Architecture &amp; pipeline
            </span>
          </Reveal>
          <TextReveal
            id="infrastructure-title"
            className="text-heading mt-4 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
          >
            From a sentence to audio.
          </TextReveal>
          <Reveal>
            <p className="text-prominent mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
              The Rust API connects to a Python voice worker over gRPC. Each layer
              has a defined role in the synthesis path.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-5 lg:grid-cols-4">
            {pipeline.map((step, index) => (
              <li key={step.title} className="min-w-0">
                <Reveal
                  delay={index * 0.08}
                  className="flex h-full flex-col justify-between rounded-xl bg-surface-card-elevated p-6"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-prominent font-mono tabular-nums text-xs leading-[1.45] sm:text-[13px]">
                        {step.step} / 04
                      </span>
                      {index < pipeline.length - 1 && (
                        <>
                          <ArrowRight
                            aria-hidden
                            className="hidden size-4 text-[#0d4bfa] lg:block"
                          />
                          <ArrowDown
                            aria-hidden
                            className="size-4 text-[#0d4bfa] lg:hidden"
                          />
                        </>
                      )}
                    </div>
                    <div
                      aria-hidden
                      className="pipeline-line relative mb-5 h-0.5 overflow-hidden rounded-xl bg-[#0d4bfa]/25"
                    />
                    <h3 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-supporting-copy mt-3 text-sm leading-relaxed">
                    {step.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <p className="text-supporting-copy mt-10 max-w-2xl text-[15px] leading-[1.6] sm:text-base">
              Voice Catalog architecture is implemented. Public curated voices
              remain in preparation, with zero verified voices published in the
              current baseline. Voice cloning follows a permission-based
              architecture and remains in development.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
