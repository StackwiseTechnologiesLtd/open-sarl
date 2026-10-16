import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { documentCatalog } from "@/lib/documents";
import { documentTemplateCatalog } from "@/lib/document-templates";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.documentsHub.metaTitle,
    description: dict.documentsHub.metaDescription,
  };
}

export default async function DocumentsHubPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hub = dict.documentsHub;

  return (
    <main className="page-main bg-surface pb-16 pt-8 md:pb-24">
      <Container>
        <div className="doc-hub-hero max-w-3xl">
          <h1 className="font-headline-xl text-3xl font-bold text-primary sm:text-4xl">{hub.title}</h1>
          <p className="mt-4 max-w-2xl text-on-surface-variant">{hub.intro}</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
          {documentCatalog.map((doc) => (
            <li key={doc.id}>
              <Link
                href={`/${locale}/documents/${doc.id}`}
                className="doc-hub-card premium-card block h-full rounded-xl p-6"
              >
                <span className="doc-hub-card-icon" aria-hidden="true">
                  PDF
                </span>
                <span className="font-label-md text-xs font-semibold tracking-wide text-primary uppercase">
                  A4 · {hub.viewInBrowser}
                </span>
                <h2 className="mt-2 font-headline-md text-lg font-semibold text-on-surface">
                  {hub.titles[doc.titleKey]}
                </h2>
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/${locale}/brochure`} className="doc-hub-card premium-card block h-full rounded-xl p-6">
              <span className="doc-hub-card-icon" aria-hidden="true">
                WEB
              </span>
              <span className="font-label-md text-xs font-semibold tracking-wide text-primary uppercase">
                {hub.webBadge}
              </span>
              <h2 className="mt-2 font-headline-md text-lg font-semibold text-on-surface">{hub.webBrochureTitle}</h2>
              <p className="mt-2 text-sm text-on-surface-variant">{hub.webBrochureDesc}</p>
            </Link>
          </li>
        </ul>

        <div className="mt-14 max-w-3xl lg:max-w-none">
          <h2 className="font-headline-md text-2xl font-semibold text-primary">{hub.templatesSectionTitle}</h2>
          <p className="mt-2 max-w-2xl text-on-surface-variant">{hub.templatesSectionIntro}</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl">
            {documentTemplateCatalog.map((item) => {
              const kind = dict.documentTemplates.kinds[item.id];
              return (
                <li key={item.id}>
                  <Link
                    href={`/${locale}/documents/templates/${item.id}`}
                    className="doc-hub-card premium-card block h-full rounded-xl p-6"
                  >
                    <span className="doc-hub-card-icon" aria-hidden="true">
                      DOC
                    </span>
                    <span className="font-label-md text-xs font-semibold tracking-wide text-primary uppercase">
                      {hub.templateBadge}
                    </span>
                    <h3 className="mt-2 font-headline-md text-lg font-semibold text-on-surface">{kind.title}</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">{kind.desc}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link href={`/${locale}/documents/templates`} className="text-sm font-semibold text-primary hover:underline">
              {hub.templateTitle}
            </Link>
          </p>
        </div>
        <p className="mt-10">
          <Link href={`/${locale}`} className="text-sm font-semibold text-primary hover:underline">
            {dict.brochure.back}
          </Link>
        </p>
      </Container>
    </main>
  );
}
