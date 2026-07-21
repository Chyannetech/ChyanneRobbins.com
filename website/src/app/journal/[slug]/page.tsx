import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import Gallery from "@/components/media/Gallery";
import ReadingProgress from "@/components/interactive/ReadingProgress";
import {
  getJournalEntries,
  getJournalEntryBySlug,
  getExcerpt,
} from "@/lib/journal";
import { getResearchEntryBySlug } from "@/lib/research";
import { formatDate } from "@/lib/date";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getJournalEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    return { title: "Journal — Chyanne Robbins" };
  }

  return {
    title: `${entry.title} — Chyanne Robbins`,
    description: entry.excerpt ?? getExcerpt(entry.body),
    alternates: { canonical: `/journal/${slug}` },
  };
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const dateline = [entry.location, formatDate(entry.date)]
    .filter(Boolean)
    .join(" · ");
  const relatedResearch = entry.relatedResearch
    ? getResearchEntryBySlug(entry.relatedResearch)
    : undefined;

  const heroRatio = entry.heroImageAspectRatio ?? "3/2";
  const [heroRatioWidth, heroRatioHeight] = heroRatio.split("/").map(Number);
  const isPortraitHero = heroRatioWidth < heroRatioHeight;
  // Prototype (see lib/journal.ts): only meaningful for a portrait hero.
  // Everything else on this page — landscape entries, and portrait entries
  // that don't opt in — renders exactly as it did before this existed.
  const useFloatLayout = isPortraitHero && entry.heroImageLayout === "float";
  const heroImageAlt = entry.heroImageAlt ?? entry.title;

  const heroImage = entry.heroImage && (
    <DocumentaryImage
      src={entry.heroImage}
      alt={heroImageAlt}
      aspectRatio={heroRatio}
      objectPosition={entry.heroImagePosition}
      className={
        isPortraitHero
          ? `mt-10 max-w-[68ch] ${useFloatLayout ? "sm:hidden" : ""}`
          : "mt-10"
      }
    />
  );

  // Desktop-only alternative to the block above: the photo floats beside
  // the opening paragraphs inside Prose instead of sitting as its own block
  // between the title and the divider, so text wraps around it. Mobile
  // always gets the ordinary stacked block above, unchanged.
  const heroImageFloat = useFloatLayout && entry.heroImage && (
    <DocumentaryImage
      src={entry.heroImage}
      alt={heroImageAlt}
      aspectRatio={heroRatio}
      objectPosition={entry.heroImagePosition}
      className="hidden sm:float-right sm:mb-6 sm:ml-8 sm:block sm:w-[42%]"
    />
  );

  return (
    <main className="flex flex-col">
      <ReadingProgress />

      <Section spacing="large">
        <Link
          href="/journal"
          className="inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          ← Journal
        </Link>

        {!isPortraitHero && heroImage}

        <Eyebrow className="mt-10">{dateline}</Eyebrow>

        <Heading
          as="h1"
          size="display"
          className="mt-4 max-w-full sm:max-w-[26ch]"
        >
          {entry.title}
        </Heading>

        {isPortraitHero && heroImage}

        <Divider className="mt-12" />

        <Prose className="mt-12">
          {heroImageFloat}
          <div
            className="journal-body space-y-6"
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        </Prose>

        {/* "From This Moment" only appears once the essay is completely
             finished — never interleaved with it — and never repeats
             heroImage, which already had its own full treatment above. Same
             Divider + Eyebrow pattern Related Research already uses directly
             below, rather than a new way of introducing a section. */}
        {entry.gallery.length > 0 && (
          <>
            <Divider className="mt-12" />
            <Eyebrow className="mt-12">From This Moment</Eyebrow>
            <Gallery images={entry.gallery} className="mt-3" />
          </>
        )}

        {relatedResearch && (
          <>
            <Divider className="mt-12" />
            <Eyebrow className="mt-12">Related Research</Eyebrow>
            <Link href={`/research/${relatedResearch.slug}`} className="group mt-3 block">
              <Heading
                as="h2"
                size="title"
                className="transition-colors group-hover:text-accent"
              >
                {relatedResearch.title}
              </Heading>
            </Link>
          </>
        )}
      </Section>
    </main>
  );
}
