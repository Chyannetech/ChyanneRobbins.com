import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CaptionProps {
  children: ReactNode;
  /** Optional secondary line, e.g. location/date metadata. */
  meta?: string;
  className?: string;
}

/** Archival-label style caption: small, sans, muted — never a bold overlay. */
export default function Caption({ children, meta, className }: CaptionProps) {
  return (
    <div className={cn("mt-4 max-w-[68ch]", className)}>
      <p className="font-sans text-meta text-muted">{children}</p>
      {meta ? <p className="mt-1 font-sans text-meta text-muted">{meta}</p> : null}
    </div>
  );
}
