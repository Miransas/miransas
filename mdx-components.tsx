import React from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block/code-block";
import { Callout } from "@/components/provider/Callout";
import { Mermaid } from "@/components/mermaid";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (p) => <h1 className="mb-6 text-4xl font-semibold tracking-tight" {...p} />,
    h2: (p) => (
      <h2 className="scroll-mt-24 mb-3 mt-14 border-b border-border pb-2 text-2xl font-semibold tracking-tight" {...p} />
    ),
    h3: (p) => (
      <h3 className="scroll-mt-24 mb-2 mt-8 text-lg font-semibold text-foreground" {...p} />
    ),
    p: (p) => <p className="my-4 leading-7 text-muted-foreground" {...p} />,
    a: (p) => (
      <a className="underline underline-offset-4 hover:text-foreground" {...p} />
    ),
    ul: (p) => <ul className="my-4 list-disc space-y-1.5 pl-6 text-muted-foreground" {...p} />,
    ol: (p) => <ol className="my-4 list-decimal space-y-1.5 pl-6 text-muted-foreground" {...p} />,
    li: (p) => <li className="leading-7" {...p} />,
    strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
    blockquote: (p) => (
      <blockquote
        className="my-6 border-l-2 border-border pl-4 text-muted-foreground"
        {...p}
      />
    ),

    // Tablolar
    table: (p) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm" {...p} />
      </div>
    ),
    thead: (p) => <thead className="bg-muted/50" {...p} />,
    th: (p) => (
      <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-foreground" {...p} />
    ),
    td: (p) => (
      <td className="border-t border-border px-4 py-3 align-top text-muted-foreground" {...p} />
    ),

    // SSS (<details>)
    details: (p) => (
      <details className="my-3 rounded-lg border border-border px-4 py-3" {...p} />
    ),
    summary: (p) => (
      <summary className="cursor-pointer font-medium text-foreground" {...p} />
    ),

    hr: () => <hr className="my-10 border-border" />,
    code: (p) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...p} />
    ),
    pre: (props) => {
      const { children, className } = props as {
        children?: React.ReactNode;
        className?: string;
      };

      const child = React.Children.toArray(children).find(
        (item) => typeof item === "object",
      );
      const childProps =
        (
          child as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>
        )?.props ?? {};

      const rawCode = childProps.children ?? "";
      const codeString = (
        typeof rawCode === "string" ? rawCode : String(rawCode ?? "")
      ).replace(/\n$/, "");
      const classValue = childProps.className ?? className ?? "";
      const language =
        String(classValue).replace(/^language-/, "").trim() || undefined;

      if (language === "mermaid") {
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