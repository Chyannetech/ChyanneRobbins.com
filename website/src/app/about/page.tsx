import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import Divider from "@/components/layout/Divider";
import Heading from "@/components/typography/Heading";
import BodyText from "@/components/typography/BodyText";
import Prose from "@/components/typography/Prose";
import DocumentaryImage from "@/components/media/DocumentaryImage";

export const metadata: Metadata = {
  title: "About — Chyanne Robbins",
  description:
    "An independent research publication documenting investigations into human experience.",
  alternates: { canonical: "/about" },
};

/**
 * Reader-facing copy: what the publication is, why it exists, what readers
 * will find here, and who's behind it. Deliberately excludes internal
 * design direction (typography/spacing priorities, the "museum archive"
 * framing, etc.) — that belongs in docs/DESIGN-SYSTEM.md for collaborators,
 * not on the page itself.
 *
 * "About the Author" is a distinct end-of-piece section (Divider-separated),
 * matching book/essay bio conventions. Its portrait uses DocumentaryImage at
 * a deliberately small, portrait-oriented size — supporting the bio, not a
 * profile-photo focal point.
 */
export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Section spacing="large">
        <Heading as="h1" size="headline">
          About
        </Heading>

        <Divider className="mt-10" />

        <Prose className="mt-12 space-y-6">
          <p>
            ChyanneRobbins.com is an independent research publication: an
            evolving body of work documenting investigations into human
            experience, rather than a traditional portfolio.
          </p>
          <p>
            Every investigation begins with curiosity — a question about why
            people think, feel, decide, connect, or live the way they do.
          </p>
          <p>
            The goal isn&apos;t simply to explain the answer, but to explore
            it, through research, writing, and images that draw on
            behavioral science, design, technology, systems thinking, and
            public health.
          </p>
          <p>
            Some investigations stay concept studies. Others grow into
            articles, prototypes, products, services, or collaborations.
          </p>
          <p>
            This publication is written for curious readers, and for
            organizations looking to apply the same thinking to the
            products, services, and experiences they build.
          </p>
        </Prose>

        <BodyText size="body-lg" className="mt-12 italic">
          — Chyanne Robbins
        </BodyText>

        <Divider className="mt-12" />

        <Heading as="h2" size="title" className="mt-12">
          About the Author
        </Heading>

        <DocumentaryImage
          src="/images/author.jpg"
          alt="Chyanne Robbins"
          aspectRatio="4/5"
          objectPosition="center"
          className="mt-8 w-40 sm:w-48"
        />

        <Prose className="mt-8 space-y-6">
          <p>
            Chyanne Robbins is a multidisciplinary researcher and designer
            whose work sits at the intersection of behavioral science,
            design, technology, and public health.
          </p>
          <p>
            After studying communication and health promotion—and working as
            a software engineer—she became interested in a broader question:
          </p>
          <p className="italic">
            How do the environments we create shape the people we become?
          </p>
          <p>That question became the foundation for this publication.</p>
        </Prose>
      </Section>
    </main>
  );
}
