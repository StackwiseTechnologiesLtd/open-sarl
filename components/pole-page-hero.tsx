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
  const displayTitle = title.replace(/^OPEN\s+/i, "");

  return (
    <section className="page-hero-cinematic">
      <div className="page-hero-cinematic-bg" aria-hidden="true">
        <Image src={imageSrc} alt={imageAlt} fill priority quality={92} className="page-hero-cinematic-image" sizes="100vw" />
        <div className="page-hero-cinematic-scrim" />
      </div>

      <Container className="page-hero-cinematic-inner">
        <nav className="page-hero-cinematic-crumbs" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.href}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="text-white/35" aria-hidden="true">/</span> : null}
              {index === crumbs.length - 1 ? (
                <span className="text-white/85">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-white/55 hover:text-white">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <div className="page-hero-cinematic-copy">
          <div className="page-hero-cinematic-text">
            <p className="page-hero-kicker page-hero-kicker--inverse">{kicker}</p>
            <h1 className="page-hero-title page-hero-title--inverse">{displayTitle}</h1>
            <p className="page-hero-lead page-hero-lead--inverse">{lead}</p>
          </div>
          <div className="page-hero-actions page-hero-actions--inverse">{actions}</div>
        </div>
      </Container>
    </section>
  );
}
