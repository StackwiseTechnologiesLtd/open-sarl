"use client";

import { useState } from "react";
import { copySvg, downloadBlob, loadAssetSvg, svgToPngBlob } from "@/lib/brand-export";

const raster = {
  logo: { width: 1600, height: Math.round((1600 * 3030) / 4453) },
  "logo-white": { width: 1600, height: Math.round((1600 * 3030) / 4453) },
  mark: { width: 800, height: Math.round((800 * 2720) / 1535) },
  envelope: { width: 2200, height: 1260 },
  "envelope-paper": { width: 2200, height: 1260 },
} as const;

export function ExportBar({
  kind,
  filename,
  labels,
}: {
  kind: keyof typeof raster;
  filename: string;
  labels: { svg: string; png: string; copy: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function run(action: "svg" | "png" | "copy") {
    setBusy(true);
    try {
      const svg = await loadAssetSvg(kind);
      if (action === "svg") {
        downloadBlob(`${filename}.svg`, new Blob([svg], { type: "image/svg+xml" }));
        return;
      }
      if (action === "png") {
        const size = raster[kind];
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
