"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { LanguageSwitch } from "@/components/language-switch";
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
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 shadow-sm backdrop-blur-md print:hidden">
      <nav className="mx-auto flex w-full max-w-container-max items-center justify-between gap-4 px-4 py-4 sm:px-margin-mobile md:px-margin-desktop">
        <Link href={home} className="font-headline-md text-headline-md shrink-0 font-bold tracking-tight text-primary">
          OPEN
        </Link>
        <div className="hidden items-center gap-stack-lg md:flex">
          {links.map((link) => {
            const active = isNavActive(link.href, hash, pathname);
            return (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={(event) => follow(event, link.href)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "border-b-2 border-primary font-label-md text-label-md font-bold text-primary"
                    : "font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} />
          <a
            href={`${home}#contact`}
            onClick={(event) => follow(event, `${home}#contact`)}
            className="hidden rounded bg-primary px-6 py-2 font-label-md text-label-md text-on-primary transition-all hover:opacity-90 active:scale-95 active:opacity-80 md:inline-block"
          >
            {dict.ui.contact}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-primary md:hidden"
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
        <div id="mobile-nav" className="border-t border-outline-variant/30 px-4 py-4 md:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={`${link.href}-${link.label}-mobile`}
                href={link.href}
                onClick={(event) => follow(event, link.href)}
                className="border-b border-outline-variant/20 py-3 font-label-md text-label-md text-on-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${home}#contact`}
              onClick={(event) => follow(event, `${home}#contact`)}
              className="mt-3 inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-label-md text-label-md text-on-primary"
            >
              {dict.ui.contact}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
