import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioView } from "@/components/portfolio-view";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const portfolio = getDictionary(locale).portfolio;
  return {
    title: portfolio.pageTitle,
    description: portfolio.pageIntro,
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return <PortfolioView locale={locale} dict={dict} />;
}
