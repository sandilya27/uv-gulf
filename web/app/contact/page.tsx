import type { Metadata } from "next";
import { LocationList } from "@/components/ds";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { PageHero } from "@/components/site/Chrome";
import type { EnquiryType } from "@/lib/content";

export const metadata: Metadata = { title: "Send an enquiry" };

const TYPES: Record<string, EnquiryType> = { inspection: "Inspection", training: "Training", general: "General" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initialType = TYPES[String(type || "").toLowerCase()] || "Inspection";

  return (
    <>
      <PageHero eyebrow="Contact" title="Send an enquiry" lead="Tell us about the asset, the site and the timing. We reply from sales@uvgulf.com." spin={-140000} titleMeasure={false} />

      <section className="section-contact">
        <div className="wrap contact-grid">
          <div data-reveal="1" className="contact-main">
            <EnquiryForm key={initialType} initialType={initialType} />
          </div>
          <div data-reveal="1" data-delay="120" className="stack-24">
            <LocationList />
            <div className="stack-4">
              <span className="uvg-label">Email</span>
              <a href="mailto:sales@uvgulf.com" className="contact-email">sales@uvgulf.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
