"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DocumentA4Viewport } from "@/components/document-a4-viewport";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import type { DocumentTemplateId } from "@/lib/document-templates";
import { getDocumentTemplate } from "@/lib/document-templates";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

const WEBSITE = "www.open-consulting.fr";

function LetterMetaBlock({
  sampleDate,
  toLabel,
  toName,
  toCompany,
  toAddress,
}: {
  sampleDate: string;
  toLabel: string;
  toName: string;
  toCompany: string;
  toAddress: string;
}) {
  return (
    <div className="doc-letter-meta">
      <p className="doc-letter-date">{sampleDate}</p>
      <div className="doc-letter-recipient">
        <span className="doc-letter-to">{toLabel}</span>
        <p className="doc-letter-recipient-name">{toName}</p>
        <p className="doc-letter-recipient-org">{toCompany}</p>
        <p className="doc-letter-recipient-address">
          {toAddress.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export function DocumentTemplateViewer({ templateId }: { templateId: DocumentTemplateId }) {
  const params = useParams();
  const localeParam = params.locale;
  const locale = typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fr";
  const dict = getDictionary(locale as Locale);
  const hub = dict.documentTemplatesHub;
  const shared = dict.documentTemplates;
  const kinds = dict.documentTemplates.kinds;
  const kind = kinds[templateId];
  const v = dict.documentViewer;
  const entry = getDocumentTemplate(templateId)!;

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 sm:pb-16 sm:pt-8 print:bg-white print:pb-0 print:pt-0">
      <div className="mx-auto w-full min-w-0 max-w-none px-4 sm:px-6">
        <DocumentA4Viewport
          title={kind.viewerTitle}
          downloadLabel={v.downloadWebPdf}
          downloadFileName={`${entry.downloadPrefix}_${locale}.pdf`}
          printLabel={shared.print}
          pageCountHint={v.a4TwoPagesHint}
          toolbarExtra={
            <p className="text-sm text-on-surface-variant">
              {kind.intro}{" "}
              <Link href={`/${locale}/documents/templates`} className="font-semibold text-primary hover:underline">
                {hub.allTemplates}
              </Link>
              {" · "}
              <Link href={`/${locale}/documents`} className="font-semibold text-primary hover:underline">
                {v.allDocuments}
              </Link>
            </p>
          }
        >
          <OpenDocumentSheet variant="cover" website={WEBSITE}>
            <p className="doc-cover-kicker">{shared.coverHint}</p>
            <h2 className="doc-cover-title">{kind.coverTitle}</h2>
            {kind.coverSubtitle ? <p className="doc-cover-subtitle">{kind.coverSubtitle}</p> : null}
            <p className="doc-cover-lead doc-cover-lead--placeholder">{kind.coverLead}</p>
          </OpenDocumentSheet>

          {templateId === "letterhead" ? (
            <OpenDocumentSheet variant="letter" website={WEBSITE}>
              <LetterMetaBlock
                sampleDate={shared.sampleDate}
                toLabel={shared.toLabel}
                toName={shared.toName}
                toCompany={shared.toCompany}
                toAddress={shared.toAddress}
              />
              <p className="doc-letter-prose doc-letter-prose--placeholder">{shared.bodyHint}</p>
            </OpenDocumentSheet>
          ) : null}

          {templateId === "proposal" ? (
            <OpenDocumentSheet variant="letter" website={WEBSITE}>
              <LetterMetaBlock
                sampleDate={shared.sampleDate}
                toLabel={shared.toLabel}
                toName={kinds.proposal.toName}
                toCompany={kinds.proposal.toCompany}
                toAddress={shared.toAddress}
              />
              <p className="doc-doc-subject">{kinds.proposal.subjectLabel}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.proposal.sectionObjective}</p>
              <p className="doc-letter-section-title">{kinds.proposal.sectionScopeTitle}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.proposal.sectionScopeBody}</p>
              <p className="doc-letter-section-title">{kinds.proposal.sectionDeliverablesTitle}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.proposal.sectionDeliverablesBody}</p>
            </OpenDocumentSheet>
          ) : null}

          {templateId === "report" ? (
            <OpenDocumentSheet variant="letter" website={WEBSITE}>
              <p className="doc-doc-subject">{kinds.report.reportPeriod}</p>
              <p className="doc-letter-section-title">{kinds.report.sectionSummaryTitle}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.report.sectionSummaryBody}</p>
              <p className="doc-letter-section-title">{kinds.report.sectionFindingsTitle}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.report.sectionFindingsBody}</p>
              <p className="doc-letter-section-title">{kinds.report.sectionNextTitle}</p>
              <p className="doc-letter-prose doc-letter-prose--placeholder">{kinds.report.sectionNextBody}</p>
            </OpenDocumentSheet>
          ) : null}
        </DocumentA4Viewport>
      </div>
    </main>
  );
}
