'use client';

import * as React from 'react';
import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<HTMLMotionProps<keyof HTMLElementTagNameMap>, 'ref'> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> = (Base & { asChild: true; children: React.ReactElement }) | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(childProps: AnyProps, slotProps: DOMMotionProps<T>): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className as string, slotProps.className as string);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

// A stable wrapper forwards animation output to the child's actual DOM ref.
const MotionSlotElement = motion.create(function SlotElement({ element, ref, ...props }: { element: React.ReactElement<AnyProps>; ref?: React.Ref<HTMLElement>; [key: string]: unknown }) {
  return React.cloneElement(element, { ...props, ref });
});

function Slot<T extends HTMLElement = HTMLElement>({ children, ref, ...props }: SlotProps<T>) {
  if (!React.isValidElement(children)) return null;
  const { ref: childRef, ...childProps } = children.props as AnyProps;
  const mergedProps = mergeProps(childProps, props);
  const mergedRef = mergeRefs(childRef as React.Ref<T>, ref);
  if (isMotionComponent(children.type)) {
    return React.cloneElement(children, { ...mergedProps, ref: mergedRef } as AnyProps);
  }
  return <MotionSlotElement element={children as React.ReactElement<AnyProps>} {...mergedProps} ref={mergedRef as React.Ref<HTMLElement>} />;
}

export { Slot, type SlotProps, type WithAsChild, type DOMMotionProps, type AnyProps };
