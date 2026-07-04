import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import { getJournalEntries, getExcerpt } from "@/lib/journal";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Journal — Chyanne Robbins",
  description:
    "Essays, observations, travel notes, reflections, and photography — ongoing thinking outside formal investigations.",
};

export default function JournalIndexPage() {
  const entries = getJournalEntries();

  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Heading as="h1" size="headline">
          Journal
        </Heading>

        <Divider className="mt-10" />

        <ul>
          {entries.map((entry, index) => (
            <li key={entry.slug}>
              {index > 0 && <Divider />}
              <Link href={`/journal/${entry.slug}`} className="group block py-8">
                {entry.heroImage && (
                  <DocumentaryImage
                    src={entry.heroImage}
                    alt={entry.title}
                    aspectRatio="3/2"
                    objectPosition={entry.heroImagePosition}
                    className="mb-6"
                  />
                )}
                <Heading
                  as="h2"
                  size="title"
                  className="transition-colors group-hover:text-accent"
                >
                  {entry.title}
                </Heading>
                <BodyText tone="muted" className="mt-3 max-w-[60ch]">
                  {entry.excerpt ?? getExcerpt(entry.body)}
                </BodyText>
                <BodyText size="meta" tone="muted" className="mt-4">
                  {[entry.location, formatDate(entry.date)]
                    .filter(Boolean)
                    .join(" · ")}
                </BodyText>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
