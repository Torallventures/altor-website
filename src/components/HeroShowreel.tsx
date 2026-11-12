import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import "./HeroShowreel.css";

/**
 * Full-page autoplaying film. On its way in, the frame pops up from a
 * smaller rounded card into a full-bleed screen, scrubbed by scroll.
 */
export function HeroShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  /* Autoplay while visible. */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!motion.matches && visible && !document.hidden) {
        if (video.paused) void video.play().catch(() => {});
      } else if (!video.paused) video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    const onMotion = () => sync();
    sync();
    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      video.pause();
    };
  }, []);

  /* Scroll-scrubbed pop-up: rounded card → full-bleed as it enters. */
  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (motion.matches) {
        frame.style.transform = "";
        frame.style.borderRadius = "";
        return;
      }
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const p = Math.min(Math.max((vh - top) / (vh * 0.85), 0), 1);
      const scale = 0.78 + 0.22 * p;
      const radius = 26 * (1 - p);
      frame.style.transform = `scale(${scale})`;
      frame.style.borderRadius = `${radius}px`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motion.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="showreel" aria-label="Torall Ventures services film" className="torall-film">
      <div ref={frameRef} className="torall-film-frame">
        <video
          ref={videoRef}
          className="torall-film-video"
          src="/media/torall-website-polished.mp4"
          poster="/media/torall-website-polished-poster.jpg"
          width="1920"
          height="1080"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Torall Ventures: residential community websites, business websites, apps, management systems, and custom digital products"
          onError={() => setFailed(true)}
        />
        {failed && <div role="status" className="torall-film-fallback">
          <p>The film couldn’t load.</p>
          <a href="/media/torall-website-polished.mp4">Open the video</a>
          <a href="#services-teaser">Explore our services <ArrowDown aria-hidden="true" /></a>
        </div>}
      </div>
      <p className="sr-only">Our five services: residential community websites with resident portals and amenity booking; business websites; web and mobile apps; custom management systems; and custom digital products. Explore each service in the next section.</p>
    </section>
  );
}
