import Image from "next/image";
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
    <section className="pole-page-hero">
      <Image src={imageSrc} alt={imageAlt} fill priority quality={90} className="pole-page-hero-image" sizes="100vw" />
      <div className="pole-page-hero-overlay" aria-hidden="true" />
      <Container className="pole-page-hero-inner">
        <nav className="pole-page-hero-crumbs" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === crumbs.length - 1 ? (
                <span className="text-white/90">{crumb.label}</span>
              ) : (
                <a href={crumb.href} className="text-white/65 hover:text-white">
                  {crumb.label}
                </a>
              )}
            </span>
          ))}
        </nav>
        <p className="pole-page-hero-kicker">{kicker}</p>
        <h1 className="pole-page-hero-title">{title}</h1>
        <p className="pole-page-hero-lead">{lead}</p>
        <div className="pole-page-hero-actions">{actions}</div>
      </Container>
    </section>
  );
}
