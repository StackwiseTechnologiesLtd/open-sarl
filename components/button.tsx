import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/icon";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "ghost-light";
export type ButtonSize = "md" | "lg";

function classes(variant: ButtonVariant, size: ButtonSize, full?: boolean, extra?: string) {
  return ["btn", `btn-${variant}`, size === "lg" ? "btn-lg" : "", full ? "btn-full" : "", extra]
    .filter(Boolean)
    .join(" ");
}

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
  children: ReactNode;
};

function linkHref(href: string, isExternal: boolean, cn: string, children: ReactNode, props: object) {
  if (isExternal) {
    return (
      <a href={href} className={cn} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  ...props
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button type="button" className={classes(variant, size, full, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  ...props
}: SharedProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const cn = classes(variant, size, full, className);
  const isExternal = href.startsWith("mailto:") || href.startsWith("http") || href.includes("#");
  return linkHref(href, isExternal, cn, children, props);
}

/** White pill CTA with blue icon circle — used on dark backgrounds */
export function PillLink({
  href,
  className,
  children,
  ...props
}: { href: string; className?: string; children: ReactNode } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const cn = ["btn", "btn-pill", className].filter(Boolean).join(" ");
  const isExternal = href.startsWith("mailto:") || href.startsWith("http") || href.includes("#");
  const content = (
    <>
      <span className="btn-pill-icon" aria-hidden="true">
        <Icon name="arrow_forward" className="h-5 w-5" />
      </span>
      <span>{children}</span>
    </>
  );
  return linkHref(href, isExternal, cn, content, props);
}
