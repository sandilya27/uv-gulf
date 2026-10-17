import Link from "next/link";
import type { NewsArticle } from "@/lib/news";
import styles from "./NewsGrid.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Shared listing cards; links are enabled only for available article routes. */
export function NewsGrid({ articles }: { articles: readonly NewsArticle[] }) {
  if (!articles.length) return <div className={styles.empty}>
    <h3>There are no articles to browse yet.</h3>
    <p>For information about inspection services or industrial training, explore our services or contact the UV Gulf team.</p>
    <div className="btn-row"><Link href="/inspection">Explore inspection services</Link><Link href="/training">Explore industrial training</Link></div>
  </div>;

  return <div className={styles.grid}>{articles.map((article) => <article key={article.slug} className={styles.card}>
    {article.image ? <img className={styles.image} src={article.image.src} alt={article.image.alt} loading="lazy" decoding="async" /> : null}
    <div className={styles.copy}>
      <div className={styles.meta}><span>{article.category}</span><time dateTime={article.publishedAt}>{dateFormat.format(new Date(`${article.publishedAt}T00:00:00Z`))}</time></div>
      <h3>{article.href ? <Link href={article.href}>{article.title}</Link> : article.title}</h3>
      <p>{article.summary}</p>
    </div>
  </article>)}</div>;
}
