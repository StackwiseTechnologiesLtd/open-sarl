"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function HideOnBrand({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.includes("/branding")) return null;
  return children;
}
