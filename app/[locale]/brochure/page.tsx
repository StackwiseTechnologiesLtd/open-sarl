import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityBrochure } from "@/components/capability-brochure";
import { Container } from "@/components/container";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.brochure.metaTitle, description: dict.brochure.metaDescription };
}

export default async function BrochurePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main className="page-main brochure-page bg-[#dfe2e8] pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-20 print:bg-white print:pb-0 print:pt-0">
      <Container className="max-w-none px-4 sm:px-6">
        <CapabilityBrochure locale={locale} dict={dict} />
      </Container>
    </main>
  );
}
