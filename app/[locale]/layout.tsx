import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { default: dict.meta.title, template: "%s | OPEN" },
    description: dict.meta.description,
    alternates: {
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
      >
        {dict.ui.skip}
      </a>
      <Header locale={locale} dict={dict} />
      <div id="contenu">{children}</div>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
