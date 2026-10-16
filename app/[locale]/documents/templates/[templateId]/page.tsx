import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; templateId: string }> };

/** Legacy per-template URLs → combined templates page */
export default async function DocumentTemplateLegacyRedirect({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}/documents/templates`);
}
