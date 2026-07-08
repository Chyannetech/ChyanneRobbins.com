"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A thin, fixed hairline at the top of the viewport tracking scroll
 * progress through the whole page. No label, no percentage — the only
 * signal is the line's width. Scroll updates are read in a
 * requestAnimationFrame loop rather than directly in the scroll handler,
 * so a fast-scrolling reader doesn't trigger a re-render per event.
 *
 * Experimental: uses the neutral `muted` token, not `accent` — the accent
 * color reads as an interactive/brand signal, too assertive for an ambient
 * indicator. This is a single, self-contained component, reused as-is at
 * both its call sites (research/[slug]/page.tsx and journal/[slug]/page.tsx)
 * — delete the import and the JSX line at a given call site to remove it
 * from that content type without affecting the other.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, fraction)));
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current === null) {
        frame.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-muted transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
