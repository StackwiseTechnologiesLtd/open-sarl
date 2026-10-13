import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Dictionary } from "@/lib/i18n";

export function PolesSection({ dict }: { dict: Dictionary }) {
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
              <article
                id={`poles-${practice.id}`}
                className="editorial-card flex h-full flex-col gap-5 bg-white p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                      practice.id === "advisory" ? "bg-primary/10 text-primary" : "bg-tertiary/15 text-tertiary"
                    }`}
                  >
                    <Icon name={practice.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface-variant">{practice.kicker}</p>
                    <h3 className="font-headline-md mt-1 text-lg font-semibold sm:text-xl">{practice.title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{practice.summary}</p>
                <p className="text-sm font-medium text-primary">{practice.highlights}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
