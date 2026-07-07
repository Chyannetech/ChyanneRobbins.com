import Link from "next/link";
import Section from "@/components/layout/Section";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import Caption from "@/components/media/Caption";
import { getFeaturedJournalEntry } from "@/lib/journal";
import { getFeaturedResearchEntry } from "@/lib/research";
import { formatDate } from "@/lib/date";

const DISCIPLINES = [
  "Behavioral Science",
  "Design",
  "Systems Thinking",
  "Technology",
  "Public Health",
];

export default function Home() {
  const featuredJournalEntry = getFeaturedJournalEntry();
  const featuredResearchEntry = getFeaturedResearchEntry();

  return (
    <main className="flex flex-col">
      {/* 1. Hero */}
      <Section spacing="large">
        <Eyebrow>Chyanne Robbins</Eyebrow>
        <BodyText size="body-lg" font="sans" tone="muted" className="mt-3 max-w-[40ch]">
          Exploring how people think, decide, and live.
        </BodyText>
        <Heading as="h1" size="display" className="mt-14 max-w-full sm:max-w-[20ch]">
          What shapes human experience?
        </Heading>
        <Link
          href="/research"
          className="mt-8 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Explore the Research
        </Link>
      </Section>

      {/* 2. In the Field — powered by the featured published Journal entry; omitted entirely if none exists. */}
      {featuredJournalEntry && (
        <Section>
          <Link href={`/journal/${featuredJournalEntry.slug}`} className="group block">
            <DocumentaryImage
              src={featuredJournalEntry.heroImage}
              alt={featuredJournalEntry.heroImageAlt ?? featuredJournalEntry.title}
              aspectRatio="3/2"
              objectPosition={featuredJournalEntry.heroImagePosition}
            />
            <Caption
              meta={[featuredJournalEntry.location, formatDate(featuredJournalEntry.date)]
                .filter(Boolean)
                .join(" • ")}
              textClassName="transition-colors group-hover:text-accent"
            >
              {featuredJournalEntry.caption}
            </Caption>
          </Link>
        </Section>
      )}

      {/* 3/4. Disciplines + Featured Investigation — Disciplines no longer stands
           as its own section (see HOMEPAGE.md's "Resolved since V1 freeze" note on
           this change). It's a quiet taxonomy/credibility signal, not a chapter with
           its own argument, so it now reads as the Featured Investigation's lead-in —
           generous space above (separating it from In the Field) and a tight mt-4
           below (grouping it with the investigation it introduces), with no divider
           and no heading. This is proximity doing the grouping work on its own, not
           a styling device — arrived at by testing spacing as the only variable. */}
      {featuredResearchEntry && (
        <Section>
          <Eyebrow>{DISCIPLINES.join(" · ")}</Eyebrow>
          <Link href={`/research/${featuredResearchEntry.slug}`} className="group mt-4 block">
            <Heading as="h2" size="subhead" className="transition-colors group-hover:text-accent">
              {featuredResearchEntry.title}
            </Heading>
            <BodyText size="meta" tone="muted" className="mt-4">
              {featuredResearchEntry.themes.join(" · ")}
            </BodyText>
          </Link>
        </Section>
      )}

      {/* 5. Why This Matters */}
      <Section>
        <Heading as="h2" size="title">
          Why This Matters
        </Heading>
        <Prose className="mt-6">
          The environments we design—digital and physical—quietly shape how
          people think, decide, connect, and live. By studying human
          experience through behavioral science, design, systems thinking,
          technology, and public health, this publication explores principles
          that can help create products, services, organizations, and spaces
          that better support the people they serve.
        </Prose>
        <Link
          href="/studio"
          className="mt-6 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Studio
        </Link>
      </Section>

      {/* 6. Closing quote — Home-specific editorial content, not part of the shared Footer. */}
      <Section spacing="large" className="text-center">
        <blockquote className="mx-auto max-w-[32ch] font-serif text-subhead italic text-foreground">
          &ldquo;Everything we create teaches people how to experience the
          world.&rdquo;
        </blockquote>
      </Section>
    </main>
  );
}
