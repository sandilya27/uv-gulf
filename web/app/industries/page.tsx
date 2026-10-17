import { MaskedHeading } from "@/components/site/MaskedHeading";
import type { Metadata } from "next";
import { Button, Eyebrow, ServiceCard } from "@/components/ds";
import { ServiceDetailSection } from "@/components/inspection/ServiceDetail";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { COURSES, enquiryHref, SERVICES } from "@/lib/content";
import { INDUSTRY_SECTORS } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries | Oil and gas, petrochemical, energy and construction",
  description: "Explore inspection, testing, calibration, technical advisory and training enquiries for oil and gas, petrochemical, energy and construction with UV Gulf.",
};

export default function IndustriesPage() {
  return <>
    <PageHero eyebrow="Industries" title="Support shaped by your industry." lead="Connect your asset challenges and workforce needs with inspection, testing, calibration, technical advisory and training. Start with the equipment, activity and operating context.">
      <Button variant="on-deep" size="lg" arrow href={enquiryHref("General")}>Discuss your industry requirements</Button>
    </PageHero>
    <section className="section" aria-labelledby="sectors">
      <div className="wrap stack-24">
        <Eyebrow>Industry contexts</Eyebrow>
        <MaskedHeading id="sectors" className="h2">Four sectors. A scope built around your site.</MaskedHeading>
        <p className="body-lg">Use these common considerations to prepare your enquiry. The methods, deliverables and site arrangements are agreed for each assignment.</p>
        <div className="service-grid">
          {INDUSTRY_SECTORS.map((industry) => <ServiceCard key={industry.slug} title={industry.title} summary={industry.summary} items={industry.challenges} href={industry.href ?? enquiryHref("General")} cta={industry.href ? `Explore ${industry.title.toLowerCase()}` : `Discuss ${industry.title.toLowerCase()} requirements`} />)}
        </div>
      </div>
    </section>
    <ServiceDetailSection id="asset-challenges" eyebrow="Common asset challenges" title="Bring the right information into the plan.">
      <article><h3>Condition and acceptance</h3><p>Share equipment identification, materials, drawings, previous findings and the requirements referenced by your project. Define what needs examining and how the results will be assessed.</p></article>
      <article><h3>Measurement and records</h3><p>Identify instrument ranges, intended use and available calibration or inspection records. Agree the required report format and supporting documentation before work begins.</p></article>
      <article><h3>Access and people</h3><p>Explain access restrictions, work permits, operating conditions and timing. Include lifting, scaffolding and safety training needs alongside the planned site activities.</p></article>
    </ServiceDetailSection>
    <section className="section" aria-labelledby="industry-services">
      <div className="wrap stack-24">
        <Eyebrow>Relevant services</Eyebrow><MaskedHeading id="industry-services" className="h2">Choose a starting point for your asset.</MaskedHeading>
        <div className="service-grid">{SERVICES.map((service) => <ServiceCard key={service.title} title={service.title} summary={service.summary} href={service.href} cta={`Explore ${service.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
    <section className="section" aria-labelledby="industry-training">
      <div className="wrap stack-24">
        <Eyebrow>Workforce training</Eyebrow><MaskedHeading id="industry-training" className="h2">Connect training with the work ahead.</MaskedHeading>
        <p className="body-lg">Discuss the team’s roles, experience and site activities to identify relevant training requirements.</p>
        <div className="service-grid">{COURSES.map((course) => <ServiceCard key={course.slug} title={course.title} summary={course.summary} href={course.href} cta={`Explore ${course.title.toLowerCase()}`} />)}</div>
      </div>
    </section>
    <CtaBand title="Tell us about your asset, team and site.">
      <Button arrow href={enquiryHref("General")}>Discuss your requirements</Button>
      <Button variant="secondary" href="/#where">View geographical coverage</Button>
    </CtaBand>
  </>;
}
