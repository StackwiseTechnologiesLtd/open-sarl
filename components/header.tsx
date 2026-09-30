"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import { isNavActive, type Dictionary, type Locale } from "@/lib/i18n";

const SCROLL_RANGE = 120;
const HEADER_OFFSET = 108;

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const home = `/${locale}`;
  const isHome = pathname === home;
  const solid = isHome ? scrollProgress : 1;
  const light = 1 - solid;

  function scrollToHash(hash: string, behavior?: ScrollBehavior) {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
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
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
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

  const barStyle = {
    "--header-progress": solid,
  } as CSSProperties;

  function navLinkClass(active: boolean, tone: "light" | "solid") {
    if (tone === "light") {
      return active
        ? "border-b-2 border-white pb-0.5 font-label-md text-label-md font-bold text-white"
        : "font-label-md text-label-md text-white/75 hover:text-white";
    }
    return active
      ? "border-b-2 border-primary pb-0.5 font-label-md text-label-md font-bold text-primary"
      : "font-label-md text-label-md text-on-surface-variant hover:text-primary";
  }

  return (
    <header
      className={`site-header top-0 z-50 print:hidden ${isHome ? "fixed right-0 left-0" : "sticky"} px-4 pt-3 sm:px-margin-mobile sm:pt-4 md:px-margin-desktop`}
    >
      <div
        className={`site-header-bar mx-auto w-full max-w-container-max ${solid > 0.05 ? "is-scrolled" : ""}`}
        style={barStyle}
      >
        <nav className="relative flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 md:px-6">
          <div className="relative h-10 w-[7.5rem] shrink-0 sm:w-[8.5rem]">
            <div
              className="header-fade-layer absolute inset-0 flex items-center"
              style={{ opacity: light, pointerEvents: light > 0.4 ? "auto" : "none" }}
            >
              <Logo href={home} tone="light" height={40} priority />
            </div>
            <div
              className="header-fade-layer absolute inset-0 flex items-center"
              style={{ opacity: solid, pointerEvents: solid > 0.4 ? "auto" : "none" }}
            >
              <Logo href={home} tone="brand" height={40} />
            </div>
          </div>

          <div className="relative hidden md:flex md:flex-1 md:justify-center">
            <div
              className="header-fade-layer flex items-center gap-6 lg:gap-stack-lg"
              style={{ opacity: light, pointerEvents: light > 0.4 ? "auto" : "none" }}
              aria-hidden={light < 0.5}
            >
              {links.map((link) => (
                <a
                  key={`light-${link.href}`}
                  href={link.href}
                  onClick={(event) => follow(event, link.href)}
                  className={`transition-colors duration-200 ${navLinkClass(isNavActive(link.href, hash, pathname), "light")}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div
              className="header-fade-layer absolute inset-0 flex items-center justify-center gap-6 lg:gap-stack-lg"
              style={{ opacity: solid, pointerEvents: solid > 0.4 ? "auto" : "none" }}
              aria-hidden={solid < 0.5}
            >
              {links.map((link) => (
                <a
                  key={`solid-${link.href}`}
                  href={link.href}
                  onClick={(event) => follow(event, link.href)}
                  aria-current={isNavActive(link.href, hash, pathname) ? "page" : undefined}
                  className={`transition-colors duration-200 ${navLinkClass(isNavActive(link.href, hash, pathname), "solid")}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative flex shrink-0 items-center gap-2.5 sm:gap-4">
            <div className="relative">
              <div className="header-fade-layer" style={{ opacity: light, pointerEvents: light > 0.4 ? "auto" : "none" }}>
                <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} tone="light" />
              </div>
              <div
                className="header-fade-layer absolute inset-0"
                style={{ opacity: solid, pointerEvents: solid > 0.4 ? "auto" : "none" }}
              >
                <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} tone="default" />
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="header-fade-layer" style={{ opacity: light, pointerEvents: light > 0.4 ? "auto" : "none" }}>
                <ButtonLink
                  href={`${home}#contact`}
                  onClick={(event) => follow(event, `${home}#contact`)}
                  variant="outline-light"
                >
                  {dict.ui.contact}
                </ButtonLink>
              </div>
              <div
                className="header-fade-layer absolute inset-0 flex items-center"
                style={{ opacity: solid, pointerEvents: solid > 0.4 ? "auto" : "none" }}
              >
                <ButtonLink
                  href={`${home}#contact`}
                  onClick={(event) => follow(event, `${home}#contact`)}
                  variant="primary"
                >
                  {dict.ui.contact}
                </ButtonLink>
              </div>
            </div>

            <div className="relative md:hidden">
              <button
                type="button"
                className="header-fade-layer inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10"
                style={{ opacity: light, pointerEvents: light > 0.4 ? "auto" : "none" }}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((value) => !value)}
              >
                <span className="sr-only">{open ? dict.ui.menuClose : dict.ui.menuOpen}</span>
                <Icon name={open ? "close" : "menu"} />
              </button>
              <button
                type="button"
                className="header-fade-layer absolute inset-0 inline-flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-primary/5"
                style={{ opacity: solid, pointerEvents: solid > 0.4 ? "auto" : "none" }}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((value) => !value)}
              >
                <span className="sr-only">{open ? dict.ui.menuClose : dict.ui.menuOpen}</span>
                <Icon name={open ? "close" : "menu"} />
              </button>
            </div>
          </div>
        </nav>

        {open ? (
          <div
            id="mobile-nav"
            className={
              solid < 0.5
                ? "border-t border-white/10 px-4 py-5 md:hidden"
                : "border-t border-outline-variant/25 px-4 py-5 md:hidden"
            }
          >
            <div className="flex flex-col">
              {links.map((link) => {
                const active = isNavActive(link.href, hash, pathname);
                const lightMenu = solid < 0.5;
                return (
                  <a
                    key={`${link.href}-${link.label}-mobile`}
                    href={link.href}
                    onClick={(event) => follow(event, link.href)}
                    aria-current={active ? "page" : undefined}
                    className={
                      lightMenu
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
                variant={solid < 0.5 ? "secondary" : "primary"}
                className="mt-4"
              >
                {dict.ui.contact}
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
