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
| `/studio` | Studio | An invitation, not a services page. Explains how organizations can apply the thinking documented throughout the publication through the Creative Studio. Deliberately avoids agency/consulting language ("services we offer," "clients," "packages"). |
| `/contact` | Contact | A direct, utilitarian point of contact. Distinct from Studio, which is editorial in tone — Contact is simply how to get in touch. |
| `/research?theme=...` (or `/themes/[theme]`, TBD) | Theme filter | Secondary, optional. A filtered view of Research entries by theme (Behavioral Science, Design, Systems Thinking, Technology, Public Health). Not linked from primary nav. |

---

## Content Model: Research Entry

| Field | Type | Notes |
|---|---|---|
| `title` | string | The investigation's name. |
| `slug` | string | URL segment under `/research/`. |
| `researchQuestion` | string | The central question driving the investigation. Distinct from `title` — this is the editorial hook. |
| `dek` | string | One- to two-sentence summary, used on index/home/featured cards. |
| `themes` | string[] | Any of: Behavioral Science, Design, Systems Thinking, Technology, Public Health. Secondary metadata, not primary nav. |
| `formats` | string[] | Any of: concept study, article, prototype, product, service, collaboration — per the README's "Future Direction." An investigation can accumulate more than one over time as it evolves. |
| `status` | enum | `ongoing` \| `concluded`. |
| `featured` | boolean | Whether eligible for the Home featured slot. Editorially set, not automatic. |
| `coverImage` | asset ref | Sourced from `assets/images/`, optimized copy placed in `website/public/` when the page is built. |
| `publishedAt` / `updatedAt` | date | |
| `body` | long-form content | The investigation itself. |

## Content Model: Journal Entry

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `slug` | string | URL segment under `/journal/`. |
| `date` | date | |
| `location` | string (optional) | For field-note style entries, e.g. "Austin, Texas." |
| `body` | content | Essay, observation, or reflection — length and structure vary more than Research entries. |
| `images` | asset ref[] | Journal entries are often image-led. |
| `relatedResearch` | ref (optional) | Optional link to a Research entry this journal post relates to. |

The Home page's "In the Field" section (see [HOMEPAGE.md](HOMEPAGE.md)) draws on this model — a single image-led Journal entry with a caption and location/date.

---

## Open Questions

- Does `/research` need pagination/sections at launch, or is a flat list sufficient given the site will start with very few entries?
- Is the theme filter a real route (`/themes/[theme]`) or a client-side filter on `/research`? Affects SEO/metadata treatment.
- Does `/journal` share the same theme taxonomy as `/research`, or is it untagged/looser? Leaning toward looser, given Journal's informal purpose — not yet decided.
- Is `/contact` a simple mailto link or a form requiring its own submission handling? Implementation detail, not yet decided.
