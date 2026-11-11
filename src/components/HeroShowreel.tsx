import { useEffect, useRef, useState } from "react";
import { ArrowDown, Maximize, Minimize, Pause, Play } from "lucide-react";
import "./HeroShowreel.css";

export function HeroShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intentRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported] = useState(() => typeof document !== "undefined" && document.fullscreenEnabled);
  const [fullscreenError, setFullscreenError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
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
    }, { threshold: 0.1 });
    const onMotion = () => { intentRef.current = !motion.matches; sync(); };
    const onFullscreen = () => setFullscreen(document.fullscreenElement === section);
    sync();
    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    document.addEventListener("fullscreenchange", onFullscreen);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("fullscreenchange", onFullscreen);
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

  const toggleFullscreen = async () => {
    try {
      setFullscreenError(false);
      if (document.fullscreenElement === sectionRef.current) await document.exitFullscreen();
      else await sectionRef.current?.requestFullscreen();
    } catch { setFullscreenError(true); }
  };

  return (
    <section ref={sectionRef} id="showreel" aria-label="Torall Ventures services film" className="torall-film" data-playing={playing}>
      <video
        ref={videoRef}
        className="torall-film-video"
        src="/media/torall-website-polished.mp4"
        poster="/media/torall-website-polished-poster.jpg"
        width="1920"
        height="1080"
        autoPlay muted loop playsInline preload="metadata"
        aria-label="Torall Ventures: residential community websites, business websites, apps, management systems, and custom digital products"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }}
      />
      <div className="torall-film-controls">
        {!failed && <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause services video" : "Play services video"}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>}
        {fullscreenSupported && <button type="button" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? "Exit full screen" : "View full screen"}>
          {fullscreen ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
          <span className="sr-only">{fullscreen ? "Exit full screen" : "Full screen"}</span>
        </button>}
      </div>
      {fullscreenError && <p role="status" className="torall-film-message">Full screen isn’t available in this browser.</p>}
      {failed && <div role="status" className="torall-film-fallback">
        <p>The film couldn’t load.</p>
        <a href="/media/torall-website-polished.mp4">Open the video</a>
        <a href="#services-teaser">Explore our services <ArrowDown aria-hidden="true" /></a>
      </div>}
      <p className="sr-only">Our five services: residential community websites with resident portals and amenity booking; business websites; web and mobile apps; custom management systems; and custom digital products and AI integrations. Explore each service in the next section.</p>
    </section>
  );
}
