import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export function RevealBlock({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      element.classList.add('is-revealed');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('is-revealed'); observer.disconnect(); }
    }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`agency-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

/** The Torall character stays within its hero composition and never covers navigation. */
export function FloatingTori() {
  return <div className="agency-mascot" aria-hidden="true"><div className="agency-mascot-arrival"><img src="/mascots/tori.webp" width="385" height="433" alt="" fetchPriority="high" /></div></div>;
}

export function QuietVideo({ src, poster, className = '', label }: { src: string; poster: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (visible && !motion.matches && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { rootMargin: '80px' });
    observer.observe(video);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, []);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />;
}

export function MovingPhotoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const paused = useRef(false);
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = 0, visible = false, position = track.scrollLeft;
    const tick = (time: number) => {
      if (visible && !paused.current && !drag.current && !document.hidden && !motion.matches) {
        position += Math.min(32, time - (previous || time)) * .026;
        const loopStart = (track.children[3] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
        if (loopStart && position >= loopStart) position -= loopStart;
        track.scrollLeft = position;
      } else position = track.scrollLeft;
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(track);
    frame = requestAnimationFrame(tick);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  const photos = [
    { image: 'florida.jpg', title: 'Florida', detail: 'Our starting point', alt: 'Miami skyline across the water at sunset' },
    { image: 'ideas.jpg', title: 'Room for ideas', detail: 'Think without limits', alt: 'An open notebook with space for a new idea' },
    { image: 'workspace.jpg', title: 'Better together', detail: 'Design meets technology', alt: 'A bright creative workspace with a chalkboard wall' },
  ];
  return <div ref={ref} className="agency-photo-track" aria-label="Florida, ideas, and creative spaces" tabIndex={0}
    onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }}
    onFocus={() => { paused.current = true; }} onBlur={() => { paused.current = false; }}
    onPointerDown={event => { if (event.pointerType === 'mouse') { drag.current = { x: event.clientX, start: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); } }}
    onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.start - (event.clientX - drag.current.x); }}
    onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
    {[...photos, ...photos].map((photo, index) => <figure key={index} aria-hidden={index >= photos.length || undefined}>
      <img src={`/media/agency/${photo.image}`} alt={index >= photos.length ? '' : photo.alt} width="650" height="390" loading="lazy" decoding="async" draggable={false} />
      <figcaption><span>{photo.title}</span><small>{photo.detail}</small></figcaption>
    </figure>)}
  </div>;
}
