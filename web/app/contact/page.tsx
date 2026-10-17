import type { Metadata } from "next";
import { LocationList } from "@/components/ds";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { PageHero } from "@/components/site/Chrome";
import { DivisionArtifact } from "@/components/site/DivisionArtifact";
import type { EnquiryType } from "@/lib/content";

export const metadata: Metadata = { title: "Send an enquiry" };

const TYPES: Record<string, EnquiryType> = { inspection: "Inspection", training: "Training", general: "General" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initialType = TYPES[String(type || "").toLowerCase()] || "Inspection";

  return (
    <>
      <PageHero eyebrow="Contact" title="Send an enquiry" lead="Tell us about the asset, the site and the timing. We reply from sales@uvgulf.com." titleMeasure={false} artifact={<DivisionArtifact division="contact" />} />

      <section className="section-contact">
        <div className="wrap contact-grid">
          <div data-reveal="1" className="contact-main">
            <EnquiryForm key={initialType} initialType={initialType} />
          </div>
          <aside data-reveal="1" data-delay="120" className="contact-aside">
            <span className="contact-kicker">LET’S CONNECT</span>
            <h2>Good projects start with a conversation.</h2>
            <p>From your first question to the next step, our inspection and training team is here to help.</p>
            <a href="mailto:sales@uvgulf.com" className="contact-direct"><span>Email our team</span><strong>sales@uvgulf.com <span aria-hidden="true">↗</span></strong></a>
            <div className="contact-locations">
            <LocationList />
            </div>
            <div className="contact-aside-foot"><span aria-hidden="true" />Local knowledge. International standards.</div>
          </aside>
        </div>
      </section>
    </>
  );
}
