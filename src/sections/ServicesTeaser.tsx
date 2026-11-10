import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";

/** Compact services grid for the home page — each card links to its detail page. */
export function ServicesTeaser() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services-teaser" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
              What we do
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              If it&apos;s digital, we build it.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-1.5 rounded-md font-display text-sm font-semibold text-primary-deep transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore our portfolio
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <TeaserCard key={s.slug} index={i} slug={s.slug} icon={s.icon} title={s.title} tagline={s.tagline} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeaserCard({
  slug,
  icon: Icon,
  title,
  tagline,
  index,
}: {
  slug: string;
  icon: (typeof services)[number]["icon"];
  title: string;
  tagline: string;
  index: number;
}) {
  const ref = useReveal<HTMLAnchorElement>(index * 60);
  return (
    <Link
      ref={ref}
      to={`/services/${slug}`}
      className="reveal group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary-deep transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
        {tagline}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary-deep">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
