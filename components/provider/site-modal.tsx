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
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="surface-blue-gradient text-popover-foreground fixed top-1/2 left-1/2 z-[61] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-4xl p-6 text-center shadow-2xl sm:p-8"
          >
            <div className="surface-card-elevated mx-auto mb-5 flex size-12 items-center justify-center rounded-xl text-[#3847ff]">
              <Sparkles aria-hidden size={20} />
            </div>
            <Dialog.Title className="text-heading mb-3 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl">
              Active Development
            </Dialog.Title>
            <Dialog.Description className="text-secondary-copy mb-6 text-[15px] leading-[1.6] sm:text-base">
              We are constantly updating and refining our platform to provide a better experience. Features and visual elements may evolve as development continues.
            </Dialog.Description>
            <Dialog.Close className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3847ff] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]">
              Understand &amp; Proceed
              <ArrowRight aria-hidden size={16} />
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
