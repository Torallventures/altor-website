import { PageIntro, ServiceIndex, StudioInvitation, StudioProcess } from '@/components/studio/Studio';
export default function ServicesPage() {
  return <><PageIntro label="Our services" title={<>A website. An app.<br/>A better way to work.</>}><p>We connect design and development to build the digital tools your business needs. Explore our five areas of work, from public-facing websites to the systems behind the scenes.</p></PageIntro><ServiceIndex full/><StudioProcess/><StudioInvitation/></>;
}
