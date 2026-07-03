import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageShellWidth = "wide" | "reading";

const widthClasses: Record<PageShellWidth, string> = {
  wide: "max-w-[1200px]",
  reading: "max-w-[68ch]",
};

interface PageShellProps {
  /** "wide" (1200px) for page/section layout, "reading" (68ch) for long-form measure. */
  width?: PageShellWidth;
  className?: string;
  children: ReactNode;
}

export default function PageShell({
  width = "wide",
  className,
  children,
}: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full px-6", widthClasses[width], className)}>
      {children}
    </div>
  );
}
