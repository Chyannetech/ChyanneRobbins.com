import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ProseProps {
  className?: string;
  children: ReactNode;
}

/**
 * Long-form reading content: serif, body-lg, capped to the documented ~68ch
 * reading measure. Unlike PageShell's "reading" variant, Prose adds no
 * padding/centering of its own — it's meant to sit inside a Section that
 * already provides those.
 */
export default function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-[68ch] font-serif text-body-lg text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
