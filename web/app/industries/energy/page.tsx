import { MaskedHeading } from "@/components/site/MaskedHeading";
import type { Metadata } from "next";
import { Eyebrow, ServiceCard } from "@/components/ds";
import { IndustryDetail, IndustryDetailSection } from "@/components/industries/IndustryDetail";
import { COURSES, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Energy | Power-Sector Inspection, Testing and Calibration",
  description: "Prepare power-sector equipment and instrument enquiries with UV Gulf, covering inspection, NDT, calibration, maintenance planning inputs and agreed reporting.",
};

export default function EnergyPage() {
  return <IndustryDetail title="Energy" lead="Plan power-sector inspection and measurement requirements around your equipment, operating conditions and maintenance window. Share asset records and the question to be resolved so the proposed scope and site arrangements can be confirmed.">
    <IndustryDetailSection id="power-equipment" eyebrow="Equipment and instrumentation" title="Start with the asset and the information available.">
      <article><h3>Plant equipment and pipework</h3><p>Identify the equipment, materials, weld locations and operating conditions relevant to your enquiry. Provide drawings, inspection history and known areas of concern on vessels, associated pipework or fabricated components. Confirm equipment coverage and examination boundaries before scheduling.</p></article>
      <article><h3>Lifting equipment for maintenance</h3><p>Share equipment identification, registers and previous inspection records alongside the planned lifting activities. Include site conditions and access constraints so the inspection requirement can be discussed with the responsible maintenance team.</p></article>
      <article><h3>Pressure and temperature instruments</h3><p>List instrument tags, ranges, intended use and available calibration records. Identify the measurement points and required tolerances, and explain whether instruments can be removed or need site attendance. Confirm instrument coverage, ranges and location for the proposed assignment.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="inspection-testing" eyebrow="Inspection, testing and calibration" title="Define what each examination needs to establish.">
      <article><h3>Inspection requirements</h3><p>Describe the fabrication stage, equipment condition question or documentation review needed. Agree inspection stages, witness points, access and the project criteria against which findings will be reviewed.</p></article>
      <article><h3>Non-destructive testing</h3><p>Frame enquiries around weld examination, wall-thickness measurements or surface indications. Method selection depends on material, geometry, surface condition and access. Mark examination locations and agree the method and assessment basis for the scope.</p></article>
      <article><h3>Calibration requirements</h3><p>Connect instrument measurements with the operating or maintenance requirement. Agree measurement points, tolerances and the records needed before work begins; include previous results where a comparison is required.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="maintenance-inputs" eyebrow="Maintenance planning inputs" title="Coordinate the work with equipment availability.">
      <ul>
        <li>Asset registers, drawings, materials, inspection history and marked examination locations.</li>
        <li>Maintenance dates, equipment availability, work sequence and contractor dependencies.</li>
        <li>Site-controlled isolation, cooling, cleaning and release arrangements.</li>
        <li>Permits, safe access, scaffolding and surface preparation responsibilities.</li>
        <li>Instrument removal and reinstatement arrangements, report deadlines and responsible reviewers.</li>
      </ul>
      <p>Confirm site readiness and attendance arrangements with the responsible plant team. Where documents or requirements need clarification, define a technical advisory question and the records available for review. Maintenance priorities, repairs and return-to-service decisions remain with the responsible parties.</p>
    </IndustryDetailSection>
    <IndustryDetailSection id="reporting" eyebrow="Reporting" title="Keep results connected to the asset record.">
      <p>Agree the required outputs before work begins. Depending on the assignment, these may include inspection reports, NDT results, calibration records or a technical review note. Specify equipment tags, examination locations, methods, measurements, findings, limitations and the agreed assessment basis.</p>
      <p>Confirm report format, supporting records and review responsibilities. Where results are intended to inform maintenance planning, identify the earlier records and measurement locations needed for a suitable comparison and agree how follow-up requirements will be recorded.</p>
    </IndustryDetailSection>
    <section className="section" aria-labelledby="related-services">
      <div className="wrap stack-24">
        <Eyebrow>Related services</Eyebrow><MaskedHeading id="related-services" className="h2">Explore support for your equipment requirements.</MaskedHeading>
        <div className="service-grid">{SERVICES.map((service) => <ServiceCard key={service.href} title={service.title} summary={service.summary} href={service.href} cta={`Explore ${service.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
    <section className="section" aria-labelledby="related-training">
      <div className="wrap stack-24">
        <Eyebrow>Related training</Eyebrow><MaskedHeading id="related-training" className="h2">Connect team preparation with maintenance activities.</MaskedHeading>
        <p className="body-lg">Discuss rigging, scaffolding access and workplace safety requirements in relation to the team’s roles, experience and planned site work.</p>
        <div className="service-grid">{COURSES.map((course) => <ServiceCard key={course.slug} title={course.title} summary={course.summary} href={course.href} cta={`Explore ${course.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
  </IndustryDetail>;
}
