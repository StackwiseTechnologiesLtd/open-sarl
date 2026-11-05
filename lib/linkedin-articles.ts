import catalog from "@/lib/data/linkedin-articles.json";

export type LinkedInArticleItem = {
  post: number;
  topic: string;
  url: string | null;
};

export type LinkedInArticleCatalog = {
  title: string;
  sourceFile: string;
  columns: readonly string[];
  items: LinkedInArticleItem[];
};

export const linkedInArticles = catalog as LinkedInArticleCatalog;

export function linkedInArticlesWithUrl() {
  return linkedInArticles.items.filter((item): item is LinkedInArticleItem & { url: string } => Boolean(item.url));
}

export function linkedInArticlesMissingUrl() {
  return linkedInArticles.items.filter((item) => !item.url);
}
