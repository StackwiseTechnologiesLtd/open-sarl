import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import { PrintButton } from "@/components/print-button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { contactEmail, mailHref } from "@/lib/i18n";

const WEBSITE = "www.open-consulting.fr";

export function CapabilityBrochure({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const b = dict.brochure;
  const home = `/${locale}`;
  const officialEn = "/downloads/OPEN_Capability_Statement_US-DRC_EN.pdf";
  const officialBilingual = "/downloads/OPEN_Capability_Statement_Bilingual_EN-FR.pdf";
  const officialPdf = locale === "fr" ? officialBilingual : officialEn;

  return (
    <div className="capability-brochure">
      <div className="brochure-toolbar mx-auto mb-10 flex max-w-[210mm] flex-col gap-4 print:hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink href={officialPdf} variant="primary">
            {b.downloadOfficial}
          </ButtonLink>
          <ButtonLink href={officialBilingual} variant="outline">
            {b.downloadBilingual}
          </ButtonLink>
          <PrintButton label={b.print} />
        </div>
        <p className="text-sm text-on-surface-variant">{b.officialNote}</p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary">
          <Link href={`${home}/documents/template`} className="hover:underline">
            {b.templatesLink}
          </Link>
          <Link href={home} className="hover:underline">
            {b.back}
          </Link>
        </div>
      </div>

      <div className="doc-stack">
        <OpenDocumentSheet variant="cover" website={WEBSITE}>
          <p className="doc-cover-kicker">{b.kicker}</p>
          <h1 className="doc-cover-title">{b.coverTitle}</h1>
          <p className="doc-cover-lead">{b.lead}</p>
          {b.coverSubtitle ? <p className="doc-cover-subtitle">{b.coverSubtitle}</p> : null}
        </OpenDocumentSheet>

        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <h2 className="doc-section-title">{dict.positioning.title}</h2>
          <p className="doc-prose">{dict.positioning.text}</p>
          <ul className="doc-list">
            {dict.positioning.standards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </OpenDocumentSheet>

        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <h2 className="doc-section-title">{dict.polesSection.title}</h2>
          <p className="doc-prose">{dict.polesSection.intro}</p>
          <div className="doc-two-col">
            {dict.polesSection.practices.map((practice) => (
              <section key={practice.id} className="doc-card">
                <h3 className="doc-card-title">{practice.title.replace(/^OPEN\s+/i, "")}</h3>
                <p className="doc-prose">{practice.summary}</p>
              </section>
            ))}
          </div>
        </OpenDocumentSheet>

        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <h2 className="doc-section-title">{dict.method.title}</h2>
          <ul className="doc-list doc-list--tight">
            {dict.method.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.text}
              </li>
            ))}
          </ul>
        </OpenDocumentSheet>

        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <h2 className="doc-section-title">{dict.livrables.title}</h2>
          <ul className="doc-list doc-list--tight">
            {dict.livrables.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.text}
              </li>
            ))}
          </ul>
          <h2 className="doc-section-title doc-section-title--spaced">{dict.missions.title}</h2>
          <ol className="doc-ordered">
            {dict.missions.steps.map((step) => (
              <li key={step.title}>
                <strong>
                  {step.range} — {step.title}.
                </strong>{" "}
                {step.text}
              </li>
            ))}
          </ol>
          <p className="doc-prose doc-contact-line">
            {dict.footer.contact}:{" "}
            <a href={`mailto:${contactEmail}`} className="text-primary">
              {contactEmail}
            </a>
            {" · "}
            <a href={mailHref(locale, "project")} className="text-primary">
              {dict.cta.primary}
            </a>
          </p>
          <p className="doc-disclaimer">{dict.footer.mandateDisclaimer}</p>
        </OpenDocumentSheet>
      </div>
    </div>
  );
}
