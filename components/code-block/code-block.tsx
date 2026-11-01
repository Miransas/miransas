import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type Props = {
  children: string;
  language?: string;
  className?: string;
};

export async function CodeBlock({ children, language }: Props) {
  const lang = language || "text";

  let html: string;
  try {
    html = await codeToHtml(children, { lang, theme: "github-dark-default" });
  } catch {
    html = await codeToHtml(children, {
      lang: "text",
      theme: "github-dark-default",
    });
  }

  return (
    <div className="my-6 w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {lang}
        </span>
        <CopyButton text={children} />
      </div>
      <div
        className="overflow-x-auto p-4 text-sm leading-6 [&_code]:font-mono [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}