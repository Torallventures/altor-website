import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { navigationLinks as links } from "@/lib/navigation";
import { HeaderBrandLockup } from "@/components/BrandIdentity";
import "./Navbar.css";

const SCROLL_SOLID_Y = 40;
const HIDE_AFTER_Y = 200;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const visible = !hidden || open || keyboardFocus;

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  /* Close the mobile menu whenever the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* Scroll behavior: solidify past 40px, hide past 200px on the way down. */
  useEffect(() => {
    let raf = 0;
    let previousY = window.scrollY;
    const update = () => {
      raf = 0;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.max(0, Math.min(window.scrollY, maxY));
      setScrolled(y > SCROLL_SOLID_Y);
      if (y <= HIDE_AFTER_Y) {
        setHidden(false);
      } else if (y > previousY + 4) {
        setHidden(true);
      } else if (y < previousY - 2) {
        setHidden(false);
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

  /* Mobile overlay: scroll lock, focus trap, Escape, focus return. */
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      overlay
        ? Array.from(
            overlay.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])'
            )
          )
        : [];
    const first = focusables()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled}
      data-visible={visible}
      onFocusCapture={(event) => setKeyboardFocus(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
      }}
      className="site-header"
    >
      <nav className="site-header-inner" aria-label="Primary">
        <Link
          to="/"
          className="brand-header-link header-stagger shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Torall Ventures — home"
          style={{ "--stagger": "0ms" } as React.CSSProperties}
        >
          <HeaderBrandLockup />
        </Link>

        <div className="site-header-links">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `nav-link header-stagger ${isActive ? "nav-link-active" : ""}`
              }
              style={{ "--stagger": `${(i + 1) * 80}ms` } as React.CSSProperties}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="cta-outline header-stagger"
            style={{ "--stagger": `${(links.length + 1) * 80}ms` } as React.CSSProperties}
          >
            Begin a Conversation
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`menu-button header-stagger ${open ? "menu-button-open" : ""}`}
          style={{ "--stagger": "80ms" } as React.CSSProperties}
        >
          <span aria-hidden="true" className="menu-line menu-line-top" />
          <span aria-hidden="true" className="menu-line menu-line-bottom" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="mobile-overlay"
        >
          <nav aria-label="Mobile" className="mobile-overlay-nav">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `mobile-overlay-link ${isActive ? "mobile-overlay-link-active" : ""}`
                }
                style={{ "--stagger": `${i * 70}ms` } as React.CSSProperties}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="cta-outline mobile-overlay-cta"
              style={{ "--stagger": `${links.length * 70}ms` } as React.CSSProperties}
            >
              Begin a Conversation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
