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

**The test for every decision in this system: if it calls attention to itself, it's too much.** No cards, borders, shadows, colored boxes, timelines, or dashboard UI, ever. The hierarchy is built entirely from typography, spacing, alignment, and rhythm — restraint is the whole aesthetic, not a constraint on it.

**One deliberate, narrow exception to "no icons": the collapse chevron.** Every investigation section is collapsed by default and expands on click — the section marker label is the click target, with a small (~12px) chevron beside it that rotates on expand. This is the one icon anywhere in the system, added on purpose after weighing it against the no-icons rule directly: it exists purely as a usability cue for an interaction that has no other way to read as "expandable," stays the same muted color as the label text, never grows, never gains a border or background, and is never used decoratively elsewhere. If you're tempted to add a second icon anywhere in this system reasoning "there's already one exception," that's the rule reasserting itself — don't.

**The first section opens by default; the rest are progressively disclosed.** A reader lands on the piece with one natural entry point already open — not an empty wall of collapsed labels, not the whole piece at once — and can scan every remaining section marker before deciding whether to expand it. This is why the title, research question, and metadata block above the sections all still render in full and always-visible: that's what makes a one-minute understanding possible without expanding anything.

**A reading-progress hairline, not a progress bar.** A 1–2px neutral (muted-gray, not accent-colored) line, fixed to the top of the viewport, tracks scroll position through the page. No percentage, no label, no chrome around it — the thinnest possible signal, not a UI element that asks to be looked at. Treat this one as experimental: it's a single, self-contained component with one call site, kept deliberately easy to delete outright if it doesn't earn its place.

**Reading time joins the metadata block.** Estimated from word count, shown alongside Themes/Format/Status/Published/Updated — not a replacement for any of them.

**Content before the first section marker renders always-visible.** If an investigation opens with a short lead-in before its first `##` heading, that text appears above the collapsible sections, never hidden — this is the mechanism for an "Overview"-style introduction, without requiring every investigation to have one.

**A section may have a short, optional intro beneath its label — most shouldn't.** It renders whether the section is open or closed, so its only job is helping a reader decide whether to expand: smaller than body text, sans (not the serif reading type), muted, editorial rather than instructional. Sections that tend to benefit — Open Questions, References, Related Reading, a "what's next" section — are the ones where a reader genuinely can't guess what's inside from the label alone. Sections that usually shouldn't have one — Observation, Interpretation, Field Notes — are exactly the ones where the label already sets the right expectation; an intro there just adds words between the reader and the writing. When in doubt, leave it out — this is the same restraint principle as everything else here, just applied to a new surface.

**Investigation numbering.** Every published entry carries a quiet "Investigation 00N" label above its title — archival, not promotional. It's assigned automatically by publish order (see PUBLISHING.md), not chosen by the author; don't try to reserve or skip numbers.

**Section markers, not headlines.** Structure the body with small, uppercase, muted labels — `Observation`, `Field Notes`, `Question`, `Interpretation`, `Open Questions`, or whatever genuinely fits the piece's own shape of thinking. These are written as ordinary Markdown headings (see PUBLISHING.md for the mechanics) and render as real `<h2>` elements — a section still has a genuine place in the page's heading outline for screen readers — but should never be styled or thought of as bold section titles the way that heading level usually implies; they're closer to labels on a museum object than headlines. There's no required set; invent the markers a given investigation actually needs, and don't force every investigation into the same five-part shape just because one used them.

**A research question is a prompt, not a pull quote.** When the central question resurfaces within the body (as opposed to the frontmatter `researchQuestion`, which already gets its own treatment at the top of the page), give it room to breathe — extra space above and below — and nothing else. Same size as the surrounding prose, no italics, no bold, no oversized type, no quotation marks implied by styling. It should read like a pause for reflection, not a marketing callout. (Enforced defensively in `globals.css` — `.investigation-body blockquote` neutralizes both italics and bold, since relying on editorial memory alone already let a bolded instance ship once.)

**Open Questions close the piece, unresolved.** Near the end, a section titled `Open Questions` lists what the investigation didn't answer — as a plain list, no bullets, no numbering, no icons. This is the clearest expression of "explored rather than concluded": the piece should end by admitting what it doesn't yet know, not by wrapping everything up neatly. Not every investigation needs one, but most should — a piece with no open questions reads as a claim that the thinking is finished, which is rarely true this early in a body of work.

---

## Voice and tone

- **First person, always.** The publication has a named author — this isn't an anonymous institutional voice. Write "I explored," not "this publication explores." (Settled explicitly when the Home page byline named Chyanne Robbins directly — see HOMEPAGE.md's Tone of Copy.)
- **Quiet confidence is a result, not a performance.** Don't describe the work as quiet, confident, documentary, or museum-like — that's design-critic language about the site, not writing for a reader. Restraint should show up in word choice and pacing, never as a claim the copy makes about itself.

  This exact mistake happened once already: an early draft of the About page described the *website* — "should feel like reading an editorial publication," "typography, spacing, photography... should take priority," "museum archive" — instead of describing the *publication's subject matter*. It had to be rewritten because visitors don't need to be told how the site was designed; they need to be told what it's about. If you notice a sentence explaining the site's own design philosophy to a reader, cut it. That belongs in DESIGN-SYSTEM.md, for collaborators, not on a page.

- **Documenting the investigation, not performing it.** Research writing should read like someone reporting an investigation, not performing expertise. Favor simple observations over elegant phrasing, clarity over rhetoric, genuine curiosity over dramatic framing, documenting the investigation over narrating it, and language that sounds naturally spoken by the author over language that sounds like a polished magazine essay. A useful test: if a sentence feels like it's trying to sound important, rewrite it until it simply reports what was actually observed, questioned, tested, or concluded. Field notes from a careful researcher, not an essay trying to persuade or impress. *(Added 2026-07-08, discovered while editing "The Conditions of Coexistence" — strengthening the investigation's reasoning had quietly pulled the prose toward a more literary, rehearsed register than the Journal entry that started it, even though nothing about the underlying investigation required that shift.)*
- **No agency or marketing register, anywhere.** No feature lists, no testimonials, no pricing, no stacked calls-to-action, no "services we offer." This was made explicit for the Studio and Contact pages, but it's a whole-site standard: if a sentence would be at home in a sales deck, rewrite it.
- **[BODY-OF-WORK.md](../body-of-work/BODY-OF-WORK.md) is internal, not public copy.** It's the governing philosophy for the whole project — the field of study, the knowledge pipeline, the Publishing Filter — written for whoever is deciding what to publish, not for a reader. Public pages (About, Studio, and anywhere else the publication describes itself) should communicate the *ideas* it contains without reproducing its structure, terminology, or framework verbatim — no stage names, no pipeline diagram, no citing "the Body of Work Test" by name. Same instinct as the rule above: a reader needs the thinking, not a citation of the document that organizes it.

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

- Research's `themes` and `formats` vocabularies are closed sets — see PUBLISHING.md for the exact, current lists (counts deliberately not repeated here, since a duplicated count is exactly the kind of detail that quietly drifts out of sync between documents). Adding a new one is an information-architecture decision, not a copy decision on the fly — it changes how the whole archive can be browsed and filtered later. Update the code and every doc that lists it together; don't let a new tag exist in one file and nowhere else.
- **`formats` records what an investigation has concretely become, not a genre and not a separate axis from its progress.** The vocabulary (`concept study`, `article`, `prototype`, `product`, `service`, `collaboration`) is an ordered progression, drawn directly from README.md's "Future Direction" — each step further from still-forming thinking and closer to a finished, external artifact. A value is earned by actually reaching that form, not by how polished the writing is: a piece still exploring an open question is a `concept study` even if it's beautifully written, and only becomes an `article` once it's reached a resting point as a standalone piece — which is why, in practice, `status: ongoing` entries should almost always be `concept study` and `status: concluded` entries `article`, not because the two fields are formally linked, but because that's what each status actually means. Because the field tracks accumulated real-world outcomes, a piece adds a new value as it produces one (a `concept study` that gets written up becomes `concept study` *and* `article`) rather than replacing the old one — it never regresses, and it never contains a value describing the Research section itself (an investigation is one by definition; that's not something a specific entry can "become").
- Journal is deliberately untagged. Resist adding a themes field to it "for consistency with Research" — the looseness is the point (this was an open question in SITE-MAP.md, resolved in this direction on purpose).
- `dek` (Research only) should be a genuine one-sentence summary a reader could act on — "do I want to read this?" — not a teaser that withholds the actual point to create curiosity. Editorial confidence means telling the reader plainly what the piece is about.
- `researchQuestion` should be an actual question, phrased as one, distinct from the title. It's the hook, not a restatement of the title in different words.

---

## Choosing a Format

Work through this whenever an investigation is first published, and again whenever it's substantially updated — `formats` describes what the piece has *become*, not what kind of writing it is, so the right answer can change as the real world moves even if not a word of the piece itself does.

Go through every row in order rather than stopping at the first match. A format never replaces an earlier one, so an investigation can — and, over time, usually will — collect more than one:

| Ask yourself... | Add this format |
|---|---|
| Is the investigation still forming — exploring a genuinely open question, not yet resolved? | `concept study` |
| Has it reached a resting point as a piece of writing complete on its own — even if the underlying question stays open? | `article` |
| Has it produced something concrete a reader could actually test, try, or use — not just read about? | `prototype` |
| Has it become a finished offering people can get, not a one-off experiment? | `product` |
| Has it become an ongoing service performed for or with others? | `service` |
| Has it resulted in work built together with another person or organization, credited as shared? | `collaboration` |

Almost every investigation answers "yes" to exactly one of the first two rows at launch, and "no" to the rest — which one usually follows directly from `status` (still `ongoing` means still forming, so `concept study`; `concluded` means it reached that resting point, so `article`), though the two fields aren't formally locked together, that's just what each one actually means. Answering "no" to every remaining row is the expected, common case, not a sign the framework is missing something: those rows exist for the minority of investigations that go on to grow into something built or practiced, almost always through Chyless World Studio.

When we publish or substantially revise an investigation together, work through this table and recommend the format(s) it now qualifies for, with the reasoning — don't require the taxonomy to be recalled from memory to make the call.

---

## Choosing Themes

`themes` represents the primary disciplines or domains of inquiry an investigation meaningfully draws from — not every subject it touches, and never a keyword for search or SEO. The test: would removing this theme mislead a reader about what field(s) of thinking actually produced this piece? If the connection is incidental rather than load-bearing, leave it off.

Unlike `formats`, this isn't a progression to work through in order — check every row independently and assign every one that's a genuine "yes." In practice that's usually two, sometimes three; if a piece seems to need four or more, that's a sign it's covering too much ground, not that it needs more tags:

| Ask yourself... | Add this theme |
|---|---|
| Does the investigation's reasoning turn on how people actually think, decide, or behave? | `Behavioral Science` |
| Is the investigation fundamentally about how something — a space, interface, service, or object — is shaped for how people perceive, use, or experience it? | `Design` |
| Is a digital tool, platform, or technical system the investigation's central subject, not just a detail mentioned in passing? | `Technology` |
| Does the investigation meaningfully concern population-level health, care systems, or well-being outcomes? | `Public Health` |
| Does the investigation's own method of reasoning depend on interconnected parts, feedback loops, or emergent behavior — not just a topic that happens to involve "a system"? | `Systems Thinking` |

**The last row is a different kind of question from the first four, on purpose.** The first four ask what the investigation is *about* — a subject-matter domain. Systems Thinking asks *how* it reasons — a method, not a topic. A piece can be about public health without being an exercise in systems thinking, even while using systems thinking as its lens on that subject. Assign it when that lens is genuinely how the piece thinks, not whenever a "system" gets mentioned.

When we publish or substantially revise an investigation together, work through this table and recommend the theme(s) it qualifies for, with the reasoning — don't require the taxonomy to be recalled from memory to make the call.

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
