import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { contactEmail, getDictionary, isLocale, mailHref, offices } from "@/lib/i18n";
import { siteHost, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).aboutPage.metaTitle };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale).aboutPage;

  return (
    <main className="page-main bg-surface pb-16 md:pb-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          <h1 className="font-headline-xl text-3xl font-bold text-primary sm:text-4xl">{copy.title}</h1>
          <p className="text-on-surface-variant">{copy.intro}</p>
          <h2 className="font-headline-md text-2xl font-semibold">{copy.roleTitle}</h2>
          <p className="text-on-surface-variant">{copy.roleBody}</p>
          <h2 className="font-headline-md text-2xl font-semibold">{copy.officeTitle}</h2>
          <p className="text-on-surface-variant">
            {copy.officeBody}
            <br />
            {offices[0]}
          </p>
          <p className="text-on-surface-variant">
            {copy.webLabel}:{" "}
            <a className="text-primary hover:underline" href={siteUrl}>
              {siteHost}
            </a>
            <br />
            <a className="text-primary hover:underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </p>
          <Link
            href={mailHref(locale, "project")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
          >
            {copy.contactCta}
          </Link>
          <div>
            <Link href={`/${locale}`} className="inline-block font-bold text-primary hover:underline">
              {copy.back}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
