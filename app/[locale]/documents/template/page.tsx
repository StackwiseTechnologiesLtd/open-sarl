"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DocumentA4Viewport } from "@/components/document-a4-viewport";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

const WEBSITE = "www.open-consulting.fr";

export default function DocumentTemplatePage() {
  const params = useParams();
  const localeParam = params.locale;
  const locale = typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fr";
  const dict = getDictionary(locale as Locale);
  const t = dict.documentTemplates;
  const v = dict.documentViewer;

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 sm:pt-8 print:bg-white print:pb-0 print:pt-0">
      <div className="mx-auto max-w-none px-3 sm:px-6">
        <DocumentA4Viewport
          title={t.title}
          downloadLabel={v.downloadWebPdf}
          downloadFileName={`OPEN_Letterhead_Template_${locale}.pdf`}
          printLabel={t.print}
          pageCountHint={v.a4TwoPagesHint}
          toolbarExtra={
            <p className="text-sm text-on-surface-variant">
              {t.intro}{" "}
              <Link href={`/${locale}/documents`} className="font-semibold text-primary hover:underline">
                {v.allDocuments}
              </Link>
              {" · "}
              <Link href={`/${locale}/brochure`} className="font-semibold text-primary hover:underline">
                {t.backToBrochure}
              </Link>
            </p>
          }
        >
          <OpenDocumentSheet variant="cover" website={WEBSITE}>
            <p className="doc-cover-kicker">{t.coverHint}</p>
            <p className="doc-cover-lead doc-cover-lead--placeholder">{t.bodyHint}</p>
          </OpenDocumentSheet>
          <OpenDocumentSheet variant="letter" website={WEBSITE}>
            <div className="doc-letter-meta">
              <p className="doc-letter-date">{t.sampleDate}</p>
              <div className="doc-letter-recipient">
                <span className="doc-letter-to">{t.toLabel}</span>
                <p className="doc-letter-recipient-name">{t.toName}</p>
                <p className="doc-letter-recipient-org">{t.toCompany}</p>
                <p className="doc-letter-recipient-address">
                  {t.toAddress.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <p className="doc-letter-prose doc-letter-prose--placeholder">{t.bodyHint}</p>
          </OpenDocumentSheet>
        </DocumentA4Viewport>
      </div>
    </main>
  );
}
