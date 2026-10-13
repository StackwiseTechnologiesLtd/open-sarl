import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n";

export function PolesValueChain({ chain }: { chain: Dictionary["polesSection"]["valueChain"] }) {
  return (
    <div className="poles-value-chain">
      <Reveal>
        <div className="poles-value-chain-header">
          <h3 className="poles-value-chain-title">{chain.title}</h3>
          <p className="poles-value-chain-intro">{chain.intro}</p>
        </div>
      </Reveal>
      <ol className="poles-value-chain-steps">
        {chain.steps.map((step, index) => (
          <li key={step.id} className="poles-value-chain-step-wrap">
            <Reveal delay={index * 0.04} className="block h-full">
              <div className="poles-value-chain-step">
                <span
                  className={`poles-value-chain-tag ${step.pole === "advisory" ? "is-advisory" : "is-engineering"}`}
                >
                  {step.pole === "advisory" ? chain.advisoryTag : chain.engineeringTag}
                </span>
                <p className="poles-value-chain-label">{step.label}</p>
                <p className="poles-value-chain-description">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
