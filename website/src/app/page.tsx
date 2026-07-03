import Link from "next/link";
import { NAV_LINKS } from "@/lib/navigation";

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
      <section className="mx-auto w-full max-w-[1200px] px-6 py-24 sm:py-32">
        <p className="font-sans text-meta uppercase tracking-wide text-muted">
          Chyanne Robbins
        </p>
        <p className="mt-4 max-w-[40ch] font-sans text-body-lg text-muted">
          Researching, designing, and documenting better human experiences.
        </p>
        <h1 className="mt-8 max-w-[20ch] font-serif text-display leading-tight text-foreground">
          What shapes human experience?
        </h1>
        <Link
          href="/research"
          className="mt-10 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Explore the Research
        </Link>
      </section>

      {/* 2. In the Field */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="aspect-[16/9] w-full border border-border bg-muted/20"
        />
        <div className="mt-4 max-w-[68ch]">
          <p className="font-sans text-meta text-muted">
            Research is how I make sense of the world.
          </p>
          <p className="mt-1 font-sans text-meta text-muted">
            Austin, Texas • June 2024
          </p>
        </div>
      </section>

      {/* 3. Field Notes */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-24">
        <h2 className="font-serif text-title text-foreground">Field Notes</h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {DISCIPLINES.map((discipline) => (
            <li key={discipline} className="font-sans text-body text-muted">
              {discipline}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Featured Investigation */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-24">
        <Link href="/research" className="group block">
          <h2 className="font-serif text-subhead text-foreground transition-colors group-hover:text-accent">
            The Places We Become
          </h2>
          <p className="mt-3 font-sans text-meta text-muted">
            Behavioral Science · Design · Systems Thinking
          </p>
        </Link>
      </section>

      {/* 5. Why This Matters */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-24">
        <h2 className="font-serif text-title text-foreground">
          Why This Matters
        </h2>
        <p className="mt-6 max-w-[68ch] font-sans text-body-lg text-foreground">
          The environments we design—digital and physical—quietly shape how
          people think, decide, connect, and live. By studying human
          experience through behavioral science, design, systems thinking,
          technology, and public health, this publication explores principles
          that can help create products, services, organizations, and spaces
          that better support the people they serve.
        </p>
        <Link
          href="/studio"
          className="mt-6 inline-block font-sans text-body text-accent underline underline-offset-4"
        >
          Studio
        </Link>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16 text-center sm:py-24">
          <p className="mx-auto max-w-[32ch] font-serif text-subhead italic text-foreground">
            &ldquo;Everything we create teaches people how to experience the
            world.&rdquo;
          </p>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-meta text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-sans text-meta text-muted">
            © 2026 Chyanne Robbins
          </p>
        </div>
      </footer>
    </main>
  );
}
