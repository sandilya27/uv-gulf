import type { ReactNode } from "react";
import { Button } from "@/components/ds";
import { HERO_CALLOUTS } from "@/lib/hero-callouts";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { enquiryHref } from "@/lib/content";

export { ServiceDetailSection as CourseDetailSection } from "@/components/inspection/ServiceDetail";

export function CourseDetail({ title, lead, enquiryLabel, children }: { title: string; lead: string; enquiryLabel?: string; children: ReactNode }) {
  return <>
    <PageHero callouts={HERO_CALLOUTS.training} eyebrow="Training courses" title={title} lead={lead}>
      <Button variant="on-deep" size="lg" arrow href={enquiryHref("Training")}>{enquiryLabel ?? `Enquire about ${title}`}</Button>
    </PageHero>
    {children}
    <CtaBand title="Discuss your training requirements.">
      <Button arrow href={enquiryHref("Training")}>Send a training enquiry</Button>
      <Button variant="secondary" href="/training">Explore all courses</Button>
    </CtaBand>
  </>;
}
