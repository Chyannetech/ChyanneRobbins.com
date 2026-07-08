import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/journal";
import DocumentaryImage from "./DocumentaryImage";
import Caption from "./Caption";

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
}

/**
 * "From This Moment" — the remainder of the same observed moment a Journal
 * entry's essay and hero image already established; not evidence, an
 * archive, or a portfolio. Renders nothing for an empty array — there's no
 * gallery chrome to show when there's nothing to show.
 *
 * Photographic roles, not a gallery layout: every image keeps its own
 * aspect ratio (never cropped), and hierarchy is expressed with exactly one
 * variable — height — determined by exactly one signal — array position.
 * The first image is the lead frame and occupies its own row at twice the
 * height of every other image; everything else is a supporting frame,
 * sharing one smaller height, wrapping in a row beneath the lead. There is
 * no `lead` field — position alone determines the role, which can't drift
 * out of sync the way a second, independently-set field could.
 *
 * The two gaps are deliberately different sizes, each doing one job: 24px
 * between the lead and the supporting row separates the two *tiers*; 16px
 * within the supporting row (reusing the same value already established for
 * Home's Disciplines-into-Featured-Investigation coupling) keeps the
 * supporting frames reading as one collective strip — the remainder of a
 * single moment — rather than several individually-important photographs
 * competing with each other, which would undo the point of having a lead
 * frame at all. This scales to any count without a per-count template: 1
 * photo is just a lead alone, 2 is a lead with one supporting frame, 6 is a
 * lead with a supporting row that wraps twice — same two rules throughout.
 *
 * Each `<figure>` gets its tier's fixed height *and* that image's own
 * `aspectRatio` directly (not left for `DocumentaryImage` to infer), so the
 * browser derives its width from the two together. Sizing the `<figure>`
 * explicitly like this — rather than letting it shrink-wrap its children —
 * is also what keeps a caption (ordinary block text with no width of its
 * own) from silently widening its flex item past the photo above it.
 *
 * Reuses DocumentaryImage and Caption exactly as they already exist
 * elsewhere on the site — the only new thing here is the wrapping layout,
 * not a new way of rendering a photo or a caption.
 */
export default function Gallery({ images, className }: GalleryProps) {
  if (images.length === 0) return null;

  const [lead, ...supporting] = images;

  const renderFrame = (image: GalleryImage, index: number, size: "lead" | "supporting") => (
    <figure
      key={index}
      className={cn("shrink-0", size === "lead" ? "h-72 sm:h-96" : "h-36 sm:h-48")}
      style={{ aspectRatio: image.aspectRatio }}
    >
      <DocumentaryImage
        src={image.src}
        alt={image.alt}
        aspectRatio={image.aspectRatio}
        className="h-full w-full"
      />
      {image.caption && <Caption>{image.caption}</Caption>}
    </figure>
  );

  return (
    <div className={className}>
      {renderFrame(lead, 0, "lead")}
      {supporting.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {supporting.map((image, index) => renderFrame(image, index, "supporting"))}
        </div>
      )}
    </div>
  );
}
