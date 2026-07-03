import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "display" | "headline" | "subhead" | "title";

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display leading-tight",
  headline: "text-headline leading-tight",
  subhead: "text-subhead leading-snug",
  title: "text-title leading-snug",
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
