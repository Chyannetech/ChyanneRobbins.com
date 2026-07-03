import Link from "next/link";
import PrimaryNav from "@/components/navigation/PrimaryNav";
import PageShell from "./PageShell";
import Divider from "./Divider";

export default function Header() {
  return (
    <header>
      <PageShell className="flex flex-wrap items-center justify-between gap-y-3 py-6">
        <Link
          href="/"
          className="font-sans text-body font-medium tracking-tight text-foreground"
        >
          Chyanne Robbins
        </Link>
        <PrimaryNav />
      </PageShell>
      <Divider />
    </header>
  );
}
