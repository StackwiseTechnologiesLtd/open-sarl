"use client";

import { useState, type RefObject } from "react";
import {
  copySvg,
  downloadBlob,
  loadAssetSvg,
  svgToPngBlob,
  type LoadableSvgKind,
} from "@/lib/brand-export";
import { brandAssetRaster, type BrandAssetRasterKind } from "@/lib/brand-asset-raster";
import { downloadPdfFromElement } from "@/lib/html2pdf-download";
import type { Locale } from "@/lib/i18n";

export type BoardExportLabels = {
  svg: string;
  png: string;
  pdf: string;
  copy: string;
  copied: string;
};

export type BoardExportConfig =
  | {
      mode: "asset";
      kind: BrandAssetRasterKind;
      filename: string;
      locale?: Locale;
    }
  | {
      mode: "pdf";
      filename: string;
      orientation?: "portrait" | "landscape";
    };

export function BoardExportOverlay({
  config,
  labels,
  boardRef,
  onDark,
}: {
  config: BoardExportConfig;
  labels: BoardExportLabels;
  boardRef?: RefObject<HTMLElement | null>;
  onDark?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function runAsset(action: "svg" | "png" | "copy") {
    if (config.mode !== "asset") return;
    setBusy(true);
    try {
      const svg = await loadAssetSvg(config.kind as LoadableSvgKind, config.locale);
      if (action === "svg") {
        downloadBlob(`${config.filename}.svg`, new Blob([svg], { type: "image/svg+xml" }));
        return;
      }
      if (action === "png") {
        const size = brandAssetRaster[config.kind];
        downloadBlob(`${config.filename}.png`, await svgToPngBlob(svg, size.width, size.height));
        return;
      }
      await copySvg(svg);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } finally {
      setBusy(false);
    }
  }

  async function runPdf() {
    if (config.mode !== "pdf") return;
    const node = boardRef?.current;
    if (!node) return;
    setBusy(true);
    try {
      await downloadPdfFromElement(node, `${config.filename}.pdf`, config.orientation ?? "portrait");
    } finally {
      setBusy(false);
    }
  }

  const barClass = `board-tile-actions${onDark ? " is-on-dark" : ""}`;

  if (config.mode === "pdf") {
    return (
      <div className={barClass}>
        <button type="button" disabled={busy} onClick={() => void runPdf()}>
          {labels.pdf}
        </button>
      </div>
    );
  }

  return (
    <div className={barClass}>
      <button type="button" disabled={busy} onClick={() => void runAsset("svg")}>
        {labels.svg}
      </button>
      <button type="button" disabled={busy} onClick={() => void runAsset("png")}>
        {labels.png}
      </button>
      <button type="button" disabled={busy} onClick={() => void runAsset("copy")}>
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
