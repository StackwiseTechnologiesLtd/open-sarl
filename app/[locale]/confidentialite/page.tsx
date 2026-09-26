import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { contactEmail, getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).privacy.metaTitle };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main className="bg-surface py-16 md:py-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          <h1 className="font-headline-xl text-3xl font-bold text-primary sm:text-4xl">{dict.privacy.title}</h1>
          <p className="text-on-surface-variant">{dict.privacy.intro}</p>
          <h2 className="font-headline-md text-2xl font-semibold">{dict.privacy.contactTitle}</h2>
          <p className="text-on-surface-variant">{dict.privacy.contactBody}</p>
          <h2 className="font-headline-md text-2xl font-semibold">{dict.privacy.rightsTitle}</h2>
          <p className="text-on-surface-variant">
            {dict.privacy.rightsLead}{" "}
            <a className="text-primary hover:underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
          <Link href={`/${locale}`} className="inline-block font-bold text-primary hover:underline">
            {dict.privacy.back}
          </Link>
        </div>
      </Container>
    </main>
  );
}
