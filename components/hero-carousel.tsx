"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { heroSlideImages } from "@/lib/images";
import type { Dictionary } from "@/lib/i18n";

const AUTOPLAY_MS = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

export function HeroCarousel({ home, dict }: { home: string; dict: Dictionary }) {
  const slides = dict.hero.departments;
  const count = slides.length;
  const reduce = useReducedMotion() === true;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const dept = slides[index];

  return (
    <section
      id="poles"
      className="relative flex min-h-[min(100svh,680px)] items-center overflow-hidden sm:min-h-[620px] lg:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label={dict.ui.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Background slides */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {heroSlideImages.map((src, slideIndex) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: slideIndex === index ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={slideIndex === 0}
              quality={90}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full">
        <Container className="py-10 sm:py-12 lg:py-16">
          {/* Tab switcher */}
          <div className="mb-6 flex justify-center sm:mb-8" role="tablist" aria-label={dict.ui.carouselLabel}>
            <div className="hero-tabs">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.dept}
                  type="button"
                  role="tab"
                  id={`hero-tab-${slideIndex}`}
                  aria-selected={slideIndex === index}
                  aria-controls={`hero-panel-${slideIndex}`}
                  tabIndex={slideIndex === index ? 0 : -1}
                  onClick={() => goTo(slideIndex)}
                  className="hero-tab"
                >
                  {slide.subtitle}
                </button>
              ))}
            </div>
          </div>

          {/* Slide content */}
          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute top-1/2 -left-2 hidden -translate-y-1/2 sm:-left-14 md:block">
              <button
                type="button"
                className="hero-nav-btn pointer-events-auto"
                onClick={prev}
                aria-label={dict.ui.carouselPrev}
              >
                <Icon name="chevron_left" className="h-6 w-6" />
              </button>
            </div>
            <div className="pointer-events-none absolute top-1/2 -right-2 hidden -translate-y-1/2 sm:-right-14 md:block">
              <button
                type="button"
                className="hero-nav-btn pointer-events-auto"
                onClick={next}
                aria-label={dict.ui.carouselNext}
              >
                <Icon name="chevron_right" className="h-6 w-6" />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={index}
                id={`hero-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`hero-tab-${index}`}
                className="glass-card flex w-full flex-col rounded-2xl p-6 text-white sm:p-8 lg:p-10"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
              >
                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                  <span className="h-px w-8 bg-white/60" />
                  <span className="font-label-md text-xs tracking-[0.2em] text-white/75 uppercase sm:text-label-md">
                    {dept.dept}
                  </span>
                </div>
                <h2 className="hero-title mb-4 sm:mb-6">
                  {dept.title}
                  <br />
                  <span className="font-normal opacity-90">{dept.subtitle}</span>
                </h2>
                <p className="section-lead mb-2 text-white/95">{dept.text}</p>
                <p className="mb-6 text-sm text-white/65 italic sm:mb-8 sm:text-base">{dept.quote}</p>
                <Button variant="ghost-light" className="group mt-auto sm:text-sm">
                  {dept.cta}
                  <Icon name="arrow_right_alt" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Mobile controls + dots */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
            <button type="button" className="hero-nav-btn md:hidden" onClick={prev} aria-label={dict.ui.carouselPrev}>
              <Icon name="chevron_left" className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label={dict.ui.carouselLabel}>
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.dept}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-label={slide.subtitle}
                  onClick={() => goTo(slideIndex)}
                  className="hero-dot"
                />
              ))}
            </div>
            <button type="button" className="hero-nav-btn md:hidden" onClick={next} aria-label={dict.ui.carouselNext}>
              <Icon name="chevron_right" className="h-5 w-5" />
            </button>
          </div>

          {/* Center CTA */}
          <div className="mt-8 text-center sm:mt-10 lg:mt-14">
            <ButtonLink href={`${home}#missions`} variant="secondary" size="lg" className="mx-auto">
              {dict.hero.centerCta}
              <Icon name="arrow_forward" className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
