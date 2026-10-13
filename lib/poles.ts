export const poleSlugs = ["advisory", "engineering"] as const;
export type PoleSlug = (typeof poleSlugs)[number];

export function isPoleSlug(value: string): value is PoleSlug {
  return value === "advisory" || value === "engineering";
}

export function polePath(locale: string, slug: PoleSlug) {
  return `/${locale}/poles/${slug}`;
}

export function projectPath(locale: string, pole: PoleSlug, projectSlug: string) {
  return `/${locale}/poles/${pole}/projects/${projectSlug}`;
}

export function listProjectsForPole(dict: { polePages: Record<PoleSlug, { projects: readonly { slug: string }[] }> }, pole: PoleSlug) {
  return dict.polePages[pole].projects;
}
