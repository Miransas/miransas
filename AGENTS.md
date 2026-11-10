<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.



Miransas ecosystem instructions for coding agents
Before editing UI in this repository, read DESIGN_SYSTEM.md at the repository root and follow its visual, accessibility, and responsive rules.
Non-negotiable conventions
- Keep the existing product architecture and preserve working functionality. Do not redesign unrelated components.
- Use the project's Next.js, TypeScript, Tailwind and animation conventions; don't install packages unless strictly needed.
- Prefer rounded-4xl for appropriately sized main containers; use proportionate smaller radii for compact controls.
- Do not add borders by default. Favor clean surfaces, spacing, typography, and subtle tonal separation.
- FAQs should use quiet, accessible, preferably borderless accordions; no repetitive boxed FAQ cards.
- Support the project's actual theme requirements; Miransas and Miralas websites support light #EFEFEF and dark #050505.
- Keep marketing copy in natural English, with exceptions for proper nouns and intentional multilingual content.
- Use deliberate, restrained motion. Avoid bento-by-default, clutter, neon accents, excessive gradients and hover-only effects for essential information.
- No invented prices, benchmarks, claims of availability, security guarantees, or working integrations.
- Verify changes with the repo's actual lint, TypeScript and build scripts; report failures precisely.
Scope
This file should be copied to each repository separately, alongside DESIGN_SYSTEM.md. The three repositories share principles but must retain their own product-specific UX. For console screens, clarity of dense data and focus states overrides a desire to remove every line.
<!-- END:nextjs-agent-rules -->
