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

function SiteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.18a15.7 15.7 0 0 0-1.12-4.36A8.03 8.03 0 0 1 19.93 11zM12 4c.95 1.6 1.62 3.4 1.94 5.36H10.06A12.1 12.1 0 0 1 12 4zM4.37 13h3.18c.22 1.52.62 2.98 1.12 4.36A8.03 8.03 0 0 1 4.37 13zm3.18-2H4.37a8.03 8.03 0 0 1 4.3-4.36C8.17 7.98 7.77 9.44 7.55 11zm2.51 7.64A13.8 13.8 0 0 1 8.7 13h6.6a13.8 13.8 0 0 1-1.36 5.64A7.96 7.96 0 0 1 12 20a7.96 7.96 0 0 1-1.94-.36zM14.3 18.64c.5-1.38.9-2.84 1.12-4.36h3.18a8.03 8.03 0 0 1-4.3 4.36zM16.88 11c-.22-1.52-.62-2.98-1.12-4.36A8.03 8.03 0 0 1 19.63 11h-2.75z"
      />
    </svg>
  );
}

const footerIcons = [PinIcon, PhoneIcon, MailIcon, SiteIcon] as const;

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
        <p className="stat-url">{correspondence.siteUrl}</p>
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
