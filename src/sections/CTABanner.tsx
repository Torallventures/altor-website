import { Link } from "react-router";
import { useReveal } from "@/hooks/useReveal";

/** Calm closing invitation: one headline, one button, generous space. */
export function CTABanner() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section aria-labelledby="closing-cta-heading" className="closing-cta">
      <div ref={ref} className="reveal closing-cta-inner">
        <h2 id="closing-cta-heading" className="closing-cta-heading">
          Tell us what you have in mind.
        </h2>
        <Link to="/contact" className="cta-outline closing-cta-button">
          Begin a Conversation
        </Link>
      </div>
    </section>
  );
}
