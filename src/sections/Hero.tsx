import { Link } from "react-router";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-media" aria-hidden="true">
        <img
          src="/media/photo/hero-2000.webp"
          srcSet="/media/photo/hero-1200.webp 1200w, /media/photo/hero-2000.webp 2000w"
          sizes="100vw"
          width="2000"
          height="1333"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-shade" />
      </div>
      <div className="hero-content">
        <h1 id="hero-heading" className="hero-headline">
          Digital experiences, tailored to the way you live and work.
        </h1>
        <p className="hero-sub">
          We design and build websites, apps, and custom software for
          distinguished properties and brands — quietly, carefully, end to end.
        </p>
        <Link to="/contact" className="cta-outline hero-cta">
          Begin a Conversation
        </Link>
      </div>
    </section>
  );
}
