import { Container } from "@/components/container";
import { PolesValueChain } from "@/components/poles-value-chain";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Dictionary, Locale } from "@/lib/i18n";

export function PolesSection({ dict }: { locale: Locale; dict: Dictionary }) {
  const poles = dict.polesSection;

  return (
    <section id="poles" className="section-shell py-section-gap">
      <Container>
        <Reveal>
          <SectionIntro title={poles.title} intro={poles.intro} className="mb-10 sm:mb-12" />
        </Reveal>
        <PolesValueChain chain={poles.valueChain} />
      </Container>
    </section>
  );
}
