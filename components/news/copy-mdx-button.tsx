'use client';

import { useState } from 'react';

export function CopyMdxButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="surface-card hover-surface-blue-gradient text-prominent rounded-xl px-3.5 py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
    >
      {copied ? 'Copied' : 'Copy MDX'}
    </button>
  );
}
