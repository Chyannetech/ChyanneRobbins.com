# Publishing Guide

**Status:** Living operational document — update this whenever the publishing mechanics themselves change. Unlike SITE-MAP.md / DESIGN-SYSTEM.md / HOMEPAGE.md, this is not frozen architecture; it's a runbook, and it should stay exactly accurate to the current code.

This is written for a future version of yourself who hasn't touched this project in months. It assumes nothing except that you can open a terminal.

---

## How content becomes a page

Every Research investigation and Journal entry is a single Markdown file with a YAML frontmatter header, living under `website/content/`. The site reads these files at build/render time — nothing about a page's title, dates, tags, or body text lives inside a React component. To publish something new, you add a file. You should never need to open a `.tsx` file to publish routine content.

The one standing exception is the **Home page** (`website/src/app/page.tsx`), which still hardcodes its Hero text directly in the component. "In the Field" and "Featured Investigation" are both content-driven — see "Featuring a Journal entry on Home" and "Featuring a Research entry on Home," below. The Hero is the one remaining gap, not a pattern.

---

## Draft & Published status

Every entry — Research or Journal — has a `published` field in its frontmatter. This is what decides whether it's a draft or live, and it's the *only* thing that decides that.

```yaml
published: false   # draft — exists in the repo, invisible on the public site
published: true    # live — appears everywhere it belongs, automatically
```

**How it behaves:**

- `published: false` (or the field left out entirely — see below) means the entry is completely invisible on the public site: not on `/research` or `/journal`, and its own `/research/<slug>` or `/journal/<slug>` page 404s if visited directly. It still lives in `content/` and still works within the content system — you can keep editing it, gray-matter still parses it, `npm run build` still validates its frontmatter. It just doesn't render anywhere public.
- `published: true` makes it appear everywhere it belongs — the relevant index, its own detail page, and (for Research) as a candidate for Home's featured slot (see "Featuring a Research entry on Home," below) — with no other code changes. This is the mechanism that makes "flip one field, it appears everywhere" true.
- **The default is closed, not open.** If you forget the field entirely, the entry is treated as a draft (`published: false`) — never the reverse. This is deliberate: a half-finished file you're still drafting should never accidentally go live just because you haven't gotten to that line yet. Write `published: false` explicitly anyway, though — it makes the file self-documenting to anyone (including future you) who opens it without knowing the code's default.
- A **draft's cross-links disappear too, not just its own page.** If a Journal entry's `relatedResearch` points at a Research entry that's currently a draft, the "Related Research" link simply doesn't render — it fails closed the same way, rather than linking to something that then 404s.

**To publish something:** open its file, change `published: false` to `published: true`, preview locally, commit, push. That's the entire workflow — no other file needs to change.

---

## Featuring a Journal entry on Home

Home's "In the Field" section — the image, caption, and location/date near the top of the homepage — is powered entirely by a single Journal entry: whichever one has both `published: true` and `featured: true`. `getFeaturedJournalEntry()` in `lib/journal.ts` finds it; Home calls that function and renders whatever comes back. There is no other wiring and nothing else to configure.

```yaml
published: true
featured: true
location: "Austin, Texas"
heroImage: "/images/field-notes-austin.jpg"
heroImagePosition: "center 8%"
heroImageAlt: "Chyanne Robbins seated on a wicker bench against a wall of greenery lit by a neon Google sign, at a Google developer conference in Austin."
caption: "Research is how I make sense of the world."
```

- **Only one entry should be `featured: true` at a time.** If more than one is, `getFeaturedJournalEntry()` doesn't error — it picks whichever is newest by `date` (same sort order as `getJournalEntries()`) — but treat having two featured entries as a mistake to fix, not a supported state.
- **If no entry is featured, Home fails gracefully.** The "In the Field" section simply doesn't render — no broken layout, no empty placeholder box, nothing. This is deliberate: a homepage with one fewer section is fine; a homepage with a visibly broken one isn't.
- `heroImage` is a **new, singular field**, distinct from the older `images` array. `heroImage` is the one field actually wired to display a real photo (via `DocumentaryImage`'s `src` prop) — see the Images section below for the important difference between this and `images`.
- `heroImagePosition` is optional and only matters once `heroImage` is set. It's passed straight through as CSS `object-position` (via `DocumentaryImage`'s `objectPosition` prop) on the `object-cover`-cropped image. Omit it and the crop stays centered — today's default, unchanged for every entry that doesn't set it. Most hero photos won't need it; it exists for cases like a portrait-orientation photo forced into the section's landscape (3:2) box, where a centered crop cuts off something that matters (a sign, a face) and you need to shift the visible window up or down.
  - **The math is not intuitive — verify visually, don't just calculate.** Because the display box is a fixed aspect ratio and the source photo usually isn't, `object-fit: cover` always crops a *fixed amount* of the source (determined purely by the ratio mismatch); `object-position`'s percentage only decides *where* that fixed-size window sits, not how much is cropped. It's tempting to eyeball the source photo, estimate percentages, and compute where things should land — that estimate will likely be wrong, because it's very easy to misjudge exact proportions by eye. What actually worked for `field-notes-austin.md`: render the page, look at the actual crop, and adjust in small steps (`center top`, then `center 8%`, etc.) until both the sign and the face were comfortably in frame — three quick iterations, not one calculation.
  - Syntax is standard CSS `object-position`: two keywords (`center top`, `center bottom`) or `<horizontal> <vertical>` percentages (`center 8%` — meaning the horizontal axis stays centered, since there's usually nothing to gain from shifting it when the crop only trims top/bottom).
- `caption` has no fallback — if it's missing on the featured entry, the caption line renders empty. Always set it on whichever entry you feature.
- **`heroImageAlt` is the photo's alt text — a factual description of what it depicts, not a second caption.** It's a deliberately separate field from `caption`: `caption` is editorial voice (CONTENT-STANDARDS.md's Image philosophy explicitly allows one evocative sentence there), which is the wrong content for alt text — a screen-reader user needs to know what's actually in the photo, not hear the caption read out in place of a description. Falls back to `title` if omitted, which isn't a real description either, so set this explicitly on whichever entry you feature — don't rely on the fallback.
- `title` and `excerpt` are **not** used by Home at all, even on the featured entry — Home only ever reads `heroImage`, `heroImageAlt`, `caption`, `location`, and `date` (`title` only as `heroImageAlt`'s fallback). `title`/`excerpt` are for the Journal pages themselves (see below).

---

## Featuring a Research entry on Home

Home's "Featured Investigation" section — the title and themes line below "In the Field" — is powered entirely by a single Research entry: whichever one has both `published: true` and `featured: true`. `getFeaturedResearchEntry()` in `lib/research.ts` finds it; Home calls that function and renders whatever comes back, linking to that entry's own `/research/<slug>` page. There is no other wiring and nothing else to configure.

- **Only one entry should be `featured: true` at a time.** If more than one is, `getFeaturedResearchEntry()` doesn't error — it picks whichever is newest by `publishedAt` (same sort order as `getResearchEntries()`) — but treat having two featured entries as a mistake to fix, not a supported state.
- **If no entry is featured, Home fails gracefully.** The "Featured Investigation" section simply doesn't render — same convention as "In the Field," above.
- Home reads only `title` and `themes` from the featured entry — `dek`, `formats`, and everything else are for the Research index and detail pages (see below).

---

## Folder structure

```
website/
  content/
    research/
      the-places-we-become.md
      systems-of-care.md
      ...
    journal/
      field-notes-austin.md
      notes-on-waiting.md
      ...
```

- One file per entry.
- **The filename is the URL slug.** `the-places-we-become.md` becomes `/research/the-places-we-become`. There is no separate `slug` field in frontmatter, and there shouldn't be — the filename is the single source of truth for a piece's URL. Rename the file to change the URL (see the naming-conventions note in CONTENT-STANDARDS.md before you do that on anything already published).
- Filenames are kebab-case: lowercase, hyphenated, no dates or numbers prefixed (the date lives in frontmatter).

---

## Creating a new Research investigation

1. Add `website/content/research/<slug>.md`.
2. Fill in the frontmatter (full schema below) — `title`, `researchQuestion`, `dek`, `themes`, `formats`, `status`, `featured`, and `publishedAt` are all required. Start with `published: false` — it's not required, but write it explicitly (see Draft & Published status, above).
3. Write the body in Markdown below the closing `---` — see "Writing an investigation body," immediately below, for the section-marker/blockquote/list conventions Research uses.
4. While `published: false`, the entry won't show up anywhere — not on `/research`, and its own `/research/<slug>` page 404s too, even locally. That's expected for a draft. To actually see the rendered page while you're still writing, temporarily set `published: true` in your local checkout, look, then set it back to `false` before committing.
5. When it's genuinely ready, set `published: true` for good, preview once more, commit, and push (see Git workflow, below).

> Setting `featured: true` (alongside `published: true`) is what makes an entry eligible for Home's "Featured Investigation" slot — see "Featuring a Research entry on Home," above, for exactly how that's resolved.

---

## Writing an investigation body (Research only)

Research bodies use a small set of plain-Markdown conventions that render as the site's archival/notebook editorial system — see CONTENT-STANDARDS.md's "Investigation Editorial System" for the reasoning behind it. None of this applies to Journal; Journal bodies are always just plain paragraphs.

- **Section markers are collapsible sections.** Every top-level (`##`) heading — `## Observation`, `## Field Notes`, `## Question`, `## Interpretation`, `## Open Questions`, or whatever genuinely fits the piece — becomes its own section. The first section in the piece is expanded by default (a natural entry point); every section after it is collapsed until clicked. `lib/investigation-sections.ts`'s `getInvestigationSections()` splits the raw Markdown at each `##` line and renders each chunk independently; `components/interactive/CollapsibleSection.tsx` renders the label as a real `<h2>` wrapping the toggle button — small, uppercase, tracked, muted visually (a quiet label, not a bold heading), but a genuine heading in the page's outline for screen readers — plus a small chevron as the only expand/collapse affordance. There's no fixed required list of markers — use whatever segments the investigation into real stages of thinking. `###` and `####` inside a section render as real `<h3>`/`<h4>` elements too (nested correctly under that section's `<h2>`), just visually flat via the same `.investigation-body` CSS — they don't start a new collapsible section, only `##` does that.
- **Content before the first `##` heading is the lead-in.** `getInvestigationLead()` in the same file returns it separately, and it renders always-visible above the collapsible sections — this is the mechanism for an "Overview"-style introduction (CONTENT-STANDARDS.md) without requiring one. Leave it out entirely and nothing renders; there's no empty placeholder.
- **An optional intro beneath a section's heading.** Add a `---` on its own line inside a section; everything above it becomes a short intro that renders directly under that section's label, visible whether the section is open or closed — everything below the `---` is the normal collapsible body. Leave the `---` out (as every current section does) and the whole chunk is just the body, exactly as before this existed. Use this only where it genuinely helps a reader decide whether to expand (CONTENT-STANDARDS.md has examples of where it does and doesn't help) — most sections shouldn't have one. Renders in `.investigation-section-intro`: smaller, sans, muted — visually distinct from the serif reading type it introduces.
- **A research-question-style prompt.** Write it as a blockquote: `> What role do our environments play in shaping how we think, feel, and behave?`. It gets extra vertical breathing room and nothing else — same size and weight as body text, no border, no italics, no quotation styling. It's meant to read as a pause for reflection, not a pull quote.
- **Open Questions (or any list).** A normal Markdown bullet list (`- ...`). Renders with no bullet glyphs and no numbers — just quiet vertical spacing between items, like unresolved notes left in a notebook, not a UI checklist.

All of this is defined once, as plain CSS rules scoped to `.investigation-body` in `website/src/app/globals.css`. That class is now self-sufficient — it sets its own reading measure (68ch), serif font, and size/line-height, rather than depending on being wrapped by `<Prose>` — because it has to render independently inside every collapsible section's content, not just once around a single body div. The rules are deliberately plain CSS rather than Tailwind's `space-y-6` utility, so heading/blockquote/list margins don't end up fighting a second utility for the same `margin-top` property (the same cascade-order problem noted on `Heading`/`BodyText` — see the comment directly above that CSS block).

**Reading time** is computed automatically from word count (`lib/reading-time.ts`) and shown in the metadata block alongside Themes/Format/Status/Published — no frontmatter field, nothing to author.

### Investigation numbering

Every published Research entry gets an "Investigation 00N" label above its title, computed automatically by `getResearchEntryNumber()` in `lib/research.ts` — there's no frontmatter field for it, and there shouldn't be. The number is the entry's 1-indexed position among published entries sorted **oldest first** by `publishedAt` — the order things were actually published in, which is the opposite of `/research`'s own newest-first display order. Backdating a `publishedAt` value, or adding an older entry later, can shift another entry's number — that's expected, not a bug.

---

## Creating a new Journal entry

1. Add `website/content/journal/<slug>.md`.
2. Fill in the frontmatter — only `title` and `date` are required. `location`, `images`, `heroImage`, `heroImageAlt`, `caption`, `excerpt`, and `relatedResearch` are all optional. Start with `published: false` and `featured: false` (see Draft & Published status, above, and Featuring a Journal entry on Home, below).
3. Write the body in Markdown. If you don't set an authored `excerpt`, **the opening paragraph doubles as the index teaser** — `getExcerpt()` in `lib/journal.ts` automatically pulls the first paragraph (truncated to ~160 characters) for `/journal`'s listing. Write that first paragraph as a deliberate lede either way, since it may end up doing double duty.
4. Preview it the same way as a draft Research entry: temporarily flip `published: true` locally to see the rendered page, then flip it back until it's genuinely ready.
5. When it's ready, set `published: true` for good, commit, push. Only set `featured: true` if this entry should replace whatever's currently powering Home's "In the Field" section.

---

## Required frontmatter

### Research

```yaml
---
published: false
title: "Entry Title"
researchQuestion: "The single question driving the investigation."
dek: "One- to two-sentence summary — shown on /research and (manually) on Home."
themes:
  - Behavioral Science
  - Design
formats:
  - concept study
status: ongoing
featured: false
publishedAt: "2026-05-01"
---
```

Optional fields: `coverImage` (path under `public/`, see Images below), `updatedAt` (ISO date, shown alongside `publishedAt` when different). `published` is technically optional too (defaults to `false`), but always write it explicitly — see Draft & Published status, above.

**Allowed themes:** Behavioral Science, Design, Systems Thinking, Technology, Public Health.
**Allowed formats:** concept study, article, prototype, product, service, collaboration — an ordered progression of concrete forms an investigation's thinking can take, not a genre label. See CONTENT-STANDARDS.md's Metadata expectations for the editorial principle behind this field, and its "Choosing a Format" section for the decision process to use before picking a value.
**Allowed status:** ongoing, concluded.

These lists are enforced at build time in `lib/research.ts` — an unrecognized value fails the build with an error naming the file and field. If you need a genuinely new theme or format, that's an information-architecture decision: update `THEMES`/`FORMATS` in `lib/research.ts` (and CONTENT-STANDARDS.md) deliberately, don't just type a new value into a frontmatter file and hope.

### Journal

```yaml
---
published: false
featured: false
title: "Entry Title"
date: "2026-04-10"
location: "Austin, Texas"
heroImage: "/images/entry-title.jpg"
heroImagePosition: "center 8%"
heroImageAlt: "A factual description of what the photo depicts, shown only if this entry is featured on Home."
caption: "A one-line caption, shown only if this entry is featured on Home."
excerpt: "An authored one- to two-sentence teaser for /journal's listing."
images:
  - placeholder
relatedResearch: the-places-we-become
---
```

Only `title` and `date` are required. Everything else — `location`, `images`, `heroImage`, `heroImagePosition`, `heroImageAlt`, `caption`, `excerpt`, `relatedResearch`, `published`, `featured` — may technically be omitted, but write `published: false` and `featured: false` explicitly anyway (see Draft & Published status and Featuring a Journal entry on Home, both above). `relatedResearch`, if set, must match an existing filename (without `.md`) under `content/research/` — it's how a Journal entry cross-links to a Research investigation (rendered as a "Related Research" link on the entry page).

- `heroImage`, `heroImagePosition`, `heroImageAlt`, and `caption` only matter if this entry is `featured: true` — see above.
- `excerpt`, if set, overrides the auto-derived teaser on `/journal`'s listing (and in this page's own meta description) — see the "opening paragraph" note above. Older entries without `excerpt` keep working exactly as before; this field is purely additive.

---

## Images

- The master image library lives at the project root, **`/assets/images/`** — original, unoptimized files. This folder predates the content system and is the source library for the whole site, not just this pipeline. Don't reorganize or delete from it casually.
- When a photo is actually needed on the site, place an **optimized copy** in `website/public/images/` (this folder doesn't exist yet — create it when the first real photo is ready).
- Reference it from frontmatter with a root-relative path, e.g. `coverImage: "/images/the-places-we-become.jpg"`.
- Until a real photo exists for a given entry, leave `coverImage` (Research) / `heroImage` (Journal, if featured) / `images` (Journal) unset or empty. `DocumentaryImage` renders a neutral placeholder in the correct footprint automatically when `src` is unset — nothing looks broken in the meantime. **Never set one of these to a path that doesn't correspond to a real file in `public/`** — unlike an unset field, a broken path shows an actual broken image, because `next/image` only falls back gracefully when `src` is missing entirely, not when it 404s.

> **Caveat — three different image fields, three different states.** Research's `coverImage` is fully wired: set it to a real path and the photo renders on `/research/<slug>`. Journal's `heroImage` is *also* fully wired, but only feeds Home's "In the Field" section (see Featuring a Journal entry on Home, above) — it isn't used anywhere on the Journal pages themselves. Journal's older `images` array is **not** wired to display an actual photo at all. Right now it only acts as a boolean gate: `journal/page.tsx` and `journal/[slug]/page.tsx` check `images.length > 0` to decide whether to show an image placeholder at all, but never pass the array's contents through to `DocumentaryImage`'s `src` prop. So `images: ["/images/lisbon.jpg"]` reserves the image slot on the Journal entry's own page but still shows a placeholder box there, not the photo — even if that same entry's `heroImage` is correctly showing a real photo on Home. Wiring `images` up (or retiring it in favor of `heroImage` everywhere) is future work — when you do it, update this paragraph.

---

## Previewing changes locally

```
cd website
npm install     # only needed the first time, or after a dependency changes
npm run dev
```

Open `http://localhost:3000`. Check both the index page (`/research` or `/journal`) and the specific entry's own page.

`npm run build` reproduces the production build exactly, including frontmatter validation — run it before pushing if you're at all unsure about a new entry. It fails loudly, naming the offending file and field, rather than rendering something silently wrong.

`npm run lint` runs ESLint; there's no separate content linter.

---

## Git workflow

The repository is `github.com/Chyannetech/ChyanneRobbins.com`, a single `main` branch. There is no CI or deploy pipeline configured as of this writing — pushing to `main` does not automatically publish anything anywhere yet. If that changes later, update this section.

- Prefer separating content commits from code/architecture commits — e.g. `content: add research entry — Systems of Care` versus `fix: correct journal excerpt truncation`. Existing commit history in this repo reads as short, descriptive statements of what the commit builds or changes; keep that convention.
- Typical flow for a new entry:
  ```
  git add content/research/systems-of-care.md
  git commit -m "content: add research entry — Systems of Care"
  git push origin main
  ```
- Run `npm run build` locally before pushing content changes — it's the cheapest way to catch a frontmatter mistake before it's live.

---

## Keeping content and presentation separate

This is the whole point of Phase 3 — don't undo it by accident.

- **Never hardcode entry text** (titles, body copy, dates, tags) inside a `.tsx` file. If you're typing an investigation's title directly into a component, something's wrong — it belongs in a `.md` file.
- **Never put layout or component logic inside a content file.** A Markdown file should read like plain writing with a data header on top. Research bodies additionally carry editorial meaning through headings/blockquotes/lists (see "Writing an investigation body," above) — but that's CSS styling standard Markdown output, not new syntax to learn. Don't reach for anything fancier than standard Markdown without also updating the rendering pipeline (`lib/content.ts`) to support it deliberately.
- `lib/research.ts` and `lib/journal.ts` each define a TypeScript interface *and* a validation function for their frontmatter. These two are supposed to always agree — if you add a field to one, add it to the other in the same change.
- The `published` filter lives in exactly one place per content type: inside `getResearchEntries()`/`getResearchEntryBySlug()` and `getJournalEntries()`/`getJournalEntryBySlug()`. Every page — indexes, detail pages, cross-links — calls these same functions, so the filter applies everywhere automatically. Don't add a second, separate "is this published?" check anywhere else; if a new consumer needs published-only entries, it should call these functions, not reimplement the filter.
- The Home page's remaining hardcoded copy — the Hero's title and tagline — is the one deliberate exception left. "In the Field" and "Featured Investigation" no longer are (see Featuring a Journal entry on Home and Featuring a Research entry on Home, above): they're the model for what the Hero should eventually become, not something to treat as permanent.
