import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { ParticleController } from './cinematic/renderer';
import './CinematicParticles.css';

/** Full-bleed decorative scene; the GPU module never blocks the hero's copy. */
export function CinematicParticles() {
  const host = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLSpanElement>(null);
  const index = useRef<HTMLSpanElement>(null);
  const controller = useRef<ParticleController | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const stage = host.current;
    const composition = stage?.closest('section')?.querySelector<HTMLElement>('.particle-composition');
    if(!stage || !composition || !caption.current || !index.current) return;
    if(import.meta.env.DEV && new URLSearchParams(location.search).get('particleMode') === 'fallback') return;
    import('./cinematic/renderer').then(({ mountParticles }) => {
      if(disposed) return;
      controller.current = mountParticles({ host:stage, composition, caption:caption.current!, index:index.current!,
        onReady:() => { if(!disposed) setReady(true); }, onFailure:() => { if(!disposed) setReady(false); } });
      controller.current.setPaused(pausedRef.current);
    }).catch(() => { /* The inline illustration remains visible without WebGL. */ });
    return () => { disposed=true; controller.current?.dispose(); controller.current=null; };
  }, []);

  function toggle() {
    pausedRef.current=!pausedRef.current;
    setPaused(pausedRef.current);
    controller.current?.setPaused(pausedRef.current);
  }

  return <>
    <div ref={host} className="cinematic-particles" data-ready={ready}>
      <div className="particle-fallback" aria-hidden="true">
        <img src="/media/torall-particle-fallback.svg" alt="" width="800" height="560" />
      </div>
    </div>
    <div className="particle-readability" aria-hidden="true"/>
    <div className="particle-caption">
      <div aria-hidden="true" className="particle-caption-copy"><span ref={index} className="particle-index">01 / 05</span><span ref={caption}>Ideas with a trajectory.</span></div>
      {ready && <button type="button" onClick={toggle} aria-label={paused ? 'Play particle animation' : 'Pause particle animation'} aria-pressed={paused} className="particle-playback">{paused ? <Play aria-hidden="true"/> : <Pause aria-hidden="true"/>}</button>}
    </div>
  </>;
}
