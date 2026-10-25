"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DocumentA4Viewport } from "@/components/document-a4-viewport";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import { documentTemplateCatalog, type DocumentTemplateId } from "@/lib/document-templates";
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

function LetterheadLetterBody({ locale }: { locale: Locale }) {
  const shared = getDictionary(locale).documentTemplates;
  const lh = shared.kinds.letterhead;
  return (
    <>
      <LetterMetaBlock
        sampleDate={shared.sampleDate}
        toLabel={shared.toLabel}
        toName={shared.toName}
        toCompany={shared.toCompany}
        toAddress={shared.toAddress}
      />
      <p className="doc-doc-subject">{lh.subjectLabel}</p>
      <p className="doc-letter-prose">{lh.salutation}</p>
      <p className="doc-letter-prose">{lh.bodyParagraph1}</p>
      <p className="doc-letter-prose">{lh.bodyParagraph2}</p>
      {lh.closing ? <p className="doc-letter-prose">{lh.closing}</p> : null}
      <p className="doc-letter-prose doc-letter-signature whitespace-pre-line">{lh.signatureBlock}</p>
    </>
  );
}

function TemplateSheets({
  templateId,
  locale,
}: {
  templateId: DocumentTemplateId;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const shared = dict.documentTemplates;
  const kinds = dict.documentTemplates.kinds;
  const cover = kinds[templateId];

  return (
    <>
      <OpenDocumentSheet variant="cover" website={WEBSITE} theme="corporate" className={`doc-sheet--template-${templateId}`}>
        <p className="doc-cover-kicker">{shared.coverHint}</p>
        <h2 className="doc-cover-title">{cover.coverTitle}</h2>
        {cover.coverSubtitle ? <p className="doc-cover-subtitle">{cover.coverSubtitle}</p> : null}
        <p className="doc-cover-lead">{cover.coverLead}</p>
      </OpenDocumentSheet>

      {templateId === "letterhead" ? (
        <OpenDocumentSheet variant="letter" website={WEBSITE} theme="corporate">
          <LetterheadLetterBody locale={locale} />
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
          <p className="doc-letter-prose">{kinds.proposal.sectionObjectiveIntro}</p>
          <p className="doc-letter-section-title">{kinds.proposal.sectionObjectiveTitle}</p>
          <p className="doc-letter-prose">{kinds.proposal.sectionObjective}</p>
          <p className="doc-letter-section-title">{kinds.proposal.sectionScopeTitle}</p>
          <p className="doc-letter-prose">{kinds.proposal.sectionScopeBody}</p>
          <ul className="doc-list">
            {kinds.proposal.sectionScopeBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="doc-letter-section-title">{kinds.proposal.sectionDeliverablesTitle}</p>
          <p className="doc-letter-prose">{kinds.proposal.sectionDeliverablesBody}</p>
          <ul className="doc-list">
            {kinds.proposal.sectionDeliverablesBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="doc-letter-section-title">{kinds.proposal.sectionTermsTitle}</p>
          <p className="doc-letter-prose">{kinds.proposal.sectionTermsBody}</p>
        </OpenDocumentSheet>
      ) : null}

      {templateId === "report" ? (
        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <p className="doc-doc-subject">{kinds.report.reportPeriod}</p>
          <p className="doc-letter-prose">{kinds.report.reportIntro}</p>
          <p className="doc-letter-section-title">{kinds.report.sectionSummaryTitle}</p>
          <p className="doc-letter-prose">{kinds.report.sectionSummaryBody}</p>
          <p className="doc-letter-section-title">{kinds.report.sectionFindingsTitle}</p>
          <p className="doc-letter-prose">{kinds.report.sectionFindingsBody}</p>
          <ul className="doc-list">
            {kinds.report.sectionFindingsBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="doc-letter-section-title">{kinds.report.sectionNextTitle}</p>
          <p className="doc-letter-prose">{kinds.report.sectionNextBody}</p>
          <ul className="doc-list">
            {kinds.report.sectionNextBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </OpenDocumentSheet>
      ) : null}
    </>
  );
}

export function DocumentTemplatesAllViewer({
  embedded = false,
  locale: localeProp,
}: {
  embedded?: boolean;
  locale?: Locale;
} = {}) {
  const params = useParams();
  const localeParam = params.locale;
  const locale =
    localeProp ??
    (typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fr");
  const dict = getDictionary(locale);
  const hub = dict.documentTemplatesHub;
  const v = dict.documentViewer;
  const pageCount = documentTemplateCatalog.length * 2;

  const branding = `/${locale}/branding`;
  const viewport = (
    <DocumentA4Viewport
      title={hub.combinedViewerTitle}
      downloadLabel={v.downloadWebPdf}
      downloadFileName={`OPEN_Document_Templates_${locale}.pdf`}
      printLabel={dict.documentTemplates.print}
      pageCountHint={hub.pageCountHint.replace("{count}", String(pageCount))}
      toolbarExtra={
        <p className="text-sm text-on-surface-variant">
          {hub.combinedIntro}{" "}
          <Link href={`${branding}#documents`} className="font-semibold text-primary hover:underline">
            {v.allDocuments}
          </Link>
          {" · "}
          <Link href={`${branding}#documents-brochure`} className="font-semibold text-primary hover:underline">
            {dict.documentTemplates.backToBrochure}
          </Link>
        </p>
      }
    >
      {documentTemplateCatalog.map((entry) => (
        <TemplateSheets key={entry.id} templateId={entry.id} locale={locale} />
      ))}
    </DocumentA4Viewport>
  );

  if (embedded) {
    return <div className="brand-documents-viewport">{viewport}</div>;
  }

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 sm:pb-16 sm:pt-8 print:bg-white print:pb-0 print:pt-0">
      <div className="mx-auto w-full min-w-0 max-w-none px-4 sm:px-6">{viewport}</div>
    </main>
  );
}

/** @deprecated Single-template view; use DocumentTemplatesAllViewer on /documents/templates */
export function DocumentTemplateViewer({ templateId }: { templateId: DocumentTemplateId }) {
  const params = useParams();
  const localeParam = params.locale;
  const locale = typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fr";
  const dict = getDictionary(locale);
  const hub = dict.documentTemplatesHub;
  const shared = dict.documentTemplates;
  const kinds = dict.documentTemplates.kinds;
  const kind = kinds[templateId];
  const v = dict.documentViewer;

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 sm:pb-16 sm:pt-8 print:bg-white print:pb-0 print:pt-0">
      <div className="mx-auto w-full min-w-0 max-w-none px-4 sm:px-6">
        <DocumentA4Viewport
          title={kind.viewerTitle}
          downloadLabel={v.downloadWebPdf}
          downloadFileName={`OPEN_${templateId}_${locale}.pdf`}
          printLabel={shared.print}
          pageCountHint={v.a4TwoPagesHint}
          toolbarExtra={
            <p className="text-sm text-on-surface-variant">
              <Link href={`/${locale}/documents/templates`} className="font-semibold text-primary hover:underline">
                {hub.allTemplatesCombined}
              </Link>
            </p>
          }
        >
          <TemplateSheets templateId={templateId} locale={locale} />
        </DocumentA4Viewport>
      </div>
    </main>
  );
}
