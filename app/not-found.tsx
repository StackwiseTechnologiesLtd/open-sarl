import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <main className="bg-surface py-16 md:py-24">
      <Container>
        <h1 className="font-headline-xl text-3xl font-bold text-primary">Page introuvable</h1>
        <p className="mt-4 text-on-surface-variant">Cette adresse ne correspond à aucune page du site OPEN.</p>
        <div className="mt-8 flex gap-6">
          <Link href="/fr" className="font-bold text-primary hover:underline">
            Français
          </Link>
          <Link href="/en" className="font-bold text-primary hover:underline">
            English
          </Link>
        </div>
      </Container>
    </main>
  );
}
