import type { Metadata } from "next";
import { Button } from "@/components/ds";
import { NewsSection } from "@/components/site/NewsSection";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { NewsGrid } from "@/components/site/NewsGrid";
import { enquiryHref } from "@/lib/content";
import { getNewsArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Insights | UV Gulf",
  description: "Browse news and insights from UV Gulf on inspection and industrial training, or contact our team to discuss your requirements.",
};

export default function NewsInsightsPage() {
  return <>
    <PageHero eyebrow="News & Insights" title="Perspectives on industrial work." lead="A place for UV Gulf news and insights on inspection and industrial training." />
    <NewsSection id="articles" eyebrow="From UV Gulf" title="News & Insights" intro="Explore updates and perspectives on the equipment, people and requirements behind industrial work.">
      <NewsGrid articles={getNewsArticles()} />
    </NewsSection>
    <CtaBand title="Have an inspection or training enquiry?"><Button arrow href={enquiryHref("General")}>Talk to UV Gulf</Button></CtaBand>
  </>;
}
