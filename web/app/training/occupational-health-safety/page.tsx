import type { Metadata } from "next";
import { CourseDetail, CourseDetailSection } from "@/components/training/CourseDetail";
import { CourseFacts } from "@/components/training/CourseFacts";

export const metadata: Metadata = {
  title: "Occupational Health & Safety",
  description: "Explore UV Gulf Occupational Health & Safety training: hazard awareness, risk assessment, workplace controls and incident reporting. Enquire about group training.",
};

export default function OccupationalHealthSafetyPage() {
  return <CourseDetail title="Occupational Health & Safety" enquiryLabel="Enquire about safety training" lead="Build everyday safety awareness and practise identifying hazards, assessing risks and communicating workplace controls.">
    <CourseFacts facts={[
      { label: "Duration", value: "2 days · 12 training hours" },
      { label: "Delivery", value: "Classroom + scenario workshops" },
      { label: "Location", value: "Khobar centre or suitable client site" },
      { label: "Language", value: "English · Arabic support on request" },
      { label: "Group size", value: "Up to 16 participants" },
      { label: "Assessment", value: "Knowledge check + risk-assessment exercise" },
    ]} />
    <CourseDetailSection id="audience" eyebrow="Audience" title="Support safer everyday decisions.">
      <p>This draft programme is intended for supervisors, team leaders, HSE support staff and employees developing workplace safety awareness. Share participants’ responsibilities and workplace hazards so the final content can reflect their roles.</p>
    </CourseDetailSection>
    <CourseDetailSection id="outcomes" eyebrow="Learning outcomes" title="Recognise hazards and communicate controls.">
      <ul><li>Identify common workplace safety and occupational health hazards.</li><li>Use a simple risk-assessment process to identify people at risk and propose controls.</li><li>Explain the hierarchy of controls and the limits of PPE.</li><li>Recognise when to stop work and escalate an unsafe condition through site procedures.</li><li>Describe incident and near-miss reporting and follow agreed emergency instructions.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="syllabus" eyebrow="Proposed syllabus" title="Connect awareness with workplace action.">
      <p>The proposed syllabus and its depth require client approval. Site rules and applicable requirements must be agreed for the intended workplace.</p>
      <ul><li>Roles, responsibilities, communication and participation in workplace safety.</li><li>Hazard identification, risk assessment, hierarchy of controls and reviewing actions.</li><li>Slips and trips, manual handling, ergonomics, machinery and electrical hazard awareness.</li><li>Occupational health awareness: noise, dust, chemicals, heat stress and exposure controls.</li><li>Work-at-height, lifting and permit-controlled work awareness; when specialist training and authorisation are needed.</li><li>Fire prevention, emergency arrangements, incident reporting and learning from near misses.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="entry" eyebrow="Entry requirements" title="Agree a suitable starting point.">
      <p>No mandatory entry requirements have been confirmed by the client. Proposed entry conditions for review are an age of 18 or above and the ability to understand instructions in the agreed delivery language. Basic reading, writing and numeracy are recommended for the risk-assessment exercises. No previous safety qualification or HSE experience is assumed.</p>
      <p>Share roles, prior experience, accessibility and learning-support needs before booking. Classroom exercises require no specialist PPE. If a controlled site walk is agreed, confirm induction, access and site-specific PPE such as safety footwear, helmet and high-visibility clothing in advance.</p>
    </CourseDetailSection>
    <CourseDetailSection id="delivery" eyebrow="Delivery and agenda" title="Work through two days of scenarios.">
      <p>The illustrative programme proposes two days of six training hours each for up to 16 participants. Classroom discussion, case studies and small-group workshops take place at the Khobar centre or a suitable client site; no live hazardous work is included.</p>
      <article><h3>Day 1 — hazards and risk assessment</h3><p>Morning: responsibilities, hazard spotting and occupational health awareness. Afternoon: risk assessment, selecting controls and a guided workplace scenario.</p></article>
      <article><h3>Day 2 — controls and communication</h3><p>Morning: common workplace risks, emergency arrangements and incident reporting. Afternoon: individual risk-assessment exercise, knowledge check and feedback.</p></article>
      <p>Proposed delivery is in English, with Arabic support requested at booking. Agree language support, accessible classroom facilities, presentation equipment and relevant anonymised site examples. Any optional site walk needs separate client approval, supervision and emergency arrangements.</p>
    </CourseDetailSection>
    <CourseDetailSection id="assessment" eyebrow="Assessment" title="Apply the learning to a realistic example.">
      <p>The draft assessment combines a written or instructor-led knowledge check with an individual scenario-based risk assessment. A 70% knowledge pass mark is proposed, together with satisfactory identification of the scenario’s safety-critical hazards, suitable controls and escalation actions.</p>
      <p>Participants needing further support would receive feedback and coaching before reassessment using a fresh scenario or knowledge check. Final questions, assessment rubric, permitted support, reassessment timing and any additional fees require client approval.</p>
    </CourseDetailSection>
    <CourseDetailSection id="certificate" eyebrow="Course completion" title="Record completion of the agreed programme.">
      <p>Proposed title: Occupational Health &amp; Safety — Workplace Awareness. The illustrative completion document is a UV Gulf course-completion certificate for full attendance and successful completion of the agreed assessments. Final title, level, issuer, attendance requirements and certificate wording remain subject to approval.</p>
      <p>A two-year refresher interval is proposed for training planning, with earlier review when duties, hazards or site procedures change. Certificate validity and renewal requirements have not been confirmed.</p>
      <p>This proposed awareness course does not establish a regulated qualification, external awarding-body approval or authorisation for specialist work. Any request for a NEBOSH qualification needs confirmation of the exact qualification, provider relationship and approval evidence before it can be offered or advertised as such.</p>
    </CourseDetailSection>
    <CourseDetailSection id="booking" eyebrow="Group bookings" title="Shape the course around your workplace.">
      <p>Include Occupational Health &amp; Safety in your training enquiry, with participant numbers, roles, prior experience, preferred dates, venue, language and support needs. Describe your main hazards, learning priorities and any client or site requirements.</p>
      <p>Illustrative booking lead time: at least seven working days. Agree the final syllabus, entry conditions, trainer and venue arrangements, assessment, completion document and any optional site-walk controls before confirming a booking. Fees and availability are by enquiry.</p>
    </CourseDetailSection>
  </CourseDetail>;
}
