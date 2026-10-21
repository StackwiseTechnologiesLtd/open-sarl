import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { contactEmail, offices } from "@/lib/i18n";

type SheetVariant = "cover" | "letter";
export type DocumentSheetTheme = "corporate" | "classic";

function formatWebsiteUrl(website: string) {
  if (website.startsWith("http://") || website.startsWith("https://")) return website;
  const host = website.startsWith("www.") ? website : `www.${website}`;
  return `https://${host}`;
}

function DocLetterheadTop({ website }: { website: string }) {
  return (
    <>
      <DocAccentBar position="header" />
      <p className="doc-letterhead-site">{formatWebsiteUrl(website)}</p>
      <div className="doc-letterhead-band">
        <header className="doc-letterhead-logo">
          <Logo variant="full" unbounded className="doc-brand-logo doc-brand-logo--letterhead" />
        </header>
      </div>
    </>
  );
}

function DocClassicWatermark() {
  return (
    <div className="doc-classic-watermark" aria-hidden="true">
      <Logo variant="mark" unbounded className="doc-classic-watermark-logo" />
    </div>
  );
}

function DocClassicHeader() {
  return (
    <header className="doc-classic-header">
      <Logo variant="full" unbounded className="doc-brand-logo doc-brand-logo--classic" />
    </header>
  );
}

function DocAccentBar({ position }: { position: "header" | "footer" }) {
  return (
    <div className={`doc-accent doc-accent--${position}`} aria-hidden="true">
      <span className="doc-accent-slate" />
      <span className="doc-accent-primary" />
    </div>
  );
}

function DocFooterIcon({ children }: { children: ReactNode }) {
  return (
    <span className="doc-footer-icon" aria-hidden="true">
      {children}
    </span>
  );
}

function DocSheetFooter({ website }: { website: string }) {
  return (
    <footer className="doc-sheet-footer">
      <div className="doc-footer-item">
        <DocFooterIcon>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
        </DocFooterIcon>
        <address className="not-italic">
          {offices.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </div>
      <div className="doc-footer-item">
        <DocFooterIcon>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </DocFooterIcon>
        <span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </span>
      </div>
      <div className="doc-footer-item doc-footer-item--end">
        <DocFooterIcon>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </DocFooterIcon>
        <span>{website}</span>
      </div>
    </footer>
  );
}

function DocClassicFooter({
  website,
  addressLines,
}: {
  website: string;
  addressLines: readonly string[];
}) {
  const siteUrl = formatWebsiteUrl(website);
  const displaySite = website.startsWith("www.") ? website : siteUrl.replace(/^https:\/\//, "");

  return (
    <footer className="doc-classic-footer">
      <address className="doc-classic-footer-address not-italic">
        {addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <div className="doc-classic-footer-contact">
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        <span>{displaySite}</span>
      </div>
    </footer>
  );
}

export function OpenDocumentSheet({
  variant,
  theme = "corporate",
  website,
  classicAddressLines,
  children,
  className = "",
}: {
  variant: SheetVariant;
  theme?: DocumentSheetTheme;
  website: string;
  /** Required when theme is classic (footer address column). */
  classicAddressLines?: readonly string[];
  children?: ReactNode;
  className?: string;
}) {
  const themeClass = theme === "classic" ? "doc-sheet--classic" : "doc-sheet--corporate";
  const addressLines = classicAddressLines ?? [];

  if (theme === "classic") {
    if (variant === "cover") {
      return (
        <article
          className={`doc-sheet doc-sheet--cover ${themeClass} ${className}`.trim()}
          aria-label="Cover"
        >
          <DocClassicWatermark />
          <div className="doc-sheet-inner doc-sheet-inner--classic">
            <DocClassicHeader />
            <div className="doc-cover-body doc-cover-body--classic">{children}</div>
            <DocClassicFooter website={website} addressLines={addressLines} />
          </div>
        </article>
      );
    }

    return (
      <article className={`doc-sheet doc-sheet--letter ${themeClass} ${className}`.trim()}>
        <DocClassicWatermark />
        <div className="doc-sheet-inner doc-sheet-inner--classic">
          <DocClassicHeader />
          <div className="doc-letter-body doc-letter-body--classic">{children}</div>
          <DocClassicFooter website={website} addressLines={addressLines} />
        </div>
      </article>
    );
  }

  if (variant === "cover") {
    return (
      <article className={`doc-sheet doc-sheet--cover ${themeClass} ${className}`.trim()} aria-label="Cover">
        <DocLetterheadTop website={website} />
        <div className="doc-sheet-inner doc-sheet-inner--below-letterhead">
          <div className="doc-cover-body">{children}</div>
          <DocSheetFooter website={website} />
        </div>
      </article>
    );
  }

  return (
    <article className={`doc-sheet doc-sheet--letter ${themeClass} ${className}`.trim()}>
      <DocLetterheadTop website={website} />
      <div className="doc-sheet-inner doc-sheet-inner--below-letterhead">
        <div className="doc-letter-body">{children}</div>
        <DocSheetFooter website={website} />
      </div>
      <DocAccentBar position="footer" />
    </article>
  );
}
