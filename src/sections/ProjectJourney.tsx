import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { CTABanner } from './CTABanner';
import './ProjectJourney.css';

const steps = [
  ['01', 'Find the right problem.', 'Start with the people, the business, and what needs to work better. Define a useful first release.'],
  ['02', 'Make it tangible.', 'Explore the structure and visual direction. See how the experience will work before the details are built.'],
  ['03', 'Build it with purpose.', 'Bring the design, content, and functionality together. Keep the important decisions clear along the way.'],
  ['04', 'Launch. Learn. Improve.', 'Put the experience in people’s hands, then use what you learn to shape the next step.'],
];

const questions = [
  ['I have an idea, but no technical brief. Where do I start?', 'Start with what you want to achieve and who it is for. A short description of the problem, your priorities, and any examples you like gives us a useful place to begin.'],
  ['Can you improve an existing website or system?', 'Yes. The starting point can be a new product, an existing website, or a process that has outgrown its current tools. We can discuss what to keep, what to improve, and what needs to connect.'],
  ['How are scope, timing, and cost decided?', 'They depend on the features, integrations, content, and level of customization. We define the requirements and delivery scope before proposing a schedule and cost.'],
  ['Can I explore an example before getting in touch?', 'Visit Portfolio to explore Lumera, our interactive condominium website and community portal demonstration. It includes public pages, forms, workflows, and different resident and management perspectives.'],
];

export function ProjectJourney() {
  return <>
    <section className="selected-experience section-shell" aria-labelledby="selected-work-heading">
      <Reveal className="selected-experience-copy">
        <p className="section-kicker">Selected work / 01</p>
        <h2 id="selected-work-heading">A website.<br />An entire <span>experience.</span></h2>
        <p>Meet Lumera. A cinematic first impression becomes a connected community, with everyday tasks brought into one considered portal.</p>
        <div className="experience-tags"><span>Residential</span><span>Website + portal</span><span>Interactive demo</span></div>
        <Link to="/portfolio" className="text-action">Explore Lumera <ArrowUpRight aria-hidden="true" /></Link>
      </Reveal>
      <Link to="/portfolio" className="selected-experience-preview" aria-label="Explore Lumera in our portfolio">
        <div className="preview-toolbar" aria-hidden="true"><i /><i /><i /><span>Lumera / connected living</span></div>
        <img src="/templates/lumera-desktop.jpg" alt="Aurelia Residences homepage in the Lumera website and portal demonstration" width="1425" height="990" loading="lazy" decoding="async" />
        <span className="preview-link">View the experience <ArrowUpRight aria-hidden="true" /></span>
      </Link>
    </section>

    <section className="project-process section-shell" aria-labelledby="process-heading">
      <div className="section-heading-row"><div><p className="section-kicker">How we work</p><h2 id="process-heading">From first thought<br />to <span>something real.</span></h2></div><Link to="/about" className="text-action">Meet Torall <ArrowRight aria-hidden="true" /></Link></div>
      <ol className="process-steps">{steps.map(([number,title,description])=><li key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>

    <section className="project-questions section-shell" aria-labelledby="questions-heading">
      <div><p className="section-kicker">Before we begin</p><h2 id="questions-heading">Good questions.<br /><span>Clear answers.</span></h2><Link to="/contact" className="text-action">Ask us something <ArrowRight aria-hidden="true" /></Link></div>
      <div>{questions.map(([question,answer])=><details key={question}><summary>{question}<Plus aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </section>
    <CTABanner />
  </>;
}
