"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import { isNavActive, type Dictionary, type Locale } from "@/lib/i18n";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;

  function scrollToHash(hash: string, behavior?: ScrollBehavior) {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: behavior ?? (reduce ? "auto" : "smooth") });
  }

  useEffect(() => {
    const sync = (behavior?: ScrollBehavior) => {
      setHash(window.location.hash);
      scrollToHash(window.location.hash, behavior);
    };
    sync("auto");
    const onHash = () => sync();
    const onLoad = () => sync("auto");
    window.addEventListener("hashchange", onHash);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname]);

  function follow(event: { preventDefault: () => void }, href: string) {
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    if (!hash) return;
    event.preventDefault();
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
    }
    setHash(hash);
    setOpen(false);
    scrollToHash(hash);
  }

  const links = dict.nav.map((item) => ({ ...item, href: `${home}${item.href}` }));

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/95 backdrop-blur-md print:hidden">
      <nav className="mx-auto flex w-full max-w-container-max items-center justify-between gap-4 px-4 py-3 sm:px-margin-mobile md:px-margin-desktop">
        <div className="flex min-w-0 flex-1 items-center gap-8 lg:gap-10">
          <Logo href={home} height={38} priority className="sm:hidden" variant="mark" />
          <Logo href={home} height={42} priority className="hidden sm:block" />
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const active = isNavActive(link.href, hash, pathname);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => follow(event, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-label-md text-[13px] font-bold text-primary"
                      : "font-label-md text-[13px] text-on-surface-variant transition-colors hover:text-primary"
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} />
          <a
            href={`${home}#contact`}
            onClick={(event) => follow(event, `${home}#contact`)}
            className="hidden font-label-md text-[13px] font-bold text-primary transition-colors hover:text-on-tertiary-fixed lg:inline"
          >
            {dict.ui.contact}
          </a>
          <a
            href={`${home}#contact`}
            onClick={(event) => follow(event, `${home}#contact`)}
            className="rounded bg-primary px-3 py-2 font-label-md text-xs text-on-primary transition-colors hover:bg-primary-container lg:hidden"
          >
            {dict.ui.contact}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? dict.ui.menuClose : dict.ui.menuOpen}</span>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
      {open ? (
        <div id="mobile-nav" className="border-t border-outline-variant/30 px-4 py-4 lg:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => follow(event, link.href)}
                className="border-b border-outline-variant/20 py-3 font-label-md text-label-md text-on-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
