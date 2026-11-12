import { HeroShowreel } from "@/components/HeroShowreel";
import { AgencyHero, TypeMarquee, SelectedWork, SectorWall, AgencyValues, ServicesAccordion, StudioStatement, LumeraFeature } from '@/components/agency/AgencySections';
import { AgencyContact } from '@/components/agency/AgencyContact';

export default function Home() {
  return (
    <>
      <AgencyHero />
      <HeroShowreel />
      <TypeMarquee />
      <SelectedWork />
      <SectorWall />
      <AgencyValues />
      <ServicesAccordion />
      <StudioStatement />
      <AgencyContact />
      <LumeraFeature />
    </>
  );
}
