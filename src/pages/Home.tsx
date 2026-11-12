import { HeroShowreel } from "@/components/HeroShowreel";
import { AgencyHero, TypeMarquee, SelectedWork, SectorWall, AgencyValues, ServicesAccordion, StudioStatement, LumeraFeature, ProjectSteps, AgencyQuestions } from '@/components/agency/AgencySections';
import { AgencyContact } from '@/components/agency/AgencyContact';

export default function Home() {
  return (
    <>
      <AgencyHero />
      <div className="agency-film-frame"><div className="agency-film-heading agency-container"><span>A little of what’s possible</span><span>Design, development & everything between</span></div><HeroShowreel /></div>
      <TypeMarquee />
      <SelectedWork />
      <SectorWall />
      <ServicesAccordion />
      <AgencyValues />
      <StudioStatement />
      <ProjectSteps />
      <LumeraFeature />
      <AgencyQuestions />
      <AgencyContact />
    </>
  );
}
