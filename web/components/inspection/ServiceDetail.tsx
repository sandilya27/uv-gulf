import { MaskedHeading } from "@/components/site/MaskedHeading";
import type { ReactNode } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { enquiryHref } from "@/lib/content";
import styles from "./ServiceDetail.module.css";

export function ServiceDetail({ title, lead, children, ctaLabel = "Request an inspection", ctaTitle = "Tell us what needs inspecting." }: { title: string; lead: string; children: ReactNode; ctaLabel?: string; ctaTitle?: string }) {
  return <>
    <PageHero title={title} lead={lead} eyebrow="Inspection services">
      <Button variant="on-deep" size="lg" arrow href={enquiryHref("Inspection")}>{ctaLabel}</Button>
    </PageHero>
    {children}
    <CtaBand title={ctaTitle}>
      <Button arrow href={enquiryHref("Inspection")}>{ctaLabel}</Button>
      <Button variant="secondary" href="/inspection">Explore inspection services</Button>
    </CtaBand>
  </>;
}

export function ServiceDetailSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return <section className="section" aria-labelledby={id}>
    <div className={`wrap ${styles.section}`}>
      <div><Eyebrow>{eyebrow}</Eyebrow><MaskedHeading id={id} className="h2">{title}</MaskedHeading></div>
      <div className={styles.content}>{children}</div>
    </div>
  </section>;
}
