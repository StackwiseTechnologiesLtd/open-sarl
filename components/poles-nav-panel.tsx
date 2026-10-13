"use client";

import type { Dictionary } from "@/lib/i18n";

type PolesNavPanelProps = {
  home: string;
  dict: Dictionary;
  onNavigate: (event: { preventDefault: () => void }, href: string) => void;
  onFollowLink?: () => void;
  layout?: "default" | "drawer";
};

export function PolesNavPanel({ home, dict, onNavigate, onFollowLink, layout = "default" }: PolesNavPanelProps) {
  const menu = dict.polesMenu;
  const overviewHref = `${home}${menu.overviewHref}`;

  return (
    <div
      className={`nav-poles-panel${layout === "drawer" ? " nav-poles-panel--in-drawer" : ""}`}
      role="region"
      aria-label={menu.ariaLabel}
    >
      <p className="mb-4 text-sm text-on-surface-variant">{menu.kicker}</p>
      <ul className="nav-poles-panel-list">
        {menu.practices.map((practice) => {
          const href = `${home}${practice.href}`;
          return (
            <li key={practice.id} className="nav-poles-panel-item">
              <a
                href={href}
                onClick={() => onFollowLink?.()}
                className="nav-poles-panel-link"
              >
                <span className="block text-sm text-on-surface-variant">{practice.kicker}</span>
                <span className="mt-0.5 block text-base font-semibold leading-snug text-on-surface">{practice.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-on-surface-variant">{practice.highlights}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 border-t border-outline-variant/50 pt-4">
        <a
          href={overviewHref}
          onClick={(event) => {
            onNavigate(event, overviewHref);
            onFollowLink?.();
          }}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {menu.overviewLabel}
        </a>
      </p>
    </div>
  );
}
