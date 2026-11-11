import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import "./ServicesTeaser.css";

const previews = [
  { image: "communities", benefit: "Bring your building, amenities, and residents together." },
  { image: "websites", benefit: "Make the right first impression. Turn visits into business." },
  { image: "apps", benefit: "Put your business in motion, on any device." },
  { image: "management", benefit: "Connect your team, clients, and operations in one place." },
  { image: "digital", benefit: "Turn your next idea into a product built around you." },
];

/** Five visible capabilities, presented as an editorial image grid. */
export function ServicesTeaser() {
  return (
    <section id="services-teaser" className="services-editorial" aria-labelledby="services-heading">
      <div className="services-editorial-inner">
        <div className="services-editorial-heading">
          <div>
            <p className="services-editorial-eyebrow">Our capabilities</p>
            <h2 id="services-heading">Built around <span>your business.</span></h2>
            <p className="services-editorial-intro">Digital experiences that look forward. Built for the way you work.</p>
          </div>
          <Link to="/portfolio" className="services-editorial-portfolio">Explore our work <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="services-editorial-grid">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className={`service-editorial-card ${index < 2 ? "service-editorial-featured" : ""}`}
              aria-labelledby={`service-heading-${service.slug}`}
              aria-describedby={`service-benefit-${service.slug}`}
            >
              <div className="service-editorial-image">
                <img src={`/media/service-${previews[index].image}.webp`} alt="" width="1000" height="563" loading="lazy" decoding="async" />
                <span className="service-editorial-number" aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="service-editorial-copy">
                <div className="service-editorial-title">
                  <h3 id={`service-heading-${service.slug}`}>{service.title}</h3>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <p id={`service-benefit-${service.slug}`}>{previews[index].benefit}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
