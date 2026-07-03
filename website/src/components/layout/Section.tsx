import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import PageShell from "./PageShell";

type SectionSpacing = "default" | "large";
type SectionWidth = "wide" | "reading";

// DESIGN-SYSTEM.md spacing scale calls out 64/96/128px explicitly for
// vertical rhythm — these are exactly py-16/py-24/py-32 in Tailwind's default
// scale, not arbitrary values.
const spacingClasses: Record<SectionSpacing, string> = {
  default: "py-16 sm:py-24",
  large: "py-24 sm:py-32",
};

interface SectionProps {
  /** "large" for the Hero; "default" for every other editorial section. */
  spacing?: SectionSpacing;
  width?: SectionWidth;
  className?: string;
  shellClassName?: string;
  children: ReactNode;
}

export default function Section({
  spacing = "default",
  width = "wide",
  className,
  shellClassName,
  children,
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)}>
      <PageShell width={width} className={shellClassName}>
        {children}
      </PageShell>
    </section>
  );
}
