import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import { PrintButton } from "@/components/print-button";
import { Container } from "@/components/container";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

const WEBSITE = "www.open-consulting.fr";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.documentTemplates.metaTitle,
    description: dict.documentTemplates.metaDescription,
  };
}

export default async function DocumentTemplatePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.documentTemplates;

  return (
    <main className="page-main brochure-page bg-[#e8eaed] pb-12 pt-8 print:bg-white print:pb-0 print:pt-0">
      <Container className="max-w-none px-4 sm:px-6">
        <div className="brochure-toolbar mx-auto mb-8 flex max-w-[210mm] flex-col gap-3 print:hidden">
          <h1 className="font-headline-md text-2xl font-semibold text-primary">{t.title}</h1>
          <p className="text-sm text-on-surface-variant">{t.intro}</p>
          <PrintButton label={t.print} />
          <Link href={`/${locale}/brochure`} className="text-sm font-semibold text-primary hover:underline">
            {t.backToBrochure}
          </Link>
        </div>
        <div className="doc-stack">
          <OpenDocumentSheet variant="cover" website={WEBSITE}>
            <p className="doc-cover-kicker">{t.coverHint}</p>
            <p className="doc-cover-lead doc-cover-lead--placeholder">{t.bodyHint}</p>
          </OpenDocumentSheet>
          <OpenDocumentSheet variant="letter" website={WEBSITE}>
            <p className="doc-cover-lead doc-cover-lead--placeholder">{t.bodyHint}</p>
          </OpenDocumentSheet>
        </div>
      </Container>
    </main>
  );
}
