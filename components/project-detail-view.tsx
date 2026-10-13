import Link from "next/link";
import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { PolePageHero } from "@/components/pole-page-hero";
import { ProjectMoreSidebar } from "@/components/project-more-sidebar";
import { Reveal } from "@/components/reveal";
import { getProjectImage } from "@/lib/project-images";
import type { PoleProjectWithDetail } from "@/lib/projects";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";
import { polePath, projectPath, type PoleSlug } from "@/lib/poles";

export function ProjectDetailView({
  locale,
  dict,
  pole,
  project,
}: {
  locale: Locale;
  dict: Dictionary;
  pole: PoleSlug;
  project: PoleProjectWithDetail;
}) {
  const home = `/${locale}`;
  const shared = dict.polePages.shared;
  const poleContent = dict.polePages[pole];
  const polesLabel = dict.nav.find((item) => item.href === "#poles")?.label ?? "Pôles";

  return (
    <main className="page-main pb-section-gap">
      <PolePageHero
        imageSrc={getProjectImage(project.slug)}
        imageAlt={project.title}
        kicker={poleContent.kicker}
        title={project.title}
        lead={project.summary}
        crumbs={[
          { href: home, label: "OPEN" },
          { href: `${home}#poles`, label: polesLabel },
          { href: polePath(locale, pole), label: poleContent.title.replace(/^OPEN\s+/i, "") },
          { href: projectPath(locale, pole, project.slug), label: project.title },
        ]}
        actions={
          <>
            <PillLink href={mailHref(locale, "project")}>{shared.contactCta}</PillLink>
            <ButtonLink href={polePath(locale, pole)} variant="outline-light">
              {shared.backToPole}
            </ButtonLink>
          </>
        }
      />

      <div className="project-detail-body">
        <Container>
          <div className="project-detail-layout">
            <div className="project-detail-main">
              <Reveal>
                <article className="project-detail-panel">
                  <h2 className="project-detail-panel-title">{shared.contextTitle}</h2>
                  <p className="project-detail-panel-lead">{project.body}</p>
                  <dl className="project-facts project-facts--in-panel">
                    <div>
                      <dt>{shared.mandateType}</dt>
                      <dd>{project.mandateType}</dd>
                    </div>
                    <div>
                      <dt>{shared.projectSector}</dt>
                      <dd>{project.sector}</dd>
                    </div>
                    <div>
                      <dt>{shared.projectLocation}</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div>
                      <dt>{shared.projectClient}</dt>
                      <dd>{project.clientType}</dd>
                    </div>
                    <div>
                      <dt>{shared.projectRole}</dt>
                      <dd>{project.role}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>

              <Reveal delay={0.04}>
                <article className="project-detail-panel">
                  <div className="project-detail-split">
                    <div>
                      <h2 className="project-detail-panel-title">{shared.challengeTitle}</h2>
                      <p className="project-detail-prose">{project.challenge}</p>
                    </div>
                    <div>
                      <h2 className="project-detail-panel-title">{shared.approachTitle}</h2>
                      <p className="project-detail-prose">{project.approach}</p>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={0.06}>
                <article className="project-detail-panel">
                  <h2 className="project-detail-panel-title">{shared.scopeTitle}</h2>
                  <ul className="project-detail-list">
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <article className="project-detail-panel">
                  <h2 className="project-detail-panel-title">{shared.deliverablesTitle}</h2>
                  <ul className="project-detail-list project-detail-list--columns">
                    {project.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={0.1}>
                <article className="project-detail-panel">
                  <h2 className="project-detail-panel-title">{shared.outcomesTitle}</h2>
                  <ul className="project-outcomes">
                    {project.outcomes.map((item) => (
                      <li key={item}>
                        <Icon name="check_circle" className="h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-on-surface-variant">{project.status}</p>
                </article>
              </Reveal>
            </div>

            <ProjectMoreSidebar locale={locale} pole={pole} dict={dict} currentSlug={project.slug} />
          </div>
        </Container>
      </div>

      <section className="section-shell py-10 sm:py-12">
        <Container>
          <Link href={polePath(locale, pole)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Icon name="chevron_left" className="h-4 w-4" />
            {shared.backToPole}
          </Link>
        </Container>
      </section>
    </main>
  );
}
