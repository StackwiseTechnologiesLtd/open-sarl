"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded border border-primary px-6 py-3 font-label-md text-label-md text-primary print:hidden"
    >
      Enregistrer en PDF
    </button>
  );
}
