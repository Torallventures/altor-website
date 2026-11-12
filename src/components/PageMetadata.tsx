import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getService } from '@/data/services';

const pages:Record<string,[string,string]>={
  '/':['Torall Ventures — Websites, Apps & Custom Systems','Thoughtfully designed websites, applications, and custom systems. Explore Torall Ventures and discover digital experiences built around your business.'],
  '/portfolio':['Portfolio — Torall Ventures','Explore Lumera, Torall’s interactive condominium website and community portal, and the capabilities behind our digital experiences.'],
  '/portfolio/lumera':['Lumera — Connected Living by Torall Ventures','Explore Lumera’s cinematic condominium website, resident portal, seven roles, forms, workflows, and customizable themes.'],
  '/about':['About Torall Ventures — Design & Development','Meet Torall Ventures. Thoughtful design and useful technology for websites, applications, and custom business systems.'],
  '/contact':['Start a Project — Torall Ventures','Tell Torall Ventures about your website, app, or custom system. Prepare a project inquiry and start the conversation.'],
};
export function PageMetadata() {
  const {pathname}=useLocation();
  useEffect(()=>{
    const service=pathname.startsWith('/services/') ? getService(pathname.split('/')[2]) : undefined;
    const page=pages[pathname] || (service ? [`${service.title} — Torall Ventures`,service.tagline] : ['Page Not Found — Torall Ventures','Find your way back to Torall Ventures.']);
    document.title=page[0];
    const meta=(key:string,content:string,property=false)=>{
      const attribute=property ? 'property' : 'name';
      let element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if(!element) { element=document.createElement('meta'); element.setAttribute(attribute,key); document.head.append(element); }
      element.content=content;
    };
    meta('description',page[1]); meta('og:title',page[0],true); meta('og:description',page[1],true);
    meta('og:url',`https://torallventures.com${pathname}`,true);
    meta('robots',pages[pathname] || service ? 'index, follow' : 'noindex, follow');
    let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if(!canonical) { canonical=document.createElement('link'); canonical.rel='canonical'; document.head.append(canonical); }
    canonical.href=`https://torallventures.com${pathname}`;
  },[pathname]);
  return null;
}
