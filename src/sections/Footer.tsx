import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { navigationLinks as nav } from "@/lib/navigation";
import { StaticBrandLockup } from "@/components/BrandIdentity";

const footerLink = "rounded-sm text-sm leading-relaxed text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Footer() {
  return (
    <footer className="site-footer relative border-t border-border">
      <div className="relative mx-auto max-w-7xl px-6 pb-7 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="mb-10 flex items-center gap-4 border-b border-border/60 pb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Thoughtfully designed. Precisely engineered.</p>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_.55fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Torall Ventures — home" className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <StaticBrandLockup decorative />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">Websites, apps, and custom systems.<br />Built around your world.</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => <li key={item.to}><Link to={item.to} className={footerLink}>{item.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Capabilities">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">What we build</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => <li key={service.slug}><Link to={`/services/${service.slug}`} className={footerLink}>{service.title}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">Connect</h2>
            <a href="mailto:info@torallventures.com" className="mt-5 inline-flex max-w-full items-start gap-2 rounded-sm text-sm text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="break-all">info@torallventures.com</span><ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" /></a>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Florida, USA<br />Working with clients everywhere.</p>
            <Link to="/contact" className={`${footerLink} mt-5 inline-flex items-center gap-2`}>Start a conversation <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] leading-5 text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Torall Ventures. All rights reserved.</p>
          <p className="tracking-[0.12em]">IDEAS INTO DIGITAL EXPERIENCES.</p>
        </div>
      </div>
    </footer>
  );
}
