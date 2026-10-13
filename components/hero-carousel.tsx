"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PillLink } from "@/components/button";
import { ClientsBand } from "@/components/clients-band";
import { Container } from "@/components/container";
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

  const slide = slides[index];

  const fadeVariants = {
    enter: (d: number) => ({ opacity: 0, y: d >= 0 ? 12 : -12 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d >= 0 ? -8 : 8 }),
  };

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:max-h-[920px]"
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
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {heroSlideImages.map((src, slideIndex) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: slideIndex === index ? 1 : 0,
                scale: slideIndex === index ? 1.03 : 1.08,
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
          <div className="hero-vignette absolute inset-0" />
          <div className="hero-grain absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/92 via-[#0a1628]/55 to-[#0a1628]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/75 via-transparent to-[#0a1628]/35" />
        </div>

        <Container className="relative z-10 flex flex-1 flex-col justify-end pb-6 pt-[calc(5.75rem+env(safe-area-inset-top,0px))] sm:pb-8 sm:pt-[calc(6.5rem+env(safe-area-inset-top,0px))] lg:pb-10">
          <div className="max-w-3xl">
            <h1 className="hero-platform-headline text-balance text-white">{dict.hero.platform}</h1>
            <p className="hero-scope mt-4 max-w-xl text-balance text-white/72 sm:mt-5">{dict.hero.scope}</p>

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={fadeVariants}
                initial={reduce ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
                id={`hero-panel-${index}`}
                aria-live="polite"
                className="mt-8 sm:mt-10"
              >
                <p className="hero-accent-line text-white/88">{slide.text}</p>
                <div className="mt-7 sm:mt-8">
                  <PillLink href={`${home}${slide.ctaHref}`}>{slide.cta}</PillLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 lg:mt-12">
            <div className="hero-dots" role="tablist" aria-label={dict.ui.carouselLabel}>
              {slides.map((item, slideIndex) => (
                <button
                  key={item.dept}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-controls={`hero-panel-${slideIndex}`}
                  className={`hero-dot ${slideIndex === index ? "is-active" : slideIndex < index ? "is-complete" : ""}`}
                  onClick={() => navigateTo(slideIndex)}
                >
                  <span className="hero-dot-fill" aria-hidden="true" />
                  <span className="sr-only">{item.dept}</span>
                </button>
              ))}
            </div>
            <p className="hidden text-sm text-white/45 sm:block">{slide.dept}</p>
          </div>
        </Container>
      </section>

      <ClientsBand clients={dict.hero.clients} />
    </>
  );
}
