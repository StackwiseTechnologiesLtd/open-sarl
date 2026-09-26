"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { FadeIn, Reveal } from "@/components/reveal";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";

export function HomeView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;

  return (
    <main>
      <section className="bg-on-tertiary-fixed text-white">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[720px] lg:grid-cols-2">
          <div className="relative order-1 min-h-[220px] sm:min-h-[320px] lg:order-2 lg:min-h-full">
            <Image
              src="/images/sector-transport.png"
              alt={dict.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed via-on-tertiary-fixed/20 to-black/10 lg:bg-gradient-to-l" />
          </div>
          <FadeIn className="order-2 flex flex-col justify-center px-4 py-12 sm:px-8 lg:order-1 lg:px-16 lg:py-20">
            <p className="font-label-md text-xs tracking-[0.18em] text-primary-fixed uppercase sm:text-label-md">
              {dict.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl font-display-lg text-[1.75rem] leading-tight font-bold text-balance sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.hero.lead}</p>
            <p className="mt-4 text-sm text-white/70">{dict.hero.practices}</p>
            <p className="mt-6 font-label-md text-xs tracking-[0.16em] text-white/80 uppercase">{dict.hero.geography}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${home}#capabilities`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-white px-6 py-3 text-center font-label-md text-sm font-bold text-primary transition-transform hover:scale-[1.02]"
              >
                {dict.hero.explore}
                <Icon name="arrow_forward" className="h-5 w-5" />
              </a>
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/40 px-6 py-3 text-center font-label-md text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.hero.discuss}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.audiences.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.audiences.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {dict.audiences.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full border border-outline-variant/30 bg-white p-5">
                  <h3 className="font-headline-md text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-on-primary md:py-20">
        <Container>
          <Reveal>
            <p className="font-label-md text-xs tracking-[0.16em] text-primary-fixed uppercase">{dict.problem.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-3xl leading-tight font-bold text-balance sm:text-4xl">
              {dict.problem.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.problem.text}</p>
          </Reveal>
        </Container>
      </section>

      <section id="capabilities" className="bg-white py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.capabilities.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.capabilities.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-gutter lg:grid-cols-3">
            {dict.capabilities.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.08}>
                <article className="flex h-full flex-col border border-outline-variant/30 bg-surface p-6 sm:p-8">
                  <p className="font-label-md text-sm text-primary">0{index + 1}</p>
                  <h3 className="mt-4 font-headline-md text-2xl leading-8 font-semibold text-balance">{item.name}</h3>
                  <p className="mt-3 text-sm font-medium text-primary">{item.outcome}</p>
                  <p className="mt-4 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="secteurs" className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="text-center font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.sectors.eyebrow}</p>
            <h2 className="mt-3 text-center font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.sectors.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:h-[640px] lg:grid-cols-4 lg:grid-rows-2">
            {dict.sectors.items.map((sector) => (
              <article key={sector.title} className={`relative overflow-hidden rounded-xl ${sector.className}`}>
                <Image src={sector.image} alt={sector.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed/90 via-on-tertiary-fixed/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h3 className={`font-headline-md font-semibold ${sector.titleClass}`}>{sector.title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-primary-fixed sm:text-base">{sector.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" className="bg-white py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.experience.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.experience.title}
            </h2>
            <p className="mt-4 max-w-3xl text-on-surface-variant">{dict.experience.intro}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-gutter md:grid-cols-2">
            {dict.experience.items.map((item, index) => (
              <Reveal key={item.place} delay={index * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-white">
                  {item.image ? (
                    <div className="relative h-48 sm:h-56">
                      <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                    </div>
                  ) : (
                    <div className="flex h-48 items-end bg-primary p-6 text-on-primary sm:h-56">
                      <p className="font-headline-md text-2xl font-semibold">{dict.why.frameworkLabel}</p>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-headline-md text-xl leading-7 font-semibold text-balance">{item.place}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.role}</p>
                    <p className="mt-4 text-sm font-semibold text-primary">{item.outcome}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="methode" className="bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="text-center font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.method.eyebrow}</p>
            <h2 className="mt-3 text-center font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.method.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-on-surface-variant">{dict.method.intro}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
            {dict.method.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group h-full border border-outline-variant/30 bg-white p-6 transition-shadow hover:shadow-xl sm:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="font-headline-md text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="mobilisation" className="bg-surface-dim/30 py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="text-center font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.mobilisation.eyebrow}</p>
            <h2 className="mt-3 text-center font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.mobilisation.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-on-surface-variant">{dict.mobilisation.intro}</p>
          </Reveal>
          <div className="relative mt-10">
            <div className="absolute top-8 right-0 left-0 hidden h-px bg-outline-variant/40 lg:block" />
            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
              {dict.mobilisation.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <article className="h-full rounded-xl border-t-4 border-primary bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-bold text-primary">{step.range}</p>
                    <h3 className="mt-3 font-headline-md text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="modes" className="bg-white py-16 md:py-24">
        <Container>
          <div className="rounded-2xl bg-primary-container/5 p-5 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Reveal className="lg:col-span-1">
                <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.modes.eyebrow}</p>
                <h2 className="mt-3 font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
                  {dict.modes.title}
                </h2>
                <p className="mt-4 text-on-surface-variant">{dict.modes.intro}</p>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
                {dict.modes.items.map((mode) => (
                  <article
                    key={mode.title}
                    className={
                      mode.featured
                        ? "rounded-lg bg-primary p-5 text-on-primary"
                        : "rounded-lg border border-outline-variant/30 bg-white p-5"
                    }
                  >
                    <h3 className={`font-bold ${mode.featured ? "" : "text-primary"}`}>{mode.title}</h3>
                    <p className={`mt-2 text-sm leading-6 ${mode.featured ? "text-white/90" : "text-on-surface-variant"}`}>
                      {mode.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.adds.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
              {dict.adds.title}
            </h2>
          </Reveal>
          <div className="mt-8 hidden overflow-hidden rounded-xl border border-outline-variant/30 bg-white md:block">
            <div className="grid grid-cols-2 bg-on-tertiary-fixed text-white">
              <p className="px-6 py-4 text-sm font-bold">{dict.adds.conventional}</p>
              <p className="px-6 py-4 text-sm font-bold">{dict.adds.added}</p>
            </div>
            {dict.adds.rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-2 border-t border-outline-variant/30">
                <p className="px-6 py-5 text-sm text-on-surface-variant">{row[0]}</p>
                <p className="px-6 py-5 text-sm font-semibold text-primary">{row[1]}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {dict.adds.rows.map((row) => (
              <article key={row[0]} className="rounded-xl border border-outline-variant/30 bg-white p-5">
                <p className="text-xs font-bold tracking-wide text-on-surface-variant uppercase">{dict.adds.conventional}</p>
                <p className="mt-1 text-sm">{row[0]}</p>
                <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">{dict.adds.added}</p>
                <p className="mt-1 text-sm font-semibold text-primary">{row[1]}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="font-label-md text-xs tracking-[0.16em] text-primary uppercase">{dict.why.eyebrow}</p>
              <h2 className="mt-3 font-headline-xl text-3xl leading-tight font-bold text-balance text-primary sm:text-4xl">
                {dict.why.title}
              </h2>
              <ul className="mt-8 space-y-5">
                {dict.why.standards.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check_circle" className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <span className="text-sm leading-6 text-on-surface-variant sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid gap-4">
              {dict.why.points.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.06}>
                  <article className="border border-outline-variant/30 bg-surface p-5">
                    <h3 className="font-semibold text-primary">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{point.text}</p>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <div className="bg-on-tertiary-fixed p-5 text-white">
                  <p className="text-sm font-bold">{dict.why.frameworkLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {dict.why.framework.map((item) => (
                      <li key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs tracking-wide">
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
            <h2 className="mx-auto max-w-3xl font-display-lg text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
              {dict.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-primary-fixed sm:text-body-lg">{dict.cta.text}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mailHref(locale, "project")}
                className="inline-flex min-h-12 items-center justify-center rounded bg-white px-6 py-3 font-label-md text-sm font-bold text-primary"
              >
                {dict.cta.discuss}
              </a>
              <a
                href={mailHref(locale, "partner")}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white px-6 py-3 font-label-md text-sm font-bold text-white hover:bg-white/10"
              >
                {dict.cta.partner}
              </a>
              <Link
                href={`${home}/brochure`}
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/40 px-6 py-3 font-label-md text-sm font-bold text-white hover:bg-white/10"
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
