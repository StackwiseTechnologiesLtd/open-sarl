import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Dictionary } from "@/lib/i18n";

export function PortfolioSection({ dict }: { dict: Dictionary }) {
  const portfolio = dict.portfolio;

  return (
    <section id="portfolio" className="section-shell-muted py-section-gap">
      <Container>
        <Reveal>
          <SectionIntro title={portfolio.title} intro={portfolio.intro} className="mb-8 sm:mb-10" />
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.categories.map((category) => (
              <li
                key={category}
                className="rounded-lg border border-outline-variant/45 bg-white/80 px-5 py-4 text-sm font-medium text-on-surface sm:text-base"
              >
                {category}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-prose text-sm leading-relaxed text-on-surface-variant sm:text-body-md">
            {portfolio.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
