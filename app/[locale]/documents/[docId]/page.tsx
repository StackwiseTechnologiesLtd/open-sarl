import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PdfA4Viewer } from "@/components/pdf-a4-viewer";
import { Container } from "@/components/container";
import { getDocument } from "@/lib/documents";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; docId: string }> };

export async function generateStaticParams() {
  return [
    { docId: "capability-us-drc-en" },
    { docId: "capability-bilingual" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, docId } = await params;
  if (!isLocale(locale)) return {};
  const doc = getDocument(docId);
  if (!doc) return {};
  const hub = getDictionary(locale).documentsHub;
  return { title: hub.titles[doc.titleKey] };
}

export default async function DocumentViewerPage({ params }: Props) {
  const { locale, docId } = await params;
  if (!isLocale(locale)) notFound();
  const doc = getDocument(docId);
  if (!doc) notFound();

  const dict = getDictionary(locale);
  const hub = dict.documentsHub;
  const viewer = dict.documentViewer;

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 print:bg-white print:pb-0 print:pt-0 sm:pt-8">
      <Container className="max-w-none px-3 sm:px-6">
        <p className="doc-a4-back print:hidden">
          <Link href={`/${locale}/documents`} className="text-sm font-semibold text-primary hover:underline">
            {hub.backToList}
          </Link>
        </p>
        <PdfA4Viewer
          title={hub.titles[doc.titleKey]}
          description={viewer.pdfHint}
          filePath={doc.filePath}
          downloadName={doc.downloadName}
          downloadLabel={viewer.downloadPdf}
          openLabel={viewer.openNewTab}
        />
      </Container>
    </main>
  );
}
