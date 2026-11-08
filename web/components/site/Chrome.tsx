import { MaskedHeading } from "@/components/site/MaskedHeading";
// Server-rendered building blocks shared across pages.
import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Button, CredentialSeal, Eyebrow, LocationList } from "@/components/ds";
import { ScanBand } from "@/components/home/ScanBand";
import { FooterWordmark } from "@/components/site/FooterWordmark";
import { HeroCrosshair } from "@/components/site/HeroCrosshair";
import { HeroGears } from "@/components/home/HeroGears";
import { HeroSpool } from "@/components/site/HeroSpool";
import type { HeroCallouts } from "@/lib/hero-callouts";
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
        <FooterWordmark />
      </div>
    </footer>
  );
}

/** Shared hero for inner pages: the homepage spool scan, gears and crosshair, with per-page callouts. */
export function PageHero({ eyebrow, title, accent, lead, callouts, children }: { eyebrow: string; title: string; accent?: string; lead: string; callouts?: HeroCallouts; children?: ReactNode }) {
  return (
    <section data-hero="1" className="uvg-deep page-hero">
      <HeroGears />
      <HeroCrosshair />
      <div className="wrap page-hero-layout">
        <div className="page-hero-inner">
          <div data-reveal="1"><Eyebrow>{eyebrow}</Eyebrow></div>
          <h1 data-reveal="1" data-delay="80" className="page-hero-title">{title}{accent ? <>{" "}<span className="gradient-text-light">{accent}</span></> : null}</h1>
          <p data-reveal="1" data-delay="160" className="lead-deep">{lead}</p>
          {children ? <div data-reveal="1" data-delay="240" className="btn-row page-hero-actions">{children}</div> : null}
        </div>
        <div className="page-hero-artifact"><HeroSpool callouts={callouts} /></div>
      </div>
    </section>
  );
}

/** Full-bleed parallax photo band with navy overlay and on-deep copy. */
export function PhotoBand({ slotId, placeholder, src, height, children, variant = "default", title }: { slotId: string; placeholder: string; src?: string; height: string; children?: ReactNode; variant?: "default" | "scan"; title?: string }) {
  // Homepage-only pinned scan sweep; the heading is passed as a string so its words can be revealed.
  if (variant === "scan" && src && title) return <ScanBand slotId={slotId} src={src} placeholder={placeholder} height={height} title={title}>{children}</ScanBand>;
  return (
    <section className="photo-band" style={{ height }}>
      <div data-parallax="0.18" className="photo-band-img"><PhotoSlot id={slotId} placeholder={placeholder} src={src} /></div>
      <div className="photo-band-overlay" />
      <div className="uvg-deep photo-band-copy">
        <div className="wrap photo-band-text">{children}</div>
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
    <section className="uvg-deep cta-band">
      <div className="wrap cta-band-inner">
        <MaskedHeading className="h-cta" style={titleMeasure ? { maxWidth: titleMeasure } : undefined}>{title}</MaskedHeading>
        <div data-reveal="1" className="btn-row">{Children.map(children, onDeepButton)}</div>
      </div>
    </section>
  );
}

/** The CTA band is dark, so its buttons use the on-deep variants whatever the page asked for. */
function onDeepButton(child: ReactNode) {
  if (!isValidElement<{ variant?: string }>(child) || child.type !== Button) return child;
  const variant = child.props.variant;
  return cloneElement(child, { variant: !variant || variant === "primary" ? "on-deep" : variant === "secondary" || variant === "ghost" ? "outline-deep" : variant } as { variant: "on-deep" });
}
