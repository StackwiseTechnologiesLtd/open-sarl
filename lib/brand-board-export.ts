import { cardBoard } from "@/lib/brand-guide";

/** Print-ready card raster (85 × 55 mm at ~660 dpi equivalent). */
export const cardExportRaster = {
  width: 2200,
  height: Math.round((2200 * cardBoard.height) / cardBoard.width),
} as const;

function waitForImages(root: ParentNode) {
  const images = [...root.querySelectorAll("img")];
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
}

export function mountBoardExportCapture(board: HTMLElement, width: number, height: number) {
  const host = document.createElement("div");
  host.className = "brand-board-export-capture";
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-9999px;top:0;z-index:-1;pointer-events:none;background:#fff;";

  const clone = board.cloneNode(true) as HTMLElement;
  clone.style.boxSizing = "border-box";
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.transform = "none";
  clone.style.overflow = "hidden";

  host.appendChild(clone);
  document.body.appendChild(host);
  return host;
}

export function unmountBoardExportCapture(host: HTMLElement) {
  host.remove();
}

export async function captureBoardCanvas(
  board: HTMLElement,
  artWidth: number,
  artHeight: number,
  exportWidth: number,
) {
  const scale = exportWidth / artWidth;
  const host = mountBoardExportCapture(board, artWidth, artHeight);
  const target = host.firstElementChild;
  if (!(target instanceof HTMLElement)) {
    unmountBoardExportCapture(host);
    throw new Error("board-capture");
  }

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await waitForImages(target);
    const html2canvas = (await import("html2canvas")).default;
    return await html2canvas(target, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      width: artWidth,
      height: artHeight,
    });
  } finally {
    unmountBoardExportCapture(host);
  }
}

export async function boardToPngBlob(
  board: HTMLElement,
  artWidth: number,
  artHeight: number,
  exportWidth: number,
) {
  const canvas = await captureBoardCanvas(board, artWidth, artHeight, exportWidth);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("png"));
    }, "image/png");
  });
}

/** WYSIWYG SVG: full-resolution raster embedded to match the on-screen card layout. */
export async function boardToSvgString(
  board: HTMLElement,
  artWidth: number,
  artHeight: number,
  exportWidth: number,
) {
  const exportHeight = Math.round((exportWidth * artHeight) / artWidth);
  const canvas = await captureBoardCanvas(board, artWidth, artHeight, exportWidth);
  const pngData = canvas.toDataURL("image/png");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${exportWidth}" height="${exportHeight}" viewBox="0 0 ${exportWidth} ${exportHeight}">
  <image width="${exportWidth}" height="${exportHeight}" href="${pngData}"/>
</svg>`;
}
