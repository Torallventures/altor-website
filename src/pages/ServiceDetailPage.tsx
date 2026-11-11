import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { CTABanner } from "@/sections/CTABanner";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;
  const headRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>(120);

  if (!service) return <Navigate to="/portfolio" replace />;

  const idx = services.indexOf(service);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48" aria-labelledby="service-heading">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div ref={headRef} className="reveal max-w-3xl">
            <Link
              to="/portfolio"
              className="link-draw inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-[400ms] hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Portfolio
            </Link>
            <h1
              id="service-heading"
              className="mt-10 font-display text-4xl leading-[1.1] tracking-[-0.01em] sm:text-5xl"
            >
              {service.title}
            </h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-muted-foreground">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8" aria-label="Details">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div
            ref={bodyRef}
            className="reveal grid gap-14 border-t border-border pt-14 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl">
                How we approach it
              </h2>
              {service.story.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}

              <div className="mt-12 border-l-2 border-primary/60 pl-6">
                <p className="label-caps text-primary">
                  Ideal for
                </p>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-foreground/90">
                  {service.idealFor}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl">
                What&apos;s included
              </h2>
              <ul className="mt-8 space-y-4">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 border-b border-border pb-4 text-[15px] leading-snug text-foreground/90"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
            <Link
              to={`/services/${next.slug}`}
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
            >
              <span className="link-draw">Next: {next.title}</span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform duration-[400ms] group-hover:translate-x-1.5" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="cta-outline">
              Begin a Conversation
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
