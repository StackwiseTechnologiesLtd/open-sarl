import { redirect } from "next/navigation";
import { DocumentComposerPage } from "@/components/document-composer-page";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function DocumentComposePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/fr/documents/compose");
  const dict = getDictionary(locale);
  return <DocumentComposerPage locale={locale} dict={dict} />;
}
