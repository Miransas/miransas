'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Info,
  LifeBuoy,
  Loader2,
  Mail,
  Mic,
  Newspaper,
  Rss,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';

type ContactChannel = {
  topic: string;
  label: string;
  description: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  external?: boolean;
  icon: LucideIcon;
  featured?: boolean;
};

const CHANNELS: ContactChannel[] = [
  {
    topic: 'General & Partnerships',
    label: 'contact@miransas.com',
    description: 'General questions, collaborations, and partnership inquiries.',
    href: 'mailto:contact@miransas.com',
    icon: Mail,
    featured: true,
  },
  {
    topic: 'Product Help',
    label: 'Visit Support',
    description: 'Troubleshooting, FAQs, and guidance before opening a request.',
    href: '/support',
    icon: LifeBuoy,
  },
  {
    topic: 'Security Reports',
    label: 'Subject: "Security"',
    description: 'Responsible vulnerability disclosure directly to our team.',
    href: 'mailto:contact@miransas.com?subject=Security',
    icon: ShieldAlert,
  },
  {
    topic: 'Voice Talent for Miralas',
    label: 'Subject: "Voice"',
    description: 'Uzbek speakers interested in contributing to Miralas.',
    href: 'mailto:contact@miransas.com?subject=Voice',
    icon: Mic,
  },
  {
    topic: 'Code & Issues',
    label: 'github.com/Miransas',
    description: 'Open repositories, bug reports, and engineering activity.',
    href: 'https://github.com/Miransas',
    external: true,
    icon: ArrowUpRight,
  },
  {
    topic: 'Product Updates',
    label: 'Miransas News',
    secondaryHref: '/news/rss.xml',
    secondaryLabel: 'RSS feed',
    description: 'Release notes, research updates, and engineering milestones.',
    href: '/news',
    icon: Newspaper,
  },
];

const BEFORE_YOU_WRITE = [
  {
    step: '01',
    title: 'Product help',
    body: (
      <>
        Check{' '}
        <Link
          href="/support"
          className="rounded-xl font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#6b93ff]"
        >
          Support
        </Link>{' '}
        first. Many answers are already there.
      </>
    ),
  },
  {
    step: '02',
    title: 'Be specific',
    body: 'Tell us which product, what you expected, and what happened. Screenshots help.',
  },
  {
    step: '03',
    title: 'Never send secrets',
    body: 'Do not include passwords, API keys, or tokens in a message. If you pasted one by mistake, tell us and rotate it.',
  },
];

const TOPIC_OPTIONS = [
  'General / Partnerships',
  'Product Support',
  'Security',
  'Voice Talent (Miralas)',
] as const;

type TopicOption = (typeof TOPIC_OPTIONS)[number];

type FormFeedback =
  | { type: 'idle' }
  | {
      type: 'delivered';
      message: string;
    }
  | {
      type: 'fallback';
      message: string;
      mailtoUrl: string;
    }
  | {
      type: 'error';
      message: string;
      mailtoUrl?: string;
    };

const INPUT_CLASSES =
  'w-full rounded-xl border border-black/[0.08] bg-[#EFEFEF]/60 px-4 py-3.5 text-sm text-[#1d1d1f] placeholder:text-[#6E6E74] transition-colors focus:border-[#0d4bfa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4bfa]/30 dark:border dark:border-white/10 dark:bg-[#050505] dark:text-white';

export function ContactView() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<TopicOption>('General / Partnerships');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormFeedback>({ type: 'idle' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@miransas.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const buildClientMailto = () => {
    const subjectPrefix =
      topic === 'Security'
        ? 'Security'
        : topic === 'Voice Talent (Miralas)'
          ? 'Voice'
          : topic;
    const subject = `${subjectPrefix} — ${name.trim() || 'Miransas Inquiry'}`;
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic}\n\n${message.trim()}`;
    return `mailto:contact@miransas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setFeedback({
        type: 'error',
        message: 'Please enter your name (at least 2 characters).',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (trimmedMessage.length < 10) {
      setFeedback({
        type: 'error',
        message: 'Please write a message of at least 10 characters.',
      });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: 'idle' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          topic,
          message: trimmedMessage,
          company,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setFeedback({
          type: 'error',
          message:
            data?.error ||
            'Unable to submit your message right now. You can send it directly via email below.',
          mailtoUrl: buildClientMailto(),
        });
        return;
      }

      if (data.delivered) {
        setFeedback({
          type: 'delivered',
          message:
            data.message ||
            'Your message has been delivered to the Miransas team.',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFeedback({
          type: 'fallback',
          message:
            data.message ||
            'Direct form delivery is not configured on this environment. Send your pre-filled message immediately via your email client below.',
          mailtoUrl: data.mailtoUrl || buildClientMailto(),
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message:
          'Network error while reaching the contact endpoint. You can send your pre-filled message directly via email below.',
        mailtoUrl: buildClientMailto(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFEF] pt-16 pb-24 text-[#1d1d1f] md:pt-24 md:pb-32 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Hero */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5">
            <span aria-hidden className="size-1.5 rounded-xl bg-[#0d4bfa]" />
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]">
              CONTACT
            </span>
          </div>

          <h1 className="mt-4 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-5xl lg:text-[4rem] dark:text-white">
            Reach the Miransas team.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-[1.6] text-neutral-600 sm:text-lg dark:text-[#6E6E74]">
            A question about a product, an engineering problem, or an idea worth
            exploring. Send a message below or choose a direct channel so your
            note lands with the right people.
          </p>

          {/* Quick Email Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="mailto:contact@miransas.com"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
            >
              <Mail className="size-4" aria-hidden />
              <span>contact@miransas.com</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors duration-200 hover:border-black/[0.16] hover:bg-[#F7F8FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#D1D1D1] dark:hover:border-white/20 dark:hover:bg-[#121214]"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-[#0d4bfa]" aria-hidden />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy
                    className="size-4 text-neutral-500 dark:text-[#6E6E74]"
                    aria-hidden
                  />
                  <span>Copy email</span>
                </>
              )}
            </button>

            <Link
              href="/news/rss.xml"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:border-black/[0.16] hover:bg-[#F7F8FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#D1D1D1] dark:hover:border-white/20 dark:hover:bg-[#121214]"
            >
              <Rss className="size-4 text-[#0d4bfa]" aria-hidden />
              <span>RSS Feed</span>
            </Link>
          </div>
        </header>

        {/* Interactive Contact Form (Tier 1 Container) */}
        <section
          aria-labelledby="direct-message-heading"
          className="mt-14 md:mt-20"
        >
          <div className="rounded-4xl border border-black/[0.08] bg-white p-7 sm:p-10 md:p-12 dark:border-white/10 dark:bg-[#0a0a0a]">
            <div className="max-w-2xl">
              <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                Direct message
              </span>
              <h2
                id="direct-message-heading"
                className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white"
              >
                Tell us what you are working on.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-neutral-600 sm:text-base dark:text-[#6E6E74]">
                Fill out the fields below to reach the team. Product and
                security inquiries are prioritized.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-6 sm:mt-10"
            >
              {/* Hidden honeypot field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium tracking-[0.08em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium tracking-[0.08em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label
                    htmlFor="contact-topic"
                    className="mb-2 block text-xs font-medium tracking-[0.08em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as TopicOption)}
                    className={INPUT_CLASSES}
                  >
                    {TOPIC_OPTIONS.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-white text-[#1d1d1f] dark:bg-[#0a0a0a] dark:text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium tracking-[0.08em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Tell us which product or topic, what you expected, and any relevant details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${INPUT_CLASSES} resize-y leading-relaxed`}
                />
                <p className="mt-2.5 text-xs leading-[1.45] text-neutral-500 sm:text-[13px] dark:text-[#6E6E74]">
                  Never send passwords, API keys, or tokens in a message.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#0d4bfa] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowRight className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              </div>

              {feedback.type === 'delivered' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-3xl bg-[#0d4bfa]/[0.08] p-5 dark:bg-[#0d4bfa]/[0.14]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#0d4bfa]"
                    aria-hidden
                  />
                  <p className="text-sm leading-[1.6] text-[#1d1d1f] dark:text-[#D1D1D1]">
                    {feedback.message}
                  </p>
                </div>
              )}

              {feedback.type === 'fallback' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col justify-between gap-4 rounded-3xl bg-[#0d4bfa]/[0.08] p-6 sm:flex-row sm:items-center dark:bg-[#0d4bfa]/[0.14]"
                >
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 size-5 shrink-0 text-[#0d4bfa]"
                      aria-hidden
                    />
                    <p className="text-sm leading-[1.6] text-[#1d1d1f] dark:text-[#D1D1D1]">
                      {feedback.message}
                    </p>
                  </div>
                  <a
                    href={feedback.mailtoUrl}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
                  >
                    <span>Open pre-filled email</span>
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              )}

              {feedback.type === 'error' && (
                <div
                  role="alert"
                  className="flex flex-col justify-between gap-4 rounded-3xl bg-black/[0.04] p-5 sm:flex-row sm:items-center dark:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className="mt-0.5 size-5 shrink-0 text-amber-500"
                      aria-hidden
                    />
                    <p className="text-sm leading-[1.6] text-[#1d1d1f] dark:text-[#D1D1D1]">
                      {feedback.message}
                    </p>
                  </div>
                  {feedback.mailtoUrl && (
                    <a
                      href={feedback.mailtoUrl}
                      className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0d4bfa] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
                    >
                      <span>Send via email client</span>
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Who to write to (Tier 1 standard cards + Tier 2 General & Partnerships) */}
        <section aria-labelledby="who-to-write" className="mt-16 md:mt-24">
          <div className="mb-8">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              Directory
            </span>
            <h2
              id="who-to-write"
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white"
            >
              Who to write to
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((item) => {
              const Icon = item.icon;
              const cardClasses = `group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-colors duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] ${
                item.featured
                  ? 'border border-[#0d4bfa]/20 bg-white hover:border-[#0d4bfa]/35 dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a] dark:hover:border-[#0d4bfa]/45'
                  : 'border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
              }`;

              const glowOverlay = item.featured ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
                />
              ) : null;

              if (item.secondaryHref) {
                return (
                  <article key={item.topic} className={cardClasses}>
                    {glowOverlay}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-[#0d4bfa]/15 dark:text-[#6b93ff]">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <ArrowUpRight
                          className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0d4bfa] dark:text-[#6E6E74]"
                          aria-hidden
                        />
                      </div>

                      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                        {item.topic}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600 dark:text-[#6E6E74]">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 text-sm font-medium">
                      <Link
                        href={item.href}
                        className="rounded-xl text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#D1D1D1]"
                      >
                        {item.label}
                      </Link>
                      <span className="text-neutral-400 dark:text-[#6E6E74]">
                        ·
                      </span>
                      <Link
                        href={item.secondaryHref}
                        className="rounded-xl text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#D1D1D1]"
                      >
                        {item.secondaryLabel}
                      </Link>
                    </div>
                  </article>
                );
              }

              const content = (
                <>
                  {glowOverlay}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-[#0d4bfa]/15 dark:text-[#6b93ff]">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <ArrowUpRight
                        className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0d4bfa] dark:text-[#6E6E74]"
                        aria-hidden
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                      {item.topic}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600 dark:text-[#6E6E74]">
                      {item.description}
                    </p>
                  </div>

                  <span className="relative z-10 mt-6 inline-block text-sm font-medium text-[#0d4bfa] dark:text-[#D1D1D1]">
                    {item.label}
                  </span>
                </>
              );

              if (item.href.startsWith('mailto:') || item.external) {
                return (
                  <a
                    key={item.topic}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={cardClasses}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={item.topic} href={item.href} className={cardClasses}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Before you write (Tier 1 Cards + Tier 3 Nested Badges) */}
        <section aria-labelledby="before-you-write" className="mt-16 md:mt-24">
          <div className="mb-8">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              Guidelines
            </span>
            <h2
              id="before-you-write"
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white"
            >
              Before you write
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {BEFORE_YOU_WRITE.map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-black/[0.08] bg-white p-7 dark:border-white/10 dark:bg-[#0a0a0a]"
              >
                <span className="inline-flex rounded-xl bg-[#0d4bfa]/10 px-3 py-1 font-mono text-xs font-medium text-[#0d4bfa] dark:bg-[#121214] dark:text-[#6b93ff]">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-neutral-600 dark:text-[#D1D1D1]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Security Reports (Tier 1) & Voice Talent (Tier 2) */}
        <section className="mt-16 grid grid-cols-1 gap-5 md:mt-24 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-4xl border border-black/[0.08] bg-white p-8 md:p-10 dark:border-white/10 dark:bg-[#0a0a0a]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#0d4bfa]/10 px-3 py-1.5 text-xs font-medium tracking-[0.1em] text-[#0d4bfa] uppercase dark:bg-[#121214] dark:text-[#6b93ff]">
                <ShieldAlert className="size-3.5" aria-hidden />
                Responsible Disclosure
              </span>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-3xl dark:text-white">
                Security reports
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65] text-neutral-600 sm:text-base dark:text-[#D1D1D1]">
                If you found a vulnerability, write to us with the subject{' '}
                <strong className="font-semibold text-[#1d1d1f] dark:text-white">
                  &ldquo;Security&rdquo;
                </strong>{' '}
                and give us a chance to fix it before you share details
                publicly. Please include what you found, how to reproduce it,
                and what you think the impact is.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="mailto:contact@miransas.com?subject=Security"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
              >
                <span>Report a vulnerability</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </article>

          <article className="relative flex flex-col justify-between overflow-hidden rounded-4xl border border-[#0d4bfa]/20 bg-white p-8 md:p-10 dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
            />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#0d4bfa]/12 px-3 py-1.5 text-xs font-medium tracking-[0.1em] text-[#0d4bfa] uppercase dark:bg-[#121214] dark:text-[#89abff]">
                <Mic className="size-3.5" aria-hidden />
                Miralas · Uzbek Speech
              </span>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-3xl dark:text-white">
                Voice talent
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65] text-neutral-600 sm:text-base dark:text-[#D1D1D1]">
                If you are an Uzbek speaker interested in working on Miralas,
                write with the subject{' '}
                <strong className="font-semibold text-[#1d1d1f] dark:text-white">
                  &ldquo;Voice&rdquo;
                </strong>{' '}
                and attach a short sample recorded in a quiet room. More details
                are on the{' '}
                <Link
                  href="/careers"
                  className="rounded-xl font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#89abff]"
                >
                  Careers
                </Link>{' '}
                page.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:contact@miransas.com?subject=Voice"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-white dark:text-[#050505]"
              >
                <span>Send voice sample</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <Link
                href="/careers"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-black/[0.04] px-5 py-2.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-[#121214] dark:text-[#D1D1D1] dark:hover:bg-white/[0.1]"
              >
                <span>View Careers</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>
        </section>

        {/* What to expect (Subtle Tier 1 Strip + Tier 3 Inner Badge) */}
        <section aria-labelledby="what-to-expect" className="mt-12 md:mt-16">
          <div className="flex flex-col gap-4 rounded-3xl border border-black/[0.08] bg-white p-7 sm:flex-row sm:items-start sm:gap-5 md:p-8 dark:border-white/10 dark:bg-[#0a0a0a]">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-[#121214] dark:text-[#6b93ff]">
              <Info className="size-5" aria-hidden />
            </span>
            <div>
              <h2
                id="what-to-expect"
                className="text-lg font-semibold tracking-[-0.015em] text-[#1d1d1f] dark:text-white"
              >
                What to expect
              </h2>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-neutral-600 dark:text-[#D1D1D1]">
                We read every message, but we cannot promise a reply to each
                one. Product and security messages come first.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
