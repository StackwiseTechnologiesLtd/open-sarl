import { navy, stationeryFooterItems } from "./brand-guide";

export type EnvelopeVariant = "navy" | "paper";

export const envelopeBoard = {
  width: 1100,
  height: 630,
  radius: 20,
  navy: "#000068",
  paper: "#FFFFFF",
  backdrop: "#E1E8F0",
  footerTextBottomInset: 16,
  footerFontSize: 9.5,
  accent: "#545497",
  window: "#333486",
  windowOpacity: 0.88,
  windowRx: 20,
  windowX: 68,
  windowY: 262,
  windowWidth: 492,
  windowHeight: 176,
  logoX: 68,
  logoY: 42,
  logoWidth: 222,
  logoHeight: 151,
  bottomArt: {
    path: "/images/bottom-svg-enveloppe.svg",
    nativeWidth: 1007,
    nativeHeight: 768,
    width: 224,
    x: 66,
  },
  topArt: {
    path: "/images/top-svg-enveloppe.svg",
    nativeWidth: 364,
    nativeHeight: 848,
    xOffset: 6,
    topInsetRatio: 0.04,
  },
} as const;

export const letterArt = {
  topStrip: "/images/letter-top-strip.svg",
  background: "/images/background-icon.svg",
} as const;

export function stripSvg(svg: string) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/, "")
    .replace(/<svg\b[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();
}

export function recolorPaint(svg: string, color: string) {
  return svg
    .replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`)
    .replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`);
}

export function recolorSvgDocument(svg: string, color: string) {
  return recolorPaint(svg, color);
}

function placedArt(
  svg: string,
  x: number,
  y: number,
  width: number,
  nativeWidth: number,
) {
  const scale = width / nativeWidth;
  return `<g transform="translate(${x} ${y}) scale(${scale})">${stripSvg(svg)}</g>`;
}

export function envelopeArtLayout() {
  const board = envelopeBoard;
  const bottomScale = board.bottomArt.width / board.bottomArt.nativeWidth;
  const bottomHeight = board.bottomArt.nativeHeight * bottomScale;
  const bottomY = board.height - bottomHeight;
  const topWidth = board.bottomArt.width;
  const topHeight = bottomHeight;
  const topX = board.width - topWidth + board.topArt.xOffset;
  return {
    bottomY,
    bottomHeight,
    topX,
    topY: board.height * board.topArt.topInsetRatio,
    topWidth,
    topHeight,
  };
}

export function envelopeWindowStyle(variant: EnvelopeVariant) {
  const board = envelopeBoard;
  if (variant === "paper") {
    return { fill: board.backdrop, opacity: 1 };
  }
  return { fill: board.window, opacity: board.windowOpacity };
}

export function envelopeDecorSvg(svg: string, variant: EnvelopeVariant) {
  if (variant === "navy") return svg;
  return recolorPaint(svg, envelopeBoard.backdrop);
}

export function envelopeFooterLabel(variant: EnvelopeVariant) {
  const board = envelopeBoard;
  return {
    fill: variant === "navy" ? "#FFFFFF" : navy,
    x: board.width - board.logoX,
    y: board.height - board.footerTextBottomInset,
    text: stationeryFooterItems().join(" · "),
    fontSize: board.footerFontSize,
  };
}

function envelopeFooterSvg(variant: EnvelopeVariant) {
  const label = envelopeFooterLabel(variant);
  return `<text x="${label.x}" y="${label.y}" fill="${label.fill}" font-family="IBM Plex Sans, Arial, sans-serif" font-size="${label.fontSize}" text-anchor="end">${label.text}</text>`;
}

export type ComposeEnvelopeOptions = { printable?: boolean };

function envelopeInnerMarkup(
  board: typeof envelopeBoard,
  variant: EnvelopeVariant,
  logoInner: string,
  layout: ReturnType<typeof envelopeArtLayout>,
  windowStyle: ReturnType<typeof envelopeWindowStyle>,
  bottomDecor: string,
  topDecor: string,
  topScaleX: number,
  topScaleY: number,
) {
  const field = variant === "navy" ? board.navy : board.paper;
  const logoScale = board.logoWidth / 4453;
  return `<rect width="${board.width}" height="${board.height}" fill="${field}"/>
    <rect x="${board.windowX}" y="${board.windowY}" width="${board.windowWidth}" height="${board.windowHeight}" rx="${board.windowRx}" fill="${windowStyle.fill}" fill-opacity="${windowStyle.opacity}"/>
    <g transform="translate(${board.logoX} ${board.logoY}) scale(${logoScale})">${logoInner}</g>
    ${envelopeFooterSvg(variant)}
    ${placedArt(
      bottomDecor,
      board.bottomArt.x,
      layout.bottomY,
      board.bottomArt.width,
      board.bottomArt.nativeWidth,
    )}
    <g transform="translate(${layout.topX} ${layout.topY}) scale(${topScaleX} ${topScaleY})">${stripSvg(topDecor)}</g>`;
}

export function composeEnvelopeSvg(
  logoSvg: string,
  topSvg: string,
  bottomSvg: string,
  variant: EnvelopeVariant = "navy",
  options?: ComposeEnvelopeOptions,
) {
  const board = envelopeBoard;
  const logoInner =
    variant === "navy"
      ? recolorPaint(stripSvg(logoSvg), "#FFFFFF")
      : stripSvg(logoSvg);
  const layout = envelopeArtLayout();
  const topScaleX = layout.topWidth / board.topArt.nativeWidth;
  const topScaleY = layout.topHeight / board.topArt.nativeHeight;
  const windowStyle = envelopeWindowStyle(variant);
  const bottomDecor = envelopeDecorSvg(bottomSvg, variant);
  const topDecor = envelopeDecorSvg(topSvg, variant);
  const inner = envelopeInnerMarkup(
    board,
    variant,
    logoInner,
    layout,
    windowStyle,
    bottomDecor,
    topDecor,
    topScaleX,
    topScaleY,
  );

  if (options?.printable) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${board.width} ${board.height}" width="${board.width}" height="${board.height}">
  <g>${inner}</g>
</svg>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${board.width} ${board.height}" width="${board.width}" height="${board.height}">
  <defs>
    <clipPath id="open-envelope-round">
      <rect width="${board.width}" height="${board.height}" rx="${board.radius}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#open-envelope-round)">${inner}</g>
</svg>`;
}

export type EnvelopeAssetKind =
  | "envelope"
  | "envelope-paper"
  | "envelope-print"
  | "envelope-paper-print";

export async function loadAssetSvg(
  kind: "logo" | "logo-white" | "mark" | EnvelopeAssetKind,
) {
  const logo = await fetch("/images/open-logo.svg").then((response) =>
    response.text(),
  );
  if (kind === "logo") return logo;
  if (kind === "logo-white") return recolorSvgDocument(logo, "#FFFFFF");
  if (kind === "mark")
    return fetch("/images/open-logo-mark.svg").then((response) =>
      response.text(),
    );
  const [top, bottom] = await Promise.all([
    fetch(envelopeBoard.topArt.path).then((response) => response.text()),
    fetch(envelopeBoard.bottomArt.path).then((response) => response.text()),
  ]);
  if (kind === "envelope-paper") {
    return composeEnvelopeSvg(logo, top, bottom, "paper");
  }
  if (kind === "envelope-print") {
    return composeEnvelopeSvg(logo, top, bottom, "navy", { printable: true });
  }
  if (kind === "envelope-paper-print") {
    return composeEnvelopeSvg(logo, top, bottom, "paper", { printable: true });
  }
  return composeEnvelopeSvg(logo, top, bottom, "navy");
}

export function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function svgToPngBlob(svg: string, width: number, height: number) {
  return new Promise<Blob>((resolve, reject) => {
    const url = URL.createObjectURL(
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
    );
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      context.drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error("png"));
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("svg"));
    };
    image.src = url;
  });
}

export async function copySvg(svg: string) {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/svg+xml": blob,
        "text/plain": new Blob([svg], { type: "text/plain" }),
      }),
    ]);
    return;
  }
  await navigator.clipboard.writeText(svg);
}
