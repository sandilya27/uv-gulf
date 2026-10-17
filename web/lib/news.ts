/** Only owner-approved articles belong here. Keep unpublished editorial notes in page-plans. */
export type NewsArticle = {
  slug: string;
  title: string;
  category: "News" | "Insight";
  summary: string;
  /** ISO calendar date: YYYY-MM-DD. */
  publishedAt: string;
  body: readonly string[];
  author?: string;
  image?: { src: string; alt: string };
  /** Set only when the article route exists. */
  href?: `/news-insights/${string}`;
};

export const NEWS_ARTICLES: readonly NewsArticle[] = [];

export function getNewsArticles(): NewsArticle[] {
  return [...NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
