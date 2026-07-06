"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** A single nav link with current-page state — muted by default, foreground when active. */
export default function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-sans text-meta transition-colors hover:text-accent",
        isActive ? "text-foreground" : "text-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}
