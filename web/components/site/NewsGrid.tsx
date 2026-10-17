import { CardEntrances } from "./CardEntrances";
import Link from "next/link";
import { articleHref, formatArticleDate, type NewsArticle } from "@/lib/news";
import styles from "./NewsGrid.module.css";


/** Shared listing cards for published articles with available routes. */
export function NewsGrid({ articles }: { articles: readonly NewsArticle[] }) {
  if (!articles.length) return <div className={styles.empty}>
    <h3>There are no articles to browse yet.</h3>
    <p>For information about inspection services or industrial training, explore our services or contact the UV Gulf team.</p>
    <div className="btn-row"><Link href="/inspection">Explore inspection services</Link><Link href="/training">Explore industrial training</Link></div>
  </div>;

  return <CardEntrances className={styles.grid}>{articles.map((article) => <article key={article.slug} className={styles.card}>
    {article.image ? <img className={styles.image} src={article.image.src} alt={article.image.alt} loading="lazy" decoding="async" /> : null}
    <div className={styles.copy}>
      <div className={styles.meta}><span>{article.category}</span><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time></div>
      <h3><Link href={articleHref(article)}>{article.title}</Link></h3>
      <p>{article.summary}</p>
    </div>
  </article>)}</CardEntrances>;
}
