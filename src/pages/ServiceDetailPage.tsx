import { Link, Navigate, useParams } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getService, services } from '@/data/services';
import { AgencyContact } from '@/components/agency/AgencyContact';
import { RevealBlock } from '@/components/agency/AgencyMotion';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getService(slug || '');
  if (!service) return <Navigate to="/portfolio" replace />;
  const next = services[(services.indexOf(service) + 1) % services.length];
  return <>
    <article className="agency-detail agency-container">
      <Link to="/#services" className="agency-back-link">← All capabilities</Link>
      <div className="agency-detail-heading"><h1>{service.title}</h1><p>{service.tagline}</p></div>
      <img className="agency-detail-image" src={service.image} alt={`${service.title} design concept`} width="1000" height="563" fetchPriority="high"/>
      <div className="agency-detail-story"><h2>Built around<br />your business.</h2><div>{service.story.map(paragraph => <RevealBlock key={paragraph}><p>{paragraph}</p></RevealBlock>)}</div></div>
      <section className="agency-detail-features"><h2>What we can build</h2><ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
      <div className="agency-detail-story"><h2>A good fit for</h2><p>{service.idealFor}</p></div>
      <div className="agency-detail-next"><Link className="agency-pill" to={`/contact?service=${service.slug}`}>Start a conversation <ArrowUpRight aria-hidden="true"/></Link><Link className="agency-text-link" to={`/services/${next.slug}`}>Explore {next.title.toLowerCase()} <ArrowRight aria-hidden="true"/></Link></div>
    </article>
    <AgencyContact/>
  </>;
}
