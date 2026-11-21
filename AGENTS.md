# AGENTS.md — Miransas Website Engineering Rules

## Git Workflow — Task Completion

After completing an assigned task:

1. Run all relevant lint checks, type checks, and production build checks.
2. Review `git status` and `git diff`.
3. Verify that no secrets, credentials, `.env` files, or unrelated changes will be committed.
4. If required checks pass, commit only the files belonging to the completed task.
5. Push the commit to the existing current working branch, provided the remote and branch are verified.
6. Report the commit hash, branch, push result, and verification status.

If checks fail, the branch is ambiguous, the remote is unexpected, or unrelated changes cannot be safely separated, stop and report the blocker.

Never force-push, deploy to production, or reset the working tree automatically.

Follow an explicit task-specific instruction if it overrides this workflow.

---

## 1. Project Identity

- Brand: **Miransas** (`https://miransas.com`) — Independent Voice AI Lab & Infrastructure.
- Flagship Platform: **Miralas** (`https://miralas.io`).
- Scope: Public marketing website, engineering research showcase, interactive product demonstrations, and documentation/company pages.
- Uzbek is a first-class language research priority.
- Preserve the established Miransas brand identity and truthful, engineering-first voice.

---

## 2. Technology Stack

- Framework: Next.js 16 (App Router, Turbopack, React Compiler).
- Language: TypeScript (strict).
- Styling: Tailwind CSS v4 (`app/globals.css` semantic tokens).
- Animation: Framer Motion (`<MotionConfig reducedMotion="user">`).
- Package Manager: `pnpm`.

Inspect `package.json` and actual source files before assuming versions, scripts, or installed packages.

---

## 3. Engineering Principles & Truthfulness

- Prefer small, focused, production-quality changes.
- Understand existing code before modifying it.
- Preserve working features, routes, and established behavior.
- Avoid unnecessary abstractions, dependencies, and rewrites.
- Do not silently expand task scope.
- Never claim unreleased capabilities are live in production (e.g., native Uzbek production inference, public Voice Agents, or unmeasured NVIDIA GPU benchmarks).
- Keep illustrative demos clearly positioned as visual/recorded studies rather than live backend endpoints.
- Prefer correctness, maintainability, and measurable 60–120fps performance over visual clutter.

---

## 4. Work Discipline

Before modifying code:

1. Read relevant documentation, `app/globals.css`, and target source files.
2. Run `git status --short`.
3. Identify existing uncommitted changes.
4. Determine the smallest safe implementation.
5. Check whether the requested work overlaps with ongoing changes.

During implementation:

- Modify only files required by the task.
- Preserve unrelated local changes.
- Do not fabricate successful command outputs.
- Do not hide lint, type, React Compiler, or build failures.
- Do not automatically start the next numbered task.

After implementation:

- Verify affected pages in both Dark Mode and Light Mode.
- Report changed files and exact checks performed.
- Distinguish passed, failed, skipped, and blocked checks.
- Document remaining risks and follow-up work.

---

## 5. Miransas Design System (Strict)

Maintain complete visual consistency across every page and component via semantic CSS variables in `app/globals.css`.

### Contextual Card & Surface Architecture (3 Tiers)
- **Light Mode Surfaces (Unchanged):**
  - `--surface-page: #EFEFEF` (page & section background)
  - `--surface-card: #FFFFFF` (cards)
  - `--surface-card-elevated: #F7F8FC` (hover & nested tonal surface)
- **Dark Mode 3-Layer Sandwich Hierarchy:**
  - `--surface-page: #050505` → Page background (`html`, `body`, all borderless sections) AND recessed form inputs (`input`, `textarea`, `select`) / code blocks inside cards.
  - `--surface-card: #0a0a0a` → All primary standalone cards, 3-column grid cards, Contact form outer container, closed FAQ items, modals, and scrolled sticky navbar.
  - `--surface-card-elevated: #121214` → Hover state for interactive cards, plus borderless nested elements inside cards (icon containers, status chips, checklist rows `01–04`).
- **Tier 1 — Structural Cards & Form Controls (Crisp Hairline Border):**
  - Surface: `bg-white dark:bg-[#0a0a0a]` (interactive hover: `hover:bg-[#F7F8FC] dark:hover:bg-[#121214]`).
  - Border: `border border-black/[0.08] dark:border-white/10` (interactive hover: `hover:border-black/[0.16] dark:hover:border-white/20`).
  - Recessed form inputs (`input`, `textarea`, `select`) inside a `#0a0a0a` card: `bg-[#EFEFEF]/60 dark:bg-[#050505]` with `border border-black/[0.08] dark:border-white/10` and `focus:border-[#0d4bfa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4bfa]/30`.
- **Tier 2 — Featured / Gradient & Active Cards (Cobalt `#0d4bfa` Accent):**
  - Use selectively (at most 1 card per grid, active FAQ item, or hero/CTA showcase).
  - Surface: Soft, feathered internal `#0d4bfa` radial glow (never a hard clipped top bar) over `bg-white dark:bg-[#0a0a0a]`.
  - Border: Subtle cobalt-tinted hairline (`border border-[#0d4bfa]/20 dark:border-[#0d4bfa]/30`) or borderless when melting into `<AmbientSmoke />`.
- **Tier 3 — Nested Elements, Chips & Inner Rows (Strictly Borderless):**
  - Never create noisy box-in-a-box double borders.
  - Elements *inside* a Tier 1 or Tier 2 card (checklist rows `01–04`, icon badges, status pills, eyebrow kickers, secondary metric tiles, inner mocks, and accordion `+` buttons) must stay borderless (`border-0`), separated purely via `bg-[#F7F8FC] dark:bg-[#121214]` or `bg-black/[0.04] dark:bg-white/[0.05]` / `bg-[#0d4bfa]/10`.

### 3-Tier Corner Radius System & Focus
- **Accessibility focus:** Keep `focus-visible:outline-2 focus-visible:outline-[#0d4bfa] focus-visible:outline-offset-2` for keyboard navigation.
- **Strict Corner Radii:**
  - `rounded-4xl`: Large showcase containers, hero preview frames, CTA banners, form containers, and modal shells.
  - `rounded-3xl`: Main cards, capability items, FAQ items, and process steps.
  - `rounded-xl`: Inner metric tiles, badges, buttons, form inputs, chips, and media controls.

### Typography
- Use one cohesive primary sans font across all headings, `p`, and `span` elements (mono font strictly for technical specs like `24 kHz`, `01 / 05`, `gRPC`).
- **Dark Mode Text Hierarchy:**
  - Headings (`h1`–`h4`, primary KPIs): `#FFFFFF`
  - Prominent copy (`span` labels, eyebrows, active tabs, FAQ questions, dense reading `p` blocks): `#D1D1D1`
  - Secondary copy (subtitles `p`, card summaries, captions, muted metadata `span`): `#6E6E74`
- Use `tabular-nums` for dynamic counters, metrics, and indices.

### Avoid
- Harsh white/black borders or divider lines.
- Mixing random gray surface hex codes.
- Neon-heavy clutter or random off-brand gradients (brand accent is strictly `#3847ff`).
- Duplicate page headers or placeholder/fake metrics.

---

## 6. Performance, Motion & React Compiler

- **React Compiler Compatibility:** Do not wrap ref reads in manual `useCallback` / `useMemo` hooks that cause `Compilation Skipped: Existing memoization could not be preserved` warnings. Let React Compiler handle memoization cleanly.
- **Zero Scroll Jank:**
  - Never call `setState` on every scroll pixel. Use `useMotionValue`, `useTransform`, or discrete threshold checks via `useMotionValueEvent`.
  - Always use `overflow-x: clip` (never `overflow-hidden`) on ancestors of `position: sticky` elements.
  - Isolate horizontal scroll containers (tables, card strips) with `overscroll-x-contain`.
  - Pause off-screen continuous animations (canvas, WebGL, waveforms, CSS marquees) via `useInView` / `IntersectionObserver`.
- **GPU-Only Animations:** Animate only `transform` (`translate3d`, `scale`) and `opacity`. Use CSS Grid (`grid-template-rows: 0fr` → `1fr`) for accordions instead of animating `height`.
- **Reveals:** Use `viewport={{ once: true }}` so elements never re-hide on scroll up. Do not use `whileInView` on above-the-fold Hero content (protects LCP).
- **Modals:** Render modals via `createPortal(..., document.body)` with proper `html`/`body` scroll lock and inner `min-h-0 flex-1 overflow-y-auto overscroll-y-contain`.

---

## 7. SEO, GEO & Semantic HTML

- **Server Component Pages:** Keep every `app/**/page.tsx` as a Server Component so `export const metadata` works natively. Move interactive UI into child `"use client"` components.
- **Root Metadata (`app/layout.tsx`):** Maintain `metadataBase: new URL("https://miransas.com")`, title template (`%s | Miransas`), OpenGraph, Twitter (`summary_large_image`), and robots defaults.
- **Per-Page Metadata:** Every public route must define unique `title` (< 60 chars), `description` (140–160 chars), and `alternates.canonical` via `src/lib/seo.ts`.
- **Crawl & AI Search (GEO):** Maintain `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/llms.txt`, and Schema.org JSON-LD (`Organization`, `WebSite`, `FAQPage` synced with rendered FAQ items).
- **Semantic HTML:** Exactly one `<h1>` per page, logical `<h2>` → `<h3>` hierarchy, real `<Link>`/`<a>` navigation, and descriptive `alt`/`aria-label` attributes.

---

## 8. Security & Hygiene

- Never expose API keys, secrets, or tokens in client bundles, logs, or committed files.
- Never commit `.env` files.
- Keep third-party scripts minimal and privacy-respecting.

---

## 9. Verification

Inspect `package.json` scripts and run all applicable checks from the repo root before finishing:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm build`

Confirm zero TypeScript errors, zero React Compiler skip warnings, zero hydration mismatches, and zero broken metadata/routes. Never claim success for checks that were not actually run.

---

## 10. Git and Deployment

- Standing user preference: after completing a task, run relevant checks, inspect YAML/workflow configuration and `git status`, then commit and push the completed task changes. A task-specific instruction prohibiting commit or push overrides this default. Never stage secrets or unrelated work.
- Never force-push or deploy without separate explicit authorization.
- Never delete unrelated user changes or reset the working tree without explicit authorization.

---

## 11. Working Relationship

The developer prefers focused, step-by-step tasks.

- Complete only the requested task.
- Keep changes reviewable.
- Explain important decisions clearly.
- Prefer concrete results over long speculative plans.
- When blocked, explain the precise blocker.
- Never pretend a partial implementation is complete.

End each completed task with:

1. Summary
2. Files changed
3. Tests and verification
4. Remaining risks or blockers
5. Suggested next task

Do not start the suggested next task without authorization.