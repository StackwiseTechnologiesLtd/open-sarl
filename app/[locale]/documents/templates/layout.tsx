import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.documentTemplatesHub.metaTitle,
    description: dict.documentTemplatesHub.metaDescription,
  };
}

export default function TemplatesLayout({ children }: Props) {
  return children;
}
