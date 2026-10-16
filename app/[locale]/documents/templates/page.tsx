import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentTemplatesAllViewer } from "@/components/document-template-viewer";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.documentTemplatesHub.combinedViewerTitle,
    description: dict.documentTemplatesHub.metaDescription,
  };
}

export default async function DocumentTemplatesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <DocumentTemplatesAllViewer />;
}
