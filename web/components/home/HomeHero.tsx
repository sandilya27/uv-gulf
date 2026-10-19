"use client";

// Home hero: word-by-word headline, pipe spool scan, and cursor crosshair.
import { useRef, type MouseEvent } from "react";
import { Button, CredentialSeal, Eyebrow } from "@/components/ds";
import { enquiryHref, SITE_CONFIG } from "@/lib/content";
import dynamic from "next/dynamic";
import { HeroGears } from "./HeroGears";
import { HeroTextLoop } from "./HeroTextLoop";

const SpoolScan = dynamic(() => import("./SpoolScan"), { ssr: false });

const WORDS = ["Third-party", "inspection,", "testing", "and", "calibration", "you", "can"];

export function HomeHero() {
  const cross = useRef<HTMLDivElement>(null);
  const crossV = useRef<HTMLDivElement>(null);
  const crossH = useRef<HTMLDivElement>(null);
  const reticle = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!cross.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const target = e.target instanceof Element
      ? e.target.closest<HTMLElement>('a[href], button:not(:disabled), [data-crosshair-target]')
      : null;
    const box = target && e.currentTarget.contains(target) ? target.getBoundingClientRect() : null;
    const pad = (v: number) => String(Math.max(0, Math.round(v))).padStart(4, "0");
    cross.current.style.opacity = "1";
    cross.current.classList.toggle("is-targeting", !!box);
    crossV.current!.style.transform = "translateX(" + x + "px)";
    crossH.current!.style.transform = "translateY(" + y + "px)";
    reticle.current!.style.transform = `translate(${box ? box.left - r.left - 6 : x - 14}px, ${box ? box.top - r.top - 6 : y - 14}px)`;
    reticle.current!.style.width = `${box ? box.width + 12 : 28}px`;
    reticle.current!.style.height = `${box ? box.height + 12 : 28}px`;
    readout.current!.textContent = box
      ? `${Math.round(box.width)} × ${Math.round(box.height)}`
      : "X " + pad(x) + "  Y " + pad(y);
  };
  const onLeave = () => { if (cross.current) cross.current.style.opacity = "0"; };

  return (
    <section data-hero="1" className="uvg-deep home-hero" onMouseMove={onMove} onMouseLeave={onLeave}>
      <HeroGears />
      {SITE_CONFIG.crosshair ? (
        <div ref={cross} className="crosshair" aria-hidden="true">
          <div ref={crossV} className="crosshair-v" />
          <div ref={crossH} className="crosshair-h" />
          <div ref={reticle} className="crosshair-reticle"><span ref={readout} /></div>
        </div>
      ) : null}
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
          <SpoolScan />
          <HeroTextLoop />
        </div>
      </div>
    </section>
  );
}
