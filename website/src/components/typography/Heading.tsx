import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "display" | "headline" | "subhead" | "title";

// Line-height/letter-spacing are defined once, on the --text-* tokens in
// globals.css, so they aren't duplicated here as separate leading-*/tracking-*
// utilities that could win or lose the cascade unpredictably.
const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display",
  headline: "text-headline",
  subhead: "text-subhead",
  title: "text-title",
};

interface HeadingProps {
  /** Semantic level — independent of visual size, so a page keeps exactly one h1. */
  as?: HeadingLevel;
  /** Visual size, per DESIGN-SYSTEM.md's Type Scale. */
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
}

export default function Heading({
  as: Component = "h2",
  size = "title",
  className,
  children,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-serif text-foreground",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
