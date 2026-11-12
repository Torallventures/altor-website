import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import {
  PageIntro,
  StudioInvitation,
  StudioPrinciples,
  StudioProcess,
} from "@/components/studio/Studio";
export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About Torall"
        title={
          <>
            Thoughtful by design.
            <br />
            Practical by nature.
          </>
        }
      >
        <p>
          Torall Ventures brings design and technology together to create websites, applications,
          and systems for businesses and residential communities.
        </p>
      </PageIntro>
      <section className="studio-about-story studio-wrap">
        <p className="studio-label">Our perspective</p>
        <div>
          <h2>
            The best technology
            <br />
            belongs in everyday life.
          </h2>
          <p>
            A website should help someone understand your business. A portal should make a
            resident’s day easier. A management system should give your team a clearer view of the
            work.
          </p>
          <p>
            That is where we start: with the people, the context, and the task. We shape the
            experience around them, then connect the design and development needed to bring it to
            life.
          </p>
          <p>
            Based in Florida, we work with businesses, community organizations, and founders who
            want a considered digital presence and more useful ways of working.
          </p>
          <Link to="/portfolio" className="studio-link">
            See the thinking in practice <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <StudioPrinciples />
      <StudioProcess />
      <StudioInvitation />
    </>
  );
}
