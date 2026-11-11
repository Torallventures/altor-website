import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { lumeraTemplateUrl } from "@/lib/portfolio";

export function HeroShowreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wantsPlayback, setWantsPlayback] = useState(() =>
    window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches
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
    <figure className="hero-reel relative min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> A Torall experience</span>
        <span>01 / Lumera</span>
      </div>
      <div className="relative overflow-hidden rounded-[1.25rem] border border-primary/20 bg-[#17131e] shadow-[0_30px_100px_-35px_#000]">
        <video
          ref={videoRef}
          className="block aspect-[64/45] w-full object-cover"
          src="/media/torall-lumera-reel.mp4"
          poster="/media/torall-lumera-poster.jpg"
          width="1280" height="900"
          muted loop playsInline preload="none"
          aria-label="Lumera showcase demo: architectural footage, community website forms, and the management portal"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100d16]/90 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
          <div><p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-primary">Showcase demo / Residential</p><p className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Living, connected.</p></div>
          {!failed && <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause showcase reel" : "Play showcase reel"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />}
          </button>}
        </div>
      </div>
      <figcaption className="mt-5 flex items-center justify-between gap-5 border-b border-border pb-5">
        <div><p className="font-display text-sm font-medium">From first impression to everyday experience.</p><p className="mt-1.5 text-xs text-muted-foreground">Website. Applications. Community portal.</p></div>
        <a href={lumeraTemplateUrl} aria-label="Explore the Lumera showcase demo" className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}
