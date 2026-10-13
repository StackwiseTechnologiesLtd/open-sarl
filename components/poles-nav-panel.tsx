"use client";

import { Icon } from "@/components/icon";
import type { Dictionary } from "@/lib/i18n";

type PolesNavPanelProps = {
  home: string;
  dict: Dictionary;
  onNavigate: (event: { preventDefault: () => void }, href: string) => void;
};

export function PolesNavPanel({ home, dict, onNavigate }: PolesNavPanelProps) {
  const menu = dict.polesMenu;
  const overviewHref = `${home}${menu.overviewHref}`;

  return (
    <div className="nav-poles-panel relative z-[1] px-3 pb-5 sm:px-5 sm:pb-6 md:px-6" role="region" aria-label={menu.ariaLabel}>
      <div className="nav-poles-panel-divider mb-5 sm:mb-6" />
      <p className="font-label-md text-label-md mb-5 text-on-surface-variant sm:mb-6">{menu.kicker}</p>
      <div className="nav-poles-panel-grid grid grid-cols-1 md:grid-cols-2">
        {menu.practices.map((practice, index) => {
          const href = `${home}${practice.href}`;
          return (
            <a
              key={practice.id}
              href={href}
              onClick={(event) => onNavigate(event, href)}
              className={`nav-poles-panel-card group flex flex-col gap-3 p-4 sm:gap-4 sm:p-5 md:p-6 ${index === 0 ? "md:border-r md:border-outline-variant/35" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant">{practice.kicker}</p>
                  <h3 className="font-headline-md mt-1 text-base font-semibold text-primary sm:text-lg">{practice.title}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name="arrow_forward" className="h-4 w-4" />
                </span>
              </div>
              <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">{practice.summary}</p>
              <p className="text-sm font-medium text-primary/90">{practice.highlights}</p>
              <span className="mt-auto pt-1 text-xs font-semibold tracking-wide text-primary uppercase opacity-0 transition-opacity group-hover:opacity-100">
                {dict.polesSection.exploreLabel}
              </span>
            </a>
          );
        })}
      </div>
      <div className="nav-poles-panel-divider mt-5 sm:mt-6" />
      <div className="pt-4 sm:pt-5">
        <a
          href={overviewHref}
          onClick={(event) => onNavigate(event, overviewHref)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container"
        >
          {menu.overviewLabel}
          <Icon name="chevron_right" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
