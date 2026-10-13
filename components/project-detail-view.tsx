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
            <ButtonLink href={polePath(locale, pole)} variant="outline-light">
              {shared.backToPole}
            </ButtonLink>
          </>
        }
      />

      <section className="section-shell py-section-gap">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <h2 className="section-heading mb-4">{shared.contextTitle}</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{project.body}</p>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-5">
              <dl className="project-meta-grid">
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
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-6">{shared.deliverablesTitle}</h2>
          </Reveal>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {project.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <li className="editorial-card bg-white p-5 text-sm leading-relaxed sm:p-6 sm:text-body-md">{item}</li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-shell py-12 sm:py-16">
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
