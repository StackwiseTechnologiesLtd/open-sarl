import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Dictionary, Locale } from "@/lib/i18n";
import { polePath, type PoleSlug } from "@/lib/poles";

export function PolesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const poles = dict.polesSection;

  return (
    <section id="poles" className="section-shell py-section-gap">
      <Container>
        <Reveal>
          <SectionIntro title={poles.title} intro={poles.intro} className="mb-10 sm:mb-12" />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-gutter">
          {poles.practices.map((practice, index) => (
            <Reveal key={practice.id} delay={index * 0.05} className="h-full">
              <Link
                href={polePath(locale, practice.id as PoleSlug)}
                id={`poles-${practice.id}`}
                className="editorial-card group flex h-full flex-col gap-5 bg-white p-6 transition-shadow hover:shadow-premium sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors ${
                      practice.id === "advisory"
                        ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                        : "bg-tertiary/15 text-tertiary group-hover:bg-tertiary group-hover:text-white"
                    }`}
                  >
                    <Icon name={practice.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-label-md text-on-surface-variant">{practice.kicker}</p>
                    <h3 className="font-headline-md mt-1 text-lg font-semibold sm:text-xl">{practice.title}</h3>
                  </div>
                  <Icon
                    name="arrow_forward"
                    className="h-5 w-5 shrink-0 text-primary/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{practice.summary}</p>
                <p className="text-sm font-medium text-primary">{practice.highlights}</p>
                <span className="text-sm font-semibold text-primary">{poles.exploreLabel}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
