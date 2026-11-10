import {
  Building2,
  Globe,
  AppWindow,
  LayoutDashboard,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  points?: string[];
};

const services: Service[] = [
  {
    icon: Building2,
    title: "Residential Community Websites",
    description:
      "Modern websites for residential buildings and communities — everything your residents need, in one place.",
    points: [
      "Amenities showcase & booking",
      "Online product ordering for residents",
      "AI chatbot assistance",
      "Resident e-portals",
    ],
  },
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Professional websites for any business, in any industry — designed to look sharp, load fast, and win customers.",
  },
  {
    icon: AppWindow,
    title: "Business Apps",
    description:
      "Custom applications for any business — web or mobile, built around the way your team actually works.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Management Systems",
    description:
      "Tailor-made systems to manage your business — operations, inventory, clients, or anything else you need to run.",
  },
  {
    icon: Sparkles,
    title: "Anything Digital",
    description:
      "Whatever digital idea you have in your mind — we make it happen. If it can be built, we can build it.",
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
      {service.points && (
        <ul className="mt-4 space-y-2">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-[14px] text-muted-foreground"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep"
                strokeWidth={2.2}
              />
              {point}
            </li>
          ))}
        </ul>
      )}
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
