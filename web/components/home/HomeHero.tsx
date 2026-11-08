"use client";

// Home hero: word-by-word headline, pipe spool scan, and cursor crosshair.
import { Button, CredentialSeal, Eyebrow } from "@/components/ds";
import { enquiryHref } from "@/lib/content";
import { HeroCrosshair } from "@/components/site/HeroCrosshair";
import { HeroSpool } from "@/components/site/HeroSpool";
import { HeroGears } from "./HeroGears";
import { HeroTextLoop } from "./HeroTextLoop";

const WORDS = ["Third-party", "inspection,", "testing", "and", "calibration", "you", "can"];

export function HomeHero() {
  return (
    <section data-hero="1" className="uvg-deep home-hero">
      <HeroGears />
      <HeroCrosshair />
      <div className="wrap home-hero-inner">
        <div className="home-hero-copy">
        <div data-reveal="1"><Eyebrow>Inspection &amp; training · Khobar</Eyebrow></div>
        <h1 data-words="1" className="home-hero-title">
          {WORDS.map((w) => <span key={w}>{w}</span>).flatMap((s, i) => (i ? [" ", s] : [s]))}{" "}
          <span className="gradient-text-light">verify.</span>
        </h1>
        <p data-reveal="1" data-delay="500" className="lead-deep">Third-party inspection, testing, calibration and technical advisory across the Kingdom.</p>
        <div data-reveal="1" data-delay="650" className="btn-row" style={{ marginTop: 8 }}>
          <Button variant="on-deep" size="lg" arrow href={enquiryHref("Inspection")}>Request an inspection</Button>
          <Button variant="outline-deep" size="lg" href="/verify">Verify a certificate</Button>
        </div>
        <div data-reveal="1" data-delay="800" className="home-hero-seals">
          <CredentialSeal standard="ISO/IEC 17020:2012" label="Inspection body" />
          <CredentialSeal standard="ISO 9001:2015" label="Quality management" />
        </div>
        </div>
        <div className="home-hero-visual">
          <HeroSpool />
          <HeroTextLoop />
        </div>
      </div>
    </section>
  );
}
