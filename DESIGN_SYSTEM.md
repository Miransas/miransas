Miransas Ecosystem — UI Design Rules
Shared visual language for Miransas (miransas), Miralas (miralas), and Miralas Console (miralas-console). Use this as a design contract, not an instruction to make the three products look identical.

Identity
Build interfaces that feel calm, premium, precise, and original. Emphasize typography, hierarchy, rhythm, and motion instead of visual decoration. Preserve the brand character of each product: Miransas is an editorial engineering studio; Miralas presents voice AI products; Console prioritizes dense, clear application workflows.
Themes and colors
- Support both light and dark where the product calls for it. Miransas and Miralas marketing surfaces should support both; follow the Console's actual theme requirements rather than imposing light mode on a dark-only app.
- Light canvas: #EFEFEF; dark canvas: #050505.
- Use semantic design tokens (background, foreground, surface, muted, border, focus) rather than scattered hex colors.
- Favor neutral text and surfaces. Reserve blues/cyans and other colors for intentional product visuals, meaningful states, and restrained accents.
- No neon palette, gratuitous glow, loud gradients, or random multicolor treatments.
- Prefer a transparent monochrome logo that adapts to the theme, never a colored square behind it merely to obtain contrast.
Geometry, surfaces, and borders
- Prefer generous, consistent curvature. rounded-4xl is the default for substantial containers, where its radius fits the size and context. Use smaller, proportionate radii for small buttons, dropdowns, inputs, and compact controls. Do not apply rounded-4xl indiscriminately.
- Borders are optional, not automatic. Use spacing, typography, tonal surfaces, alignment, and subtle hover states to separate content.
- Avoid outlining every card, list item, accordion row, or section. Never stack border + ring + shadow + glow as decoration.
- A border is appropriate only when it improves information hierarchy, accessibility, focus, editing affordances, or separation against similarly colored layers.
- Keep shadows soft and sparse. Avoid excessive card grids and bento layouts by default; use editorial rows, purposeful split sections, and visual storytelling where they fit.
FAQ and accordions
- Favor a borderless accordion with generous vertical spacing, strong question typography, and clear open/closed states.
- Use whitespace, dividers only when needed, or gentle surface tint; avoid a boxed bordered card for every question.
- Use a quiet chevron or plus/minus indicator with consistent rotation.
- The whole question row is a semantic button with aria-expanded, aria-controls, keyboard operation, and visible focus.
- Animate opening smoothly without jumpiness; respect reduced motion. Maintain readability in both themes.
Typography and spacing
- Use the repository's configured fonts; do not install new font families without a clear need.
- Make headings confident but not oversized. Keep tracking, line-height, and paragraph widths intentional.
- Use a small, consistent spacing scale. Allow generous whitespace rather than filling it with extra cards.
- All public marketing interface copy should be clear professional English, except proper nouns, original multilingual examples, and user-generated content.
Motion and visual effects
- Motion should express purpose: subtle reveal, section-to-section narrative, interface feedback, or organic visual life.
- Prefer transforms and opacity for performant transitions. Respect prefers-reduced-motion.
- Preserve authored WebGL, shader, and voice visual identities; do not replace them with generic gradients or stock effects.
- Use powerful visuals sparingly. On mobile simplify sticky/pinned experiences and reduce GPU demands.
Interaction and responsive quality
- Every control must perform a real action or be clearly designated as illustrative/unavailable.
- Maintain keyboard navigation, readable contrast, visible focus, semantic structure, and sensible loading/empty/error states.
- Test at 360–430px mobile, 768px tablet, and 1024–1440px desktop. Avoid horizontal overflow and overlaps.
- Preserve existing auth, billing, API, navigation, and backend behaviors. Never fabricate prices, production metrics, supported models, release status, or security claims.
Product-specific application
- Miransas website: editorial stories, engineering craft, minimal sections, coherent light/dark transitions; existing orb/shader experiences are signature visuals.
- Miralas marketing: product clarity, demo quality, accessible pricing, trustworthy calls to action; do not reuse the exact same hero composition everywhere.
- Miralas Console: prioritize task efficiency, forms, data legibility, tables, states and permissions. Borderless styling should not remove the clear structure needed for data-heavy workflows.
Review checklist
Before shipping any UI change, confirm:
1. Does the result match the project's existing visual character rather than a generic template?
2. Is each border, shadow, glow, accent and animation truly necessary?
3. Are large containers elegantly rounded where appropriate (rounded-4xl), and small controls proportionate?
4. Are FAQ/accordions clean, accessible, and preferably borderless?
5. Do both supported themes render correctly, with transparent logos and strong contrast?
6. Do mobile layout, keyboard controls, reduced motion, and performance hold up?
7. Were existing routes, business logic, and integrations preserved?
8. Were lint, typecheck and build actually run, and were any failures reported honestly?
This document is guidance for new work and thoughtful refinements. Never trigger sweeping redesigns or mass deletion merely to enforce a stylistic preference.