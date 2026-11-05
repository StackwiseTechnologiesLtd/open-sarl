import catalog from "@/lib/data/project-references.json";
import type { Locale } from "@/lib/i18n";
import type { PoleSlug } from "@/lib/poles";

export type LocalizedString = { en: string; fr: string };
export type LocalizedList = { en: string[]; fr: string[] };

export type ProjectReferenceRecord = {
  slug: string;
  post: number;
  pole: PoleSlug;
  linkedinUrl: string | null;
  image: string | null;
  hashtags: string[];
  title: LocalizedString;
  sector: LocalizedString;
  summary: LocalizedString;
  body: LocalizedString;
  metaDescription: LocalizedString;
  clientType: LocalizedString;
  role: LocalizedString;
  status: LocalizedString;
  mandateType: LocalizedString;
  location: LocalizedString;
  challenge: LocalizedString;
  approach: LocalizedString;
  scope: LocalizedList;
  deliverables: LocalizedList;
  outcomes: LocalizedList;
};

export type ProjectReferenceCatalog = {
  source: string;
  builtAt: string;
  featuredSlugs: string[];
  items: ProjectReferenceRecord[];
};

export const projectReferenceCatalog = catalog as ProjectReferenceCatalog;

function pick<T extends LocalizedString | LocalizedList>(value: T, locale: Locale): T extends LocalizedList ? string[] : string {
  return value[locale] as T extends LocalizedList ? string[] : string;
}

export type ResolvedProjectReference = {
  slug: string;
  post: number;
  pole: PoleSlug;
  linkedinUrl: string | null;
  title: string;
  sector: string;
  location: string;
  clientType: string;
  role: string;
  summary: string;
  status: string;
  mandateType: string;
  metaDescription: string;
  body: string;
  challenge: string;
  approach: string;
  scope: string[];
  deliverables: string[];
  outcomes: string[];
  hashtags: string[];
};

export function resolveProjectReference(record: ProjectReferenceRecord, locale: Locale): ResolvedProjectReference {
  return {
    slug: record.slug,
    post: record.post,
    pole: record.pole,
    linkedinUrl: record.linkedinUrl,
    title: pick(record.title, locale),
    sector: pick(record.sector, locale),
    location: pick(record.location, locale),
    clientType: pick(record.clientType, locale),
    role: pick(record.role, locale),
    summary: pick(record.summary, locale),
    status: pick(record.status, locale),
    mandateType: pick(record.mandateType, locale),
    metaDescription: pick(record.metaDescription, locale),
    body: pick(record.body, locale),
    challenge: pick(record.challenge, locale),
    approach: pick(record.approach, locale),
    scope: pick(record.scope, locale),
    deliverables: pick(record.deliverables, locale),
    outcomes: pick(record.outcomes, locale),
    hashtags: record.hashtags,
  };
}

export function getProjectReference(slug: string, locale: Locale): ResolvedProjectReference | null {
  const record = projectReferenceCatalog.items.find((item) => item.slug === slug);
  if (!record) return null;
  return resolveProjectReference(record, locale);
}

export function getProjectReferenceImage(slug: string) {
  const record = projectReferenceCatalog.items.find((item) => item.slug === slug);
  return record?.image ?? null;
}

export function getAllProjectReferenceSlugs() {
  return projectReferenceCatalog.items.map((item) => item.slug);
}

export function getFeaturedReferenceSlugs() {
  return projectReferenceCatalog.featuredSlugs;
}

export function referencesForPole(pole: PoleSlug) {
  return projectReferenceCatalog.items.filter((item) => item.pole === pole);
}
