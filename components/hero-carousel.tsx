"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PillLink } from "@/components/button";
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

  const fadeVariants = {
    enter: (d: number) => ({ opacity: 0, y: d >= 0 ? 28 : -28 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d >= 0 ? -20 : 20 }),
  };

  return (
    <section
      id="poles"
      className="relative flex min-h-[min(100svh,920px)] flex-col overflow-hidden"
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
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {heroSlideImages.map((src, slideIndex) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: slideIndex === index ? 1 : 0,
              scale: slideIndex === index ? 1.04 : 1.1,
            }}
            transition={{ duration: reduce ? 0 : 1.2, ease }}
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
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/88 via-[#0a1628]/45 to-[#0a1628]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-[#0a1628]/30" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-8 pt-28 sm:pb-10 sm:pt-32 lg:pb-14">
        <div className="grid flex-1 grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — headline stack */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={fadeVariants}
                initial={reduce ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease }}
                id={`hero-panel-${index}`}
                aria-live="polite"
              >
                <p className="hero-badge">{dept.dept}</p>
                <h1 className="hero-display-headline mt-5 max-w-3xl text-balance sm:mt-6">{dept.text}</h1>
                <div className="mt-8 sm:mt-10">
                  <PillLink href={`${home}#contact`}>{dept.cta}</PillLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — floating glass card */}
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.aside
                key={`card-${index}`}
                custom={direction}
                variants={fadeVariants}
                initial={reduce ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease, delay: 0.05 }}
                className="hero-float-card w-full max-w-md lg:max-w-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10">
                  <Icon name="verified" className="h-5 w-5 text-white" />
                </div>
                <p className="font-headline-md text-lg font-semibold text-white">
                  {dept.title}
                  <span className="font-normal text-white/70"> · {dept.subtitle}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{dept.quote}</p>
              </motion.aside>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 lg:mt-12">
          <div className="hero-dots" role="tablist" aria-label={dict.ui.carouselLabel}>
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.dept}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-controls={`hero-panel-${slideIndex}`}
                className={`hero-dot ${slideIndex === index ? "is-active" : slideIndex < index ? "is-complete" : ""}`}
                onClick={() => navigateTo(slideIndex)}
              >
                <span className="hero-dot-fill" aria-hidden="true" />
                <span className="sr-only">{slide.dept}</span>
              </button>
            ))}
          </div>
          <p className="hidden text-xs text-white/45 sm:block">{dict.ui.carouselLabel}</p>
        </div>
      </Container>
    </section>
  );
}
