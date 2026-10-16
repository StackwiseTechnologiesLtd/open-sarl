"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/button";

type DocumentA4ViewportProps = {
  title: string;
  downloadLabel: string;
  downloadFileName: string;
  printLabel: string;
  pageCountHint?: string;
  toolbarExtra?: ReactNode;
  children: ReactNode;
};

export function DocumentA4Viewport({
  title,
  downloadLabel,
  downloadFileName,
  printLabel,
  pageCountHint,
  toolbarExtra,
  children,
}: DocumentA4ViewportProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadPdf = useCallback(async () => {
    const el = stackRef.current;
    if (!el) return;
    setBusy(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: downloadFileName,
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], before: ".doc-sheet:not(:first-child)" },
        })
        .from(el)
        .save();
    } finally {
      setBusy(false);
    }
  }, [downloadFileName]);

  return (
    <div className="doc-a4-viewport">
      <div className="doc-a4-toolbar">
        <div className="min-w-0">
          <h1 className="doc-a4-toolbar-title">{title}</h1>
          {pageCountHint ? <p className="doc-a4-toolbar-hint">{pageCountHint}</p> : null}
        </div>
        <div className="doc-a4-toolbar-actions">
          <Button type="button" variant="primary" disabled={busy} onClick={() => void downloadPdf()}>
            {busy ? "…" : downloadLabel}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.print()}>
            {printLabel}
          </Button>
        </div>
        {toolbarExtra ? <div className="doc-a4-toolbar-extra">{toolbarExtra}</div> : null}
      </div>
      <div className="doc-a4-canvas">
        <div ref={stackRef} className="doc-stack doc-stack--a4">
          {children}
        </div>
      </div>
    </div>
  );
}
