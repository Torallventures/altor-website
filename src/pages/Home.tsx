import {
  FeaturedProject,
  ServiceIndex,
  StudioHero,
  StudioIntroduction,
  StudioInvitation,
  StudioProcess,
} from "@/components/studio/Studio";
export default function Home() {
  return (
    <>
      <StudioHero />
      <FeaturedProject />
      <StudioIntroduction />
      <ServiceIndex />
      <StudioProcess />
      <StudioInvitation />
    </>
  );
}
