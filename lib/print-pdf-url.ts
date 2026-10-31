/** Open a hosted PDF and trigger the browser print dialog. */
export function printPdfUrl(url: string) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;left:-9999px;top:0;width:0;height:0;border:0;";
  iframe.src = url;

  const cleanup = () => {
    window.setTimeout(() => iframe.remove(), 1000);
  };

  iframe.onload = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } finally {
      cleanup();
    }
  };

  document.body.appendChild(iframe);
}
