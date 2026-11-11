import { useEffect, useRef, useState } from 'react';
import type { ParticleController } from './cinematic/renderer';
import './CinematicParticles.css';

/** Full-bleed decorative scene; the GPU module never blocks the hero's copy. */
export function CinematicParticles() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<ParticleController | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const stage = host.current;
    if(!stage) return;
    if(import.meta.env.DEV && new URLSearchParams(location.search).get('particleMode') === 'fallback') return;
    import('./cinematic/renderer').then(({ mountParticles }) => {
      if(disposed) return;
      controller.current = mountParticles({ host:stage,
        onReady:() => { if(!disposed) setReady(true); }, onFailure:() => { if(!disposed) setReady(false); } });
    }).catch(() => { /* The inline illustration remains visible without WebGL. */ });
    return () => { disposed=true; controller.current?.dispose(); controller.current=null; };
  }, []);

  return <>
    <div ref={host} className="cinematic-particles" data-ready={ready}>
      <div className="particle-fallback" aria-hidden="true">
        <img src="/media/torall-particle-fallback.svg" alt="" width="1440" height="900" />
      </div>
    </div>
    <div className="particle-readability" aria-hidden="true"/>
  </>;
}
