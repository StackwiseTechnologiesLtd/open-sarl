import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { contactEmail, offices, resolveNavItemHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;
  const company = dict.footer.companyLinks.map((item) => ({
    href: item.href.startsWith("/") ? `/${locale}${item.href}` : resolveNavItemHref(locale, item.href),
    label: item.label,
  }));

  return (
    <footer className="footer-premium py-14 text-white sm:py-20 print:hidden">
      <div className="mx-auto w-full max-w-container-max px-4 sm:px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-5">
            <Logo tone="light" unbounded className="footer-premium-logo" />
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-8 sm:text-body-md">{dict.footer.about}</p>
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
