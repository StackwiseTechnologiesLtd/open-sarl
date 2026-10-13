import Link from "next/link";
import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { PolePageHero } from "@/components/pole-page-hero";
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
            <ButtonLink href={polePath(locale, pole)} variant="ghost">
              {shared.backToPole}
            </ButtonLink>
          </>
        }
      />

      <section className="section-shell border-b border-outline-variant/30 py-8 sm:py-10">
        <Container>
          <dl className="project-facts">
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
        </Container>
      </section>

      <section className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-4">{shared.contextTitle}</h2>
            <p className="max-w-prose text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{project.body}</p>
          </Reveal>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-gutter">
            <Reveal>
              <h2 className="section-heading mb-4">{shared.challengeTitle}</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="section-heading mb-4">{shared.approachTitle}</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{project.approach}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-6">{shared.scopeTitle}</h2>
          </Reveal>
          <ul className="project-detail-list">
            {project.scope.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <li>{item}</li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-6">{shared.deliverablesTitle}</h2>
          </Reveal>
          <ul className="project-detail-list project-detail-list--columns">
            {project.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <li>{item}</li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-6">{shared.outcomesTitle}</h2>
          </Reveal>
          <ul className="project-outcomes">
            {project.outcomes.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <li>
                  <Icon name="check_circle" className="h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-shell-muted py-12 sm:py-14">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="mb-3 text-sm text-on-surface-variant">{project.status}</p>
            <PillLink href={mailHref(locale, "project")}>{shared.contactCta}</PillLink>
          </div>
          <Link href={polePath(locale, pole)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Icon name="chevron_left" className="h-4 w-4" />
            {shared.backToPole}
          </Link>
        </Container>
      </section>
    </main>
  );
}
