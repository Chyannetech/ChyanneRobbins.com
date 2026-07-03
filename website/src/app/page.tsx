import Link from "next/link";
import Section from "@/components/layout/Section";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import Eyebrow from "@/components/typography/Eyebrow";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";
import Caption from "@/components/media/Caption";

const DISCIPLINES = [
  "Behavioral Science",
  "Design",
  "Systems Thinking",
  "Technology",
  "Public Health",
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 1. Hero */}
      <Section spacing="large">
        <Eyebrow>Chyanne Robbins</Eyebrow>
        <BodyText size="body-lg" font="sans" tone="muted" className="mt-3 max-w-[40ch]">
          Researching, designing, and documenting better human experiences.
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

      {/* 2. In the Field */}
      <Section>
        <DocumentaryImage aspectRatio="3/2" />
        <Caption meta="Austin, Texas • June 2024">
          Research is how I make sense of the world.
        </Caption>
      </Section>

      {/* 3. Field Notes */}
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

      {/* 4. Featured Investigation */}
      <Section>
        <Link href="/research" className="group block">
          <Heading as="h2" size="subhead" className="transition-colors group-hover:text-accent">
            The Places We Become
          </Heading>
          <BodyText size="meta" tone="muted" className="mt-4">
            Behavioral Science · Design · Systems Thinking
          </BodyText>
        </Link>
      </Section>

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
