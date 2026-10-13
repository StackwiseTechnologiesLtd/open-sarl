import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";

type PolePromoCardProps = {
  href: string;
  title: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  id?: string;
  onClick?: () => void;
};

export function PolePromoCard({ href, title, ctaLabel, imageSrc, imageAlt, id, onClick }: PolePromoCardProps) {
  return (
    <Link id={id} href={href} onClick={onClick} className="pole-promo-card group">
      <div className="pole-promo-card-copy">
        <h3 className="pole-promo-card-title">{title}</h3>
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
