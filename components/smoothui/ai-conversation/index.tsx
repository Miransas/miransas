"use client";

import { UI_DURATION, UI_EASE } from "@/lib/ui-motion";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const BOTTOM_THRESHOLD_PX = 48;

export type AIConversationProps = {
  children: ReactNode;
  className?: string;
  contentKey?: string | number;
};

const AIConversation = ({
  children,
  className,
  contentKey,
}: AIConversationProps) => {
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isPinned, setIsPinned] = useState(true);

  const measure = () => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const distance =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
    setIsPinned(distance <= BOTTOM_THRESHOLD_PX);
  };

  const scrollToBottom = (behavior: ScrollBehavior) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    if (typeof viewport.scrollTo === "function") {
      viewport.scrollTo({ behavior, top: viewport.scrollHeight });
    } else {
      viewport.scrollTop = viewport.scrollHeight;
    }
    setIsPinned(true);
  };

  useLayoutEffect(() => {
    if (!isPinned) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const behavior = shouldReduceMotion ? "auto" : "smooth";
    if (typeof viewport.scrollTo === "function") {
      viewport.scrollTo({ behavior, top: viewport.scrollHeight });
    } else {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [contentKey, isPinned, shouldReduceMotion]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const distance =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      setIsPinned(distance <= BOTTOM_THRESHOLD_PX);
    });
    for (const child of Array.from(viewport.children)) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative min-h-0 w-full", className)}>
      <div
        className="h-full overflow-y-auto overscroll-contain"
        onScroll={measure}
        ref={viewportRef}
      >
        {children}
      </div>

      <AnimatePresence initial={false}>
        {!isPinned && (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            aria-label="Jump to latest"
            className="surface-card-elevated text-prominent absolute inset-x-0 bottom-3 mx-auto flex w-fit cursor-pointer items-center gap-1.5 rounded-xl py-1.5 pr-3 pl-2.5 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, y: 8 }
            }
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            onClick={() =>
              scrollToBottom(shouldReduceMotion ? "auto" : "smooth")
            }
            transition={shouldReduceMotion ? { duration: 0 } : { duration: UI_DURATION.overlay, ease: UI_EASE }}
            type="button"
          >
            <ArrowDown aria-hidden="true" size={13} />
            Jump to latest
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIConversation;
