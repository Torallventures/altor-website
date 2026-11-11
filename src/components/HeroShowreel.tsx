import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";

const chapters = [
  { title: "Communities, connected.", service: "Residential community websites", intro: "A better everyday. From your first visit to your resident portal." },
  { title: "First impressions. Lasting impact.", service: "Business websites", intro: "Distinctive websites that bring your brand to life." },
  { title: "Your business. In motion.", service: "Business apps", intro: "Web and mobile experiences built around the way you work." },
  { title: "Less friction. More flow.", service: "Custom management systems", intro: "Connect your operations, clients and teams in one place." },
  { title: "What if, made possible.", service: "Anything digital", intro: "From your next big idea to custom products and AI integrations." },
];

function chapterAt(time: number) {
  if (time >= 25.6 || time < 4.8) return 0;
  if (time < 10) return 1;
  if (time < 15.2) return 2;
  if (time < 20.4) return 3;
  return 4;
}

export function HeroShowreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intentRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    intentRef.current = !motion.matches;
    let visible = false;
    const sync = () => {
      if (intentRef.current && visible && !document.hidden) {
        if (video.paused) void video.play().catch(() => setPlaying(false));
      } else if (!video.paused) video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    const onMotion = () => { intentRef.current = !motion.matches; sync(); };
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    intentRef.current = video.paused;
    if (intentRef.current) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  const current = chapters[chapter];

  return (
    <section id="showreel" aria-label="Torall services in motion" className="relative h-[calc(100svh-5rem)] min-h-[540px] w-full overflow-hidden bg-[#100e15] sm:min-h-[600px]">
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" src="/media/torall-services-film.mp4" poster="/media/torall-services-film-poster.jpg" width="1280" height="720" muted loop playsInline preload="auto" aria-label="Cinematic overview of Torall’s five services, featuring concept imagery and Lumera footage" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={(event) => setChapter(chapterAt(event.currentTarget.currentTime))} onError={() => { setFailed(true); setPlaying(false); }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100e15]/95 via-[#100e15]/15 to-[#100e15]/20" />
      <div className="absolute inset-x-0 top-7 mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 sm:top-10 sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">Torall Ventures / What we build</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/65">0{chapter + 1} / 05</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-6 pt-20 sm:px-8 sm:pb-10">
        <div key={chapter} className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs">{current.service}</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.1rem,5.4vw,4.8rem)] font-medium leading-[1.06] tracking-[-0.035em] text-white">{current.title}</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg">{current.intro}</p>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 sm:mt-10">
          <a href="#services-teaser" className="inline-flex min-h-11 items-center gap-3 text-xs font-medium text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Explore our services<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
          <div className="flex items-center gap-5"><span className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-white/50 sm:block">Concept imagery &amp; Lumera demo footage</span>{!failed && <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause services video" : "Play services video"} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-black/15 px-4 text-xs text-white backdrop-blur-sm transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}{playing ? "Pause" : "Play"}</button>}</div>
        </div>
        <p className="mt-2 text-[8px] uppercase tracking-wider text-white/45 sm:hidden">Concept imagery &amp; Lumera demo footage</p>
      </div>
      <p className="sr-only">Residential community websites, business websites, business apps, custom management systems, and anything digital. Detailed descriptions follow this video.</p>
    </section>
  );
}
