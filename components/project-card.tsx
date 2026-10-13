import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";

export function ProjectCard({
  href,
  title,
  summary,
  status,
  imageSrc,
  imageAlt,
  ctaLabel,
}: {
  href: string;
  title: string;
  summary: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
}) {
  return (
    <Link href={href} className="project-card group">
      <div className="project-card-media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={85}
          className="project-card-image"
        />
        <span className="project-card-status">{status}</span>
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-summary">{summary}</p>
        <span className="project-card-cta">
          {ctaLabel}
          <Icon name="chevron_right" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
