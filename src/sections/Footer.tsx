import { Link } from "react-router";
import { Hexagon } from "lucide-react";
import { services } from "@/data/services";

import { navigationLinks as nav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Torall Ventures — home"
            >
              <Hexagon className="h-5 w-5 text-primary-deep" strokeWidth={2.2} />
              <span className="font-display text-base font-bold tracking-wide">
                TORALL<span className="text-primary-deep">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Websites, apps, and custom systems for businesses and residential
              communities. Whatever digital idea you have — we make it happen.
            </p>
          </div>

          <nav aria-label="Footer" className="md:justify-self-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Capabilities" className="md:justify-self-end">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
              What we build
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Torall Ventures. All rights reserved.
          </p>
          <a
            href="mailto:info@torallventures.com"
            className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            info@torallventures.com
          </a>
        </div>
      </div>
    </footer>
  );
}
