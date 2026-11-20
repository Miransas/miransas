import type { ReactNode } from 'react';

type CalloutProps = {
  type?: 'info' | 'warning';
  children: ReactNode;
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles =
    type === 'warning'
      ? 'surface-blue-gradient text-prominent'
      : 'surface-card text-prominent';

  return (
    <div className={`my-6 rounded-3xl p-5 text-[15px] leading-[1.6] sm:text-base ${styles}`}>
      {children}
    </div>
  );
}
