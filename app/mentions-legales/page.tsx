import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { contactEmail, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <main className="bg-surface py-16 md:py-section-gap">
      <Container>
        <div className="max-w-3xl space-y-6">
          <h1 className="font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
            Mentions légales
          </h1>
          <p className="text-on-surface-variant">
            Le site présente OPEN SARL, société de conseil stratégique en infrastructures et politiques
            publiques.
          </p>
          <h2 className="font-headline-md text-headline-md font-semibold">Éditeur</h2>
          <p className="text-on-surface-variant">
            OPEN SARL
            <br />
            {offices[0]}
            <br />
            {offices[1]}
            <br />
            <a className="text-primary hover:underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </p>
          <h2 className="font-headline-md text-headline-md font-semibold">Directeur de la publication</h2>
          <p className="text-on-surface-variant">La direction d&apos;OPEN SARL.</p>
          <p className="text-on-surface-variant">
            Les informations de ce site décrivent l&apos;offre de conseil. Elles ne constituent pas une
            offre contractuelle. Les chiffres affichés, dont le taux de maturité, reprennent le discours
            institutionnel du site et doivent être confirmés dans le cadre d&apos;une mission.
          </p>
          <Link href="/" className="inline-block font-bold text-primary hover:underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </Container>
    </main>
  );
}
