'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/toc';

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="surface-card rounded-3xl p-5">
      <span className="text-prominent mb-3 block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
        On this page
      </span>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-xl py-1.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] ${
                item.level === 3 ? 'pl-5' : 'pl-2.5'
              } ${
                active === item.id
                  ? 'surface-blue-gradient text-heading font-medium'
                  : 'text-secondary-copy hover:text-prominent'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
