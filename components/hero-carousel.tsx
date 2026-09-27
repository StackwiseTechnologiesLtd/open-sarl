"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { heroSlideImages } from "@/lib/images";
import type { Dictionary } from "@/lib/i18n";

const AUTOPLAY_MS = 8000;
const ease = [0.16, 1, 0.3, 1] as const;

export function HeroCarousel({ home, dict }: { home: string; dict: Dictionary }) {
  const slides = dict.hero.departments;
  const count = slides.length;
  const reduce = useReducedMotion() === true;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const navigateTo = useCallback(
    (target: number) => {
      const normalized = ((target % count) + count) % count;
      const current = indexRef.current;
      if (normalized === current) return;
      setDirection(normalized > current ? 1 : -1);
      setIndex(normalized);
    },
    [count],
  );

  const next = useCallback(() => navigateTo(indexRef.current + 1), [navigateTo]);
  const prev = useCallback(() => navigateTo(indexRef.current - 1), [navigateTo]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => navigateTo(indexRef.current + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, navigateTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const dept = slides[index];
  const slideNumber = String(index + 1).padStart(2, "0");
  const slideTotal = String(count).padStart(2, "0");

  const contentVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d >= 0 ? 48 : -48,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d >= 0 ? -48 : 48,
      filter: "blur(4px)",
    }),
  };

  const watermarkVariants = {
    enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 80 : -80, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60, scale: 1.02 }),
  };

  return (
    <section
      id="poles"
      className="relative flex min-h-[min(100svh,700px)] items-center overflow-hidden sm:min-h-[640px] lg:min-h-[780px]"
      aria-roledescription="carousel"
      aria-label={dict.ui.carouselLabel}
      style={{ ["--hero-autoplay" as string]: `${AUTOPLAY_MS}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Background slides with Ken Burns */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {heroSlideImages.map((src, slideIndex) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: slideIndex === index ? 1 : 0,
              scale: slideIndex === index ? 1 : 1.06,
            }}
            transition={{ duration: reduce ? 0 : 1.1, ease }}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/55 via-transparent to-[#0b1c30]/25" />
      </div>

      <div className="relative z-10 w-full">
        <Container className="py-10 sm:py-12 lg:py-16">
          {/* Header: tabs + counter */}
          <div className="mb-6 flex flex-col items-stretch justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
            <div role="tablist" aria-label={dict.ui.carouselLabel} className="flex justify-center sm:justify-start">
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
                    onClick={() => navigateTo(slideIndex)}
                    className="hero-tab"
                  >
                    {slideIndex === index ? (
                      <motion.span
                        layoutId="hero-tab-pill"
                        className="hero-tab-indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <span className="relative z-[1]">{slide.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="hero-slide-counter text-center sm:text-right" aria-live="polite">
              <strong>{slideNumber}</strong>
              <span className="mx-2 opacity-40">/</span>
              {slideTotal}
            </p>
          </div>

          {/* Autoplay progress */}
          <div className="hero-progress-track mb-6 sm:mb-8" aria-hidden="true">
            <div
              key={`${index}-${paused}`}
              className={`hero-progress-bar ${paused ? "is-paused" : ""}`}
            />
          </div>

          {/* Main stage */}
          <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Watermark — desktop right */}
            <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={dept.watermark}
                  custom={direction}
                  variants={watermarkVariants}
                  initial={reduce ? false : "enter"}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.65, ease }}
                  className="hero-watermark absolute top-1/2 right-0 max-w-[min(52vw,36rem)] -translate-y-1/2 text-right text-[clamp(4rem,11vw,9rem)] leading-none"
                >
                  {dept.watermark}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card + controls */}
            <div className="relative lg:col-span-7 xl:col-span-6">
              <div className="pointer-events-none absolute top-1/2 -left-3 z-20 hidden -translate-y-1/2 lg:block xl:-left-16">
                <button
                  type="button"
                  className="hero-nav-btn pointer-events-auto"
                  onClick={prev}
                  aria-label={dict.ui.carouselPrev}
                >
                  <Icon name="chevron_left" className="h-6 w-6" />
                </button>
              </div>
              <div className="pointer-events-none absolute top-1/2 -right-3 z-20 hidden -translate-y-1/2 lg:block xl:-right-16">
                <button
                  type="button"
                  className="hero-nav-btn pointer-events-auto"
                  onClick={next}
                  aria-label={dict.ui.carouselNext}
                >
                  <Icon name="chevron_right" className="h-6 w-6" />
                </button>
              </div>

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.article
                  key={index}
                  id={`hero-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`hero-tab-${index}`}
                  custom={direction}
                  variants={contentVariants}
                  initial={reduce ? false : "enter"}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease }}
                  className="glass-card hero-carousel-card relative flex w-full flex-col rounded-2xl p-6 text-white sm:p-8 lg:p-10"
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -72) next();
                    else if (info.offset.x > 72) prev();
                  }}
                >
                  {/* Mobile watermark strip */}
                  <div className="mb-4 overflow-hidden lg:hidden" aria-hidden="true">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={dept.watermark}
                        custom={direction}
                        variants={watermarkVariants}
                        initial={reduce ? false : "enter"}
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease }}
                        className="hero-watermark text-[clamp(2.5rem,14vw,4rem)]"
                      >
                        {dept.watermark}
                      </motion.p>
                    </AnimatePresence>
                  </div>

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
          </div>

          {/* Mobile nav */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 lg:hidden">
            <button type="button" className="hero-nav-btn" onClick={prev} aria-label={dict.ui.carouselPrev}>
              <Icon name="chevron_left" className="h-5 w-5" />
            </button>
            <button type="button" className="hero-nav-btn" onClick={next} aria-label={dict.ui.carouselNext}>
              <Icon name="chevron_right" className="h-5 w-5" />
            </button>
          </div>

          {/* Center CTA */}
          <div className="mt-8 text-center sm:mt-10 lg:mt-12">
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
