import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PoleDetailView } from "@/components/pole-detail-view";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { isPoleSlug, poleSlugs } from "@/lib/poles";

type Props = { params: Promise<{ locale: string; pole: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => poleSlugs.map((pole) => ({ locale, pole })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pole } = await params;
  if (!isLocale(locale) || !isPoleSlug(pole)) return {};
  const page = getDictionary(locale).polePages[pole];
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function PolePage({ params }: Props) {
  const { locale, pole } = await params;
  if (!isLocale(locale) || !isPoleSlug(pole)) notFound();
  const dict = getDictionary(locale);

  return <PoleDetailView locale={locale} dict={dict} pole={pole} />;
}
