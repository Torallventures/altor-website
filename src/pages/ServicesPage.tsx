import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { CTABanner } from "@/sections/CTABanner";

/** Gradient card background per category — one per service, echoing the site's green/violet palette. */
const cardGradients: Record<string, string> = {
  "residential-community-websites":
    "linear-gradient(135deg,#2f4a2a 0%,#7d5a22 100%)",
  "business-websites":
    "linear-gradient(135deg,#1c3a7a 0%,#6d28d9 100%)",
  "business-apps":
    "linear-gradient(135deg,#5b21b6 0%,#be185d 100%)",
  "custom-management-systems":
    "linear-gradient(135deg,#0f766e 0%,#1d4ed8 100%)",
  "anything-digital":
    "linear-gradient(135deg,#b45309 0%,#b91c1c 100%)",
};

function ServiceColumn({
  index,
  slug,
  icon: Icon,
  title,
  features,
}: {
  index: number;
  slug: string;
  icon: (typeof services)[number]["icon"];
  title: string;
  features: string[];
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal flex flex-col gap-5">
      <Link
        to={`/services/${slug}`}
        style={{ background: cardGradients[slug] }}
        className="group relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white outline-none transition-transform duration-300 [transform:translateZ(0)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {/* Soft highlight sweeping the card on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.16)_0%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
        <div>
          <Icon className="mb-3 h-5 w-5 text-white/80" strokeWidth={1.8} />
          <h2 className="font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
            {title}
          </h2>
        </div>
      </Link>

      <ul className="flex flex-col">
        {features.map((f) => (
          <li key={f}>
            <Link
              to={`/services/${slug}`}
              className="group flex items-center justify-between gap-3 border-t border-border py-3.5 text-[14px] font-medium leading-snug text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{f}</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-deep motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                strokeWidth={2}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="relative pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={headRef}
            className="reveal-left flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
                Our services
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                All Services
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Residential platforms, business websites, apps, custom systems —
              one team for every digital idea, start to finish.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((s, i) => (
              <ServiceColumn
                key={s.slug}
                index={i}
                slug={s.slug}
                icon={s.icon}
                title={s.title}
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
