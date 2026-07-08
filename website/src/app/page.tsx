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
import { getFeaturedResearchEntry } from "@/lib/research";
import { formatDate } from "@/lib/date";

// Root layout's metadata already provides this title/description as the
// default; declared explicitly here (rather than left inherited) only so
// this page can set its own canonical URL, per every other route.
export const metadata: Metadata = {
  title: "Chyanne Robbins",
  description:
    "ChyanneRobbins.com is an independent research publication documenting investigations into human experience.",
  alternates: { canonical: "/" },
};

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
        {/* mt-8 (not the usual mt-3 tight-label spacing) is deliberate: enough
             room that the byline reads as its own authorial beat rather than
             the first line of the tagline beneath it — same typography and
             color as any other Eyebrow, no new visual vocabulary. See
             DESIGN-SYSTEM.md's Layout & Grid section on proximity as a
             grouping/distinction tool. */}
        <Eyebrow>Chyanne Robbins</Eyebrow>
        <BodyText size="body-lg" font="sans" tone="muted" className="mt-8 max-w-[40ch]">
          Studying the conditions that shape how people think, feel, decide, and act.
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
            {/* Editorial header, mirroring Featured Investigation's own
                 kicker-plus-title pattern below — this is the "first field
                 observation" that follows the site's central question, so it
                 borrows that same construction rather than a new one. Title
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

      {/* 3/4. Disciplines + Featured Investigation — Disciplines no longer stands
           as its own section (see HOMEPAGE.md's "Resolved since V1 freeze" note on
           this change). It's a quiet taxonomy/credibility signal, not a chapter with
           its own argument, so it now reads as the Featured Investigation's lead-in —
           generous space above (separating it from In the Field) and a tight mt-4
           below (grouping it with the investigation it introduces), with no divider
           and no heading. This is proximity doing the grouping work on its own, not
           a styling device — arrived at by testing spacing as the only variable.

           width="reading" (68ch, not "wide") is a second, later Varying Rooms
           decision: this section previews an investigation, so it borrows the
           exact width the investigation's own long-form body uses, foreshadowing
           the register shift from browsing to reading before the reader even
           clicks through — reusing an existing token, not a new value. */}
      {featuredResearchEntry && (
        <Section width="reading">
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

      {/* 5. From Observation to Application — width="narrow" (800px, not "wide") replaces the
           original reasoning that this section should stay wide to "open back up"
           for a broader audience: that never actually rendered, since Prose caps
           this section's paragraph at 68ch regardless of container width, so
           "wide" only ever produced a large, unbalanced void to the right of a
           left-anchored text block — directly beneath Featured Investigation's
           balanced, centered column. narrow gives this section the same width as
           In the Field, so the page's proportion sequence reads as Hero(wide) →
           Photo(narrow) → Featured Investigation(reading) → From Observation
           to Application(narrow) → Quote — narrowing to its single focal point at the
           investigation, then easing back out to the width it held during the
           photograph, rather than a flatter, less differentiated progression.
           The "broad address" idea isn't lost — it's carried by the copy itself
           ("organizations," "products," "services"), not by the container.

           The negative margin was revised from -mt-16 sm:-mt-24 (canceling a full
           default Section padding, landing at 64/96px combined) to -mt-8
           sm:-mt-12 (canceling half of one, landing at ~96/144px). Disciplines →
           Featured Investigation is a genuine introduction (the taxonomy has no
           meaning without the investigation it leads into) and correctly stays
           tightly coupled. Featured Investigation → From Observation to Application is a
           sequence of two complete, independent editorial thoughts — related in
           theme, but each finished on its own — so collapsing it as far as an
           introduction relationship shortchanged Featured Investigation's own
           close. Sharing a width with Photo now also carries some of the
           "these relate" signal, so proximity doesn't have to carry all of it
           alone. */}
      <Section width="narrow" className="-mt-8 sm:-mt-12">
        <Heading as="h2" size="title">
          From Observation to Application
        </Heading>
        <Prose className="mt-6 space-y-6">
          <p>Observation is only the beginning.</p>
          <p>
            The goal isn&apos;t simply to understand the world more clearly.
            It&apos;s to use those insights to design better products,
            services, organizations, technologies, and experiences.
          </p>
        </Prose>
        <Link
          href="/studio"
          className="mt-6 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Explore Chyless World Studio
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
