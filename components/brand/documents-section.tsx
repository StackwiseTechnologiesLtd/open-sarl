"use client";

import { CapabilityBrochure } from "@/components/capability-brochure";
import { DocumentTemplatesAllViewer } from "@/components/document-template-viewer";
import { StationeryPrintPack } from "@/components/brand/stationery-print-pack";
import { documentCatalog } from "@/lib/documents";
import { brandGuide } from "@/lib/brand-guide";
import { printPdfUrl } from "@/lib/print-pdf-url";
import { getDictionary, type Locale } from "@/lib/i18n";

export function BrandDocumentsSection({ locale }: { locale: Locale }) {
  const copy = brandGuide[locale];
  const dict = getDictionary(locale);
  const hub = dict.documentsHub;

  return (
    <div className="brand-documents">
      <div className="brand-documents-block">
        <h3 className="brand-documents-heading">{copy.printPackTitle}</h3>
        <p className="brand-prose">{copy.printPackBody}</p>
        <StationeryPrintPack
          locale={locale}
          labels={copy.printPack}
          exportPdfLabel={copy.exportPdf}
          exportPrintLabel={copy.exportPrint}
        />
      </div>

      <div className="brand-documents-block" id="documents-pdfs">
        <h3 className="brand-documents-heading">{copy.pdfsTitle}</h3>
        <ul className="brand-doc-hub-list">
          {documentCatalog.map((doc) => (
            <li key={doc.id} className="brand-doc-hub-item">
              <div className="brand-doc-hub-card">
                <span className="brand-doc-hub-badge">PDF</span>
                <span className="brand-doc-hub-title">{hub.titles[doc.titleKey]}</span>
              </div>
              <div className="brand-doc-hub-actions">
                <a href={doc.filePath} download={doc.downloadName} className="brand-doc-hub-btn">
                  {copy.exportPdf}
                </a>
                <button
                  type="button"
                  className="brand-doc-hub-btn"
                  onClick={() => printPdfUrl(doc.filePath)}
                >
                  {copy.exportPrint}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="brand-documents-block brand-documents-embed" id="documents-brochure">
        <h3 className="brand-documents-heading">{copy.brochureTitle}</h3>
        <CapabilityBrochure locale={locale} dict={dict} embedded />
      </div>

      <div className="brand-documents-block brand-documents-embed" id="documents-templates">
        <h3 className="brand-documents-heading">{copy.templatesTitle}</h3>
        <DocumentTemplatesAllViewer embedded locale={locale} />
      </div>

      <div className="brand-documents-block">
        <h3 className="brand-documents-heading">{copy.assetsTitle}</h3>
        <ul className="file-list">
          {copy.files.map((file) => (
            <li key={file.href}>
              <a href={file.href} download>
                {file.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
