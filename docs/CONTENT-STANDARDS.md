# Content Standards

**Status:** Living editorial document — meant to evolve as judgment sharpens over years of publishing, unlike the frozen V1 architecture docs. If a standard here stops making sense in practice, update the standard deliberately; don't just quietly ignore it.

This document is about editorial judgment, not implementation. For folder structure, frontmatter fields, and the technical publishing workflow, see [PUBLISHING.md](PUBLISHING.md). This document exists so the publication still sounds like one coherent voice after years of intermittent writing, long gaps, and (eventually) other contributors.

---

## Research vs. Journal

The publication has two registers, and they are not a hierarchy — Journal is not "lesser" or "less finished" than Research. They're different modes of the same practice.

**Research** is formal, deliberate investigation. Each entry is its own body of work, built around a specific research question, and deliberately cross-disciplinary — it draws on behavioral science, design, systems thinking, technology, and public health simultaneously, not as separate silos to pick one from. A Research entry is structured: it has a research question, a one-sentence dek, themes, a format, a status.

**Journal** is looser and more frequent — essays, observations, travel notes, reflections, photography — and is *not* structured around a research question. A Journal entry doesn't need to justify itself with a formal question or a multi-disciplinary frame. A single observation, well-written, is enough.

**The practical test:** did you set out to answer a question, researching deliberately toward it — or did you notice something and want to write it down? The first is Research. The second is Journal. When something doesn't fit cleanly into either, that's a signal to think about *why*, not to force it into whichever category sounds closer — revisit SITE-MAP.md's Structure Philosophy before inventing a third category.

---

## Investigation Editorial System (Research only)

Every Research investigation should read like a page from a design research notebook or a museum publication's exhibition catalogue — closer to Kinfolk, Cereal, or an MIT Media Lab writeup than a blog post. This is a hierarchy shift, not a redesign: the same typography, content width, spacing scale, and navigation as everywhere else on the site. Nothing here applies to Journal, which stays plain paragraphs — this is specifically about how a formal investigation is structured on the page.

**The test for every decision in this system: if it calls attention to itself, it's too much.** No cards, borders, shadows, icons, colored boxes, timelines, or dashboard UI, ever. The hierarchy is built entirely from typography, spacing, alignment, and rhythm — restraint is the whole aesthetic, not a constraint on it.

**Investigation numbering.** Every published entry carries a quiet "Investigation 00N" label above its title — archival, not promotional. It's assigned automatically by publish order (see PUBLISHING.md), not chosen by the author; don't try to reserve or skip numbers.

**Section markers, not headings.** Structure the body with small, uppercase, muted labels — `Observation`, `Field Notes`, `Question`, `Interpretation`, `Open Questions`, or whatever genuinely fits the piece's own shape of thinking. These are written as ordinary Markdown headings (see PUBLISHING.md for the mechanics) but should never be styled or thought of as bold section titles — they're closer to labels on a museum object than headlines. There's no required set; invent the markers a given investigation actually needs, and don't force every investigation into the same five-part shape just because one used them.

**A research question is a prompt, not a pull quote.** When the central question resurfaces within the body (as opposed to the frontmatter `researchQuestion`, which already gets its own treatment at the top of the page), give it room to breathe — extra space above and below — and nothing else. Same size as the surrounding prose, no italics, no oversized type, no quotation marks implied by styling. It should read like a pause for reflection, not a marketing callout.

**Open Questions close the piece, unresolved.** Near the end, a section titled `Open Questions` lists what the investigation didn't answer — as a plain list, no bullets, no numbering, no icons. This is the clearest expression of "explored rather than concluded": the piece should end by admitting what it doesn't yet know, not by wrapping everything up neatly. Not every investigation needs one, but most should — a piece with no open questions reads as a claim that the thinking is finished, which is rarely true this early in a body of work.

---

## Voice and tone

- **First person, always.** The publication has a named author — this isn't an anonymous institutional voice. Write "I explored," not "this publication explores." (Settled explicitly when the Home page byline named Chyanne Robbins directly — see HOMEPAGE.md's Tone of Copy.)
- **Quiet confidence is a result, not a performance.** Don't describe the work as quiet, confident, documentary, or museum-like — that's design-critic language about the site, not writing for a reader. Restraint should show up in word choice and pacing, never as a claim the copy makes about itself.

  This exact mistake happened once already: an early draft of the About page described the *website* — "should feel like reading an editorial publication," "typography, spacing, photography... should take priority," "museum archive" — instead of describing the *publication's subject matter*. It had to be rewritten because visitors don't need to be told how the site was designed; they need to be told what it's about. If you notice a sentence explaining the site's own design philosophy to a reader, cut it. That belongs in DESIGN-SYSTEM.md, for collaborators, not on a page.

- **No agency or marketing register, anywhere.** No feature lists, no testimonials, no pricing, no stacked calls-to-action, no "services we offer." This was made explicit for the Studio and Contact pages, but it's a whole-site standard: if a sentence would be at home in a sales deck, rewrite it.

---

## Writing philosophy

- Every investigation begins with curiosity, not a thesis to defend. The goal is to explore an idea in the open, not to arrive already certain and explain the conclusion backward.
- Short, declarative sentences carry more weight here than qualifier-heavy ones. A single-sentence paragraph is a legitimate rhythm device — it's been used deliberately throughout the site (About: "Every investigation begins with curiosity — a question about why people think, feel, decide, connect, or live the way they do." stands alone on purpose). Don't "fix" a short paragraph by padding it.
- Each piece gets exactly one moment of italic emphasis for its defining statement — a research question, a thesis line, a relationship being explained (see Studio: "ChyanneRobbins.com is the publication. Chyless World Studio is where research becomes real-world practice."). If everything is emphasized, nothing is; reserve it for the one sentence a reader should leave remembering.

---

## Image philosophy and captions

- Documentary treatment throughout: full-bleed or generously margined, never a small thumbnail, never a card grid with drop shadows.
- One consistent visual grade across the whole site. A photograph from Marfa and a photograph from Lisbon should read as the same practice, not two different projects.
- Captions are archival-label style: small, sans-serif, muted, factual — what, where, when. They are not a place for cleverness or a second attempt at the body copy. ("Research is how I make sense of the world." / "Austin, Texas · June 2024" is the model: one plain sentence, one plain fact line.)
- Not every entry needs a photograph. A Journal reflection can be entirely text. Forcing an image onto a piece that doesn't want one is worse than leaving the space empty — see PUBLISHING.md for how an entry without a photo renders (a clean placeholder, not a broken layout).

---

## Metadata expectations

- Research's `themes` and `formats` vocabularies are closed sets (five themes, six formats — see PUBLISHING.md for the exact lists). Adding a new one is an information-architecture decision, not a copy decision on the fly — it changes how the whole archive can be browsed and filtered later. Update the code and this document together; don't let a new tag exist in one file and nowhere else.
- Journal is deliberately untagged. Resist adding a themes field to it "for consistency with Research" — the looseness is the point (this was an open question in SITE-MAP.md, resolved in this direction on purpose).
- `dek` (Research only) should be a genuine one-sentence summary a reader could act on — "do I want to read this?" — not a teaser that withholds the actual point to create curiosity. Editorial confidence means telling the reader plainly what the piece is about.
- `researchQuestion` should be an actual question, phrased as one, distinct from the title. It's the hook, not a restatement of the title in different words.

---

## Naming conventions

- Filenames are slugs: lowercase, hyphenated, no leading dates or numbers (`the-places-we-become.md`, not `2026-05-01-places.md`). The date belongs in frontmatter.
- Titles can be sentence case or title case by feel — check two or three recently published entries before deciding, and stay consistent within a single piece. Don't mix conventions within one title.
- Once a slug is published and could plausibly be linked to (from Home, from another entry's `relatedResearch`, from outside the site), treat it as permanent. There's no redirect mechanism yet, so renaming a published file's filename silently breaks whatever pointed to it. If a piece truly needs a new slug, either accept the broken link or add a redirect mechanism first — don't rename quietly.

---

## Editorial consistency as the publication grows

- Before making a structural judgment call this document doesn't cover, read the four frozen architecture documents — README.md, SITE-MAP.md, DESIGN-SYSTEM.md, HOMEPAGE.md. They're the record of decisions already made, and why, not just what.
- When something doesn't fit the existing categories, that's a prompt to think carefully, not to bend a category until it technically fits. A publication that adds new structure quietly, entry by entry, ends up with no structure at all.
- If a standard in this document stops matching how you actually want to write after some years away, change the document on purpose, in its own commit, with a reason — don't let practice and documentation quietly diverge.
