import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { getService, services } from '@/data/services';
import { StudioInvitation } from '@/components/studio/Studio';
const images: Record<string, string> = { 'residential-community-websites': 'communities', 'business-websites': 'websites', 'business-apps': 'apps', 'custom-management-systems': 'management', 'anything-digital': 'digital' };
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;
  if (!service) return <Navigate to="/services" replace/>;
  const next = services[(services.indexOf(service) + 1) % services.length];
  return <><section className="studio-detail-hero studio-wrap">
    <Link to="/services" className="studio-link studio-back"><ArrowLeft aria-hidden="true"/>All services</Link>
    <div><div><p className="studio-label">Designed around your business</p><h1>{service.title}</h1><p>{service.tagline}</p><Link to={`/contact?service=${service.slug}`} className="studio-button">Discuss your project <ArrowUpRight aria-hidden="true"/></Link></div>
    <figure><img src={`/media/service-${images[service.slug]}.webp`} alt={`Illustration of ${service.title.toLowerCase()}`} width="1000" height="620" fetchPriority="high"/><figcaption>Possibilities, shaped around you.</figcaption></figure></div></section>
    <section className="studio-detail-body studio-wrap"><div><p className="studio-label">The thinking behind it</p><h2>Start with what<br/>needs to work better.</h2>{service.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<aside><h3>Who it’s for</h3><p>{service.idealFor}</p></aside></div><div className="studio-detail-includes"><h2>What we can build</h2><ul>{service.features.map(feature => <li key={feature}><Check aria-hidden="true"/>{feature}</li>)}</ul><p>We’ll agree on the features and integrations your project needs before work begins.</p></div></section>
    <div className="studio-next-service studio-wrap"><span>Explore another capability</span><Link to={`/services/${next.slug}`}>{next.title}<ArrowRight aria-hidden="true"/></Link></div><StudioInvitation/></>;
}
