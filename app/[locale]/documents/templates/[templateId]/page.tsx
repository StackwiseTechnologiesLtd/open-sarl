import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentTemplateViewer } from "@/components/document-template-viewer";
import { isDocumentTemplateId } from "@/lib/document-templates";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; templateId: string }> };

export function generateStaticParams() {
  return [
    { templateId: "letterhead" },
    { templateId: "proposal" },
    { templateId: "report" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, templateId } = await params;
  if (!isLocale(locale) || !isDocumentTemplateId(templateId)) return {};
  const dict = getDictionary(locale);
  const kind = dict.documentTemplates.kinds[templateId];
  return {
    title: kind.viewerTitle,
    description: kind.desc,
  };
}

export default async function DocumentTemplatePage({ params }: Props) {
  const { locale, templateId } = await params;
  if (!isLocale(locale)) notFound();
  if (!isDocumentTemplateId(templateId)) notFound();

  return <DocumentTemplateViewer templateId={templateId} />;
}
