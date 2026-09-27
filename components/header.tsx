"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import { isNavActive, type Dictionary, type Locale } from "@/lib/i18n";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const home = `/${locale}`;
  const isHome = pathname === home;

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
  const overlay = isHome && scrollY <= 32;

  return (
    <header
      className={
        overlay
          ? "absolute top-0 right-0 left-0 z-50 border-b border-white/10 bg-transparent print:hidden"
          : "sticky top-0 z-50 border-b border-outline-variant/25 bg-surface/95 shadow-sm backdrop-blur-lg print:hidden"
      }
    >
      <nav className="mx-auto flex w-full max-w-container-max items-center justify-between gap-3 px-4 py-3.5 sm:px-margin-mobile sm:py-4 md:px-margin-desktop">
        {overlay ? (
          <Logo href={home} tone="light" height={40} priority />
        ) : (
          <Link
            href={home}
            className="font-headline-md shrink-0 text-lg font-bold tracking-tight text-primary sm:text-headline-md"
          >
            OPEN
          </Link>
        )}
        <div className="hidden items-center gap-6 md:flex lg:gap-stack-lg">
          {links.map((link) => {
            const active = isNavActive(link.href, hash, pathname);
            return (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={(event) => follow(event, link.href)}
                aria-current={active ? "page" : undefined}
                className={
                  overlay
                    ? active
                      ? "border-b-2 border-white pb-0.5 font-label-md text-label-md font-bold text-white"
                      : "font-label-md text-label-md text-white/75 transition-colors duration-200 hover:text-white"
                    : active
                      ? "border-b-2 border-primary pb-0.5 font-label-md text-label-md font-bold text-primary"
                      : "font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <LanguageSwitch
            locale={locale}
            pathname={pathname}
            hash={hash}
            label={dict.ui.languageLabel}
            tone={overlay ? "light" : "default"}
          />
          <ButtonLink
            href={`${home}#contact`}
            onClick={(event) => follow(event, `${home}#contact`)}
            variant={overlay ? "outline-light" : "primary"}
            className="hidden md:inline-flex"
          >
            {dict.ui.contact}
          </ButtonLink>
          <button
            type="button"
            className={
              overlay
                ? "inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
                : "inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary/5 md:hidden"
            }
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
        <div
          id="mobile-nav"
          className={
            overlay
              ? "border-t border-white/10 bg-[#0a1628]/95 px-4 py-5 backdrop-blur-lg md:hidden"
              : "border-t border-outline-variant/25 bg-surface px-4 py-5 md:hidden"
          }
        >
          <div className="flex flex-col">
            {links.map((link) => {
              const active = isNavActive(link.href, hash, pathname);
              return (
                <a
                  key={`${link.href}-${link.label}-mobile`}
                  href={link.href}
                  onClick={(event) => follow(event, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={
                    overlay
                      ? active
                        ? "border-b border-white/10 py-3.5 font-label-md text-label-md font-bold text-white"
                        : "border-b border-white/10 py-3.5 font-label-md text-label-md text-white/80 transition-colors hover:text-white"
                      : active
                        ? "border-b border-outline-variant/20 py-3.5 font-label-md text-label-md font-bold text-primary"
                        : "border-b border-outline-variant/20 py-3.5 font-label-md text-label-md text-on-surface transition-colors hover:text-primary"
                  }
                >
                  {link.label}
                </a>
              );
            })}
            <ButtonLink
              href={`${home}#contact`}
              onClick={(event) => follow(event, `${home}#contact`)}
              full
              variant={overlay ? "secondary" : "primary"}
              className="mt-4"
            >
              {dict.ui.contact}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
