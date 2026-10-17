import type { Metadata } from "next";
import { Eyebrow, ServiceCard } from "@/components/ds";
import { IndustryDetail, IndustryDetailSection } from "@/components/industries/IndustryDetail";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Petrochemical | Plant Inspection, NDT and Calibration",
  description: "Prepare petrochemical plant inspection, NDT and calibration enquiries for vessels, process pipework and instruments, with shutdown inputs and agreed reporting.",
};

export default function PetrochemicalPage() {
  return <IndustryDetail title="Petrochemical" lead="Build plant asset integrity enquiries around the equipment, process conditions and maintenance window. Share the available records and areas of concern so examination and measurement requirements can be defined.">
    <IndustryDetailSection id="asset-integrity" eyebrow="Plant asset integrity" title="Connect the condition question to the asset.">
      <p>Identify the process unit, equipment tags, materials and operating conditions. Explain whether the enquiry concerns fabrication, a recorded change in condition or planned maintenance. Previous findings and inspection history help define where further examination may be needed.</p>
      <p>Agree the inspection boundaries, assessment basis and responsible reviewers before scheduling. The proposed scope depends on the asset information, access and site requirements supplied for the assignment.</p>
    </IndustryDetailSection>
    <IndustryDetailSection id="plant-equipment" eyebrow="Equipment and records" title="Prepare vessels, pipework and instruments for review.">
      <article><h3>Vessels and associated equipment</h3><p>Provide equipment identification, drawings, material records and previous inspection findings. Identify areas of concern on shells, nozzles and connections, together with the available access and isolation arrangements.</p></article>
      <article><h3>Process pipework</h3><p>Share line lists, piping drawings, weld locations and service conditions. Mark known areas of concern and previous measurement locations so the examination area and any comparison with earlier records can be discussed.</p></article>
      <article><h3>Instrumentation</h3><p>List instrument tags, pressure or temperature ranges, intended use and available calibration records. Specify the measurement requirements and whether instruments can be removed or need site attendance; confirm the proposed calibration scope before scheduling.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="service-applications" eyebrow="Relevant applications" title="Match the method to the information needed.">
      <article><h3>Inspection</h3><p>Discuss equipment documentation, fabrication stages and visual examination requirements. Define witness points, examination boundaries and the project criteria against which findings will be reviewed.</p></article>
      <article><h3>Non-destructive testing</h3><p>Frame enquiries around weld examination, wall-thickness measurements or surface indications. Method selection depends on material, geometry, surface condition, access and the type of discontinuity being investigated; agree locations and acceptance criteria in the scope.</p></article>
      <article><h3>Calibration and technical review</h3><p>Agree instrument ranges, measurement points, required tolerances and reporting needs. Where records or project requirements need clarification, define a technical advisory question and the documents available for review.</p></article>
    </IndustryDetailSection>
    <IndustryDetailSection id="shutdown-planning" eyebrow="Shutdown planning inputs" title="Build the work window around site readiness.">
      <ul>
        <li>Equipment register, drawings, materials, inspection history and marked examination locations.</li>
        <li>Shutdown dates, equipment availability, work sequence and dependencies on other contractors.</li>
        <li>Site-controlled isolation, cleaning, decontamination and release arrangements.</li>
        <li>Permit requirements, safe access, scaffolding and surface preparation responsibilities.</li>
        <li>Instrument removal and reinstatement arrangements, reporting deadlines and responsible reviewers.</li>
      </ul>
      <p>Confirm readiness and attendance arrangements with the responsible plant team. Examination work and reporting need an agreed scope; repair decisions and release for operation remain with the responsible parties.</p>
    </IndustryDetailSection>
    <IndustryDetailSection id="reporting" eyebrow="Reporting" title="Keep findings traceable to the equipment.">
      <p>Agree the required records before work begins. Depending on the assignment, outputs may include inspection reports, NDT results, calibration records or a technical review note. Specify asset tags, examination locations, methods, measurements, findings, limitations and the agreed assessment basis.</p>
      <p>Confirm the report format, supporting documents and review process, including how any follow-up requirements will be recorded. Compare results with earlier records only where measurement locations and methods provide a suitable basis.</p>
    </IndustryDetailSection>
    <section className="section" aria-labelledby="related-services">
      <div className="wrap stack-24">
        <Eyebrow>Related services</Eyebrow><h2 id="related-services" className="h2">Explore support for your plant requirements.</h2>
        <div className="service-grid">{SERVICES.map((service) => <ServiceCard key={service.href} title={service.title} summary={service.summary} href={service.href} cta={`Explore ${service.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
  </IndustryDetail>;
}
