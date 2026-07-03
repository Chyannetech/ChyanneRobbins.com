import Link from "next/link";
import { NAV_LINKS } from "@/lib/navigation";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-sans text-body font-medium tracking-tight text-foreground"
        >
          Chyanne Robbins
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-meta text-muted transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
