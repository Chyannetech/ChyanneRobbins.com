/** "2026-05-01" -> "May 2026". Shared by any content model with a date field (Research now, Journal later). */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
