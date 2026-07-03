// Field shape matches the "Content Model: Research Entry" table in
// SITE-MAP.md exactly, so a future CMS/MDX source can replace the array
// below without changing anything that consumes getResearchEntries().

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

export interface ResearchEntry {
  title: string;
  slug: string;
  researchQuestion: string;
  dek: string;
  themes: ResearchTheme[];
  formats: ResearchFormat[];
  status: ResearchStatus;
  featured: boolean;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  body?: string;
}

/**
 * TEMPORARY placeholder data. "The Places We Become" is the only entry with
 * frozen copy (its title and theme tags come from HOMEPAGE.md's Featured
 * Investigation section) — every other entry, and every dek/research
 * question here, is placeholder text for layout purposes only, not proposed
 * final content.
 */
const researchEntries: ResearchEntry[] = [
  {
    title: "The Places We Become",
    slug: "the-places-we-become",
    researchQuestion: "How do physical environments shape who we become?",
    dek: "A study of how the spaces we inhabit quietly shape identity, behavior, and belonging.",
    themes: ["Behavioral Science", "Design", "Systems Thinking"],
    formats: ["concept study"],
    status: "ongoing",
    featured: true,
    publishedAt: "2026-05-01",
  },
  {
    title: "Systems of Care",
    slug: "systems-of-care",
    researchQuestion:
      "Why do well-intentioned health systems still fail the people inside them?",
    dek: "Mapping the gaps between how care systems are designed and how people actually experience them.",
    themes: ["Systems Thinking", "Public Health"],
    formats: ["concept study"],
    status: "ongoing",
    featured: false,
    publishedAt: "2026-03-22",
  },
  {
    title: "Designing for Attention",
    slug: "designing-for-attention",
    researchQuestion:
      "What does it mean to design for someone's attention rather than against it?",
    dek: "An investigation into how digital products compete for — and sometimes erode — human attention.",
    themes: ["Design", "Technology"],
    formats: ["article"],
    status: "concluded",
    featured: false,
    publishedAt: "2026-02-14",
  },
  {
    title: "Invisible Infrastructure",
    slug: "invisible-infrastructure",
    researchQuestion:
      "What happens when the systems we depend on disappear from view?",
    dek: "A look at the infrastructure we no longer notice, and what happens when it breaks.",
    themes: ["Technology", "Systems Thinking"],
    formats: ["concept study"],
    status: "ongoing",
    featured: false,
    publishedAt: "2026-01-05",
  },
  {
    title: "The Architecture of Trust",
    slug: "the-architecture-of-trust",
    researchQuestion: "What makes a stranger feel safe enough to trust a system?",
    dek: "Examining the small design decisions that build — or quietly erode — trust between people and institutions.",
    themes: ["Behavioral Science", "Design"],
    formats: ["article"],
    status: "concluded",
    featured: false,
    publishedAt: "2025-11-08",
  },
];

/** Newest first — the standard, easily-revisable default for an archive index. */
export function getResearchEntries(): ResearchEntry[] {
  return [...researchEntries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
