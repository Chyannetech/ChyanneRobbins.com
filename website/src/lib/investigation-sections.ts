import { remark } from "remark";
import html from "remark-html";

export interface InvestigationSection {
  heading: string;
  /** Optional, always-visible-even-when-collapsed orienting line. See splitIntroFromBody. */
  introHtml?: string;
  html: string;
}

/**
 * A `---` thematic break inside a section's content is an optional signal:
 * "everything above this line is a short intro, everything below is the
 * collapsible body." No `---` means no intro — the whole chunk is body,
 * exactly like before this existed. This is deliberately opt-in per
 * section (not "the first paragraph is always the intro") because most
 * sections don't want one — see CONTENT-STANDARDS.md for which do.
 */
function splitIntroFromBody(sectionContent: string): { intro?: string; body: string } {
  const lines = sectionContent.split("\n");
  const breakIndex = lines.findIndex((line) => /^-{3,}\s*$/.test(line.trim()));

  if (breakIndex === -1) {
    return { body: sectionContent };
  }

  const intro = lines.slice(0, breakIndex).join("\n").trim();
  const body = lines.slice(breakIndex + 1).join("\n").trim();

  return { intro: intro || undefined, body };
}

/**
 * Splits an investigation's raw Markdown into sections at each top-level
 * (`##`) heading, rendering each chunk through the same remark pipeline
 * already used for the whole body. Operates on the raw source string
 * rather than the parsed AST — simpler to reason about, and safe here
 * since investigation bodies don't use code blocks that could contain a
 * line starting with "## ".
 *
 * Any content before the first `##` heading is not a section — it's
 * returned separately via `getInvestigationLead` and renders always-visible
 * above the collapsible sections, which is the mechanism for a future
 * "Overview"-style intro without requiring one.
 */
export function getInvestigationSections(markdown: string): InvestigationSection[] {
  const headingLineRegex = /^##[ \t]+.+$/gm;
  const matches = [...markdown.matchAll(headingLineRegex)];

  return matches.map((match, index) => {
    const headingLine = match[0];
    const heading = headingLine.replace(/^##[ \t]+/, "").trim();
    const contentStart = match.index! + headingLine.length;
    const contentEnd =
      index + 1 < matches.length ? matches[index + 1].index! : markdown.length;
    const sectionContent = markdown.slice(contentStart, contentEnd).trim();
    const { intro, body } = splitIntroFromBody(sectionContent);

    return {
      heading,
      introHtml: intro
        ? remark().use(html).processSync(intro).toString()
        : undefined,
      html: remark().use(html).processSync(body).toString(),
    };
  });
}

/** Content before the first `##` heading, if any — rendered always-visible, not inside a collapsible section. */
export function getInvestigationLead(markdown: string): string | undefined {
  const headingLineRegex = /^##[ \t]+.+$/m;
  const match = markdown.match(headingLineRegex);
  const lead = match ? markdown.slice(0, match.index).trim() : markdown.trim();

  if (!lead) return undefined;
  return remark().use(html).processSync(lead).toString();
}
