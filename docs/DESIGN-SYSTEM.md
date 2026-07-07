# Design System

**Status:** Version 1 — Frozen 2026-07-02

## Principles

The site should read like an editorial publication, not a portfolio or product. Every decision below is in service of four references:

• Documentary

• Museum Archive

• Architectural Journal

• Editorial Publication

Quiet confidence is the result of holding to these references — it isn't a reference in itself, and shouldn't be designed toward directly.

This publication should feel less like a website and more like a carefully designed reading environment. Typography, photography, rhythm, pacing, and whitespace should guide the experience more than interface elements.

---

## Typography

**Direction:** editorial serif + sans pairing. Serif for headlines and long-form reading, sans for UI, navigation, captions, and metadata — the same split used by print-derived editorial sites (magazines, journals, museum publications).

**Confirmed pairing:**
- Headlines / body / long-form: **Newsreader** (literary, has true italics and optical sizing — reads like a journal, not a blog)
- UI / nav / captions / metadata: **IBM Plex Sans** (systematic, slightly technical character that suits "systems thinking" and "public health" subject matter)

Both load via `next/font/google` in `layout.tsx`. Tested against substantial real content — Investigation 001's full essay, About, Studio, Contact — and confirmed as final, not a placeholder.

### Type Scale

A single modular scale (1.25 ratio), expressed in `rem` so it maps directly onto Tailwind's default units when implementation starts:

| Token | Size | Use |
|---|---|---|
| `display` | 3.815rem | Homepage research question, investigation title on detail pages |
| `headline` | 3.052rem | Section headers |
| `subhead` | 2.441rem | Featured investigation title on Home |
| `title` | 1.953rem | Investigation card titles, page titles |
| `body-lg` | 1.25rem | Long-form investigation body copy |
| `body` | 1rem | Default body text, UI |
| `meta` | 0.8rem | Captions, metadata, tags, timestamps — always the sans family |

---

## Color

Near-monochrome, paper-and-ink base with a single restrained accent reserved for interactive states (links, focus). No decorative color.

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#FAFAF8` | `#0A0A0A` | Page background. Warm off-white rather than pure white — closer to paper. |
| `foreground` | `#1A1A18` | `#EDEDED` | Primary text. |
| `muted` | `#6B6B65` | `#A0A09A` | Secondary text, metadata, captions. |
| `border` | `#E3E2DD` | `#262624` | Hairline rules, dividers — used sparingly, editorial rule-lines not boxes. |
| `accent` | `#3B5166` | `#7FA0B8` | A restrained slate blue — institutional, editorial, research-oriented rather than literary. Confirmed as final after extensive use across links, focus states, and interactive elements sitewide. Used only for links and focus states, never decoratively. |

`website/src/app/globals.css` already scaffolds `--background` / `--foreground` with a `prefers-color-scheme: dark` block — this table extends that pattern rather than replacing it.

**Dark mode status: implemented, but known not to be the target atmosphere.** The Dark column above defaults to a generic software dark-mode convention — a near-black background (`#0A0A0A`) paired with high-brightness, cool-neutral text (`#EDEDED`) — the same pairing used for OLED-battery-saving "true black" themes. That's a technical/product convention, not an editorial one, and it doesn't carry the same "paper, in a reading environment" atmosphere the light palette does. This was evaluated deliberately (not just noticed in passing): dark mode itself doesn't conflict with this project's philosophy — museums dim rooms for light-sensitive work, archives and lamplit reading are legitimate editorial registers — but this specific implementation reaches for the wrong one.

Kept as-is for now, deliberately, rather than patched partway. Scheduled as a future visual-refinement pass, with its own brief:

> **"The same room after dark." Not "a software application's dark theme."**

Concretely, that means a future revision should move toward a warm, deep charcoal background rather than near-black, and a warmer, slightly dimmer off-white rather than `#EDEDED`'s cool near-maximum brightness — targeting a softer overall contrast (roughly 12–14:1 rather than the current pairing's ~20:1), which reads as a dim room rather than a bright screen with the lights off, and incidentally reduces the halation effect high-contrast light-on-dark text causes for some readers. The `accent` and `border` dark values are not implicated in this — both are already reasonably warm/restrained and not the source of the "software" read.

---

## Layout & Grid

- **Reading measure:** long-form investigation body text is capped at `~68ch` (roughly 680px) — optimized for reading, not full-bleed.
- **Wide layout:** index pages, imagery, and the Home featured block may run wider, up to a `1200px` outer container.
- **Grid:** No literal CSS grid system — alignment comes from shared max-width containers (`PageShell`) and Flexbox (metadata rows, navigation), which has been sufficient for every layout built so far. A formal column grid isn't implemented and shouldn't be assumed; add one deliberately if a future layout genuinely needs it, rather than assuming it already exists.
- **Spacing scale:** 4px base, matching Tailwind's default spacing scale (`0.25rem` increments) so design tokens and implementation stay in lockstep: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.
- **Vertical rhythm:** section spacing on Home and investigation pages should feel like turning a page — generous (64–128px) — rather than dense product-page stacking.
- **Proximity as a grouping/distinction tool:** when two adjacent elements need to read as connected, or as independent of each other, reach for the spacing scale before reaching for new typography, color, or a decorative device (rule, icon, border). Confirmed by two independent cases: Home's Disciplines taxonomy reads as introducing Featured Investigation through a tight `mt-4` alone (no divider, no heading — see HOMEPAGE.md's "Resolved since V1 freeze"), and the Hero byline ("Chyanne Robbins") reads as its own authorial beat, distinct from the tagline beneath it, purely by widening that gap to `mt-8` — same typography, same color, nothing new. Default to this before proposing a new visual treatment when the actual problem is a grouping or hierarchy relationship, not a styling one.

---

## Imagery & Photography

- Full-bleed or generously margined — never cropped into small thumbnails or card grids.
- Treated consistently across the site — a single documentary-style grade, confirmed across real photography now in place (the author portrait, Journal field photos, the Research cover image): natural color, no stock-photo brightness/saturation, `object-cover` with no decorative crop styling beyond an occasional deliberate `object-position` adjustment.
- Captions in the sans family (`meta` token), small, understated — archival label style, not bold overlay text.
- The homepage's "In the Field" section is the clearest expression of this principle: a single documentary photograph, captioned plainly, with location and date, and no decoration.

---

## Components & UI Principles

- **Navigation:** wordmark (linking home) + Research, Journal, About, Studio, Contact text links. No mega-menus, no dropdowns.
- **Links:** styled as understated text (underline or accent color on hover), not buttons. Reserve button-styled elements for genuine actions (form submit, entering a section), not decorative CTAs.
- **Research and Journal listings:** editorial list/index layout (title, dek, meta), not card grids with shadows. Each entry's title, dek/excerpt, and meta all sit inside one large `<Link>` — a deliberately big click target, not shrunk to just the title — but that Link carries `aria-label={entry.title}` so a screen reader announces only the title, not the whole card's text read out in sequence. Any future full-card link (an entire block of visible content as one clickable link) should follow the same pattern: keep the large click target, override the accessible name to just the title.
- **No decorative chrome:** no drop shadows, no gradients, no rounded "app" corners on content blocks. Hairline rules (`border` token) instead of boxes/cards to separate content.

---

## Motion

Minimal and purposeful only. What exists today: color transitions on hover/focus (links, navigation), the Research investigation accordion's expand/collapse, and the reading-progress hairline's width update. No scroll-triggered entrance animations are implemented anywhere on the site — don't assume they exist. No parallax, no flashy transitions. Respect `prefers-reduced-motion` unconditionally.

(This section is intentionally thin — the full reasoning behind it lives in [EXPERIENCE-PRINCIPLES.md](EXPERIENCE-PRINCIPLES.md), which this section should be checked against before it changes. The concrete durations, easing, and category-by-category scope now live in [MOTION-INTERACTION-SPEC.md](MOTION-INTERACTION-SPEC.md).)

---

## Accessibility

- Minimum WCAG AA contrast for all text/background pairs above — verified. All pairs clear AA (4.5:1); all clear AAA (7:1) except light-mode `muted` (5.1:1, AA only), which is used exclusively for secondary/meta text — the register where AA, not AAA, is the applicable bar.
- Visible focus states using the `accent` token — never `outline: none` without a replacement. Implemented as a single global `:focus-visible` rule in `globals.css` (a 2px accent outline), not per-component classes — this is also what makes it reach links rendered from Markdown body content, which never pass through a component.
- All motion gated behind `prefers-reduced-motion: no-preference`.

---

## Implementation Notes

These tokens are implemented in `website/src/app/globals.css`'s `@theme` block: `--color-background` / `--color-foreground` / `--color-muted` / `--color-border` / `--color-accent`, plus font variables for Newsreader / IBM Plex Sans and the fluid type-scale custom properties. This section now describes the implementation, not a future plan.
