import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import "./HeroShowreel.css";

/** Full-page autoplaying film. No controls — it simply plays. */
export function HeroShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

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

  return (
    <section ref={sectionRef} id="showreel" aria-label="Torall Ventures services film" className="torall-film">
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
      <p className="sr-only">Our five services: residential community websites with resident portals and amenity booking; business websites; web and mobile apps; custom management systems; and custom digital products. Explore each service in the next section.</p>
    </section>
  );
}
