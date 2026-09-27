import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

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
