import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { contactEmail, mailHref, offices, resolveNavItemHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;
  const company = [
    ...dict.footer.companyLinks.map((item) => ({
      href: resolveNavItemHref(locale, item.href),
      label: item.label,
    })),
    { href: mailHref(locale, "recruitment"), label: dict.footer.recruitment },
  ];

  return (
    <footer className="footer-premium py-14 text-white sm:py-20 print:hidden">
      <div className="mx-auto w-full max-w-container-max px-4 sm:px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-5">
            <div className="font-headline-md mb-5 text-xl font-bold tracking-tight sm:mb-6 sm:text-headline-md">OPEN</div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-8 sm:text-body-md">{dict.footer.about}</p>
            <a
              href="https://www.linkedin.com"
              aria-label={dict.footer.linkedin}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 transition-all hover:bg-white hover:text-primary"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-7">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white/90">{dict.footer.sectors}</h2>
              <ul className="space-y-4 text-label-md text-white/50">
                {dict.footer.sectorLinks.map((item) => (
                  <li key={item}>
                    <a href={`${home}#secteurs`} className="transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white/90">{dict.footer.company}</h2>
              <ul className="space-y-4 text-label-md text-white/50">
                {company.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white/90">{dict.footer.contact}</h2>
              <ul className="space-y-4 text-label-md text-white/50">
                {offices.map((office) => (
                  <li key={office}>{office}</li>
                ))}
                <li>
                  <a className="break-all font-medium text-white hover:underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-white/45 sm:text-sm">{dict.footer.mandateDisclaimer}</p>
        <div className="mt-12 flex w-full min-w-0 flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 sm:mt-16 sm:pt-10 lg:mt-20 lg:flex-row lg:items-center">
          <NewsletterForm locale={locale} label={dict.footer.newsletter} errorLabel={dict.footer.newsletterError} />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="text-label-md text-white/40" suppressHydrationWarning>
              © {new Date().getFullYear()} OPEN SARL. {dict.footer.rights}
            </p>
            <div className="flex gap-6 text-label-md text-white/40">
              <Link href={`/${locale}/mentions-legales`} className="hover:text-white">
                {dict.footer.legal}
              </Link>
              <Link href={`/${locale}/confidentialite`} className="hover:text-white">
                {dict.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
