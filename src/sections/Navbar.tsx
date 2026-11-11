import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

import { navigationLinks as links } from "@/lib/navigation";
import { HeaderBrandLockup } from "@/components/BrandIdentity";

export function Navbar() {
  const menuButton=useRef<HTMLButtonElement>(null);
  const {pathname}=useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const visible = !hidden || open || keyboardFocus;

  useEffect(() => {
    let raf = 0;
    let previousY = window.scrollY;
    let direction = 0;
    let distance = 0;
    const update = () => {
      raf = 0;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.max(0, Math.min(window.scrollY, maxY));
      const delta = y - previousY;
      setScrolled(y>80);
      if (y <= 80) {
        setHidden(false);
        direction = 0;
        distance = 0;
      } else if (Math.abs(delta) > .1) {
        const nextDirection = Math.sign(delta);
        if (nextDirection !== direction) { direction = nextDirection; distance = 0; }
        distance += Math.abs(delta);
        // More travel to hide; a small upward gesture immediately restores access.
        if (direction > 0 && distance >= 24) { setHidden(true); distance = 0; }
        if (direction < 0 && distance >= 6) { setHidden(false); distance = 0; }
      }
      previousY = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-visible={visible}
      onKeyDown={event=>{if(event.key==='Escape' && open) {setOpen(false); menuButton.current?.focus();}}}
      onFocusCapture={(event) => setKeyboardFocus(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
      }}
      className={`fixed inset-x-0 top-0 z-50 isolate transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Keep shading at the top edge; the lower navigation stays clear over every section. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-16 -z-10 [background:linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.12)_35%,transparent_100%)] transition-opacity duration-500 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 bg-background/95 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none ${open || scrolled ? "opacity-100" : "opacity-0"}`}
      />
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8 xl:gap-12">
        <Link
          to="/"
          className="brand-header-link shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Torall Ventures — home"
          onClick={() => setOpen(false)}
        >
          <HeaderBrandLockup />
        </Link>

        <div className="hidden flex-1 items-center gap-5 lg:flex xl:gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-md font-sans text-sm font-semibold tracking-[-0.01em] transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive || (l.to==='/portfolio' && pathname.startsWith('/services/')) ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-auto rounded-md bg-primary px-4 py-2 font-display text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            Start a project
          </Link>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 font-sans text-sm font-semibold tracking-[-0.01em] transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive || (l.to==='/portfolio' && pathname.startsWith('/services/')) ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-4 py-3 text-center font-display text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
