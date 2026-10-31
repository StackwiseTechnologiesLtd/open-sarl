/** A4 at 96 CSS px/in — matches brand board artboards (794×1123). */
export const STATIONERY_A4_PX = { width: 794, height: 1123 } as const;

function applyA4SheetStyles(el: HTMLElement) {
  el.style.boxSizing = "border-box";
  el.style.width = `${STATIONERY_A4_PX.width}px`;
  el.style.height = `${STATIONERY_A4_PX.height}px`;
  el.style.minHeight = `${STATIONERY_A4_PX.height}px`;
  el.style.maxWidth = "none";
  el.style.transform = "none";
  el.style.flexShrink = "0";
}

function boardPixelSize(source: HTMLElement) {
  const w = Number.parseInt(source.style.width, 10) || source.offsetWidth || STATIONERY_A4_PX.width;
  const h = Number.parseInt(source.style.height, 10) || source.offsetHeight || STATIONERY_A4_PX.height;
  return { width: w, height: h };
}

function isCardCapture(source: HTMLElement) {
  return Boolean(source.querySelector(".visit")) && !source.querySelector(".stat-sheet, .doc-sheet");
}

/** Clone stationery DOM at designed pixel size for html2pdf / print capture. */
export function mountStationeryPdfCapture(source: HTMLElement): HTMLElement {
  const host = document.createElement("div");
  host.className = "stationery-pdf-capture";
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-9999px;top:0;z-index:-1;pointer-events:none;background:#fff;";

  if (source.classList.contains("doc-stack")) {
    const stack = source.cloneNode(true) as HTMLElement;
    stack.style.display = "flex";
    stack.style.flexDirection = "column";
    stack.style.gap = "0";
    stack.style.alignItems = "flex-start";
    stack.querySelectorAll(".doc-sheet, .stat-sheet").forEach((node) => {
      if (node instanceof HTMLElement) applyA4SheetStyles(node);
    });
    host.appendChild(stack);
    document.body.appendChild(host);
    return host;
  }

  const clone = source.cloneNode(true) as HTMLElement;

  if (clone.classList.contains("board")) {
    const { width, height } = boardPixelSize(source);
    clone.style.boxSizing = "border-box";
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.transform = "none";
    host.style.width = `${width}px`;
    host.style.height = `${height}px`;
    host.style.overflow = "hidden";
    host.appendChild(clone);
    document.body.appendChild(host);
    return host;
  }

  if (clone.classList.contains("stat-sheet") || clone.classList.contains("doc-sheet")) {
    applyA4SheetStyles(clone);
  } else {
    clone.querySelectorAll(".stat-sheet, .doc-sheet").forEach((node) => {
      if (node instanceof HTMLElement) applyA4SheetStyles(node);
    });
  }

  host.style.width = `${STATIONERY_A4_PX.width}px`;
  host.style.height = `${STATIONERY_A4_PX.height}px`;
  host.style.overflow = "hidden";
  host.appendChild(clone);
  document.body.appendChild(host);
  return host;
}

export function pdfJsFormatForCapture(source: HTMLElement): "a4" | [number, number] {
  if (isCardCapture(source)) return [85, 55];
  return "a4";
}

export function unmountStationeryPdfCapture(host: HTMLElement) {
  host.remove();
}

export function stationeryHtml2PdfOptions(
  orientation: "portrait" | "landscape" = "portrait",
  format: "a4" | [number, number] = "a4",
) {
  return {
    margin: 0,
    image: { type: "jpeg" as const, quality: 0.96 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      backgroundColor: "#ffffff",
    },
    jsPDF: { unit: "mm" as const, format, orientation },
    pagebreak: { mode: ["css", "legacy"] as const, after: ".doc-sheet, .stat-sheet" },
  };
}
