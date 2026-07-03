// Field shape matches the "Content Model: Journal Entry" table in
// SITE-MAP.md exactly. Deliberately looser than ResearchEntry — no themes,
// no dek, no formats/status — per SITE-MAP's Structure Philosophy: Journal
// is "looser and more frequent than Research, and not structured around a
// research question."

export interface JournalEntry {
  title: string;
  slug: string;
  date: string;
  /** Field-note style location, e.g. "Austin, Texas". Optional — not every entry is placed. */
  location?: string;
  /** Often empty: not every entry is image-led (essays/reflections may be text-only). */
  images: string[];
  body: string[];
  /** Optional cross-link to a Research entry slug. */
  relatedResearch?: string;
}

/** Deliberately Lorem Ipsum — see the identical note in lib/research.ts. */
const SHORT_PLACEHOLDER: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
];

const LONG_PLACEHOLDER: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
];

/**
 * TEMPORARY placeholder data. The first entry's opening line — "Research is
 * how I make sense of the world." — is frozen copy from HOMEPAGE.md's "In
 * the Field" section; everything else, on every entry, is placeholder text
 * for layout purposes only. Entries deliberately span the range SITE-MAP.md
 * names for Journal (field note, travel, photography, reflection, essay)
 * with varying length and image presence, since the doc is explicit that
 * Journal entries "vary more than Research entries."
 */
const journalEntries: JournalEntry[] = [
  {
    title: "Research Is How I Make Sense of the World",
    slug: "in-the-field-austin",
    date: "2024-06-01",
    location: "Austin, Texas",
    images: ["placeholder"],
    body: [
      "Research is how I make sense of the world.",
      ...SHORT_PLACEHOLDER,
    ],
  },
  {
    title: "Notes on Waiting",
    slug: "notes-on-waiting",
    date: "2026-04-10",
    location: "Chicago, Illinois",
    images: [],
    body: SHORT_PLACEHOLDER,
  },
  {
    title: "Three Days in Lisbon",
    slug: "three-days-in-lisbon",
    date: "2026-02-20",
    location: "Lisbon, Portugal",
    images: ["placeholder"],
    body: SHORT_PLACEHOLDER,
  },
  {
    title: "Morning Light, West Ridge",
    slug: "morning-light-west-ridge",
    date: "2026-01-15",
    location: "Marfa, Texas",
    images: ["placeholder"],
    body: [SHORT_PLACEHOLDER[0]],
  },
  {
    title: "On Slowness",
    slug: "on-slowness",
    date: "2025-12-03",
    images: [],
    body: LONG_PLACEHOLDER,
    relatedResearch: "the-places-we-become",
  },
];

/** Newest first — same convention as getResearchEntries(). */
export function getJournalEntries(): JournalEntry[] {
  return [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}

/**
 * Journal has no authored dek (unlike Research), so the index derives a
 * short teaser from the entry's own opening line instead of inventing a new
 * content field.
 */
export function getExcerpt(paragraphs: string[], maxLength = 160): string {
  const [first] = paragraphs;
  if (!first) return "";
  if (first.length <= maxLength) return first;
  const truncated = first.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
