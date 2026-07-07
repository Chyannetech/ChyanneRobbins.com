import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getResearchEntries } from "@/lib/research";
import { getJournalEntries } from "@/lib/journal";

// Static routes have no genuine "last modified" data of their own (they're
// not content-model-backed), so lastModified is deliberately omitted for
// them rather than stamped with a fabricated build-time date — only the
// content-backed routes below have a real date to report.
const STATIC_ROUTES = ["/", "/about", "/research", "/journal", "/studio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  // getResearchEntries()/getJournalEntries() already filter to published
  // only (PUBLISHING.md's fail-closed convention) — nothing unpublished can
  // leak into the public sitemap through this.
  const researchEntries: MetadataRoute.Sitemap = getResearchEntries().map((entry) => ({
    url: `${SITE_URL}/research/${entry.slug}`,
    lastModified: new Date(entry.updatedAt ?? entry.publishedAt),
  }));

  const journalEntries: MetadataRoute.Sitemap = getJournalEntries().map((entry) => ({
    url: `${SITE_URL}/journal/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  return [...staticEntries, ...researchEntries, ...journalEntries];
}
