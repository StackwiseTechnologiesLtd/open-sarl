import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import type { ReactNode } from "react";

type Crumb = { href: string; label: string };

export function PolePageHero({
  imageSrc,
  imageAlt,
  crumbs,
  kicker,
  title,
  lead,
  actions,
}: {
  imageSrc: string;
  imageAlt: string;
  crumbs: Crumb[];
  kicker: string;
  title: string;
  lead: string;
  actions: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Container>
        <nav className="page-hero-crumbs" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.href}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="text-on-surface-variant/50" aria-hidden="true">/</span> : null}
              {index === crumbs.length - 1 ? (
                <span className="text-on-surface-variant">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-on-surface-variant hover:text-primary">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <p className="page-hero-kicker">{kicker}</p>
            <h1 className="page-hero-title">{title}</h1>
            <p className="page-hero-lead">{lead}</p>
            <div className="page-hero-actions">{actions}</div>
          </div>
          <div className="page-hero-visual">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={960}
              height={720}
              priority
              quality={90}
              className="page-hero-image"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
