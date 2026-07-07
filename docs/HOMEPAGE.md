# Homepage

**Status:** Version 1 — Frozen 2026-07-02

## Purpose

The homepage is the opening spread of an editorial publication — not a landing page, not a chronological feed. It follows the approved homepage mockup.

It should feel less like a website and more like a carefully designed reading environment: typography, photography, rhythm, pacing, and whitespace guide the experience, more than interface elements do. It should feel like the first pages of a documentary book or museum publication — an invitation into an evolving body of research, not a marketing page or a blog roll.

## What This Page Is Not

- Not a full chronological feed of every investigation (that's `/research`).
- Not a SaaS-style landing page — no feature grid, no stacked CTAs, no "Get Started" pattern. The Hero does include a single understated entry point into Research, styled as restrained text/button rather than a marketing CTA.
- Not a portfolio grid of thumbnails.
- Not an automatically-generated "latest posts" list — every element on this page is editorially chosen, not algorithmic.

---

## Structure

Six sections, in this order:

### 1. Hero

- Name: **Chyanne Robbins**
- Line: "Researching, designing, and documenting better human experiences."
- The central research question, presented editorially — large, serif, statement-like.
- A single entry point: **"Explore the Research"**, linking to `/research`.

**Content requirement:** the central research question is a site-level statement (not tied to a single investigation) — not yet drafted. See Open Questions.

### 2. In the Field

- A single documentary photograph.
- Caption: "Research is how I make sense of the world."
- Location and date, styled as metadata: "Austin, Texas • June 2024"

**Content requirement:** this section pulls a single image-led entry per the Journal content model in [SITE-MAP.md](SITE-MAP.md) (`title`, `date`, `location`, `images`, `body`/caption). Treat it as one specific, editorially chosen Journal entry — not a feed or rotation.

### 3. Disciplines

Introduces the disciplines informing the work — the lens through which the publication investigates human experience:

- Behavioral Science
- Design
- Systems Thinking
- Technology
- Public Health

**Content requirement:** this maps directly to the `themes` field on the Research content model in [SITE-MAP.md](SITE-MAP.md). Likely static content (the five disciplines don't change often), not pulled dynamically from investigation data.

### 4. Featured Investigation

**The Places We Become**

Tagged: Behavioral Science · Design · Systems Thinking

**Content requirement:** pulled from the Research entry marked `featured: true`. Links to `/research/[slug]`. Tags drawn from the official `themes` taxonomy defined in SITE-MAP.md — "Research" is the section name, not a taxonomy tag, and is not used as a tag here.

### 5. Why This Matters

Bridges the research to organizations: explains how understanding human experience can inform better products, services, technology, organizations, and physical spaces. Communicates the practical value of the research beyond the publication itself.

**Content requirement:** likely links out to `/studio` for the fuller explanation of how this thinking is applied. Copy not yet drafted.

### 6. Footer

Restores the editorial closing quote:

> "Everything we create teaches people how to experience the world."

Standard footer utility (nav links, contact) sits alongside this but isn't specified further here — that's an implementation detail, not an editorial one.

---

## Tone of Copy

Documentary, editorial voice, per [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). The Hero's use of "Chyanne Robbins" as a named byline resolves what was previously an open question: the voice is personal and first-person ("I"), not an anonymous publication voice ("this publication investigates...").

---

## Open Questions

- Exact copy for the central research question in the Hero — not yet written.
- Exact copy for "Why This Matters" — not yet written.
- Which specific photograph and Journal entry populate "In the Field" — not yet selected.
- Whether "Why This Matters" links directly to `/studio`, or stands alone.
- Whether the homepage carries any kind of issue/volume marker (reinforcing the "documentary book" framing) or stays undated.

---

## Resolved since V1 freeze

- **Section 3 renamed "Field Notes" → "Disciplines."** The implementation had drifted from this document in two undocumented ways: section 3 rendered *before* section 2 rather than after, and was merged into it via a negative margin so one heading ("Field Notes") appeared to introduce both the disciplines list and the photograph. Neither change was ever recorded here. Investigating a naming collision (CONTENT-STANDARDS.md already uses "Field Notes" as a Research section-marker example, and it's used that way inside a published investigation) surfaced the drift. Resolved by restoring the two sections to their original order and independent spacing exactly as specified above, and renaming section 3 to "Disciplines" — a name that only describes the list, not the photo, which is also why the merge no longer made sense once the collision was fixed.
