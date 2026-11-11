import { useReveal } from "@/hooks/useReveal";
import { Reveal } from "@/components/Reveal";

const values = [
  {
    title: "Precision",
    body: "We measure twice and ship once. Every decision is documented, tested, and owned.",
  },
  {
    title: "Transparency",
    body: "Honest timelines and open progress. You always know exactly where your project stands.",
  },
  {
    title: "Ownership",
    body: "We treat your budget and your reputation as our own — long after launch day.",
  },
];

export function About() {
  const leftRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={leftRef} className="reveal">
            <p className="label-caps text-primary">Who we are</p>
            <h1
              id="about-heading"
              className="mt-6 font-display text-4xl leading-[1.1] tracking-[-0.01em] text-foreground sm:text-5xl"
            >
              A small team, accountable for the whole result.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Torall Ventures was founded on a simple observation: the best
              partners don&apos;t sell hours — they take responsibility for
              outcomes. We design and build websites, apps, and custom
              platforms for residences and businesses that value things done
              properly.
            </p>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Based in Florida. Working with clients everywhere.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="border-t border-border pt-6">
                  <h2 className="font-display text-2xl text-foreground">
                    {v.title}
                  </h2>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
