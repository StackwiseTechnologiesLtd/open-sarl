"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import { PolesNavPanel } from "@/components/poles-nav-panel";
import { isNavActive, resolveNavItemHref, type Dictionary, type Locale } from "@/lib/i18n";

const SCROLL_RANGE = 120;
const HEADER_OFFSET = 116;
const POLES_HREF = "#poles";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const [mobilePolesOpen, setMobilePolesOpen] = useState(false);
  const [polesMenuOpen, setPolesMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const polesCloseTimer = useRef<number | null>(null);
  const home = `/${locale}`;
  const isHome = pathname === home;
  const isCinemaPage = pathname.includes("/poles/");
  const useFixedHeader = isHome || isCinemaPage;
  const scrollSolid = useFixedHeader ? scrollProgress : 1;
  const polesExpanded = polesMenuOpen || (open && mobilePolesOpen);
  const headerSolid = useFixedHeader && polesExpanded ? 1 : scrollSolid;
  const headerLight = 1 - headerSolid;

  function scrollToHash(hash: string, behavior?: ScrollBehavior) {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: behavior ?? (reduce ? "auto" : "smooth") });
  }

  function clearPolesCloseTimer() {
    if (polesCloseTimer.current !== null) {
      window.clearTimeout(polesCloseTimer.current);
      polesCloseTimer.current = null;
    }
  }

  function schedulePolesClose() {
    clearPolesCloseTimer();
    polesCloseTimer.current = window.setTimeout(() => setPolesMenuOpen(false), 120);
  }

  function openPolesMenu() {
    clearPolesCloseTimer();
    setPolesMenuOpen(true);
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
    if (!polesMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPolesMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [polesMenuOpen]);

  useEffect(() => {
    if (!useFixedHeader) return;
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
  }, [useFixedHeader]);

  function follow(event: { preventDefault: () => void }, href: string) {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const pathPart = href.slice(0, hashIndex) || home;
    const nextHash = href.slice(hashIndex);

    if (pathPart !== home || pathname !== home) {
      setOpen(false);
      setMobilePolesOpen(false);
      setPolesMenuOpen(false);
      return;
    }

    event.preventDefault();
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
    }
    setHash(nextHash);
    setOpen(false);
    setMobilePolesOpen(false);
    setPolesMenuOpen(false);
    scrollToHash(nextHash);
  }

  function onMenuNavigate(event: { preventDefault: () => void }, href: string) {
    setPolesMenuOpen(false);
    setOpen(false);
    setMobilePolesOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const pathPart = href.slice(0, hashIndex) || home;
    if (pathPart === home && pathname === home) {
      follow(event, href);
    }
  }

  const links = dict.nav.map((item) => ({
    label: item.label,
    itemHref: item.href,
    href: resolveNavItemHref(locale, item.href),
  }));

  const barStyle = {
    "--header-progress": headerSolid,
  } as CSSProperties;

  function closeMenus() {
    setPolesMenuOpen(false);
    setOpen(false);
    setMobilePolesOpen(false);
  }

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

  function isPolesLink(itemHref: string) {
    return itemHref === POLES_HREF;
  }

  function renderDesktopNav(tone: "light" | "solid", layerKey: string) {
    return links.map((link) => {
      if (isPolesLink(link.itemHref)) {
        const active = isNavActive(link.itemHref, hash, pathname);
        return (
          <button
            key={`${layerKey}-poles`}
            type="button"
            aria-expanded={polesMenuOpen}
            aria-haspopup="true"
            aria-controls="poles-nav-panel"
            onMouseEnter={openPolesMenu}
            onFocus={openPolesMenu}
            onClick={() => setPolesMenuOpen((value) => !value)}
            className={`inline-flex items-center gap-0.5 transition-colors duration-200 ${navLinkClass(active, tone)}`}
          >
            {link.label}
            <Icon
              name="chevron_right"
              className={`h-4 w-4 transition-transform ${polesMenuOpen ? "rotate-90" : "rotate-0"} ${tone === "light" ? "text-white/60" : "text-primary/60"}`}
            />
          </button>
        );
      }

      return (
        <a
          key={`${layerKey}-${link.href}`}
          href={link.href}
          onClick={(event) => follow(event, link.href)}
          aria-current={isNavActive(link.itemHref, hash, pathname) ? "page" : undefined}
          className={`transition-colors duration-200 ${navLinkClass(isNavActive(link.itemHref, hash, pathname), tone)}`}
        >
          {link.label}
        </a>
      );
    });
  }

  return (
    <header className={`site-header top-0 z-50 print:hidden ${useFixedHeader ? "fixed right-0 left-0" : "sticky"}`}>
      <div
        className={`site-header-bar mx-auto w-full max-w-container-max ${headerSolid > 0.05 || polesExpanded ? "is-scrolled" : ""} ${polesExpanded ? "is-poles-open" : ""}`}
        style={barStyle}
        onMouseLeave={schedulePolesClose}
      >
        <nav className="relative flex min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3.5 lg:px-6">
          <div className="relative h-9 w-[6.75rem] shrink-0 sm:h-10 sm:w-[8.5rem]">
            <div
              className="header-fade-layer absolute inset-0 flex items-center"
              style={{ opacity: headerLight, pointerEvents: headerLight > 0.4 ? "auto" : "none" }}
            >
              <Logo href={home} variant="mark" tone="light" height={36} priority className="sm:hidden" />
              <Logo href={home} variant="mark" tone="light" height={40} priority className="hidden sm:block" />
            </div>
            <div
              className="header-fade-layer absolute inset-0 flex items-center"
              style={{ opacity: headerSolid, pointerEvents: headerSolid > 0.4 ? "auto" : "none" }}
            >
              <Logo href={home} variant="mark" tone="brand" height={36} className="sm:hidden" />
              <Logo href={home} variant="mark" tone="brand" height={40} className="hidden sm:block" />
            </div>
          </div>

          <div className="relative hidden min-w-0 lg:flex lg:flex-1 lg:justify-center">
            <div
              className="header-fade-layer flex items-center gap-4 xl:gap-stack-lg"
              style={{ opacity: headerLight, pointerEvents: headerLight > 0.4 ? "auto" : "none" }}
              aria-hidden={headerLight < 0.5}
            >
              {renderDesktopNav("light", "light")}
            </div>
            <div
              className="header-fade-layer absolute inset-0 flex items-center justify-center gap-4 xl:gap-stack-lg"
              style={{ opacity: headerSolid, pointerEvents: headerSolid > 0.4 ? "auto" : "none" }}
              aria-hidden={headerSolid < 0.5}
            >
              {renderDesktopNav("solid", "solid")}
            </div>
          </div>

          <div className="relative flex shrink-0 items-center gap-2.5 sm:gap-4">
            <div className="relative">
              <div className="header-fade-layer" style={{ opacity: headerLight, pointerEvents: headerLight > 0.4 ? "auto" : "none" }}>
                <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} tone="light" />
              </div>
              <div
                className="header-fade-layer absolute inset-0"
                style={{ opacity: headerSolid, pointerEvents: headerSolid > 0.4 ? "auto" : "none" }}
              >
                <LanguageSwitch locale={locale} pathname={pathname} hash={hash} label={dict.ui.languageLabel} tone="default" />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="header-fade-layer" style={{ opacity: headerLight, pointerEvents: headerLight > 0.4 ? "auto" : "none" }}>
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
                style={{ opacity: headerSolid, pointerEvents: headerSolid > 0.4 ? "auto" : "none" }}
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

            <div className="relative lg:hidden">
              <button
                type="button"
                className="header-fade-layer inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10"
                style={{ opacity: headerLight, pointerEvents: headerLight > 0.4 ? "auto" : "none" }}
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
                style={{ opacity: headerSolid, pointerEvents: headerSolid > 0.4 ? "auto" : "none" }}
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
              headerSolid < 0.5
                ? "border-t border-white/10 px-4 py-5 lg:hidden"
                : "border-t border-outline-variant/25 px-4 py-5 lg:hidden"
            }
          >
            <div className="flex flex-col">
              {links.map((link) => {
                const active = isNavActive(link.itemHref, hash, pathname);
                const lightMenu = headerSolid < 0.5;

                if (isPolesLink(link.itemHref)) {
                  return (
                    <div key={`${link.itemHref}-${link.label}-mobile`} className="border-b border-inherit">
                      <button
                        type="button"
                        aria-expanded={mobilePolesOpen}
                        onClick={() => setMobilePolesOpen((value) => !value)}
                        className={
                          lightMenu
                            ? `flex w-full items-center justify-between py-3.5 font-label-md text-label-md ${active ? "font-bold text-white" : "text-white/80"}`
                            : `flex w-full items-center justify-between py-3.5 font-label-md text-label-md ${active ? "font-bold text-primary" : "text-on-surface"}`
                        }
                      >
                        {link.label}
                        <Icon
                          name="chevron_right"
                          className={`h-4 w-4 transition-transform ${mobilePolesOpen ? "rotate-90" : ""} ${lightMenu ? "text-white/50" : "text-primary/50"}`}
                        />
                      </button>
                      {mobilePolesOpen ? (
                        <div className="nav-poles-panel-wrap -mx-4 mb-3 px-4">
                          <PolesNavPanel
                            home={home}
                            dict={dict}
                            layout="drawer"
                            onNavigate={onMenuNavigate}
                            onFollowLink={closeMenus}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <a
                    key={`${link.itemHref}-${link.label}-mobile`}
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
                variant={headerSolid < 0.5 ? "secondary" : "primary"}
                className="mt-4"
              >
                {dict.ui.contact}
              </ButtonLink>
            </div>
          </div>
        ) : null}

        {polesMenuOpen ? (
          <div id="poles-nav-panel" className="nav-poles-panel-wrap hidden lg:block" onMouseEnter={openPolesMenu}>
            <PolesNavPanel home={home} dict={dict} onNavigate={onMenuNavigate} onFollowLink={() => setPolesMenuOpen(false)} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
