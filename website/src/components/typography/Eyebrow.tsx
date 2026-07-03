import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  as?: "p" | "span" | "div";
  className?: string;
  children: ReactNode;
}

/** Small uppercase, tracked, muted label — a kicker preceding a heading or a byline. */
export default function Eyebrow({
  as: Component = "p",
  className,
  children,
}: EyebrowProps) {
  return (
    <Component
      className={cn(
        "font-sans text-meta uppercase tracking-wide text-muted",
        className,
      )}
    >
      {children}
    </Component>
  );
}
