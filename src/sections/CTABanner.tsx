import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/** Closing call-to-action band used at the bottom of pages. */
export function CTABanner() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-20 sm:py-24">
      <div
        ref={ref}
        className="reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Have something digital in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A new idea, a better website, or a system that finally fits.
            Tell us where you want to go. Let’s define the next step.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-base font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
