import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUp, ArrowUpRight, Plus, X } from 'lucide-react';
import { StaticBrandLockup } from '@/components/BrandIdentity';

const links = [{ label: 'Portfolio', to: '/portfolio' }, { label: 'Services', to: '/#services' }, { label: 'About', to: '/about' }, { label: 'Approach', to: '/#process' }];

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
      setScrolled(y > 40);
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
      <div className="agency-nav-links">{links.map(link => { const current = link.to === pathname || link.to === `/${hash}` || (link.to === '/portfolio' && pathname.startsWith('/portfolio/')); return <Link key={link.to} to={link.to} aria-current={current ? 'page' : undefined} className={current ? 'is-current' : ''}>{link.label}</Link>; })}</div>
      <Link to="/#get-in-touch" className="agency-nav-contact">Let’s talk <ArrowUpRight aria-hidden="true"/></Link>
      <button ref={menuRef} type="button" className="agency-mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="agency-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Plus/>}</button>
    </nav>
    {open && <div id="agency-mobile-nav" className="agency-mobile-nav">{links.map((link, index) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}><span className="agency-mobile-index">0{index + 1}</span>{link.label}<ArrowUpRight aria-hidden="true"/></Link>)}<a className="agency-mobile-email" href="mailto:info@torallventures.com">info@torallventures.com</a></div>}
  </header>;
}

export function AgencyFooter() {
  return <footer className="agency-footer">
    <div className="agency-footer-invitation agency-container"><p className="agency-section-label"><span>↗</span>The next good thing starts with a conversation.</p><Link to="/contact">Let’s make it happen.<ArrowUpRight aria-hidden="true"/></Link></div>
    <div className="agency-footer-directory agency-container">
      <div><Link to="/" className="agency-brand" aria-label="Torall Ventures — home"><StaticBrandLockup decorative/></Link><p>Thoughtful design. Useful technology.<br />A more connected business.</p></div>
      <div><p className="agency-eyebrow">Explore</p><nav aria-label="Footer"><Link to="/portfolio">Portfolio</Link><Link to="/#services">Services</Link><Link to="/about">About Torall</Link><Link to="/#process">Our approach</Link></nav></div>
      <div><p className="agency-eyebrow">Start something</p><a href="mailto:info@torallventures.com">info@torallventures.com <ArrowUpRight aria-hidden="true"/></a><p>Based in Florida.<br />Working with you, everywhere.</p></div>
    </div>
    <div className="agency-footer-panorama"><img src="/media/agency/florida.jpg" alt="Miami skyline at dusk" width="1887" height="1258" loading="lazy" decoding="async"/><span aria-hidden="true">TORALL</span><div className="agency-container"><p>Rooted in Florida. Built for what’s next.</p><Link to="/contact">Your next chapter <ArrowUpRight aria-hidden="true"/></Link></div></div>
    <div className="agency-footer-bottom agency-container"><p>© {new Date().getFullYear()} Torall Ventures</p><a href="/sitemap.xml">Sitemap</a><button type="button" onClick={() => window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>Back to top <ArrowUp aria-hidden="true"/></button></div>
  </footer>;
}
