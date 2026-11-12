import { useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { StaticBrandLockup } from "@/components/BrandIdentity";
import { navigationLinks } from "@/lib/navigation";
import { services } from "@/data/services";

export function StudioNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="studio-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <nav className="studio-wrap" aria-label="Main navigation">
        <Link
          to="/"
          className="studio-brand"
          aria-label="Torall Ventures — home"
          onClick={() => setOpen(false)}
        >
          <StaticBrandLockup decorative />
        </Link>
        <div className="studio-nav-desktop">
          {navigationLinks.map((item) => (
            <NavLink to={item.to} key={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <Link to="/contact" className="studio-nav-cta">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="studio-menu-button"
          aria-expanded={open}
          aria-controls="studio-mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <div id="studio-mobile-nav" className="studio-mobile-nav" hidden={!open}>
        <div className="studio-wrap">
          {navigationLinks.map((item) => (
            <NavLink to={item.to} key={item.to} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight aria-hidden="true" />
            </NavLink>
          ))}
          <a href="mailto:info@torallventures.com">info@torallventures.com</a>
        </div>
      </div>
    </header>
  );
}

export function StudioFooter() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer-top">
          <div>
            <Link to="/" aria-label="Torall Ventures home">
              <StaticBrandLockup decorative />
            </Link>
            <p>
              Thoughtful digital experiences.
              <br />
              From Florida, for your world.
            </p>
            <a href="mailto:info@torallventures.com" className="studio-link">
              info@torallventures.com <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <h2>Explore</h2>
            {navigationLinks.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Service directory">
            <h2>What we build</h2>
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="studio-footer-word" aria-hidden="true">
          TORALL
        </div>
        <div className="studio-footer-bottom">
          <p>© {new Date().getFullYear()} Torall Ventures</p>
          <span>Design. Development. A connected approach.</span>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Back to top <ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
