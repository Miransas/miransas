import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, TextReveal } from './reval';

const facts = [
  { value: '23', label: 'Model languages', detail: 'Language coverage from the current Chatterbox Multilingual baseline.' },
  { value: '24 kHz', label: 'Audio pipeline', detail: 'Mono PCM16 output from the Python voice worker.' },
  { value: 'Rust + Python', label: 'Connected over gRPC', detail: 'API and voice worker integration verified in development.' },
  { value: 'Verified artifacts', label: 'Approved model files', detail: 'Pinned model artifacts are checked before loading.' },
];

const research = [
  { title: 'Chatterbox Multilingual', status: 'Current baseline', description: 'The approved checkpoint is t3_mtl23ls_v2.safetensors. Model validation and language-specific evaluation guide the next steps.' },
  { title: 'Uzbek Speech Research', status: 'In Development', description: 'Building toward native Uzbek speech support. Uzbek remains a research priority outside the current 23 model languages.' },
  { title: 'Additional speech engines', status: 'Future exploration', description: 'Further engines may be evaluated as the research develops. The current implementation uses Chatterbox Multilingual.' },
];

const pipeline = [
  { title: 'Text Input', detail: 'A synthesis request' },
  { title: 'Rust API', detail: 'Authorization and routing' },
  { title: 'Python Voice Engine', detail: 'Chatterbox over gRPC' },
  { title: 'Audio Output', detail: '24 kHz · mono PCM16' },
];

export function EngineeringReality() {
  return (
    <section aria-labelledby="engineering-progress-title" className="bg-card px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal><p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">Engineering progress</p></Reveal>
        <TextReveal id="engineering-progress-title" className="mt-6 max-w-3xl text-3xl leading-[1.15] tracking-[-0.04em] sm:text-5xl">A working foundation.<br />A deliberate path forward.</TextReveal>
        <Reveal><p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">The Miralas voice stack is taking shape through model validation, a connected audio pipeline and development infrastructure.</p></Reveal>
        <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.06}>
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="mt-3 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{fact.value}</dd>
              <dd className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">{fact.detail}</dd>
            </Reveal>
          ))}
        </dl>
        <Reveal><p className="mt-14 max-w-2xl text-sm leading-7 text-muted-foreground">Docker development and benchmark infrastructure is implemented. GPU performance on real NVIDIA hardware remains unmeasured.</p></Reveal>
      </div>
    </section>
  );
}

export function ModelResearch() {
  return (
    <section aria-labelledby="research-title" className="bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <TextReveal id="research-title" className="max-w-2xl text-3xl leading-[1.15] tracking-[-0.04em] sm:text-5xl">Speech research,<br />one language at a time.</TextReveal>
        <div className="mt-14 space-y-12 sm:space-y-16">
          {research.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-16">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">{item.status}</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight sm:text-2xl">{item.title}</h3>
              </div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">{item.description}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <Link href="/models" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium hover:opacity-70">Read the model notes <ArrowUpRight aria-hidden className="size-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function VoiceInfrastructure() {
  return (
    <section aria-labelledby="infrastructure-title" className="bg-background px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl rounded-4xl bg-card px-6 py-12 sm:p-12 lg:p-16">
        <TextReveal id="infrastructure-title" className="max-w-2xl text-3xl leading-[1.15] tracking-[-0.04em] sm:text-4xl">From a sentence to audio.</TextReveal>
        <Reveal><p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">The Rust API connects to a Python voice worker over gRPC. Each layer has a defined role in the synthesis path.</p></Reveal>
        <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {pipeline.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <Reveal delay={index * 0.08}>
                <div aria-hidden className="pipeline-line relative mb-5 h-px overflow-hidden bg-foreground/15" />
                <h3 className="text-base font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                {index < pipeline.length - 1 && (
                  <>
                    <ArrowRight aria-hidden className="mt-5 hidden size-4 text-muted-foreground lg:block" />
                    <ArrowDown aria-hidden className="mt-5 size-4 text-muted-foreground lg:hidden" />
                  </>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal><p className="mt-10 max-w-2xl text-sm leading-7 text-muted-foreground">Voice Catalog architecture is implemented. Public curated voices remain in preparation, with zero verified voices published in the current baseline. Voice cloning follows a permission-based architecture and remains in development.</p></Reveal>
      </div>
    </section>
  );
}
