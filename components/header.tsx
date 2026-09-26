"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { isNavActive, navLinks } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  function follow(href: string) {
    setHash(href.includes("#") ? href.slice(href.indexOf("#")) : "");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 shadow-sm backdrop-blur-md print:hidden">
      <nav className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
        <Link
          href="/"
          className="font-headline-md text-headline-md font-bold tracking-tight text-primary"
        >
          OPEN
        </Link>
        <div className="hidden items-center gap-stack-lg lg:flex">
          {navLinks.map((link) => {
            const active = isNavActive(link.href, hash, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => follow(link.href)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "border-b-2 border-primary font-label-md text-label-md font-bold text-primary"
                    : "font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <Icon name={open ? "close" : "menu"} />
          </button>
          <Link
            href="/#contact"
            onClick={() => follow("/#contact")}
            className="rounded bg-primary px-4 py-2 font-label-md text-label-md text-on-primary transition-all hover:opacity-90 active:scale-95 active:opacity-80 md:px-6"
          >
            Contact
          </Link>
        </div>
      </nav>
      {open ? (
        <div id="mobile-nav" className="border-t border-outline-variant/30 px-margin-mobile py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => follow(link.href)}
                className="font-label-md text-label-md text-on-surface-variant"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
