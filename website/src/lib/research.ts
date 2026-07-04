import { readContentDirectory } from "./content";

export type ResearchTheme =
  | "Behavioral Science"
  | "Design"
  | "Systems Thinking"
  | "Technology"
  | "Public Health";

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
  title: string;
  researchQuestion: string;
  dek: string;
  themes: ResearchTheme[];
  formats: ResearchFormat[];
  status: ResearchStatus;
  featured: boolean;
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
  return data as unknown as ResearchFrontmatter;
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

/** Newest first — the standard, easily-revisable default for an archive index. */
export function getResearchEntries(): ResearchEntry[] {
  return getAllResearchEntries().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getResearchEntryBySlug(slug: string): ResearchEntry | undefined {
  return getAllResearchEntries().find((entry) => entry.slug === slug);
}
