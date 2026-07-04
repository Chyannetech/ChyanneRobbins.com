import { readContentDirectory } from "./content";

interface JournalFrontmatter {
  title: string;
  date: string;
  /** Field-note style location, e.g. "Austin, Texas". Optional — not every entry is placed. */
  location?: string;
  /** Often empty: not every entry is image-led (essays/reflections may be text-only). */
  images: string[];
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

/** Newest first — same convention as getResearchEntries(). */
export function getJournalEntries(): JournalEntry[] {
  return getAllJournalEntries().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return getAllJournalEntries().find((entry) => entry.slug === slug);
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
