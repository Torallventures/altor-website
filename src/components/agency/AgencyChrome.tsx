import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, Mail, MapPin, PanelsTopLeft, Plus, X } from 'lucide-react';
import { StaticBrandLockup } from '@/components/BrandIdentity';

const links = [{ label: 'Services', to: '/#services' }, { label: 'About', to: '/about' }, { label: 'Portfolio', to: '/portfolio' }, { label: 'Approach', to: '/#approach' }];

export function AgencyNav() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname, hash]);
  useEffect(() => {
    let previous = scrollY, frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, scrollY);
      setScrolled(y > 90);
      if (Math.abs(y - previous) > 5 || y < 100) setHidden(y > previous && y > 130);
      previous = y;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', scroll, { passive: true });
    return () => { removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, []);
  return <header className={`agency-nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled || open ? 'is-scrolled' : ''}`} onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); } }}>
    <nav className="agency-container" aria-label="Main navigation">
      <Link to="/" className="agency-brand" aria-label="Torall Ventures — home"><StaticBrandLockup decorative/></Link>
      <div className="agency-nav-links">{links.map(link => <Link key={link.to} to={link.to} className={(link.to === pathname || link.to === `/${hash}`) ? 'is-current' : ''}>{link.label}</Link>)}</div>
      <Link to="/#get-in-touch" className="agency-nav-contact">Get in touch</Link>
      <button ref={menuRef} type="button" className="agency-mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="agency-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Plus/>}</button>
    </nav>
    {open && <div id="agency-mobile-nav" className="agency-mobile-nav">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight aria-hidden="true"/></Link>)}</div>}
  </header>;
}

export function AgencyFooter() {
  return <footer className="agency-footer">
    <div className="agency-footer-contacts agency-container"><h2>Torall, connected.</h2><div>
      <section><h3>New business</h3><p>Let’s make your next move.</p><a href="mailto:info@torallventures.com">info@torallventures.com</a></section>
      <section><h3>Our work</h3><p>Ideas you can explore.</p><Link to="/portfolio">Discover the portfolio</Link></section>
      <section><h3>Our approach</h3><p>Thoughtful from the start.</p><Link to="/about">Get to know Torall</Link></section>
      <section><h3>Our starting point</h3><p>Florida, USA.</p><Link to="/#get-in-touch">Working with you, everywhere.</Link></section>
    </div></div>
    <div className="agency-footer-landscape" aria-hidden="true"><svg className="agency-footer-orbits" viewBox="0 0 1600 400" fill="none"><g stroke="currentColor"><ellipse cx="300" cy="20" rx="180" ry="220"/><ellipse cx="300" cy="20" rx="205" ry="240"/><ellipse cx="300" cy="20" rx="230" ry="260"/><ellipse cx="1350" cy="20" rx="180" ry="220"/><ellipse cx="1350" cy="20" rx="205" ry="240"/><ellipse cx="1350" cy="20" rx="230" ry="260"/></g></svg><svg width="0" height="0"><defs><clipPath id="torall-coast" clipPathUnits="objectBoundingBox"><path d="M0,.24 C.08,.01 .18,0 .25,.19 S.36,.7 .44,.55 S.57,.13 .65,.24 S.79,.72 .86,.53 S.93,.08 1,0 V1 H0Z"/></clipPath></defs></svg><img src="/media/agency/florida.jpg" alt="" width="1887" height="1258" loading="lazy" decoding="async"/></div>
    <div className="agency-footer-base"><div className="agency-container"><div><Link to="/" className="footer-map-title">Site map</Link><nav aria-label="Footer"><Link to="/#services">Services</Link><Link to="/about">About</Link><Link to="/portfolio">Portfolio</Link><Link to="/#approach">Approach</Link><Link to="/contact">Contact</Link><a href="/sitemap.xml">Sitemap</a></nav><p>© {new Date().getFullYear()} Torall Ventures</p></div><div className="agency-footer-shortcuts"><a href="mailto:info@torallventures.com"><Mail aria-hidden="true"/><span>Email</span></a><Link to="/portfolio"><PanelsTopLeft aria-hidden="true"/><span>Portfolio</span></Link><Link to="/about"><MapPin aria-hidden="true"/><span>About</span></Link><Link to="/contact"><ArrowUpRight aria-hidden="true"/><span>Start a project</span></Link></div></div></div>
  </footer>;
}
