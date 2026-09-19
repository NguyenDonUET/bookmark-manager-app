---
name: compose-molecule-component
description: Compose a molecule-level component (e.g. SearchInput, FormField, CardHeader, Pagination item, Toast) by combining existing primitive components, from a Figma reference. Use whenever the user asks to "build/compose a molecule", references a Figma frame that is clearly made of multiple primitives, or says things like "ghép Input với Button thành SearchBar", "build FormField từ Figma".
---

# Compose Molecule Component (from Figma)

## What counts as a molecule
A molecule is 2+ primitives arranged together with a specific layout/behavior, but still a single reusable unit (not a full page section). Examples: `SearchInput` (Input + Icon + clear Button), `FormField` (Label + Input + helper/error text), `CardHeader` (Avatar + title + action Button), `Toast` (Icon + text + close Button), `Pagination item`.

If the target only needs one primitive with different props, this is NOT a molecule — use `build-primitive-component` instead. If the target is a full section/page (e.g. entire login form, entire settings panel), this is too big for this skill — break it into molecules first.

## Pre-flight checks (do these BEFORE writing any code)
1. **Inventory required primitives.** From the Figma frame, list every primitive the molecule is built from (e.g. `Input`, `Icon`, `Button`). Check each exists in `src/components/ui/`.
   - If any primitive is missing, STOP. Tell the user which primitive(s) are missing and offer to build them first with `build-primitive-component`, rather than inlining a one-off replacement inside the molecule.
2. **Do not re-style primitives inside the molecule.** The molecule composes existing primitives via their public props (`variant`, `size`, `icon`, etc.) — it does not reach into a primitive's internals or override its tokens with one-off classes. If the Figma design needs a primitive variant that doesn't exist yet, flag it and add that variant to the primitive itself (separate task), not as a local override here.
3. Check `src/components/ui/` (or wherever molecules live, e.g. `src/components/molecules/`) for an existing component with the same name or overlapping purpose.

## Build steps
1. **One molecule, one Figma frame.** Reference only the exact frame/link given. Don't infer sibling molecules not shown.
2. **Read the Figma Component Properties / Variants panel** for the complete set of:
   - Composition-level props (e.g. `label`, `placeholder`, `error`, `helperText`, `showClearButton`)
   - Layout variants (e.g. horizontal/vertical, with/without icon)
   - States that span multiple primitives at once (e.g. molecule-level `error` state should drive both the Input's `aria-invalid` and the helper text's color/icon)
3. **Generate the component** in `src/components/ui/<MoleculeName>.tsx` (or the project's molecules folder):
   - Import and compose only existing primitives — no new raw `<div>`-based buttons/inputs/etc.
   - Layout and spacing (gaps, alignment) use the same token scale as primitives (`var(--space-*)` / Tailwind spacing) — never arbitrary pixel values.
   - Expose a props API at the molecule's own level of abstraction (e.g. `<FormField label="Email" error={...}>` rather than forcing the consumer to wire up Label + Input + error text manually every time).
   - Forward refs/native props to the primary underlying primitive (e.g. the `Input` inside `FormField`) so the molecule stays composable.
4. **Cross-primitive state wiring** — this is the part unique to molecules, do not skip:
   - If the molecule has an `error` state, make sure it propagates to every primitive that needs to reflect it (e.g. `Input` gets `aria-invalid` + error styling, helper text switches to error color/icon), not just a visual change on one child.
   - If the molecule has a `disabled`/`loading` state, propagate it to all interactive primitives inside (e.g. disable both the Input and the clear/submit Button).
5. **Accessibility pass** (molecule-specific, on top of what primitives already handle):
   - Label association: `<label htmlFor>` correctly linked to the underlying input's `id` (generate a stable id via `useId` if none is provided).
   - Error/helper text linked via `aria-describedby`.
   - If the molecule is a composite widget (e.g. combobox-like), verify focus order and keyboard interaction across its children, not just within one primitive.
   - Group related elements with the correct semantic wrapper (`fieldset`/`legend`, `role="group"`, etc.) when appropriate.
6. **Register the component**: add/update the export in the relevant barrel file (`src/components/ui/index.ts` or `src/components/molecules/index.ts`).
7. **Add a Storybook story — required if the project has Storybook** (check `.storybook/` or `@storybook/*` in `package.json`; skip and say so otherwise):
   - `src/components/ui/<MoleculeName>.stories.tsx`, CSF3, `title: 'UI/<MoleculeName>'`, `tags: ['autodocs']`.
   - `argTypes` for every composition-level prop from step 2.
   - One story per meaningful state (`Default`, `WithError`, `Disabled`, `Loading`, layout variants) — including states that only show up when a child primitive's state is driven by the molecule (e.g. `WithError` must visibly show the Input in its error variant, not just the helper text).
8. **Report back**: which primitives were reused, which Figma frame was used, any missing primitive/variant that had to be flagged instead of worked around, and whether a Storybook story was added.

## Guardrails
- Never build a molecule by copy-pasting a primitive's markup instead of importing and composing it — that breaks the single-source-of-truth primitives were built for.
- Never patch a missing primitive variant with a local CSS override inside the molecule — surface it as a gap in the primitive instead.
- Keep composition logic (layout, state wiring, a11y linking) separate from visual styling (which stays inside the primitives).
- Keep the diff scoped to one molecule per run, same as with primitives.

## Batch mode (multiple molecules requested at once)
If the user gives a list of several molecules to build in one message:
- Process them sequentially, one full pass (steps 1–8) per molecule.
- After finishing each molecule, pause and summarize it (per step 8) before starting the next, rather than generating all diffs at once — this keeps each one reviewable and matches how `build-primitive-component` handles batches.
- If several molecules in the list depend on the same missing primitive, flag that once up front rather than repeating the same stop for each one.