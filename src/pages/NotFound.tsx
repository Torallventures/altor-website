import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return <section className="mx-auto flex min-h-[75dvh] max-w-7xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6 lg:px-8">
    <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">404 / A different direction</p>
    <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-tight sm:text-7xl">This page has<br /><span className="text-primary">moved on.</span></h1>
    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">The link may be out of date, or the address may be incomplete. Let’s get you back to something useful.</p>
    <div className="mt-8 flex flex-wrap gap-4"><Link to="/" className="inline-flex min-h-12 items-center gap-4 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring">Back to home <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link><Link to="/portfolio" className="inline-flex min-h-12 items-center rounded-md border border-border px-5 py-3 font-semibold focus-visible:ring-2 focus-visible:ring-ring">Explore our portfolio</Link></div>
  </section>;
}
