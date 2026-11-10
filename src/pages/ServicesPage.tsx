import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { CTABanner } from "@/sections/CTABanner";

function ServiceBlock({
  index,
  slug,
  icon: Icon,
  title,
  overview,
  features,
}: {
  index: number;
  slug: string;
  icon: (typeof services)[number]["icon"];
  title: string;
  overview: string;
  features: string[];
}) {
  const ref = useReveal<HTMLDivElement>();
  const flip = index % 2 === 1;
  return (
    <div
      ref={ref}
      className={`${flip ? "reveal" : "reveal-left"} grid items-center gap-8 border-t border-border py-14 lg:grid-cols-12 lg:gap-14`}
    >
      <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-primary-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary-deep">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </div>
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {overview}
        </p>
        <Link
          to={`/services/${slug}`}
          className="group mt-7 inline-flex items-center gap-1.5 rounded-md font-display text-base font-semibold text-primary-deep transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Explore this service
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 rounded-md border border-border bg-card px-4 py-4 text-[14px] leading-snug text-foreground/90"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep"
                strokeWidth={2.2}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="relative pb-10 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={headRef} className="reveal-left max-w-3xl">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
              Our services
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              One team for every digital idea.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              From residential community platforms to business websites, apps,
              and fully custom systems — every project is designed and built by
              the same team, start to finish.
            </p>
          </div>

          <div className="mt-10">
            {services.map((s, i) => (
              <ServiceBlock
                key={s.slug}
                index={i}
                slug={s.slug}
                icon={s.icon}
                title={s.title}
                overview={s.overview}
                features={s.features}
              />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
