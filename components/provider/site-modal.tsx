'use client';

import { useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from 'radix-ui';
import { Sparkles, ArrowRight } from 'lucide-react';

const subscribe = (notify: () => void) => {
  window.addEventListener('storage', notify);
  return () => window.removeEventListener('storage', notify);
};
const getSnapshot = () => !sessionStorage.getItem('hasSeenNotice');

export default function NoticeModal() {
  const unseen = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);
  const isOpen = unseen && !dismissed;
  const onOpenChange = (open: boolean) => {
    if (!open) sessionStorage.setItem('hasSeenNotice', 'true');
    setDismissed(!open);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md" />
        <Dialog.Content asChild>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="border-border bg-popover text-popover-foreground fixed top-1/2 left-1/2 z-[61] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-6 text-center shadow-xl sm:p-8">
            <div className="border-border bg-secondary mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border">
              <Sparkles aria-hidden size={20} />
            </div>
            <Dialog.Title className="mb-3 text-xl font-semibold tracking-tight">Active Development</Dialog.Title>
            <Dialog.Description className="text-muted-foreground mb-6 text-sm leading-7">We are constantly updating and refining our platform to provide a better experience. Features and visual elements may evolve as development continues.</Dialog.Description>
            <Dialog.Close className="bg-primary text-primary-foreground inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85">
              Understand &amp; Proceed
              <ArrowRight aria-hidden size={16} />
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
