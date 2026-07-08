# Site Map

**Status:** Version 1 — Frozen 2026-07-02

## Structure Philosophy

The publication has two primary content pillars, distinct in purpose and tone:

**Research** — formal concept studies and investigations. Each is its own body of work, drawing on behavioral science, design, systems thinking, technology, and public health simultaneously. Readers browse research entries primarily as investigations, not by discipline; themes are secondary metadata.

**Journal** — essays, observations, travel notes, reflections, and photography that document ongoing thinking outside of a formal investigation. Looser and more frequent than Research, and not structured around a research question.

Together, Research and Journal represent the two registers of the publication: formal inquiry and ongoing observation.

---

## Primary Navigation

- Home (`/`)
- Research (`/research`)
- Journal (`/journal`)
- About (`/about`)
- Studio (`/studio`)
- Contact (`/contact`)

---

## Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Opening spread, following the approved homepage mockup. See [HOMEPAGE.md](HOMEPAGE.md). |
| `/research` | Research index | The full archive of formal investigations, browsable primarily as a list of individual bodies of work. Themes available as secondary filters, not primary navigation. |
| `/research/[slug]` | Research entry | The full write-up of a single investigation: research question, body, themes, and any artifacts it has produced (article, prototype, product, service, collaboration). |
| `/journal` | Journal index | Essays, observations, travel notes, reflections, and photography — ongoing thinking outside formal investigations. |
| `/journal/[slug]` | Journal entry | A single journal post: essay, photo-led field note, or reflection. |
| `/about` | About | The publication's philosophy and mission in full, who is behind it, and why it exists. Serves the curious-reader audience. |
| `/studio` | Studio | A short editorial bridge, not a services page or a destination in itself. ChyanneRobbins.com is the publication; Chyless World Studio (an external site, not yet live — placeholder domain `chylessworld.com`) is where an investigation sometimes continues as a product, experience, technology, or collaboration. The page explains that relationship briefly, then links out with a single understated call-to-action. |
| `/contact` | Contact | A direct, utilitarian point of contact. Distinct from Studio, which is editorial in tone — Contact is simply how to get in touch. |
| `/research?theme=...` (or `/themes/[theme]`, TBD) | Theme filter | Secondary, optional. A filtered view of Research entries by theme (Behavioral Science, Design, Systems Thinking, Technology, Public Health). Not linked from primary nav. |

---

## Content Model: Research Entry

| Field | Type | Notes |
|---|---|---|
| `published` | boolean | Gates public visibility — unpublished entries are excluded from every public list and route, but keep parsing and working within the content system as drafts. Defaults to `false` (fail-closed) if omitted. See PUBLISHING.md. |
| `title` | string | The investigation's name. |
| `slug` | string | URL segment under `/research/`. |
| `researchQuestion` | string | The central question driving the investigation. Distinct from `title` — this is the editorial hook. |
| `dek` | string | One- to two-sentence summary, used on index/home/featured cards. |
| `themes` | string[] | Any of: Behavioral Science, Design, Systems Thinking, Technology, Public Health. Secondary metadata, not primary nav. |
| `formats` | string[] | A closed set — see PUBLISHING.md for the exact, current list. An investigation can accumulate more than one over time as it evolves. |
| `status` | enum | `ongoing` \| `concluded`. |
| `featured` | boolean | Whether eligible for the Home featured slot. Editorially set, not automatic. |
| `coverImage` | asset ref | Placed directly in `website/public/images/`. In practice, images haven't gone through a separate `assets/images/` staging step before this — see PUBLISHING.md. |
| `publishedAt` / `updatedAt` | date | |
| `body` | long-form content | The investigation itself. |

## Content Model: Journal Entry

| Field | Type | Notes |
|---|---|---|
| `published` | boolean | Same gating convention as Research. Defaults to `false` if omitted. See PUBLISHING.md. |
| `featured` | boolean | Marks the single entry Home's "In the Field" section pulls from. Defaults to `false`. Only one entry should be featured at a time. |
| `title` | string | |
| `slug` | string | URL segment under `/journal/`. |
| `date` | date | |
| `location` | string (optional) | For field-note style entries, e.g. "Austin, Texas." |
| `body` | content | Essay, observation, or reflection — length and structure vary more than Research entries. |
| `heroImage` | asset ref (optional) | The field wired to display a real photo, via `DocumentaryImage`, everywhere a Journal entry shows one — its own index and detail pages, and Home's featured display when the entry is featured. Unset renders a neutral placeholder, not an empty gap — same convention as Research's `coverImage`. |
| `heroImagePosition` | string (optional) | CSS `object-position` for `heroImage`'s crop, e.g. `"center 8%"`. Omit for the default centered crop. |
| `caption` | string (optional) | Shown alongside `heroImage` on Home when this entry is featured. |
| `excerpt` | string (optional) | Authored teaser for the index listing and meta description. Falls back to an excerpt auto-derived from the body's first paragraph when omitted. |
| `gallery` | `{ src, alt, aspectRatio, caption? }[]` (optional) | Renders as "From This Moment" after the essay ends — the remainder of the same observed moment already shown, never `heroImage` repeated. Empty or omitted renders nothing; no gallery chrome for a single photo either, it just displays like any other documentary image. See PUBLISHING.md and `components/media/Gallery.tsx`. Replaces the retired `images` field (see PUBLISHING.md's Images section). |
| `relatedResearch` | ref (optional) | Optional link to a Research entry this journal post relates to. |

The Home page's "In the Field" section (see [HOMEPAGE.md](HOMEPAGE.md)) draws on this model — a single image-led Journal entry with a caption and location/date.

---

## Open Questions

Still open:

- Does `/research` need pagination/sections at launch, or is a flat list sufficient given the site will start with very few entries?
- Is the theme filter a real route (`/themes/[theme]`) or a client-side filter on `/research`? Affects SEO/metadata treatment. Not yet built either way.

Resolved since V1 freeze:

- `/journal` is untagged — no `themes` field. Deliberate; see CONTENT-STANDARDS.md's Metadata expectations.
- `/contact` shipped as a `mailto:` link, not a form.
