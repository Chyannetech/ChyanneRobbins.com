import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import Caption from "@/components/media/Caption";
import { getFeaturedJournalEntry } from "@/lib/journal";
import {
  getFeaturedResearchEntry,
  getResearchEntryNumber,
} from "@/lib/research";
import { formatDate } from "@/lib/date";
import { CHYLESS_WORLD_URL } from "@/lib/site";

// Root layout's metadata already provides this title/description as the
// default; declared explicitly here (rather than left inherited) only so
// this page can set its own canonical URL, per every other route.
export const metadata: Metadata = {
  title: "Chyanne Robbins",
  description:
    "ChyanneRobbins.com is an independent research publication documenting investigations into human experience.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const featuredJournalEntry = getFeaturedJournalEntry();
  const featuredResearchEntry = getFeaturedResearchEntry();
  // getResearchEntryNumber can return undefined per its own signature (see
  // lib/research.ts) — guarded the same way the detail page already guards
  // it, rather than passing it straight into String().padStart() unguarded.
  const investigationNumber = featuredResearchEntry
    ? getResearchEntryNumber(featuredResearchEntry.slug)
    : undefined;

  return (
    <main className="flex flex-col">
      {/* 1. Hero */}
      <Section spacing="large">
        {/* mt-8 (not the usual mt-3 tight-label spacing) is deliberate: enough
             room that the byline reads as its own authorial beat rather than
             the first line of the tagline beneath it — same typography and
             color as any other Eyebrow, no new visual vocabulary. See
             DESIGN-SYSTEM.md's Layout & Grid section on proximity as a
             grouping/distinction tool. */}
        <Eyebrow>Chyanne Robbins</Eyebrow>
        <BodyText size="body-lg" font="sans" tone="muted" className="mt-8 max-w-[42ch]">
          An ongoing study of the conditions that shape how people think, feel, decide, and act.
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

      {/* 2. In the Field — powered by the featured published Journal entry; omitted entirely if none exists.
           width="narrow" (800px, not the usual 1200px wide) is deliberate: this is
           one specific, personal photograph, not a full-bleed hero image, and the
           narrower frame matches its actual scale rather than a "wide" section's
           full-width authority. See DESIGN-SYSTEM.md's Layout & Grid section on
           proportion as an environmental/rhythm device (Varying Rooms).

           The -mt-8 sm:-mt-12 trims this section's own top padding modestly —
           not Hero's bottom spacing, which stays untouched because it's doing
           separate work as the page's opening bookend (matching the closing
           quote's equally generous spacing). Hero and Photo are still a real
           pause, not an introduction — this only reduces the redundant stacking
           at this one transition, since tightening gaps elsewhere on the page
           made this unchanged gap read as disproportionately large by contrast. */}
      {featuredJournalEntry && (
        <Section width="narrow" className="-mt-8 sm:-mt-12">
          <Link href={`/journal/${featuredJournalEntry.slug}`} className="group block">
            {/* Editorial header — this is the "first field observation" that
                 follows the site's central question. Title
                 uses Heading's "title" size (not "subhead", which Featured
                 Investigation uses) to stay the quieter of the two: this is
                 a photograph with editorial framing, not a second investigation
                 preview competing for the same weight. */}
            <Eyebrow>From the Journal</Eyebrow>
            <Heading
              as="h2"
              size="title"
              className="mt-4 transition-colors group-hover:text-accent"
            >
              {featuredJournalEntry.title}
            </Heading>
            <BodyText size="meta" tone="muted" className="mt-2">
              {formatDate(featuredJournalEntry.date)}
            </BodyText>
            <DocumentaryImage
              src={featuredJournalEntry.heroImage}
              alt={featuredJournalEntry.heroImageAlt ?? featuredJournalEntry.title}
              aspectRatio="3/2"
              objectPosition={featuredJournalEntry.heroImagePosition}
              className="mt-6"
            />
            {/* No date here — the editorial header above the image already
                 establishes it; repeating it in this caption would duplicate
                 the same date twice in one block. Location (if any) still
                 belongs here, since it's photo-caption metadata, not a
                 second publication date. */}
            <Caption
              meta={featuredJournalEntry.location}
              textClassName="transition-colors group-hover:text-accent"
            >
              {featuredJournalEntry.caption}
            </Caption>
          </Link>
        </Section>
      )}

      {/* 3/4. Currently Investigating — rethought from first principles
           (2026-07-20) after living with the metadata-heavy version: three
           stacked label/meta lines (kicker, investigation number + status,
           themes) around one title is the structural signature of a content
           card, independent of borders or backgrounds. Cut to a single
           quiet number and one continuous passage instead:

           - "Currently Investigating" (the kicker) and "· Ongoing" (the
             status word) were saying the same thing twice in two registers.
             The sequencing work elsewhere on this page already teaches "this
             is live, ongoing work" through position, making the literal
             label less necessary than when it was first added. Only the
             number survives — it's the one element doing unique work
             (implying a series) that nothing else on the page does.
           - `themes` is removed entirely, not just shrunk. It's a
             classification signal ("lenses, not labels") that belongs to
             Architecture 1 (the Research page), not to the homepage's
             expression of the practice as lived experience.
           - `dek` and `homeObservation` are merged into one passage instead
             of two stacked fields — descriptive framing (not first person,
             a deliberate exception: a dek functions like a book's subtitle)
             turning into first-person observation mid-passage, mirroring
             how the investigation's own file is actually structured.
           See docs/HOMEPAGE.md and PUBLISHING.md. */}
      {featuredResearchEntry && (
        <Section width="reading">
          {investigationNumber !== undefined && (
            <BodyText size="meta" tone="muted">
              {`Investigation ${String(investigationNumber).padStart(3, "0")}`}
            </BodyText>
          )}
          <Heading as="h2" size="headline" className="mt-2">
            {featuredResearchEntry.title}
          </Heading>
          <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-foreground">
            <em className="italic">{featuredResearchEntry.dek}</em>{" "}
            {featuredResearchEntry.homeObservation}
          </p>
          <Link
            href={`/research/${featuredResearchEntry.slug}`}
            className="mt-6 inline-block font-sans text-body text-accent underline underline-offset-4"
          >
            Explore the Investigation →
          </Link>
        </Section>
      )}

      {/* 5. From Observation to Application — width="narrow" (800px, not "wide")
           gives this section the same width as In the Field, so the page's
           proportion sequence reads as Hero(wide) → Photo(narrow) → Currently
           Investigating(reading) → From Observation to Application(narrow) →
           Quote. The "broad address" idea isn't lost — it's carried by the
           copy itself ("organizations," "products," "services"), not by the
           container.

           Pacing (2026-07-20): the negative margin that used to compress this
           gap was removed. That compression modeled Featured Investigation →
           Why This Matters as a loosely-related pair (like Disciplines'
           tight introduction into the investigation above it), but Concept 3's
           even, essay-like rhythm treats every stage of Question → Observation
           → Investigation → Application as comparable movements of one
           continuous piece, not a hierarchy of tightly- vs loosely-coupled
           pairs. Removing the override restores this gap to a plain default
           double-stack, which lands at the same value Photo → Investigation
           already uses — consistency achieved by deleting an exception, not
           adding a new number. See docs/HOMEPAGE.md. */}
      <Section width="narrow">
        <Heading as="h2" size="title">
          From Observation to Application
        </Heading>
        <Prose className="mt-6 space-y-6">
          <p>
            The goal isn&apos;t simply to understand the world more clearly.
            It&apos;s to use those insights to design better products,
            services, organizations, technologies, and experiences.
          </p>
        </Prose>
        <Link
          href={CHYLESS_WORLD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Explore Chyless World →<span className="sr-only"> (opens in a new tab)</span>
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
