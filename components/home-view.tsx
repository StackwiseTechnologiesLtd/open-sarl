"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { FadeIn, Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";

export function HomeView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;

  return (
    <main>
      {/* 01 — Hero */}
      <section className="bg-on-tertiary-fixed text-white">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn className="order-2 flex flex-col justify-center px-4 py-14 sm:px-8 lg:order-1 lg:px-16 lg:py-24">
            <p className="font-label-md text-[11px] tracking-[0.16em] text-primary-fixed uppercase">{dict.hero.eyebrow}</p>
            <p className="mt-3 font-label-md text-[11px] tracking-[0.14em] text-white/60 uppercase">{dict.hero.geography}</p>
            <h1 className="mt-5 max-w-xl font-display-lg text-[1.875rem] leading-[1.12] font-bold text-balance sm:text-4xl lg:text-[2.875rem]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-body-lg">{dict.hero.lead}</p>
            <p className="mt-6 max-w-xl border-l-2 border-primary/60 pl-4 text-sm leading-6 text-white/70">{dict.hero.practices}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`${home}#capabilities`}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 py-3 font-label-md text-sm font-bold text-primary transition-colors hover:bg-primary-fixed"
              >
                {dict.hero.explore}
                <Icon name="arrow_forward" className="h-5 w-5" />
              </a>
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center border border-white/35 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                {dict.hero.discuss}
              </a>
            </div>
          </FadeIn>
          <div className="relative order-1 min-h-[260px] sm:min-h-[380px] lg:order-2 lg:min-h-full">
            <Image
              src="/images/sector-transport.png"
              alt={dict.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed via-on-tertiary-fixed/15 to-black/10 lg:bg-gradient-to-r lg:from-on-tertiary-fixed lg:via-on-tertiary-fixed/40 lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* 02 — Who we serve */}
      <section className="bg-white py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.audiences.eyebrow} title={dict.audiences.title} />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {dict.audiences.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full border border-outline-variant/30 bg-surface p-5 sm:p-6">
                  <h3 className="font-headline-md text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — Problem */}
      <section className="bg-primary py-16 text-on-primary md:py-section-gap">
        <Container>
          <Reveal>
            <p className="font-label-md text-[11px] tracking-[0.16em] text-primary-fixed uppercase">{dict.problem.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-[1.875rem] leading-tight font-bold text-balance sm:text-4xl">
              {dict.problem.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.problem.text}</p>
          </Reveal>
        </Container>
      </section>

      {/* 04 — Three capabilities */}
      <section id="capabilities" className="bg-surface py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.capabilities.eyebrow} title={dict.capabilities.title} />
          </Reveal>
          <div className="mt-8 hidden items-center justify-center gap-3 lg:flex">
            {dict.capabilities.flow.map((label, index) => (
              <span key={label} className="flex items-center gap-3">
                <span className="font-label-md text-xs font-bold tracking-wide text-primary uppercase">{label}</span>
                {index < dict.capabilities.flow.length - 1 ? (
                  <Icon name="arrow_forward" className="h-4 w-4 text-outline-variant" aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {dict.capabilities.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.08}>
                <article className="flex h-full flex-col bg-white p-6 shadow-sm sm:p-8">
                  <p className="font-label-md text-xs tabular-nums tracking-[0.14em] text-primary" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-headline-md text-xl font-semibold leading-8 text-balance sm:text-2xl">{item.name}</h3>
                  <p className="mt-3 border-b border-outline-variant/30 pb-4 text-sm font-medium text-primary">{item.outcome}</p>
                  <p className="mt-4 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — Sectors */}
      <section id="secteurs" className="bg-white py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.sectors.eyebrow} title={dict.sectors.title} align="center" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 lg:h-[640px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
            {dict.sectors.items.map((sector) => (
              <article key={sector.title} className={`relative overflow-hidden ${sector.className}`}>
                <Image src={sector.image} alt={sector.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed/95 via-on-tertiary-fixed/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h3 className={`font-headline-md font-semibold ${sector.titleClass}`}>{sector.title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/85 sm:text-base">{sector.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — Selected experience */}
      <section id="experience" className="bg-surface py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.experience.eyebrow} title={dict.experience.title} intro={dict.experience.intro} />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {dict.experience.items.map((item, index) => (
              <Reveal key={item.place} delay={index * 0.06}>
                <article className="flex h-full flex-col bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 border border-primary/20 bg-primary/5 px-2.5 py-1 font-label-md text-[11px] font-medium tracking-wide text-primary uppercase">
                      {item.sector}
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline-md text-xl leading-7 font-semibold text-balance text-primary">{item.place}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.role}</p>
                  <p
                    className={`mt-6 border-t border-outline-variant/30 pt-5 ${
                      item.metric ? "font-headline-md text-2xl font-bold text-primary" : "text-sm font-semibold text-on-surface"
                    }`}
                  >
                    {item.outcome}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 07 — OPEN method */}
      <section id="methode" className="bg-white py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-label-md text-[11px] tracking-[0.16em] text-primary uppercase">{dict.method.eyebrow}</p>
              <p className="mt-2 text-sm font-medium text-on-surface-variant">{dict.method.subtitle}</p>
              <h2 className="mt-3 font-headline-xl text-[1.875rem] leading-tight font-bold text-balance text-primary sm:text-4xl">
                {dict.method.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-on-surface-variant sm:text-body-lg">{dict.method.intro}</p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dict.method.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group h-full border border-outline-variant/30 bg-surface p-6 transition-shadow hover:shadow-lg sm:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="font-headline-md text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 08 — First 60 days */}
      <section id="mobilisation" className="border-y border-outline-variant/30 bg-surface py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro
              eyebrow={dict.mobilisation.eyebrow}
              title={dict.mobilisation.title}
              intro={dict.mobilisation.intro}
              align="center"
            />
          </Reveal>
          <div className="relative mt-12">
            <div className="absolute top-6 right-0 left-0 hidden h-px bg-outline-variant/50 lg:block" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8">
              {dict.mobilisation.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <article className="relative h-full border-t-4 border-primary bg-white p-6 sm:p-8">
                    <p className="font-label-md text-xs tabular-nums tracking-[0.12em] text-primary uppercase">{step.range}</p>
                    <h3 className="mt-4 font-headline-md text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What OPEN adds */}
      <section className="bg-white py-16 md:py-section-gap">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.adds.eyebrow} title={dict.adds.title} />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse bg-surface text-left">
              <thead>
                <tr className="bg-on-tertiary-fixed text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-bold sm:px-6">
                    {dict.adds.conventional}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold sm:px-6">
                    {dict.adds.added}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {dict.adds.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-outline-variant/30">
                    <td className="px-5 py-4 text-sm text-on-surface-variant sm:px-6 sm:py-5">{row[0]}</td>
                    <td className="px-5 py-4 text-sm font-medium text-primary sm:px-6 sm:py-5">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 09 — Engagement models */}
      <section id="modes" className="bg-surface py-16 md:py-section-gap">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionIntro eyebrow={dict.modes.eyebrow} title={dict.modes.title} intro={dict.modes.intro} />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dict.modes.items.map((mode, index) => (
                <Reveal key={mode.title} delay={index * 0.05}>
                  <article className="h-full border border-outline-variant/30 bg-white p-5 sm:p-6">
                    <h3 className="font-semibold text-primary">{mode.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{mode.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 10 — Why OPEN */}
      <section className="bg-on-tertiary-fixed py-16 text-white md:py-section-gap">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="font-label-md text-[11px] tracking-[0.16em] text-primary-fixed uppercase">{dict.why.eyebrow}</p>
              <h2 className="mt-3 font-headline-xl text-[1.875rem] leading-tight font-bold text-balance sm:text-4xl">{dict.why.title}</h2>
              <ul className="mt-8 space-y-4 border-t border-white/15 pt-8">
                {dict.why.standards.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/85 sm:text-base">
                    <Icon name="check_circle" className="mt-0.5 h-5 w-5 shrink-0 text-primary-fixed" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid gap-4">
              {dict.why.points.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.06}>
                  <article className="border border-white/10 bg-white/5 p-5 sm:p-6">
                    <h3 className="font-semibold text-primary-fixed">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">{point.text}</p>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <div className="border border-white/15 bg-white/10 p-5 sm:p-6">
                  <p className="text-sm font-bold text-white">{dict.why.frameworkLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {dict.why.framework.map((item) => (
                      <li key={item} className="border border-white/25 px-3 py-1 text-xs tracking-wide text-white/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 11 — CTA */}
      <section id="contact" className="bg-primary py-16 text-on-primary md:py-section-gap">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display-lg text-3xl leading-tight font-bold text-balance sm:text-4xl">
              {dict.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.cta.text}</p>
            <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 font-label-md text-sm font-bold text-primary transition-colors hover:bg-primary-fixed"
              >
                {dict.cta.discuss}
              </a>
              <a
                href={mailHref(locale, "partner")}
                className="inline-flex min-h-12 items-center justify-center border border-white/70 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.cta.partner}
              </a>
              <a
                href={`${home}#capabilities`}
                className="inline-flex min-h-12 items-center justify-center border border-white/40 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.cta.explore}
              </a>
              <Link
                href={`${home}/brochure`}
                className="inline-flex min-h-12 items-center justify-center border border-white/40 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.cta.credentials}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
