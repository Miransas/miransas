import type { ReactNode } from 'react';
import { Info, TriangleAlert } from 'lucide-react';

type CalloutProps = {
  type?: 'info' | 'warning';
  children: ReactNode;
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const Icon = type === 'warning' ? TriangleAlert : Info;

  return (
    <div role="note" className="surface-card text-prominent my-6 flex items-start gap-3 rounded-3xl p-6 text-[15px] leading-[1.6] sm:text-base">
      <Icon aria-hidden className="mt-1 size-4 shrink-0" />
      <div className="min-w-0 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
