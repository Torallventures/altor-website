import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { CinematicParticles } from "@/components/CinematicParticles";

export function Hero() {
  return (
    <section id="top" className="hero-scope cinematic-hero relative flex min-h-[100dvh] items-center overflow-hidden">
      <CinematicParticles />
      <div className="hero-layout relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8">
        <div className="hero-copy">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-deep">Torall Ventures / Digital by design</p>
          <h1 className="mt-7 font-display"><span>Intelligent systems.</span><span className="mt-2 text-primary-deep">Engineered to scale.</span></h1>
          <div className="mt-7 flex flex-col items-start gap-7">
            <p className="hero-description text-muted-foreground">We turn ambitious ideas into websites, apps, and custom systems. Built around your business. Designed for the people who use them.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-5 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start a project<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
              <Link to="/portfolio" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-card/40 px-5 py-3.5 font-display text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Explore Portfolio</Link>
            </div>
          </div>
        </div>
        <div className="hero-layout-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
