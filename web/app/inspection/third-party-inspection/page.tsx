import type { Metadata } from "next";
import { ServiceDetail, ServiceDetailSection } from "@/components/inspection/ServiceDetail";

export const metadata: Metadata = {
  title: "Third-Party Inspection",
  description: "Discuss vendor and shop inspection, lifting equipment and pressure equipment with UV Gulf. Agree the scope, technical criteria and reporting for your project.",
};

export default function ThirdPartyInspectionPage() {
  return <ServiceDetail title="Third-Party Inspection" lead="Independent inspection of equipment, materials and construction, with scope and acceptance criteria agreed for each assignment.">
    <ServiceDetailSection id="scope" eyebrow="Inspection scope" title="From the workshop to the site.">
      <article><h3>Vendor and shop inspection</h3><p>Discuss inspection during fabrication, assembly or preparation for delivery. Share purchase requirements, drawings and the inspection plan to identify the stages that need review or witnessing.</p></article>
      <article><h3>Lifting equipment</h3><p>Enquiries may cover lifting equipment and associated accessories. Provide an equipment register, identification details, previous records and the intended use so the inspection scope can be reviewed.</p></article>
      <article><h3>Pressure equipment</h3><p>For vessels, pipework and other pressure equipment, share design information, service conditions and available inspection history. The required examination and any testing are agreed before work begins.</p></article>
    </ServiceDetailSection>
    <ServiceDetailSection id="applications" eyebrow="Assets & applications" title="Define the asset and its context.">
      <p>Typical enquiry contexts include fabricated equipment awaiting delivery, lifting equipment used on a project and pressure equipment requiring condition review. Availability and suitability are confirmed for the specific asset and location.</p>
      <p>For oil and gas, petrochemical, energy and construction enquiries, include the operating environment, project stage and site requirements. These inputs help establish the inspection boundaries and access arrangements.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="process" eyebrow="Working together" title="A clear path from enquiry to findings.">
      <ol>
        <li><strong>Share the requirement.</strong> Identify the equipment, location, requested dates and purpose of the inspection.</li>
        <li><strong>Agree the plan.</strong> Confirm scope, document reviews, inspection activities, witness or hold points, access and reporting requirements.</li>
        <li><strong>Carry out the agreed inspection.</strong> Record observations and results against the agreed criteria, including any limitations encountered.</li>
        <li><strong>Review the findings.</strong> Document the outcome and agree any required follow-up or reinspection.</li>
      </ol>
    </ServiceDetailSection>
    <ServiceDetailSection id="inputs" eyebrow="Before we start" title="Prepare your inspection enquiry.">
      <ul>
        <li>Asset type, quantity, identification and site or vendor address.</li>
        <li>Drawings, specifications, purchase requirements and relevant equipment records.</li>
        <li>Requested codes or standards, acceptance criteria and inspection plan, where available.</li>
        <li>Required dates, site contact, access restrictions and safety arrangements.</li>
        <li>Required report format, supporting records and document submission requirements.</li>
      </ul>
    </ServiceDetailSection>
    <ServiceDetailSection id="deliverables" eyebrow="Reporting" title="An agreed record of the inspection.">
      <p>Agree the deliverables before the assignment. The reporting scope may include asset identification, inspection activities, observations, results, supporting photographs where permitted, and limitations or outstanding items.</p>
      <p>Any certificate requirement, supporting documentation and follow-up inspection must be confirmed as part of the agreed scope. Certificate availability or an acceptance outcome is not assumed.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="criteria" eyebrow="Technical basis" title="Criteria agreed for each job.">
      <p>Provide the applicable contract, specification, drawings and requested code or standard, including the edition where relevant. The technical basis, acceptance criteria and responsibilities are reviewed before the work is confirmed.</p>
      <p>Where requirements are incomplete or conflicting, clarify them during scope review so the inspection and report have a defined basis.</p>
    </ServiceDetailSection>
  </ServiceDetail>;
}
