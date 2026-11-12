import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Outlet, useLocation } from "react-router";
import { AgencyNav, AgencyFooter } from '@/components/agency/AgencyChrome';
import '@/components/agency/agency.css';
import { PageMetadata } from "@/components/PageMetadata";

/** Smooth wheel/anchor scrolling, resetting on navigation without stale momentum. */
function ScrollToTop() {
  const { key, hash } = useLocation();
  const firstVisit=useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if(!firstVisit.current) document.getElementById('main-content')?.focus({preventScroll:true});
    firstVisit.current=false;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if(hash) document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'instant'});
      return;
    }
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
      stopInertiaOnNavigate: true,
      allowNestedScroll: true,
    });
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    lenis.scrollTo(target || 0, { immediate: true, offset: target ? -80 : 0 });
    return () => lenis.destroy();
  }, [key, hash]);
  return null;
}

export function Layout() {
  return (
    <div className="agency-site min-h-[100dvh]">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <AgencyNav />
      <div className="relative z-10">
        <ScrollToTop />
        <PageMetadata />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <AgencyFooter />
      </div>
    </div>
  );
}
