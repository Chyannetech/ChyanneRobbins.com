import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BodyTextSize = "body-lg" | "body" | "meta";
type BodyTextTone = "default" | "muted" | "accent";
type BodyTextFont = "serif" | "sans";

// Line-height is defined once, on the --text-* tokens in globals.css.
const sizeClasses: Record<BodyTextSize, string> = {
  "body-lg": "text-body-lg",
  body: "text-body",
  meta: "text-meta",
};

const toneClasses: Record<BodyTextTone, string> = {
  default: "text-foreground",
  muted: "text-muted",
  accent: "text-accent",
};

// DESIGN-SYSTEM.md: serif for long-form reading, sans for UI/nav/captions/metadata.
// body-lg defaults serif because the Type Scale table ties it to "long-form
// investigation body copy"; body/meta default sans as UI-register text.
const defaultFont: Record<BodyTextSize, BodyTextFont> = {
  "body-lg": "serif",
  body: "sans",
  meta: "sans",
};

interface BodyTextProps {
  as?: "p" | "span" | "div";
  size?: BodyTextSize;
  tone?: BodyTextTone;
  /** Override the size's default font pairing — e.g. a body-lg line that is UI text, not reading content. */
  font?: BodyTextFont;
  className?: string;
  children: ReactNode;
}

export default function BodyText({
  as: Component = "p",
  size = "body",
  tone = "default",
  font,
  className,
  children,
}: BodyTextProps) {
  const resolvedFont = font ?? defaultFont[size];
  return (
    <Component
      className={cn(
        resolvedFont === "serif" ? "font-serif" : "font-sans",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Component>
  );
}
