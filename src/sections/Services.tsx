import {
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Database,
  Code2,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Architecture, migration, and operation of resilient multi-cloud environments — built for uptime, tuned for cost.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description:
      "From predictive models to production-grade LLM systems, we turn your data into decisions that ship.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Zero-trust architecture, penetration testing, and 24/7 threat monitoring that keeps regulators and attackers at bay.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Pipelines, warehouses, and real-time analytics platforms that make every team in your company data-driven.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Web platforms, APIs, and enterprise applications — designed with your users, engineered for a decade of change.",
  },
  {
    icon: Cpu,
    title: "IoT & Embedded",
    description:
      "Connected devices and edge computing, from prototype firmware to fleets of thousands in the field.",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useReveal<HTMLDivElement>(index * 60);
  const Icon = service.icon;
  return (
    <div
      ref={ref}
      className="reveal group rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary-deep transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {service.description}
      </p>
    </div>
  );
}

export function Services() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left max-w-2xl">
          <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
            What we do
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Full-stack capability, one accountable team.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Six practices, one engineering culture. Every engagement is led by
            senior architects who write code — not slideware.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
