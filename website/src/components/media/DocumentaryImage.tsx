import Image from "next/image";
import { cn } from "@/lib/cn";

interface DocumentaryImageProps {
  src?: string;
  alt?: string;
  /** CSS aspect-ratio value, e.g. "16/9". */
  aspectRatio?: string;
  className?: string;
}

/**
 * A single documentary photograph — full-bleed or generously margined, no
 * decorative treatment, per Imagery & Photography. When no src is supplied
 * (no real asset exists yet), renders a neutral placeholder in the same
 * footprint so layouts are correct now and swap cleanly once real
 * photography is ready.
 */
export default function DocumentaryImage({
  src,
  alt = "",
  aspectRatio = "16/9",
  className,
}: DocumentaryImageProps) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={cn("border border-border bg-muted/20", className)}
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden border border-border", className)}
      style={{ aspectRatio }}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
