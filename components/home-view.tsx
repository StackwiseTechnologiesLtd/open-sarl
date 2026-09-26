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
      <section className="bg-on-tertiary-fixed text-white">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn className="order-2 flex flex-col justify-center px-4 py-14 sm:px-8 lg:order-1 lg:px-16 lg:py-20">
            <p className="font-label-md text-[11px] tracking-[0.14em] text-primary-fixed uppercase">{dict.hero.geography}</p>
            <h1 className="mt-4 max-w-xl font-display-lg text-[1.75rem] leading-[1.15] font-bold text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-body-lg">{dict.hero.lead}</p>
            <p className="mt-6 max-w-xl border-t border-white/15 pt-6 text-sm leading-6 text-white/65">{dict.hero.practices}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${home}#capabilities`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-white px-6 py-3 text-center font-label-md text-sm font-bold text-primary transition-colors hover:bg-primary-fixed"
              >
                {dict.hero.explore}
                <Icon name="arrow_forward" className="h-5 w-5" />
              </a>
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/30 px-6 py-3 text-center font-label-md text-sm font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                {dict.hero.discuss}
              </a>
            </div>
          </FadeIn>
          <div className="relative order-1 min-h-[240px] sm:min-h-[360px] lg:order-2 lg:min-h-full">
            <Image
              src="/images/sector-transport.png"
              alt={dict.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed/90 via-on-tertiary-fixed/10 to-transparent lg:bg-gradient-to-r lg:from-on-tertiary-fixed lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/30 bg-white py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.audiences.eyebrow} title={dict.audiences.title} />
          </Reveal>
          <div className="mt-10 divide-y divide-outline-variant/30 border-y border-outline-variant/30">
            {dict.audiences.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
              <article className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:py-6">
                <h3 className="font-headline-md text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm leading-6 text-on-surface-variant sm:text-base">{item.text}</p>
              </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-on-tertiary-fixed py-16 text-white md:py-20">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl font-headline-xl text-[1.75rem] leading-tight font-bold text-balance sm:text-4xl">
              {dict.problem.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-body-lg">{dict.problem.text}</p>
          </Reveal>
        </Container>
      </section>

      <section id="capabilities" className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.capabilities.eyebrow} title={dict.capabilities.title} />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {dict.capabilities.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.08}>
                <article className="flex h-full flex-col border-l-2 border-primary bg-white px-6 py-7 sm:px-7">
                  <p className="font-label-md text-xs tabular-nums tracking-[0.12em] text-primary/70" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-headline-md text-xl leading-8 font-semibold text-balance sm:text-2xl">{item.name}</h3>
                  <p className="mt-3 text-sm font-medium text-primary">{item.outcome}</p>
                  <p className="mt-4 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="secteurs" className="bg-white py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.sectors.eyebrow} title={dict.sectors.title} align="center" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 lg:h-[620px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
            {dict.sectors.items.map((sector) => (
              <article key={sector.title} className={`relative overflow-hidden ${sector.className}`}>
                <Image src={sector.image} alt={sector.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed/95 via-on-tertiary-fixed/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h3 className={`font-headline-md font-semibold ${sector.titleClass}`}>{sector.title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/80 sm:text-base">{sector.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.experience.eyebrow} title={dict.experience.title} />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {dict.experience.items.map((item) => (
              <Reveal key={item.place}>
                <article className="flex h-full flex-col justify-between bg-white p-6 sm:p-8">
                  <div>
                    <h3 className="font-headline-md text-xl leading-7 font-semibold text-balance text-primary">{item.place}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.role}</p>
                  </div>
                  <p className="mt-6 border-t border-outline-variant/30 pt-5 text-sm font-semibold text-on-surface">{item.outcome}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="methode" className="bg-white py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro
              eyebrow={dict.method.eyebrow}
              title={dict.method.title}
              intro={dict.method.intro}
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dict.method.items.map((item) => (
              <Reveal key={item.title}>
                <article className="h-full border border-outline-variant/30 bg-surface p-6 sm:p-7">
                  <Icon name={item.icon} className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 font-headline-md text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="mobilisation" className="border-y border-outline-variant/30 bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro title={dict.mobilisation.title} intro={dict.mobilisation.intro} align="center" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {dict.mobilisation.steps.map((step) => (
              <Reveal key={step.title}>
                <article className="h-full bg-white p-6 sm:p-7">
                  <p className="font-label-md text-xs tabular-nums tracking-[0.12em] text-primary uppercase">{step.range}</p>
                  <h3 className="mt-4 font-headline-md text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="modes" className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionIntro eyebrow={dict.modes.eyebrow} title={dict.modes.title} intro={dict.modes.intro} />
            </Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dict.modes.items.map((mode) => (
                <article key={mode.title} className="border border-outline-variant/30 bg-surface p-5 sm:p-6">
                  <h3 className="font-semibold text-primary">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{mode.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={dict.adds.eyebrow} title={dict.adds.title} />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse bg-white text-left">
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
              <tbody>
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

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionIntro eyebrow={dict.why.eyebrow} title={dict.why.title} />
              <ul className="mt-8 space-y-4 border-t border-outline-variant/30 pt-8">
                {dict.why.standards.map((item) => (
                  <li key={item} className="border-l-2 border-primary/30 pl-4 text-sm leading-6 text-on-surface-variant sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid gap-3">
              {dict.why.points.map((point) => (
                <Reveal key={point.title}>
                  <article className="border border-outline-variant/30 bg-surface p-5 sm:p-6">
                    <h3 className="font-semibold text-primary">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{point.text}</p>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <div className="bg-on-tertiary-fixed p-5 text-white sm:p-6">
                  <p className="text-sm font-bold">{dict.why.frameworkLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {dict.why.framework.map((item) => (
                      <li key={item} className="border border-white/20 px-3 py-1 text-xs tracking-wide">
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

      <section id="contact" className="bg-primary py-16 text-on-primary md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display-lg text-3xl leading-tight font-bold text-balance sm:text-4xl">
              {dict.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.cta.text}</p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center rounded bg-white px-6 py-3 font-label-md text-sm font-bold text-primary transition-colors hover:bg-primary-fixed"
              >
                {dict.cta.discuss}
              </a>
              <a
                href={mailHref(locale, "partner")}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/70 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.cta.partner}
              </a>
              <Link
                href={`${home}/brochure`}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/35 px-6 py-3 font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
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
