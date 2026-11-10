import { ArrowRight, ArrowUpRight, Building2, Check, FileCheck2, Globe2, LayoutDashboard, Palette, Users } from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { lumeraTemplateUrl } from "@/lib/templates";

const capabilities = [
  { icon: Globe2, title: "A remarkable first impression.", description: "A cinematic residential website with a video homepage, considered typography, and a complete amenities experience.", number: "01" },
  { icon: FileCheck2, title: "Every step, beautifully connected.", description: "Explore the forms builder, applications, and review workflows that make everyday administration feel effortless.", number: "02" },
  { icon: LayoutDashboard, title: "A community, in one place.", description: "Step into the resident portal, switch between seven roles, and see how residents and management stay connected.", number: "03" },
];

export default function Templates() {
  useEffect(() => {
    const previousTitle = document.title === "Templates — Torall Ventures"
      ? "Torall Ventures — Engineering Intelligent Systems"
      : document.title;
    document.title = "Templates — Torall Ventures";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <>
        <section className="hero-scope relative overflow-hidden border-b border-border bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-[580px] w-[580px] rounded-full bg-primary/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-primary-deep">
              <span className="h-px w-10 bg-primary-deep" /> The template collection
            </p>
            <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
              <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                A head start.<br /><span className="text-primary-deep">A world of possibility.</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore thoughtfully built digital experiences. Find your starting point, step inside, and imagine what comes next for your community.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="collection-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 id="collection-heading" className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Featured experience
            </h2>
            <span className="rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary">Residential communities</span>
          </div>

          <article aria-labelledby="lumera-heading" className="overflow-hidden rounded-2xl border border-primary/20 bg-card">
            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              <div className="relative flex min-w-0 items-center overflow-hidden border-b border-border bg-[#d8ddd5] p-5 sm:p-9 lg:border-b-0 lg:border-r">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.65),transparent_70%)]" />
                <div className="relative w-full overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl shadow-black/20 transition-transform duration-500 motion-safe:hover:-translate-y-1">
                  <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-[#f5f4ef] px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6ccc5]" /><span className="h-1.5 w-1.5 rounded-full bg-[#c6ccc5]" /><span className="h-1.5 w-1.5 rounded-full bg-[#c6ccc5]" />
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-[#667165]">Lumera / Aurelia Residences</span>
                  </div>
                  <img src="/templates/lumera-desktop.jpg" alt="Lumera's Aurelia Residences website, featuring its cinematic architecture homepage and resident portal navigation" width="1425" height="990" fetchPriority="high" className="aspect-[1.44] w-full object-cover object-top" />
                </div>
              </div>

              <div className="flex flex-col p-7 sm:p-10 lg:p-11">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <Building2 className="h-7 w-7 text-primary" strokeWidth={1.3} aria-hidden="true" />
                  <span className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Interactive demo</span>
                </div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Considered living. Connected communities.</p>
                <h3 id="lumera-heading" className="font-display text-5xl font-medium tracking-tight sm:text-6xl">Lumera<span className="text-primary">.</span></h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">A refined condominium website and an intuitive community portal, brought together in one complete experience.</p>
                <ul className="my-7 grid gap-3 text-sm">
                  {["Cinematic website & resident portal", "Forms builder & application workflows", "Seven roles & customizable themes"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{feature}</li>
                  ))}
                </ul>
                <a href={lumeraTemplateUrl} className="group mt-auto inline-flex min-h-12 items-center justify-between gap-4 rounded-md bg-primary px-5 py-3 font-display text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card">
                  Explore Template <ArrowUpRight className="h-5 w-5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <p className="mt-3 text-center text-xs text-muted-foreground">Open the complete Lumera experience</p>
              </div>
            </div>
            <div className="grid divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { icon: Users, label: "Seven perspectives", detail: "Resident to administrator" },
                { icon: Palette, label: "Make it your own", detail: "Three distinct visual themes" },
                { icon: LayoutDashboard, label: "Explore the details", detail: "Cost comparison & AI preview" },
              ].map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex items-center gap-3 px-6 py-5 sm:justify-center">
                  <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-10 py-16 sm:gap-8 sm:py-20 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description, number }, index) => (
              <Reveal key={number} delay={index * 70}>
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.4} aria-hidden="true" />
                  <span className="font-mono text-xs text-muted-foreground">/{number}</span>
                </div>
                <h3 className="mb-3 max-w-xs font-display text-xl leading-snug">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="flex flex-col justify-between gap-7 rounded-xl border border-primary/20 bg-primary/5 p-7 sm:p-10 md:flex-row md:items-center">
              <div><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Your vision, our craft</p><h2 className="font-display text-2xl sm:text-3xl">A starting point. Uniquely yours.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Shape the branding, features, and resident experience around your community.</p></div>
              <Link to="/contact" className="inline-flex min-h-12 shrink-0 items-center gap-4 self-start rounded-md border border-primary/40 px-5 py-3 font-display text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:self-auto">Let's build together <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </section>
    </>
  );
}
import { useEffect } from "react";
