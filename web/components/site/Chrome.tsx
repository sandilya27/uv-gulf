// Server-rendered building blocks shared across pages.
import Link from "next/link";
import type { ReactNode } from "react";
import { CredentialSeal, Eyebrow, LocationList } from "@/components/ds";
import { DivisionArtifact } from "@/components/site/DivisionArtifact";
import { FOOTER_COLS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="uvg-deep site-footer">
      <div className="wrap site-footer-inner">
        <div className="site-footer-cols">
          <div className="site-footer-brand">
            <img src="/assets/uvgulf-logo-reversed.png" alt="UV Gulf Inspection & Training" />
            <div className="stack-12">
              <CredentialSeal standard="ISO/IEC 17020:2012" label="Inspection body" />
              <CredentialSeal standard="ISO 9001:2015" label="Quality management" />
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="site-footer-col">
              <span className="site-footer-title">{col.title}</span>
              {col.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
        <LocationList />
        <div className="site-footer-legal">
          <span>United Vetting Gulf Co. Ltd. · Khobar, Kingdom of Saudi Arabia</span>
          <a href="mailto:sales@uvgulf.com">sales@uvgulf.com</a>
        </div>
        <div className="footer-gradient-wordmark" aria-hidden="true">UV GULF</div>
      </div>
    </footer>
  );
}

/** Shared cube hero for inner pages, with optional contextual breadcrumbs. */
export function PageHero({ eyebrow, title, lead, titleMeasure = true, artifact = <DivisionArtifact division="inspection" />, breadcrumb, children }: { eyebrow: string; title: string; lead: string; titleMeasure?: boolean; artifact?: ReactNode; breadcrumb?: ReactNode; children?: ReactNode }) {
  return (
    <section data-hero="1" className="uvg-deep page-hero">
      <div className={artifact ? "wrap page-hero-layout" : "wrap"}>
      <div className="page-hero-inner">
        {breadcrumb}
        <div data-reveal="1"><Eyebrow>{eyebrow}</Eyebrow></div>
        <h1 data-reveal="1" data-delay="80" className="page-hero-title" style={titleMeasure ? undefined : { maxWidth: "none" }}>{title}</h1>
        <p data-reveal="1" data-delay="160" className="lead-deep">{lead}</p>
        {children ? <div data-reveal="1" data-delay="240" className="btn-row page-hero-actions">{children}</div> : null}
      </div>
      {artifact ? <div className="page-hero-artifact">{artifact}</div> : null}
      </div>
    </section>
  );
}

/** Full-bleed parallax photo band with navy overlay and on-deep copy. */
export function PhotoBand({ slotId, placeholder, src, height, children }: { slotId: string; placeholder: string; src?: string; height: string; children: ReactNode }) {
  return (
    <section className="photo-band" style={{ height }}>
      <div data-parallax="0.18" className="photo-band-img"><PhotoSlot id={slotId} placeholder={placeholder} src={src} /></div>
      <div className="photo-band-overlay" />
      <div className="uvg-deep photo-band-copy">
        <div data-reveal="1" className="wrap photo-band-text">{children}</div>
      </div>
    </section>
  );
}

/** Shared photography slot; descriptions are also used as accessible alt text. */
export function PhotoSlot({ id, placeholder, src }: { id: string; placeholder: string; src?: string }) {
  if (src) return <img id={id} src={src} alt={placeholder} loading="lazy" decoding="async" className="photo-slot-img" />;
  return (
    <div id={id} className="photo-slot" role="img" aria-label={placeholder}>
      <span>{placeholder}</span>
    </div>
  );
}

export function CtaBand({ title, titleMeasure, children }: { title: string; titleMeasure?: string; children: ReactNode }) {
  return (
    <section className="cta-band">
      <div data-reveal="1" className="wrap cta-band-inner">
        <h2 className="h-cta" style={titleMeasure ? { maxWidth: titleMeasure } : undefined}>{title}</h2>
        <div className="btn-row">{children}</div>
      </div>
    </section>
  );
}
