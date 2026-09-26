import { notFound } from "next/navigation";
import { HomeView } from "@/components/home-view";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomeView locale={locale} dict={getDictionary(locale)} />;
}
