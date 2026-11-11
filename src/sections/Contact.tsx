import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>(120);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      e.message = "Tell us a little more (at least 10 characters).";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };

  const inputClass = (invalid: boolean) =>
    `w-full rounded-md border bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      invalid ? "border-destructive" : "border-border hover:border-muted-foreground/40"
    }`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 90%, hsl(var(--primary) / 0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={leftRef} className="reveal-left">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let's build what's next.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Tell us where you're headed. A senior architect — not a
              salesperson — will reply within one business day.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary-deep">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:info@torallventures.com"
                  className="rounded-md text-foreground transition-colors hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  info@torallventures.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary-deep">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href="tel:+12136065711"
                  className="rounded-md text-foreground transition-colors hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  +1 (213) 606-5711
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary-deep">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-foreground">Florida, USA · Working with clients everywhere</span>
              </li>
            </ul>
          </div>

          <div ref={rightRef} className="reveal">
            {sent ? (
              <div
                role="status"
                className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-primary/40 bg-card p-10 text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-primary-deep" />
                <h3 className="mt-5 font-display text-2xl font-bold">Message received.</h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thanks, {name.split(" ")[0] || "there"} — we'll get back to you
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 rounded-md border border-border px-5 py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-lg border border-border bg-card p-6 sm:p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ada Lovelace"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && (
                      <p id="err-name" role="alert" className="mt-2 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Work email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@company.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <p id="err-email" role="alert" className="mt-2 text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Project
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you building, and what does success look like?"
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      className={`${inputClass(!!errors.message)} resize-y`}
                    />
                    {errors.message && (
                      <p id="err-message" role="alert" className="mt-2 text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-base font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                  >
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
