import { useState } from 'react';
import { WorkGrid } from '@/components/agency/AgencySections';
import { AgencyContact } from '@/components/agency/AgencyContact';

const filters = ['All', 'Websites', 'Apps', 'Portals', 'Systems'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  return <>
    <section className="agency-collection agency-container">
      <div className="agency-collection-heading"><h1>Work & possibilities</h1><div className="agency-filters" role="group" aria-label="Filter the portfolio">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
      <p className="sr-only" role="status">Showing {filter === 'All' ? 'all portfolio experiences and capabilities' : filter.toLowerCase()}</p>
      <WorkGrid key={filter} collection filter={filter}/>
    </section>
    <AgencyContact/>
  </>;
}
