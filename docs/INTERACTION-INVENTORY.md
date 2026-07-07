# Interaction Inventory

**Status:** Version 1 — 2026-07-06

## How to Read This Document

This document is an inventory and a decision tracker, not a specification. It exists because Phase II (see the project's working notes: the shift from implementation correctness to interaction and visual craftsmanship) explicitly requires establishing the system an interaction belongs to before refining it — and that's only possible from an accurate map of what already exists, not an assumed one. Every entry below was verified against the actual source in `website/src`, not recalled from memory or from what DESIGN-SYSTEM.md says *should* be there.

It sits between EXPERIENCE-PRINCIPLES.md (why the experience should feel a certain way) and DESIGN-SYSTEM.md (the tokens and rules implementing that philosophy): this document is the layer that checks what's actually built against both, and flags where they've drifted apart or never been decided at all.

Three categories, each treated differently going forward:

- **Established Conventions** — patterns that already exist consistently, more than once, for the same reason. These are ready to be named and formalized (starting with motion) rather than re-invented.
- **Issues to Resolve Next** — places where the code contradicts itself: the same kind of element behaves two different ways for no stated reason. These are bugs in consistency, not open design questions, and get resolved before formalization work starts.
- **Open Design Decisions for This Phase** — real, undecided questions. Not bugs — nothing here is wrong yet, because nothing has been decided. These get resolved as part of the motion and interaction specification, not before it.

---

## Established Conventions

### 1. Card-style link hover

A block of content (title, dek, meta) sits inside one `<Link>` with a `group` class; only the title shifts to `accent` on hover via `transition-colors group-hover:text-accent`. The rest of the block (dek, meta) stays muted and static.

Used identically at: [research/page.tsx:39](../website/src/app/research/page.tsx#L39), [journal/page.tsx:48](../website/src/app/journal/page.tsx#L48), [page.tsx:91](../website/src/app/page.tsx#L91) (Home's Featured Investigation), [journal/[slug]/page.tsx:102](../website/src/app/journal/%5Bslug%5D/page.tsx#L102) (Related Research).

Four independent call sites, same shape, same reasoning each time — this is a convention already, just unnamed in code. Pairs with the `aria-label` override DESIGN-SYSTEM.md already documents (accessible name is the title alone, not the whole card's text).

### 2. Standalone CTA link

An inline link styled `text-accent underline underline-offset-4`, static — no distinct hover state, since it's already accent-colored and underlined at rest. Used for Home's "Explore the Research" and "Studio" links, the Research/Journal entry back-links, and Contact's email address (at a larger size, `text-subhead`, but the same pattern).

Repeated as a hand-typed Tailwind string roughly six times rather than a shared component or class.

### 3. External-link disclosure

`target="_blank" rel="noopener noreferrer"` plus a visually-hidden `sr-only` span reading "(opens in a new tab)" — no visible icon. Matches EXPERIENCE-PRINCIPLES.md §III exactly. Used at [studio/page.tsx:47–53](../website/src/app/studio/page.tsx#L47) and [contact/page.tsx:51–58](../website/src/app/contact/page.tsx#L51). Two call sites today; more are expected once Chyless World Studio is live and linked from more places.

### 4. Expand / collapse (Research accordion)

[CollapsibleSection.tsx](../website/src/components/interactive/CollapsibleSection.tsx): a chevron rotates 180° and the content region reveals via `grid-template-rows` (`0fr` → `1fr`), both animated at `duration-300 ease-out`, both wrapped in `motion-reduce:transition-none`. The single most fully-realized interaction on the site — the natural reference point for a "reveal" motion token.

### 5. Ambient scroll signal (reading progress)

[ReadingProgress.tsx](../website/src/components/interactive/ReadingProgress.tsx): a 2px hairline whose width transitions at `duration-150 ease-out`, updated via a `requestAnimationFrame`-throttled scroll listener, colored `muted` rather than `accent` (deliberately not read as an interactive/brand element). Single call site: `research/[slug]/page.tsx`.

### 6. Global focus state

One rule in `globals.css` (`:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`), reaching every focusable element sitewide, including links rendered from markdown via `dangerouslySetInnerHTML`. Already fully systematized — nothing to formalize further here.

### 7. Nav active / hover state

[NavLink.tsx](../website/src/components/navigation/NavLink.tsx): muted by default, `hover:text-accent`, pinned to `text-foreground` (not accent) when `aria-current="page"` marks the active route. One convention, one component, used by both Header and Footer via `PrimaryNav`.

### 8. Image loading placeholder

[DocumentaryImage.tsx](../website/src/components/media/DocumentaryImage.tsx): when no `src` is supplied, renders a static neutral box (`border` + `bg-muted/20`) in the correct final `aspect-ratio` — no shimmer, no skeleton animation. Matches EXPERIENCE-PRINCIPLES.md §IX precisely.

### 9. Absence of forms and buttons (as a convention, not a gap)

Contact is a `mailto:` link, not a form — confirmed already resolved in SITE-MAP.md. The *only* `<button>` element anywhere on the site is the CollapsibleSection toggle. Worth recording explicitly: this confirms DESIGN-SYSTEM.md's "reserve buttons for genuine actions" is being followed in practice, not just stated — there is currently exactly one genuine action, and it has exactly one button.

---

## Issues to Resolve Next

Both entries below are internal inconsistencies — the same category of element behaves differently in different places for no documented reason. Resolving order, per direction: **inline links first**, then the Home hover gap.

### A. Inline links inside long-form body content have no defined style

**Status: Resolved 2026-07-06.**

`.investigation-body` (Research entries) and `Prose` (About, Journal, Studio, Contact body copy) both render markdown-derived content that can contain inline `<a>` tags — but `globals.css` never styled an `a` selector at all, and Tailwind's preflight strips the browser default (no color, no underline). A link inside an investigation or journal essay was indistinguishable from surrounding prose except by focus outline, which only appears on keyboard focus, never on hover or at rest.

This was closer to an accessibility and readability defect than a visual-polish gap: a link a sighted mouse-user can't identify as a link fails the plainest version of "is this clickable?" that §VII (Hover & Focus States) sets as the bar for every other interactive element on the site.

**Fix:** added a scoped `.investigation-body a, .journal-body a` rule in `globals.css` reusing the existing Standalone CTA Link convention (`accent` color, static underline, no separate hover state) rather than inventing a new treatment for body copy. The `journal-body` class was added to the wrapper `div` in `journal/[slug]/page.tsx` so the selector has something to scope to — Research's equivalent class already existed. No change was needed to `Prose` itself, since About/Studio/Contact author their links directly in JSX with their own explicit classes, not via markdown.

### B. Home's "In the Field" link has no hover signal

**Status: Resolved 2026-07-06.**

[page.tsx:47](../website/src/app/page.tsx#L47) wrapped the featured Journal image and caption in `<Link href={...} className="block">` — no `group` class, no color or state change of any kind on hover. Every other card-style link on the site (Established Convention #1 above) gives its title a hover cue. This one gave none, on any element. Read as an oversight in translation from the approved homepage mockup, not a deliberate "images are self-evidently clickable, text isn't" decision — nothing in HOMEPAGE.md states that distinction.

**Fix:** added `group` to the `Link` and a new `textClassName` prop on `Caption` (applied only to the primary caption line, not the meta/location-date line) carrying `transition-colors group-hover:text-accent` — matching Convention #1's rule that only the title-equivalent element reacts, meta stays muted. Deliberately left the image itself untouched (no zoom, no opacity, no overlay): every other card-hover instance on the site only recolors text, never touches the image, and giving this one card an image-level effect would introduce a new pattern rather than apply the existing one.

---

## Open Design Decisions for This Phase

Unlike the two issues above, nothing here is wrong yet — each is a real, undecided question that should be resolved as part of the motion and interaction specification, not before it.

### 1. Should a newly-loaded photograph get a calm fade-in?

Today a real image (once `src` exists) paints in via the browser's native, uncontrolled behavior — no transition from placeholder to loaded state. A load pop is arguably a real discontinuity that Micro-interactions (§X) would accept a fix for ("is there a real ambiguity this flourish resolves that nothing else resolves?" — arguably yes, the moment of arrival itself). But it could just as easily be exactly the kind of flourish Restraint (§III) says shouldn't exist without a stated reason attached. Needs a considered yes or no, not a default in either direction.

### 2. Should the reading-progress hairline extend to Journal entries?

Currently scoped to Research only. This might be deliberate rhythm differentiation (EXPERIENCE-PRINCIPLES.md §IV draws a real distinction between Research's gated, returned-to-across-sessions pacing and Journal's single continuous read) — or it might simply be that it was only ever built where it was first needed, with no decision made about Journal either way. Worth noting the hairline is an ambient scroll signal, not a gating mechanism, so §IV's reasoning for withholding the accordion from Journal doesn't automatically transfer to withholding this too — the two need to be argued separately, not assumed to travel together.

### 3. Gallery's interaction model is entirely undecided

[Gallery.tsx](../website/src/components/media/Gallery.tsx) is an explicit, self-declared placeholder (its own comment says so) — a static grid of neutral image placeholders with no grid density, caption treatment, or interaction (lightbox or otherwise) decided. Correctly out of scope until a Journal entry actually needs multiple images. Recorded here so it doesn't get designed by accident as a side effect of unrelated motion or spacing work — any future gallery interaction should be a deliberate addition, weighed against Restraint like every other proposed interaction, not an afterthought bundled into a different pass.

---

## Using This Document

When the motion specification (and the spacing/typography passes after it) begins, the Established Conventions above are the source material — durations, easing, and reusable components should be extracted from what already exists and repeats, not invented fresh. The Issues get fixed first, independent of that work, since they're corrections to the current state rather than additions to it. The Open Design Decisions should be resolved as part of the motion and interaction specification itself, since each one is fundamentally a motion or interaction-behavior question.

This document should be updated, not left to go stale, as each item resolves — a decision tracker with an outdated status column is worse than none, because it actively misleads the next person who reads it.
