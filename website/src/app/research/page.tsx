import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import { getResearchEntries } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research — Chyanne Robbins",
  description:
    "The full archive of formal investigations, browsable primarily as a list of individual bodies of work.",
};

export default function ResearchIndexPage() {
  const entries = getResearchEntries();

  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Heading as="h1" size="headline">
          Research
        </Heading>

        <Divider className="mt-10" />

        <ul>
          {entries.map((entry, index) => (
            <li key={entry.slug}>
              {index > 0 && <Divider />}
              <Link
                href={`/research/${entry.slug}`}
                aria-label={entry.title}
                className="group block py-8"
              >
                <Heading
                  as="h2"
                  size="title"
                  className="transition-colors group-hover:text-accent"
                >
                  {entry.title}
                </Heading>
                <BodyText tone="muted" className="mt-3 max-w-[60ch]">
                  {entry.dek}
                </BodyText>
                <BodyText size="meta" tone="muted" className="mt-4">
                  {entry.themes.join(" · ")}
                </BodyText>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
