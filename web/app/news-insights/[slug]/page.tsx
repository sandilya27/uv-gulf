import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleDetail } from "@/components/site/NewsArticleDetail";
import { getNewsArticle, getNewsArticles } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNewsArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: Props) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  return <NewsArticleDetail article={article} related={getNewsArticles().filter((item) => item.slug !== article.slug).slice(0, 2)} />;
}
