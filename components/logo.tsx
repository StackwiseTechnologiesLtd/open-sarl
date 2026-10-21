import Link from "next/link";

const FULL_RATIO = 4453 / 3030;
/** Matches open-logo-mark.svg viewBox (crane mark, wordmark clipped out). */
const MARK_RATIO = 1535 / 2720;

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
  const width = Math.ceil(height * ratio);
  const src =
    variant === "mark" ? "/images/open-logo-mark.svg?v=4" : "/images/open-logo.svg?v=2";
  const toneClass = tone === "light" ? "brightness-0 invert" : "";

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="OPEN"
      width={unbounded ? undefined : width}
      height={unbounded ? undefined : height}
      className={`block h-auto w-auto object-contain object-left ${unbounded ? "max-w-full" : "max-w-none"} ${toneClass} ${className}`.trim()}
      style={
        unbounded
          ? undefined
          : variant === "mark"
            ? { height, width: "auto", maxWidth: "none" }
            : {
                height,
                width: "auto",
                maxWidth: width,
                objectFit: "contain",
                objectPosition: "left center",
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
