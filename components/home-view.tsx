"use client";

import Image from "next/image";
import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { HeroCarousel } from "@/components/hero-carousel";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
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

      <section id="expertise" className="py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.method.title} intro={dict.method.intro} className="mb-10 sm:mb-stack-lg" />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-4">
            {dict.method.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <article className="premium-card group flex h-full flex-col p-6 sm:p-8">
                  <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/10 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary group-hover:text-white">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <span className="service-card-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-headline-md mb-2 text-lg font-semibold sm:mb-3 sm:text-headline-md">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-dark py-section-gap text-on-primary">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-section-gap">
            <Reveal>
              <h2 className="section-heading mb-5 sm:mb-stack-md">{dict.positioning.title}</h2>
              <p className="section-lead mb-6 text-primary-fixed sm:mb-stack-lg">{dict.positioning.text}</p>
              <ul className="space-y-3 sm:space-y-4">
                {dict.positioning.standards.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check_circle" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary-fixed" />
                    <span className="text-sm leading-relaxed sm:text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative mx-auto max-w-lg md:max-w-none">
                <div className="image-frame">
                  <Image
                    src={positioningImage}
                    alt={dict.positioning.imageAlt}
                    width={640}
                    height={480}
                    quality={85}
                    className="w-full rounded-lg object-cover brightness-95 contrast-[1.02] grayscale-[0.35]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low/80 py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.compare.title} className="mb-10 sm:mb-section-gap" />
          </Reveal>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-gutter md:grid-cols-2">
            <Reveal className="h-full">
              <div className="compare-card flex h-full flex-col p-6 sm:p-stack-lg">
                <h3 className="font-headline-md mb-5 flex items-center gap-2.5 text-lg font-semibold text-on-surface sm:mb-stack-md sm:text-headline-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-container-low text-secondary">
                    <Icon name="rule" className="h-4 w-4 shrink-0" />
                  </span>
                  {dict.compare.standardTitle}
                </h3>
                <ul className="space-y-5 sm:space-y-6">
                  {dict.compare.standardItems.map((item, index) => (
                    <li
                      key={item.title}
                      className={index < dict.compare.standardItems.length - 1 ? "border-outline-variant/60 border-b pb-4 sm:pb-5" : ""}
                    >
                      <p className="mb-1 text-sm font-semibold sm:text-base">{item.title}</p>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.06} className="h-full">
              <div className="compare-card-featured relative flex h-full flex-col overflow-hidden p-6 pt-10 sm:p-stack-lg sm:pt-stack-lg">
                <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1.5 text-[10px] font-semibold tracking-wide text-on-primary sm:px-4 sm:text-xs">
                  {dict.compare.openBadge}
                </div>
                <h3 className="font-headline-md text-primary mb-5 flex items-center gap-2.5 text-lg font-semibold sm:mb-stack-md sm:text-headline-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon name="verified" className="h-4 w-4 shrink-0" />
                  </span>
                  {dict.compare.openTitle}
                </h3>
                <ul className="space-y-5 sm:space-y-6">
                  {dict.compare.openItems.map((item, index) => (
                    <li
                      key={item.title}
                      className={index < dict.compare.openItems.length - 1 ? "border-primary/10 border-b pb-4 sm:pb-5" : ""}
                    >
                      <p className="text-primary mb-1 text-sm font-semibold sm:text-base">{item.title}</p>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="missions" className="bg-white py-section-gap">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:mb-stack-lg md:flex-row md:items-end md:gap-gutter">
            <Reveal>
              <SectionIntro title={dict.missions.title} intro={dict.missions.intro} align="start" />
            </Reveal>
            <ButtonLink href={`${home}/brochure`} variant="ghost" className="hidden md:inline-flex">
              {dict.missions.catalog}
              <Icon name="chevron_right" className="h-5 w-5" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-3">
            {dict.missions.items.map((item, index) => (
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
        </Container>
      </section>

      <section id="mobilisation" className="py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.mobilisation.title} className="mb-8 sm:mb-stack-lg" />
          </Reveal>
          <div className="relative">
            <div className="absolute top-1/2 right-0 left-0 z-0 hidden h-px -translate-y-1/2 bg-outline-variant/35 md:block" aria-hidden="true" />
            <div className="relative z-10 grid grid-cols-1 gap-5 sm:gap-gutter md:grid-cols-3">
              {dict.mobilisation.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06} className="h-full">
                  <article className={`step-card flex h-full flex-col border-t-4 p-6 sm:p-stack-lg ${stepBorderClass(step.border)}`}>
                    <div className={`step-card-index mb-3 sm:mb-4 ${stepTextClass(step.border)}`}>{step.range}</div>
                    <h4 className="font-headline-md mb-2 text-lg font-semibold sm:text-headline-md">{step.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="secteurs" className="bg-surface py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro title={dict.sectors.title} className="mb-8 sm:mb-stack-lg" />
          </Reveal>
          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 sm:gap-4 md:h-[560px] md:grid-cols-4 md:grid-rows-2 lg:h-[600px]">
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
                    className={`absolute inset-0 bg-gradient-to-t ${sector.gradient} via-black/25 to-black/10 opacity-75 transition-opacity duration-500 group-hover:opacity-85`}
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

      <section id="modes" className="bg-white py-section-gap">
        <Container>
          <div className="premium-panel flex flex-col gap-8 p-6 sm:gap-gutter sm:p-8 md:flex-row md:items-start md:p-12">
            <Reveal className="relative z-10 shrink-0 md:w-1/3">
              <SectionIntro title={dict.modes.title} intro={dict.modes.intro} align="start" />
            </Reveal>
            <div className="relative z-10 grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-stack-lg md:w-2/3">
              {dict.modes.items.map((mode, index) => (
                <Reveal key={mode.title} delay={index * 0.04} className="h-full">
                  <div
                    className={
                      mode.featured
                        ? "flex h-full flex-col rounded-xl bg-primary p-5 text-on-primary shadow-lg sm:p-6"
                        : "premium-card flex h-full flex-col p-5 sm:p-6"
                    }
                  >
                    <h4 className={`mb-2 text-sm font-semibold sm:text-base ${mode.featured ? "" : "text-primary"}`}>{mode.title}</h4>
                    <p className={`text-sm leading-relaxed ${mode.featured ? "opacity-90" : "text-on-surface-variant"}`}>{mode.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="cta-section relative overflow-hidden py-section-gap">
        <div className="cta-pattern absolute inset-0" />
        <Container className="relative z-10 text-center text-on-primary">
          <Reveal>
            <h2 className="section-display mb-4 sm:mb-stack-md">{dict.cta.title}</h2>
            <p className="section-lead text-primary-fixed mx-auto mb-8 max-w-2xl sm:mb-stack-lg">{dict.cta.text}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-stack-md">
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
