import { CardEntrances } from "@/components/site/CardEntrances";
import { MaskedHeading } from "@/components/site/MaskedHeading";
import { Button, Eyebrow } from "@/components/ds";
import { Divisions } from "@/components/home/Divisions";
import { HomeHero } from "@/components/home/HomeHero";
import { PrecisionField } from "@/components/home/PrecisionField";
import { InspectionProcess } from "@/components/home/InspectionProcess";
import { LocationsMap } from "@/components/home/LocationsMap";
import { Marquee } from "@/components/home/Marquee";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { CtaBand, PhotoBand } from "@/components/site/Chrome";
import { TeamSection } from "@/components/site/TeamSection";
import { NewsGrid } from "@/components/site/NewsGrid";
import { NewsSection } from "@/components/site/NewsSection";
import { getNewsArticles } from "@/lib/news";
import { HomeVerify } from "@/components/verify/Verifier";
import Link from "next/link";
import { COUNTERS, enquiryHref } from "@/lib/content";
import { INDUSTRY_SECTORS } from "@/lib/industries";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <PrecisionField />
      <Divisions />

      <section className="section inspection-services-section">
        <div className="wrap">
          <div className="section-head">
            <div className="stack-12">
              <Eyebrow>Inspection division</Eyebrow>
              <MaskedHeading>What we inspect, test and calibrate</MaskedHeading>
            </div>
            <div data-reveal="1"><Button variant="ghost" arrow href="/inspection">All inspection services</Button></div>
          </div>
          <ServiceExplorer />
        </div>
      </section>

      <InspectionProcess />

      <PhotoBand slotId="band-home" src="/assets/images/inspection.webp" placeholder="Illustrative image of a technician performing ultrasonic inspection on a pipeline" height="clamp(380px,62vh,580px)">
        <Eyebrow>Onshore and offshore</Eyebrow>
        <MaskedHeading className="h-band">On-site inspection, wherever your asset is.</MaskedHeading>
      </PhotoBand>

      <section id="about" className="section anchor about-section">
        <div className="wrap about-grid">
          <div className="stack-24">
            <div className="stack-12">
              <Eyebrow>About UV Gulf</Eyebrow>
              <MaskedHeading>Inspection expertise. Across Saudi Arabia.</MaskedHeading>
            </div>
            <p data-reveal="1" className="body-lg">Based in Khobar, United Vetting Gulf Co. Ltd. provides third-party inspection, non-destructive testing, calibration, technical advisory and industrial training across Saudi Arabia.</p>
            <p data-reveal="1" className="about-industries"><strong>Industries served</strong><span>{INDUSTRY_SECTORS.map((industry, index) => <span key={industry.slug}>{index > 0 ? " · " : ""}{industry.href ? <Link href={industry.href}>{industry.title}</Link> : industry.title}</span>)}</span></p>
            <div data-reveal="1" className="btn-row">
              <Button variant="ghost" arrow href="/about">About UV Gulf</Button>
              <Button variant="ghost" arrow href="/inspection">Explore our services</Button>
              <Button variant="ghost" arrow href="/industries">Explore industries</Button>
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
            <div className="about-credentials">
              <h3 className="counter-label">Accreditation &amp; certification</h3>
              <CardEntrances as="dl" className="about-credential-list">
                <div>
                  <dt>ISO/IEC 17020:2012</dt>
                  <dd>Inspection-body accreditation</dd>
                </div>
                <div>
                  <dt>ISO 9001:2015</dt>
                  <dd>Quality-management system certification</dd>
                </div>
              </CardEntrances>
            </div>
          </div>
        </div>
      </section>

      <TeamSection variant="compact" />

      <section className="home-clients" aria-labelledby="clients-title">
        <div className="wrap">
          <MaskedHeading id="clients-title" className="">Our Clients</MaskedHeading>
          <div className="client-marquee">
          <div className="client-marquee-track">
          {[0, 1, 2].map((copy) => <ul className="home-client-grid" key={copy} aria-hidden={copy > 0 ? true : undefined}>
            {[
              ["SABIC", "sabic"],
              ["Saudi Aramco", "aramco"],
              ["Yasref", "yasref"],
              ["Saudi Electricity Company", "saudi-electricity"],
              ["Marafiq", "marafiq"],
              ["Ma’aden", "maaden"],
            ].map(([name, logo]) => (
              <li key={name}>
                <img src={`/assets/clients/${logo}.jpeg`} alt={name} className="home-client-logo" width={370} height={202} loading="lazy" />
              </li>
            ))}
          </ul>)}
          </div>
          </div>
        </div>
      </section>

      <NewsSection id="home-news-title" eyebrow="From UV Gulf" title="News & Insights" action={<Button variant="ghost" arrow href="/news-insights">View all News & Insights</Button>}>
        <NewsGrid articles={getNewsArticles().slice(0, 3)} />
      </NewsSection>

      <LocationsMap />

      <section className="section">
        <HomeVerify
          intro={
            <>
              <Eyebrow>Certificate verification</Eyebrow>
              <MaskedHeading className="h2">Check a UV Gulf certificate</MaskedHeading>
              <p data-reveal="1" className="body-lg" style={{ maxWidth: "48ch" }}>Enter the number printed on the certificate or ID card to confirm it was issued by UV Gulf.</p>
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
