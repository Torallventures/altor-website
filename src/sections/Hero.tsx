import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ToriAssistant } from "@/components/ToriAssistant";

export function Hero() {
  return (
    <section id="top" className="hero-scope relative flex min-h-[100dvh] items-center overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 70% at 95% 35%, hsl(var(--violet) / .22), transparent 70%), radial-gradient(ellipse 45% 50% at 75% 80%, hsl(var(--primary) / .07), transparent 75%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pb-20 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary-deep">Torall Ventures / Digital by design</p>
        <h1 className="mt-8 max-w-6xl font-display text-[clamp(2.7rem,7.1vw,6.3rem)] font-semibold leading-[1.04] tracking-[-0.045em]">Intelligent systems.<br /><span className="text-primary-deep">Engineered to scale.</span></h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">We turn ambitious ideas into websites, apps, and custom systems. Built around your business. Designed for the people who use them.</p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start a project<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            <Link to="/portfolio" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-card/40 px-6 py-3.5 font-display text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Explore Portfolio</Link>
          </div>
        </div>
      </div>
      <ToriAssistant />
    </section>
  );
}
