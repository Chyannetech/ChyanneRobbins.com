import { readContentDirectory } from "./content";

/**
 * One photo in a "From This Moment" gallery (see journal/[slug]/page.tsx) —
 * the remainder of the same observed moment the entry's essay and hero
 * image already established, shown only after the essay ends. Not evidence,
 * not an archive, not a portfolio — see the design reasoning this was built
 * from, preserved in project history.
 *
 * `aspectRatio` is required, not detected: this project has no build-time
 * image-dimension reading, and every other photo on the site (`coverImage`,
 * `heroImage`) already has its aspect ratio stated explicitly at the call
 * site rather than inferred from the file. Requiring it here just moves
 * that same existing convention into content instead of a hardcoded prop,
 * which a gallery needs — mixed horizontal and vertical photos can't share
 * one fixed ratio the way a single hero image can.
 *
 * `alt` is required (not optional-with-a-fallback like `heroImageAlt`,
 * which falls back to the entry title): there's no reasonable automatic
 * description for one photo among several, the way a title can loosely
 * stand in for a single hero image.
 */
export interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio: string;
  /** Optional — reuses the existing Caption component, archival-label style. */
  caption?: string;
}

interface JournalFrontmatter {
  /** Defaults to false (fail-closed) if omitted — see PUBLISHING.md's Draft & Published section. */
  published: boolean;
  /** Marks this as THE entry Home's "In the Field" section pulls from. Defaults to false. Only one entry should be featured at a time. */
  featured: boolean;
  title: string;
  date: string;
  /** Field-note style location, e.g. "Austin, Texas". Optional — not every entry is placed. */
  location?: string;
  /** Single hero photo path, wired to Home's featured display. */
  heroImage?: string;
  /** CSS object-position for heroImage's crop, e.g. "center 20%". Omit to keep the default centered crop. */
  heroImagePosition?: string;
  /**
   * A factual description of what the photo actually depicts — used as the
   * image's alt text on Home. Deliberately a separate field from `caption`:
   * `caption` is editorial voice (CONTENT-STANDARDS.md's Image philosophy
   * explicitly allows one evocative sentence there), which is the wrong
   * content for alt text — a screen-reader user needs to know what's in
   * the photo, not read a caption twice. Falls back to `title` if omitted,
   * which is still not a description, so set this explicitly on any
   * entry that gets featured.
   */
  heroImageAlt?: string;
  /** Short caption shown alongside heroImage on Home. */
  caption?: string;
  /** Authored teaser. Falls back to an auto-derived excerpt (getExcerpt) when omitted, so older entries keep working unmodified. */
  excerpt?: string;
  /**
   * "From This Moment" — shown after the essay ends (see
   * journal/[slug]/page.tsx), only when non-empty. Replaces the old
   * `images: string[]` field, which was legacy and unused (see
   * PUBLISHING.md's former Caveat) — retired outright rather than left
   * dormant alongside a second, working image list.
   */
  gallery: GalleryImage[];
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

const GALLERY_IMAGE_REQUIRED_FIELDS = ["src", "alt", "aspectRatio"] as const;

function validateGalleryImages(
  data: Record<string, unknown>,
  filename: string,
): GalleryImage[] {
  if (data.gallery === undefined) return [];
  if (!Array.isArray(data.gallery)) {
    throw new Error(`content/journal/${filename}: "gallery" must be an array`);
  }
  data.gallery.forEach((image: Record<string, unknown>, index: number) => {
    for (const field of GALLERY_IMAGE_REQUIRED_FIELDS) {
      if (!image[field]) {
        throw new Error(
          `content/journal/${filename}: gallery[${index}] missing required field "${field}"`,
        );
      }
    }
  });
  return data.gallery as GalleryImage[];
}

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
    gallery: validateGalleryImages(data, filename),
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
