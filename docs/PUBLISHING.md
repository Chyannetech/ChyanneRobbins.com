# Publishing Guide

**Status:** Living operational document — update this whenever the publishing mechanics themselves change. Unlike SITE-MAP.md / DESIGN-SYSTEM.md / HOMEPAGE.md, this is not frozen architecture; it's a runbook, and it should stay exactly accurate to the current code.

This is written for a future version of yourself who hasn't touched this project in months. It assumes nothing except that you can open a terminal.

---

## How content becomes a page

Every Research investigation and Journal entry is a single Markdown file with a YAML frontmatter header, living under `website/content/`. The site reads these files at build/render time — nothing about a page's title, dates, tags, or body text lives inside a React component. To publish something new, you add a file. You should never need to open a `.tsx` file to publish routine content.

The one standing exception is the **Home page** (`website/src/app/page.tsx`), which still hardcodes its Hero text, "In the Field" section, and "Featured Investigation" block directly in the component. That's a known gap, not a pattern — see the caveats below.

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
      in-the-field-austin.md
      notes-on-waiting.md
      ...
```

- One file per entry.
- **The filename is the URL slug.** `the-places-we-become.md` becomes `/research/the-places-we-become`. There is no separate `slug` field in frontmatter, and there shouldn't be — the filename is the single source of truth for a piece's URL. Rename the file to change the URL (see the naming-conventions note in CONTENT-STANDARDS.md before you do that on anything already published).
- Filenames are kebab-case: lowercase, hyphenated, no dates or numbers prefixed (the date lives in frontmatter).

---

## Creating a new Research investigation

1. Add `website/content/research/<slug>.md`.
2. Fill in the frontmatter (full schema below) — `title`, `researchQuestion`, `dek`, `themes`, `formats`, `status`, `featured`, and `publishedAt` are all required.
3. Write the body in plain Markdown below the closing `---`. Paragraphs, emphasis, and links all render normally; nothing else is currently styled specially inside the body (see the note under Images/Body below if you're tempted to add headings or lists).
4. Run the site locally (see Previewing, below) and check both `/research` and `/research/<slug>`.
5. Commit and push (see Git workflow, below).

> **Caveat:** setting `featured: true` does **not** currently make an entry appear on the Home page. Home's "Featured Investigation" section is hardcoded in `src/app/page.tsx` and has to be edited by hand. `featured` marks an entry as *intended* for that slot; making it actually show up is still a manual step.

---

## Creating a new Journal entry

1. Add `website/content/journal/<slug>.md`.
2. Fill in the frontmatter — only `title` and `date` are required. `location`, `images`, and `relatedResearch` are all optional.
3. Write the body in Markdown. **The opening paragraph doubles as the index teaser** — `getExcerpt()` in `lib/journal.ts` automatically pulls the first paragraph (truncated to ~160 characters) for `/journal`'s listing, since Journal has no separate authored summary field the way Research has `dek`. Write that first paragraph as a deliberate lede, not throwaway context.
4. Preview locally, commit, push.

---

## Required frontmatter

### Research

```yaml
---
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

Optional fields: `coverImage` (path under `public/`, see Images below), `updatedAt` (ISO date, shown alongside `publishedAt` when different).

**Allowed themes:** Behavioral Science, Design, Systems Thinking, Technology, Public Health.
**Allowed formats:** concept study, article, prototype, product, service, collaboration.
**Allowed status:** ongoing, concluded.

These lists are enforced at build time in `lib/research.ts` — an unrecognized value fails the build with an error naming the file and field. If you need a genuinely new theme or format, that's an information-architecture decision: update `THEMES`/`FORMATS` in `lib/research.ts` (and CONTENT-STANDARDS.md) deliberately, don't just type a new value into a frontmatter file and hope.

### Journal

```yaml
---
title: "Entry Title"
date: "2026-04-10"
location: "Austin, Texas"
images:
  - placeholder
relatedResearch: the-places-we-become
---
```

Only `title` and `date` are required. `location`, `images`, and `relatedResearch` may all be omitted. `relatedResearch`, if set, must match an existing filename (without `.md`) under `content/research/` — it's how a Journal entry cross-links to a Research investigation (rendered as a "Related Research" link on the entry page).

---

## Images

- The master image library lives at the project root, **`/assets/images/`** — original, unoptimized files. This folder predates the content system and is the source library for the whole site, not just this pipeline. Don't reorganize or delete from it casually.
- When a photo is actually needed on the site, place an **optimized copy** in `website/public/images/` (this folder doesn't exist yet — create it when the first real photo is ready).
- Reference it from frontmatter with a root-relative path, e.g. `coverImage: "/images/the-places-we-become.jpg"`.
- Until a real photo exists for a given entry, leave `coverImage` (Research) or `images` (Journal) unset or empty. `DocumentaryImage` renders a neutral placeholder in the correct footprint automatically — nothing looks broken in the meantime.

> **Caveat:** Research's `coverImage` is fully wired — set it to a real path and the photo renders on `/research/<slug>`. Journal's `images` field is **not** wired to display an actual photo yet. Right now it only acts as a boolean gate: `journal/page.tsx` and `journal/[slug]/page.tsx` check `images.length > 0` to decide whether to show an image placeholder at all, but never pass the array's contents through to `DocumentaryImage`'s `src` prop. So `images: ["/images/lisbon.jpg"]` reserves the image slot but still shows a placeholder box, not the photo. Wiring this up is future work — when you do it, update this paragraph.

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
- The Home page's hardcoded copy (see the caveats above) is the one deliberate exception to all of this. It's a known gap, not something to replicate elsewhere. If you ever wire Home up to read from `getResearchEntries()`/`getJournalEntries()` directly, delete this paragraph.
