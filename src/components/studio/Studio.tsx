import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { services } from '@/data/services';
import { OPEN_CONTOUR_PATHS } from '@/lib/brandGeometry';
import { lumeraTemplateUrl } from '@/lib/portfolio';

export function PageIntro({ label, title, children }: { label: string; title: ReactNode; children: ReactNode }) {
  return <section className="studio-page-intro studio-wrap"><p className="studio-label">{label}</p><h1>{title}</h1><div className="studio-page-intro-copy">{children}</div></section>;
}

/** A dimensional study of Torall's approved mark. One entrance, no perpetual loop. */
export function ContourStudy({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <div className={`studio-contour ${compact ? 'is-compact' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dbe7d3"/><stop offset=".29" stopColor="#9fb197"/><stop offset=".51" stopColor="#f0f1ed"/><stop offset=".67" stopColor="#697d70"/><stop offset="1" stopColor="#c0b9cc"/></linearGradient><linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#778b77"/><stop offset="1" stopColor="#26372d"/></linearGradient></defs>
      <g className="studio-contour-lines" fill="none" stroke="#c2cfbf" strokeWidth=".6"><path d="M-80 720C220 420 490 860 830 580S1240 310 1510 480"/><path d="M-80 738C220 438 490 878 830 598S1240 328 1510 498"/><path d="M-80 756C220 456 490 896 830 616S1240 346 1510 516"/></g>
      <g className="studio-contour-object" transform="translate(875 155) rotate(-16 270 280) scale(3.45)">
        {Array.from({ length: 19 }, (_, index) => <g key={index} transform={`translate(${(18 - index) * .8} ${(18 - index) * 1.05})`} fill="none" stroke={`url(#${id}-edge)`} strokeLinecap="round" strokeLinejoin="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d} strokeWidth={path.width + 1}/>)}</g>)}
        <g fill="none" stroke={`url(#${id}-metal)`} strokeLinecap="round" strokeLinejoin="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d} strokeWidth={path.width}/>)}</g>
        <g fill="none" stroke="#e3ebdf" opacity=".45" strokeWidth=".45" transform="translate(-2 -2)" strokeLinecap="round">{OPEN_CONTOUR_PATHS.map(path => <path key={path.d} d={path.d}/>)}</g>
      </g>
    </svg>
  </div>;
}

export function FeaturedProject({ detailed = false }: { detailed?: boolean }) {
  return <section id="featured" className={`studio-project ${detailed ? 'is-detailed' : ''}`} aria-labelledby="lumera-title"><div className="studio-wrap">
    <div className="studio-project-top"><p className="studio-label">Featured product / Interactive demonstration</p><span>Residential technology</span></div>
    <div className="studio-project-heading"><div><h2 id="lumera-title">Lumera</h2><p>A better place to connect.</p></div><div><p>A residential website and community portal, designed as one experience. From the first impression to the everyday details of life at home.</p><a href={lumeraTemplateUrl} className="studio-button studio-button-dark">Explore Lumera <ArrowUpRight aria-hidden="true"/></a></div></div>
    <a href={lumeraTemplateUrl} className="studio-product-stage" aria-label="Open the full interactive Lumera website"><div className="studio-product-screen"><div className="studio-browser-bar" aria-hidden="true"><span/><span/><span/><p>Aurelia Residences — a Lumera experience</p><ArrowUpRight/></div><img src="/templates/lumera-desktop.jpg" alt="The actual Lumera homepage: Aurelia Residences, residential architecture, and navigation to its community experience" width="1425" height="990" loading={detailed ? 'eager' : 'lazy'} decoding="async"/></div><span className="studio-project-launch">Step inside <ArrowUpRight aria-hidden="true"/></span></a>
    <div className="studio-project-foot"><div><span>Public website</span><span>Resident portal</span><span>Management workflows</span></div>{!detailed && <Link to="/portfolio" className="studio-link">The complete experience <ArrowRight aria-hidden="true"/></Link>}{detailed && <span>Explore seven roles and three visual themes</span>}</div>
  </div></section>;
}

export function ServiceIndex({ full = false }: { full?: boolean }) {
  return <section id="services" className="studio-services studio-wrap">
    {!full && <div className="studio-section-head"><p className="studio-label">What we build</p><div><h2>Good design opens doors.<br/>Good technology keeps them open.</h2><p>From a first website to the systems behind your operations, we bring the experience and its foundations together.</p></div></div>}
    <div className="studio-service-list">{services.map(service => <article key={service.slug} className="studio-service-row"><Link to={`/services/${service.slug}`} className="studio-service-name"><service.icon aria-hidden="true" strokeWidth={1.2}/><h2>{service.title}</h2><ArrowUpRight aria-hidden="true"/></Link><div><p>{service.overview}</p>{full ? <ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul> : <Link className="studio-link" to={`/services/${service.slug}`}>Explore this service <ArrowRight aria-hidden="true"/></Link>}</div></article>)}</div>
  </section>;
}

export function StudioProcess() {
  const steps = [
    ['Understand', 'Start with the people, the business, and the problem. Agree on what needs to work before deciding how it should look.'],
    ['Shape', 'Connect content, structure, and visual design in an experience you can review and refine.'],
    ['Build', 'Develop the website or system around the agreed priorities, with clear milestones and working versions.'],
    ['Move forward', 'Prepare for launch, make the handover practical, and plan the next improvements around real use.'],
  ];
  return <section id="process" className="studio-process"><div className="studio-wrap"><div className="studio-section-head"><p className="studio-label">Our approach</p><div><h2>Clear at every step.</h2><p>You should understand what we’re building, why it matters, and what comes next.</p></div></div><ol>{steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>;
}

export function StudioPrinciples() {
  return <section className="studio-principles studio-wrap"><p className="studio-label">The way we think</p><div><h2>Make the complicated<br/>feel considered.</h2><p className="studio-lead">A useful product starts with understanding the people who will use it. Every layout, interaction, and technical decision should make their next step easier.</p><div className="studio-principle-list">{[
    ['Clarity before complexity', 'A clear journey, readable content, and the right features. More software is not always the answer.'],
    ['Design and development together', 'The visual experience and the underlying system are considered together, from the beginning.'],
    ['Built around your business', 'Your language, your workflows, and your priorities shape the product. Technology should support how you work.'],
  ].map(([name, text]) => <article key={name}><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>;
}

export function StudioQuestions() {
  return <section className="studio-questions studio-wrap"><div><p className="studio-label">Before we begin</p><h2>A few useful answers.</h2></div><div>{[
    ['Do I need a finished brief?', 'No. Tell us what your business does, who the experience is for, and what you want to improve. A few priorities or examples are enough to start the conversation.'],
    ['Can you work with an existing website or system?', 'Yes. We can discuss a focused improvement, a full redesign, or an integration with the tools you already use. We begin by understanding what works and what needs to change.'],
    ['How are timing and cost decided?', 'The scope, content, integrations, and level of customization determine the plan. We agree on the priorities and deliverables before discussing timing and cost.'],
    ['Can I explore a working example?', 'Lumera is our interactive residential website and portal demonstration. Open it from the portfolio to try public pages, forms, resident experiences, management roles, and visual themes.'],
  ].map(([question, answer]) => <details key={question}><summary>{question}<Plus aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></section>;
}

export function StudioInvitation() {
  return <section className="studio-invitation studio-wrap"><p className="studio-label">Your next chapter</p><h2>What could work<br/>better for you?</h2><div><p>A new website. A simpler workflow. An idea ready to become something useful. Let’s find the right place to start.</p><Link to="/contact" className="studio-button">Start a conversation <ArrowUpRight aria-hidden="true"/></Link></div></section>;
}
