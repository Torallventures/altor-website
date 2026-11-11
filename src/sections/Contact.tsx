import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
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
    `w-full rounded-sm border bg-card px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 transition-colors duration-[400ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      invalid ? "border-destructive" : "border-border hover:border-muted-foreground/40"
    }`;

  const labelClass = "label-caps mb-3 block text-muted-foreground";

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div ref={leftRef} className="reveal">
            <p className="label-caps text-primary">Contact</p>
            <h1
              id="contact-heading"
              className="mt-6 font-display text-4xl leading-[1.1] tracking-[-0.01em] sm:text-5xl"
            >
              Begin a conversation.
            </h1>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
              Tell us where you&apos;re headed. We&apos;ll reply within one
              business day.
            </p>

            <ul className="mt-12 space-y-6">
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                <a
                  href="mailto:info@torallventures.com"
                  className="link-draw text-foreground transition-colors duration-[400ms] hover:text-primary"
                >
                  info@torallventures.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                <a
                  href="tel:+12136065711"
                  className="link-draw text-foreground transition-colors duration-[400ms] hover:text-primary"
                >
                  +1 (213) 606-5711
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                <span className="text-muted-foreground">Florida, USA · Working with clients everywhere</span>
              </li>
            </ul>
          </div>

          <div ref={rightRef} className="reveal">
            {sent ? (
              <div
                role="status"
                className="flex h-full min-h-[320px] flex-col items-start justify-center border border-border bg-card p-10"
              >
                <h2 className="font-display text-3xl">Message received.</h2>
                <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                  Thank you, {name.split(" ")[0] || "there"}. We&apos;ll get back
                  to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="cta-outline mt-10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="border border-border bg-card p-6 sm:p-10"
              >
                <div className="space-y-7">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    <label htmlFor="contact-message" className={labelClass}>
                      Your project
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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

                  <button type="submit" className="cta-outline w-full">
                    Send message
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
