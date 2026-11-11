import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { CTABanner } from "@/sections/CTABanner";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;
  const headRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>(80);

  if (!service) return <Navigate to="/portfolio" replace />;

  const Icon = service.icon;
  const idx = services.indexOf(service);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <section className="relative pb-8 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={headRef} className="reveal-left max-w-3xl">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-md font-mono text-[13px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-primary-deep">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
                Service {String(idx + 1).padStart(2, "0")}
              </p>
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={bodyRef}
            className="reveal grid gap-12 border-t border-border pt-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How we approach it
              </h2>
              {service.story.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-5 text-lg leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}

              <div className="mt-10 rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-primary-deep">
                  Ideal for
                </p>
                <p className="mt-3 leading-relaxed text-foreground/90">
                  {service.idealFor}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                What&apos;s included
              </h2>
              <ul className="mt-6 space-y-3">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-md border border-border bg-card px-4 py-4 text-[15px] leading-snug text-foreground/90"
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

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
            <Link
              to={`/services/${next.slug}`}
              className="group inline-flex items-center gap-2 rounded-md font-display text-base font-semibold text-primary-deep transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Next: {next.title}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
