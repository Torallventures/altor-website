import { AgencyValues, ProjectSteps, StudioStatement } from '@/components/agency/AgencySections';
import { AgencyContact } from '@/components/agency/AgencyContact';

export default function AboutPage() {
  return (
    <>
      <StudioStatement about />
      <section className="agency-about-intro agency-container"><h2>Thoughtful design.<br />Useful technology.</h2><div><p>Torall Ventures creates websites, applications, and custom systems that bring a business’s ideas into focus. We connect what people see with what they need to do.</p><p>Based in Florida and working with clients everywhere, we bring design and engineering together, from the first impression to the everyday details.</p></div></section>
      <AgencyValues />
      <ProjectSteps />
      <AgencyContact />
    </>
  );
}
