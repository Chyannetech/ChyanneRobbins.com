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

      {/* 2. Field Notes — introduces the disciplines lens; sits directly above the featured Journal entry so it reads as that section's heading */}
      <Section>
        <Heading as="h2" size="title">
          Field Notes
        </Heading>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {DISCIPLINES.map((discipline) => (
            <li key={discipline}>
              <BodyText size="meta" tone="muted">
                {discipline}
              </BodyText>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. In the Field — powered by the featured published Journal entry; omitted entirely if none exists.
           Negative top margin (matching Section's own default py value) pulls this ~50% closer to
           Field Notes above, so the two read as one introduced section rather than separate ones. */}
      {featuredJournalEntry && (
        <Section className="-mt-16 sm:-mt-24">
          <Link href={`/journal/${featuredJournalEntry.slug}`} className="block">
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
            >
              {featuredJournalEntry.caption}
            </Caption>
          </Link>
        </Section>
      )}

      {/* 4. Featured Investigation — powered by the featured published Research entry; omitted entirely if none exists. */}
      {featuredResearchEntry && (
        <Section>
          <Link href={`/research/${featuredResearchEntry.slug}`} className="group block">
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
