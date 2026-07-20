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
 * profile-photo focal point. Written first person, scene-first — each
 * paragraph block is a specific remembered moment, not a career summary;
 * see body-of-work/BODY-OF-WORK.md and CONTENT-STANDARDS.md's voice
 * principles for why.
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
            The goal isn&apos;t simply to explain the answer, but to explore
            it, in research, writing, and images that approach it through
            behavioral science, design, technology, systems thinking, and
            public health.
          </p>
          <p>
            Some investigations stay concept studies. Others grow into
            articles, prototypes, products, services, or collaborations.
          </p>
        </Prose>

        <BodyText size="body-lg" className="mt-12 italic">
          — Chyanne Robbins
        </BodyText>

        <Divider className="mt-12" />

        <Heading as="h2" size="title" className="mt-12">
          About the Author
        </Heading>

        <div className="mt-6 overflow-hidden">
          <DocumentaryImage
            src="/images/authorheadshot.jpg"
            alt="Chyanne Robbins"
            aspectRatio="4/5"
            objectPosition="center"
            className="float-left mr-6 mb-2 w-48 sm:w-56"
          />

          <Prose className="space-y-6">
            <p>For one assignment, we worked in pairs.</p>
            <p>
              The instructions were simple. Walk around campus. Find someone
              sitting alone. One of us would sit down next to them — closer
              than you normally would. The other would watch. Not say
              anything. Just watch.
            </p>
            <p>
              I don&apos;t remember the lesson anymore. I remember what
              happened instead.
            </p>
            <p>
              I remember sitting down next to a stranger, and something in
              them shifting before either of us said a word.
            </p>
          </Prose>

          <Prose className="mt-16 space-y-6">
            <p>
              After that, I started noticing it everywhere. Not on purpose. It
              just didn&apos;t turn off.
            </p>
            <p>
              Body language. The length of a pause before someone answered.
              Where people&apos;s eyes went when they were deciding what to
              say. How far someone stood from another person, and what that
              distance meant even when nobody mentioned it.
            </p>
            <p>
              Then it turned inward. I started noticing myself the same way —
              how I responded in conversations, what I was communicating
              without meaning to, how much of what I said wasn&apos;t
              actually in the words.
            </p>
            <p>
              I didn&apos;t have a name for any of this yet. I just
              couldn&apos;t stop seeing it.
            </p>
          </Prose>
        </div>

        <Prose className="mt-16 space-y-6">
          <p>
            I don&apos;t remember one specific argument or reading from a
            different class. What I remember is watching my classmates
            disagree with the professor — often, and sometimes pretty
            passionately.
          </p>
          <p>
            I rarely spoke. I wasn&apos;t trying to win anything. I was just
            fascinated, watching it happen.
          </p>
          <p>
            Up until then, I think I&apos;d assumed difficult questions had
            a correct answer sitting somewhere, waiting to be found, if you
            reasoned carefully enough. What I watched in that room
            didn&apos;t fit that. People reasoned carefully — genuinely
            carefully — and still ended up in different places, each of
            them able to explain exactly how they&apos;d gotten there.
          </p>
          <p>
            Nobody was winning. They just kept arriving somewhere different.
          </p>
        </Prose>

        <Prose className="mt-16 space-y-6">
          <p>
            At the pharmacy counter, I watched the same thing happen over
            and over. People picking up medication for conditions that
            were, more often than not, connected to how they lived.
          </p>
          <p>
            Outside of work, I started hearing the same thing in different
            words, sometimes from people I knew well. Someone would tell me
            what a doctor had told them to change. Then tell me why they
            weren&apos;t going to.
          </p>
          <p>Not because they didn&apos;t understand it. They usually did.</p>
          <p>
            It came down to something closer to: I&apos;d rather just take
            the medicine.
          </p>
          <p>
            None of these were the same person, and none of them said it
            exactly like that. But after enough of them, it stopped sounding
            like individual choices and started sounding like one answer,
            showing up everywhere.
          </p>
          <p>
            The problem was never only information. Most people already had
            it. The harder question — the one that actually stayed with me
            — was why the information wasn&apos;t becoming behavior.
          </p>
        </Prose>

        <Prose className="mt-16 space-y-6">
          <p>
            For a long time, none of it felt connected. Each thing I noticed
            felt like its own thing, not evidence of anything larger.
          </p>
          <p>
            It took years of running into the same question in rooms that
            had nothing to do with each other before I stopped being able to
            call it a coincidence.
          </p>
          <p>At some point, noticing wasn&apos;t enough anymore.</p>
          <p>I started writing things down.</p>
          <p>
            I still do. Some of that is starting an investigation somewhere
            I didn&apos;t expect to look. Some of it is going back and
            revising something I already wrote — a standard, a habit, a
            page like this one — because it stopped telling the truth as
            well as it used to.
          </p>
          <p>
            I don&apos;t think I&apos;ve fully figured out why this
            particular question is the one that stayed, out of everything
            else I could have followed instead.
          </p>
          <p className="italic">
            I didn&apos;t know they were the same question. I just kept
            asking it, in different rooms.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
