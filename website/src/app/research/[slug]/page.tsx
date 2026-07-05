import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import {
  getResearchEntries,
  getResearchEntryBySlug,
  getResearchEntryNumber,
  STATUS_LABEL,
} from "@/lib/research";
import { formatDate } from "@/lib/date";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getResearchEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchEntryBySlug(slug);

  if (!entry) {
    return { title: "Research — Chyanne Robbins" };
  }

  return {
    title: `${entry.title} — Chyanne Robbins`,
    description: entry.dek,
  };
}

export default async function ResearchEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getResearchEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const number = getResearchEntryNumber(slug);

  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Link
          href="/research"
          className="inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          ← Research
        </Link>

        {number !== undefined && (
          <Eyebrow className="mt-10">
            {`Investigation ${String(number).padStart(3, "0")}`}
          </Eyebrow>
        )}

        <Heading
          as="h1"
          size="display"
          className={number !== undefined ? "mt-4 max-w-full sm:max-w-[26ch]" : "mt-10 max-w-full sm:max-w-[26ch]"}
        >
          {entry.title}
        </Heading>

        <p className="mt-6 max-w-[46ch] font-serif text-subhead italic text-foreground">
          {entry.researchQuestion}
        </p>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <Eyebrow>Themes</Eyebrow>
            <BodyText size="meta" tone="muted" className="mt-1">
              {entry.themes.join(" · ")}
            </BodyText>
          </div>
          <div>
            <Eyebrow>Format</Eyebrow>
            <BodyText size="meta" tone="muted" className="mt-1">
              {entry.formats.join(" · ")}
            </BodyText>
          </div>
          <div>
            <Eyebrow>Status</Eyebrow>
            <BodyText size="meta" tone="muted" className="mt-1">
              {STATUS_LABEL[entry.status]}
            </BodyText>
          </div>
          <div>
            <Eyebrow>Published</Eyebrow>
            <BodyText size="meta" tone="muted" className="mt-1">
              {formatDate(entry.publishedAt)}
            </BodyText>
          </div>
          {entry.updatedAt && entry.updatedAt !== entry.publishedAt && (
            <div>
              <Eyebrow>Updated</Eyebrow>
              <BodyText size="meta" tone="muted" className="mt-1">
                {formatDate(entry.updatedAt)}
              </BodyText>
            </div>
          )}
        </div>

        <Divider className="mt-12" />

        <DocumentaryImage
          src={entry.coverImage}
          alt={entry.title}
          aspectRatio="3/2"
          className="mt-12"
        />

        <Prose className="mt-12">
          <div
            className="investigation-body"
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        </Prose>
      </Section>
    </main>
  );
}
