import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function DocumentTemplatesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/fr/branding#documents-templates");
  redirect(`/${locale}/branding#documents-templates`);
}
