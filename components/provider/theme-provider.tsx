'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { MotionConfig } from 'framer-motion';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeChrome />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
// Browser chrome follows an explicit choice as well as the system preference.
function ThemeChrome() {
  const { resolvedTheme } = useTheme();
  React.useEffect(() => {
    if (!resolvedTheme) return;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = resolvedTheme === 'dark' ? '#050505' : '#efefef';
    });
  }, [resolvedTheme]);
  return null;
}
