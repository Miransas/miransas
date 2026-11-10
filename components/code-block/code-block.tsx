import { codeToHtml } from 'shiki';
import { CopyButton } from './copy-button';

type Props = {
  children: string;
  language?: string;
  className?: string;
};

export async function CodeBlock({ children, language }: Props) {
  const lang = language || 'text';

  let html: string;
  try {
    html = await codeToHtml(children, { lang, theme: 'github-dark-default' });
  } catch {
    html = await codeToHtml(children, {
      lang: 'text',
      theme: 'github-dark-default',
    });
  }

  return (
    <div className="dark-visual border-border my-6 w-full max-w-full min-w-0 overflow-hidden rounded-xl border bg-[#0d1117]">
      <div className="border-border flex items-center justify-between border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">{lang}</span>
        <CopyButton text={children} />
      </div>
      <div className="overflow-x-auto p-4 text-sm leading-6 [&_code]:font-mono [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-0" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
