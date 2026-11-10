# Miransas UI restoration

> Follow-up completion and current verification results are documented in [WEBSITE_COMPLETION.md](WEBSITE_COMPLETION.md). This file records the earlier restoration checkpoint.

Date: 9 November 2026. Changes remain local; no commit, push or deployment was performed.

## Theme foundation

The existing `next-themes` provider now uses `attribute="class"`, `defaultTheme="system"` and `enableSystem`. It wraps the notice, header, page content and footer. The root HTML suppresses the expected theme-class hydration difference. The theme button uses the provider for persistence, retains the circular View Transition, and falls back to an immediate change for reduced motion or unsupported browsers. Global transition suppression is intentionally omitted so it does not interfere with the reveal.

One Tailwind v4 token system supplies light `#EFEFEF` / `#050505` and dark `#050505` / `#F5F5F5` backgrounds and foregrounds, plus cards, elevated surfaces, muted text, borders, input, ring, primary, secondary, popover, accent and destructive colors. Undefined `--color-bg` / `--color-fg` references and duplicated body, selection and typography rules were removed. There are no broad section/text transform or layout transitions. Browser theme-color metadata follows both system and explicit choices; the web manifest defaults to the light surface.

## Component and route inventory

| Dependency / section | Restoration |
| --- | --- |
| Root layout → ThemeProvider → SmoothScroll, notice, header, PageTransition/main, footer | Theme-aware shell; one main landmark, skip link, reduced-motion defaults, no persistent page transform around sticky content. |
| NewHero → VoiceOrb | Resolved theme reaches the existing WebGL renderer; no dark card in light mode. Responsive composition and current technology tabs preserve the Orb as the focal point. Concurrent Hero/Orb refinements in the workspace were retained. |
| StickySplitSection | Semantic headings, descriptions, borders and hover surfaces; sticky column remains free of clipping ancestors. |
| Timeline | Existing alternating story and scroll-progress line retained; one readable column on small screens. |
| ScrollText → ScrollReveal | Existing GSAP reveal retained; readable initial text, semantic highlight, earlier completion. `ScrollReveal.tsx` did not need changes. |
| AiTeamSection → RobotEyes | Theme-aware section; existing robots and blue eyes retained; responsive coordinate scaling and reduced-motion cleanup. |
| VoiceSection → RobotEyes, Shdr02/orbkit-core, LiveVoiceStream → AIConversation / AILoader | Existing media and WebGL demonstrations retained; responsive sizes, readable copy, semantic player, accessible playback/download/keyboard seek. Stream characters are captured before advancing the timer index. Cached audio metadata initializes correctly after hydration. |
| BentoSection → constants/bento | Existing layout retained with quieter surfaces. Illustrations explicitly say “Illustrative interface · sample data”; fictional model identifiers, latency and similarity readouts were removed. Deterministic waveform heights avoid hydration differences. |
| FAQ → constants/faq | Theme-aware accordion, category pressed states, expanded/control relationships, spacious content, working contact route. |
| Features | Existing videos retained on a fixed dark media canvas; semantic surrounding UI, pressed states, reduced-motion playback controls. Duplicate features anchor removed. |
| ShaderCTA → GlowButton | Existing cinematic artwork and animated button retained. The active CTA used an image, not a shader; shader implementations elsewhere remain in place. A neutral button variant follows the site's main palette. |
| Footer → nav/social constants, avatar group | Semantic surfaces, roomier columns, Istanbul clock, neutral status link without an invented live status. Legal URLs corrected to verified `/legal/...` destinations. |
| About | Existing editorial composition and robot retained; neutral theme-aware typography and surfaces, responsive artwork. |
| Agent, Careers, Contact, Developers, Projects, Support | Existing MDX content inherits the shared theme; opening spacing normalized where needed. Broken Miralas overview navigation now targets the actual project section. |
| Models / news articles → MDX components, Mermaid, CodeBlock | Semantic document UI retained; Mermaid follows the resolved theme. Existing Shiki code previews keep fixed dark contrast through scoped semantic tokens. |
| News index and article layouts | Existing semantic backgrounds, tags, metadata, related posts and TOC preserved. |
| Not-found | Theme-aware page and actions; existing dark radar artwork retained. The previously inert search submits a news tag query. |

General UI accents are monochromatic. Existing blue light in the Orb, robots and custom canvases remains. Numerical latency/concurrency claims in voice-section copy were replaced with capability descriptions rather than adding new measurements.

## Typography and responsiveness

`font-sans` now resolves to the loaded Plus Jakarta Sans variable; `font-mono` resolves to the loaded IBM Plex Mono variable. The extra Hero Geist dependency and unprovided Inter/JetBrains font overrides were removed. Technical labels and the clock use the mono font. Existing heading hierarchy was retained with responsive sizing and restrained tracking.

The header uses the mobile layout below 1280px, avoiding crowded navigation at 1024px. Dropdowns support focus, Arrow Down and Escape. Mobile navigation has a focus boundary, close control, scroll containment and convenient appearance controls. The header height and content offset share `--header-h`.

Mobile Timeline rows, robot coordinates, shader footprints, audio-player controls, footer columns and CTA spacing were repaired. Sticky sections retain native scroll geometry; touch inertia is not overridden by Lenis. The notice uses the existing Radix dependency for dialog focus and keyboard behavior.

## Intentional dark visuals

- Cinematic CTA artwork and its readability overlay.
- Feature video containers, preserving media contrast.
- Shiki syntax previews, including their copy/header controls.
- The existing 404 radar.
- Dark areas inside robot artwork and shader output are part of the visuals, not general page surfaces.

## Verification

The requested commands were run with the one-shot `--config.verify-deps-before-run=false` option. The initial default pnpm invocation tried to reinstall dependencies and failed under the restricted network; the override avoids implicit dependency changes and does not modify project configuration.

| Check | Actual result |
| --- | --- |
| `pnpm --config.verify-deps-before-run=false lint` | Exit 1: 3 pre-existing errors and 7 warnings. The initial audit recorded 15 errors and 25 warnings. |
| `pnpm --config.verify-deps-before-run=false exec tsc --noEmit` | Exit 0. |
| `pnpm --config.verify-deps-before-run=false build` | Exit 0 on the installed Next.js 16.4.5; 24 static pages generated, dynamic routes compiled. |
| Focused lint on the final Hero, Orb, voice section and audio demo | Exit 0. |
| `git diff --check` | No whitespace errors. |

Remaining lint errors are in unchanged animation primitives:

- `components/animate-ui/primitives/animate/slot.tsx:86`: `react-hooks/static-components`.
- `components/animate-ui/primitives/animate/tooltip.tsx:260`: `react-hooks/refs`.
- `components/animate-ui/primitives/animate/tooltip.tsx:266`: `react-hooks/set-state-in-effect`.

The seven warnings are existing image-optimization and unused-value warnings. No API handler, authentication or database implementation was changed.

Real Chrome browser testing covered both themes at 375, 768, 1024 and 1440px. The full route pass returned 200 for `/`, `/about`, `/agent`, `/careers`, `/contact`, `/developers`, `/models`, `/projects`, `/support`, `/news` and `/news/built-so-far`; the deliberate missing-page probe returned 404 with the themed error page. No document overflow or broken images were found in those observed loads. All seven news article routes were generated by the build; the long article route was exercised in the browser.

System theme changes, explicit override, persistence through navigation, desktop dropdown keyboard behavior, mobile focus containment/Escape, reduced-motion switching and the unsupported View Transition fallback passed. The route pass recorded zero hydration or JavaScript console errors. Final verification artifacts contain the latest Hero, audio, FAQ, Mermaid, reduced-motion and first-visit dialog checks. The final source pass also recorded zero errors: all eight viewport/theme combinations had no horizontal overflow, Hero tabs responded to keyboard selection, playback and keyboard seeking worked, the transcript matched its source, three Mermaid diagrams rendered, and notice focus/Escape checks passed. Source fingerprints remained unchanged between the successful final build and browser validation.

Artifacts from this local session:

- `/tmp/miransas-ui-qa/qa-report.json`: route and interaction pass.
- `/tmp/miransas-ui-qa/final-qa-report.json`: final viewport and focused behavior pass.
- `/tmp/miransas-ui-qa/final-*.png`: screenshots of the final source.
- `/tmp/miransas-ui-qa/external-links.json`: external link responses.
- `/tmp/miransas-lint-final.log`, `/tmp/miransas-tsc-final.log`, `/tmp/miransas-build-final.log`: command output.

## Remaining limits

The existing `console.miralas.io` product endpoints returned 404, including the root console CTA destination. Their intended routes were preserved; restoring that separate service is outside this repository. The Discord invite could not be verified because the remote connection reset. Footer blog, GitHub, social, legal and status destinations otherwise responded successfully; GitHub creation links correctly redirect to sign-in.

Tests used real Chrome with emulated viewport sizes, not Safari/iOS or physical devices. No frame-by-frame first-paint measurement was made. Existing mixed Turkish/English content and nonnumerical marketing copy were preserved. The status link does not claim verified service health.

`AGENTS.md` was generated automatically by Next.js tooling during preview. A small `.pnpm-store/` directory also appeared during dependency tooling in the shared workspace; neither is an application feature change.

## Files modified

- `app/about/page.tsx`
- `app/agent/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/models/page.tsx`
- `app/not-found.tsx`
- `app/page.tsx`
- `app/projects/projects.mdx`
- `app/support/page.tsx`
- `components/code-block/code-block.tsx`
- `components/layouts/footer.tsx`
- `components/layouts/header.tsx`
- `components/mermaid.tsx`
- `components/provider/Callout.tsx`
- `components/provider/mode-toggle.tsx`
- `components/provider/page-transition.tsx`
- `components/provider/site-modal.tsx`
- `components/provider/smooth-scroll.tsx`
- `components/provider/theme-provider.tsx`
- `components/shaders/shader-cta.tsx`
- `components/shared/BentoSection.tsx`
- `components/shared/RobotEyes.tsx`
- `components/shared/StickySplitSection.tsx`
- `components/shared/ai-teamSection.tsx`
- `components/shared/faq.tsx`
- `components/shared/feature.tsx`
- `components/shared/heroTimeline.tsx`
- `components/shared/new-hero.tsx`
- `components/shared/scroll-text.tsx`
- `components/shared/voice-demo.tsx`
- `components/shared/voice-orb.tsx`
- `components/shared/voice-section.tsx`
- `components/ui/glow-button.tsx`
- `constants/bento.ts`
- `constants/footer.ts`
- `constants/navbar.ts`
- `constants/voice-sections.ts`
- `docs/UI_RESTORATION.md`
- `lib/use-hydrated.ts`
- `public/manifest.webmanifest`
