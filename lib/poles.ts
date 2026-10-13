export const poleSlugs = ["advisory", "engineering"] as const;
export type PoleSlug = (typeof poleSlugs)[number];

export function isPoleSlug(value: string): value is PoleSlug {
  return value === "advisory" || value === "engineering";
}

export function polePath(locale: string, slug: PoleSlug) {
  return `/${locale}/poles/${slug}`;
}
