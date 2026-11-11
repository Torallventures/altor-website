import { Hero } from "@/sections/Hero";
import { HeroShowreel } from "@/components/HeroShowreel";
import { ServicesTeaser } from "@/sections/ServicesTeaser";
import { ProjectJourney } from "@/sections/ProjectJourney";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroShowreel />
      <ServicesTeaser />
      <ProjectJourney />
    </>
  );
}
