import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { PolePageHero } from "@/components/pole-page-hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getPoleHeroImage, getProjectImage } from "@/lib/project-images";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";
import { polePath, projectPath, type PoleSlug } from "@/lib/poles";

const otherPole: Record<PoleSlug, PoleSlug> = {
  advisory: "engineering",
  engineering: "advisory",
};

export function PoleDetailView({
  locale,
  dict,
  pole,
}: {
  locale: Locale;
  dict: Dictionary;
  pole: PoleSlug;
}) {
  const home = `/${locale}`;
  const content = dict.polePages[pole];
  const shared = dict.polePages.shared;
  const other = otherPole[pole];
  const otherContent = dict.polePages[other];
  const polesLabel = dict.nav.find((item) => item.href === "#poles")?.label ?? "Pôles";

  return (
    <main className="page-main pb-section-gap">
      <PolePageHero
        imageSrc={getPoleHeroImage(pole)}
        imageAlt={content.title}
        kicker={content.kicker}
        title={content.title}
        lead={content.lead}
        crumbs={[
          { href: home, label: "OPEN" },
          { href: `${home}#poles`, label: polesLabel },
          { href: polePath(locale, pole), label: content.title.replace(/^OPEN\s+/i, "") },
        ]}
        actions={
          <>
            <PillLink href={mailHref(locale, "project")}>{shared.contactCta}</PillLink>
            <ButtonLink href={polePath(locale, other)} variant="outline-light">
              {shared.otherPole}
              <Icon name="chevron_right" className="h-5 w-5" />
            </ButtonLink>
          </>
        }
      />

      <section className="section-shell py-section-gap">
        <Container>
          <Reveal>
            <p className="mx-auto mb-10 max-w-prose text-sm leading-relaxed text-on-surface-variant sm:mb-12 sm:text-body-md">
              {content.body}
            </p>
            <h2 className="section-heading mb-6 sm:mb-8">{shared.capabilitiesTitle}</h2>
          </Reveal>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {content.capabilities.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <li className="editorial-card flex gap-3 bg-white p-5 sm:p-6">
                  <Icon name="check_circle" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed sm:text-body-md">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-shell-muted py-section-gap">
        <Container>
          <Reveal>
            <h2 className="section-heading mb-3">{shared.projectsTitle}</h2>
            <p className="mb-8 max-w-prose text-sm text-on-surface-variant sm:mb-10 sm:text-body-md">{shared.projectsIntro}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-gutter">
            {content.projects.map((project, index) => (
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
        </Container>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 border-t border-outline-variant/40 pt-10 sm:flex-row sm:items-center">
          <ButtonLink href={`${home}#poles`} variant="ghost">
            <Icon name="chevron_left" className="h-4 w-4" />
            {shared.backToPoles}
          </ButtonLink>
          <ButtonLink href={polePath(locale, other)} variant="ghost">
            {otherContent.title}
            <Icon name="chevron_right" className="h-5 w-5" />
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
