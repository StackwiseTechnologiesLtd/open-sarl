import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { documentTemplateCatalog } from "@/lib/document-templates";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.documentTemplatesHub.metaTitle,
    description: dict.documentTemplatesHub.metaDescription,
  };
}

export default async function DocumentTemplatesHubPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hub = dict.documentTemplatesHub;

  return (
    <main className="page-main bg-surface pb-16 pt-8 md:pb-24">
      <Container>
        <div className="doc-hub-hero max-w-3xl">
          <h1 className="font-headline-xl text-3xl font-bold text-primary sm:text-4xl">{hub.title}</h1>
          <p className="mt-4 max-w-2xl text-on-surface-variant">{hub.intro}</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
          {documentTemplateCatalog.map((item) => {
            const kind = dict.documentTemplates.kinds[item.id];
            return (
              <li key={item.id}>
                <Link
                  href={`/${locale}/documents/templates/${item.id}`}
                  className="doc-hub-card premium-card block h-full rounded-xl p-6"
                >
                  <span className="doc-hub-card-icon" aria-hidden="true">
                    A4
                  </span>
                  <span className="font-label-md text-xs font-semibold tracking-wide text-primary uppercase">
                    {hub.templateBadge}
                  </span>
                  <h2 className="mt-2 font-headline-md text-lg font-semibold text-on-surface">{kind.title}</h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{kind.desc}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-10">
          <Link href={`/${locale}/documents`} className="text-sm font-semibold text-primary hover:underline">
            {hub.backToDocuments}
          </Link>
        </p>
      </Container>
    </main>
  );
}
