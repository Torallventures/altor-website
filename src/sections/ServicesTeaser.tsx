import { Link } from "react-router";
import { ArrowRight, Check, Orbit } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";

const labels = ["Communities", "Websites", "Apps", "Management", "Anything digital"];

/** All services flow down the page, with a separate reveal for each scene. */
export function ServicesTeaser() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="services-teaser" className="services-showcase relative py-24 sm:py-28" aria-labelledby="services-heading">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">What we do</p>
            <h2 id="services-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              If it&apos;s digital,<br className="hidden sm:block" /> <span className="text-primary">we build it.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">One team. Every digital possibility. Explore what we can build for you.</p>
          </div>
          <Link to="/portfolio" className="group inline-flex items-center gap-2 rounded-md font-display text-sm font-semibold text-primary-deep hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore our portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12 space-y-8 sm:space-y-12">
          {services.map((item, index) => (
            <ServicePanel key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePanel({ item, index }: { item: (typeof services)[number]; index: number }) {
  const ref = useReveal<HTMLElement>();
  const Icon = item.icon;
  return (
    <article ref={ref} className="services-stage reveal" aria-labelledby={`service-heading-${item.slug}`}>
      <div className="services-panel">
        <div className="services-copy relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:py-20">
          <p className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary"><Orbit className="h-4 w-4" /> Built around your world</p>
          <h3 id={`service-heading-${item.slug}`} className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{item.title}</h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{item.tagline}</p>
          <ul className="mt-7 space-y-3">
            {item.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}
          </ul>
          <Link to={`/services/${item.slug}`} className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            Explore this service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="services-universe" aria-hidden="true">
          <div className="services-aura" /><div className="services-grid" />
          <div className="services-orbit services-orbit-one"><span /></div>
          <div className="services-orbit services-orbit-two"><span /></div>
          <div className="services-core"><Icon strokeWidth={1} /></div>
          <div className="services-float services-float-top"><span className="services-status" /><span>{labels[index]}<small>Designed for connection</small></span></div>
          <div className="services-float services-float-bottom"><div className="services-mini-bars"><i /><i /><i /><i /><i /></div><span>Your next possibility<small>From idea to experience</small></span></div>
          <span className="services-coordinate font-mono">TORALL / DIGITAL SYSTEMS / 0{index + 1}</span>
        </div>
      </div>
      <div className="services-caption"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {labels[index]}</span><span>0{index + 1} / 0{services.length}</span></div>
    </article>
  );
}
