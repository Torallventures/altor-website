import { Hexagon } from "lucide-react";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Altor Technologies — back to top"
        >
          <Hexagon className="h-5 w-5 text-primary-deep" strokeWidth={2.2} />
          <span className="font-display text-base font-bold tracking-wide">
            ALTOR<span className="text-primary-deep">.</span>
          </span>
        </a>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md font-mono text-[12px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-muted-foreground">
          © 2026 Altor Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
