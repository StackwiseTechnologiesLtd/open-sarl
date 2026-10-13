import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";

type PolePromoCardProps = {
  href: string;
  title: string;
  description: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  id?: string;
  onClick?: () => void;
  compact?: boolean;
};

export function PolePromoCard({
  href,
  title,
  description,
  ctaLabel,
  imageSrc,
  imageAlt,
  id,
  onClick,
  compact = false,
}: PolePromoCardProps) {
  return (
    <Link
      id={id}
      href={href}
      onClick={onClick}
      className={`pole-promo-card group${compact ? " pole-promo-card--compact" : ""}`}
    >
      <div className="pole-promo-card-copy">
        <h3 className="pole-promo-card-title">{title}</h3>
        <p className="pole-promo-card-description">{description}</p>
        <span className="pole-promo-card-cta">
          {ctaLabel}
          <Icon name="chevron_right" className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <div className="pole-promo-card-media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 640px) 280px, 100vw"
          quality={88}
          className="pole-promo-card-image"
        />
      </div>
    </Link>
  );
}
