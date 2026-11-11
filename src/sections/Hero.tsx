import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroShowreel } from "@/components/HeroShowreel";

export function Hero() {
  return (
    <section id="top" className="hero-scope relative flex min-h-[100dvh] items-center overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 65% at 95% 45%, hsl(var(--violet) / .26), transparent 70%), radial-gradient(ellipse 35% 50% at 65% 60%, hsl(var(--primary) / .07), transparent 75%)" }} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-24 pt-32 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-10 lg:px-8 lg:pt-28 xl:gap-16">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary-deep">Torall Ventures</p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[clamp(2.8rem,4.4vw,3.8rem)]">Intelligent systems,<br />engineered <span className="text-primary-deep">to scale.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Websites for businesses and residential communities, custom apps, and management systems built exactly for your needs — whatever digital idea you have in mind, we make it happen.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Start a project<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            <Link to="/portfolio" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-card/40 px-6 py-3.5 font-display text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Explore Portfolio</Link>
          </div>
          <div className="mt-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"><span className="h-px w-7 bg-primary/60" /> Designed with purpose. Built around you.</div>
        </div>
        <HeroShowreel />
      </div>
      <a href="#services-teaser" aria-label="Scroll to services" className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ChevronDown className="h-5 w-5" aria-hidden="true" /></a>
    </section>
  );
}
