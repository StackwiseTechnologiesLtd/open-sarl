"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { localePath, type Locale } from "@/lib/i18n";

const codes: Locale[] = ["en", "fr"];

export function LanguageSwitch({
  locale,
  pathname,
  hash,
  label,
  tone = "default",
}: {
  locale: Locale;
  pathname: string;
  hash: string;
  label: string;
  tone?: "default" | "light";
}) {
  const path = pathname + hash;
  const light = tone === "light";

  return (
    <div
      className={light ? "lang-switch lang-switch-light" : "lang-switch"}
      role="group"
      aria-label={label}
    >
      {codes.map((code) => (
        <Link
          key={code}
          href={localePath(path, code)}
          hrefLang={code}
          aria-current={code === locale ? "true" : undefined}
          className="lang-switch-option"
        >
          {code === locale ? (
            <motion.span
              layoutId={light ? "lang-switch-indicator-light" : "lang-switch-indicator-default"}
              className="lang-switch-indicator"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          ) : null}
          <span className="relative z-[1]">{code.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
}
