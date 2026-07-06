const WORDS_PER_MINUTE = 220;

/** Estimated reading time in minutes from raw Markdown, rounded up, minimum 1. */
export function getReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
