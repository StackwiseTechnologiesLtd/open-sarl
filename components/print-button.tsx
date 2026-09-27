"use client";

import { Button } from "@/components/button";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="outline" onClick={() => window.print()} className="print:hidden">
      {label}
    </Button>
  );
}
