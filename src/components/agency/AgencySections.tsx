import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { services } from '@/data/services';
import { OpenContour } from '@/components/BrandIdentity';
import { lumeraTemplateUrl } from '@/lib/portfolio';
import { FloatingTori, MovingPhotoStrip, QuietVideo, RevealBlock } from './AgencyMotion';
import { values, workItems, type WorkItem } from './content';

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="agency-section-label"><span>{number}</span>{children}</p>;
}

export function AgencyHero() {
  return <section id="top" className="agency-hero">
    <div className="agency-hero-art" aria-hidden="true"><div className="agency-orbit orbit-one"/><div className="agency-orbit orbit-two"/><div className="agency-orbit orbit-three"/><FloatingTori/><span className="agency-art-note">Good ideas deserve<br />a world of their own.</span><span className="agency-art-coordinate">DESIGN × TECHNOLOGY</span></div>
    <div className="agency-container">
      <p className="agency-hero-eyebrow"><span/>Independent thinking. Connected experiences.</p>
      <h1><span>We’re Torall,</span><span>turning big ideas</span><span>into what’s next.</span></h1>
      <p className="agency-intro">Websites, applications, and systems built around your business. Thoughtfully designed. Beautifully connected. Ready for what comes next.</p>
      <div className="agency-hero-actions"><Link to="/#work" className="agency-pill is-solid">Explore our work <ArrowUpRight aria-hidden="true"/></Link><Link to="/#get-in-touch" className="agency-text-link">Start a conversation <ArrowRight aria-hidden="true"/></Link></div>
      <div className="agency-hero-baseline"><Link to="/#showreel">A look at what we do <ArrowDown aria-hidden="true"/></Link><p>Based in Florida <span>·</span> Working everywhere</p></div>
    </div>
  </section>;
}

export function TypeMarquee({ compact = false }: { compact?: boolean }) {
  const words = compact ? [['ideas', 'IN MOTION'], ['what’s', 'NEXT']] : [['thoughtful', 'DESIGN'], ['useful', 'TECHNOLOGY'], ['connected', 'EXPERIENCES']];
  return <section className={`agency-marquee ${compact ? 'is-compact' : ''}`} aria-label={compact ? 'Ideas in motion. What comes next.' : 'Thoughtful design. Useful technology. Connected experiences.'}>
    {!compact && <p>This is how we build</p>}
    {words.map(([small, large], index) => <div key={large} className={`agency-marquee-row row-${index}`} aria-hidden="true"><div className="agency-marquee-track">
      {[0, 1, 2, 3].map(copy => <span key={copy}><small>{small}</small><strong>{large}</strong></span>)}
    </div></div>)}
  </section>;
}

function WorkLink({ item, children, className }: { item: WorkItem; children: ReactNode; className: string }) {
  return item.external ? <a className={className} href={item.href} aria-label={`Explore ${item.title}: ${item.detail}`}>{children}</a> : <Link className={className} to={item.href} aria-label={`Explore ${item.title}: ${item.detail}`}>{children}</Link>;
}

export function WorkGrid({ collection = false, filter = 'All' }: { collection?: boolean; filter?: string }) {
  const items = workItems.filter(item => filter === 'All' || item.category === filter);
  return <div className={`agency-work-grid ${collection ? 'is-collection' : ''} ${filter !== 'All' ? 'is-filtered' : ''}`}>
    {items.map((item, index) => <RevealBlock className={`agency-work-cell work-cell-${workItems.indexOf(item)}`} key={item.title} delay={(index % 3) * 90}>
      <WorkLink item={item} className="agency-work-card">
        {item.video ? <QuietVideo src={item.video} poster={item.image} label="Lumera condominium website and resident portal" /> : <img src={item.image} alt={item.title} width="1000" height="620" loading="lazy" decoding="async" />}
        {item.external && <span className="agency-work-wordmark" aria-hidden="true">Lumera</span>}
        <span className="agency-work-open" aria-hidden="true"><ArrowUpRight/></span>
        {workItems.indexOf(item) === 0 && <span className="agency-work-badge">Interactive demo</span>}
      </WorkLink>
      <div className="agency-work-caption"><div className="agency-work-meta"><span>{item.external ? 'Featured experience' : item.href === '/contact' ? 'Your next project' : 'What we build'}</span><span>{String(workItems.indexOf(item) + 1).padStart(2,'0')}</span></div><WorkLink item={item} className="agency-work-title">{collection ? <h2>{item.title}</h2> : <h3>{item.title}</h3>}<ArrowUpRight aria-hidden="true"/></WorkLink><p>{item.detail}</p>{item.external && <Link to="/portfolio/lumera">Inside the experience <ArrowRight aria-hidden="true" /></Link>}</div>
    </RevealBlock>)}
  </div>;
}

export function SelectedWork() {
  return <section id="work" className="agency-selected agency-container">
    <RevealBlock className="agency-section-heading"><div><SectionLabel number="01">Work & possibilities</SectionLabel><h2 className="agency-heading">Ideas you can<br /><em>step inside.</em></h2></div><p className="agency-subheading">Explore Lumera, our interactive community experience, and the digital possibilities we can create for your business.</p></RevealBlock>
    <WorkGrid />
    <Link to="/portfolio" className="agency-pill">Explore our portfolio <ArrowUpRight aria-hidden="true" /></Link>
  </section>;
}

export function SectorWall() {
  return <section className="agency-sectors agency-container" aria-labelledby="sectors-heading">
    <h2 id="sectors-heading">Different businesses.<br />The same attention to detail.</h2>
    <div>{['Residential communities', 'Professional services', 'Hospitality & retail', 'Growing businesses', 'Member organizations', 'New ventures'].map(name => <span className="agency-sector" key={name}>{name}</span>)}</div>
  </section>;
}

function ValueArt({ kind }: { kind: string }) {
  return <svg className={`agency-value-art art-${kind}`} viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'orbit' && <><ellipse className="art-rotate" cx="120" cy="120" rx="92" ry="37" transform="rotate(-35 120 120)"/><ellipse cx="120" cy="120" rx="48" ry="91" transform="rotate(-35 120 120)"/><circle cx="120" cy="120" r="42"/><circle className="art-dot" cx="46" cy="159" r="9" fill="currentColor"/><path d="M105 115h1m28 0h1m-31 15q16 20 32 0"/></>}
    {kind === 'spark' && <><path className="art-rotate" d="m120 20 16 64 50-40-26 59 65 17-65 17 26 59-50-40-16 64-16-64-50 40 26-59-65-17 65-17-26-59 50 40Z"/><circle cx="120" cy="120" r="26"/><path d="M108 118h1m22 0h1m-25 10q13 12 26 0"/></>}
    {kind === 'layers' && <><g className="art-lift"><path d="m120 35 82 47-82 47-82-47zM38 82v22l82 48 82-48V82"/></g><path d="m38 123 82 47 82-47M38 150l82 47 82-47M38 176l82 47 82-47M120 129v94"/><circle className="art-dot" cx="120" cy="82" r="12"/></>}
    {kind === 'network' && <><path className="art-dash" d="m120 40 70 50v75l-70 40-70-40V90zM50 90l140 75M190 90 50 165M120 40v165"/>{[[120,40],[190,90],[190,165],[120,205],[50,165],[50,90],[120,125]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="14" className="art-node"/>)}<circle cx="120" cy="125" r="28"/></>}
    {kind === 'focus' && <><g className="art-rotate"><circle cx="120" cy="120" r="85"/><path d="M120 35 78 105l-40 38M205 120l-75-40-25-44M120 205l42-74 40-36M35 120l73 42 25 40"/></g><circle cx="120" cy="120" r="28" className="art-pulse"/><path d="m109 121 8 8 16-19"/></>}
    {kind === 'smile' && <><path className="art-float" d="M120 203C20 151 25 91 52 62c25-26 53-12 68 9 15-21 43-35 68-9 27 29 32 89-68 141Z"/><path d="M90 112v8m60-8v8m-60 21q30 34 60 0"/><path className="art-rays" d="m35 28 10 13m155-13-10 13M120 10v15"/></>}
  </svg>;
}

export function AgencyValues() {
  const [active, setActive] = useState<number | null>(null);
  return <section id="approach" className="agency-values agency-container">
    <RevealBlock className="agency-section-heading"><div><SectionLabel number="03">The thinking behind the work</SectionLabel><h2 className="agency-heading">Considered.<br /><em>In every detail.</em></h2></div><p className="agency-subheading">The best experiences feel simple because someone has thought carefully about what matters.</p></RevealBlock>
    <div className="agency-values-grid">{values.map((value, index) => <RevealBlock key={value.name} delay={(index % 3) * 80}>
      <button type="button" className={`agency-value ${active === index ? 'is-active' : ''}`} aria-pressed={active === index} onClick={() => setActive(active === index ? null : index)}>
        <div className="agency-value-stage"><p>{value.statement}</p><ValueArt kind={value.kind} /></div>
        <span className="agency-value-name"><i aria-hidden="true"/>{value.name}</span>
      </button>
    </RevealBlock>)}</div>
  </section>;
}

export function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return <section id="services" className="agency-services"><div className="agency-container">
    <RevealBlock className="agency-section-heading"><div><SectionLabel number="02">Our capabilities</SectionLabel><h2 className="agency-heading">Built to look good.<br /><em>Made to work.</em></h2></div><p className="agency-subheading">One connected approach to design and development. Open a service to explore what’s possible.</p></RevealBlock>
    <div className="agency-service-list">{services.map((service, index) => {
      const expanded = open === service.slug;
      return <article key={service.slug} className={`agency-service ${expanded ? 'is-open' : ''}`}>
        <h3><button type="button" onClick={() => setOpen(expanded ? null : service.slug)} aria-expanded={expanded} aria-controls={`agency-service-${service.slug}`} aria-labelledby={`service-title-${service.slug}`} aria-describedby={`service-overview-${service.slug}`}><span className="agency-service-number" aria-hidden="true">0{index + 1}</span><span id={`service-title-${service.slug}`} className="agency-service-title">{service.title}</span><span id={`service-overview-${service.slug}`} className="agency-service-overview">{service.overview}</span><ArrowDownRight aria-hidden="true"/></button></h3>
        <div id={`agency-service-${service.slug}`} className="agency-service-expansion" inert={!expanded} aria-hidden={!expanded}><div><div className="agency-service-details"><ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link to={`/services/${service.slug}`}>Explore {service.title.toLowerCase()} <ArrowUpRight aria-hidden="true" /></Link><Link to={`/contact?service=${service.slug}`}>Talk about your project <ArrowRight aria-hidden="true" /></Link></div></div></div>
      </article>;
    })}</div>
    <div className="agency-studio-strip"><div><h2>Rooted in Florida.<br />Thinking everywhere.</h2><p>A local starting point.<br />A world of possibilities.</p><Link to="/about">Meet Torall <ArrowUpRight aria-hidden="true" /></Link></div><MovingPhotoStrip /></div>
  </div></section>;
}

export function StudioStatement({ about = false }: { about?: boolean }) {
  return <>
    {!about && <div className="agency-line-interlude" aria-hidden="true"><OpenContour decorative/><OpenContour decorative/></div>}
    <section className={`agency-studio-image ${about ? 'is-about' : ''}`} aria-label="Creative space"><img src="/media/agency/workspace.jpg" alt="A creative workspace filled with natural light, shared desks, and a wall of ideas" width="3000" height="2000" loading={about ? 'eager' : 'lazy'} decoding="async" />{about ? <div className="agency-studio-caption"><p className="agency-eyebrow">The people behind the possibilities</p><h1>Good ideas.<br />Better together.</h1></div> : <div className="agency-studio-caption"><p className="agency-eyebrow">A shared way of thinking</p><h2>Design with intent.<br />Build with care.</h2><Link className="agency-pill" to="/about">Get to know Torall <ArrowUpRight aria-hidden="true"/></Link></div>}</section>
  </>;
}

export function LumeraFeature() {
  return <section id="lumera-feature" className="agency-feature"><TypeMarquee compact/><RevealBlock className="agency-feature-card"><div className="agency-feature-image"><QuietVideo src="/media/torall-lumera-reel.mp4" poster="/media/torall-lumera-poster.jpg" label="A look inside Lumera"/><span>Lumera<span>Connected living.</span></span></div><div className="agency-feature-copy"><p className="agency-eyebrow">Inside the experience</p><h2>One community.<br />An entire digital world.</h2><p>Lumera brings the public website, resident portal, forms, and everyday workflows together. Explore seven perspectives and discover what a connected community can feel like.</p><a href={lumeraTemplateUrl}>Explore Lumera <ArrowUpRight aria-hidden="true" /></a></div></RevealBlock></section>;
}

export function ProjectSteps() {
  const steps = [['Discover', 'Start with your business, the people you serve, and what needs to work better.'], ['Design', 'Turn the priorities into a clear structure, a visual direction, and an experience you can explore.'], ['Develop', 'Bring the design and functionality together, with useful milestones and clear decisions along the way.'], ['Evolve', 'Launch a considered first release, learn from real use, and build on what works.']];
  return <section id="process" className="agency-process agency-container"><SectionLabel number="04">How we get there</SectionLabel><h2 className="agency-heading">From first thought<br /><em>to everyday use.</em></h2><div>{steps.map(([title, description], index) => <RevealBlock key={title} delay={index * 80}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><Plus aria-hidden="true" /></RevealBlock>)}</div></section>;
}

export function AgencyQuestions() {
  const questions = [
    ['I have an idea, but no technical brief. Where do I start?', 'Start with the people you want to help and what you want to achieve. A short description, your priorities, and a few examples you like are enough to begin a conversation.'],
    ['Can you improve an existing website or system?', 'Yes. We can start with what you already have, understand what works, and discuss where a redesign, better workflow, or integration would make a useful difference.'],
    ['How do we decide on scope, timing, and cost?', 'Together, we define the features, content, integrations, and level of customization. That gives us a clear basis for discussing a delivery plan and project cost before work begins.'],
    ['Can I try an example?', 'Absolutely. Lumera is our interactive condominium website and portal demonstration. Explore it from the portfolio to see public pages, forms, and resident and management workflows in context.'],
  ];
  return <section className="agency-questions agency-container"><div><SectionLabel number="05">Before we begin</SectionLabel><h2 className="agency-heading">Good questions.<br /><em>Clear answers.</em></h2><Link className="agency-text-link" to="/contact">Ask us something <ArrowUpRight aria-hidden="true"/></Link></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></section>;
}
