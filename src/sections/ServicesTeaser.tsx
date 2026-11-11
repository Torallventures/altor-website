import { Check } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";

const images: Record<string, string> = {
  "residential-community-websites": "/media/service-communities.webp",
  "business-websites": "/media/service-websites.webp",
  "business-apps": "/media/service-apps.webp",
  "custom-management-systems": "/media/service-management.webp",
  "anything-digital": "/media/service-digital.webp",
};

/** All five capabilities, fully explained inline — no clicks away. */
export function ServicesTeaser() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="services-teaser" className="relative py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left max-w-3xl">
          <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
            Our capabilities
          </p>
          <h2 id="services-heading" className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            Built around <span className="text-primary-deep">your business.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Everything we build, explained in one place. Five capabilities, one
            team, start to finish.
          </p>
        </div>

        <div className="mt-14">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} index={index} image={images[service.slug]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ index, image }: { index: number; image: string }) {
  const service = services[index];
  const ref = useReveal<HTMLDivElement>();
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`${flip ? "reveal" : "reveal-left"} grid items-center gap-8 border-t border-border py-12 lg:grid-cols-12 lg:gap-14 lg:py-16`}
    >
      <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-primary-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {service.overview}
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 rounded-md border border-border bg-card px-4 py-3.5 text-[14px] leading-snug text-foreground/90"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" strokeWidth={2.2} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-deep">Ideal for · </span>
          {service.idealFor}
        </p>
      </div>

      <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={image}
            alt={service.title}
            width="1000"
            height="563"
            loading="lazy"
            decoding="async"
            className="block aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
