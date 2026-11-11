import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import "./ServicesTeaser.css";

const featured = {
  slug: "residential-community-websites",
  title: "Residential Community Websites",
  description: "A private home online for your building, its amenities, and its residents.",
  image: {
    src: "/media/service-communities.webp",
    width: 1000,
    height: 563,
    alt: "Aerial view of a residential rooftop pool and terrace at dusk",
  },
};

const capabilities = [
  {
    slug: "business-websites",
    title: "Business Websites",
    description: "A first impression as considered as your front door.",
    image: {
      src: "/media/photo/interior-1000.webp",
      srcSet: "/media/photo/interior-1000.webp 1000w, /media/photo/interior-1600.webp 1600w",
      width: 1000,
      height: 680,
      alt: "A calm, light-filled living space with timber and stone finishes",
    },
  },
  {
    slug: "business-apps",
    title: "Business Apps",
    description: "Refined tools for your team and clients, on any device.",
    image: {
      src: "/media/photo/lobby-1000.webp",
      srcSet: "/media/photo/lobby-1000.webp 1000w, /media/photo/lobby-1600.webp 1600w",
      width: 1000,
      height: 528,
      alt: "A warm lounge interior with soft natural light",
    },
  },
  {
    slug: "custom-management-systems",
    title: "Custom Management Systems",
    description: "Your people, clients, and operations connected in one place.",
    image: {
      src: "/media/photo/desk-1000.webp",
      srcSet: "/media/photo/desk-1000.webp 1000w, /media/photo/desk-1600.webp 1600w",
      width: 1000,
      height: 668,
      alt: "A quiet, considered workspace",
    },
  },
];

function CardImage({ image, ratio }: { image: typeof featured.image & { srcSet?: string }; ratio: string }) {
  return (
    <div className="cap-card-image" style={{ aspectRatio: ratio }}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 33vw, 100vw"
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Our capabilities — one featured craft, then three quiet promises. */
export function ServicesTeaser() {
  const featuredRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const closingRef = useReveal<HTMLParagraphElement>();

  return (
    <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-heading">
      <div className="capabilities-inner">
        <p className="label-caps capabilities-eyebrow">Our capabilities</p>

        <div ref={featuredRef} className="reveal">
          <Link
            to={`/services/${featured.slug}`}
            className="cap-card cap-featured"
            aria-labelledby="cap-featured-title"
          >
            <div className="cap-featured-image">
              <img
                src={featured.image.src}
                width={featured.image.width}
                height={featured.image.height}
                alt={featured.image.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="cap-featured-copy">
              <h2 id="cap-featured-title" className="cap-featured-title">{featured.title}</h2>
              <p className="cap-description">{featured.description}</p>
              <span className="cap-link">
                View work
                <ArrowRight className="cap-arrow" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>

        <div ref={gridRef} className="reveal capabilities-grid">
          {capabilities.map((cap) => (
            <Link
              key={cap.slug}
              to={`/services/${cap.slug}`}
              className="cap-card"
              aria-labelledby={`cap-${cap.slug}`}
            >
              <CardImage image={cap.image} ratio="3 / 2" />
              <h3 id={`cap-${cap.slug}`} className="cap-title">{cap.title}</h3>
              <p className="cap-description">{cap.description}</p>
              <span className="cap-link">
                View work
                <ArrowRight className="cap-arrow" />
              </span>
            </Link>
          ))}
        </div>

        <p ref={closingRef} className="reveal capabilities-closing">
          Something else in mind? If it&apos;s digital,{" "}
          <Link to="/contact" className="link-draw capabilities-closing-link">
            we&apos;ll find a way to build it
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
