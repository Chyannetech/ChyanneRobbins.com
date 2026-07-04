import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import Prose from "@/components/typography/Prose";
import { CHYLESS_WORLD_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio — Chyanne Robbins",
  description:
    "How investigations documented throughout this publication continue through Chyless World Studio.",
};

/**
 * A transition page, not a destination: ChyanneRobbins.com is the
 * publication, Chyless World Studio (external) is where an investigation
 * sometimes continues as a product, experience, technology, or
 * collaboration. No image, no feature list, no agency language — just the
 * relationship, stated briefly, and one understated outbound link.
 */
export default function StudioPage() {
  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Heading as="h1" size="headline">
          Studio
        </Heading>

        <Divider className="mt-10" />

        <Prose className="mt-12 space-y-6">
          <p className="italic">
            ChyanneRobbins.com is the publication. Chyless World Studio is
            where research becomes real-world practice.
          </p>
          <p>
            Some investigations, once explored here, continue to grow — into
            products, experiences, technology, or collaborations.
          </p>
          <p>
            When that happens, the work continues through Chyless World
            Studio.
          </p>
        </Prose>

        <Link
          href={CHYLESS_WORLD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block font-sans text-body-lg text-accent underline underline-offset-4"
        >
          Visit Chyless World Studio →
        </Link>
      </Section>
    </main>
  );
}
