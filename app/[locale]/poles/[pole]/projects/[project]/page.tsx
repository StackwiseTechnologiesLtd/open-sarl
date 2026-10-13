import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/project-detail-view";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildProjectStaticParams, getPoleProject } from "@/lib/projects";
import { isPoleSlug } from "@/lib/poles";

type Props = { params: Promise<{ locale: string; pole: string; project: string }> };

export function generateStaticParams() {
  return buildProjectStaticParams(getDictionary);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pole, project: projectSlug } = await params;
  if (!isLocale(locale) || !isPoleSlug(pole)) return {};
  const dict = getDictionary(locale);
  const project = getPoleProject(dict, pole, projectSlug);
  if (!project) return {};
  return { title: project.title, description: project.metaDescription };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, pole, project: projectSlug } = await params;
  if (!isLocale(locale) || !isPoleSlug(pole)) notFound();
  const dict = getDictionary(locale);
  const project = getPoleProject(dict, pole, projectSlug);
  if (!project) notFound();

  return <ProjectDetailView locale={locale} dict={dict} pole={pole} project={project} />;
}
