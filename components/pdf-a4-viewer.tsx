"use client";

import { ButtonLink } from "@/components/button";

export function PdfA4Viewer({
  title,
  description,
  filePath,
  downloadName,
  downloadLabel,
  openLabel,
}: {
  title: string;
  description?: string;
  filePath: string;
  downloadName: string;
  downloadLabel: string;
  openLabel: string;
}) {
  return (
    <div className="doc-a4-viewport">
      <div className="doc-a4-toolbar">
        <div className="min-w-0">
          <h1 className="doc-a4-toolbar-title">{title}</h1>
          {description ? <p className="doc-a4-toolbar-hint">{description}</p> : null}
        </div>
        <div className="doc-a4-toolbar-actions">
          <ButtonLink href={filePath} download={downloadName} variant="primary">
            {downloadLabel}
          </ButtonLink>
          <ButtonLink href={filePath} target="_blank" rel="noopener noreferrer" variant="outline">
            {openLabel}
          </ButtonLink>
        </div>
      </div>
      <div className="doc-a4-canvas">
        <div className="doc-pdf-frame">
          <object data={filePath} type="application/pdf" className="doc-pdf-object" aria-label={title}>
            <iframe src={filePath} title={title} className="doc-pdf-object" />
          </object>
        </div>
      </div>
    </div>
  );
}
