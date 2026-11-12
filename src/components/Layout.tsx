import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { StudioNav, StudioFooter } from "@/components/studio/StudioChrome";
import { services } from "@/data/services";
import "./studio/studio.css";

const titles: Record<string, string> = {
  "/": "Torall Ventures — Websites, Apps & Custom Systems",
  "/portfolio": "Portfolio — Torall Ventures",
  "/portfolio/lumera": "Lumera — Torall Ventures",
  "/services": "Services — Torall Ventures",
  "/about": "About — Torall Ventures",
  "/contact": "Start a Project — Torall Ventures",
};
const descriptions: Record<string, string> = {
  "/": "Torall Ventures designs and builds websites, applications, and custom systems for businesses and residential communities.",
  "/portfolio":
    "Explore Lumera, an interactive residential website and community portal demonstration by Torall Ventures.",
  "/services":
    "Explore residential websites, business websites, applications, custom management systems, and digital products.",
  "/about":
    "Meet Torall Ventures: a Florida-based digital business connecting considered design with useful technology.",
  "/contact": "Tell Torall Ventures about your next website, application, or business system.",
};

export function Layout() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const service = services.find((item) => pathname === `/services/${item.slug}`);
    document.title =
      titles[pathname] || (service ? `${service.title} — Torall Ventures` : titles["/"]);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        service?.tagline || descriptions[pathname] || descriptions["/portfolio"],
      );
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://torallventures.com${pathname === "/" ? "" : pathname}`;
    if (hash)
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    if (previousPath.current !== pathname)
      document.getElementById("main-content")?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, hash]);
  return (
    <div className={`studio-site${pathname === "/" ? " is-home" : ""}`}>
      <a href="#main-content" className="studio-skip">
        Skip to content
      </a>
      <StudioNav key={pathname} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <StudioFooter />
    </div>
  );
}
