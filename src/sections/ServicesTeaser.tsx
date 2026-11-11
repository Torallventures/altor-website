import { Link } from "react-router";
import { useState, type ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Check, Orbit, CalendarDays, KeyRound, Bell, Package, Sparkles, LayoutGrid, MessageSquare, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import "./ServicesTeaser.css";

const labels = ["Communities", "Websites", "Apps", "Management", "Anything digital"];

/** All five capabilities share one compact, keyboard-accessible showcase. */
export function ServicesTeaser() {
  const headRef = useReveal<HTMLDivElement>();
  const [activeService, setActiveService] = useState(services[0].slug);

  return (
    <section id="services-teaser" className="services-showcase services-widget relative" aria-labelledby="services-heading">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal-left flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-primary-deep">What we do</p>
            <h2 id="services-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              If it&apos;s digital, <span className="text-primary">we build it.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Five ways to move your business forward. Choose a service to explore.</p>
          </div>
          <Link to="/portfolio" className="group inline-flex items-center gap-2 rounded-md font-display text-sm font-semibold text-primary-deep hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Explore our portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Tabs.Root value={activeService} onValueChange={setActiveService} className="services-widget-frame">
          <Tabs.List className="services-widget-tabs" aria-label="Our services">
            {services.map((item, index) => (
              <Tabs.Trigger key={item.slug} value={item.slug} onClick={() => setActiveService(item.slug)} className="services-widget-tab" aria-label={item.title}>
                <item.icon aria-hidden="true" />
                <span>{labels[index]}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {services.map((item, index) => (
            <Tabs.Content key={item.slug} value={item.slug} className="services-widget-content">
              <ServicePanel item={item} index={index} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}

function ServicePanel({ item, index }: { item: (typeof services)[number]; index: number }) {
  return (
    <article className="services-stage" aria-labelledby={`service-heading-${item.slug}`}>
      <div className="services-panel">
        <div className="services-copy relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:py-20">
          <p className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary"><Orbit className="h-4 w-4" /> Built around your world</p>
          <h3 id={`service-heading-${item.slug}`} className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{item.title}</h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{item.tagline}</p>
          <ul className="mt-7 space-y-3">
            {item.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}
          </ul>
          <Link to={`/services/${item.slug}`} className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            Explore this service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="services-universe" aria-hidden="true">
          <div className="services-aura" /><div className="services-grid" />
          <ServiceVisual index={index} />
        </div>
      </div>
      <div className="services-caption"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {labels[index]}</span><span>0{index + 1} / 0{services.length}</span></div>
    </article>
  );
}

function BrowserBar({ label }: { label: string }) {
  return <div className="mock-browser-bar"><span /><span /><span /><small>{label}</small></div>;
}

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mock-phone ${className}`}><div className="mock-phone-camera" /><div className="mock-phone-screen">{children}</div><div className="mock-phone-home" /></div>;
}

/** Original interface concepts, with a real Lumera screenshot in the community scene. */
function ServiceVisual({ index }: { index: number }) {
  return (
    <div className={`product-scene product-scene-${index}`}>
      {index === 0 && <>
        <div className="mock-laptop">
          <div className="mock-laptop-screen"><BrowserBar label="LUMERA / AURELIA RESIDENCES" /><img src="/templates/lumera-desktop.jpg" alt="" width="1425" height="990" loading="lazy" decoding="async" /><div className="mock-community-caption"><small>CONSIDERED LIVING</small><strong>Life, beautifully<br />connected.</strong><span>Explore your community <ArrowUpRight /></span></div></div>
          <div className="mock-laptop-base" />
        </div>
        <Phone className="mock-community-phone">
          <div className="mock-phone-brand">LUMERA<span>RESIDENT PORTAL</span></div>
          <p className="mock-eyebrow">YOUR COMMUNITY, CONNECTED</p><h4>Welcome<br />home.</h4>
          <div className="mock-amenities"><span><CalendarDays />Amenities</span><span><KeyRound />Requests</span><span><Package />Packages</span><span><Bell />Updates</span></div>
          <div className="mock-notice"><span className="mock-dot" /> Everything in one place.</div>
        </Phone>
        <div className="mock-scene-label">LUMERA WEBSITE + PORTAL CONCEPT</div>
      </>}

      {index === 1 && <>
        <div className="mock-website mock-browser">
          <BrowserBar label="FORMA / DESIGN STUDIO" />
          <div className="mock-studio-nav">FORMA<span>Spaces &nbsp; Studio &nbsp; Contact</span></div>
          <div className="mock-studio-hero"><small>THOUGHTFULLY DESIGNED.</small><h4>Space for<br /><em>what&apos;s next.</em></h4><div className="mock-studio-art"><i /><i /><i /></div><span className="mock-studio-button">Discover our work <ArrowUpRight /></span></div>
          <div className="mock-studio-footer">IDENTITY. EXPERIENCE. IMPACT.<span>01 — 03</span></div>
        </div>
        <div className="mock-browser mock-site-detail"><BrowserBar label="BUILT FOR EVERY SCREEN" /><div className="mock-detail-body"><span>DESIGNED TO CONNECT</span><h4>Your business.<br />A lasting impression.</h4><div className="mock-detail-lines"><i /><i /><i /></div><ArrowUpRight /></div></div>
        <div className="mock-scene-label">RESPONSIVE WEBSITE CONCEPT</div>
      </>}

      {index === 2 && <>
        <Phone className="mock-app-phone mock-app-phone-back"><div className="mock-app-top">WORKSPACE <LayoutGrid /></div><h4>Make room<br />for progress.</h4><div className="mock-app-summary"><small>THIS WEEK</small><strong>Looking ahead</strong><div className="mock-chart">{[35, 60, 45, 85, 65, 100, 75].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="mock-app-bottom"><LayoutGrid /><CalendarDays /><Bell /></div></Phone>
        <Phone className="mock-app-phone mock-app-phone-front"><div className="mock-app-top">MY DAY <CalendarDays /></div><h4>A little more<br />in flow.</h4><div className="mock-week">{["M", "T", "W", "T", "F"].map((day, i) => <span key={i} className={i === 2 ? "selected" : ""}>{day}<b>{12 + i}</b></span>)}</div><p className="mock-eyebrow">TODAY&apos;S PLAN</p>{["Team catch-up", "Project review", "Time to create"].map((task, i) => <div className="mock-task" key={task}><span>{9 + i * 2}:00</span><strong>{task}</strong><i /></div>)}<div className="mock-app-bottom"><LayoutGrid /><CalendarDays /><Bell /></div></Phone>
        <div className="mock-scene-label">CUSTOM MOBILE APP CONCEPT</div>
      </>}

      {index === 3 && <>
        <div className="mock-dashboard mock-browser"><BrowserBar label="YOUR OPERATIONS / ONE WORKSPACE" /><div className="mock-dashboard-body"><div className="mock-sidebar"><Orbit /><LayoutGrid /><CalendarDays /><Package /><MessageSquare /></div><div className="mock-dashboard-main"><div className="mock-dashboard-heading"><span><small>YOUR WORKSPACE</small><h4>Overview</h4></span><span className="mock-avatar">TV</span></div><div className="mock-stat-grid">{["Projects", "Operations", "Team"].map((label, i) => <div key={label}><small>{label}</small><strong>{[24, 86, 12][i]}</strong><span>Demo workspace</span></div>)}</div><div className="mock-dashboard-chart"><span>Activity overview</span><div className="mock-chart">{[30, 45, 40, 65, 50, 75, 62, 85, 72, 95, 82, 100].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="mock-table">{["Design system", "Website launch", "Inventory sync"].map((name, i) => <div key={name}><span className="mock-dot" /><span>{name}</span><small>{["In progress", "In review", "Scheduled"][i]}</small></div>)}</div></div></div></div>
        <div className="mock-scene-label">ILLUSTRATIVE MANAGEMENT DASHBOARD</div>
      </>}

      {index === 4 && <>
        <div className="mock-digital mock-browser"><BrowserBar label="FROM POSSIBILITY TO PRODUCT" /><div className="mock-digital-body"><span className="mock-eyebrow">BUILD SOMETHING NEW</span><h4>What if<br /><em>became what&apos;s next?</em></h4><div className="mock-workflow">{["Idea", "Design", "Build"].map((label, i) => <span key={label}><small>0{i + 1}</small>{label}<Check /></span>)}</div><div className="mock-code"><span>your_vision</span><b>→</b><span>something_real</span></div></div></div>
        <div className="mock-ai-card"><span className="mock-ai-heading"><Sparkles /> YOUR DIGITAL ASSISTANT</span><p>How can we help?</p><div>Bring my next idea to life.<ArrowUpRight /></div></div>
        <div className="mock-scene-label">PRODUCT + AI INTERFACE CONCEPT</div>
      </>}
    </div>
  );
}
