import type { Metadata } from "next";
import { CourseDetail, CourseDetailSection } from "@/components/training/CourseDetail";
import { CourseFacts } from "@/components/training/CourseFacts";

export const metadata: Metadata = {
  title: "Rigger Training",
  description: "Explore UV Gulf Rigger Training for riggers and lifting supervisors, covering safe slinging, load calculation and signalling. Enquire about classroom and practical delivery.",
};

export default function RiggerTrainingPage() {
  return <CourseDetail title="Rigger Training" lead="Safe slinging, load calculation and signalling for people involved in lifting operations.">
    <CourseFacts facts={[
      { label: "Duration", value: "2 days · 16 training hours" },
      { label: "Delivery", value: "Classroom + supervised practical" },
      { label: "Location", value: "Khobar centre or your site" },
      { label: "Language", value: "English · Arabic support on request" },
      { label: "Group size", value: "Up to 12 participants" },
      { label: "Assessment", value: "Knowledge check + practical demonstration" },
    ]} />
    <CourseDetailSection id="audience" eyebrow="Audience" title="Build skills for lifting operations.">
      <p>Rigger Training is intended for riggers and lifting supervisors. Share your team’s responsibilities, experience and operating environment so the training enquiry can address their work.</p>
    </CourseDetailSection>
    <CourseDetailSection id="outcomes" eyebrow="Learning focus" title="Connect preparation with clear communication.">
      <p>Discuss learning objectives around these core topics when agreeing your course scope:</p>
      <ul><li>Safe slinging: recognise the considerations involved in selecting and using slings for a lifting task.</li><li>Load calculation: understand how load information and the rigging arrangement inform lifting decisions.</li><li>Signalling: understand the importance of agreed signals and clear communication within the lifting team.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="syllabus" eyebrow="Course topics" title="Shape the syllabus around the task.">
      <p>Use the following topics to discuss your training needs. Agree the final syllabus and practical activities with UV Gulf before booking.</p>
      <ul><li>Slinging arrangements, lifting accessories and checks before use.</li><li>Load information, balance and factors affecting the rigging arrangement.</li><li>Signalling, communication and coordination during lifting operations.</li><li>Practical application of the agreed slinging, calculation and signalling topics.</li></ul>
    </CourseDetailSection>
    <CourseDetailSection id="delivery" eyebrow="Delivery" title="Classroom learning and practical application.">
      <p>The draft programme runs over two days, with eight training hours per day, for groups of up to 12. Delivery combines instructor-led discussions, worked examples and supervised practical activities at the Khobar centre or a suitable client site.</p>
      <article><h3>Day 1 — foundations and preparation</h3><p>Lifting-team roles, common hazards, lifting accessories, pre-use checks, load weight and centre of gravity, sling configurations and introductory load calculations.</p></article>
      <article><h3>Day 2 — application and review</h3><p>Signalling and communication, practical slinging exercises, calculation exercises, a knowledge check and an individual practical demonstration.</p></article>
      <p>Draft delivery language: English, with Arabic support requested at booking. Client-site delivery assumes a suitable classroom, a controlled practical area and agreed equipment. Equipment, access and site responsibilities must be agreed before training.</p>
    </CourseDetailSection>
    <CourseDetailSection id="entry" eyebrow="Before booking" title="Discuss participant suitability.">
      <p>Proposed entry profile for client review: participants aged 18 or above, able to follow instruction in the delivery language and perform the agreed practical tasks safely. Basic numeracy is recommended for calculation exercises. No prior qualification is assumed in this draft.</p>
      <p>Participants should bring safety footwear, a helmet, gloves, high-visibility clothing and any additional site-required PPE. Share prior experience, accessibility needs and site-specific requirements when booking so suitable arrangements can be discussed.</p>
      <p>No mandatory prerequisites have yet been confirmed by the client. The proposed entry profile and PPE list require approval before use as enrolment conditions.</p>
    </CourseDetailSection>
    <CourseDetailSection id="assessment" eyebrow="Assessment" title="Check understanding and practical application.">
      <p>Draft assessment: a written or instructor-led knowledge check followed by an observed practical demonstration of preparation, slinging and signalling. The proposed knowledge-check pass mark is 70%, with all safety-critical practical criteria demonstrated satisfactorily.</p>
      <p>Participants needing further support would receive feedback and a supervised reassessment after additional coaching. The assessment format, practical criteria, reassessment arrangements and any fees require client approval.</p>
    </CourseDetailSection>
    <CourseDetailSection id="certificate" eyebrow="Course completion" title="Record the training outcome.">
      <p>Proposed course title: Rigger Training — Foundation. The mock certificate is a UV Gulf course-completion certificate for participants who complete the training and satisfy the agreed assessments.</p>
      <p>For design review, the proposed refresher interval is two years. Certificate issuer, wording, validity and renewal requirements remain subject to client approval. This draft does not establish an accredited qualification, awarding-body approval or authorisation to perform lifting work.</p>
      <p>Employers would still need to confirm task-specific competence and site authorisation before assigning lifting duties.</p>
    </CourseDetailSection>
    <CourseDetailSection id="booking" eyebrow="Training enquiry" title="Share what your team needs.">
      <p>Include Rigger Training in your enquiry, along with participant numbers, experience, site location, preferred dates and delivery language. Describe the lifting activities and any client or site requirements the training needs to address.</p>
      <p>Draft booking lead time: at least five working days before the preferred start date. Provide participant names, delivery language, PPE needs and any client or site assessment requirements. For on-site sessions, include the practical-area and equipment details.</p>
      <p>Fees are quoted on enquiry. Dates, availability, final syllabus, entry conditions and certificate requirements must be confirmed in the booking agreement. If you need a particular qualification or approval, share the exact requirement for review.</p>
    </CourseDetailSection>
  </CourseDetail>;
}
