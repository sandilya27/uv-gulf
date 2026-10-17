import Link from "next/link";
import { Button } from "@/components/ds";
import { ServiceDetailSection } from "@/components/inspection/ServiceDetail";
import { CtaBand, PageHero } from "@/components/site/Chrome";
import { NewsGrid } from "@/components/site/NewsGrid";
import { enquiryHref } from "@/lib/content";
import { formatArticleDate, type NewsArticle } from "@/lib/news";
import styles from "./NewsArticleDetail.module.css";

export function NewsArticleDetail({ article, related }: { article: NewsArticle; related: readonly NewsArticle[] }) {
  return <>
    <article>
      <PageHero eyebrow={article.category} title={article.title} lead={article.summary} />
      <div className={`wrap section ${styles.content}`}>
        <div className={styles.meta}><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>{article.author ? <span>By {article.author}</span> : null}</div>
        {article.image ? <figure className={styles.figure}><img src={article.image.src} alt={article.image.alt} />{article.image.caption ? <figcaption>{article.image.caption}</figcaption> : null}</figure> : null}
        {article.body.map((section, index) => <section key={section.heading} aria-labelledby={`article-section-${index}`}>
          <h2 id={`article-section-${index}`}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}
        <Link href="/news-insights">Back to News & Insights</Link>
      </div>
    </article>
    {related.length ? <ServiceDetailSection id="related-articles" eyebrow="Keep reading" title="Related insights"><NewsGrid articles={related} /></ServiceDetailSection> : null}
    <CtaBand title="Discuss your inspection or training requirements."><Button arrow href={enquiryHref("General")}>Talk to UV Gulf</Button></CtaBand>
  </>;
}
