# Publishing Guide

**Status:** Living operational document — update this whenever the publishing mechanics themselves change. Unlike SITE-MAP.md / DESIGN-SYSTEM.md / HOMEPAGE.md, this is not frozen architecture; it's a runbook, and it should stay exactly accurate to the current code.

This is written for a future version of yourself who hasn't touched this project in months. It assumes nothing except that you can open a terminal.

---

## How content becomes a page

Every Research investigation and Journal entry is a single Markdown file with a YAML frontmatter header, living under `website/content/`. The site reads these files at build/render time — nothing about a page's title, dates, tags, or body text lives inside a React component. To publish something new, you add a file. You should never need to open a `.tsx` file to publish routine content.

The one standing exception is the **Home page** (`website/src/app/page.tsx`), which still hardcodes its Hero text and "Featured Investigation" block directly in the component. Home's "In the Field" section is the one dynamic exception to that exception — see "Featuring a Journal entry on Home," below. The rest is a known gap, not a pattern.

---

## Draft & Published status

Every entry — Research or Journal — has a `published` field in its frontmatter. This is what decides whether it's a draft or live, and it's the *only* thing that decides that.

```yaml
published: false   # draft — exists in the repo, invisible on the public site
published: true    # live — appears everywhere it belongs, automatically
```

**How it behaves:**

- `published: false` (or the field left out entirely — see below) means the entry is completely invisible on the public site: not on `/research` or `/journal`, and its own `/research/<slug>` or `/journal/<slug>` page 404s if visited directly. It still lives in `content/` and still works within the content system — you can keep editing it, gray-matter still parses it, `npm run build` still validates its frontmatter. It just doesn't render anywhere public.
- `published: true` makes it appear everywhere it belongs — the relevant index, its own detail page, and (for Research) as a candidate for Home's featured slot once that's wired up (see the `featured` caveat above) — with no other code changes. This is the mechanism that makes "flip one field, it appears everywhere" true.
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
caption: "Research is how I make sense of the world."
```

- **Only one entry should be `featured: true` at a time.** If more than one is, `getFeaturedJournalEntry()` doesn't error — it picks whichever is newest by `date` (same sort order as `getJournalEntries()`) — but treat having two featured entries as a mistake to fix, not a supported state.
- **If no entry is featured, Home fails gracefully.** The "In the Field" section simply doesn't render — no broken layout, no empty placeholder box, nothing. This is deliberate: a homepage with one fewer section is fine; a homepage with a visibly broken one isn't.
- `heroImage` is a **new, singular field**, distinct from the older `images` array. `heroImage` is the one field actually wired to display a real photo (via `DocumentaryImage`'s `src` prop) — see the Images section below for the important difference between this and `images`.
- `caption` has no fallback — if it's missing on the featured entry, the caption line renders empty. Always set it on whichever entry you feature.
- `title` and `excerpt` are **not** used by Home at all, even on the featured entry — Home only ever reads `heroImage`, `caption`, `location`, and `date`. `title`/`excerpt` are for the Journal pages themselves (see below).

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
3. Write the body in plain Markdown below the closing `---`. Paragraphs, emphasis, and links all render normally; nothing else is currently styled specially inside the body (see the note under Images/Body below if you're tempted to add headings or lists).
4. While `published: false`, the entry won't show up anywhere — not on `/research`, and its own `/research/<slug>` page 404s too, even locally. That's expected for a draft. To actually see the rendered page while you're still writing, temporarily set `published: true` in your local checkout, look, then set it back to `false` before committing.
5. When it's genuinely ready, set `published: true` for good, preview once more, commit, and push (see Git workflow, below).

> **Caveat:** setting `featured: true` does **not** currently make an entry appear on the Home page. Home's "Featured Investigation" section is hardcoded in `src/app/page.tsx` and has to be edited by hand. `featured` marks an entry as *intended* for that slot; making it actually show up is still a manual step.

---

## Creating a new Journal entry

1. Add `website/content/journal/<slug>.md`.
2. Fill in the frontmatter — only `title` and `date` are required. `location`, `images`, `heroImage`, `caption`, `excerpt`, and `relatedResearch` are all optional. Start with `published: false` and `featured: false` (see Draft & Published status, above, and Featuring a Journal entry on Home, below).
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
**Allowed formats:** concept study, article, prototype, product, service, collaboration.
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
caption: "A one-line caption, shown only if this entry is featured on Home."
excerpt: "An authored one- to two-sentence teaser for /journal's listing."
images:
  - placeholder
relatedResearch: the-places-we-become
---
```

Only `title` and `date` are required. Everything else — `location`, `images`, `heroImage`, `caption`, `excerpt`, `relatedResearch`, `published`, `featured` — may technically be omitted, but write `published: false` and `featured: false` explicitly anyway (see Draft & Published status and Featuring a Journal entry on Home, both above). `relatedResearch`, if set, must match an existing filename (without `.md`) under `content/research/` — it's how a Journal entry cross-links to a Research investigation (rendered as a "Related Research" link on the entry page).

- `heroImage` and `caption` only matter if this entry is `featured: true` — see above.
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
- **Never put layout or component logic inside a content file.** A Markdown file should read like plain writing with a data header on top — paragraphs, emphasis, links. Nothing else is currently rendered specially in the body, so don't reach for anything fancier than that without also updating the rendering pipeline (`lib/content.ts`) to support it deliberately.
- `lib/research.ts` and `lib/journal.ts` each define a TypeScript interface *and* a validation function for their frontmatter. These two are supposed to always agree — if you add a field to one, add it to the other in the same change.
- The `published` filter lives in exactly one place per content type: inside `getResearchEntries()`/`getResearchEntryBySlug()` and `getJournalEntries()`/`getJournalEntryBySlug()`. Every page — indexes, detail pages, cross-links — calls these same functions, so the filter applies everywhere automatically. Don't add a second, separate "is this published?" check anywhere else; if a new consumer needs published-only entries, it should call these functions, not reimplement the filter.
- The Home page's remaining hardcoded copy — the Hero and the "Featured Investigation" block — is the one deliberate exception left. "In the Field" no longer is (see Featuring a Journal entry on Home, above): it's the model for what the rest of Home should eventually become, not something to treat as permanent. If you wire the remaining sections up to `getResearchEntries()` directly, delete this paragraph.
