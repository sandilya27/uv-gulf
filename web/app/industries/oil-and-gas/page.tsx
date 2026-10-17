import { MaskedHeading } from "@/components/site/MaskedHeading";
import type { Metadata } from "next";
import { Eyebrow, ServiceCard } from "@/components/ds";
import { IndustryDetail, IndustryDetailSection } from "@/components/industries/IndustryDetail";
import { COURSES, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Oil and Gas | Inspection, Testing and Training",
  description: "Discuss oil and gas pipeline, vessel and lifting-equipment requirements with UV Gulf, including inspection, NDT, calibration, technical advisory and training.",
};

export default function OilAndGasPage() {
  return <IndustryDetail title="Oil and gas" lead="Plan inspection and workforce requirements around your pipelines, vessels and lifting equipment. Share the operating context so the scope, methods and site arrangements can be agreed.">
    <IndustryDetailSection id="asset-needs" eyebrow="Typical asset needs" title="Start with the equipment and its condition.">
      <article><h3>Pipelines and process pipework</h3><p>Identify the line, material, weld locations and service conditions. Fabrication checks, weld examination and wall-thickness enquiries need drawings, previous findings and a defined examination area. NDT methods depend on the material, access and the discontinuities being investigated.</p></article>
      <article><h3>Vessels and pressure equipment</h3><p>Share equipment identification, design information, inspection history and any areas of concern. Agree the examination scope, acceptance criteria and isolation or access arrangements before planning work on shells, nozzles and associated pipework.</p></article>
      <article><h3>Lifting equipment</h3><p>Bring equipment registers, identification, available certificates and previous inspection records. Explain the intended lifting activities and site conditions so equipment inspection and rigging training requirements can be discussed together.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="applications" eyebrow="Service applications" title="Connect each question with a defined scope.">
      <article><h3>Inspection and NDT</h3><p>Discuss fabrication or vendor inspection, equipment records and examination of welds or surfaces. Define inspection stages, witness points, test locations and the project requirements against which findings will be assessed.</p></article>
      <article><h3>Calibration</h3><p>List pressure and temperature instruments, flow meters or gas detectors with their ranges and intended use. Agree measurement requirements, calibration location and records; pressure relief valve work requires its own confirmed scope.</p></article>
      <article><h3>Technical advisory</h3><p>Frame questions about materials, project requirements, lifting documentation or site hazards. Agree the review basis, responsibilities and required output with the responsible project team.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="operating-context" eyebrow="Onshore and offshore context" title="Build site constraints into the enquiry.">
      <article><h3>Onshore facilities and project sites</h3><p>Identify the site, construction or maintenance stage, shutdown window and whether the equipment is operating or isolated. Include work permits, safe access, surface preparation and coordination with other contractors.</p></article>
      <article><h3>Offshore enquiries</h3><p>Include the installation location, transfer arrangements, access restrictions, weather windows and site induction or personnel requirements. Offshore attendance, personnel suitability and equipment arrangements must be confirmed for the proposed assignment before scheduling.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="project-inputs" eyebrow="Project inputs" title="Prepare the information needed to plan.">
      <ul>
        <li>Asset register, equipment tags, materials, drawings and relevant specifications.</li>
        <li>Service conditions, inspection history, previous findings and areas of concern.</li>
        <li>Project requirements, acceptance criteria, inspection stages and responsible reviewers.</li>
        <li>Site location, access, isolation, permits, required dates and available work windows.</li>
        <li>Instrument ranges, required measurements and team roles or training needs.</li>
      </ul>
    </IndustryDetailSection>
    <IndustryDetailSection id="deliverables" eyebrow="Agreed deliverables" title="Define the records your project needs.">
      <p>Agree outputs before work begins. Depending on the scope, these may include inspection reports, NDT results, calibration records or a technical review note. Specify asset identification, examination locations, methods, findings, limitations and the agreed assessment basis.</p>
      <p>Confirm the reporting format, supporting records, review responsibilities and any follow-up actions. Deliverables apply to the agreed work; decisions about repairs, return to service and site operations remain with the responsible parties.</p>
    </IndustryDetailSection>
    <section className="section" aria-labelledby="related-services">
      <div className="wrap stack-24">
        <Eyebrow>Related services</Eyebrow><MaskedHeading id="related-services" className="h2">Explore the service behind your requirement.</MaskedHeading>
        <div className="service-grid">{SERVICES.map((service) => <ServiceCard key={service.href} title={service.title} summary={service.summary} href={service.href} cta={`Explore ${service.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
    <section className="section" aria-labelledby="related-training">
      <div className="wrap stack-24">
        <Eyebrow>Related training</Eyebrow><MaskedHeading id="related-training" className="h2">Prepare people for the planned activities.</MaskedHeading>
        <p className="body-lg">Discuss rigging, scaffolding access and workplace safety in relation to your team’s roles, experience and site requirements.</p>
        <div className="service-grid">{COURSES.map((course) => <ServiceCard key={course.slug} title={course.title} summary={course.summary} href={course.href} cta={`Explore ${course.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
  </IndustryDetail>;
}
