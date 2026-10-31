"use client";

import { useState } from "react";
import { brandAssetRaster, type BrandAssetRasterKind } from "@/lib/brand-asset-raster";
import { copySvg, downloadBlob, loadAssetSvg, type LoadableSvgKind, svgToPngBlob } from "@/lib/brand-export";

export function ExportBar({
  kind,
  filename,
  labels,
}: {
  kind: BrandAssetRasterKind;
  filename: string;
  labels: { svg: string; png: string; copy: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function run(action: "svg" | "png" | "copy") {
    setBusy(true);
    try {
      const svg = await loadAssetSvg(kind as LoadableSvgKind);
      if (action === "svg") {
        downloadBlob(`${filename}.svg`, new Blob([svg], { type: "image/svg+xml" }));
        return;
      }
      if (action === "png") {
        const size = brandAssetRaster[kind];
        downloadBlob(`${filename}.png`, await svgToPngBlob(svg, size.width, size.height));
        return;
      }
      await copySvg(svg);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="export-row">
      <button type="button" disabled={busy} onClick={() => void run("svg")}>
        {labels.svg}
      </button>
      <button type="button" disabled={busy} onClick={() => void run("png")}>
        {labels.png}
      </button>
      <button type="button" disabled={busy} onClick={() => void run("copy")}>
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
