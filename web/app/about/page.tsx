import type { Metadata } from "next";
import { Button } from "@/components/ds";
import { ServiceDetailSection } from "@/components/inspection/ServiceDetail";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { TeamSection } from "@/components/site/TeamSection";
import { LayeredPhotography } from "@/components/site/LayeredPhotography";
import { enquiryHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "About UV Gulf | Inspection & Training",
  description: "Meet United Vetting Gulf Co. Ltd., based in Khobar, and explore our approach to inspection, testing, calibration, technical advisory and industrial training in Saudi Arabia.",
};

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About UV Gulf" title="Inspection and training. A clear way forward." lead="Based in Khobar, United Vetting Gulf Co. Ltd. provides third-party inspection, non-destructive testing, calibration, technical advisory and industrial training across Saudi Arabia.">
      <Button variant="on-deep" size="lg" arrow href={enquiryHref("General")}>Talk to UV Gulf</Button>
    </PageHero>
    <ServiceDetailSection id="company" eyebrow="United Vetting Gulf" title="Support for assets and the people who work with them." media={<LayeredPhotography photos={[
      { src: "/assets/images/inspection.webp", alt: "Illustrative image of a technician inspecting a pipeline weld" },
      { src: "/assets/images/training.webp", alt: "Illustrative image of an instructor demonstrating pipe inspection to industrial trainees" },
    ]} />}>
      <p>UV Gulf brings inspection services and industrial training together for oil and gas, petrochemical, energy and construction enquiries. Start with your equipment, site activities and workforce requirements so the scope can be discussed in context.</p>
      <div className="btn-row"><Button variant="ghost" arrow href="/inspection">Explore inspection services</Button><Button variant="ghost" arrow href="/training">Explore industrial training</Button></div>
    </ServiceDetailSection>
    <ServiceDetailSection id="direction" eyebrow="Our direction" title="Vision and mission.">
      <p>Proposed vision and mission for owner review.</p>
      <article><h3>Proposed vision</h3><p>To support safer industrial work through clear technical information and practical learning.</p></article>
      <article><h3>Proposed mission</h3><p>To help clients define inspection and training needs, understand findings and prepare their people for the work ahead.</p></article>
    </ServiceDetailSection>
    <ServiceDetailSection id="approach" eyebrow="Our approach" title="Start with the requirement. Agree the scope.">
      <article><h3>Understand the work</h3><p>Share the asset, location, timing and relevant project requirements. For training, include participants’ roles, experience and site activities.</p></article>
      <article><h3>Define the assignment</h3><p>Discuss methods, access, responsibilities and expected outputs before work begins. Confirm the applicable requirements and any limitations within the agreed scope.</p></article>
      <article><h3>Make the next step clear</h3><p>Agree how findings or training outcomes will be communicated, which records are needed and who will review any follow-up actions.</p></article>
    </ServiceDetailSection>
    <ServiceDetailSection id="commitments" eyebrow="Quality, impartiality and safety" title="Principles for each assignment.">
      <article><h3>Quality</h3><p>Define the acceptance basis and deliverables clearly. Keep observations, supporting records and limitations understandable for the people reviewing the work.</p></article>
      <article><h3>Impartiality</h3><p>Base findings on the agreed requirements and available evidence. Raise potential conflicts of interest when defining an assignment.</p></article>
      <article><h3>Safety</h3><p>Discuss site hazards, permits, access and operating conditions before attendance. Coordinate the work with the responsible site team.</p></article>
    </ServiceDetailSection>
    <ServiceDetailSection id="coverage" eyebrow="Geographical coverage" title="Based in Khobar. Supporting enquiries across Saudi Arabia.">
      <p>Discuss your site location, access arrangements and schedule with our Khobar head office. Availability and mobilisation arrangements are confirmed for each assignment.</p>
      <div className="btn-row"><Button variant="ghost" arrow href="/#where">View geographical coverage</Button><Button variant="ghost" arrow href="/industries">Explore the industries we serve</Button></div>
    </ServiceDetailSection>
    <TeamSection variant="full" />
    <CtaBand title="Tell us about your asset, team and site."><Button arrow href={enquiryHref("General")}>Discuss your requirements</Button></CtaBand>
  </>;
}
