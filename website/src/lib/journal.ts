import { readContentDirectory } from "./content";

interface JournalFrontmatter {
  /** Defaults to false (fail-closed) if omitted — see PUBLISHING.md's Draft & Published section. */
  published: boolean;
  /** Marks this as THE entry Home's "In the Field" section pulls from. Defaults to false. Only one entry should be featured at a time. */
  featured: boolean;
  title: string;
  date: string;
  /** Field-note style location, e.g. "Austin, Texas". Optional — not every entry is placed. */
  location?: string;
  /** Often empty: not every entry is image-led (essays/reflections may be text-only). */
  images: string[];
  /** Single hero photo path, wired to Home's featured display. Distinct from the legacy `images` array above, which is not yet wired to any real photo — see PUBLISHING.md. */
  heroImage?: string;
  /** CSS object-position for heroImage's crop, e.g. "center 20%". Omit to keep the default centered crop. */
  heroImagePosition?: string;
  /** Short caption shown alongside heroImage on Home. */
  caption?: string;
  /** Authored teaser. Falls back to an auto-derived excerpt (getExcerpt) when omitted, so older entries keep working unmodified. */
  excerpt?: string;
  /** Optional cross-link to a Research entry slug. */
  relatedResearch?: string;
}

export interface JournalEntry extends JournalFrontmatter {
  slug: string;
  /** Raw markdown source — used to derive the index excerpt. */
  body: string;
  /** Rendered HTML of the entry body. */
  bodyHtml: string;
}

const REQUIRED_FIELDS = ["title", "date"];

function validateJournalFrontmatter(
  data: Record<string, unknown>,
  filename: string,
): JournalFrontmatter {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined) {
      throw new Error(
        `content/journal/${filename}: missing required frontmatter field "${field}"`,
      );
    }
  }
  return {
    ...data,
    published: data.published === true,
    featured: data.featured === true,
    images: Array.isArray(data.images) ? (data.images as string[]) : [],
  } as JournalFrontmatter;
}

function getAllJournalEntries(): JournalEntry[] {
  return readContentDirectory<JournalFrontmatter>(
    "journal",
    validateJournalFrontmatter,
  ).map((file) => ({
    slug: file.slug,
    body: file.body,
    bodyHtml: file.bodyHtml,
    ...file.frontmatter,
  }));
}

/** Newest first, published only — same convention as getResearchEntries(). */
export function getJournalEntries(): JournalEntry[] {
  return getAllJournalEntries()
    .filter((entry) => entry.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return getAllJournalEntries()
    .filter((entry) => entry.published)
    .find((entry) => entry.slug === slug);
}

/**
 * The single published entry marked `featured: true` — this is what powers
 * Home's "In the Field" section. Only one entry is expected to be featured
 * at a time; if more than one is, the most recently dated wins (matching
 * getJournalEntries()' sort order) rather than erroring.
 */
export function getFeaturedJournalEntry(): JournalEntry | undefined {
  return getJournalEntries().find((entry) => entry.featured);
}

/**
 * Journal has no authored dek (unlike Research), so the index derives a
 * short teaser from the entry's own opening line instead of inventing a new
 * content field. Operates on the raw markdown body, not the rendered HTML,
 * so truncation never lands mid-tag.
 */
export function getExcerpt(markdown: string, maxLength = 160): string {
  const [firstParagraph] = markdown.trim().split(/\n\s*\n/);
  if (!firstParagraph) return "";
  const clean = firstParagraph.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
