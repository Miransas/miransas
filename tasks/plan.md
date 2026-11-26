# Miransas non-hero visual refinement

Scope: homepage supporting sections and `/models` content below its header. Preserve hero components, navigation, routes, copy, media, product claims, and existing unrelated local work.

Design contract: retain the existing page/card/elevated surface tokens and radius scale; remove decorative smoke, radial overlays, colored shadows, and hover movement on informational cards. Keep brand color on meaningful controls and status markers. Add a readable supporting-text token for these sections without changing hero typography. Use consistent 96px/128px section rhythm and short group reveals.

Implementation order and acceptance criteria are tracked in [todo.md](todo.md).

Verification: repository lint, TypeScript, production build, diff/secret/scope review, and browser checks of light/dark desktop/mobile when browser access is available. Review workflow YAML without modifying it. Do not claim browser or assistive-technology checks passed if unavailable.

Risks: existing uncommitted hero-related files must stay outside this commit; global token changes must be additive so hero rendering stays unchanged. The computer-use browser host was unavailable during initial audit.

## Verification record

- `pnpm lint`: passed with the same three pre-existing warnings in `RobotEyes.tsx`, `new-hero.tsx`, and `voice-orb.tsx`; no new warnings.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed, 28 pages generated, no React Compiler skip warnings. Initial sandbox run crashed with macOS `SecItemCopyMatching failed -50`; the authorized run outside the sandbox passed.
- Homepage and `/models`: local HTTP 200; SSR has one h1 and the expected canonical for each. Three model tabs and three model panels remain in the SSR output.
- Axe 4.13.0: homepage zero violations; scoped `#model-showcase-tabs` zero violations after fixing definition-list markup, panel roles, and supporting text contrast. The full `/models` audit also found a pre-existing low-contrast paragraph in its hero header, which remains unchanged under the explicit hero exclusion.
- Pa11y 9.1.1: initial audit completed and reported accessibility findings; not claimed as a clean final pass.
- Supporting text contrast calculated against all three light/dark surfaces: 5.94:1 or higher in light mode, 7.30:1 or higher in dark mode.
- Compared hero, hero transition, voice orb, global header, homepage composition, and model header with HEAD: unchanged. Shared hero styles were not modified; the CSS token addition is opt-in for non-hero content.
- Workflow YAML reviewed without edits. No dependencies, backend, auth, database, deployment settings, or model data changed.
- Manual screenshot, desktop/mobile, keyboard/VoiceOver, reduced-motion runtime, and console/hydration review remain unverified: browser host unavailable and native Chrome control failed/timed out.


## Current request: sitewide refinement with a strict hero freeze

This continuation refines remaining non-hero content across the Miransas marketing site. Global CSS, tokens, the header, page-intro/actions, all hero/header blocks, hero dependencies, and the welcome modal are frozen. Their source hashes or exact JSX blocks were captured before editing and compared after implementation. Existing `lib/utils.ts`, `components/halltone-hero.tsx`, and `components/uibrik/` work remains untouched.

### Changes

- Homepage product studies: replace the three-column card strip with consistent full-width rows, keeping the existing copy and illustrative previews.
- Contact and Support: remove radial overlays and colored card borders, improve secondary text and placeholder contrast, and normalize hover/feedback surfaces. Closed Support FAQ panels are inert so their links cannot receive keyboard focus.
- Projects, Lab, Careers, Agent, Developers, and News: neutral cards, readable body/meta text, consistent nested surfaces, less decorative hover treatment, and unchanged routes/content/claims.
- About: refine only content below its hero; preserve page geometry and the page-spanning background because it also affects the protected hero.
- MDX: neutral quotes/callouts/accordions, readable table cells, and contained horizontal scrolling. News TOC links have borderless active states and announce the current location.
- Footer column titles use h2, preserving their styling while fixing heading-order findings on pages without an earlier h2.

### Task files

- `app/agent/page.tsx`
- `app/careers/page.tsx`
- `app/developers/page.tsx`
- `app/lab/page.tsx`
- `app/news/page.tsx`
- `app/news/[slug]/page.tsx`
- `app/projects/page.tsx`
- `components/code-block/code-block.tsx`
- `components/contact/ContactView.tsx`
- `components/layouts/footer.tsx`
- `components/news/toc.tsx`
- `components/provider/Callout.tsx`
- `components/shared/BentoSection.tsx`
- `components/shared/about-content.tsx`
- `components/support/SupportView.tsx`
- `components/visuals/visual-playground.tsx`
- `mdx-components.tsx`
- This verification record in `tasks/plan.md`.

### Verification for this request

- `pnpm lint`: passed; the same three pre-existing warnings remain in protected `new-hero.tsx`, `voice-orb.tsx`, and shared `RobotEyes.tsx`.
- `pnpm exec tsc --noEmit`: passed. Production build also completed its TypeScript phase.
- `pnpm build`: passed, 28 pages generated; no React Compiler skip warnings observed.
- `pnpm test`: attempted, exit 1. No test script or repository test suite exists; no dependencies were added to manufacture one.
- `git diff --check`: passed. Workflow YAML inspected without edits. Contact submission logic compared verbatim with HEAD: unchanged.
- Production HTTP/SSR checks passed with one h1 and the expected canonical for `/`, `/about`, `/projects`, `/developers`, `/contact`, `/support`, `/careers`, `/agent`, `/lab`, and `/lab/visuals`. `/models` returns 200 and its correct canonical but its existing Suspense fallback contains no SSR h1; its source is unchanged.
- Headless Chrome screenshots reviewed for Contact at 1440px and 390px in light/dark mode. No clipping or overlap observed. Light-mode Contact passed pa11y; dark mode retains the protected hero paragraph's pre-existing 4.02:1 contrast failure. The 320px contact-form audit passed.
- Homepage product-study screenshots captured at 1440px dark and 390px light. The illustrative previews and disclosure labels remain intact. Light-mode study audit passed; a low-contrast decorative checkmark found in the dark audit was changed to the prominent text tone. The final dark-mode study audit then passed with zero findings. The 390px light-mode study screenshot was also visually inspected.
- Initial axe findings in closed Support panels were resolved with inert panels. A production pa11y interaction test opened and closed a FAQ item, verified the panel inert state, and passed with zero findings. The final production axe audit of Support, Developers, Playground, and Careers content passed with zero violations; protected headers and the unmodified welcome modal were explicitly excluded.
- Native browser host is unavailable; native Chrome control was interrupted by external UI changes. Headless audit screenshots and documented pa11y actions were used as a fallback. Manual keyboard/VoiceOver, exhaustive console/hydration checks, and a paired before/after visual hero comparison have not been verified.

### Release gate

Do not stage, commit, or push this request while verification is failing or incomplete. Full dark-mode audits still flag unchanged protected hero copy (including Contact and Lab). The explicit hero exclusion takes precedence over fixing those styles in this task. The requested commit message remains pending: `refactor(ui): refine Miransas visual design and remove decorative glow`.

Final status: implementation and targeted checks are ready for review, but the full-site release gate is not green. No task files were staged, no new commit was created, and nothing was pushed. Complete the protected-hero contrast decision and remaining visual/keyboard verification before using the requested commit message.
