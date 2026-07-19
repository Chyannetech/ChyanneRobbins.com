import { readContentDirectory } from "./content";

export type ResearchTheme =
  | "Behavioral Science"
  | "Design"
  | "Systems Thinking"
  | "Technology"
  | "Public Health";

/**
 * An ordered progression of concrete forms an investigation's thinking has
 * taken — not a genre label, and not independent of `status` (see
 * CONTENT-STANDARDS.md's Metadata expectations). `formats` accumulates
 * values over time rather than replacing them, as a piece produces new
 * forms — it never contains a value describing the Research section
 * itself (that was "Research Investigation," removed as circular: every
 * entry here is one by definition, so it never describes what a specific
 * entry has become).
 */
export type ResearchFormat =
  | "concept study"
  | "article"
  | "prototype"
  | "product"
  | "service"
  | "collaboration";

export type ResearchStatus = "ongoing" | "concluded";

export const STATUS_LABEL: Record<ResearchStatus, string> = {
  ongoing: "Ongoing",
  concluded: "Concluded",
};

interface ResearchFrontmatter {
  /** Defaults to false (fail-closed) if omitted — see PUBLISHING.md's Draft & Published section. */
  published: boolean;
  title: string;
  researchQuestion: string;
  dek: string;
  themes: ResearchTheme[];
  formats: ResearchFormat[];
  status: ResearchStatus;
  featured: boolean;
  /**
   * A single-sentence editorial observation — not a summary of `dek`, not an
   * argument for the working theory — used only by Home's "Currently
   * Investigating" section when this entry is featured. Mirrors Journal's
   * `heroImageAlt`/`caption` convention: optional here, but only meaningful
   * on whichever entry has `featured: true`. See PUBLISHING.md.
   */
  homeObservation?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface ResearchEntry extends ResearchFrontmatter {
  slug: string;
  /** Raw markdown source — not used for display, kept for consistency/future excerpting. */
  body: string;
  /** Rendered HTML of the investigation body. */
  bodyHtml: string;
}

const THEMES: ResearchTheme[] = [
  "Behavioral Science",
  "Design",
  "Systems Thinking",
  "Technology",
  "Public Health",
];
const FORMATS: ResearchFormat[] = [
  "concept study",
  "article",
  "prototype",
  "product",
  "service",
  "collaboration",
];
const STATUSES: ResearchStatus[] = ["ongoing", "concluded"];
const REQUIRED_FIELDS = [
  "title",
  "researchQuestion",
  "dek",
  "themes",
  "formats",
  "status",
  "featured",
  "publishedAt",
];

function validateResearchFrontmatter(
  data: Record<string, unknown>,
  filename: string,
): ResearchFrontmatter {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined) {
      throw new Error(
        `content/research/${filename}: missing required frontmatter field "${field}"`,
      );
    }
  }
  for (const theme of data.themes as string[]) {
    if (!THEMES.includes(theme as ResearchTheme)) {
      throw new Error(
        `content/research/${filename}: invalid theme "${theme}"`,
      );
    }
  }
  for (const format of data.formats as string[]) {
    if (!FORMATS.includes(format as ResearchFormat)) {
      throw new Error(
        `content/research/${filename}: invalid format "${format}"`,
      );
    }
  }
  if (!STATUSES.includes(data.status as ResearchStatus)) {
    throw new Error(
      `content/research/${filename}: invalid status "${data.status}"`,
    );
  }
  return {
    ...data,
    published: data.published === true,
  } as unknown as ResearchFrontmatter;
}

function getAllResearchEntries(): ResearchEntry[] {
  return readContentDirectory<ResearchFrontmatter>(
    "research",
    validateResearchFrontmatter,
  ).map((file) => ({
    slug: file.slug,
    body: file.body,
    bodyHtml: file.bodyHtml,
    ...file.frontmatter,
  }));
}

/**
 * Newest first, published only — the standard, easily-revisable default for
 * a public archive index. Drafts still parse and validate normally (see
 * getAllResearchEntries) so they keep working within the content system;
 * this is the one place that excludes them from anything public-facing.
 */
export function getResearchEntries(): ResearchEntry[] {
  return getAllResearchEntries()
    .filter((entry) => entry.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getResearchEntryBySlug(slug: string): ResearchEntry | undefined {
  return getAllResearchEntries()
    .filter((entry) => entry.published)
    .find((entry) => entry.slug === slug);
}

/**
 * The single published entry marked `featured: true` — powers Home's
 * "Featured Investigation" section. Mirrors getFeaturedJournalEntry(): only
 * one entry is expected to be featured at a time; if more than one is, the
 * most recently published wins (matching getResearchEntries()' sort order)
 * rather than erroring.
 */
export function getFeaturedResearchEntry(): ResearchEntry | undefined {
  return getResearchEntries().find((entry) => entry.featured);
}

/**
 * 1-indexed position among published entries, oldest first — "Investigation
 * 001" is the first one ever published, not whatever is newest (that's
 * getResearchEntries()'s order, used for the index page display, which is
 * deliberately the opposite direction). Returns undefined for an unpublished
 * or unknown slug, matching getResearchEntryBySlug().
 */
export function getResearchEntryNumber(slug: string): number | undefined {
  const chronological = [...getResearchEntries()].sort(
    (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
  );
  const index = chronological.findIndex((entry) => entry.slug === slug);
  return index === -1 ? undefined : index + 1;
}
