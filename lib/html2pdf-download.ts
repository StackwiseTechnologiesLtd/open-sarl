import {
  mountStationeryPdfCapture,
  pdfJsFormatForCapture,
  stationeryHtml2PdfOptions,
  unmountStationeryPdfCapture,
} from "@/lib/stationery-pdf-export";

export async function downloadPdfFromElement(
  element: HTMLElement,
  filename: string,
  orientation: "portrait" | "landscape" = "portrait",
) {
  const captureRoot = mountStationeryPdfCapture(element);
  const format = pdfJsFormatForCapture(element);
  const html2pdf = (await import("html2pdf.js")).default;
  const captureTarget =
    captureRoot.firstElementChild instanceof HTMLElement ? captureRoot.firstElementChild : captureRoot;
  try {
    await html2pdf()
      .set({
        ...stationeryHtml2PdfOptions(orientation, format),
        filename,
      })
      .from(captureTarget)
      .save();
  } finally {
    unmountStationeryPdfCapture(captureRoot);
  }
}
