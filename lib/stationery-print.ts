import { mountStationeryPdfCapture, unmountStationeryPdfCapture } from "@/lib/stationery-pdf-export";

/** Print only the given document stack (A4 sheets), not the surrounding site chrome. */
export function printStationeryStack(source: HTMLElement) {
  const captureRoot = mountStationeryPdfCapture(source);
  captureRoot.classList.add("doc-a4-print-portal");

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    window.removeEventListener("afterprint", onAfterPrint);
    document.documentElement.classList.remove("doc-a4-print-active");
    unmountStationeryPdfCapture(captureRoot);
  };

  const onAfterPrint = () => {
    window.clearTimeout(fallback);
    cleanup();
  };

  window.addEventListener("afterprint", onAfterPrint);
  document.documentElement.classList.add("doc-a4-print-active");

  const fallback = window.setTimeout(cleanup, 60_000);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print();
    });
  });
}
