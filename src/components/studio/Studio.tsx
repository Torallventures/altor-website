import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { services } from "@/data/services";
import { lumeraTemplateUrl } from "@/lib/portfolio";
import { DigitalArchitecture } from "./DigitalArchitecture";

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="studio-page-intro studio-wrap">
      <p className="studio-label">{label}</p>
      <h1>{title}</h1>
      <div className="studio-page-intro-copy">{children}</div>
    </section>
  );
}

export function StudioHero() {
  return (
    <section id="top" className="studio-hero">
      <DigitalArchitecture />
      <div className="architecture-scrim" aria-hidden="true" />
      <div className="studio-wrap studio-hero-content">
        <p className="studio-hero-kicker">Torall Ventures / Digital product studio</p>
        <h1>
          <span>Websites that stand out.</span>
          <span>Systems that work.</span>
        </h1>
        <p className="studio-hero-description">
          We design and build websites, applications, and custom platforms that make complex work
          feel simple.
        </p>
        <div className="studio-actions">
          <Link to="/portfolio" className="studio-button">
            Explore our work <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link to="/contact" className="studio-link">
            Start a project <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <a href="#featured" className="studio-hero-discover" aria-label="Discover the Lumera project">
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}

export function FeaturedProject({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      id="featured"
      className={`studio-project ${detailed ? "is-detailed" : ""}`}
      aria-labelledby="lumera-title"
    >
      <div className="studio-wrap">
        <div className="studio-project-top">
          <p className="studio-label">Selected work</p>
          <span>Interactive demonstration</span>
        </div>
        <div className="studio-project-heading">
          <div>
            <h2 id="lumera-title">Lumera</h2>
            <p>A community. A connected experience.</p>
          </div>
          <div>
            <p>
              A condominium website and portal that brings public pages, resident services, forms,
              and management workflows into one considered product.
            </p>
            <a href={lumeraTemplateUrl} className="studio-link">
              Explore Lumera <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <a
          href={lumeraTemplateUrl}
          className="studio-product-composition"
          aria-label="Open the full interactive Lumera website"
        >
          <div className="studio-product-stage">
            <div className="studio-product-screen">
              <img
                src="/templates/lumera-current-desktop.jpg"
                alt="Lumera's actual Aurelia Residences homepage, with architectural video imagery and community navigation"
                width="1440"
                height="900"
                loading={detailed ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          </div>
          <figure className="studio-product-mobile">
            <img
              src="/templates/lumera-forms-mobile.jpg"
              alt="Lumera's actual mobile forms interface, showing its guided community application workflow"
              width="390"
              height="844"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </a>
        <div className="studio-project-foot">
          <div>
            <span>Website & resident portal</span>
            <span>Forms & applications</span>
            <span>Seven role demonstrations</span>
          </div>
          {!detailed && (
            <Link to="/portfolio" className="studio-link">
              Inside the product <ArrowRight aria-hidden="true" />
            </Link>
          )}
          {detailed && <span>Explore it. Switch perspectives. Make it your own.</span>}
        </div>
      </div>
    </section>
  );
}

export function StudioIntroduction() {
  return (
    <section className="studio-introduction studio-wrap">
      <p className="studio-label">A connected approach</p>
      <div>
        <h2>
          The way it looks.
          <br />
          The way it works.
          <br />
          Thought through together.
        </h2>
        <p>
          We bring design and development into the same conversation. From a business’s first
          impression to the tools a team uses every day, we build around the people on the other
          side of the screen.
        </p>
        <Link to="/about" className="studio-link">
          Meet Torall <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ServiceIndex({ full = false }: { full?: boolean }) {
  return (
    <section id="services" className="studio-services studio-wrap">
      {!full && (
        <div className="studio-section-head">
          <p className="studio-label">What we build</p>
          <div>
            <h2>
              Good design opens doors.
              <br />
              Good technology keeps them open.
            </h2>
            <p>
              From a first website to the systems behind your operations, we bring the experience
              and its foundations together.
            </p>
          </div>
        </div>
      )}
      <div className="studio-service-list">
        {services.map((service) => (
          <article key={service.slug} className="studio-service-row">
            <Link to={`/services/${service.slug}`} className="studio-service-name">
              <service.icon aria-hidden="true" strokeWidth={1.2} />
              <h2>{service.title}</h2>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <div>
              <p>{service.overview}</p>
              {full ? (
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <Link className="studio-link" to={`/services/${service.slug}`}>
                  Explore this service <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StudioProcess() {
  const steps = [
    [
      "Understand",
      "Start with the people, the business, and the problem. Agree on what needs to work before deciding how it should look.",
    ],
    [
      "Shape",
      "Connect content, structure, and visual design in an experience you can review and refine.",
    ],
    [
      "Build",
      "Develop the website or system around the agreed priorities, with clear milestones and working versions.",
    ],
    [
      "Move forward",
      "Prepare for launch, make the handover practical, and plan the next improvements around real use.",
    ],
  ];
  return (
    <section id="process" className="studio-process">
      <div className="studio-wrap">
        <div className="studio-section-head">
          <p className="studio-label">Our approach</p>
          <div>
            <h2>Clear at every step.</h2>
            <p>You should understand what we’re building, why it matters, and what comes next.</p>
          </div>
        </div>
        <ol>
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StudioPrinciples() {
  return (
    <section className="studio-principles studio-wrap">
      <p className="studio-label">The way we think</p>
      <div>
        <h2>
          Make the complicated
          <br />
          feel considered.
        </h2>
        <p className="studio-lead">
          A useful product starts with understanding the people who will use it. Every layout,
          interaction, and technical decision should make their next step easier.
        </p>
        <div className="studio-principle-list">
          {[
            [
              "Clarity before complexity",
              "A clear journey, readable content, and the right features. More software is not always the answer.",
            ],
            [
              "Design and development together",
              "The visual experience and the underlying system are considered together, from the beginning.",
            ],
            [
              "Built around your business",
              "Your language, your workflows, and your priorities shape the product. Technology should support how you work.",
            ],
          ].map(([name, text]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioQuestions() {
  return (
    <section className="studio-questions studio-wrap">
      <div>
        <p className="studio-label">Before we begin</p>
        <h2>A few useful answers.</h2>
      </div>
      <div>
        {[
          [
            "Do I need a finished brief?",
            "No. Tell us what your business does, who the experience is for, and what you want to improve. A few priorities or examples are enough to start the conversation.",
          ],
          [
            "Can you work with an existing website or system?",
            "Yes. We can discuss a focused improvement, a full redesign, or an integration with the tools you already use. We begin by understanding what works and what needs to change.",
          ],
          [
            "How are timing and cost decided?",
            "The scope, content, integrations, and level of customization determine the plan. We agree on the priorities and deliverables before discussing timing and cost.",
          ],
          [
            "Can I explore a working example?",
            "Lumera is our interactive residential website and portal demonstration. Open it from the portfolio to try public pages, forms, resident experiences, management roles, and visual themes.",
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Retains the existing Torall film without the former scroll-wobble effect. */
export function StudioFilm() {
  const [failed, setFailed] = useState(false);
  return (
    <section id="showreel" className="studio-film studio-wrap">
      <div className="studio-film-caption">
        <p className="studio-label">From idea to interface</p>
        <p>Websites, communities, and the systems that connect them.</p>
      </div>
      <div className="studio-film-frame">
        <video
          src="/media/torall-website-polished.mp4"
          poster="/media/torall-website-polished-poster.jpg"
          width="1920"
          height="1080"
          controls
          muted
          playsInline
          preload="none"
          aria-label="Torall's services: residential websites, business websites, applications, management systems, and custom digital products"
          onError={() => setFailed(true)}
        />
        {failed && (
          <p className="studio-film-error">
            The film is unavailable. <Link to="/services">Explore our services</Link>
          </p>
        )}
      </div>
    </section>
  );
}

export function StudioInvitation() {
  return (
    <section className="studio-invitation studio-wrap">
      <p className="studio-label">Your next chapter</p>
      <h2>
        What could work
        <br />
        better for you?
      </h2>
      <div>
        <p>
          A new website. A simpler workflow. An idea ready to become something useful. Let’s find
          the right place to start.
        </p>
        <Link to="/contact" className="studio-button">
          Start a conversation <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
