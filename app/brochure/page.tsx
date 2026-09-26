import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { appointmentMailto, contactEmail, firstDays, missions, modes, pillars, sectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brochure institutionnelle",
  description: "Brochure OPEN SARL — conseil et exécution pour les infrastructures publiques.",
};

export default function BrochurePage() {
  return (
    <main className="bg-white py-16 md:py-section-gap">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-outline-variant/40 pb-8 md:flex-row md:items-end print:mb-8">
          <div>
            <p className="font-label-md text-label-md tracking-[0.2em] text-primary uppercase">OPEN SARL</p>
            <h1 className="mt-3 font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
              Brochure institutionnelle
            </h1>
            <p className="mt-4 max-w-2xl text-on-surface-variant">
              Conseil stratégique et pôle d&apos;exécution pour transformer les priorités publiques en
              programmes bancables.
            </p>
          </div>
          <div className="flex gap-3 print:hidden">
            <a
              href={appointmentMailto()}
              className="rounded bg-primary px-6 py-3 font-label-md text-label-md text-on-primary"
            >
              Prendre rendez-vous
            </a>
            <PrintButton />
          </div>
        </div>
        <section className="mb-12">
          <h2 className="mb-4 font-headline-md text-headline-md font-semibold">Valeur pour les décideurs</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="border border-outline-variant/30 p-4">
                <p className="font-bold text-primary">{pillar.title}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="mb-4 font-headline-md text-headline-md font-semibold">Missions</h2>
          <ul className="space-y-3">
            {missions.map((mission) => (
              <li key={mission.title}>
                <span className="font-bold">{mission.title}. </span>
                <span className="text-on-surface-variant">{mission.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="mb-4 font-headline-md text-headline-md font-semibold">60 premiers jours</h2>
          <ol className="space-y-3">
            {firstDays.map((step) => (
              <li key={step.title}>
                <span className="font-bold text-primary">{step.range} — {step.title}. </span>
                <span className="text-on-surface-variant">{step.text}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="mb-12">
          <h2 className="mb-4 font-headline-md text-headline-md font-semibold">Secteurs et modes</h2>
          <p className="text-on-surface-variant">
            {sectors.map((sector) => sector.title).join(" · ")}
          </p>
          <ul className="mt-4 space-y-2">
            {modes.map((mode) => (
              <li key={mode.title}>
                <span className="font-bold">{mode.title}. </span>
                <span className="text-on-surface-variant">{mode.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <p className="text-on-surface-variant">
          Contact : <a className="text-primary" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <p className="mt-8 print:hidden">
          <Link href="/" className="font-bold text-primary hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </Container>
    </main>
  );
}
