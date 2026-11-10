import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { HeroEnter } from '@/components/shared/reval';

export function PageIntro({ eyebrow, title, description, children, className = '' }: { eyebrow: string; title: string; description: string; children?: ReactNode; className?: string }) {
  return (
    <header className={`border-border border-b pb-12 md:pb-16 ${className}`}>
      <HeroEnter>
        <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.08] font-medium tracking-[-0.04em]">{title}</h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-8">{description}</p>
        {children}
      </HeroEnter>
    </header>
  );
}

export function PageAction({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  const className = `inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${primary ? 'bg-primary text-primary-foreground hover:opacity-85' : 'border border-border text-foreground hover:bg-secondary'}`;
  const content = (
    <>
      {children}
      <ArrowUpRight aria-hidden className="size-4 shrink-0" />
    </>
  );
  return href.startsWith('/') ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
