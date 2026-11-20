'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
          fontFamily: 'var(--font-sans-runtime), sans-serif',
          securityLevel: 'strict',
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (failed) {
    return (
      <pre className="surface-card my-6 overflow-x-auto rounded-3xl p-5 text-sm">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className="surface-card my-8 flex justify-center overflow-x-auto rounded-3xl p-6"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
