import { useId, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { EnvelopeDecor } from "@/components/brand/envelope-decor";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  StationerySheet,
} from "@/components/brand/stationery-sheet";
import {
  envelopeArtLayout,
  envelopeBoard,
  envelopeFooterLabel,
  envelopeWindowStyle,
  type EnvelopeVariant,
} from "@/lib/brand-export";
import { cardIdentity, invoiceLines, invoiceTotal, money, type BrandCopy } from "@/lib/brand-guide";
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

export function CoverSheet({ navy }: { navy?: boolean }) {
  return <StationerySheet navyField={!!navy} />;
}

function EnvelopeFooterLine({ variant }: { variant: EnvelopeVariant }) {
  const label = envelopeFooterLabel(variant);
  return (
    <text
      x={label.x}
      y={label.y}
      fill={label.fill}
      fontFamily="var(--font-label-md), IBM Plex Sans, sans-serif"
      fontSize={label.fontSize}
      textAnchor="end"
    >
      {label.text}
    </text>
  );
}

export function EnvelopeSheet({
  label,
  variant = "navy",
}: {
  label: string;
  variant?: EnvelopeVariant;
}) {
  const rawId = useId().replace(/:/g, "");
  const clip = `${rawId}-clip`;
  const white = `${rawId}-white`;
  const decorTint = `${rawId}-decor`;
  const board = envelopeBoard;
  const layout = envelopeArtLayout();
  const field = variant === "navy" ? board.navy : board.paper;
  const windowStyle = envelopeWindowStyle(variant);

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
        <filter id={decorTint} colorInterpolationFilters="sRGB">
          <feFlood floodColor={board.backdrop} result="flood" />
          <feComposite in="flood" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width={board.width} height={board.height} fill={field} />
        <rect
          x={board.windowX}
          y={board.windowY}
          width={board.windowWidth}
          height={board.windowHeight}
          rx={board.windowRx}
          fill={windowStyle.fill}
          fillOpacity={windowStyle.opacity}
        />
        <image
          href="/images/open-logo.svg"
          x={board.logoX}
          y={board.logoY}
          width={board.logoWidth}
          height={board.logoHeight}
          filter={variant === "navy" ? `url(#${white})` : undefined}
        />
        <EnvelopeFooterLine variant={variant} />
        <image
          href={board.bottomArt.path}
          x={board.bottomArt.x}
          y={layout.bottomY}
          width={board.bottomArt.width}
          height={layout.bottomHeight}
          preserveAspectRatio="xMinYMax meet"
          filter={variant === "paper" ? `url(#${decorTint})` : undefined}
        />
        <image
          href={board.topArt.path}
          x={layout.topX}
          y={layout.topY}
          width={layout.topWidth}
          height={layout.topHeight}
          preserveAspectRatio="xMaxYMin meet"
          filter={variant === "paper" ? `url(#${decorTint})` : undefined}
        />
      </g>
    </svg>
  );
}

export function LetterSheet({ copy }: { copy: BrandCopy }) {
  return (
    <StationerySheet dense>
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
    </StationerySheet>
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
    <StationerySheet dense>
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
    </StationerySheet>
  );
}

export function ReceiptSheet({ copy, locale }: { copy: BrandCopy; locale: Locale }) {
  return (
    <StationerySheet dense>
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
    </StationerySheet>
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
        <EnvelopeDecor compact />
        <div className="visit-back-logo">
          <Logo variant="full" unbounded tone="light" className="cover-logo-img" />
        </div>
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
