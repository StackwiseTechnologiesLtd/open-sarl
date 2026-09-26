import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import {
  appointmentMailto,
  firstDays,
  missions,
  modes,
  openApproach,
  pillars,
  sectors,
  standardApproach,
  standards,
} from "@/lib/site";

const dayTone = {
  tertiary: { border: "border-tertiary", text: "text-tertiary" },
  primary: { border: "border-primary", text: "text-primary" },
  deep: {
    border: "border-on-primary-fixed-variant",
    text: "text-on-primary-fixed-variant",
  },
} as const;

export function HomeSections() {
  return (
    <main>
      <section id="poles" className="relative flex min-h-[640px] items-center overflow-hidden md:min-h-[800px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Conseil et exécution sur des infrastructures publiques"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
        <div className="relative z-10 w-full py-16">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <article className="glass-card rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-white/60" />
                  <span className="font-label-md text-label-md tracking-[0.2em] text-white/80 uppercase">
                    Department 01
                  </span>
                </div>
                <h2 className="mb-6 font-display-lg text-4xl leading-tight font-bold md:text-headline-xl">
                  Advisory
                  <br />
                  <span className="font-normal opacity-90">Conseil</span>
                </h2>
                <p className="mb-2 font-body-lg text-body-lg leading-relaxed">
                  Transformer les priorités en programmes bancables.
                </p>
                <p className="mb-8 font-body-md text-white/70 italic">
                  Transforming priorities into bankable programs.
                </p>
                <Link
                  href="/#expertise"
                  className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase transition-all hover:gap-4"
                >
                  Voir le pôle conseil
                  <Icon name="arrow_right_alt" className="h-5 w-5" />
                </Link>
              </article>
              <article className="glass-card rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-white/60" />
                  <span className="font-label-md text-label-md tracking-[0.2em] text-white/80 uppercase">
                    Department 02
                  </span>
                </div>
                <h2 className="mb-6 font-display-lg text-4xl leading-tight font-bold md:text-headline-xl">
                  Executive Branch
                  <br />
                  <span className="font-normal opacity-90">Pôle Exécution</span>
                </h2>
                <p className="mb-2 font-body-lg text-body-lg leading-relaxed">
                  Sécuriser le delivery et l&apos;ancrage local.
                </p>
                <p className="mb-8 font-body-md text-white/70 italic">Securing delivery and local roots.</p>
                <Link
                  href="/#modes"
                  className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase transition-all hover:gap-4"
                >
                  Voir le pôle exécution
                  <Icon name="arrow_right_alt" className="h-5 w-5" />
                </Link>
              </article>
            </div>
            <div className="mt-12 text-center md:mt-20">
              <Link
                href="/#missions"
                className="mx-auto inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 font-headline-md text-xl text-primary transition-all hover:scale-105 hover:bg-surface-bright hover:shadow-2xl md:px-12 md:py-5 md:text-headline-md"
              >
                Découvrir nos missions
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </Container>
        </div>
      </section>

      <section id="expertise" className="bg-surface py-16 md:py-section-gap">
        <Container>
          <div className="mb-stack-lg text-center">
            <h2 className="mb-stack-sm font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
              Valeur ajoutée pour les décideurs
            </h2>
            <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              Une approche holistique pour sécuriser les investissements et maximiser l&apos;impact
              sociétal.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group border border-outline-variant/30 bg-white p-8 transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name={pillar.icon} />
                </div>
                <h3 className="mb-3 font-headline-md text-headline-md font-semibold">{pillar.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{pillar.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-on-primary md:py-section-gap">
        <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-section-gap">
          <div>
            <h2 className="mb-stack-md font-headline-xl text-3xl font-bold md:text-headline-xl">
              Partenaire d&apos;exécution indépendant
            </h2>
            <p className="mb-stack-lg font-body-lg text-body-lg text-primary-fixed">
              Nous comblons le fossé entre la réalité de terrain locale et les standards internationaux
              les plus exigeants (Banque Mondiale, UE, BAD).
            </p>
            <ul className="space-y-4">
              {standards.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check_circle" className="mt-0.5 h-6 w-6 shrink-0 text-tertiary-fixed" />
                  <span className="font-body-md text-body-md">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-xl bg-surface-container-highest/10 p-1">
              <Image
                src="/images/workspace.png"
                alt="Espace de travail consacré aux plans d'infrastructure et aux standards financiers"
                width={640}
                height={640}
                className="h-auto w-full rounded-lg grayscale shadow-2xl brightness-90"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden rounded-lg bg-white p-6 text-primary shadow-2xl md:block">
              <div className="mb-1 text-4xl font-bold">100%</div>
              <div className="font-label-md text-sm text-on-surface-variant uppercase">
                Taux de succès de maturité
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low py-16 md:py-section-gap">
        <Container>
          <h2 className="mb-12 text-center font-headline-xl text-3xl font-bold text-primary md:mb-section-gap md:text-headline-xl">
            L&apos;approche OPEN vs Traditionnelle
          </h2>
          <div className="grid grid-cols-1 items-stretch gap-gutter md:grid-cols-2">
            <article className="rounded-xl border-2 border-outline-variant/20 bg-white/50 p-stack-lg">
              <h3 className="mb-stack-md flex items-center gap-2 font-headline-md text-headline-md font-semibold text-on-surface-variant">
                <Icon name="cancel" className="text-error" />
                Approche Standard
              </h3>
              <ul className="space-y-6">
                {standardApproach.map((item, index) => (
                  <li
                    key={item.title}
                    className={index < standardApproach.length - 1 ? "border-b border-outline-variant pb-4" : ""}
                  >
                    <p className="mb-1 font-bold">{item.title}</p>
                    <p className="text-sm text-on-surface-variant">{item.text}</p>
                  </li>
                ))}
              </ul>
            </article>
            <article className="relative overflow-hidden rounded-xl border-2 border-primary bg-white p-stack-lg shadow-xl">
              <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-bold text-on-primary uppercase">
                Standard OPEN
              </div>
              <h3 className="mb-stack-md flex items-center gap-2 font-headline-md text-headline-md font-semibold text-primary">
                <Icon name="check_circle" />
                Approche OPEN
              </h3>
              <ul className="space-y-6">
                {openApproach.map((item, index) => (
                  <li
                    key={item.title}
                    className={index < openApproach.length - 1 ? "border-b border-primary/10 pb-4" : ""}
                  >
                    <p className="mb-1 font-bold text-primary">{item.title}</p>
                    <p className="text-sm text-on-surface-variant">{item.text}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section id="missions" className="bg-white py-16 md:py-section-gap">
        <Container>
          <div className="mb-stack-lg flex flex-col items-start justify-between gap-gutter md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-stack-sm font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
                Missions Types
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Des interventions ciblées pour chaque stade du cycle de vie des projets.
              </p>
            </div>
            <Link href="/brochure" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
              Consulter le catalogue des missions
              <Icon name="chevron_right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {missions.map((mission) => (
              <article key={mission.title} className="group">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={mission.image}
                    alt={mission.alt}
                    width={512}
                    height={512}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 font-headline-md text-headline-md font-semibold text-primary">
                  {mission.title}
                </h3>
                <p className="text-sm text-on-surface-variant">{mission.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="portfolio" className="bg-surface-dim/30 py-16 md:py-section-gap">
        <Container>
          <h2 className="mb-stack-lg text-center font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
            Les 60 premiers jours d&apos;engagement
          </h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 z-0 hidden h-0.5 w-full -translate-y-1/2 bg-outline-variant/30 md:block" />
            <div className="relative z-10 grid grid-cols-1 gap-gutter md:grid-cols-3">
              {firstDays.map((step) => (
                <article
                  key={step.title}
                  className={`rounded-xl border-t-4 bg-white p-stack-lg shadow-sm ${dayTone[step.tone].border}`}
                >
                  <div className={`mb-4 text-sm font-bold ${dayTone[step.tone].text}`}>{step.range}</div>
                  <h3 className="mb-2 font-headline-md text-headline-md font-semibold">{step.title}</h3>
                  <p className="text-sm text-on-surface-variant">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="secteurs" className="bg-surface py-16 md:py-section-gap">
        <Container>
          <h2 className="mb-stack-lg text-center font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
            Secteurs d&apos;Intervention
          </h2>
          <div className="grid h-auto grid-cols-1 gap-4 md:h-[600px] md:grid-cols-4 md:grid-rows-2">
            {sectors.map((sector) => (
              <article key={sector.title} className={`group relative overflow-hidden rounded-xl ${sector.className}`}>
                <Image
                  src={sector.image}
                  alt={sector.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${sector.overlay} to-transparent opacity-60`} />
                <div className="absolute bottom-0 left-0 p-4 text-on-primary md:p-6">
                  <h3 className={sector.titleClass}>{sector.title}</h3>
                  {sector.text ? <p className={sector.caption}>{sector.text}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="modes" className="bg-white py-16 md:py-section-gap">
        <Container>
          <div className="flex flex-col gap-gutter rounded-2xl bg-primary-container/5 p-6 md:flex-row md:p-12">
            <div className="md:w-1/3">
              <h2 className="mb-stack-md font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
                Modes d&apos;Intervention
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Une flexibilité contractuelle adaptée à l&apos;urgence et à la complexité de vos enjeux.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-stack-lg md:w-2/3 md:grid-cols-2">
              {[modes.slice(0, 2), modes.slice(2)].map((column) => (
                <div key={column[0].title} className="space-y-4">
                  {column.map((mode) => (
                    <article
                      key={mode.title}
                      className={
                        mode.featured
                          ? "rounded-lg bg-primary p-4 text-on-primary"
                          : "rounded-lg border border-outline-variant/30 bg-white p-4"
                      }
                    >
                      <h3 className={`mb-2 font-bold ${mode.featured ? "" : "text-primary"}`}>{mode.title}</h3>
                      <p className={`text-sm ${mode.featured ? "opacity-90" : "text-on-surface-variant"}`}>
                        {mode.text}
                      </p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="bg-primary py-16 text-on-primary md:py-section-gap">
        <Container className="text-center">
          <h2 className="mb-stack-md font-display-lg text-4xl leading-tight font-bold md:text-display-lg">
            Accélérez votre pipeline d&apos;investissements
          </h2>
          <p className="mx-auto mb-stack-lg max-w-2xl font-body-lg text-body-lg text-primary-fixed">
            Discutons de vos projets prioritaires et identifions ensemble les leviers pour passer de
            l&apos;intention à l&apos;exécution.
          </p>
          <div className="flex flex-col items-center justify-center gap-stack-md md:flex-row">
            <a
              href={appointmentMailto()}
              className="rounded-lg bg-white px-10 py-5 font-headline-md text-xl text-primary transition-all hover:scale-105 md:text-headline-md"
            >
              Prendre rendez-vous
            </a>
            <Link
              href="/brochure"
              className="rounded-lg border border-white px-10 py-5 font-headline-md text-xl text-white transition-all hover:bg-white/10 md:text-headline-md"
            >
              Télécharger notre brochure institutionnelle
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
