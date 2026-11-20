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
    <div className="dark-visual surface-card my-6 w-full max-w-full min-w-0 overflow-hidden rounded-3xl">
      <div className="surface-card-elevated flex items-center justify-between px-5 py-2.5">
        <span className="text-prominent font-mono text-xs leading-[1.45] tracking-[0.12em] uppercase">
          {lang}
        </span>
        <CopyButton text={children} />
      </div>
      <div
        className="overflow-x-auto p-5 text-sm leading-6 [&_code]:font-mono [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
