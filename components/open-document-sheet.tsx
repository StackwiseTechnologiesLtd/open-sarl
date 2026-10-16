import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { contactEmail, offices } from "@/lib/i18n";

type SheetVariant = "cover" | "letter";

export function OpenDocumentSheet({
  variant,
  website,
  children,
  className = "",
}: {
  variant: SheetVariant;
  website: string;
  children?: ReactNode;
  className?: string;
}) {
  if (variant === "cover") {
    return (
      <article className={`doc-sheet doc-sheet--cover ${className}`.trim()} aria-label="Cover">
        <div className="doc-sheet-inner">
          <header className="doc-cover-header">
            <Logo variant="full" height={44} />
            <p className="doc-cover-tagline">{website}</p>
          </header>
          <div className="doc-cover-watermark" aria-hidden="true">
            <Logo variant="mark" height={320} />
          </div>
          <div className="doc-cover-body">{children}</div>
          <footer className="doc-cover-footer">
            <address className="doc-cover-address not-italic">
              {offices.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="doc-cover-contact">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <span className="block">{website}</span>
            </div>
          </footer>
        </div>
      </article>
    );
  }

  return (
    <article className={`doc-sheet doc-sheet--letter ${className}`.trim()}>
      <div className="doc-letter-accent doc-letter-accent--top" aria-hidden="true" />
      <div className="doc-sheet-inner">
        <header className="doc-letter-header">
          <div className="doc-letter-brand">
            <Logo variant="full" height={36} />
          </div>
          <p className="doc-letter-site">{website}</p>
        </header>
        <div className="doc-letter-body">{children}</div>
        <footer className="doc-letter-footer">
          <div className="doc-letter-footer-col">
            <span className="doc-letter-footer-label">Office</span>
            <span>{offices[0]}</span>
          </div>
          <div className="doc-letter-footer-col">
            <span className="doc-letter-footer-label">Contact</span>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div className="doc-letter-footer-col doc-letter-footer-col--end">
            <span className="doc-letter-footer-label">Web</span>
            <span>{website}</span>
          </div>
        </footer>
      </div>
      <div className="doc-letter-accent doc-letter-accent--bottom" aria-hidden="true" />
    </article>
  );
}
