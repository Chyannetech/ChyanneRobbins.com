import PrimaryNav from "@/components/navigation/PrimaryNav";
import PageShell from "./PageShell";
import Divider from "./Divider";

/**
 * Site-wide utility footer: nav + copyright only. Page-specific editorial
 * content (e.g. Home's closing quote) is NOT part of this component — it
 * renders above Footer as that page's own content, per HOMEPAGE.md's note
 * that the quote and "standard footer utility" are two separate things that
 * sit alongside each other.
 */
export default function Footer() {
  return (
    <footer>
      <Divider />
      <PageShell className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
        <PrimaryNav className="justify-center" />
        <p className="font-sans text-meta text-muted">
          © 2026 Chyanne Robbins
        </p>
      </PageShell>
    </footer>
  );
}
