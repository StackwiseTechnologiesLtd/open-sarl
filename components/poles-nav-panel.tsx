"use client";

import { PolePromoCard } from "@/components/pole-promo-card";
import { poleImages } from "@/lib/images";
import type { Dictionary } from "@/lib/i18n";
import type { PoleSlug } from "@/lib/poles";

type PolesNavPanelProps = {
  home: string;
  dict: Dictionary;
  onNavigate: (event: { preventDefault: () => void }, href: string) => void;
  onFollowLink?: () => void;
  layout?: "default" | "drawer";
};

function displayTitle(fullTitle: string) {
  return fullTitle.replace(/^OPEN\s+/i, "");
}

export function PolesNavPanel({ home, dict, onNavigate, onFollowLink, layout = "default" }: PolesNavPanelProps) {
  const menu = dict.polesMenu;
  const overviewHref = `${home}${menu.overviewHref}`;

  return (
    <div
      className={`nav-poles-panel${layout === "drawer" ? " nav-poles-panel--in-drawer" : ""}`}
      role="region"
      aria-label={menu.ariaLabel}
    >
      <p className="nav-poles-panel-kicker">{menu.kicker}</p>
      <ul className="nav-poles-panel-list">
        {menu.practices.map((practice) => {
          const href = `${home}${practice.href}`;
          const slug = practice.id as PoleSlug;
          return (
            <li key={practice.id}>
              <PolePromoCard
                href={href}
                title={displayTitle(practice.title)}
                description={practice.summary}
                ctaLabel={dict.polesSection.exploreLabel}
                imageSrc={poleImages[slug]}
                imageAlt={practice.title}
                compact
                onClick={() => onFollowLink?.()}
              />
            </li>
          );
        })}
      </ul>
      <p className="nav-poles-panel-footer">
        <a
          href={overviewHref}
          onClick={(event) => {
            onNavigate(event, overviewHref);
            onFollowLink?.();
          }}
          className="nav-poles-panel-overview"
        >
          {menu.overviewLabel}
        </a>
      </p>
    </div>
  );
}
