import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandGuide } from "@/components/brand/guide";
import { brandGuide } from "@/lib/brand-guide";
import { isLocale } from "@/lib/i18n";
import "@/app/brand-guide.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = brandGuide[locale];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      languages: { fr: "/fr/branding", en: "/en/branding" },
    },
  };
}

export default async function BrandingPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BrandGuide locale={locale} />;
}
