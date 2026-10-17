import type { Metadata } from "next";
import { CourseDetail, CourseDetailSection } from "@/components/training/CourseDetail";
import { CourseFacts } from "@/components/training/CourseFacts";

export const metadata: Metadata = {
  title: "Scaffolding Training",
  description: "Explore UV Gulf Scaffolding Training covering erection, inspection and dismantling of tube-and-fitting and system scaffolds. Enquire about group training.",
};

export default function ScaffoldingTrainingPage() {
  return <CourseDetail title="Scaffolding Training" lead="Develop awareness and practical skills for the erection, inspection and dismantling of tube-and-fitting and system scaffolds.">
    <CourseFacts facts={[
      { label: "Duration", value: "3 days · 24 training hours" },
      { label: "Delivery", value: "Classroom + supervised practical" },
      { label: "Location", value: "Khobar centre or suitable client site" },
      { label: "Language", value: "English · Arabic support on request" },
      { label: "Group size", value: "Up to 10 participants" },
      { label: "Assessment", value: "Knowledge check + observed practical" },
    ]} />
    <CourseDetailSection id="audience" eyebrow="Audience" title="Prepare your scaffolding team.">
      <p>This draft course is intended for scaffolders, supervisors and personnel involved in scaffold inspection. Share participant responsibilities and experience to shape the final scope. Inspection topics introduce checks and reporting; they do not establish an inspector grade or authorise independent inspection.</p>
    </CourseDetailSection>
    <CourseDetailSection id="outcomes" eyebrow="Learning outcomes" title="Recognise hazards and apply agreed checks.">
      <ul><li>Identify common components of tube-and-fitting and system scaffolds.</li><li>Explain the purpose of foundations, bracing, ties, platforms, edge protection and safe access.</li><li>Participate in supervised erection and dismantling using the agreed plan and manufacturer’s instructions.</li><li>Recognise visible defects, record findings and escalate unsafe conditions.</li><li>Explain handover, use restrictions and checks after alterations or events affecting the scaffold.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="syllabus" eyebrow="Proposed syllabus" title="Connect assembly with inspection and safe use.">
      <p>The final syllabus, scaffold configurations and practical limits require client approval before booking.</p>
      <ul><li>Team responsibilities, work-at-height hazards, exclusion zones and emergency arrangements.</li><li>Tube-and-fitting components and couplers; system-scaffold components and manufacturer-specific requirements.</li><li>Ground conditions, base support, stability, ties, bracing, platform loading and safe access.</li><li>Planned erection, platforms, edge protection, handover and site tagging procedures.</li><li>Inspection exercises: component condition, missing protection, unauthorised alterations and defect reporting.</li><li>Controlled dismantling, team communication, handling and storage.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="delivery" eyebrow="Delivery and agenda" title="Build understanding over three days.">
      <p>The illustrative programme proposes three days of eight training hours each, for up to 10 participants. Classroom discussion and demonstrations lead into supervised practical activities at the Khobar centre or a suitable client site.</p>
      <article><h3>Day 1 — components and preparation</h3><p>Morning: roles, hazards, tube-and-fitting and system components. Afternoon: plans, manufacturer’s instructions, foundations, access, stability and component checks.</p></article>
      <article><h3>Day 2 — erection and inspection</h3><p>Morning: supervised assembly of an agreed training configuration. Afternoon: platform and edge protection checks, inspection scenarios, defect recording and handover.</p></article>
      <article><h3>Day 3 — dismantling and assessment</h3><p>Morning: controlled dismantling, component handling and review. Afternoon: knowledge check, individual observed practical tasks and feedback.</p></article>
      <p>Proposed delivery is in English, with Arabic support requested at booking. Agree scaffold types, equipment provision, instructor supervision, classroom, controlled practical area, access and emergency arrangements before confirming the venue. Exercises must stay within the agreed training configuration and site controls.</p>
    </CourseDetailSection>
    <CourseDetailSection id="entry" eyebrow="Entry requirements" title="Agree participant suitability before booking.">
      <p>No mandatory entry requirements have been confirmed by the client. This proposed profile requires approval before becoming an enrolment condition: participants aged 18 or above, able to follow instructions in the delivery language and undertake the agreed practical tasks safely. Basic literacy and numeracy are recommended for reading component information and recording findings. No prior qualification is assumed; disclose scaffolding and work-at-height experience so the programme can be adapted.</p>
      <p>Proposed PPE includes a safety helmet, safety footwear, gloves and high-visibility clothing. Any harness, fall-protection training and additional site PPE requirements must be agreed against the practical activities. Share accessibility, language and support needs in advance.</p>
    </CourseDetailSection>
    <CourseDetailSection id="assessment" eyebrow="Assessment" title="Review knowledge and practical performance.">
      <p>The draft assessment combines a written or instructor-led knowledge check with individual observed tasks in component checking, supervised assembly, defect recognition and controlled dismantling. The proposed knowledge pass mark is 75%, with all safety-critical practical criteria demonstrated satisfactorily.</p>
      <p>Participants needing support would receive feedback and additional coaching before supervised reassessment. Final questions, observation criteria, permitted support, reassessment timing and any additional fees require approval.</p>
    </CourseDetailSection>
    <CourseDetailSection id="certificate" eyebrow="Course completion" title="Document the agreed learning outcome.">
      <p>Proposed course title: Scaffolding Training — Foundation. The illustrative document is a UV Gulf course-completion certificate for participants who attend the full programme and satisfy the agreed assessments. Final title, level, attendance requirements, issuer and wording require approval.</p>
      <p>A two-year refresher interval is proposed for review, with earlier training considered when duties, equipment or site requirements change. This is a training-planning suggestion; certificate validity and renewal requirements remain unconfirmed.</p>
      <p>This draft does not establish a recognised qualification, inspector grade, scheme approval or external awarding-body relationship. Employers must confirm task-specific competence and site authorisation before assigning scaffolding or inspection duties.</p>
    </CourseDetailSection>
    <CourseDetailSection id="booking" eyebrow="Group bookings" title="Tell us about your team and site.">
      <p>Include Scaffolding Training in your enquiry, with participant numbers, roles, experience, preferred dates, location and language. Describe scaffold systems and configurations, tasks and any required client or site standard.</p>
      <p>Illustrative booking lead time: at least 10 working days. Provide participant names, PPE and support needs, equipment details, practical-area arrangements and access requirements. Agree equipment provision, supervision and emergency responsibilities before confirming on-site delivery.</p>
      <p>Fees are by enquiry. Confirm availability, final syllabus, entry conditions, assessment and completion arrangements in the booking agreement. Supply any specific qualification or approval requirement for review before booking.</p>
    </CourseDetailSection>
  </CourseDetail>;
}
