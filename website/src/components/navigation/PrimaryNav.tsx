import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import NavLink from "./NavLink";

interface PrimaryNavProps {
  className?: string;
  linkClassName?: string;
}

/** The site-wide Research/Journal/About/Studio/Contact link list. Used by both Header and Footer. */
export default function PrimaryNav({ className, linkClassName }: PrimaryNavProps) {
  return (
    <nav aria-label="Primary">
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8",
          className,
        )}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} className={linkClassName}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
