import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { OPEN_CONTOUR_PATHS } from '@/lib/brandGeometry';
import { FeaturedProject, ServiceIndex, StudioInvitation, StudioPrinciples, StudioProcess, StudioQuestions } from '@/components/studio/Studio';
import './home.css';

/**
 * Showroom hero: the approved open-contour mark, sculpted in silver-violet
 * with a green edge, floating over a gray-violet field with green aurora.
 * One entrance animation, no perpetual loop.
 */
function ShowroomContour() {
  const id = useId().replace(/:/g, '');
  return <div className="showroom-contour" aria-hidden="true">
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9e5f4"/><stop offset=".29" stopColor="#a49bc0"/>
          <stop offset=".51" stopColor="#f5f3f9"/><stop offset=".67" stopColor="#6f688a"/>
          <stop offset="1" stopColor="#c9c2da"/>
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#a4c68a"/><stop offset="1" stopColor="#2e4a2c"/>
        </linearGradient>
      </defs>
      <g className="showroom-contour-lines" fill="none" stroke="#cfc8de" strokeWidth=".6">
        <path d="M-80 720C220 420 490 860 830 580S1240 310 1510 480"/>
        <path d="M-80 738C220 438 490 878 830 598S1240 328 1510 498"/>
        <path d="M-80 756C220 456 490 896 830 616S1240 346 1510 516"/>
      </g>
      <g className="showroom-contour-object" transform="translate(875 155) rotate(-16 270 280) scale(3.45)">
        {Array.from({ length: 19 }, (_, index) => <g key={index} transform={`translate(${(18 - index) * .8} ${(18 - index) * 1.05})`} fill="none" stroke={`url(#${id}-edge)`} strokeLinecap="round" strokeLinejoin="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d} strokeWidth={path.width + 1}/>)}</g>)}
        <g fill="none" stroke={`url(#${id}-metal)`} strokeLinecap="round" strokeLinejoin="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d} strokeWidth={path.width}/>)}</g>
        <g fill="none" stroke="#efeaf6" opacity=".45" strokeWidth=".45" transform="translate(-2 -2)" strokeLinecap="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d}/>)}</g>
      </g>
    </svg>
  </div>;
}

function ShowroomHero() {
  return <section id="top" className="studio-hero showroom-hero">
    <ShowroomContour/>
    <div className="studio-wrap studio-hero-content">
      <p className="studio-hero-kicker">The Torall Ventures showroom</p>
      <h1>Digital work,<br/><em>on display.</em></h1>
      <div className="studio-hero-bottom">
        <p>We design and build websites, applications, and custom systems. This is where we show you — not just tell you — what that looks like.</p>
        <div className="studio-actions">
          <Link to="/portfolio" className="studio-button">Explore our work <ArrowUpRight aria-hidden="true"/></Link>
          <Link to="/contact" className="studio-link">Start a project <ArrowRight aria-hidden="true"/></Link>
        </div>
      </div>
      <div className="studio-hero-foot">
        <a href="#showreel">Play the film <ArrowDown aria-hidden="true"/></a>
        <span>Florida based. Built around your world.</span>
      </div>
    </div>
  </section>;
}

/**
 * The services film, treated as the centerpiece of the showroom: autoplaying,
 * muted, no controls. On approach it flies in as a small tilted card and
 * spring-settles into a floating screen — scrubbed by scroll both ways.
 */
function ShowroomFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
    observer.observe(section);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      video.pause();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const update = () => {
      raf = 0;
      if (motion.matches) {
        frame.style.transform = '';
        frame.style.borderRadius = '';
        return;
      }
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const p = Math.min(Math.max((vh - top) / (vh * 0.85), 0), 1);
      // Back-ease-out: overshoots past 1 then springs back — playful, bouncy.
      const c1 = 1.9;
      const f = 1 + (c1 + 1) * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
      const scale = 0.55 + 0.33 * f;
      const rotate = (1 - f) * 10;
      const ty = (1 - f) * 9;
      frame.style.transform = `translate3d(0, ${ty.toFixed(2)}vh, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      frame.style.borderRadius = `${Math.max(12, 26 - 8 * f).toFixed(1)}px`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    motion.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motion.removeEventListener('change', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <section id="showreel" ref={sectionRef} aria-label="Torall Ventures services film" className="showroom-film">
    <div className="showroom-film-inner">
      <div className="studio-film-caption showroom-film-caption">
        <p className="studio-label">From idea to interface</p>
        <p>Websites, communities, and the systems that connect them.</p>
      </div>
      <div ref={frameRef} className="showroom-film-frame">
        <video ref={videoRef} src="/media/torall-website-polished.mp4" poster="/media/torall-website-polished-poster.jpg" width="1920" height="1080" autoPlay muted loop playsInline preload="auto" aria-label="Torall's services: residential websites, business websites, applications, management systems, and custom digital products" onError={() => setFailed(true)}/>
        {failed && <p className="studio-film-error">The film is unavailable. <Link to="/services">Explore our services</Link></p>}
      </div>
    </div>
  </section>;
}

/** Home page — the client showroom. Gray-violet and green only. */
export function HomePage() {
  return <>
    <ShowroomHero/>
    <ShowroomFilm/>
    <FeaturedProject/>
    <ServiceIndex/>
    <StudioProcess/>
    <StudioPrinciples/>
    <StudioQuestions/>
    <StudioInvitation/>
  </>;
}
