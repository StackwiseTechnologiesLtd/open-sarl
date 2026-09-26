import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

const labels: Record<Locale, { short: string; long: string }> = {
  fr: { short: "FR", long: "Français" },
  en: { short: "EN", long: "English" },
};

export function LanguageSwitch({
  locale,
  pathname,
  hash,
  label,
}: {
  locale: Locale;
  pathname: string;
  hash: string;
  label: string;
}) {
  const path = pathname + hash;

  return (
    <div className="flex items-center font-label-md text-[13px]" role="group" aria-label={label}>
      {(["fr", "en"] as const).map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 ? <span className="mx-2.5 text-outline-variant/70" aria-hidden="true">/</span> : null}
          <Link
            href={localePath(path, code)}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
            className={
              code === locale
                ? "font-bold text-primary"
                : "text-on-surface-variant transition-colors hover:text-primary"
            }
          >
            <span className="sm:hidden">{labels[code].short}</span>
            <span className="hidden sm:inline">{labels[code].long}</span>
          </Link>
        </span>
      ))}
    </div>
  );
}
