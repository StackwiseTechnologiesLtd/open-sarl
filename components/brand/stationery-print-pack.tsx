"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  CoverSheet,
  CardSheet,
  EnvelopeSheet,
  InvoiceSheet,
  LetterSheet,
  ReceiptSheet,
} from "@/components/brand/specimens";
import {
  downloadBlob,
  loadAssetSvg,
  svgToPngBlob,
  type EnvelopeAssetKind,
} from "@/lib/brand-export";
import { brandGuide, cardBoard, type BrandCopy } from "@/lib/brand-guide";
import { downloadPdfFromElement } from "@/lib/html2pdf-download";
import type { Locale } from "@/lib/i18n";

const A4 = { width: 794, height: 1123 };
const ENVELOPE_PNG = { width: 3300, height: 1890 };

type SheetKey =
  | "cover-paper"
  | "cover-navy"
  | "letter"
  | "invoice"
  | "receipt"
  | "card-icons"
  | "card-address"
  | "card-back"
  | "card-front";

const sheetOrder: SheetKey[] = [
  "cover-paper",
  "cover-navy",
  "letter",
  "invoice",
  "receipt",
  "card-icons",
  "card-address",
  "card-back",
  "card-front",
];

const envelopeKinds: { kind: EnvelopeAssetKind; filename: string }[] = [
  { kind: "envelope-print", filename: "open-envelope-navy-print.png" },
  { kind: "envelope-paper-print", filename: "open-envelope-paper-print.png" },
];

function PrintSheet({
  sheetKey,
  width,
  height,
  children,
}: {
  sheetKey?: SheetKey;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <div
      className="brand-print-sheet"
      data-print-sheet={sheetKey}
      style={{ width, height }}
    >
      <div className="brand-print-sheet-inner" style={{ width, height }}>{children}</div>
    </div>
  );
}

export function StationeryPrintPack({
  locale,
  labels,
}: {
  locale: Locale;
  labels: BrandCopy["printPack"];
}) {
  const copy = brandGuide[locale];
  const stackRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const run = useCallback(async (task: () => Promise<void>, id: string) => {
    setBusy(id);
    try {
      await task();
    } finally {
      setBusy(null);
    }
  }, []);

  const downloadSheet = useCallback(
    async (key: SheetKey) => {
      const stack = stackRef.current;
      if (!stack) return;
      const sheet = stack.querySelector(`[data-print-sheet="${key}"]`);
      if (!(sheet instanceof HTMLElement)) return;
      await downloadPdfFromElement(sheet, `open-${key}.pdf`, "portrait");
    },
    [],
  );

  const downloadAllSheets = useCallback(async () => {
    const stack = stackRef.current;
    if (!stack) return;
    await downloadPdfFromElement(stack, `open-stationery-${locale}.pdf`, "portrait");
  }, [locale]);

  const downloadEnvelope = useCallback(async (kind: EnvelopeAssetKind, filename: string) => {
    const svg = await loadAssetSvg(kind);
    const blob = await svgToPngBlob(svg, ENVELOPE_PNG.width, ENVELOPE_PNG.height);
    downloadBlob(filename, blob);
  }, []);

  const downloadAllEnvelopes = useCallback(async () => {
    for (const item of envelopeKinds) {
      await downloadEnvelope(item.kind, item.filename);
    }
  }, [downloadEnvelope]);

  const downloadEverything = useCallback(async () => {
    await downloadAllSheets();
    await downloadAllEnvelopes();
  }, [downloadAllEnvelopes, downloadAllSheets]);

  const sheetLabels: Record<SheetKey, string> = labels.sheets;

  return (
    <div className="print-pack">
      <div className="print-pack-actions">
        <button type="button" disabled={busy !== null} onClick={() => void run(downloadEverything, "all")}>
          {busy === "all" ? "…" : labels.downloadAll}
        </button>
        <button type="button" disabled={busy !== null} onClick={() => void run(downloadAllSheets, "a4")}>
          {busy === "a4" ? "…" : labels.downloadAllA4}
        </button>
        <button type="button" disabled={busy !== null} onClick={() => void run(downloadAllEnvelopes, "env")}>
          {busy === "env" ? "…" : labels.downloadAllEnvelopes}
        </button>
      </div>
      <ul className="print-pack-list">
        {sheetOrder.map((key) => (
          <li key={key}>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => void run(() => downloadSheet(key), key)}
            >
              {sheetLabels[key]}
            </button>
          </li>
        ))}
        {envelopeKinds.map((item) => (
          <li key={item.kind}>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => void run(() => downloadEnvelope(item.kind, item.filename), item.kind)}
            >
              {item.kind.includes("paper") ? labels.envelopePaper : labels.envelopeNavy}
            </button>
          </li>
        ))}
      </ul>

      <div className="brand-print-offscreen" aria-hidden="true">
        <div ref={stackRef} className="brand-print-stack">
          <PrintSheet sheetKey="cover-paper" width={A4.width} height={A4.height}>
            <CoverSheet />
          </PrintSheet>
          <PrintSheet sheetKey="cover-navy" width={A4.width} height={A4.height}>
            <CoverSheet navy />
          </PrintSheet>
          <PrintSheet sheetKey="letter" width={A4.width} height={A4.height}>
            <LetterSheet copy={copy} />
          </PrintSheet>
          <PrintSheet sheetKey="invoice" width={A4.width} height={A4.height}>
            <InvoiceSheet copy={copy} locale={locale} />
          </PrintSheet>
          <PrintSheet sheetKey="receipt" width={A4.width} height={A4.height}>
            <ReceiptSheet copy={copy} locale={locale} />
          </PrintSheet>
          <PrintSheet sheetKey="card-icons" width={cardBoard.width} height={cardBoard.height}>
            <CardSheet copy={copy} variant="icons" />
          </PrintSheet>
          <PrintSheet sheetKey="card-address" width={cardBoard.width} height={cardBoard.height}>
            <CardSheet copy={copy} variant="address" />
          </PrintSheet>
          <PrintSheet sheetKey="card-back" width={cardBoard.width} height={cardBoard.height}>
            <CardSheet copy={copy} variant="back" />
          </PrintSheet>
          <PrintSheet sheetKey="card-front" width={cardBoard.width} height={cardBoard.height}>
            <CardSheet copy={copy} variant="front" />
          </PrintSheet>
        </div>
        <div className="brand-print-stack">
          <PrintSheet width={1100} height={630}>
            <EnvelopeSheet label={copy.envelopeTitle} variant="navy" />
          </PrintSheet>
          <PrintSheet width={1100} height={630}>
            <EnvelopeSheet label={copy.envelopeTitle} variant="paper" />
          </PrintSheet>
        </div>
      </div>
    </div>
  );
}
