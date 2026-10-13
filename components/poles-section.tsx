import { Container } from "@/components/container";
import { PolePromoCard } from "@/components/pole-promo-card";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import { poleImages } from "@/lib/images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { polePath, type PoleSlug } from "@/lib/poles";

function displayTitle(fullTitle: string) {
  return fullTitle.replace(/^OPEN\s+/i, "");
}

export function PolesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const poles = dict.polesSection;

  return (
    <section id="poles" className="section-shell py-section-gap">
      <Container>
        <Reveal>
          <SectionIntro title={poles.title} intro={poles.intro} className="mb-10 sm:mb-12" />
        </Reveal>
        <ul className="pole-promo-grid">
          {poles.practices.map((practice, index) => (
            <Reveal key={practice.id} delay={index * 0.05} className="h-full">
              <li className="h-full">
                <PolePromoCard
                  id={`poles-${practice.id}`}
                  href={polePath(locale, practice.id as PoleSlug)}
                  title={displayTitle(practice.title)}
                  description={practice.summary}
                  ctaLabel={poles.exploreLabel}
                  imageSrc={poleImages[practice.id as PoleSlug]}
                  imageAlt={practice.title}
                />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
