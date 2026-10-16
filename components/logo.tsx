import Link from "next/link";

const FULL_RATIO = 4453 / 3030;
const MARK_RATIO = 1900 / 2700;

type LogoProps = {
  href?: string;
  className?: string;
  variant?: "full" | "mark";
  tone?: "brand" | "light";
  height?: number;
  /** Let CSS control dimensions (e.g. A4 letterhead at mm sizes). */
  unbounded?: boolean;
  priority?: boolean;
};

export function Logo({
  href,
  className = "",
  variant = "full",
  tone = "brand",
  height = 36,
  unbounded = false,
  priority = false,
}: LogoProps) {
  const ratio = variant === "mark" ? MARK_RATIO : FULL_RATIO;
  const width = Math.round(height * ratio);
  const src =
    variant === "mark" ? "/images/open-logo-mark.svg?v=2" : "/images/open-logo.svg?v=2";
  const toneClass = tone === "light" ? "brightness-0 invert" : "";

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="OPEN"
      width={unbounded ? undefined : width}
      height={unbounded ? undefined : height}
      className={`block h-auto w-auto ${toneClass} ${className}`.trim()}
      style={
        unbounded
          ? undefined
          : {
              height,
              width: "auto",
              maxWidth: width,
            }
      }
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center" aria-label="OPEN">
        {image}
      </Link>
    );
  }

  return image;
}
