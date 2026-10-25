import type { ReactNode } from "react";
import { StationerySheet } from "@/components/brand/stationery-sheet";

type SheetVariant = "cover" | "letter";
export type DocumentSheetTheme = "corporate" | "classic";

/** A4 page using the brand stationery chrome (header, footer, watermark). */
export function OpenDocumentSheet({
  variant,
  children,
  className = "",
}: {
  variant: SheetVariant;
  theme?: DocumentSheetTheme;
  website?: string;
  classicAddressLines?: readonly string[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <StationerySheet a4Frame dense className={className}>
      <div className={variant === "cover" ? "stat-doc-cover" : "stat-doc-body"}>{children}</div>
    </StationerySheet>
  );
}
