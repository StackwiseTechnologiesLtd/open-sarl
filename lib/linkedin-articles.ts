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

export type LinkedInScrapedImage = {
  originalUrl: string;
  localPath: string | null;
  error?: string;
};

/** Shape of `lib/data/linkedin-articles-enriched.json` after `npm run linkedin:scrape`. */
export type LinkedInEnrichedItem = LinkedInArticleItem & {
  resolvedUrl: string | null;
  author: string | null;
  publishedAt: string | null;
  text: string | null;
  hashtags: string[];
  images: LinkedInScrapedImage[];
  pageTitle: string | null;
  error: string | null;
  scrapedAt: string;
};

export type LinkedInEnrichedCatalog = {
  title: string;
  sourceFile: string;
  scrapedAt: string;
  authState: string | null;
  mediaDirectory: string;
  items: LinkedInEnrichedItem[];
};
