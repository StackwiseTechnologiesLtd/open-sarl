import Link from "next/link";
import { DocumentA4Viewport } from "@/components/document-a4-viewport";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import type { Dictionary, Locale } from "@/lib/i18n";
import { contactEmail, mailHref } from "@/lib/i18n";

const WEBSITE = "www.open-consulting.fr";

export function CapabilityBrochure({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const b = dict.brochure;
  const v = dict.documentViewer;
  const home = `/${locale}`;
  const downloadName =
    locale === "fr" ? "OPEN_Note_de_capacites_web.pdf" : "OPEN_Capability_Statement_web.pdf";

  return (
    <DocumentA4Viewport
      title={b.title}
      downloadLabel={v.downloadWebPdf}
      downloadFileName={downloadName}
      printLabel={b.print}
      pageCountHint={v.a4PagesHint}
      toolbarExtra={
        <>
          <p className="text-sm text-on-surface-variant">{b.officialNote}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-primary">
            <Link href={`${home}/documents/capability-us-drc-en`}>{b.viewOfficialEn}</Link>
            <Link href={`${home}/documents/capability-bilingual`}>{b.viewOfficialBilingual}</Link>
            <Link href={`${home}/documents`}>{v.allDocuments}</Link>
            <Link href={`${home}/documents/template`}>{b.templatesLink}</Link>
            <Link href={home}>{b.back}</Link>
          </div>
        </>
      }
    >
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
    </DocumentA4Viewport>
  );
}
