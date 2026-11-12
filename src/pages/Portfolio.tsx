import { useSearchParams } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { FeaturedProject, PageIntro, StudioInvitation } from '@/components/studio/Studio';
import { lumeraTemplateUrl } from '@/lib/portfolio';
const perspectives = [
  { id: 'website', label: 'The first impression', title: 'A place worth discovering.', text: 'A cinematic homepage, considered typography, and a clear path through the residence and its amenities. The public website introduces the community before a visitor ever steps inside.', features: ['Cinematic architecture homepage', 'Amenities and residence pages', 'Three customizable visual themes'] },
  { id: 'residents', label: 'Everyday living', title: 'The community, close at hand.', text: 'Explore the interactive resident portal and see how community information, requests, and everyday services can come together in a familiar experience.', features: ['Interactive resident portal', 'Forms and application workflows', 'AI concierge preview'] },
  { id: 'management', label: 'Behind the scenes', title: 'A clearer view of the details.', text: 'Switch between seven roles to explore different responsibilities. Follow applications, work with the forms builder, and see how the management experience connects to the public website.', features: ['Seven role demonstrations', 'Forms builder and application review', 'Management dashboards and cost comparison'] },
];
export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const current = perspectives.find(item => item.id === params.get('view')) || perspectives[0];
  const select = (id: string) => setParams(previous => { const next = new URLSearchParams(previous); next.set('view', id); return next; }, { replace: true, preventScrollReset: true });
  return <><PageIntro label="Our portfolio" title={<>Less imagining.<br/>More experiencing.</>}><p>Explore what thoughtful design and connected technology can make possible. Lumera is our interactive residential product demonstration, ready to step inside.</p></PageIntro><FeaturedProject detailed/>
    <section className="studio-product-story studio-wrap"><div className="studio-section-head"><p className="studio-label">Inside Lumera</p><div><h2>One community.<br/>Every perspective.</h2><p>Follow the experience from a first visit to the public website through resident life and day-to-day administration.</p></div></div>
    <div className="studio-product-explore"><div className="studio-product-reel"><video src="/media/torall-lumera-reel.mp4" poster="/media/torall-lumera-poster.jpg" width="1920" height="1080" controls muted playsInline preload="none" aria-label="Video introduction to the Lumera residential experience"/><p>Explore the full website to try its interactive features.</p></div><div>
    <div className="studio-tabs" role="tablist" aria-label="Explore Lumera perspectives" onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = perspectives.indexOf(current);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? perspectives.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + perspectives.length) % perspectives.length;
      select(perspectives[next].id);
      document.getElementById(`tab-${perspectives[next].id}`)?.focus();
    }}>{perspectives.map(item => <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={current.id === item.id} aria-controls={`panel-${item.id}`} tabIndex={current.id === item.id ? 0 : -1} onClick={() => select(item.id)}>{item.label}</button>)}</div>
    <div className="studio-tab-panel" key={current.id} id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0}><h3>{current.title}</h3><p>{current.text}</p><ul>{current.features.map(feature => <li key={feature}><Check aria-hidden="true"/>{feature}</li>)}</ul><a href={lumeraTemplateUrl} className="studio-link">Open the interactive demo <ArrowUpRight aria-hidden="true"/></a></div></div></div></section>
    <section className="studio-product-note studio-wrap"><h2>A starting point.<br/>An experience of your own.</h2><p>Lumera shows how a community’s website, portal, and workflows can fit together. Branding, content, and functionality can be shaped around the needs of a different community. Demonstrated transactions and AI messaging are previews.</p></section><StudioInvitation/></>;
}
