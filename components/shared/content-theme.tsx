import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { UI_MOTION_STYLE } from '@/lib/ui-motion';

/** A local palette boundary: never wrap the homepage hero in this component. */
export function ContentTheme({
  children,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('content-theme surface-page', className)}
      style={{ ...UI_MOTION_STYLE, ...style }}
    >
      {children}
    </div>
  );
}
