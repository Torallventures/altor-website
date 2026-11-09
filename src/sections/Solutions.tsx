import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const solutions = [
  {
    id: "cloudcore",
    index: "01",
    name: "Torall CloudCore",
    tag: "Managed Cloud Platform",
    description:
      "A hardened Kubernetes foundation with GitOps delivery, observability, and FinOps guardrails baked in. Your team ships features; CloudCore keeps the platform boring.",
    points: ["99.99% uptime SLA", "Deploy in days, not quarters", "AWS · Azure · GCP"],
  },
  {
    id: "insight",
    index: "02",
    name: "Torall Insight",
    tag: "AI Analytics Suite",
    description:
      "Retrieval-augmented intelligence over your own documents and data. Ask questions in plain language, get answers with citations — inside your security perimeter.",
    points: ["Private deployment", "Source-cited answers", "SOC 2 aligned"],
  },
  {
    id: "shield",
    index: "03",
    name: "Torall Shield",
    tag: "Security Operations",
    description:
      "Continuous monitoring, detection engineering, and incident response run by certified analysts — enterprise-grade security without building a SOC from scratch.",
    points: ["24/7 monitoring", "15-min response target", "Compliance reporting"],
  },
];

function SolutionRow({
  solution,
  flip,
}: {
  solution: (typeof solutions)[number];
  flip: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${flip ? "reveal" : "reveal-left"} grid items-center gap-8 border-t border-border py-12 lg:grid-cols-12 lg:gap-12`}
    >
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-primary-deep">{solution.index}</span>
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            {solution.tag}
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {solution.name}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {solution.description}
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1.5 rounded-md font-display text-sm font-semibold text-primary-deep transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Talk to us about {solution.name.split(" ")[1]}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {solution.points.map((p) => (
            <li
              key={p}
              className="rounded-md border border-border bg-card px-4 py-4 font-mono text-[13px] leading-snug text-foreground/90"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Solutions() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="solutions" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 20%, hsl(151 45% 40% / 0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left max-w-2xl">
          <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
            Flagship solutions
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Products born from a decade of delivery.
          </h2>
        </div>

        <div className="mt-14">
          {solutions.map((s, i) => (
            <SolutionRow key={s.id} solution={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
