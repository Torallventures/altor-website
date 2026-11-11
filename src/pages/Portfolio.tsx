import { useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { lumeraTemplateUrl } from "@/lib/portfolio";
import { ServiceOfferings } from "@/pages/ServicesPage";
import { useReveal } from "@/hooks/useReveal";

const notes = [
  {
    title: "A considered first impression.",
    description: "A residential website with a video homepage, quiet typography, and a complete amenities experience.",
  },
  {
    title: "Every step, beautifully connected.",
    description: "Forms, applications, and review workflows that make everyday administration feel effortless.",
  },
  {
    title: "A community, in one place.",
    description: "A resident portal with seven roles, so residents and management stay connected.",
  },
];

export default function Portfolio() {
  const headRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Portfolio | Torall Ventures";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <>
      <section className="border-b border-border pt-40 pb-20 sm:pt-48 sm:pb-24" aria-labelledby="portfolio-heading">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div ref={headRef} className="reveal">
            <p className="label-caps text-primary">Selected work</p>
            <h1
              id="portfolio-heading"
              className="mt-6 max-w-[16ch] font-display text-5xl leading-[1.08] tracking-[-0.01em] sm:text-6xl"
            >
              Ideas, brought to life.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Step inside Lumera, our first interactive condominium template,
              and see what thoughtful design can do for a community.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="lumera-heading" className="section">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <article className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
              <div className="overflow-hidden rounded-sm border border-border">
                <img
                  src="/templates/lumera-desktop.jpg"
                  alt="Lumera's Aurelia Residences website, featuring its homepage and resident portal navigation"
                  width="1425"
                  height="990"
                  loading="lazy"
                  decoding="async"
                  className="block w-full"
                />
              </div>

              <div>
                <p className="label-caps text-primary">Residential communities</p>
                <h2 id="lumera-heading" className="mt-5 font-display text-5xl tracking-[-0.01em] sm:text-6xl">
                  Lumera<span className="text-primary">.</span>
                </h2>
                <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
                  A refined condominium website and an intuitive community
                  portal, brought together in one complete experience.
                </p>
                <ul className="mt-8 space-y-3 text-[15px] text-muted-foreground">
                  {["Website & resident portal", "Forms & application workflows", "Seven roles & customizable themes"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={lumeraTemplateUrl}
                  className="group mt-10 inline-flex items-center gap-3 text-[15px] font-medium text-foreground"
                >
                  <span className="link-draw">Explore Lumera</span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-[400ms] group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>

          <div className="mt-24 grid gap-12 border-t border-border pt-16 sm:mt-32 sm:pt-20 md:grid-cols-3 md:gap-10">
            {notes.map(({ title, description }, index) => (
              <Reveal key={title} delay={index * 120}>
                <h3 className="max-w-[24ch] font-display text-2xl leading-snug">{title}</h3>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="section border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <p className="label-caps text-primary">Our capabilities</p>
          <h2 id="capabilities-heading" className="mt-6 font-display text-4xl tracking-[-0.01em] sm:text-5xl">
            One team for every digital idea.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            From residential community platforms to business websites, apps,
            and fully custom platforms — every project is designed and built by
            the same team, start to finish.
          </p>
          <ServiceOfferings />
        </div>
      </section>

      <section aria-labelledby="portfolio-cta-heading" className="closing-cta">
        <div className="closing-cta-inner">
          <h2 id="portfolio-cta-heading" className="closing-cta-heading">
            A starting point. Uniquely yours.
          </h2>
          <Link to="/contact" className="cta-outline closing-cta-button">
            Begin a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
