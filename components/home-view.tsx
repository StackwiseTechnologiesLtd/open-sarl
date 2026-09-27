"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { FadeIn, Reveal } from "@/components/reveal";
import { heroImage, missionImages, positioningImage, sectorImages } from "@/lib/images";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";

const sectorImageList = [sectorImages.transport, sectorImages.energy, sectorImages.water, sectorImages.urban] as const;

function stepBorderClass(border: "tertiary" | "primary" | "variant") {
  if (border === "tertiary") return "border-tertiary";
  if (border === "variant") return "border-on-primary-fixed-variant";
  return "border-primary";
}

export function HomeView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;

  return (
    <main>
      {/* Hero — glass cards on split background */}
      <section id="poles" className="relative flex min-h-[560px] items-center overflow-hidden sm:min-h-[680px] lg:min-h-[800px]">
        <div className="absolute inset-0 z-0">
          <Image src={heroImage} alt={dict.hero.imageAlt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
        <div className="relative z-10 w-full">
          <Container className="py-stack-lg">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {dict.hero.departments.map((dept, index) => (
                <FadeIn key={dept.dept} delay={index * 0.08}>
                  <article className="glass-card transform rounded-2xl p-8 text-white transition-all duration-300 hover:-translate-y-1 sm:p-10">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="h-[2px] w-8 bg-white/60" />
                      <span className="font-label-md text-label-md tracking-[0.2em] text-white/80 uppercase">{dept.dept}</span>
                    </div>
                    <h2 className="font-display-lg text-headline-xl mb-6 leading-tight">
                      {dept.title}
                      <br />
                      <span className="font-normal opacity-90">{dept.subtitle}</span>
                    </h2>
                    <p className="font-body-lg text-body-lg mb-2 leading-relaxed">{dept.text}</p>
                    <p className="font-body-md mb-8 text-white/70 italic">{dept.quote}</p>
                    <button
                      type="button"
                      className="group flex items-center gap-2 font-label-md text-sm font-bold tracking-wider uppercase transition-all hover:gap-4"
                    >
                      {dept.cta}
                      <Icon name="arrow_right_alt" className="h-5 w-5" />
                    </button>
                  </article>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <div className="mt-12 text-center lg:mt-20">
                <a
                  href={`${home}#missions`}
                  className="mx-auto inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 font-headline-md text-headline-md text-primary transition-all hover:scale-105 hover:bg-surface-bright hover:shadow-2xl sm:px-12 sm:py-5"
                >
                  {dict.hero.centerCta}
                  <Icon name="arrow_forward" />
                </a>
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* Four pillars */}
      <section id="expertise" className="bg-surface py-section-gap">
        <Container>
          <Reveal>
            <div className="mb-stack-lg text-center">
              <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-sm">{dict.method.title}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mx-auto max-w-2xl">{dict.method.intro}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-4">
            {dict.method.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group border border-outline-variant/30 bg-white p-8 transition-all hover:shadow-xl">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-3">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Positioning */}
      <section className="bg-primary py-section-gap text-on-primary">
        <Container>
          <div className="grid grid-cols-1 items-center gap-section-gap md:grid-cols-2">
            <Reveal>
              <h2 className="font-headline-xl text-headline-xl mb-stack-md">{dict.positioning.title}</h2>
              <p className="font-body-lg text-body-lg mb-stack-lg text-primary-fixed">{dict.positioning.text}</p>
              <ul className="space-y-4">
                {dict.positioning.standards.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check_circle" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary-fixed" />
                    <span className="font-body-md text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative">
                <div className="rounded-xl bg-surface-container-highest/10 p-1">
                  <Image
                    src={positioningImage}
                    alt={dict.positioning.imageAlt}
                    width={640}
                    height={480}
                    className="rounded-lg shadow-2xl brightness-90 grayscale"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 hidden rounded-lg bg-white p-6 text-primary shadow-2xl md:block">
                  <div className="mb-1 text-4xl font-bold">{dict.positioning.statValue}</div>
                  <div className="font-label-md text-on-surface-variant text-sm uppercase">{dict.positioning.statLabel}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="bg-surface-container-low py-section-gap">
        <Container>
          <Reveal>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-section-gap text-center">{dict.compare.title}</h2>
          </Reveal>
          <div className="grid grid-cols-1 items-stretch gap-gutter md:grid-cols-2">
            <Reveal>
              <div className="rounded-xl border-2 border-outline-variant/20 bg-white/50 p-stack-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface-variant mb-stack-md flex items-center gap-2">
                  <Icon name="cancel" className="text-error" />
                  {dict.compare.standardTitle}
                </h3>
                <ul className="space-y-6">
                  {dict.compare.standardItems.map((item, index) => (
                    <li key={item.title} className={index < dict.compare.standardItems.length - 1 ? "border-outline-variant border-b pb-4" : ""}>
                      <p className="mb-1 font-bold">{item.title}</p>
                      <p className="text-on-surface-variant text-sm">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative overflow-hidden rounded-xl border-2 border-primary bg-white p-stack-lg shadow-xl">
                <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-bold text-on-primary uppercase">{dict.compare.openBadge}</div>
                <h3 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-2">
                  <Icon name="check_circle" />
                  {dict.compare.openTitle}
                </h3>
                <ul className="space-y-6">
                  {dict.compare.openItems.map((item, index) => (
                    <li key={item.title} className={index < dict.compare.openItems.length - 1 ? "border-primary/10 border-b pb-4" : ""}>
                      <p className="text-primary mb-1 font-bold">{item.title}</p>
                      <p className="text-on-surface-variant text-sm">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Missions */}
      <section id="missions" className="bg-white py-section-gap">
        <Container>
          <div className="mb-stack-lg flex flex-col items-end justify-between gap-gutter md:flex-row">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-sm">{dict.missions.title}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">{dict.missions.intro}</p>
              </div>
            </Reveal>
            <button type="button" className="hidden items-center gap-2 font-bold text-primary hover:underline md:flex">
              {dict.missions.catalog}
              <Icon name="chevron_right" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {dict.missions.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group cursor-pointer">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={missionImages[index]}
                      alt={item.title}
                      width={640}
                      height={192}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-headline-md text-headline-md text-primary mb-2">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 60 days */}
      <section id="mobilisation" className="bg-surface-dim/30 py-section-gap">
        <Container>
          <Reveal>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-lg text-center">{dict.mobilisation.title}</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute top-1/2 right-0 left-0 z-0 hidden h-0.5 -translate-y-1/2 bg-outline-variant/30 md:block" aria-hidden="true" />
            <div className="relative z-10 grid grid-cols-1 gap-gutter md:grid-cols-3">
              {dict.mobilisation.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <article className={`rounded-xl border-t-4 bg-white p-stack-lg shadow-sm ${stepBorderClass(step.border)}`}>
                    <div className={`font-bold text-sm mb-4 ${step.border === "tertiary" ? "text-tertiary" : step.border === "variant" ? "text-on-primary-fixed-variant" : "text-primary"}`}>
                      {step.range}
                    </div>
                    <h4 className="font-headline-md text-headline-md mb-2">{step.title}</h4>
                    <p className="text-on-surface-variant text-sm">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Sectors bento */}
      <section id="secteurs" className="bg-surface py-section-gap">
        <Container>
          <Reveal>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-lg text-center">{dict.sectors.title}</h2>
          </Reveal>
          <div className="grid h-auto grid-cols-1 gap-4 md:h-[600px] md:grid-cols-4 md:grid-rows-2">
            {dict.sectors.items.map((sector, index) => (
              <Reveal key={sector.title} delay={index * 0.05}>
                <article className={`group relative min-h-52 overflow-hidden rounded-xl md:min-h-0 ${sector.layout}`}>
                  <Image src={sectorImageList[index]} alt={sector.title} fill className="object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${sector.gradient} to-transparent opacity-60`} />
                  <div className={`absolute bottom-0 left-0 text-on-primary ${sector.padding}`}>
                    <h3 className={sector.titleClass}>{sector.title}</h3>
                    {sector.text ? <p className="text-primary-fixed">{sector.text}</p> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Modes */}
      <section id="modes" className="bg-white py-section-gap">
        <Container>
          <div className="flex flex-col gap-gutter rounded-2xl bg-primary-container/5 p-8 md:flex-row md:p-12">
            <Reveal>
              <div className="md:w-1/3">
                <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-md">{dict.modes.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">{dict.modes.intro}</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-stack-lg md:w-2/3 md:grid-cols-2">
              {dict.modes.items.map((mode, index) => (
                <Reveal key={mode.title} delay={index * 0.05}>
                  <div
                    className={
                      mode.featured
                        ? "rounded-lg bg-primary p-4 text-on-primary"
                        : "rounded-lg border border-outline-variant/30 bg-white p-4"
                    }
                  >
                    <h4 className={`mb-2 font-bold ${mode.featured ? "" : "text-primary"}`}>{mode.title}</h4>
                    <p className={`text-sm ${mode.featured ? "opacity-90" : "text-on-surface-variant"}`}>{mode.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden py-section-gap">
        <div className="absolute inset-0 bg-primary" />
        <Container className="relative z-10 text-center text-on-primary">
          <Reveal>
            <h2 className="font-display-lg text-display-lg mb-stack-md">{dict.cta.title}</h2>
            <p className="font-body-lg text-body-lg text-primary-fixed mb-stack-lg mx-auto max-w-2xl">{dict.cta.text}</p>
            <div className="flex flex-col items-center justify-center gap-stack-md md:flex-row">
              <a
                href={mailHref(locale, "project")}
                className="rounded-lg bg-white px-10 py-5 font-headline-md text-headline-md text-primary transition-all hover:scale-105"
              >
                {dict.cta.primary}
              </a>
              <Link
                href={`${home}/brochure`}
                className="rounded-lg border border-white px-10 py-5 font-headline-md text-headline-md text-white transition-all hover:bg-white/10"
              >
                {dict.cta.secondary}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
