import type { Metadata } from "next";
import { Button, Eyebrow, ServiceCard } from "@/components/ds";
import { MethodExplorer } from "@/components/inspection/MethodExplorer";
import { PageHero, PhotoBand } from "@/components/site/Chrome";
import { DivisionArtifact } from "@/components/site/DivisionArtifact";
import { enquiryHref, SERVICES } from "@/lib/content";

export const metadata: Metadata = { title: "Inspection, testing and calibration" };

export default function InspectionPage() {
  return (
    <>
      <PageHero eyebrow="Inspection division" title="Inspection, testing and calibration" lead="Third-party inspection, testing, calibration and technical advisory across the Kingdom." artifact={<DivisionArtifact division="inspection" />}>
        <Button variant="on-deep" size="lg" arrow href={enquiryHref("Inspection")}>Request an inspection</Button>
        <Button variant="outline-deep" size="lg" href="/verify">Verify a certificate</Button>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <h2 data-reveal="1" className="h2" style={{ marginBottom: "var(--space-8)" }}>Services</h2>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <div key={s.title} data-reveal="1" data-delay={i * 90} className="grid-cell">
                <ServiceCard title={s.title} summary={s.summary} items={s.items} code={s.code} href={s.href ?? enquiryHref("Inspection")} cta={s.href ? "Explore third-party inspection" : "Request this service"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MethodExplorer />

      <PhotoBand slotId="band-inspection" src="/assets/images/calibration.webp" placeholder="Illustrative image of pressure gauges and precision calibration equipment on a laboratory bench" height="clamp(380px,60vh,560px)">
        <Eyebrow>Calibration</Eyebrow>
        <p className="h-band-quote">We calibrate pressure, temperature, flow and gas instruments on-shore and off-shore, with certificates traceable to national standards.</p>
      </PhotoBand>
    </>
  );
}
