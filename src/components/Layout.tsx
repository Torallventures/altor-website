import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { NebulaBackground } from "@/components/NebulaBackground";

/** Smooth wheel/anchor scrolling, resetting on navigation without stale momentum. */
function ScrollToTop() {
  const { key, hash } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
    <div className="min-h-[100dvh]">
      <NebulaBackground />
      <Navbar />
      <div className="relative z-10">
        <ScrollToTop />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
