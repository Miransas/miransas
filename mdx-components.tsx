import React from 'react';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/code-block/code-block';
import { Callout } from '@/components/provider/Callout';
import { Mermaid } from '@/components/mermaid';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (p) => (
      <h1
        className="text-heading mb-6 text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]"
        {...p}
      />
    ),
    h2: (p) => (
      <h2
        className="text-heading mt-14 mb-4 scroll-mt-24 text-2xl leading-[1.1] font-semibold tracking-[-0.025em] sm:text-3xl"
        {...p}
      />
    ),
    h3: (p) => (
      <h3
        className="text-heading mt-8 mb-2 scroll-mt-24 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]"
        {...p}
      />
    ),
    p: (p) => (
      <p
        className="text-prominent my-4 text-[15px] leading-[1.6] sm:text-base"
        {...p}
      />
    ),
    a: (p) => (
      <a
        className="text-heading underline decoration-[#3847ff] underline-offset-4 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
        {...p}
      />
    ),
    ul: (p) => (
      <ul
        className="text-prominent my-4 list-disc space-y-1.5 pl-6 text-[15px] leading-[1.6] sm:text-base"
        {...p}
      />
    ),
    ol: (p) => (
      <ol
        className="text-prominent my-4 list-decimal space-y-1.5 pl-6 text-[15px] leading-[1.6] sm:text-base"
        {...p}
      />
    ),
    li: (p) => <li className="leading-[1.6]" {...p} />,
    strong: (p) => <strong className="text-heading font-semibold" {...p} />,
    blockquote: (p) => (
      <blockquote
        className="surface-blue-gradient text-prominent my-6 rounded-3xl p-5"
        {...p}
      />
    ),

    table: (p) => (
      <div className="surface-card my-6 overflow-x-auto rounded-3xl p-2">
        <table className="w-full text-sm" {...p} />
      </div>
    ),
    thead: (p) => <thead className="surface-card-elevated rounded-xl" {...p} />,
    th: (p) => (
      <th
        className="text-heading px-4 py-3 text-left font-medium whitespace-nowrap"
        {...p}
      />
    ),
    td: (p) => (
      <td
        className="text-secondary-copy px-4 py-3 align-top"
        {...p}
      />
    ),

    details: (p) => (
      <details
        className="surface-card open:surface-blue-gradient my-3 rounded-3xl px-5 py-4 transition-all"
        {...p}
      />
    ),
    summary: (p) => (
      <summary
        className="text-prominent cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
        {...p}
      />
    ),

    hr: () => <div className="my-10 h-4" aria-hidden="true" />,
    code: (p) => (
      <code
        className="surface-card-elevated text-prominent rounded-xl px-1.5 py-0.5 font-mono text-xs sm:text-[13px]"
        {...p}
      />
    ),
    pre: (props) => {
      const { children, className } = props as {
        children?: React.ReactNode;
        className?: string;
      };

      const child = React.Children.toArray(children).find(
        (item) => typeof item === 'object'
      );
      const childProps =
        (
          child as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>
        )?.props ?? {};

      const rawCode = childProps.children ?? '';
      const codeString = (
        typeof rawCode === 'string' ? rawCode : String(rawCode ?? '')
      ).replace(/\n$/, '');
      const classValue = childProps.className ?? className ?? '';
      const language =
        String(classValue).replace(/^language-/, '').trim() || undefined;

      if (language === 'mermaid') {
        return <Mermaid chart={codeString} />;
      }

      return (
        <CodeBlock language={language} className={classValue}>
          {codeString}
        </CodeBlock>
      );
    },
    Callout,
    ...components,
  };
}
