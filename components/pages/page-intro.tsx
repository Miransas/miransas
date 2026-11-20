import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { HeroEnter } from '@/components/shared/reval';

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
  className = '',
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`pb-12 md:pb-16 ${className}`}>
      <HeroEnter>
        <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
          {eyebrow}
        </span>
        <h1 className="text-heading mt-5 max-w-4xl text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
          {title}
        </h1>
        <p className="text-secondary-copy mt-6 max-w-2xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
          {description}
        </p>
        {children}
      </HeroEnter>
    </header>
  );
}

export function PageAction({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  const className = `inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px] ${
    primary
      ? 'bg-[#3847ff] text-white hover:opacity-90'
      : 'surface-card hover-surface-blue-gradient text-prominent'
  }`;
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
