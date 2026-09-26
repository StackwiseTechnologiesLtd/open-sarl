"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center justify-center rounded border border-primary px-5 py-3 font-label-md text-sm text-primary print:hidden"
    >
      {label}
    </button>
  );
}
