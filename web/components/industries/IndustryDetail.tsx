import type { ReactNode } from "react";
import { Button } from "@/components/ds";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { enquiryHref } from "@/lib/content";

export { ServiceDetailSection as IndustryDetailSection } from "@/components/inspection/ServiceDetail";

export function IndustryDetail({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return <>
    <PageHero eyebrow="Industries" title={title} lead={lead}>
      <Button variant="on-deep" size="lg" arrow href={enquiryHref("General")}>Discuss {title.toLowerCase()} requirements</Button>
    </PageHero>
    {children}
    <CtaBand title="Share your asset, site and work programme.">
      <Button arrow href={enquiryHref("General")}>Discuss {title.toLowerCase()} requirements</Button>
      <Button variant="secondary" href="/industries">Explore all industries</Button>
    </CtaBand>
  </>;
}
