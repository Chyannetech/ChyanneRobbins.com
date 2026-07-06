"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

interface CollapsibleSectionProps {
  heading: string;
  /** Rendered HTML for this section's content — same shape as the rest of the investigation body. */
  html: string;
  /** Optional, always-visible orienting line — shown whether the section is open or closed. */
  introHtml?: string;
  defaultOpen?: boolean;
}

/**
 * A single investigation section. The header row is the same uppercase,
 * tracked, muted label already used for section markers site-wide — the
 * chevron is the one deliberate, scoped exception to "no icons" in this
 * system (see CONTENT-STANDARDS.md): small, muted, purely functional,
 * never decorative.
 *
 * The label is wrapped in a real <h2> (the button lives inside it, per the
 * standard accessible-accordion pattern) so the section still has a real
 * place in the page's heading outline for screen readers, even though it's
 * styled as a quiet label rather than a bold heading. Visually this changes
 * nothing — the <h2> carries no styling of its own — but without it, a
 * multi-section investigation had exactly one real heading on the entire
 * page (the title), and heading-based navigation couldn't see its structure
 * at all.
 *
 * The label and its optional intro are wrapped together as one header
 * unit, with generous spacing around the *unit* — but the label and intro
 * stay tightly grouped with each other, the way a heading and its dek
 * would. The intro renders regardless of open/closed state, since its job
 * is to help a reader decide whether to expand at all.
 *
 * Expand/collapse is animated with grid-template-rows (0fr -> 1fr), not
 * JS height measurement — no ResizeObserver, no layout thrash, and it
 * degrades to an instant toggle under prefers-reduced-motion for free via
 * the motion-reduce: variant.
 */
export default function CollapsibleSection({
  heading,
  html,
  introHtml,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div>
      <div className="py-7">
        <h2>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={contentId}
            className="flex w-full items-center justify-between gap-6 text-left"
          >
            <span className="font-sans text-meta uppercase tracking-wide text-muted">
              {heading}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className={cn(
                "h-3 w-3 shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none",
                open && "rotate-180",
              )}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </h2>

        {introHtml && (
          <div
            className="investigation-section-intro mt-2"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        )}
      </div>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className="investigation-body pb-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
