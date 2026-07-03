import DocumentaryImage from "./DocumentaryImage";

interface GalleryProps {
  count?: number;
  className?: string;
}

/**
 * PLACEHOLDER. No gallery layout is specified in DESIGN-SYSTEM.md — the
 * Journal content model implies multi-image entries (`images: asset ref[]`)
 * will need one eventually, so this exists as a structural stub: a grid of
 * neutral DocumentaryImage placeholders. Treat the grid density, captions,
 * and any interaction (lightbox, etc.) as undecided until the design system
 * documents an actual gallery pattern.
 */
export default function Gallery({ count = 3, className }: GalleryProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <DocumentaryImage key={index} aspectRatio="1/1" />
        ))}
      </div>
    </div>
  );
}
