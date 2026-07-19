# Motion & Interaction Specification

**Status:** Version 1 — Frozen 2026-07-07

## How to Read This Document

This document describes the interaction language that already exists across the site, formalized into a system — it is not a proposal for new interactions, and nothing in it should be read as license to add motion that isn't already justified by a category below. It sits alongside DESIGN-SYSTEM.md (tokens and visual rules) and beneath EXPERIENCE-PRINCIPLES.md (the philosophy those tokens answer to); where this document sets a duration or scope, EXPERIENCE-PRINCIPLES.md is why, and docs/INTERACTION-INVENTORY.md is the audit this document was built from. If a future implementation ever seems to need a value or scope this document doesn't define, that's a signal to extend this document deliberately, not to improvise past it.

Every value below was extracted from what the codebase already does consistently, not chosen fresh. Two categories (Reading Progress's scope, and image load behavior) required a real design decision rather than extraction, and both are recorded here as settled — the reasoning that produced them lives in this document, not just in the conversation that arrived at them.

---

## Foundational Tokens

Two durations and one easing curve cover every animated interaction on the site today. That a single easing curve has been sufficient for everything, with zero exceptions, is itself a rule worth stating rather than an accident worth preserving quietly:

| Token | Value | Governs |
|---|---|---|
| `--duration-state` | 150ms | Discrete state changes — color/opacity shifts on hover, focus, and active states |
| `--duration-reveal` | 300ms | Spatial reveals — content changing size or position, not just appearance |
| `--ease-standard` | ease-out | The only easing curve used anywhere on the site |

**Why one easing curve, not several:** Motion Principles (EXPERIENCE-PRINCIPLES.md §V) calls for motion that "resolves calmly... arrives, settles, done" and explicitly rejects bounce/spring physics as borrowed, dated trends. A single curve reused everywhere is the concrete expression of that: it means no interaction on the site calls attention to its own physics. Introducing a second curve for a future interaction should be treated the same way DESIGN-SYSTEM.md treats a second accent color — possible in principle, but requiring the same burden of proof as any other addition, not a default reach.

**Why two durations, not one:** §V's actual rule is "match the animated property to what's changing." A color shift and a shape changing size are different kinds of change, and collapsing them to one duration would be tuning for convenience, not for what each change actually needs. 150ms reads as instantaneous for a color shift; 300ms is what makes a height reveal read as continuous motion rather than a flicker.

**Reduced motion is not a per-component afterthought.** Every category below that animates anything ships a `motion-reduce:transition-none` (or equivalent instant fallback) as part of its own definition. This is a requirement of adding a new animated interaction to this system at all, not a checklist item to remember afterward — EXPERIENCE-PRINCIPLES.md §XI treats accessibility as part of the design, not a layer added once the design is finished, and reduced-motion support is where that principle is most directly testable.

---

## Category 1: State-Change Color Transitions

**What it is:** A color shift communicating "this is interactive" or "this is the current state" — hover, focus-adjacent affordance, and active/current-page marking. The largest category on the site by instance count, and the most mature: every instance already agrees on duration and easing without having been told to.

**Current implementations:**
- `NavLink` — muted → `hover:text-accent`; active route pinned to `text-foreground` via `aria-current`
- The card-hover convention — a title-equivalent element inside a full-block `<Link>` shifts to `accent` on `group-hover`, while dek/meta stays muted. Used on the Research index, Journal index, Journal's Related Research, and Home's "In the Field" caption. Home's "Currently Investigating" section (2026-07-19) deliberately no longer uses this — it grew into a multi-line editorial passage rather than a title-plus-tags card, so it now navigates through one explicit CTA link at the end instead of a whole-block hover link; see HOMEPAGE.md.
- The Standalone CTA link — `text-accent underline underline-offset-4`, static (already at its "hover" appearance at rest, so nothing further shifts)
- Inline links inside markdown-rendered body content (`.investigation-body a`, `.journal-body a`) — reuses the Standalone CTA treatment

**Tokens:** `--duration-state` (150ms), `--ease-standard`.

**System status: Reusable convention, formalized.** This is the category most worth extracting into shared, named treatments (a `cardHoverTitle` class or equivalent, an `ExternalLink`/CTA-link component) rather than the hand-typed Tailwind strings currently repeated at each call site — that's an implementation-hygiene follow-up, not a design question; the convention itself is already fully decided.

---

## Category 2: Spatial Reveal / Collapse

**What it is:** Content changing from compressed to its actual size — the only category where the animated property is dimensional (height via `grid-template-rows`), not just appearance, per §V's rule that a height reveal communicates "content that was compressed is now taking its actual space" in a way an opacity fade never could.

**Current implementation:** `CollapsibleSection` (Research's investigation accordion) — the chevron rotates 180°, the content region reveals via `grid-template-rows` (`0fr` → `1fr`), both at `duration-300 ease-out`, both gated by `motion-reduce`.

**Tokens:** `--duration-reveal` (300ms), `--ease-standard`.

**System status: The component and its token are reusable; its application is not.** Any future progressive-disclosure need (not just Research investigations) should reuse this exact duration and reveal mechanism rather than inventing a new one. But whether to *apply* it to a given piece of content is a Rhythm question (§IV), not a motion question — Journal is deliberately built without gating structure ("no sections to gate, no accordion, nothing to expand"), so this pattern does not extend there. The distinction to hold onto: the motion vocabulary generalizes, the decision to use it does not.

---

## Category 3: Ambient / Continuous Tracking

**What it is:** A signal continuously re-derived from an ongoing reader action (scrolling), rather than a discrete state flip — structurally distinct from Category 1 even where a duration value happens to match.

**Current implementation:** `ReadingProgress` — a 2px hairline whose width transitions at `duration-150 ease-out`, recalculated via a `requestAnimationFrame`-throttled scroll listener, colored `muted` (deliberately not `accent`, which would read as an interactive/brand signal rather than an ambient one).

**Tokens:** `--duration-state` (150ms), `--ease-standard`.

**Scope: Research only. Settled, not provisional.** This was an open question resolved as part of establishing this specification: does the hairline extend to Journal? The answer is no, and the reasoning is a Rhythm argument, not a category-label argument. Research investigations are long-form, structured, and built to be returned to across sittings (§IV) — the specific condition under which "how much is left" is information a reader needs, the same reason a printed book shows a page count (§VIII). Journal is "looser and more frequent," varying from single-paragraph field notes to longer essays with no consistent length; applying the hairline uniformly would make it meaningful on some entries and decorative on others, which fails Restraint's test (§III) precisely because the answer would depend on which entry a reader happens to be on rather than on a stated, stable reason. A length-based heuristic (show it only past some word count) was considered and rejected for the same reason: it would be a real but invisible rule, and this system prefers a register that behaves one way consistently over a slightly more precise threshold nobody can see.

---

## Category 4: Load / Presence Transitions

**What it is:** How content that wasn't there — most often a photograph still arriving — becomes present.

**Settled decision: no fade-in, no transition of any kind.** A hard cut from the neutral placeholder state to the loaded photograph is the deliberate answer, not an unaddressed gap. Reasoning: Motion's actual test (§V) is whether an animation clarifies a state change a reader would otherwise have to work out themselves — but a gray placeholder becoming a photograph is already self-evidently a state change; nothing about it is ambiguous the way a clipboard copy with no browser feedback is (§X's contrasting example). §IX's own architecture argument points the same direction: because the site is statically generated, the honest default is that there usually shouldn't be a perceptible loading state to transition out of at all. And the same "reference is a book, not an app" logic that rules out animated page transitions (§V) applies here without modification — a printed photograph doesn't fade into a page.

**What does the work instead of a transition:** `DocumentaryImage` reserves the correct `aspect-ratio` before content arrives (preventing layout shift, per §IX) and now applies the same `bg-muted/20` neutral fill to both the no-`src` placeholder state and the container behind a still-loading real image — previously only the placeholder branch had this fill, so a slow-loading photograph briefly showed an uncolored box instead of the same "content is arriving here" treatment the placeholder gives. That was a consistency gap, not a motion gap, and closing it is what replaces a transition: the space always looks intentional, whether or not the photograph has arrived yet.

**Tokens:** none. This category is deliberately absent from the duration/easing system, the same way Category 5 is.

---

## Category 5: Navigation / Route Transitions

**What it is:** Moving from one page to another — index to entry, entry to related entry.

**Settled decision: instant, hard navigation. No crossfade, slide, or shared-element morph — permanently, not pending future refinement.** EXPERIENCE-PRINCIPLES.md §V already states this plainly: an animated page transition is one of the most recognizable signatures of the "premium template" register this project is explicitly not built to resemble, and it solves a problem — ambiguity about where the reader landed — that this site's plain, hard-navigating link structure doesn't have. Recorded here as its own category, with its own entry in this document, specifically so its absence reads as decided rather than as something later work might "complete."

**Tokens:** none.

---

## Category 6: Non-Motion Interaction Conventions

Reusable interaction decisions that carry no animation at all, included here because they're part of the same interaction language, not because they belong in the duration/easing system.

- **External-link disclosure** — `target="_blank" rel="noopener noreferrer"` plus a visually-hidden `sr-only` "(opens in a new tab)" span, no visible icon (§III). Currently hand-copied at two call sites (Studio's outbound CTA, Contact's Chyless World mention); a candidate for extraction into a shared component as Studio gains more outbound links.
- **Card accessible-name override** — a full content block (title, dek, meta) sits inside one large `<Link>` for a generous click target, but carries `aria-label={title}` so assistive technology announces only the title, not the whole block's text read in sequence. Applies to every instance of the Category 1 card-hover convention.
- **The one-button boundary** — the entire site has exactly one `<button>` element (the accordion toggle). Recorded here as confirmation that "reserve buttons for genuine actions" (DESIGN-SYSTEM.md) is being followed in practice: there is currently exactly one genuine action, and it has exactly one button. A future second button should meet the same bar, not arrive because buttons are a familiar UI default.

---

## Reusable Conventions vs. Experience-Specific Scope

| Interaction | Convention (reusable) | Scope (where it decides to apply) |
|---|---|---|
| Color-transition hover (Category 1) | Yes — one convention, ~8 call sites | Applies anywhere a link needs a clickability signal |
| Card accessible-name override | Yes | Applies to every full-block card link |
| External-link disclosure | Yes | Applies to every `target="_blank"` link |
| Accordion reveal (Category 2) | Component + token, yes | Application stays Research-only — a Rhythm decision |
| Reading-progress hairline (Category 3) | Token, yes | Scope stays Research-only — a Rhythm decision, settled |
| Load/presence transitions (Category 4) | No transition is the convention | Applies everywhere images load; the neutral-fill consistency fix applies universally |
| Navigation transitions (Category 5) | No transition is the convention, permanently | Applies everywhere; not a per-page decision |

---

## Using This Document

Future spacing and typography formalization should follow the same shape this document used: extract from what's already consistent, name it as a category, define its tokens, and distinguish what generalizes from what stays scoped to the register or content type that justifies it — rather than starting from a blank set of values.

Update this document, rather than letting it drift, whenever a category's scope or token changes — a motion specification that no longer matches the code is worse than none, because the next person trusts it by default.
