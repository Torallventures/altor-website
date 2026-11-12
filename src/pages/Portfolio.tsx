import { useState } from 'react';
import { SectionLabel, WorkGrid } from '@/components/agency/AgencySections';
import { workItems } from '@/components/agency/content';
import { AgencyContact } from '@/components/agency/AgencyContact';

const filters = ['All', 'Websites', 'Apps', 'Portals', 'Systems'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  return <>
    <section className="agency-collection agency-container">
      <SectionLabel number="01">Portfolio</SectionLabel>
      <div className="agency-collection-intro"><h1>Made to be<br /><em>experienced.</em></h1><p>Step into Lumera, our interactive community platform, and explore the websites, applications, and systems we can build around your business.</p></div>
      <div className="agency-collection-heading"><p>Explore the possibilities</p><div className="agency-filters" role="group" aria-label="Filter the portfolio">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span aria-hidden="true">{item === 'All' ? workItems.length : workItems.filter(work => work.category === item).length}</span></button>)}</div></div>
      <p className="sr-only" role="status">Showing {filter === 'All' ? 'all portfolio experiences and capabilities' : filter.toLowerCase()}</p>
      <WorkGrid key={filter} collection filter={filter}/>
    </section>
    <AgencyContact/>
  </>;
}
