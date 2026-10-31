import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { letterArt } from "@/lib/brand-export";
import { correspondence, stationeryFooterItems } from "@/lib/brand-guide";

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1L6.6 10.8z"
      />
    </svg>
  );
}

const footerIcons = [PinIcon, PhoneIcon, MailIcon] as const;

export function StationerySheet({
  children,
  navyField = false,
  dense = true,
  a4Frame = false,
  className = "",
}: {
  children?: ReactNode;
  navyField?: boolean;
  dense?: boolean;
  a4Frame?: boolean;
  className?: string;
}) {
  const sheetClass = [
    "stat-sheet",
    dense ? "is-dense" : "",
    navyField ? "is-field-navy" : "",
    a4Frame ? "doc-sheet" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={sheetClass}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="stat-top-strip" src={letterArt.topStrip} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="stat-bg-icon" src={letterArt.background} alt="" />
      <header className="stat-head">
        <div className="stat-logo">
          <Logo
            variant="full"
            unbounded
            tone={navyField ? "light" : "brand"}
            className="cover-logo-img"
          />
        </div>
        <p className="stat-url">{correspondence.site}</p>
      </header>
      <div className="stat-main">{children}</div>
      <footer className="stat-foot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="stat-foot-strip" src={letterArt.topStrip} alt="" />
        <div className="stat-foot-inner">
          {stationeryFooterItems().map((label, index) => {
            const Icon = footerIcons[index];
            return (
              <span key={label} className="stat-foot-item">
                <Icon />
                <span>{label}</span>
              </span>
            );
          })}
        </div>
      </footer>
    </article>
  );
}
