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

Five sections, in this order (Disciplines is no longer independent — see section 3 and "Resolved since V1 freeze"):

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

### 3. Currently Investigating

**Superseded the Disciplines-led "Featured Investigation" card (2026-07-19).** The publication's first genuinely ongoing, multi-part investigation made it clear the old treatment — a taxonomy kicker plus a title, the whole block one implicit link — was answering "here's an entry from the archive," not "here's the question this publication is currently living with." This section now reads as a short editorial passage rather than an index-style card:

- Kicker: **Currently Investigating**
- Metadata: **Investigation 00N · Ongoing/Concluded** — reuses `getResearchEntryNumber`/`STATUS_LABEL` exactly as the detail page does, nothing duplicated by hand
- Title (now `headline` size, up from `subhead`)
- `dek`, in the same italic-serif treatment the detail page gives `researchQuestion`
- This investigation's own `themes` (e.g. Behavioral Science · Design · Technology) — deliberately the entry's specific themes, not the publication-wide five-discipline list the old version showed, since this section now introduces one investigation, not the publication's general lens
- `homeObservation`, the one new field this required — a single compressed Observation-register sentence, never a summary of `dek` and never an argument for the working theory. Not italic: CONTENT-STANDARDS.md reserves one moment of italic emphasis per piece, already spent on `dek`.
- An explicit CTA, **Explore the Investigation →**, reusing the site's existing accent-underline link convention

Because the section grew into an actual passage rather than a title-plus-tags card, the whole block is no longer one implicit link with title-only hover — navigation happens through the explicit CTA only, so a reader can read the passage without a stray click sending them somewhere.

**Content requirement:** pulled from the Research entry marked `featured: true`, exactly as before. `homeObservation` is optional on the content model (see SITE-MAP.md) but only meaningful on whichever entry is featured, mirroring how Journal's `heroImageAlt`/`caption` work. Renders nothing if no entry is featured, same as before.

### 4. Why This Matters

Bridges the research to organizations: explains how understanding human experience can inform better products, services, technology, organizations, and physical spaces. Communicates the practical value of the research beyond the publication itself.

**Content requirement:** likely links out to `/studio` for the fuller explanation of how this thinking is applied. Copy not yet drafted.

### 5. Footer

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

---

## Resolved since V1 freeze

- **Section 3 renamed "Field Notes" → "Disciplines."** The implementation had drifted from this document in two undocumented ways: section 3 rendered *before* section 2 rather than after, and was merged into it via a negative margin so one heading ("Field Notes") appeared to introduce both the disciplines list and the photograph. Neither change was ever recorded here. Investigating a naming collision (CONTENT-STANDARDS.md already uses "Field Notes" as a Research section-marker example, and it's used that way inside a published investigation) surfaced the drift. Resolved by restoring the two sections to their original order and independent spacing exactly as specified above, and renaming section 3 to "Disciplines" — a name that only describes the list, not the photo, which is also why the merge no longer made sense once the collision was fixed.

- **Disciplines is no longer its own section — it's now the lead-in to Featured Investigation (2026-07-07).** This was a deliberate design exploration, not drift: auditing the homepage's narrative flow found that Disciplines' informational content (the full five-discipline scope) was already stated completely in "Why This Matters" and partially in Featured Investigation's own tags, so its only genuinely unique contribution was a quiet taxonomy/credibility gesture — one that didn't need the same ceremony (independent heading, full section padding on both sides) as sections that actually reward dwelling. A round of visual prototyping tested divider treatments and then spacing alone as the only variable, and found that proximity — generous space above, a tight `mt-4` below, no divider, no heading — reads as the taxonomy introducing the investigation, without adding any new visual device. Structure: still a five-beat homepage in the same order (Hero, In the Field, Featured Investigation, Why This Matters, closing quote), just with Disciplines folded into Featured Investigation's section rather than standing independently between it and In the Field. If the featured Research entry is ever unset, the taxonomy line no longer renders on its own — an accepted consequence of tying it to the investigation it now introduces, not a separate decision.

- **Home's five sections now vary in width and pacing — "Varying Rooms" and "Tempo" (2026-07-07).** Previously every section used the same `wide` (1200px) width and the same default spacing on both sides, uniformly. This was explored and implemented as an environmental-design pass: proportion and rhythm, not color or decoration, doing the work of making the page feel authored. Width now follows content register — Hero and Why This Matters stay wide (open, addressing a broad audience); In the Field narrows to a new `narrow` (800px) `PageShell` token, since it's one specific photograph, not a hero image; Featured Investigation borrows `reading` width directly from the investigation it links to, so the preview foreshadows the register shift into long-form reading before the reader clicks through. Pacing was tightened between Featured Investigation and Why This Matters specifically — a negative margin (`-mt-16 sm:-mt-24`) cancels exactly one default Section padding, leaving a single shared gap (64px / 96px) instead of two independent ones stacked (previously 128px / 192px combined) — reflecting that these two sections are thematically continuous (the practice demonstrated, then why it matters) the same way Disciplines and Featured Investigation already were. Hero-to-Photo and Photo-to-Featured-Investigation pacing were deliberately left untouched — those are the two places a real pause (not a continuation) is still the right read. **Paper Weight — an additional, barely-perceptible background tone shift per section — was explored in parallel but deliberately paused, not rejected:** the reasoning behind Varying Rooms and Tempo is directly checkable (shorter line lengths at reading width, an image sized to its actual content, a proximity effect already confirmed elsewhere on this page), while Paper Weight's justification rests entirely on a subconscious atmospheric effect that hasn't been verified against real visitors yet. The plan is to live with proportion and rhythm alone first and revisit Paper Weight only if the page still needs another environmental layer once that's been felt over time — not to add it simply because a prototype for it already exists.

- **No dedicated "research-in-progress" mechanism (research log, version/stage marker, revision-history display) — deliberately not built, resolves the open question above about a volume/issue marker (2026-07-19).** Prompted by "Currently Investigating" feeling like a thoughtful publication without yet feeling like an *active* research practice, a real exploration considered two directions — surfacing an investigation's internal stage (e.g. "Working Theory — Version 0.1") and a homepage log of publish/revision activity across the archive — before stepping back to ask what any such mechanism would actually need to prove. The conclusion: credibility here has to come from *accumulation over time*, not from a fact about any single investigation's current condition — a single well-crafted entry can be made to look exactly as "in progress" as a genuinely raw one, so a mechanism built around one investigation's stage doesn't generalize across a growing archive the way a mechanism built around the archive's own growth would. But testing that sharper principle against the publication's actual current state (three investigations, November 2025 to July 2026, no revision history yet) led to the same judgment already reached once before in this project, for a different feature: EXPERIENCE-PRINCIPLES.md's Research theme-filter precedent — *"An elaborate filter system on a small archive can read as compensating for thinness rather than signaling substance... revisit only once linear browsing genuinely fails a reader, which is a size problem this archive doesn't have yet."* The same reasoning applies here. What's already on the page (`Investigation 00N · Ongoing`) is a small, true, already-existing fact, proportionate to a young practice; a dedicated mechanism built to *demonstrate* ongoing-ness would be manufacturing a feeling of scale the practice hasn't earned yet, closer to the marketing-chrome failure mode this project exists to avoid than to quiet confidence. Homepage is stable as of this decision. Revisit only once the archive's actual volume or revision history changes — a publishing question, not a design one — not on a fixed schedule and not by returning to this as a design exercise.
