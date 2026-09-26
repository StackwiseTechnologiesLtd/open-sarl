import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <main className="bg-surface py-16 md:py-section-gap">
      <Container>
        <div className="max-w-3xl space-y-6">
          <h1 className="font-headline-xl text-3xl font-bold text-primary md:text-headline-xl">
            Confidentialité
          </h1>
          <p className="text-on-surface-variant">
            OPEN SARL ne dépose pas de traceur publicitaire sur ce site. La navigation ne crée pas de
            compte et n&apos;alimente pas de base de contacts.
          </p>
          <h2 className="font-headline-md text-headline-md font-semibold">Prise de contact</h2>
          <p className="text-on-surface-variant">
            Les boutons de rendez-vous, de recrutement et de newsletter ouvrent votre propre messagerie
            vers {contactEmail}. Le message part uniquement si vous l&apos;envoyez. OPEN SARL utilise
            alors l&apos;adresse et le contenu pour répondre à la demande, puis les conserve le temps
            nécessaire au suivi de l&apos;échange.
          </p>
          <h2 className="font-headline-md text-headline-md font-semibold">Vos demandes</h2>
          <p className="text-on-surface-variant">
            Pour accéder aux informations liées à un échange, les rectifier ou demander leur suppression,
            écrivez à{" "}
            <a className="text-primary hover:underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
          <Link href="/" className="inline-block font-bold text-primary hover:underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </Container>
    </main>
  );
}
