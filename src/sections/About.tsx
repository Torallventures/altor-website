import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const principles=[
  ['01','Make the complex feel simple.','A good interface should make the next step clear. We focus on the people using a product, the decisions they need to make, and the work they need to get done.'],
  ['02','Design and engineering, together.','Visual design and functionality should support each other. We consider structure, content, performance, and maintainability as parts of the same experience.'],
  ['03','Build around the business.','The right solution begins with your workflow and priorities. A focused website, a community portal, or a custom application should fit the way you work.'],
];

export function About() {
  return <section id="about" className="relative pb-12 pt-20 sm:pt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-end gap-10 border-b border-border pb-16 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
        <div><p className="mb-6 font-mono text-xs uppercase tracking-[.22em] text-primary">About Torall Ventures</p><h1 className="font-display text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">Thoughtful design.<br /><span className="text-primary">Useful technology.</span></h1></div>
        <div className="max-w-lg"><p className="text-lg leading-relaxed text-muted-foreground">We create websites, applications, and custom systems that bring a business’s ideas into focus. Our work connects what people see with what they need to do.</p><p className="mt-5 leading-relaxed text-muted-foreground">Based in Florida and working with clients everywhere, Torall brings a considered approach to digital experiences, from the first impression to the everyday details.</p></div>
      </div>
      <div className="grid gap-12 py-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
        <div><p className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-primary">Our point of view</p><h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Good work starts<br />with clear thinking.</h2><Link to="/contact" className="mt-7 inline-flex items-center gap-3 rounded-sm text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring">Start a conversation <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link></div>
        <div>{principles.map(([number,title,body],index)=><Reveal key={number} delay={index*60}><article className="grid grid-cols-[2rem_1fr] gap-4 border-t border-border py-7"><span className="font-mono text-xs text-primary">{number}</span><div><h3 className="font-display text-xl font-bold sm:text-2xl">{title}</h3><p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{body}</p></div></article></Reveal>)}</div>
      </div>
      <Link to="/portfolio" className="group grid overflow-hidden rounded-xl border border-primary/20 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-2">
        <div className="flex flex-col justify-center p-7 sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">See the thinking in practice</p><h2 className="mt-5 font-display text-3xl font-bold">Meet Lumera.</h2><p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">A condominium website and community portal that brings an entire resident experience together.</p><span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold">Explore our portfolio <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true"/></span></div>
        <div className="overflow-hidden bg-[#17221d] p-6 sm:p-8"><img src="/templates/lumera-desktop.jpg" alt="Lumera condominium website demonstration" width="1425" height="990" loading="lazy" decoding="async" className="aspect-[1.44] w-full rounded-md border border-white/10 object-cover object-top shadow-2xl transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"/></div>
      </Link>
    </div>
  </section>;
}
