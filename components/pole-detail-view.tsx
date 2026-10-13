import Link from "next/link";
import { ButtonLink, PillLink } from "@/components/button";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { mailHref, type Dictionary, type Locale } from "@/lib/i18n";
import { polePath, type PoleSlug } from "@/lib/poles";

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
  const icon = pole === "advisory" ? "account_balance" : "construction";

  return (
    <main className="page-main pb-section-gap">
      <div className="section-shell border-b border-outline-variant/35 bg-gradient-to-b from-primary/[0.06] to-transparent pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-12 sm:pb-16">
        <Container>
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
              <Link href={home} className="hover:text-primary">
                OPEN
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`${home}#poles`} className="hover:text-primary">
                {dict.nav.find((item) => item.href === "#poles")?.label}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-on-surface">{content.title}</span>
            </nav>
            <div className="flex max-w-3xl flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={icon} className="h-6 w-6" />
                </div>
                <p className="font-label-md text-label-md text-on-surface-variant">{content.kicker}</p>
              </div>
              <h1 className="section-display text-balance text-primary">{content.title}</h1>
              <p className="section-lead max-w-[65ch] text-on-surface-variant">{content.lead}</p>
              <p className="max-w-[65ch] text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{content.body}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <PillLink href={mailHref(locale, "project")}>{shared.contactCta}</PillLink>
                <ButtonLink href={polePath(locale, other)} variant="ghost">
                  {shared.otherPole}
                  <Icon name="chevron_right" className="h-5 w-5" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      <section className="section-shell py-section-gap">
        <Container>
          <Reveal>
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-gutter">
            {content.projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04} className="h-full">
                <article className="editorial-card flex h-full flex-col gap-5 bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-headline-md text-lg font-semibold text-primary sm:text-xl">{project.title}</h3>
                    <span className="rounded-md bg-surface-container px-2.5 py-1 text-xs font-medium text-on-surface-variant">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{project.summary}</p>
                  <dl className="mt-auto grid grid-cols-1 gap-3 border-t border-outline-variant/40 pt-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">{shared.projectSector}</dt>
                      <dd className="mt-1 text-on-surface">{project.sector}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">{shared.projectLocation}</dt>
                      <dd className="mt-1 text-on-surface">{project.location}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">{shared.projectClient}</dt>
                      <dd className="mt-1 text-on-surface">{project.clientType}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">{shared.projectRole}</dt>
                      <dd className="mt-1 text-on-surface">{project.role}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 border-t border-outline-variant/40 pt-10 sm:flex-row sm:items-center">
          <Link href={`${home}#poles`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Icon name="chevron_left" className="h-4 w-4" />
            {shared.backToPoles}
          </Link>
          <ButtonLink href={polePath(locale, other)} variant="ghost">
            {otherContent.title}
            <Icon name="chevron_right" className="h-5 w-5" />
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
