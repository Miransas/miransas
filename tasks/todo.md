# Non-hero refinement checklist

- [x] Refine engineering/research/capability cards: neutral surfaces, readable text, unchanged claims and controls.
- [x] Refine product studies, FAQ, timeline, and supporting showcases: no decorative halos; consistent spacing and restrained motion.
- [x] Refine `/models` content below its header: remove radial overlays; preserve tab/panel behavior and model data.
- [x] Run lint, TypeScript, production build; inspect diff and workflow YAML; confirm hero and unrelated local edits are preserved.
- [x] Automated accessibility smoke test: axe 4.13.0 reports zero violations on the homepage and scoped non-hero model panels after remediation. Pa11y 9.1.1 also ran during audit.
- [ ] Manual visual review: light/dark desktop/mobile, keyboard, reduced motion, and console/hydration. Blocked: browser host unavailable; native Chrome control also failed/timed out. No manual pass claimed.
Git handoff: use the requested commit message and push the verified current branch after checks pass; the final response records the commit and push result.
