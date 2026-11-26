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
