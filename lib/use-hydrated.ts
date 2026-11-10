'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** Keeps the server and first client render identical for browser-only state. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
