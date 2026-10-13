"use client";

import Image from "next/image";
import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { HeroCarousel } from "@/components/hero-carousel";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { PolesSection } from "@/components/poles-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { SectionIntro } from "@/components/section-intro";
import { missionImages, positioningImage, sectorImages } from "@/lib/images";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";

const sectorImageList = [sectorImages.transport, sectorImages.energy, sectorImages.water, sectorImages.urban] as const;

function stepBorderClass(border: "tertiary" | "primary" | "variant") {
  if (border === "tertiary") return "border-tertiary";
  if (border === "variant") return "border-on-primary-fixed-variant";
  return "border-primary";
}

function stepTextClass(border: "tertiary" | "primary" | "variant") {
  if (border === "tertiary") return "text-tertiary";
  if (border === "variant") return "text-on-primary-fixed-variant";
  return "text-primary";
}

export function HomeView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;

  return (
    <main>
      <HeroCarousel home={home} dict={dict} />

      <PolesSection dict={dict} />

      <section id="expertise" className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.method.title} intro={dict.method.intro} className="mb-10 sm:mb-12" />
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-outline-variant/40 bg-outline-variant/40 md:grid-cols-2">
            {dict.method.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04} className="h-full">
                <article className="editorial-card group flex h-full flex-col gap-4 bg-white p-6 sm:flex-row sm:gap-5 sm:p-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 flex items-baseline gap-3">
                      <span className="service-card-index">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="font-headline-md text-base font-semibold sm:text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-dark py-section-gap text-on-primary">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <h2 className="section-heading mb-5 sm:mb-6">{dict.positioning.title}</h2>
              <p className="section-lead mb-8 max-w-[65ch] text-primary-fixed sm:mb-10">{dict.positioning.text}</p>
              <ul className="divide-y divide-white/10 border-t border-white/10">
                {dict.positioning.standards.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4 first:pt-5">
                    <Icon name="check_circle" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary-fixed" />
                    <span className="text-sm leading-relaxed sm:text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7">
              <div className="image-frame">
                <Image
                  src={positioningImage}
                  alt={dict.positioning.imageAlt}
                  width={720}
                  height={520}
                  quality={85}
                  className="aspect-[4/3] w-full rounded-lg object-cover brightness-95 contrast-[1.02] grayscale-[0.25]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.compare.title} align="center" className="mb-10 sm:mb-12" />
          </Reveal>
          <div className="compare-split overflow-hidden rounded-xl border border-outline-variant/45">
            <div className="grid md:grid-cols-2 md:items-start">
              <Reveal>
                <div className="border-b border-outline-variant/40 bg-white/70 p-6 sm:p-8 md:border-r md:border-b-0">
                  <h3 className="font-headline-md mb-5 flex min-w-0 items-start gap-2.5 text-lg font-semibold sm:mb-6 sm:items-center sm:text-xl">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-container text-secondary">
                      <Icon name="rule" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">{dict.compare.standardTitle}</span>
                  </h3>
                  <ul className="divide-y divide-outline-variant/50">
                    {dict.compare.standardItems.map((item) => (
                      <li key={item.title} className="py-3.5 first:pt-0 last:pb-0 sm:py-4">
                        <p className="mb-1 text-sm font-semibold sm:text-base">{item.title}</p>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="bg-primary/[0.03] p-6 sm:p-8">
                  <h3 className="font-headline-md text-primary mb-5 flex min-w-0 items-start gap-2.5 text-lg font-semibold sm:mb-6 sm:items-center sm:text-xl">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon name="verified" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      {dict.compare.openTitle}
                      <span className="mt-0.5 block text-xs font-medium text-primary/70">{dict.compare.openBadge}</span>
                    </span>
                  </h3>
                  <ul className="divide-y divide-primary/10">
                    {dict.compare.openItems.map((item) => (
                      <li key={item.title} className="py-3.5 first:pt-0 last:pb-0 sm:py-4">
                        <p className="text-primary mb-1 text-sm font-semibold sm:text-base">{item.title}</p>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section id="missions" className="section-shell-muted py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.missions.title} intro={dict.missions.intro} align="center" className="mb-8 sm:mb-10" />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:gap-gutter md:grid-cols-3">
            {dict.missions.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05} className="h-full">
                <article className={`step-card flex h-full flex-col p-6 sm:p-8 ${stepBorderClass(step.border)} border-t-4`}>
                  <div className={`step-card-index mb-3 sm:mb-4 ${stepTextClass(step.border)}`}>{step.range}</div>
                  <h4 className="font-headline-md mb-2 text-lg font-semibold">{step.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="livrables" className="section-shell py-section-gap">
        <Container>
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionIntro title={dict.livrables.title} intro={dict.livrables.intro} />
            </Reveal>
            <ButtonLink href={`${home}/brochure`} variant="ghost" className="hidden shrink-0 md:inline-flex">
              {dict.livrables.catalog}
              <Icon name="chevron_right" className="h-5 w-5" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-3">
            {dict.livrables.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <article className="mission-card group flex h-full flex-col">
                  <div className="mission-media relative mb-4 aspect-[16/10]">
                    <Image
                      src={missionImages[index]}
                      alt={item.title}
                      fill
                      quality={85}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h4 className="font-headline-md text-primary mb-2 text-lg font-semibold sm:text-headline-md">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <ButtonLink href={`${home}/brochure`} variant="ghost" full className="w-full sm:w-auto">
              {dict.livrables.catalog}
              <Icon name="chevron_right" className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="secteurs" className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.sectors.title} align="center" className="mb-8 sm:mb-10" />
          </Reveal>
          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:auto-rows-[minmax(220px,1fr)]">
            {dict.sectors.items.map((sector, index) => (
              <Reveal key={sector.title} delay={index * 0.04} className={`h-full min-h-[200px] ${sector.layout}`}>
                <article className="sector-tile group relative h-full min-h-[inherit] overflow-hidden rounded-xl">
                  <Image
                    src={sectorImageList[index]}
                    alt={sector.title}
                    fill
                    quality={85}
                    className="object-cover transition-transform duration-[850ms] group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${sector.gradient} via-black/30 to-black/15 opacity-80 transition-opacity duration-500 group-hover:opacity-90`}
                  />
                  <div className={`absolute bottom-0 left-0 text-on-primary ${sector.padding}`}>
                    <h3 className={`${sector.titleClass} leading-tight`}>{sector.title}</h3>
                    {sector.text ? <p className="mt-1 max-w-md text-sm text-primary-fixed/90 sm:text-base">{sector.text}</p> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="modes" className="section-shell py-section-gap">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionIntro title={dict.modes.title} intro={dict.modes.intro} />
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-8">
              <ul className="modes-list divide-y divide-outline-variant/45 border-y border-outline-variant/45">
                {dict.modes.items.map((mode) => (
                  <li key={mode.title} className="py-5 first:pt-0 last:pb-0 sm:py-6">
                    <h4 className="text-primary mb-1.5 text-sm font-semibold sm:text-base">{mode.title}</h4>
                    <p className="text-on-surface-variant max-w-prose text-sm leading-relaxed">{mode.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <PortfolioSection dict={dict} />

      <section id="contact" className="cta-section relative overflow-hidden py-section-gap">
        <div className="cta-pattern absolute inset-0" />
        <Container className="relative z-10 max-w-3xl text-left text-on-primary md:mx-auto md:text-center">
          <Reveal>
            <h2 className="section-display mb-4 sm:mb-5">{dict.cta.title}</h2>
            <p className="section-lead text-primary-fixed mb-8 max-w-[65ch] sm:mb-10 md:mx-auto">{dict.cta.text}</p>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:w-auto md:justify-center">
              <PillLink href={mailHref(locale, "project")}>{dict.cta.primary}</PillLink>
              <ButtonLink href={`${home}/brochure`} variant="outline-light" size="lg">
                {dict.cta.secondary}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
