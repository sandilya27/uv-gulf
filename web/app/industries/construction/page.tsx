import type { Metadata } from "next";
import { Eyebrow, ServiceCard } from "@/components/ds";
import { IndustryDetail, IndustryDetailSection } from "@/components/industries/IndustryDetail";
import { COURSES, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Construction | Site Inspection, Weld Testing and Training",
  description: "Prepare construction inspection and training enquiries with UV Gulf, covering project-stage quality checks, lifting equipment, structural welds, site inputs and reporting.",
};

export default function ConstructionPage() {
  return <IndustryDetail title="Construction" lead="Align inspection and training requirements with your construction stage, contractor responsibilities and planned site activities. Share the project scope, drawings and work programme so examination boundaries and attendance arrangements can be agreed.">
    <IndustryDetailSection id="construction-quality" eyebrow="Construction-stage quality checks" title="Connect each check with the work stage.">
      <article><h3>Materials and fabrication records</h3><p>Identify the materials, components and fabrication stages relevant to your enquiry. Provide drawings, material records and project specifications, with the inspection or witness points that need attention before work progresses.</p></article>
      <article><h3>Installation and site coordination</h3><p>Describe the installation activity, items to be examined and contractor interfaces. Agree access, inspection timing and the project criteria used to review findings before arranging attendance.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="equipment-welds-training" eyebrow="Equipment, welds and people" title="Define the requirement around the site activity.">
      <article><h3>Lifting equipment</h3><p>Share equipment identification, registers, previous inspection records and the planned lifting activities. Confirm the equipment coverage and examination scope alongside site conditions, access and the responsible contractor’s arrangements.</p></article>
      <article><h3>Structural weld examination</h3><p>Provide weld maps, materials, joint details and examination locations for fabricated steelwork. Discuss the inspection or NDT requirement with reference to surface condition, geometry and access; agree suitable methods and the assessment basis for the assignment.</p></article>
      <article><h3>Scaffolding, rigging and safety training</h3><p>Describe the team’s roles, experience and planned work at height or lifting activities. Explore the existing scaffolding, rigger and workplace safety courses, and confirm training suitability for the people and tasks involved.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="project-site-inputs" eyebrow="Project scope and site inputs" title="Prepare the information needed for site work.">
      <ul>
        <li>Project location, construction stage, contractor contacts and inspection schedule.</li>
        <li>Current drawings, material records, weld maps and marked examination locations.</li>
        <li>Project specifications, inspection plans, acceptance criteria and witness requirements.</li>
        <li>Equipment registers, previous findings and the question each examination needs to resolve.</li>
        <li>Permits, safe access, scaffolding, surface preparation and site readiness responsibilities.</li>
        <li>Team roles and training needs, report deadlines and designated reviewers.</li>
      </ul>
      <p>Agree the scope and site arrangements with the responsible project team before scheduling. Inspection and training requirements should be coordinated with the work sequence; responsibility for site safety and construction decisions remains with the responsible parties.</p>
    </IndustryDetailSection>
    <IndustryDetailSection id="reporting" eyebrow="Reporting" title="Keep findings traceable to the work examined.">
      <p>Agree report outputs and format before work begins. Depending on the assignment, records may include inspection findings, NDT results or a technical review note, tied to equipment identifiers, drawing revisions, weld locations and the agreed assessment criteria.</p>
      <p>Record the scope, methods, observations and limitations, and identify the responsible reviewers and follow-up process. These records support project review within the agreed scope; they do not replace statutory approvals, design approval or construction sign-off by the responsible authorities.</p>
    </IndustryDetailSection>
    <section className="section" aria-labelledby="related-services">
      <div className="wrap stack-24">
        <Eyebrow>Relevant services</Eyebrow><h2 id="related-services" className="h2">Explore support for your construction scope.</h2>
        <div className="service-grid">{SERVICES.map((service) => <ServiceCard key={service.href} title={service.title} summary={service.summary} href={service.href} cta={`Explore ${service.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
    <section className="section" aria-labelledby="related-training">
      <div className="wrap stack-24">
        <Eyebrow>Relevant training</Eyebrow><h2 id="related-training" className="h2">Prepare people for the planned site activities.</h2>
        <div className="service-grid">{COURSES.map((course) => <ServiceCard key={course.slug} title={course.title} summary={course.summary} href={course.href} cta={`Explore ${course.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
  </IndustryDetail>;
}
