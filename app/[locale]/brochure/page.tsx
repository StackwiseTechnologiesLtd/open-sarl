import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { contactEmail, getDictionary, isLocale, mailHref } from "@/lib/i18n";

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
    <main className="page-main bg-white pb-12 sm:pb-16 md:pb-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-outline-variant/40 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-label-md text-xs tracking-[0.18em] text-primary uppercase">{dict.brochure.kicker}</p>
            <h1 className="mt-3 font-headline-xl text-3xl font-bold text-balance text-primary sm:text-4xl">
              {dict.brochure.title}
            </h1>
            <p className="mt-4 max-w-2xl text-on-surface-variant">{dict.brochure.lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row print:hidden">
            <ButtonLink href={mailHref(locale, "project")}>{dict.cta.primary}</ButtonLink>
            <PrintButton label={dict.brochure.print} />
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-headline-md text-2xl font-semibold">{dict.method.title}</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {dict.method.items.map((item) => (
              <li key={item.title} className="border border-outline-variant/30 p-4">
                <p className="font-bold text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-headline-md text-2xl font-semibold">{dict.missions.title}</h2>
          <ul className="mt-4 space-y-3">
            {dict.missions.items.map((item) => (
              <li key={item.title}>
                <span className="font-bold">{item.title}. </span>
                <span className="text-on-surface-variant">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-headline-md text-2xl font-semibold">{dict.mobilisation.title}</h2>
          <ol className="mt-4 space-y-3">
            {dict.mobilisation.steps.map((step) => (
              <li key={step.title}>
                <span className="font-bold text-primary">{step.range} — {step.title}. </span>
                <span className="text-on-surface-variant">{step.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-10 text-on-surface-variant">
          {dict.footer.contact} :{" "}
          <a className="text-primary" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
        <p className="mt-8 print:hidden">
          <Link href={`/${locale}`} className="font-bold text-primary hover:underline">
            {dict.brochure.back}
          </Link>
        </p>
      </Container>
    </main>
  );
}
