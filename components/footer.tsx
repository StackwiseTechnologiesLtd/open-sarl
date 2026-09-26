import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  contactEmail,
  footerCompany,
  footerSectors,
  offices,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-on-tertiary-fixed py-20 text-white print:hidden">
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-5">
            <div className="mb-6 font-headline-md text-headline-md font-bold tracking-tight text-white">
              OPEN
            </div>
            <p className="mb-8 max-w-sm font-body-md text-white/60">
              Conseil stratégique et expertise technique pour les infrastructures et politiques
              publiques. Un pont vers l&apos;excellence institutionnelle.
            </p>
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white hover:text-primary"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-7">
            <div>
              <h2 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Secteurs</h2>
              <ul className="space-y-4 font-label-md text-label-md text-white/50">
                {footerSectors.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Entreprise</h2>
              <ul className="space-y-4 font-label-md text-label-md text-white/50">
                {footerCompany.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("mailto:") ? (
                      <a href={item.href} className="transition-colors hover:text-white">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="transition-colors hover:text-white">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Contact</h2>
              <ul className="space-y-4 font-label-md text-label-md text-white/50">
                {offices.map((office) => (
                  <li key={office}>{office}</li>
                ))}
                <li>
                  <a className="font-medium text-white hover:underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 lg:flex-row">
          <NewsletterForm />
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <p className="font-label-md text-label-md text-white/40">
              © {new Date().getFullYear()} OPEN SARL. Tous droits réservés.
            </p>
            <div className="flex gap-6 font-label-md text-label-md text-white/40">
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions Légales
              </Link>
              <Link href="/confidentialite" className="hover:text-white">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
