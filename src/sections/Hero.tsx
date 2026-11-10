import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroCanvas } from "@/components/HeroCanvas";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-out choreography: content drifts up and fades as you leave the hero
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = contentRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = window.innerHeight;
        const p = Math.min(Math.max(y / (h * 0.75), 0), 1);
        el.style.opacity = String(1 - p * 0.9);
        el.style.transform = `translateY(${y * 0.22}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="hero-scope relative flex min-h-[100dvh] items-center overflow-hidden bg-background"
    >
      {/* Poster glow — visible before the first GPU frame and on WebGL failure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, hsl(151 45% 40% / 0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, hsl(200 40% 35% / 0.25), transparent 60%)",
        }}
      />
      <HeroCanvas />
      {/* Readability scrim: keeps body text ≥4.5:1 over the particle field.
          Desktop keeps the scene bright on the right; mobile dims evenly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background/45 md:bg-gradient-to-r md:from-background/85 md:via-background/40 md:to-transparent"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <p className="reveal revealed font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
            Torall Ventures
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Intelligent systems,
            <br />
            engineered{" "}
            <span className="text-glow text-primary-deep">to scale.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Websites for businesses and residential communities, custom apps,
            and management systems built exactly for your needs — whatever
            digital idea you have in mind, we make it happen.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-base font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card/40 px-6 py-3.5 font-display text-base font-semibold text-foreground transition-all duration-200 hover:border-primary-deep/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#services-teaser"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
