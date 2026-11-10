import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { NebulaBackground } from "@/components/NebulaBackground";

/** Reset scroll to top on every page change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
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
