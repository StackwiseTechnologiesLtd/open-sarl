import { redirect } from "next/navigation";
import { getDocument } from "@/lib/documents";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; docId: string }> };

export async function generateStaticParams() {
  return [
    { docId: "capability-us-drc-en" },
    { docId: "capability-bilingual" },
  ];
}

export default async function DocumentViewerPage({ params }: Props) {
  const { locale, docId } = await params;
  if (!isLocale(locale)) redirect("/fr/branding#documents-pdfs");
  const doc = getDocument(docId);
  if (!doc) redirect(`/${locale}/branding#documents-pdfs`);
  redirect(`/${locale}/branding#documents-pdfs`);
}
