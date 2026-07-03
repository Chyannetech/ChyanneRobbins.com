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

**Recommended — settled working default:**
- Headlines / body / long-form: **Newsreader** (literary, has true italics and optical sizing — reads like a journal, not a blog)
- UI / nav / captions / metadata: **IBM Plex Sans** (systematic, slightly technical character that suits "systems thinking" and "public health" subject matter)

Both are available as `next/font/google` (same mechanism already wired up in `layout.tsx` for Geist). Treat this pairing as the working default until tested against real content.

**Fallback — Option A:** Source Serif 4 + Inter. Safer, more neutral, higher familiarity. Reach for this if Newsreader / IBM Plex Sans read too literary once real headlines and body copy are in place.

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
| `accent` | `#3B5166` | `#7FA0B8` | A restrained slate blue — institutional, editorial, research-oriented rather than literary. Temporary placeholder; the exact value will be sampled from the approved homepage mockup when visual refinement begins. Used only for links and focus states, never decoratively. |

`website/src/app/globals.css` already scaffolds `--background` / `--foreground` with a `prefers-color-scheme: dark` block — this table extends that pattern rather than replacing it.

---

## Layout & Grid

- **Reading measure:** long-form investigation body text is capped at `~68ch` (roughly 680px) — optimized for reading, not full-bleed.
- **Wide layout:** index pages, imagery, and the Home featured block may run wider, up to a `1200px` outer container.
- **Grid:** 12-column, generous gutters. Used for alignment of images and metadata against text, not for card-grid layouts.
- **Spacing scale:** 4px base, matching Tailwind's default spacing scale (`0.25rem` increments) so design tokens and implementation stay in lockstep: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.
- **Vertical rhythm:** section spacing on Home and investigation pages should feel like turning a page — generous (64–128px) — rather than dense product-page stacking.

---

## Imagery & Photography

- Full-bleed or generously margined — never cropped into small thumbnails or card grids.
- Treated consistently across the site (a single consistent grade/treatment — exact treatment TBD once real photography exists; documentary-style, not stock-photo bright/saturated).
- Captions in the sans family (`meta` token), small, understated — archival label style, not bold overlay text.
- The homepage's "In the Field" section is the clearest expression of this principle: a single documentary photograph, captioned plainly, with location and date, and no decoration.

---

## Components & UI Principles

- **Navigation:** wordmark (linking home) + Research, Journal, About, Studio, Contact text links. No mega-menus, no dropdowns.
- **Links:** styled as understated text (underline or accent color on hover), not buttons. Reserve button-styled elements for genuine actions (form submit, entering a section), not decorative CTAs.
- **Research and Journal listings:** editorial list/index layout (title, dek, meta), not card grids with shadows.
- **No decorative chrome:** no drop shadows, no gradients, no rounded "app" corners on content blocks. Hairline rules (`border` token) instead of boxes/cards to separate content.

---

## Motion

Minimal and purposeful only — subtle fades on scroll/entry at most. No parallax, no flashy transitions. Respect `prefers-reduced-motion` unconditionally.

---

## Accessibility

- Minimum WCAG AA contrast for all text/background pairs above (verify once final hex values are locked in, including the slate blue accent).
- Visible focus states using the `accent` token — never `outline: none` without a replacement.
- All motion gated behind `prefers-reduced-motion: no-preference`.

---

## Implementation Notes (for later, not now)

When component work begins, these tokens map onto Tailwind v4's CSS-first config via the `@theme` block already present in `website/src/app/globals.css` (extending `--color-background` / `--color-foreground`, adding `--color-muted`, `--color-border`, `--color-accent` (slate blue), and font variables for Newsreader / IBM Plex Sans). No code changes are being made as part of this document.
