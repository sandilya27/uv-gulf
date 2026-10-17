import type { Metadata } from "next";
import { ServiceDetail, ServiceDetailSection } from "@/components/inspection/ServiceDetail";

export const metadata: Metadata = {
  title: "Technical Advisory",
  description: "Discuss standards, materials, lifting equipment and risk assessment with UV Gulf. Define your technical question, review scope and required advisory deliverables.",
};

export default function TechnicalAdvisoryPage() {
  return <ServiceDetail title="Technical Advisory" lead="Turn technical questions into a defined review, with clear assumptions, responsibilities and next steps." ctaLabel="Discuss technical advisory" ctaTitle="Tell us about your technical question.">
    <ServiceDetailSection id="scope" eyebrow="Advisory scope" title="Focus the review on your decision.">
      <p>Share the equipment, materials or activity involved and the decision you need to make. The advisory scope and required expertise are confirmed before an engagement is agreed.</p>
      <article><h3>Standards and regulations support</h3><p>Discuss the requirements referenced by your project, contract or operating procedures. A review can help identify questions about applicability, supporting evidence and points that require clarification with the client or relevant authority.</p></article>
      <article><h3>Materials advice</h3><p>Bring material specifications, service conditions and available records for discussion. Define whether the question concerns selection, documentation or a material-related issue, and agree any further inspection or testing separately.</p></article>
      <article><h3>Lifting equipment consultation</h3><p>Discuss equipment documentation, intended use, site constraints and inspection needs. Identify the responsibilities for lift planning, equipment suitability and operational decisions before the review begins.</p></article>
      <article><h3>Risk and hazard assessment</h3><p>Define the activity, people exposed, operating conditions and existing controls. Agree the assessment method, participants and how findings and proposed controls will be reviewed by the responsible site team.</p></article>
    </ServiceDetailSection>
    <ServiceDetailSection id="questions" eyebrow="Typical questions" title="Start with what needs resolving.">
      <ul>
        <li>Which project requirements need clarification before equipment is procured or accepted?</li>
        <li>What material records and service information are needed to review a specification?</li>
        <li>What documentation or inspection questions should be addressed before lifting equipment is used?</li>
        <li>Which hazards, existing controls and information gaps need further assessment?</li>
      </ul>
    </ServiceDetailSection>
    <ServiceDetailSection id="boundaries" eyebrow="Engagement boundaries" title="Agree responsibilities from the outset.">
      <p>Technical advice supports the client’s decisions. It does not provide regulatory approval or guarantee compliance. Applicable requirements, editions and acceptance criteria must be agreed for each assignment.</p>
      <p>Advisory work does not itself constitute inspection, testing, certification, design approval or authorisation to operate. Any such work requires a separately agreed scope and appropriate responsible parties.</p>
      <p>The client retains responsibility for implementing actions, managing site safety and obtaining required approvals. Advice is limited to the agreed question, information supplied and conditions reviewed; changes may require reassessment.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="approach" eyebrow="Our approach" title="Build a review around the available evidence.">
      <ol>
        <li>Define the technical question, intended use of the advice, location and timing.</li>
        <li>Review available drawings, specifications, equipment records and previous findings; identify missing information.</li>
        <li>Agree the review basis, boundaries, deliverables and whether a site consultation is needed.</li>
        <li>Discuss findings, assumptions and recommended next steps with the responsible team.</li>
      </ol>
    </ServiceDetailSection>
    <ServiceDetailSection id="deliverables" eyebrow="Deliverables" title="Specify how the advice will be recorded.">
      <p>Agree the output before work starts. Depending on the assignment, this may be a technical review note, a record of consultation, a requirements or documentation gap list, or a risk assessment with proposed actions.</p>
      <p>Specify the review basis, information considered, assumptions, limitations, findings and recommendations to be included. Agree who will review the output, assign action owners and confirm any follow-up work.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="industries" eyebrow="Relevant industries" title="Put the operating context in the enquiry.">
      <p>Enquiries may relate to oil and gas, petrochemical, energy or construction activities. Explain the process, project stage and site constraints so the proposed review addresses your operating context.</p>
      <p>Include the technical question, asset or material details, relevant specifications, available drawings and records, site location and requested timescale. Highlight any decision deadlines or required deliverable format.</p>
    </ServiceDetailSection>
  </ServiceDetail>;
}
