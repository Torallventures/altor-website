import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";

/** Restores scroll position on navigation; native behavior, no scroll jacking. */
function ScrollToTop() {
  const { key, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [key, hash]);
  return null;
}

export function Layout() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <a href="#main-content" className="skip-link label-caps">
        Skip to content
      </a>
      <Navbar />
      <ScrollToTop />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
