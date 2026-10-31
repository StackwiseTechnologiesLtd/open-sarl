"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/button";
import { printStationeryStack } from "@/lib/stationery-print";

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
      const { mountStationeryPdfCapture, pdfJsFormatForCapture, stationeryHtml2PdfOptions, unmountStationeryPdfCapture } =
        await import("@/lib/stationery-pdf-export");
      const captureRoot = mountStationeryPdfCapture(el);
      const format = pdfJsFormatForCapture(el);
      const html2pdf = (await import("html2pdf.js")).default;
      const captureTarget =
        captureRoot.firstElementChild instanceof HTMLElement ? captureRoot.firstElementChild : captureRoot;
      try {
        await html2pdf()
          .set({
            ...stationeryHtml2PdfOptions("portrait", format),
            filename: downloadFileName,
          })
          .from(captureTarget)
          .save();
      } finally {
        unmountStationeryPdfCapture(captureRoot);
      }
    } finally {
      setBusy(false);
    }
  }, [downloadFileName]);

  const printDocuments = useCallback(() => {
    const el = stackRef.current;
    if (!el) return;
    printStationeryStack(el);
  }, []);

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
          <Button type="button" variant="outline" onClick={printDocuments}>
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
