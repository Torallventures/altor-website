import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { CTABanner } from "@/sections/CTABanner";

function ServiceBlock({
  slug,
  title,
  overview,
}: {
  slug: string;
  title: string;
  overview: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal grid gap-6 border-t border-border py-12 lg:grid-cols-12 lg:gap-14"
    >
      <h2 className="font-display text-3xl leading-[1.15] tracking-[-0.01em] lg:col-span-5">
        {title}
      </h2>
      <div className="lg:col-span-7">
        <p className="max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
          {overview}
        </p>
        <Link
          to={`/services/${slug}`}
          className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
        >
          <span className="link-draw">View work</span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform duration-[400ms] group-hover:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function ServiceOfferings() {
  return (
    <div className="mt-14">
      {services.map((service) => (
        <ServiceBlock
          key={service.slug}
          slug={service.slug}
          title={service.title}
          overview={service.overview}
        />
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="section pt-40 sm:pt-48" aria-labelledby="services-heading">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div ref={headRef} className="reveal max-w-3xl">
            <p className="label-caps text-primary">Our capabilities</p>
            <h1
              id="services-heading"
              className="mt-6 font-display text-5xl leading-[1.08] tracking-[-0.01em] sm:text-6xl"
            >
              One team for every digital idea.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              From residential community platforms to business websites, apps,
              and fully custom platforms — every project is designed and built
              by the same team, start to finish.
            </p>
          </div>
          <ServiceOfferings />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
