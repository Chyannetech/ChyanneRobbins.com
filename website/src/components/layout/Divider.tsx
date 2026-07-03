import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
}

/** A hairline rule — the documented alternative to boxes/cards for separating content. */
export default function Divider({ className }: DividerProps) {
  return <hr className={cn("border-t border-border", className)} />;
}
