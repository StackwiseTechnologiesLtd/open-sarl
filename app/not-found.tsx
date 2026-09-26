import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <main className="bg-surface py-16 md:py-section-gap">
      <Container>
        <h1 className="font-headline-xl text-3xl font-bold text-primary">Page introuvable</h1>
        <p className="mt-4 text-on-surface-variant">Cette adresse ne correspond à aucune page du site OPEN.</p>
        <Link href="/" className="mt-8 inline-block font-bold text-primary hover:underline">
          Retour à l&apos;accueil
        </Link>
      </Container>
    </main>
  );
}
