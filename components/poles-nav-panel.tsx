"use client";

import { Icon } from "@/components/icon";
import type { Dictionary } from "@/lib/i18n";

type PolesNavPanelProps = {
  home: string;
  dict: Dictionary;
  tone: "light" | "solid";
  onNavigate: (event: { preventDefault: () => void }, href: string) => void;
  onClose: () => void;
};

export function PolesNavPanel({ home, dict, tone, onNavigate, onClose }: PolesNavPanelProps) {
  const menu = dict.polesMenu;
  const overviewHref = `${home}${menu.overviewHref}`;

  return (
    <div
      className={
        tone === "light"
          ? "nav-poles-panel border-t border-white/15 bg-[#0a1628]/97 text-white backdrop-blur-md"
          : "nav-poles-panel border-t border-outline-variant/30 bg-white text-on-surface shadow-premium-lg"
      }
      role="region"
      aria-label={menu.ariaLabel}
    >
      <div className="mx-auto w-full max-w-container-max px-4 py-6 sm:px-margin-mobile sm:py-8 md:px-margin-desktop">
        <p
          className={
            tone === "light"
              ? "font-label-md text-label-md mb-6 text-white/55"
              : "font-label-md text-label-md mb-6 text-on-surface-variant"
          }
        >
          {menu.kicker}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {menu.practices.map((practice) => {
            const href = `${home}${practice.href}`;
            return (
              <a
                key={practice.id}
                href={href}
                onClick={(event) => {
                  onNavigate(event, href);
                  onClose();
                }}
                className={
                  tone === "light"
                    ? "group flex flex-col gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.08] sm:p-6"
                    : "group flex flex-col gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-5 transition-colors hover:border-primary/35 hover:bg-primary/[0.03] sm:p-6"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={
                        tone === "light"
                          ? "font-label-md text-label-md text-white/50"
                          : "font-label-md text-label-md text-on-surface-variant"
                      }
                    >
                      {practice.kicker}
                    </p>
                    <h3
                      className={
                        tone === "light"
                          ? "font-headline-md mt-1 text-base font-semibold text-white sm:text-lg"
                          : "font-headline-md mt-1 text-base font-semibold text-primary sm:text-lg"
                      }
                    >
                      {practice.title}
                    </h3>
                  </div>
                  <Icon
                    name="arrow_forward"
                    className={
                      tone === "light"
                        ? "h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                        : "h-5 w-5 shrink-0 text-primary/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    }
                  />
                </div>
                <p
                  className={
                    tone === "light"
                      ? "text-sm leading-relaxed text-white/72"
                      : "text-sm leading-relaxed text-on-surface-variant"
                  }
                >
                  {practice.summary}
                </p>
                <p
                  className={
                    tone === "light" ? "text-sm font-medium text-tertiary-fixed" : "text-sm font-medium text-primary"
                  }
                >
                  {practice.highlights}
                </p>
              </a>
            );
          })}
        </div>
        <div className="mt-6 border-t border-inherit pt-5 sm:mt-8">
          <a
            href={overviewHref}
            onClick={(event) => {
              onNavigate(event, overviewHref);
              onClose();
            }}
            className={
              tone === "light"
                ? "inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
                : "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container"
            }
          >
            {menu.overviewLabel}
            <Icon name="chevron_right" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
