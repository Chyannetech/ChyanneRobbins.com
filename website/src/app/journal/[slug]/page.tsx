import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
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

  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Link
          href="/journal"
          className="inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          ← Journal
        </Link>

        <DocumentaryImage
          src={entry.heroImage}
          alt={entry.title}
          aspectRatio="3/2"
          objectPosition={entry.heroImagePosition}
          className="mt-10"
        />

        <Eyebrow className="mt-10">{dateline}</Eyebrow>

        <Heading
          as="h1"
          size="display"
          className="mt-4 max-w-full sm:max-w-[26ch]"
        >
          {entry.title}
        </Heading>

        <Divider className="mt-12" />

        <Prose className="mt-12">
          <div
            className="journal-body space-y-6"
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        </Prose>

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
