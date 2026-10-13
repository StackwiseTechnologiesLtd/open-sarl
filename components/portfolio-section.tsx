import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import { getFeaturedProjects } from "@/lib/projects";
import { getProjectImage } from "@/lib/project-images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { projectPath } from "@/lib/poles";

export function PortfolioSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const portfolio = dict.portfolio;
  const shared = dict.polePages.shared;
  const featured = getFeaturedProjects(dict);
  const portfolioHref = `/${locale}/portfolio`;

  return (
    <section id="portfolio" className="section-shell-muted py-section-gap">
      <Container>
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionIntro title={portfolio.title} intro={portfolio.intro} />
          </Reveal>
          <ButtonLink href={portfolioHref} variant="ghost" className="hidden shrink-0 md:inline-flex">
            {portfolio.viewAllCta}
            <Icon name="chevron_right" className="h-5 w-5" />
          </ButtonLink>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-3">
          {featured.map(({ pole, project }, index) => (
            <Reveal key={project.slug} delay={index * 0.04} className="h-full">
              <ProjectCard
                href={projectPath(locale, pole, project.slug)}
                title={project.title}
                summary={project.summary}
                status={project.status}
                imageSrc={getProjectImage(project.slug)}
                imageAlt={project.title}
                ctaLabel={shared.viewProject}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <ButtonLink href={portfolioHref} variant="ghost" full className="w-full sm:w-auto">
            {portfolio.viewAllCta}
            <Icon name="chevron_right" className="h-5 w-5" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
