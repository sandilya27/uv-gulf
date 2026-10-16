import type { Metadata } from "next";
import { Button, Eyebrow } from "@/components/ds";
import { CtaBand, PageHero, PhotoSlot } from "@/components/site/Chrome";
import { CourseGrid } from "@/components/training/CourseGrid";
import { enquiryHref } from "@/lib/content";

export const metadata: Metadata = { title: "Training & certification" };

export default function TrainingPage() {
  return (
    <>
      <PageHero eyebrow="Training division" title="Training & certification" lead="Industrial skills, safety and operator certification for individuals and workforces across the Kingdom." spin={-140000}>
        <Button variant="on-deep" size="lg" arrow href={enquiryHref("Training")}>Ask about group training</Button>
        <Button variant="outline-deep" size="lg" href="/verify">Verify a certificate</Button>
      </PageHero>

      <CourseGrid />

      <section className="section bg-alt">
        <div className="wrap delivery-grid">
          <div data-reveal="1" className="delivery-photo">
            <div data-parallax="0.08" className="delivery-photo-img"><PhotoSlot id="training-photo" placeholder="Training session photo, Khobar centre" /></div>
          </div>
          <div data-reveal="1" data-delay="120" className="stack-16">
            <Eyebrow>Delivery</Eyebrow>
            <h2 className="h2">On site or at our Khobar centre</h2>
            <p className="body-lg" style={{ maxWidth: "48ch" }}>Tell us the course, the number of participants and your preferred dates. We arrange classroom and practical sessions for individuals and workforces.</p>
            <div><Button arrow href={enquiryHref("Training")}>Send a training enquiry</Button></div>
          </div>
        </div>
      </section>

      <CtaBand title="Received a UV Gulf certificate?">
        <Button size="lg" arrow href="/verify">Verify certificate</Button>
      </CtaBand>
    </>
  );
}
