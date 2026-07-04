import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface ContentFile<Frontmatter> {
  slug: string;
  frontmatter: Frontmatter;
  /** Raw markdown source, after the frontmatter block — used for excerpting. */
  body: string;
  /** Rendered HTML of `body` — used for display. */
  bodyHtml: string;
}

/**
 * Reads every .md file in content/<directory>, parsing frontmatter with
 * gray-matter and rendering the markdown body to HTML with remark.
 *
 * The slug is always derived from the filename, never a frontmatter field —
 * one source of truth for a file's URL, with no risk of the two drifting
 * apart. `validate` shapes and type-checks the raw frontmatter object,
 * throwing a descriptive error (naming the file and field) if something
 * required is missing or malformed.
 */
export function readContentDirectory<Frontmatter>(
  directory: string,
  validate: (data: Record<string, unknown>, filename: string) => Frontmatter,
): ContentFile<Frontmatter>[] {
  const directoryPath = path.join(process.cwd(), "content", directory);
  const filenames = fs
    .readdirSync(directoryPath)
    .filter((name) => name.endsWith(".md"));

  return filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(directoryPath, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = validate(data, filename);
    const bodyHtml = remark().use(html).processSync(content).toString();
    const slug = filename.replace(/\.md$/, "");

    return { slug, frontmatter, body: content.trim(), bodyHtml };
  });
}
