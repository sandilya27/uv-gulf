import { Button, Eyebrow } from "@/components/ds";
import { Divisions } from "@/components/home/Divisions";
import { HomeHero } from "@/components/home/HomeHero";
import { InspectionProcess } from "@/components/home/InspectionProcess";
import { LocationsMap } from "@/components/home/LocationsMap";
import { Marquee } from "@/components/home/Marquee";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { CtaBand, PhotoBand } from "@/components/site/Chrome";
import { HomeVerify } from "@/components/verify/Verifier";
import { COUNTERS, enquiryHref, INDUSTRIES } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <Divisions />

      <section className="section">
        <div className="wrap">
          <div data-reveal="1" className="section-head">
            <div className="stack-12">
              <Eyebrow>Inspection division</Eyebrow>
              <h2 className="h2">What we inspect, test and calibrate</h2>
            </div>
            <Button variant="ghost" arrow href="/inspection">All inspection services</Button>
          </div>
          <ServiceExplorer />
        </div>
      </section>

      <InspectionProcess />

      <PhotoBand slotId="band-home" placeholder="Site photo: inspector at work on a pipeline or plant" height="clamp(380px,62vh,580px)">
        <Eyebrow>On-shore and off-shore</Eyebrow>
        <h2 className="h-band">Inspection on site, wherever the asset is.</h2>
      </PhotoBand>

      <section id="about" className="section anchor">
        <div className="wrap about-grid">
          <div data-reveal="1" className="stack-24">
            <div className="stack-12">
              <Eyebrow>About UV Gulf</Eyebrow>
              <h2 className="h2">An accredited inspection body based in Khobar</h2>
            </div>
            <p className="body-lg">United Vetting Gulf Co. Ltd. provides third-party inspection, non-destructive testing, calibration, technical advisory and industrial training across the Kingdom of Saudi Arabia.</p>
            <div className="chip-row">
              {INDUSTRIES.map((ind) => <span key={ind} className="chip">{ind}</span>)}
            </div>
          </div>
          <div className="counters">
            {COUNTERS.map((k, i) => (
              <div key={k.label} data-reveal="1" data-delay={i * 100} className="counter">
                <span data-count={k.n} className="counter-n">{k.n}</span>
                <span className="counter-label">{k.label}</span>
                <span className="counter-sub">{k.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocationsMap />

      <section className="section">
        <HomeVerify
          intro={
            <>
              <Eyebrow>Certificate verification</Eyebrow>
              <h2 className="h2">Check a UV Gulf certificate</h2>
              <p className="body-lg" style={{ maxWidth: "48ch" }}>Enter the number printed on the certificate or ID card to confirm it was issued by UV Gulf.</p>
            </>
          }
        />
      </section>

      <CtaBand title="Tell us about the asset, the site and the timing." titleMeasure="22ch">
        <Button size="lg" arrow href={enquiryHref("Inspection")}>Send an enquiry</Button>
        <Button variant="secondary" size="lg" href="/training">View training</Button>
      </CtaBand>
    </>
  );
}
