import type { Dictionary, Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { type PoleSlug, poleSlugs, projectPath } from "@/lib/poles";

export type PoleProject = Dictionary["polePages"][PoleSlug]["projects"][number];
export type ProjectDetail = Dictionary["projectDetails"][keyof Dictionary["projectDetails"]];

export type PoleProjectWithDetail = PoleProject & ProjectDetail;

export function getPoleProject(dict: Dictionary, pole: PoleSlug, slug: string): PoleProjectWithDetail | null {
  const project = dict.polePages[pole].projects.find((item) => item.slug === slug);
  if (!project) return null;
  const detail = dict.projectDetails[slug as keyof Dictionary["projectDetails"]];
  if (!detail) return null;
  return { ...project, ...detail };
}

export function projectSlugsForPole(dict: Dictionary, pole: PoleSlug) {
  return dict.polePages[pole].projects.map((item) => item.slug);
}

export function buildProjectStaticParams(getDict: (locale: Locale) => Dictionary) {
  return locales.flatMap((locale) => {
    const dict = getDict(locale);
    return poleSlugs.flatMap((pole) =>
      projectSlugsForPole(dict, pole).map((project) => ({ locale, pole, project })),
    );
  });
}

export { projectPath };
