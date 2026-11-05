import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import {
  getFeaturedReferenceSlugs,
  getProjectReference,
  projectReferenceCatalog,
  referencesForPole,
  type ResolvedProjectReference,
} from "@/lib/project-references";
import { type PoleSlug, poleSlugs, projectPath } from "@/lib/poles";

export type PoleProjectListing = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  clientType: string;
  role: string;
  summary: string;
  status: string;
};

export type PoleProjectWithDetail = ResolvedProjectReference;

export type ProjectListing = {
  pole: PoleSlug;
  project: PoleProjectListing;
};

function toListing(ref: ResolvedProjectReference): PoleProjectListing {
  return {
    slug: ref.slug,
    title: ref.title,
    sector: ref.sector,
    location: ref.location,
    clientType: ref.clientType,
    role: ref.role,
    summary: ref.summary,
    status: ref.status,
  };
}

export function getPoleProject(locale: Locale, pole: PoleSlug, slug: string): PoleProjectWithDetail | null {
  const ref = getProjectReference(slug, locale);
  if (!ref || ref.pole !== pole) return null;
  return ref;
}

export function projectSlugsForPole(pole: PoleSlug) {
  return referencesForPole(pole).map((item) => item.slug);
}

export function findPoleForProject(slug: string): PoleSlug | null {
  const record = projectReferenceCatalog.items.find((item) => item.slug === slug);
  return record?.pole ?? null;
}

export function getAllProjects(locale: Locale): ProjectListing[] {
  return projectReferenceCatalog.items.map((record) => {
    const ref = getProjectReference(record.slug, locale)!;
    return { pole: record.pole, project: toListing(ref) };
  });
}

export function getFeaturedProjects(locale: Locale): ProjectListing[] {
  return getFeaturedReferenceSlugs()
    .map((slug) => {
      const pole = findPoleForProject(slug);
      if (!pole) return null;
      const ref = getProjectReference(slug, locale);
      if (!ref) return null;
      return { pole, project: toListing(ref) };
    })
    .filter((item): item is ProjectListing => item !== null);
}

export function buildProjectStaticParams() {
  return locales.flatMap((locale) =>
    poleSlugs.flatMap((pole) =>
      projectSlugsForPole(pole).map((project) => ({ locale, pole, project })),
    ),
  );
}

export function poleProjects(locale: Locale, pole: PoleSlug): ProjectListing[] {
  return referencesForPole(pole).map((record) => {
    const ref = getProjectReference(record.slug, locale)!;
    return { pole, project: toListing(ref) };
  });
}

export { projectPath };
