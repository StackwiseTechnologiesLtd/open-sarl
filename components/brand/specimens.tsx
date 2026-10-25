import { useId, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { envelopeArtLayout, envelopeBoard, letterArt } from "@/lib/brand-export";
import {
  cardIdentity,
  correspondence,
  invoiceLines,
  invoiceTotal,
  money,
  type BrandCopy,
} from "@/lib/brand-guide";
import type { Locale } from "@/lib/i18n";

export function Board({
  width,
  height,
  min = 0,
  label,
  children,
}: {
  width: number;
  height: number;
  min?: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <figure className="board-figure">
      <div className="board-scroll">
        <div
          className="board-fit"
          style={{
            aspectRatio: `${width} / ${height}`,
            minWidth: min || undefined,
            ["--board-w" as string]: `${width}px`,
          }}
        >
          <div className="board" style={{ width, height }}>
            {children}
          </div>
        </div>
      </div>
      <figcaption className="board-caption">{label}</figcaption>
    </figure>
  );
}

function MarkGhost({ className = "" }: { className?: string }) {
  return (
    <Logo
      variant="mark"
      unbounded
      className={`mark-ghost ${className}`.trim()}
    />
  );
}

export function CoverSheet({ navy }: { navy?: boolean }) {
  return (
    <article className={`cover-sheet ${navy ? "is-navy" : "is-paper"}`}>
      <div className="cover-logo">
        <Logo variant="full" unbounded tone={navy ? "light" : "brand"} className="cover-logo-img" />
      </div>
      <MarkGhost className="cover-mark" />
    </article>
  );
}

function Mailbox({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 72" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 18h28v42H10zM8 18h32l-3.5-8h-25z"
      />
      <circle cx="24" cy="34" r="3.2" fill="currentColor" opacity="0.35" />
      <circle cx="24" cy="48" r="3.2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function EnvelopeSheet({ label }: { label: string }) {
  const rawId = useId().replace(/:/g, "");
  const clip = `${rawId}-clip`;
  const white = `${rawId}-white`;
  const board = envelopeBoard;
  const layout = envelopeArtLayout();

  return (
    <svg
      className="env-svg"
      viewBox={`0 0 ${board.width} ${board.height}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={clip}>
          <rect width={board.width} height={board.height} rx={board.radius} />
        </clipPath>
        <filter id={white} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width={board.width} height={board.height} fill={board.navy} />
        <image
          href="/images/open-logo.svg"
          x={board.logoX}
          y={board.logoY}
          width={board.logoWidth}
          height={board.logoHeight}
          filter={`url(#${white})`}
        />
        <rect
          x={board.windowX}
          y={board.windowY}
          width={board.windowWidth}
          height={board.windowHeight}
          fill={board.window}
        />
        <image
          href={board.bottomArt.path}
          x={board.bottomArt.x}
          y={layout.bottomY}
          width={board.bottomArt.width}
          height={layout.bottomHeight}
        />
        <image
          href={board.topArt.path}
          x={layout.topX}
          y={layout.topY}
          width={layout.topWidth}
          height={layout.topHeight}
        />
      </g>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1L6.6 10.8z"
      />
    </svg>
  );
}

function SheetChrome({
  copy,
  children,
  dense = false,
}: {
  copy: BrandCopy;
  children: ReactNode;
  dense?: boolean;
}) {
  return (
    <article className={`stat-sheet ${dense ? "is-dense" : ""}`}>
      <img className="stat-top-strip" src={letterArt.topStrip} alt="" />
      <img className="stat-bg-icon" src={letterArt.background} alt="" />
      <p className="stat-url">{correspondence.siteUrl}</p>
      <div className="stat-logo">
        <Logo variant="full" unbounded className="cover-logo-img" />
      </div>
      <div className="stat-main">{children}</div>
      <footer className="stat-foot">
        <span className="stat-foot-item">
          <PinIcon />
          <span>{copy.place}</span>
        </span>
        <span className="stat-foot-item">
          <MailIcon />
          <span>{correspondence.email}</span>
        </span>
        <span className="stat-foot-item stat-foot-end">
          <InfoIcon />
          <span>{correspondence.site}</span>
        </span>
      </footer>
    </article>
  );
}

export function LetterSheet({ copy }: { copy: BrandCopy }) {
  return (
    <SheetChrome copy={copy} dense>
      <div className="letter-meta">
        <p>{copy.letterDate}</p>
        <div className="letter-to">
          <p className="letter-to-label">{copy.letterToLabel}</p>
          {copy.letterTo.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <p className="letter-subject">{copy.letterSubject}</p>
      <p className="letter-p">{copy.letterIntro}</p>
      {copy.letterSections.map((section) => (
        <section key={section.title} className="letter-sec">
          <h3>{section.title}</h3>
          <p>{section.body}</p>
          {"bullets" in section && section.bullets ? (
            <ul>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </SheetChrome>
  );
}

export function InvoiceSheet({ copy, locale }: { copy: BrandCopy; locale: Locale }) {
  const lines = invoiceLines.map((line) => ({
    title: line[locale].title,
    unit: line[locale].unit,
    qty: line.qty,
    amount: line.amount,
  }));

  return (
    <SheetChrome copy={copy}>
      <header className="bill-head">
        <h3>{copy.invoiceTitle}</h3>
        <p>{copy.invoiceMeta}</p>
      </header>
      <dl className="bill-meta">
        <div>
          <dt>{copy.invoiceNumberLabel}</dt>
          <dd>{copy.invoiceNumber}</dd>
        </div>
        <div>
          <dt>{copy.invoiceDateLabel}</dt>
          <dd>{copy.letterDate}</dd>
        </div>
        <div>
          <dt>{copy.invoiceDueLabel}</dt>
          <dd>{copy.invoiceDue}</dd>
        </div>
      </dl>
      <div className="bill-client">
        <p className="bill-kicker">{copy.invoiceClientLabel}</p>
        {copy.invoiceClient.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <table className="bill-table">
        <thead>
          <tr>
            {copy.invoiceCols.map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.title}>
              <td>{line.title}</td>
              <td>{line.qty}</td>
              <td>{line.unit}</td>
              <td>{money(locale, line.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              {copy.invoiceTotalLabel}
            </th>
            <td>{money(locale, invoiceTotal)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="bill-note">{copy.invoiceNote}</p>
    </SheetChrome>
  );
}

export function ReceiptSheet({ copy, locale }: { copy: BrandCopy; locale: Locale }) {
  return (
    <SheetChrome copy={copy}>
      <header className="bill-head">
        <h3>{copy.receiptTitle}</h3>
        <p>{copy.receiptMeta}</p>
      </header>
      <dl className="bill-meta">
        <div>
          <dt>{copy.receiptNumberLabel}</dt>
          <dd>{copy.receiptNumber}</dd>
        </div>
        <div>
          <dt>{copy.invoiceDateLabel}</dt>
          <dd>{copy.letterDate}</dd>
        </div>
        <div>
          <dt>{copy.invoiceNumberLabel}</dt>
          <dd>{copy.invoiceNumber}</dd>
        </div>
      </dl>
      <div className="receipt-block">
        <p className="bill-kicker">{copy.receiptFromLabel}</p>
        {copy.invoiceClient.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="bill-kicker receipt-gap">{copy.receiptAmountLabel}</p>
        <p className="receipt-sum">{money(locale, invoiceTotal)}</p>
        <p className="bill-kicker receipt-gap">{copy.receiptForLabel}</p>
        <p>{copy.receiptFor}</p>
      </div>
      <div className="receipt-sign">
        <p>{copy.receiptPlace}</p>
        <p className="receipt-for">{copy.receiptSign}</p>
        <p className="receipt-name">{cardIdentity.name}</p>
        <p>{cardIdentity.title}</p>
      </div>
    </SheetChrome>
  );
}

function QrMark({ alt }: { alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="card-qr" src="/images/open-qr.svg" alt={alt} width={132} height={132} />
  );
}

function CardContacts({
  copy,
  spelled,
  light,
}: {
  copy: BrandCopy;
  spelled?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`visit-contacts ${light ? "" : "is-inverse"}`}>
      <div>
        <p>
          <MailIcon />
          <span>{cardIdentity.email}</span>
        </p>
        <p>
          <PinIcon />
          <span>
            {spelled ? `${copy.addressLabel}: ` : null}
            {cardIdentity.address}
          </span>
        </p>
      </div>
      <div>
        {cardIdentity.phones.map((phone) => (
          <p key={phone}>
            <PhoneIcon />
            <span>{phone}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export function CardSheet({
  copy,
  variant,
}: {
  copy: BrandCopy;
  variant: "icons" | "address" | "back" | "front";
}) {
  if (variant === "back") {
    return (
      <article className="visit visit-back">
        <Mailbox className="visit-box" />
        <div className="visit-back-logo">
          <Logo variant="full" unbounded tone="light" className="cover-logo-img" />
        </div>
        <MarkGhost className="visit-mark" />
      </article>
    );
  }

  const navy = variant === "front";

  return (
    <article className={`visit ${navy ? "visit-navy" : "visit-paper"}`}>
      <div className="visit-top">
        <QrMark alt={copy.qrAlt} />
        <div className="visit-logo">
          <Logo variant="full" unbounded tone={navy ? "light" : "brand"} className="cover-logo-img" />
        </div>
      </div>
      <div className="visit-id">
        <p className="visit-name">{cardIdentity.name}</p>
        <p className="visit-role">{cardIdentity.title}</p>
      </div>
      <CardContacts copy={copy} spelled={variant === "address" || navy} light={!navy} />
    </article>
  );
}
