import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CaptionProps {
  children: ReactNode;
  /** Optional secondary line, e.g. location/date metadata. */
  meta?: string;
  className?: string;
  /** Override for the primary line only — e.g. a hover-state class when Caption sits inside a link. The meta line stays muted regardless, matching the card-hover convention where only the title reacts. */
  textClassName?: string;
}

/** Archival-label style caption: small, sans, muted — never a bold overlay. */
export default function Caption({ children, meta, className, textClassName }: CaptionProps) {
  return (
    <div className={cn("mt-4 max-w-[68ch]", className)}>
      <p className={cn("font-sans text-meta text-muted", textClassName)}>{children}</p>
      {meta ? <p className="mt-1 font-sans text-meta text-muted">{meta}</p> : null}
    </div>
  );
}
