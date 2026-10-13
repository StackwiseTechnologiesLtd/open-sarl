import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import { getAllProjects } from "@/lib/projects";
import { getProjectImage } from "@/lib/project-images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { projectPath } from "@/lib/poles";

export function PortfolioView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const portfolio = dict.portfolio;
  const shared = dict.polePages.shared;
  const listings = getAllProjects(dict);

  return (
    <main className="page-main pb-section-gap">
      <section className="section-shell border-b border-outline-variant/40 py-12 sm:py-16">
        <Container>
          <Reveal>
            <SectionIntro title={portfolio.pageTitle} intro={portfolio.pageIntro} />
          </Reveal>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-gutter lg:grid-cols-3">
            {listings.map(({ pole, project }, index) => (
              <Reveal key={project.slug} delay={index * 0.03} className="h-full">
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
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-on-surface-variant sm:text-body-md">
            {portfolio.note}
          </p>
        </Container>
      </section>
    </main>
  );
}
