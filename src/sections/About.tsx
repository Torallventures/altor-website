import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Reveal } from "@/components/Reveal";

function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    // No disconnect: toggles in both scroll directions so the
    // count-up replays every time the stat re-enters view.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Stat({
  target,
  suffix = "",
  text,
  label,
}: {
  target?: number;
  suffix?: string;
  text?: string;
  label: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === undefined) return;
    if (!inView) {
      setN(0); // reset so the count-up replays on re-entry
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      // rAF timestamps mark frame start and can predate the effect's
      // performance.now() by a few ms — clamp so eased never goes negative
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="flex flex-col">
      <dt className="order-2 mt-2 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="order-1 font-display text-4xl font-bold text-primary-deep sm:text-5xl">
        {target !== undefined ? `${n}${suffix}` : text}
      </dd>
    </div>
  );
}

const stats = [
  { target: 140, suffix: "+", label: "Projects delivered" },
  { target: 97, suffix: "%", label: "Client retention" },
  { target: 16, label: "Countries served" },
  { text: "24/7", label: "Engineering support" },
];

const values = [
  {
    title: "Precision",
    body: "We measure twice and ship once. Every architecture decision is documented, tested, and owned.",
  },
  {
    title: "Transparency",
    body: "Weekly demos, open backlogs, honest timelines. You always know exactly where your project stands.",
  },
  {
    title: "Ownership",
    body: "We treat your uptime, your budget, and your reputation as our own — long after launch day.",
  },
];

export function About() {
  const leftRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={leftRef} className="reveal-left">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
              Who we are
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Engineers first. Consultants second. Vendors never.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Altor Technologies was founded on a simple observation: the best
              technology partners don't sell hours — they take responsibility
              for outcomes. Today our team of architects, engineers, and
              security specialists builds the systems that ambitious companies
              run on.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    <span className="mr-3 font-mono text-sm text-primary-deep">/</span>
                    {v.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
