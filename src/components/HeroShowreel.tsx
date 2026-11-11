import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router";

export function HeroShowreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wantsPlayback, setWantsPlayback] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    const sync = () => {
      if (wantsPlayback && visible && !document.hidden) {
        void video.play().catch(() => setPlaying(false));
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { if (motion.matches) setWantsPlayback(false); };
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      video.pause();
    };
  }, [wantsPlayback]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setWantsPlayback(false);
      video.pause();
    } else {
      setWantsPlayback(true);
      void video.play().catch(() => setPlaying(false));
    }
  };

  return (
    <section id="showreel" aria-labelledby="showreel-heading" className="relative scroll-mt-20 border-y border-border bg-[#100e15] py-12 sm:py-16">
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">The Torall showreel / All five services</p><h2 id="showreel-heading" className="font-display text-3xl font-medium tracking-tight sm:text-5xl">Every possibility. <span className="text-primary">In motion.</span></h2></div>
        {!failed && <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause showcase reel" : "Play showcase reel"} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border px-5 text-xs text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}{playing ? "Pause reel" : "Play reel"}</button>}
      </div>
      <figure className="mx-auto max-w-[1600px] px-3 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-primary/15 bg-black sm:rounded-2xl">
          <video ref={videoRef} className="block aspect-video w-full object-contain" src="/media/torall-services-reel-v2.mp4" poster="/media/torall-services-poster-v2.jpg" width="1600" height="900" muted loop playsInline controls preload="none" aria-label="Torall Ventures showreel: residential community websites, business websites, business apps, custom management systems, and anything digital" onPlaying={() => setPlaying(true)} onPause={() => { setPlaying(false); }} onError={() => { setFailed(true); setPlaying(false); }} />
        </div>
        <figcaption className="mx-auto mt-5 flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground"><p>Concept imagery, product demonstrations and Lumera footage. Designed to show what’s possible.</p><a href="#services-teaser" className="inline-flex min-h-11 items-center gap-2 text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Explore every service<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></figcaption>
      </figure>
      <div className="mx-auto mt-6 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {[
          ["Residential community websites", "Portals, bookings & resident experiences.", "residential-community-websites"],
          ["Business websites", "Your brand, beautifully built for the web.", "business-websites"],
          ["Business apps", "Web and mobile tools for the way you work.", "business-apps"],
          ["Custom management systems", "Connect operations, clients and teams.", "custom-management-systems"],
          ["Anything digital", "Bring your next product or AI idea to life.", "anything-digital"],
        ].map(([title, description, slug], index) => <Link key={slug} to={`/services/${slug}`} className="group border-t border-border py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><span className="font-mono text-[10px] text-primary">0{index + 1}</span><h3 className="mb-2 mt-3 font-display text-sm font-semibold transition-colors group-hover:text-primary">{title}</h3><p className="text-xs leading-relaxed text-muted-foreground">{description}</p></Link>)}
      </div>
    </section>
  );
}
