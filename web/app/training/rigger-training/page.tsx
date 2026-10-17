import type { Metadata } from "next";
import { CourseDetail, CourseDetailSection } from "@/components/training/CourseDetail";

export const metadata: Metadata = {
  title: "Rigger Training",
  description: "Explore UV Gulf Rigger Training for riggers and lifting supervisors, covering safe slinging, load calculation and signalling. Enquire about classroom and practical delivery.",
};

export default function RiggerTrainingPage() {
  return <CourseDetail title="Rigger Training" lead="Safe slinging, load calculation and signalling for people involved in lifting operations.">
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
      <p>The course combines classroom and practical delivery. Include your preferred location, dates and participant numbers in the enquiry, and discuss the equipment and space available for practical sessions.</p>
      <p>Agree duration, language, venue and practical arrangements before confirming the booking.</p>
    </CourseDetailSection>
    <CourseDetailSection id="entry" eyebrow="Before booking" title="Discuss participant suitability.">
      <p>Tell us about participants’ current roles, previous lifting experience and any training already completed. Discuss entry requirements with UV Gulf before enrolling so the proposed course suits the group.</p>
    </CourseDetailSection>
    <CourseDetailSection id="booking" eyebrow="Training enquiry" title="Share what your team needs.">
      <p>Include Rigger Training in your enquiry, along with participant numbers, experience, site location, preferred dates and delivery language. Describe the lifting activities and any client or site requirements the training needs to address.</p>
      <p>If you need a particular qualification, assessment or certificate, include the exact requirement so its suitability and availability can be discussed before booking.</p>
    </CourseDetailSection>
  </CourseDetail>;
}
