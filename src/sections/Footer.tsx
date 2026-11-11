import { Link } from "react-router";
import { services } from "@/data/services";
import { navigationLinks as nav } from "@/lib/navigation";
import { StaticBrandLockup } from "@/components/BrandIdentity";

const featuredServices = services.filter((s) => s.slug !== "anything-digital");

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            <Link
              to="/"
              aria-label="Torall Ventures — home"
              className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <StaticBrandLockup decorative />
            </Link>
            <p className="mt-6 max-w-[30ch] text-sm leading-7 text-muted-foreground">
              Websites, apps, and custom software — built around your world.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="label-caps text-primary">Explore</h2>
            <ul className="mt-6 space-y-4">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-draw text-sm text-muted-foreground transition-colors duration-[400ms] hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Capabilities">
            <h2 className="label-caps text-primary">What we build</h2>
            <ul className="mt-6 space-y-4">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="link-draw text-sm text-muted-foreground transition-colors duration-[400ms] hover:text-foreground">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-caps text-primary">Connect</h2>
            <a
              href="mailto:info@torallventures.com"
              className="link-draw mt-6 inline-block max-w-full break-all text-sm text-muted-foreground transition-colors duration-[400ms] hover:text-foreground"
            >
              info@torallventures.com
            </a>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Florida, USA<br />Working with clients everywhere.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs leading-6 text-muted-foreground">
            © {new Date().getFullYear()} Torall Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
