import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

/** @deprecated Use /documents/templates */
export default async function LegacyDocumentTemplateRedirect({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/fr/documents/templates");
  redirect(`/${locale}/documents/templates`);
}
