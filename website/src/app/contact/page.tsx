import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import Prose from "@/components/typography/Prose";
import BodyText from "@/components/typography/BodyText";
import { CHYLESS_WORLD_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Chyanne Robbins",
  description: "The best conversations often begin with a thoughtful email.",
};

const EMAIL = "hello@chyannerobbins.com";

/**
 * The final page of the publication: brief and quiet. The email address is
 * the one deliberately emphasized element (large, accent-colored) — the
 * Chyless World mention stays a single muted footnote sentence, not a
 * second call-to-action, per the brief.
 */
export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Heading as="h1" size="headline">
          Contact
        </Heading>

        <Divider className="mt-10" />

        <Prose className="mt-12 space-y-6">
          <p>The best conversations often begin with a thoughtful email.</p>
          <p>
            If you&apos;d like to discuss research, collaborations,
            speaking, writing, or simply continue a conversation started
            somewhere in these pages, I&apos;d be glad to hear from you.
          </p>
        </Prose>

        <Link
          href={`mailto:${EMAIL}`}
          className="mt-12 inline-block font-sans text-subhead text-accent underline decoration-1 underline-offset-4"
        >
          {EMAIL}
        </Link>

        <BodyText tone="muted" className="mt-8">
          For work that has grown beyond the publication, visit{" "}
          <Link
            href={CHYLESS_WORLD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Chyless World Studio<span className="sr-only"> (opens in a new tab)</span>
          </Link>
          .
        </BodyText>
      </Section>
    </main>
  );
}
