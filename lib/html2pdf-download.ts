export async function downloadPdfFromElement(
  element: HTMLElement,
  filename: string,
  orientation: "portrait" | "landscape" = "portrait",
) {
  const html2pdf = (await import("html2pdf.js")).default;
  await html2pdf()
    .set({
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation },
    })
    .from(element)
    .save();
}
